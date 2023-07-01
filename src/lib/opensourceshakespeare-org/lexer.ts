type Token = {
	type: string;
	raw?: string;
	value?: string;
	feets?: string[];
	interruptions?: { afterFeet: number; event: string }[];
	character?: string;
	actScene?: { act: string; scene: number };
	match?: ReturnType<typeof String.prototype.match>;
};

const DELIMITER_0 = '\n';
const DELIMITER_1 = /\n\n+/;

export const lexer = (rawText: string): Token[] => {
	const tokens: Token[] = [];

	let isDescribingScene = false;

	rawText
		.split(/\/\*.*\*\//) // handle comments
		.join('')
		.split(DELIMITER_0)
		.map((r) => {
			// handle comments
			const nonComment = r.split('//')[0];

			// remove lines that are only whitespace
			if (nonComment.match(/^\s+$/)) {
				return '';
			}

			return r.split('//')[0];
		})
		.join(DELIMITER_0)
		.split(DELIMITER_1)
		.forEach((raw1) => {
			const trimmedRaw1 = raw1.trim();

			// scene start
			const actSceneMatch = raw1.match(/Act (?<actRoman>[IVXLCDM\d]+), Scene (?<sceneNumber>\d+)/i);
			if (actSceneMatch) {
				tokens.push({
					type: 'act-scene',
					raw: raw1,
					actScene: {
						act: actSceneMatch?.groups?.actRoman || '',
						scene: parseInt(actSceneMatch?.groups?.sceneNumber || '', 10),
					},
				});

				isDescribingScene = true;

				return;
			}

			// scene description indicator
			if (raw1 === '---') {
				isDescribingScene = false;
				tokens.push({
					type: 'scene-description-complete',
					value: raw1.trim(),
					raw: raw1,
				});

				return;
			}

			// scene description
			if (isDescribingScene) {
				tokens.push({
					type: 'scene-description-item',
					value: raw1.trim(),
					raw: raw1,
				});

				return;
			}

			// stage directions
			if (
				['enter', 'exeunt', 'exit'].some((direction) =>
					trimmedRaw1.toLowerCase().startsWith(direction)
				)
			) {
				tokens.push({
					type: 'stage-directions',
					raw: raw1,
					value: trimmedRaw1,
				});

				return;
			}

			// stage directions 2
			// const stageDirectionMatch2 = trimmedRaw1.match(/^\[/);
			// if (stageDirectionMatch2) {
			// 	tokens.push({
			// 		type: 'stage-directions',
			// 		raw: raw1,
			// 		match: stageDirectionMatch2
			// 	});
			// }

			// @todo(nick-ng): handle "[Exit Ghost.]", in the middle of a character's lines
			// character's line
			const characterLineMatches = trimmedRaw1.match(/^(?<characterName>\w[\w ]+)\./i);

			if (!isDescribingScene && characterLineMatches) {
				const character = characterLineMatches.groups?.characterName;

				let interruptions: Required<Token>['interruptions'] = [];

				const feets = trimmedRaw1
					.replace(`${character}.`, '')
					?.split('\n')
					.map((a, i) => {
						const temp = a.trim().replace(/\d+$/, '').trim().replaceAll(/ +/g, ' ');

						if (temp.match(/\[.*\]/)) {
							interruptions.push({
								afterFeet: i - interruptions.length,
								event: temp,
							});

							return '';
						}

						return temp;
					})
					.filter((a) => a);

				if (feets.length > 0) {
					const token: Token = {
						type: 'character-lines',
						value: trimmedRaw1,
						character,
						feets,
					};

					if (interruptions.length > 0) {
						token.interruptions = interruptions;
					}

					tokens.push(token);
					return;
				}
			}

			tokens.push({ type: 'unknown', value: raw1.trim(), raw: raw1 });
		});

	return tokens;
};

type Character = {
	name: string;
};

type Play = {
	dramatisPersonae: Character[];
	scenes: { settings: {}; steps: {}[] }[];
};

const parser = (tokens: Token[]) => {};
