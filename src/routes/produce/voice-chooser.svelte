<script lang="ts">
	import type { Character, Production } from '$lib/types';

	import { onMount } from 'svelte';

	import { actorsStore } from '$lib/stores/actors-store';

	export let character: Character;
	export let castMember: Production['cast'][number] | undefined;
	export let volume: number;
	export let handleSave: (newCastMember: Production['cast'][number]) => void | Promise<void>;

	const DEFAULT_CAST_SETTINGS = {
		rate: 1,
		pitch: 1,
		gender: 'female',
		age: 'adult',
	};

	let currentRate = castMember?.rate || DEFAULT_CAST_SETTINGS.rate;
	let currentPitch = castMember?.pitch || DEFAULT_CAST_SETTINGS.pitch;
	let currentGender = castMember?.gender || DEFAULT_CAST_SETTINGS.gender;
	let currentVoiceURI = castMember?.voiceURI || undefined;

	let voicesFilter = '';

	let voices: ReturnType<typeof speechSynthesis.getVoices> = [];

	$: voices = voices.sort((a, b) => {
		const auditionNotesA = $actorsStore[a.voiceURI];
		const auditionNotesB = $actorsStore[b.voiceURI];

		const baseCompareResult = `${a.lang}${a.name}`.localeCompare(`${b.lang}${b.name}`);

		if (!auditionNotesA && !auditionNotesB) {
			return baseCompareResult;
		}

		if (auditionNotesA && !auditionNotesB) {
			return -1;
		} else if (auditionNotesB && !auditionNotesA) {
			return 1;
		} else if (auditionNotesA.gender === currentGender && auditionNotesB.gender !== currentGender) {
			return -1;
		} else if (auditionNotesB.gender === currentGender && auditionNotesA.gender !== currentGender) {
			return 1;
		} else if (auditionNotesA.fluency !== auditionNotesB.fluency) {
			return auditionNotesB.fluency - auditionNotesA.fluency;
		}

		return `${a.lang}${a.name}`.localeCompare(`${b.lang}${b.name}`);
	});

	onMount(() => {
		voices = speechSynthesis.getVoices();

		speechSynthesis.addEventListener('voiceschanged', () => {
			voices = speechSynthesis.getVoices();
		});
	});
</script>

<details open={!castMember?.voiceURI}>
	<summary>{character.name}</summary>
	<table>
		<tbody>
			<tr>
				<td>Speech Rate</td>
				<td><input type="range" min="0.1" max="2" step="0.1" bind:value={currentRate} /></td>
			</tr>
			<tr>
				<td>Speech Pitch</td>
				<td><input type="range" min="0.1" max="2" step="0.1" bind:value={currentPitch} /></td>
			</tr>
			<tr>
				<td>Gender</td>
				<td>
					<select bind:value={currentGender}>
						<option value="female">Female</option>
						<option value="male">Male</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
	<div>
		<input type="text" bind:value={voicesFilter} />
		<button>Stop Talking</button>
		<div class="max-h-48 overflow-y-scroll">
			{#each voices as voice}
				<div class="odd-rows p-1">
					<span>({voice.lang}) {voice.name}</span><span>
						- {$actorsStore[voice.voiceURI]?.fluency}</span
					>
					<button
						on:click={() => {
							speechSynthesis.cancel();
							const utterance = new SpeechSynthesisUtterance(voice.name);

							utterance.voice = voice;
							utterance.rate = currentRate;
							utterance.pitch = currentPitch;
							utterance.volume = volume;
							speechSynthesis.speak(utterance);
						}}>Test</button
					>
				</div>
			{/each}
		</div>
		<button
			on:click={() => {
				console.log('currentRate', currentRate);
				console.log('currentPitch', currentPitch);
				console.log('currentGender', currentGender);
				handleSave({
					character: character.name,
					gender: currentGender,
					pitch: currentPitch,
					rate: currentRate,
				});
			}}
		>
			Save
		</button>
	</div>
</details>
