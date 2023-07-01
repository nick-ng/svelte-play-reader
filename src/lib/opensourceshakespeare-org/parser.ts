import type { Token } from './lexer';

type Character = {
	name: string;
};

type Step = {
	type: 'character-lines' | 'stage-direction';
};

type Scene = { act: string; scene: number; settings: {}; steps: {}[] };

type Play = {
	dramatisPersonae: Character[];
	scenes: Scene[];
};

export const parser = (tokens: Token[]): Play => {
	const temp = new Set<string>();

	tokens
		.filter((t) => t.type === 'character-lines')
		.forEach((characterToken) => {
			if (characterToken?.character) {
				temp.add(characterToken?.character);
			}
		});

	const dramatisPersonae: Character[] = [...temp].map((c) => ({ name: c }));

	const workSpace: { charactersOnStage: string[]; currentScene: Scene } = {
		charactersOnStage: [],
		currentScene: {
			act: '',
			scene: -1,
			settings: {},
			steps: [],
		},
	};

	tokens.forEach((token) => {
		const { type, actScene } = token;

		switch (token.type) {
			case 'act-scene': {
				break;
			}
		}
	});

	return { dramatisPersonae, scenes: [] };
};
