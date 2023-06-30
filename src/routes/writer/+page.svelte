<script>
	import { onMount } from 'svelte';
	import { writerEditor } from '$lib/writer-store';
	import { lexer } from '$lib/opensourceshakespeare-org/lexer';

	let fullText = $writerEditor;

	$: tokens = lexer(fullText);
	$: fullText, writerEditor.set(fullText);

	onMount(() => {
		writerEditor.subscribe((newWriterEditor) => {
			console.log('hi');
			fullText = newWriterEditor;
		});
	});
</script>

<div>
	<h1>Writer</h1>
	<div>
		<form class="sticky top-1 inline-block w-[65ch] max-w-[48vw]">
			<textarea class="h-[80ch] w-[65ch] max-w-[48vw] resize-none p-1" bind:value={fullText} />
		</form>
		<div class="inline-block w-[65ch] max-w-[48vw] align-top">
			<pre>{JSON.stringify(tokens, null, '  ')}</pre>
		</div>
	</div>
</div>
