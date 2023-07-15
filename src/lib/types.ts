export type CharacterLinesToken = {
	type: 'character-lines';
	raw?: string;
	character: string;
	feets: string[];
	stageDirections?: {
		afterFeet: number;
		value: string;
	}[];
};

export type StageDirectionToken = {
	type: 'stage-direction';
	raw?: string;
	value: string;
};

export type ActSceneToken = {
	type: 'act-scene';
	raw?: string;
	actScene?: {
		act: string;
		scene: number;
	};
};

export type SceneDescriptionCompleteToken = {
	type: 'scene-description-complete';
	raw?: string;
};

export type SceneDescriptionItemToken = {
	type: 'scene-description-item';
	raw?: string;
	value: string;
};

export type UnknownToken = {
	type: 'unknown';
	raw?: string;
	match?: ReturnType<typeof String.prototype.match>;
};

export type Token =
	| CharacterLinesToken
	| StageDirectionToken
	| ActSceneToken
	| SceneDescriptionItemToken
	| SceneDescriptionCompleteToken
	| UnknownToken;

export type Workspace = {
	charactersOnStage: string[];
	lastSpeaker: string;
	currentScene: Scene;
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
	  }
	| {
			type: 'stage-direction';
			subType: 'movement';
			direction: 'enter' | 'exit' | 'exeunt';
			characterNames: string[];
			timing: 'sequential' | 'simultaneous';
			charactersOnStage0?: string[];
			charactersOnStage1?: string[];
	  };

export type Scene = {
	act: string;
	scene: number;
	settings: string[];
	steps: Step[];
};

export type Play = {
	dramatisPersonae: Character[];
	scenes: Scene[];
};

export type Production = {
	name: string;
	sourceText: string;
	cast: {
		character: string;
		voiceURI?: string;
		gender?: string;
		rate?: number;
		pitch?: number;
	}[];
	direction: {
		act: string;
		scene: number;
		step: number;
		stageSide?: 'left' | 'right' | 'up' | 'down';
		volumeMultiplier?: number;
		rateMultiplier?: number;
		pitchMultiplier?: number;
	}[];
	updatedTimestamp: number;
};
