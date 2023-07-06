<script lang="ts">
	import { writerEditorStore } from '$lib/stores/writer-store';
	import { playLine } from '$lib/speech-utils';
	import OSSCompiler from '$lib/compilers/opensourceshakespeare-org/compiler';
	import Stage from '$lib/components/theater-stage.svelte';

	let fullText = $writerEditorStore;
	let speakingCharacter = '';
	let feetNumber = 0;
	let stop = true;
	let stepId = '';
	let feetId = '';

	$: compiler = new OSSCompiler(fullText);
</script>

<div>
	<h1>Produce</h1>

	<div>Speaking Character: {speakingCharacter}</div>
	<div>Step ID: {stepId}:{feetNumber}</div>

	<Stage scenes={compiler.scenes} currentStep={stepId} currentFeet={feetId} />

	<button
		class="button-default"
		on:click={async () => {
			stop = false;

			for (let i = 0; i < compiler.scenes.length; i++) {
				const scene = compiler.scenes[i];
				for (let j = 0; j < scene.steps.length; j++) {
					stepId = `a${scene.act}_s${scene.scene}_${j}`;
					const s = scene.steps[j];

					if (s.type === 'stage-direction') {
						const el = document.getElementById(stepId);

						el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
						await new Promise((resolve) => {
							setTimeout(resolve, 500);
						});
					} else if (s.type === 'character-lines') {
						for (let k = 0; k < s.feets.length; k++) {
							if (stop) {
								return;
							}

							const f = s.feets[k];
							const u = playLine(f, null, 0.5, 1);

							speakingCharacter = s.character;
							feetNumber = k;

							feetId = `${stepId}_${k}`;

							const el = document.getElementById(feetId);

							el?.scrollIntoView({ behavior: 'smooth', block: 'center' });

							await new Promise((resolve) => {
								u.onend = () => {
									resolve(null);
								};
							});
						}
					}
				}
			}

			stop = true;
			stepId = '';
			feetId = '';
		}}>Play</button
	>

	<button
		class="button-default"
		on:click={() => {
			speechSynthesis.cancel();
			stop = true;
			stepId = '';
			feetId = '';
		}}>Stop</button
	>

	<div>
		<div>
			<button
				class="button-default"
				on:click={() => {
					fullText = $writerEditorStore;
				}}
			>
				Your play from the "Write" page
			</button>
		</div>
		<div>
			<button
				class="button-default"
				on:click={async () => {
					const res = await fetch('/oss-hamlet-a1-s1.txt');

					fullText = await res.text();
				}}>Hamlet, Act I, Scene 1</button
			>
		</div>
		<div>
			<button
				class="button-default"
				on:click={async () => {
					const res = await fetch('/mongodb-is-web-scale.txt');

					fullText = await res.text();
				}}>MongoDB is Web Scale</button
			>
		</div>
	</div>

	<details>
		<summary>Debug</summary>
		<pre>{JSON.stringify(compiler.scenes, null, '  ')}</pre>
	</details>
</div>
