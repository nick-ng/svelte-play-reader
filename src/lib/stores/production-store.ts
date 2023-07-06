import type { Production } from '$lib/types';

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import { IDBHelper } from './index-db';

export const productionStore = writable<Production[]>([]);

const load = async () => {
	const idbHelper = new IDBHelper('NICK-PRODUCTIONS-STORE');
	const idb = await idbHelper.dbPromise;
};

if (browser) {
	load();
}
