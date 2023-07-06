// import { browser } from '$app/environment';

export class IDBHelper {
	dbName: string;
	dbVersion: number;
	dbPromise: Promise<IDBDatabase>;
	dbOpenRequest: IDBOpenDBRequest;

	constructor(dbName: string, dbVersion = 0) {
		// if (!browser) {
		// }

		this.dbName = dbName;
		this.dbVersion = dbVersion;

		this.dbOpenRequest = indexedDB.open(dbName, dbVersion);

		this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
			this.dbOpenRequest.onsuccess = () => {
				resolve(this.dbOpenRequest.result);
			};

			this.dbOpenRequest.onerror = () => {
				reject('Error opening IndexedDB');
			};
		});
	}

	// @todo(nick-ng): make play store https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
}
