import type {
	Token,
	Character,
	StageDirection,
	Step,
	Scene,
	Play,
	CharacterLinesToken,
} from '$lib/types';
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

					let stageDirections: Required<CharacterLinesToken>['stageDirections'] = [];

					const feets = trimmedRawValue
						.replace(`${character}.`, '')
						?.split('\n')
						.map((a, i) => {
							const temp = a.trim().replace(/\d+$/, '').trim().replaceAll(/ +/g, ' ');

							// @todo(nick-ng): sometimes there is an "Exit." stage direction at the end of a feet
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

		this.dramatisPersonae = [...temp].map((c) => ({ name: c }));

		const workSpace: { charactersOnStage: string[]; currentScene: Scene } = {
			charactersOnStage: [],
			currentScene: getNewScene(),
		};

		this.tokens.forEach((token) => {
			switch (token.type) {
				case 'act-scene': {
					const { actScene } = token;
					workSpace.currentScene = getNewScene({ act: actScene?.act, scene: actScene?.scene });

					break;
				}
				case 'scene-description-item': {
					const { value } = token;
					if (value) {
						workSpace.currentScene.settings.push(value);
					}

					break;
				}
				case 'stage-direction': {
					const { value } = token;
					if (value) {
						const temp = parseStageDirection(value, this.dramatisPersonae);

						if (temp?.subType === 'movement') {
							const { characterNames, direction, timing } = temp;

							if (direction === 'enter') {
								if (characterNames.some((name) => workSpace.charactersOnStage.includes(name))) {
									throw new Error(
										`Character already on stage. Already on stage: ${workSpace.charactersOnStage.join(
											', '
										)}, Entering stage: ${characterNames}`
									);
								}

								workSpace.charactersOnStage.push(...characterNames);

								// It's possible to find a new character at this stage who isn't in the dramatisPersonae after stage1(). Add them to the dramatisPersonae.
								characterNames.forEach((characterName) => {
									if (!this.dramatisPersonae.map((c) => c.name).includes(characterName)) {
										this.dramatisPersonae.push({
											name: characterName,
										});
									}
								});
							} else {
								if (characterNames.length > 0) {
									if (!characterNames.every((name) => workSpace.charactersOnStage.includes(name))) {
										throw new Error(
											`Character not on stage. On stage: ${workSpace.charactersOnStage.join(
												', '
											)}, Exiting stage: ${characterNames}`
										);
									}
									workSpace.charactersOnStage = workSpace.charactersOnStage.filter(
										(onStage) => !characterNames.includes(onStage)
									);
								} else if (direction === 'exit') {
									// @todo(nick-ng): figure out who spoke last. they will leave the stage
								} else {
									workSpace.charactersOnStage = [];
								}
							}

							workSpace.currentScene.steps.push(temp);
						}
					}

					break;
				}
				case 'character-lines': {
					let tempStart = 0;

					workSpace.currentScene.steps;

					break;
				}
			}
		});

		this.scenes.push(workSpace.currentScene);

		return this;
	};
}
