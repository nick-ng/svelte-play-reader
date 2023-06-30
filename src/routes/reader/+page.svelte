<script lang="ts">
	import { onMount } from 'svelte';

	let iframeNumbers: number[] = [];
	let iframes: {
		source: MessageEventSource | Window | null;
		iframeId: string | null;
	}[] = [];

	let voices: SpeechSynthesisVoice[] = [];
	let speaker = '';

	const phrase = 'O, the Pelican. So smoothly doth he crest. A wind god!';

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
	<p>{speaker}</p>
	<p>{phrase}</p>
	<button
		class="button-default"
		on:click={async () => {
			const phraseWords = phrase.split(' ');

			const utterance = new SpeechSynthesisUtterance(phrase);

			let counter = 0;
			utterance.voice = voices[counter];
			speaker = utterance.voice.name;
			utterance.onboundary = () => {
				counter++;
				speechSynthesis.pause();
				utterance.voice = voices[counter % 3];
				console.log('counter', counter);
				speaker = utterance.voice.name;
				speechSynthesis.resume();
			};

			speechSynthesis.speak(utterance);

			// for (let i = 0; i < phraseWords.length; i++) {
			// 	const word = phraseWords[i];

			// 	utterance.text = word;
			// 	utterance.voice = voices[i % 3];

			// 	speechSynthesis.speak(utterance);

			// 	await new Promise((resolve) => {
			// 		utterance.onboundary = resolve;
			// 	});
			// }
		}}>Test</button
	>
	<div>
		<!-- {#each iframeNumbers as iframeNumber}
			<iframe
				src="/iframe/{iframeNumber}"
				title={`iframe-${iframeNumber}`}
				width="500"
				height="200"
			/>
		{/each} -->
	</div>
</div>
