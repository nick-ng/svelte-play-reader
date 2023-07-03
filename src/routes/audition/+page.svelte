<script lang="ts">
	import { onMount } from 'svelte';
	import { actorsStore } from '$lib/actors-store';
	import { optionsStore } from '$lib/options-store';

	let voices: SpeechSynthesisVoice[] = [];

	let genders: { [voiceURI: string]: string } = {};
	let ages: { [voiceURI: string]: string } = {};
	let fluencies: { [voiceURI: string]: number } = {};

	let actorsJsonString = '';

	actorsStore.subscribe((newActors) => {
		Object.entries(newActors).forEach(([voiceURI, { gender, age, fluency }]) => {
			genders[voiceURI] = gender;
			ages[voiceURI] = age;
			fluencies[voiceURI] = fluency;
		});
	});

	$: filteredVoices = voices
		.filter((v) =>
			$optionsStore.auditionNameFilter
				.split(';')
				.every((f) => v.name.toUpperCase().includes(f.trim().toUpperCase()))
		)
		.sort((a, b) => {
			if ($actorsStore[a.voiceURI] && !$actorsStore[b.voiceURI]) {
				return 1;
			}

			if (!$actorsStore[a.voiceURI] && $actorsStore[b.voiceURI]) {
				return -1;
			}

			return `${a.lang}${a.name}`.localeCompare(`${b.lang}${b.name}`);
		});

	onMount(() => {
		voices = speechSynthesis.getVoices();

		speechSynthesis.addEventListener('voiceschanged', () => {
			voices = speechSynthesis.getVoices();
			voices.sort((a, b) => `${a.lang}${a.name}`.localeCompare(`${b.lang}${b.name}`));
		});
	});
</script>

<div class="max-w-prose">
	<h1>Audition</h1>

	<div class="sticky top-0 py-1">
		<div class="flex flex-row items-end bg-white dark:bg-gray-800">
			<div>
				<label>Filter: <input type="text" bind:value={$optionsStore.auditionNameFilter} /></label>
				<div class="block">Phrase:</div>
				<textarea class="block h-40 w-72 resize-none" bind:value={$optionsStore.auditionPhrase} />
			</div>
			<div class="ml-2">
				<button
					class="button-default"
					on:click={() => {
						actorsJsonString = JSON.stringify($actorsStore);
					}}>Export</button
				> <button class="button-default">Import</button>
				<textarea class="mt-2 block h-40 w-56 resize-none" bind:value={actorsJsonString} />
			</div>
		</div>
		<div>
			<label class="block text-right"
				>Volume:&nbsp;<input
					class="align-text-bottom"
					type="range"
					max={1}
					min={0}
					step={0.01}
					bind:value={$optionsStore.auditionVolume}
				/>&nbsp;<span class="font-mono">{$optionsStore.auditionVolume.toFixed(2)}</span></label
			>
			<label class="block text-right"
				>Rate:&nbsp;<input
					class="align-text-bottom"
					type="range"
					max={2}
					min={0.1}
					step={0.01}
					bind:value={$optionsStore.auditionRate}
				/>&nbsp;<span class="font-mono">{$optionsStore.auditionRate.toFixed(2)}</span></label
			>
		</div>
	</div>

	<div>
		Voices: {filteredVoices.length}
	</div>
	<div>
		{#each filteredVoices as voice}
			<div
				class="my-1 border p-2 {$actorsStore[voice.voiceURI] ? '' : 'bg-gray-100 dark:bg-gray-700'}"
			>
				<h2>{voice.name}</h2>
				<button
					class="button-default"
					on:click={() => {
						const utterance = new SpeechSynthesisUtterance($optionsStore.auditionPhrase);

						utterance.voice = voice;
						utterance.rate = $optionsStore.auditionRate;
						utterance.volume = $optionsStore.auditionVolume;
						speechSynthesis.speak(utterance);
					}}>Test ({voice.lang})</button
				>

				<form>
					<div class="flex flex-row">
						<div class="flex flex-col">
							<h3>
								Gender <span
									>{genders[voice.voiceURI] === $actorsStore[voice.voiceURI]?.gender
										? ''
										: '*'}</span
								>
							</h3>
							{#each ['Male', 'Female'] as gender}
								<label>
									<input
										type="radio"
										bind:group={genders[voice.voiceURI]}
										name="gender"
										value={gender.toLowerCase()}
										required
									/>
									{gender}</label
								>
							{/each}
						</div>
						<div class="ml-4 flex flex-col">
							<h3>
								Age <span
									>{ages[voice.voiceURI] === $actorsStore[voice.voiceURI]?.age ? '' : '*'}</span
								>
							</h3>
							{#each ['Child', 'Adult', 'Elderly'] as age}
								<label>
									<input
										type="radio"
										bind:group={ages[voice.voiceURI]}
										name="age"
										value={age.toLowerCase()}
										required
									/>
									{age}
								</label>
							{/each}
						</div>
						<div class="ml-4 flex flex-col">
							<h3>
								Fluency (5 = most fluent) <span
									>{fluencies[voice.voiceURI] === $actorsStore[voice.voiceURI]?.fluency
										? ''
										: '*'}</span
								>
							</h3>
							{#each [1, 2, 3, 4, 5] as fluency}
								<label>
									<input
										type="radio"
										bind:group={fluencies[voice.voiceURI]}
										name="fluency"
										value={fluency}
										required
									/>
									{fluency}
								</label>
							{/each}
						</div>
					</div>
					<button
						type="button"
						class="button-default mt-1 block"
						on:click={() => {
							actorsStore.update((prevActors) => {
								prevActors[voice.voiceURI] = {
									age: ages[voice.voiceURI],
									gender: genders[voice.voiceURI],
									fluency: fluencies[voice.voiceURI],
								};

								return prevActors;
							});
						}}>Save</button
					>
				</form>
				<span>{voice.voiceURI}</span>
			</div>
		{/each}
	</div>
</div>
