<script lang="ts">
	import { onMount } from 'svelte';

	const idBase = 36;
	let iframeId = '';

	for (let i = 0; i < 36; i++) {
		iframeId = iframeId + Math.floor(Math.random() * idBase).toString(idBase);
	}

	let voices: SpeechSynthesisVoice[] = [];
	let voiceURI = '';
	let phrase = '';

	onMount(() => {
		voices = speechSynthesis.getVoices();

		speechSynthesis.addEventListener('voiceschanged', () => {
			voices = speechSynthesis.getVoices();
		});

		window.parent.postMessage({
			iframeId,
			type: 'hello'
		});

		window.addEventListener('message', (event) => {
			const { data, source } = event;
			if (data?.type === 'ping') {
				window.parent.postMessage({
					iframeId,
					type: 'pong'
				});
			} else if (data?.type === 'speak') {
				voiceURI = data?.voiceURI;
				phrase = data?.phrase;

				const voice = voices.find((v) => v.voiceURI === voiceURI);

				if (voice) {
					const utterance = new SpeechSynthesisUtterance(phrase);

					utterance.voice = voice;

					speechSynthesis.speak(utterance);
				}
			}
		});
	});
</script>

<h3>iframe: {iframeId}</h3>
{#if voiceURI && phrase}
	<div>Voice: {voiceURI}</div>
	<div>{phrase}</div>
{/if}
