import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const WRITER_EDITOR_LOCAL_STORAGE_KEY = 'NICK-WRITER-EDITOR';

let currentWriterEditor: string = '';

let isNewStore = true;

if (browser) {
	try {
		const temp = localStorage.getItem(WRITER_EDITOR_LOCAL_STORAGE_KEY);

		if (typeof temp === 'string') {
			isNewStore = false;
			currentWriterEditor = temp;
		}
	} catch (_e) {}
}

export const writerEditorStore = writable<string>(currentWriterEditor);

if (browser) {
	writerEditorStore.subscribe((newWriterEditor) => {
		localStorage.setItem(WRITER_EDITOR_LOCAL_STORAGE_KEY, newWriterEditor);
	});

	if (isNewStore) {
		(async () => {
			const res = await fetch('/oss-hamlet-a1-s1.txt');

			writerEditorStore.set(await res.text());
		})();
	}
}
