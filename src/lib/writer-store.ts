import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const WRITER_EDITOR_LOCAL_STORAGE_KEY = 'NICK-WRITER-EDITOR';

let currentWriterEditor: string = '';

if (browser) {
	try {
		currentWriterEditor = localStorage.getItem(WRITER_EDITOR_LOCAL_STORAGE_KEY) || '';
	} catch (_e) {}
}

export const writerEditor = writable<string>(currentWriterEditor);

if (browser) {
	writerEditor.subscribe((newWriterEditor) => {
		localStorage.setItem(WRITER_EDITOR_LOCAL_STORAGE_KEY, newWriterEditor);
	});
}
