import type { Token, Character, Scene, CharacterLinesToken, Workspace } from '$lib/types';
import { getNewScene, lexStageDirection, parseStageDirection } from './utils';

export default class Compiler {
	static DELIMITER_0 = '\n';
	static DELIMITER_1 = /\n\n+/;

	rawScript: string;
	tokens: Token[];
	dramatisPersonae: Character[];
	scenes: Scene[];
	error?: string;

	constructor(rawScript: string) {
		this.rawScript = rawScript;
		this.tokens = [];
		this.dramatisPersonae = [];
		this.scenes = [];

		try {
			this.stage1();
			this.stage2();
		} catch (err) {
			if (err instanceof Error) {
				this.error = err.message;
			}
		}
	}

	stage1 = (): this => {
		let isDescribingScene = false;

		this.rawScript
			.replaceAll(/next scene ./g, '')
			.split(/\/\*.*\*\//) // handle comments
			.join('')
			.split(Compiler.DELIMITER_0)
			.map((r) => {
				// handle comments
				const nonComment = r.split('//')[0];

				// remove lines that are only whitespace
				if (nonComment.match(/^\s+$/)) {
					return '';
				}

				return r.split('//')[0];
			})
			.join(Compiler.DELIMITER_0)
			.split(Compiler.DELIMITER_1)
			.forEach((rawValue) => {
				const trimmedRawValue = rawValue.trim();

				// scene start
				const actSceneMatch = rawValue.match(
					/Act (?<actRoman>[IVXLCDM\d]+), Scene (?<sceneNumber>\d+)/i
				);
				if (actSceneMatch) {
					this.tokens.push({
						type: 'act-scene',
						raw: rawValue,
						actScene: {
							act: actSceneMatch?.groups?.actRoman || '',
							scene: parseInt(actSceneMatch?.groups?.sceneNumber || '', 10),
						},
					});

					isDescribingScene = true;

					return;
				}

				// scene description indicator
				if (rawValue === '---') {
					isDescribingScene = false;
					this.tokens.push({
						type: 'scene-description-complete',
						raw: rawValue,
					});

					return;
				}

				// scene description
				if (isDescribingScene) {
					this.tokens.push({
						type: 'scene-description-item',
						value: rawValue.trim(),
						raw: rawValue,
					});

					return;
				}

				// character's line
				const characterLineMatches = rawValue.match(/^ +(?<characterName>\w[\w'' ]*)\./i);

				if (!isDescribingScene && characterLineMatches) {
					const character = characterLineMatches.groups?.characterName;

					const stageDirections: Required<CharacterLinesToken>['stageDirections'] = [];

					const feets = trimmedRawValue
						.replace(`${character}.`, '')
						.replace(/\s?Exit\.$/, '')
						?.split('\n')
						.map((a, i) => {
							const temp = a.trim().replace(/\d+$/, '').trim().replaceAll(/ +/g, ' ');

							if (temp.match(/\[.*\]/)) {
								const temp2 = lexStageDirection(temp);

								if (temp2) {
									stageDirections.push({
										...temp2,
										afterFeet: i - stageDirections.length,
									});
								}

								return '';
							}

							return temp;
						})
						.filter((a) => a);

					if (character && feets.length > 0) {
						const token: CharacterLinesToken = {
							type: 'character-lines',
							raw: rawValue,
							character,
							feets,
						};

						if (stageDirections.length > 0) {
							token.stageDirections = stageDirections;
						}

						this.tokens.push(token);

						if (trimmedRawValue.match(/\s?Exit\.$/)) {
							this.tokens.push({
								type: 'stage-direction',
								value: 'Exit.',
							});
						}

						return;
					}
				}

				// stage directions
				const tempStageDirection = lexStageDirection(trimmedRawValue);

				if (tempStageDirection) {
					this.tokens.push({
						type: 'stage-direction',
						raw: rawValue,
						value: trimmedRawValue,
					});

					return;
				}

				if (rawValue) {
					this.tokens.push({ type: 'unknown', raw: rawValue });
				}
			});

		return this;
	};

	stage2 = (): this => {
		const temp = new Set<string>();

		this.tokens.forEach((token) => {
			if (token.type === 'character-lines') {
				if (token?.character) {
					temp.add(token?.character);
				}
			}
		});

		this.dramatisPersonae = [...temp].map((c) => ({ name: c, words: 0 }));

		const workspace: Workspace = {
			charactersOnStage: [],
			lastSpeaker: '',
			currentScene: getNewScene(),
		};

		this.tokens.forEach((token) => {
			switch (token.type) {
				case 'act-scene': {
					const { actScene } = token;
					workspace.currentScene = getNewScene({ act: actScene?.act, scene: actScene?.scene });

					break;
				}
				case 'scene-description-item': {
					const { value } = token;
					if (value) {
						workspace.currentScene.settings.push(value);
					}

					break;
				}
				case 'stage-direction': {
					const { value } = token;
					if (value) {
						parseStageDirection(value, this.dramatisPersonae, workspace);
					}

					break;
				}
				case 'character-lines': {
					let tempStart = 0;
					let words = 0;

					if (token.stageDirections) {
						for (const stageDirection of token.stageDirections) {
							const temp = token.feets.slice(tempStart, stageDirection.afterFeet);

							tempStart = stageDirection.afterFeet;

							words += temp.join(' ').split(/\s+/).length;

							workspace.currentScene.steps.push({
								type: 'character-lines',
								character: token.character,
								feets: temp,
							});
							workspace.lastSpeaker = token.character;

							parseStageDirection(stageDirection.value, this.dramatisPersonae, workspace);
						}
					}

					if (tempStart < token.feets.length) {
						const temp = token.feets.slice(tempStart, token.feets.length);
						words += temp.join(' ').split(/\s+/).length;

						workspace.currentScene.steps.push({
							type: 'character-lines',
							character: token.character,
							feets: temp,
						});

						workspace.lastSpeaker = token.character;
					}

					const thisCharacter = this.dramatisPersonae.find((d) => d.name === token.character);

					if (thisCharacter) {
						thisCharacter.words += words;
					}

					break;
				}
			}
		});

		this.scenes.push(workspace.currentScene);

		return this;
	};
}
