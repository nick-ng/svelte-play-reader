import type { Character, Scene, StageDirection, Workspace } from '$lib/types';

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
	workspace: Workspace
): void => {
	const charactersOnStage0 = [...workspace.charactersOnStage];
	// check if it's a movement stage direction and which direction.
	const movmentMatch = stageDirectionValue.match(/(Enter)|(Exit)|(Exeunt)/);

	const matchingCharacterNames: string[] = [];

	// check if there are any named characters in the stage direction.
	dramatisPersonae.forEach((character) => {
		if (stageDirectionValue.includes(character.name)) {
			matchingCharacterNames.push(character.name);
		}
	});

	if (movmentMatch) {
		const direction = movmentMatch[0].toLowerCase() as 'enter' | 'exit' | 'exeunt';

		let characterNames: string[] = [];

		// @todo(nick-ng): what if an unknown character enters with a known character in the same stage direction?
		// if we matched some characters, they are the ones who enter/exit the stage
		if (matchingCharacterNames.length > 0) {
			characterNames = matchingCharacterNames;
		} else {
			if (direction === 'enter') {
				// if characters enter the scene, they must be identified in the stage direction. try and find who they are.
				const characterMatch = stageDirectionValue.match(/Enter (?<character>\w+)./);

				if (characterMatch?.groups?.character) {
					characterNames.push(characterMatch.groups.character);
				} else {
					throw new Error(
						`Error when parsing stage direction. No characters entered. Stage direction: ${stageDirectionValue}`
					);
				}
			} else {
				// only characters already on stage can exit/exeunt. if the stage direction is exactly "Exit." or "Exeunt.", you can figure out who exits.
				// any character who entered the stage will already be in the dramatisPersonae or will be added as they are discovered. if we didn't match any characters and the stage direction is not exactly "Exit." or "Exeunt.", it means the script is asking for an unknown character to exit the stage.
				if (!stageDirectionValue.match(/(Exit)|(Exeunt)\.?/)) {
					throw new Error(
						`Error when parsing stage direction. Unknown character to leave the stage. Stage direction: ${stageDirectionValue}`
					);
				}
			}
		}

		const timing = stageDirectionValue.match(/(first)|(then)/i) ? 'sequential' : 'simultaneous';

		if (direction === 'enter') {
			if (characterNames.some((name) => workspace.charactersOnStage.includes(name))) {
				throw new Error(
					`Character already on stage. Already on stage: ${workspace.charactersOnStage.join(
						', '
					)}, Entering stage: ${characterNames}`
				);
			}

			workspace.charactersOnStage.push(...characterNames);

			// It's possible to find a new character at this stage who isn't in the dramatisPersonae after stage1(). Add them to the dramatisPersonae.
			characterNames.forEach((characterName) => {
				if (!dramatisPersonae.map((c) => c.name).includes(characterName)) {
					dramatisPersonae.push({
						name: characterName,
					});
				}
			});
		} else {
			if (characterNames.length > 0) {
				if (!characterNames.every((name) => workspace.charactersOnStage.includes(name))) {
					throw new Error(
						`Character not on stage. On stage: ${workspace.charactersOnStage.join(
							', '
						)}, Exiting stage: ${characterNames}`
					);
				}
				workspace.charactersOnStage = workspace.charactersOnStage.filter(
					(onStage) => !characterNames.includes(onStage)
				);
			} else if (direction === 'exit') {
				workspace.charactersOnStage = workspace.charactersOnStage.filter(
					(onStage) => onStage !== workspace.lastSpeaker
				);
			} else {
				workspace.charactersOnStage = [];
			}
		}

		workspace.currentScene.steps.push({
			type: 'stage-direction',
			subType: 'movement',
			direction,
			characterNames,
			timing,
			// charactersOnStage0,
			// charactersOnStage1: [...workspace.charactersOnStage],
		});
	}
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
