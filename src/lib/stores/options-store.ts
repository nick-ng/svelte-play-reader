import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const OPTIONS_LOCAL_STORAGE_KEY = 'NICK-OPTIONS';

type Options = {
	auditionVolume: number;
	auditionRate: number;
	auditionNameFilter: string;
	auditionPhrase: string;
};

let storedOptions: Options = {
	auditionVolume: 0.5,
	auditionRate: 1,
	auditionNameFilter: '',
	auditionPhrase: 'O, the Pelican. So smoothly doth he crest. A wind god!',
};

if (browser) {
	try {
		const storedOptionsString = localStorage.getItem(OPTIONS_LOCAL_STORAGE_KEY);

		if (typeof storedOptionsString !== 'string') {
			storedOptions.auditionNameFilter = navigator.userAgent.toLowerCase().includes('edge')
				? 'natural; english'
				: '';
		}

		if (storedOptionsString) {
			storedOptions = {
				...storedOptions,
				...JSON.parse(storedOptionsString),
			};
		}
	} catch (_e) {
		// noop
	}
}

export const optionsStore = writable<Options>(storedOptions);

if (browser) {
	optionsStore.subscribe((newOptions) => {
		localStorage.setItem(OPTIONS_LOCAL_STORAGE_KEY, JSON.stringify(newOptions));
	});
}
