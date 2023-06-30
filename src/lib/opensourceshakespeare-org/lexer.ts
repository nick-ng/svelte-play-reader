type Token = {
	type: string;
	rawValue: string;
	value: string;
	feets?: string[];
	character?: string;
};

const DELIMITER_0 = '\n';
const DELIMITER_1 = '\n\n';

export const lexer = (rawText: string): Token[] => {
	const tokens: Token[] = [];

	let isSceneDescribed = false;

	rawText
		.split(DELIMITER_0)
		.map((r) => {
			// handle comments
			if (r.trim().startsWith('//')) {
				return '';
			}

			const temp = r.split('//');

			return temp[0];
		})
		.join(DELIMITER_0)
		.split(DELIMITER_1)
		.forEach((raw1) => {
			const trimmedRaw1 = raw1.trim();

			if (trimmedRaw1.startsWith('//')) {
				return;
			}

			// scene description indicator
			if (raw1 === '---') {
				isSceneDescribed = true;
				tokens.push({
					type: 'scene-described',
					value: raw1.trim(),
					rawValue: raw1
				});

				return;
			}

			// stage directions
			if (
				['enter', 'exeunt'].some((direction) => trimmedRaw1.toLowerCase().startsWith(direction))
			) {
				tokens.push({
					type: 'stage-directions',
					rawValue: raw1,
					value: trimmedRaw1
				});

				return;
			}

			// @todo(nick-ng): handle "[Exit Ghost.]", in the middle of a character's lines
			// character's line
			const characterLineMatches = trimmedRaw1.match(/^(?<characterName>\w[\w ]+)\./i);

			if (isSceneDescribed && characterLineMatches) {
				const character = characterLineMatches.groups?.characterName;

				const feets = trimmedRaw1
					.replace(`${character}.`, '')
					?.split('\n')
					.map((a) => a.trim().replace(/\d+$/, '').trim());

				tokens.push({
					type: 'character-lines',
					value: trimmedRaw1,
					rawValue: raw1,
					character,
					feets
				});
				return;
			}

			tokens.push({ type: 'unknown', value: raw1.trim(), rawValue: raw1 });
		});

	return tokens;
};
