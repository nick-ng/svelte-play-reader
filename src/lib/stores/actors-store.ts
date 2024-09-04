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
	} catch (e) {
		console.error('error loading actors', e);
	}
}

export const actorsStore = writable<{
	[voiceURI: string]: {
		gender: string;
		age: string;
		fluency: number;
	};
}>(storedActors);

if (browser) {
	actorsStore.subscribe((newActors) => {
		localStorage.setItem(ACTORS_LOCAL_STORAGE_KEY, JSON.stringify(newActors));
	});
}
