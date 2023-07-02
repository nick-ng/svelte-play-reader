<script lang="ts">
	import { onMount } from 'svelte';
	import { actors } from '$lib/actors-store';

	let voices: SpeechSynthesisVoice[] = [];
	let nameFilter = navigator.userAgent.toLowerCase().includes('edge') ? 'natural; english' : '';
	let sayPhrase = 'O, the Pelican. So smoothly doth he crest. A wind god!';

	let genders: { [voiceURI: string]: string } = {};
	let ages: { [voiceURI: string]: string } = {};
	let fluencies: { [voiceURI: string]: number } = {};

	let actorsJsonString = '';

	actors.subscribe((newActors) => {
		Object.entries(newActors).forEach(([voiceURI, { gender, age, fluency }]) => {
			genders[voiceURI] = gender;
			ages[voiceURI] = age;
			fluencies[voiceURI] = fluency;
		});
	});

	$: filteredVoices = voices
		.filter((v) =>
			nameFilter.split(';').every((f) => v.name.toUpperCase().includes(f.trim().toUpperCase()))
		)
		.sort((a, b) => {
			if ($actors[a.voiceURI] && !$actors[b.voiceURI]) {
				return 1;
			}

			if (!$actors[a.voiceURI] && $actors[b.voiceURI]) {
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
	<h1>Cast</h1>

	<div class="sticky top-0 flex flex-row items-end bg-white py-1 dark:bg-gray-800">
		<div>
			<label>Filter: <input type="text" bind:value={nameFilter} /></label>
			<div class="block">Phrase:</div>
			<textarea class="block h-40 w-80 resize-none" bind:value={sayPhrase} />
		</div>
		<div class="ml-2">
			<button
				class="button-default"
				on:click={() => {
					actorsJsonString = JSON.stringify($actors);
				}}>Export</button
			> <button class="button-default">Import</button>
			<textarea class="mt-2 block h-40 w-80 resize-none" bind:value={actorsJsonString} />
		</div>
	</div>

	<div>
		Voices: {filteredVoices.length}
	</div>
	<div>
		{#each filteredVoices as voice}
			<div class="my-1 border p-2 {$actors[voice.voiceURI] ? '' : 'bg-gray-100 dark:bg-gray-700'}">
				<h2>{voice.name}</h2>
				<button
					class="button-default"
					on:click={() => {
						const utterance = new SpeechSynthesisUtterance(sayPhrase);

						utterance.voice = voice;
						speechSynthesis.speak(utterance);
					}}>Test ({voice.lang})</button
				>

				<form>
					<div class="flex flex-row">
						<div class="flex flex-col">
							<h3>
								Gender <span
									>{genders[voice.voiceURI] === $actors[voice.voiceURI]?.gender ? '' : '*'}</span
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
								Age <span>{ages[voice.voiceURI] === $actors[voice.voiceURI]?.age ? '' : '*'}</span>
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
									>{fluencies[voice.voiceURI] === $actors[voice.voiceURI]?.fluency ? '' : '*'}</span
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
							actors.update((prevActors) => {
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
