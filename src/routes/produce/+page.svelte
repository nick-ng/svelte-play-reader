<script lang="ts">
	import { onMount } from 'svelte';
	import { currentProductionStore } from '$lib/stores/production-store';
	import { playLine } from '$lib/speech-utils';
	import OSSCompiler from '$lib/compilers/opensourceshakespeare-org/compiler';
	import Stage from '$lib/components/theater-stage.svelte';
	import Cast from './cast.svelte';

	let speakingCharacter = '';
	let actor = '';
	let feetNumber = 0;
	let stop = true;
	let stepId = '';
	let feetId = '';

	let volume = 0.3;

	let voices: ReturnType<typeof speechSynthesis.getVoices> = [];

	$: compiler = new OSSCompiler($currentProductionStore?.sourceText || '');

	onMount(() => {
		voices = speechSynthesis.getVoices();

		speechSynthesis.addEventListener('voiceschanged', () => {
			voices = speechSynthesis.getVoices();
		});
	});
</script>

<Cast {compiler} {volume} />

<div class="basis-prose">
	<h1>Produce</h1>

	<table class="border-separate border-spacing-1">
		<tbody>
			<tr>
				<td> Speaking Character </td>
				<td>
					{speakingCharacter}
				</td>
			</tr>
			<tr>
				<td>Actor</td>
				<td>{actor}</td>
			</tr>
			<tr>
				<td>Step ID</td>
				<td>{stepId ? `${stepId}: ${feetNumber}` : ''}</td>
			</tr>
		</tbody>
	</table>

	<Stage scenes={compiler.scenes} currentStep={stepId} currentFeet={feetId} />

	<button
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

							const castMember = $currentProductionStore.cast.find(
								(c) => c.character === s.character
							);

							const voice = castMember
								? voices.find((v) => v.voiceURI === castMember.voiceURI) || null
								: null;

							const f = s.feets[k];
							const u = playLine({
								phrase: f,
								voice,
								volume,
								rate: 1,
								pitch: 1
							});

							speakingCharacter = s.character;
							actor = voice?.name || '';

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
		on:click={() => {
			speechSynthesis.cancel();
			stop = true;
			stepId = '';
			feetId = '';
		}}>Stop</button
	>

	<details>
		<summary>Debug</summary>
		<pre>{JSON.stringify(compiler.scenes, null, '  ')}</pre>
	</details>
</div>

<div class="basis-prose">
	<h1>Controls</h1>
	<label
		>Volume: <input
			class="align-text-bottom"
			type="range"
			min={0}
			max={1}
			step={0.01}
			bind:value={volume}
		/></label
	>
</div>
