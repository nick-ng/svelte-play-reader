import type { Character, Scene, StageDirection } from '$lib/types';

export const lexStageDirection = (
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

export const parseStageDirection = (
	stageDirectionValue: string,
	dramatisPersonae: Character[],
	charactersOnStage: string[]
): StageDirection | null => {
	const movmentMatch = stageDirectionValue.match(/(Enter)|(Exit)|(Exeunt)/);

	if (movmentMatch) {
		const matchingCharacterNames: string[] = [];

		dramatisPersonae.forEach((character) => {
			if (stageDirectionValue.includes(character.name)) {
				console.log('stageDirectionValue', stageDirectionValue);
				console.log('character.name', character.name);
				matchingCharacterNames.push(character.name);
			}
		});

		console.log('aa', matchingCharacterNames);

		const direction = movmentMatch[0] === 'Enter' ? 'enter' : 'exit';

		let characterNames = [];

		if (matchingCharacterNames.length < 0) {
			characterNames = matchingCharacterNames;
		} else {
			// @todo(nick-ng): what if an unknown character enters with a known character?
			if (direction === 'enter') {
				const characterMatch = stageDirectionValue.match(/Enter (?<character>\w+)./);
				console.log('no characters', stageDirectionValue);
				console.log('characterMatch', characterMatch);
				if (characterMatch?.groups?.character) {
					characterNames.push(characterMatch.groups.character);
				} else {
					throw new Error(
						`Error when parsing stage direction. No characters entered. Stage direction: ${stageDirectionValue}`
					);
				}
			} else {
				if (charactersOnStage.length === 0) {
					throw new Error(
						`Error when parsing stage direction. No characters on stage to exit. Stage direction: ${stageDirectionValue}`
					);
				}

				characterNames.push(...charactersOnStage);
			}
		}

		const isSequential = !!stageDirectionValue.match(/(first)|(then)/i);

		// console.log('movementMatch', movmentMatch);
		return {
			type: 'stage-direction',
			subType: 'movement',
			direction,
			characterNames,
			timing: isSequential ? 'sequential' : 'simultaneous',
		};
	}

	return null;
};

export const getNewScene = (partialScene: Partial<Scene> = {}): Scene => {
	return {
		act: '',
		scene: -1,
		settings: [],
		steps: [],
		...partialScene,
	};
};
