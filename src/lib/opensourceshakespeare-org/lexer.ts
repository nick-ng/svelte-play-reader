export type Token = {
	type: string;
	raw?: string;
	value?: string;
	feets?: string[];
	stageDirections?: { afterFeet: number; value: string }[];
	character?: string;
	actScene?: { act: string; scene: number };
	match?: ReturnType<typeof String.prototype.match>;
};

const DELIMITER_0 = '\n';
const DELIMITER_1 = /\n\n+/;

const lexStageDirection = (
	rawStageDirection: string
): { type: 'stage-direction'; value: string } | null => {
	const value = rawStageDirection.replace(/^\[/, '').replace(/\]$/, '');

	if (value) {
		return {
			type: 'stage-direction',
			value,
		};
	}

	return null;
};

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
		.forEach((rawValue) => {
			const trimmedRawValue = rawValue.trim();

			// scene start
			const actSceneMatch = rawValue.match(
				/Act (?<actRoman>[IVXLCDM\d]+), Scene (?<sceneNumber>\d+)/i
			);
			if (actSceneMatch) {
				tokens.push({
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
				tokens.push({
					type: 'scene-description-complete',
					value: rawValue.trim(),
					raw: rawValue,
				});

				return;
			}

			// scene description
			if (isDescribingScene) {
				tokens.push({
					type: 'scene-description-item',
					value: rawValue.trim(),
					raw: rawValue,
				});

				return;
			}

			// stage directions
			if (
				['enter', 'exeunt', 'exit'].some((direction) =>
					trimmedRawValue.toLowerCase().startsWith(direction)
				)
			) {
				tokens.push({
					type: 'stage-direction',
					raw: rawValue,
					value: trimmedRawValue,
				});

				return;
			}

			// character's line
			const characterLineMatches = trimmedRawValue.match(/^(?<characterName>\w[\w ]+)\./i);

			if (!isDescribingScene && characterLineMatches) {
				const character = characterLineMatches.groups?.characterName;

				let stageDirections: Required<Token>['stageDirections'] = [];

				const feets = trimmedRawValue
					.replace(`${character}.`, '')
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

				if (feets.length > 0) {
					const token: Token = {
						type: 'character-lines',
						value: trimmedRawValue,
						character,
						feets,
					};

					if (stageDirections.length > 0) {
						token.stageDirections = stageDirections;
					}

					tokens.push(token);
					return;
				}
			}

			if (rawValue) {
				tokens.push({ type: 'unknown', raw: rawValue });
			}
		});

	return tokens;
};
