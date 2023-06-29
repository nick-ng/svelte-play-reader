import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const ACTORS_LOCAL_STORAGE_KEY = 'NICK-ACTORS';

let storedActors: {
	[voiceURI: string]: {
		gender: string;
		age: string;
		fluency: number;
	};
} = {};

if (browser) {
	try {
		const storedActorsString = localStorage.getItem(ACTORS_LOCAL_STORAGE_KEY);
		if (storedActorsString) {
			storedActors = JSON.parse(storedActorsString);
		}
	} catch (_e) {}
}

export const actors = writable<{
	[voiceURI: string]: {
		gender: string;
		age: string;
		fluency: number;
	};
}>(storedActors);

if (browser) {
	actors.subscribe((newActors) => {
		localStorage.setItem(ACTORS_LOCAL_STORAGE_KEY, JSON.stringify(newActors));
	});
}
