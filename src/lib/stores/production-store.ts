import type { Production } from '$lib/types';

import localforage from 'localforage';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import { uuid } from '$lib/utils';

const PRODUCTIONS_STORE = 'NICK_PRODUCTIONS';

const store = localforage.createInstance({
	name: PRODUCTIONS_STORE,
});

let currentProduction: Production | null = null;

if (browser) {
	try {
		const currentProductionString = localStorage.getItem(PRODUCTIONS_STORE);

		if (typeof currentProductionString === 'string') {
			currentProduction = JSON.parse(currentProductionString);
		}
	} catch (_e) {
		// noop
	}
}

export const currentProductionStore = writable(currentProduction);

if (browser) {
	currentProductionStore.subscribe((newCurrentProduction) => {
		localStorage.setItem(PRODUCTIONS_STORE, JSON.stringify(newCurrentProduction));
	});
}

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

export const updateCurrentProduction = async (
	callback: (previousProduction: Production) => Production
) => {
	productionStore.update((prev) => {
		const { current, currentId } = prev;

		if (!current || !currentId) {
			throw new Error(
				`Something went wrong when updating production: prev.currentId: ${currentId}, prev.current: ${JSON.stringify(
					current
				)}`
			);
		}

		const newProduction = callback(current);

		store.setItem(currentId, {
			...newProduction,
			updatedTimestamp: Date.now(),
		});

		return {
			...prev,
			current: newProduction,
		};
	});
};
