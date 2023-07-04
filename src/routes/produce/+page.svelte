<script lang="ts">
	import { onMount } from 'svelte';
	import { playLine } from '$lib/speech-utils';
	import OSSCompiler from '$lib/opensourceshakespeare-org/compiler';
	import Stage from '$lib/components/theater-stage.svelte';

	let fullText = '';
	let speakingCharacter = '';
	let feetNumber = 0;
	let stop = true;

	$: compiler = new OSSCompiler(fullText);

	onMount(async () => {
		const res = await fetch('/oss-hamlet-a1-s1.txt');

		fullText = await res.text();
	});
</script>

<div>
	<h1>Produce</h1>

	<Stage />

	<button
		class="button-default"
		on:click={async () => {
			stop = false;

			for (const s of compiler.scenes[0].steps) {
				if (s.type === 'character-lines') {
					for (let i = 0; i < s.feets.length; i++) {
						if (stop) {
							return;
						}

						const f = s.feets[i];
						const u = playLine(f, null, 0.5, 1);

						speakingCharacter = s.character;
						feetNumber = i;

						await new Promise((resolve) => {
							u.onend = resolve;
						});
					}
				}
			}
		}}>Test</button
	>
	<button
		class="button-default"
		on:click={() => {
			speechSynthesis.cancel();
			stop = true;
		}}>Stop</button
	>

	<p>Speaking Character: {speakingCharacter}</p>
	<p>{feetNumber}</p>

	<div>
		<pre>{JSON.stringify(compiler.scenes, null, '  ')}</pre>
	</div>
</div>
