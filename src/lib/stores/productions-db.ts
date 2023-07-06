import type { Production } from '$lib/types';

import { browser } from '$app/environment';

const PRODUCTIONS_DB_NAME = 'NICK_PRODUCTIONS_DB';
const PRODUCTIONS_DB_VERSION = 1;

const getIdb = () => {
	if (!browser) {
		throw new Error('Only available in browser');
	}

	const idbRequest = indexedDB.open(PRODUCTIONS_DB_NAME, PRODUCTIONS_DB_VERSION);

	idbRequest.onupgradeneeded = () => {
		const objectStore = idbRequest.result.createObjectStore('productions', { keyPath: 'id' });

		// objectStore.createIndex('')
	};

	return new Promise<IDBDatabase>((resolve, reject) => {
		idbRequest.onsuccess = () => {
			resolve(idbRequest.result);
		};

		idbRequest.onerror = () => {
			reject('Something went wrong when opening IndexedDB');
		};
	});
};
