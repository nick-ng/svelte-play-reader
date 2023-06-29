<script lang="ts">
	import { onMount } from 'svelte';

	let iframeNumbers: number[] = [];
	let iframes: {
		source: MessageEventSource | null;
		iframeId: string | null;
	}[] = [];

	let voices: SpeechSynthesisVoice[] = [];

	onMount(() => {
		window.addEventListener('message', (event) => {
			const { data, source, origin } = event;

			console.log('data', data);
			console.log('source', source);
			console.log('origin', origin);
			if (data?.type === 'hello' && data?.iframeId) {
				iframes.push({
					source,
					iframeId: data?.iframeId
				});
			}
		});

		iframeNumbers = [0, 1, 2];

		voices = speechSynthesis.getVoices();

		speechSynthesis.addEventListener('voiceschanged', () => {
			voices = speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
			voices.sort((a, b) => `${a.lang}${a.name}`.localeCompare(`${b.lang}${b.name}`));
		});
	});
</script>

<div>
	{#if voices.length > 0}
		<ul>
			{#each iframeNumbers as iframeNumber}
				<li>{voices[iframeNumber].name}</li>
			{/each}
		</ul>{/if}
	<button
		class="button-default"
		on:click={() => {
			console.log('iframes', iframes);
			for (let i = 0; i < 3; i++) {
				const iframe = iframes[i];

				iframe.source?.postMessage({
					// iframeId: iframe0.iframeId,
					type: 'speak',
					voiceURI: voices[i].voiceURI,
					phrase: 'O, the Pelican. So smoothly doth he crest. A wind god!'
				});
			}
		}}>Test</button
	>
	<div>
		{#each iframeNumbers as iframeNumber}
			<iframe src="/iframe" title={`iframe-${iframeNumber}`} width="500" height="200" />
		{/each}
	</div>
</div>
