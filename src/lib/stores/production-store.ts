import type { Production } from '$lib/types';

import localforage from 'localforage';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import { uuid } from '$lib/utils';

const PRODUCTIONS_STORE = 'NICK_PRODUCTIONS';

const store = localforage.createInstance({
	name: PRODUCTIONS_STORE,
});

export const productionStore = writable<{
	list: {
		id: string;
		name: string;
		updatedTimestamp: number;
	}[];
	current?: Production;
	currentId?: string;
}>({ list: [] });

const updateProductionList = async () => {
	if (browser) {
		try {
			const productionList: {
				id: string;
				name: string;
				updatedTimestamp: number;
			}[] = [];

			await store.iterate<Production, Production | void>((production, key) => {
				if (production?.name) {
					productionList.push({
						id: key,
						name: production.name,
						updatedTimestamp: production.updatedTimestamp,
					});
				}
			});

			productionStore.update((prev) => ({
				...prev,
				list: productionList,
			}));
		} catch (e) {
			// noop
		}
	}
};

updateProductionList();

export const createProduction = (newProduction: Production) => {
	store.setItem(uuid(), {
		...newProduction,
		updatedTimestamp: Date.now(),
	});

	return updateProductionList();
};

export const setCurrentProduction = async (id: string) => {
	try {
		const currentProduction: Production | null = await store.getItem(id);

		if (currentProduction) {
			productionStore.update((prev) => ({
				...prev,
				current: currentProduction,
				currentId: id,
			}));
		}
	} catch (e) {
		// noop
	}
};
