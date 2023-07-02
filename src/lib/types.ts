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

export type Character = {
	name: string;
};

export type MovementStageDirection = {
	type: 'stage-direction';
	subType: 'movement';
	direction: 'enter' | 'exit' | 'exeunt';
	timing: 'simultaneous' | 'sequential';
	characterNames: string[];
};

export type ActionStageDirection = {
	type: 'stage-direction';
	subType: 'action';
	action: string;
};

export type StageDirection = MovementStageDirection | ActionStageDirection;

export type Step =
	| {
			type: 'character-lines';
			character: string;
			feets: string[];
			stageDirections?: { afterFeet: number; value: string }[];
	  }
	| {};

export type Scene = { act: string; scene: number; settings: string[]; steps: {}[] };

export type Play = {
	dramatisPersonae: Character[];
	scenes: Scene[];
};
