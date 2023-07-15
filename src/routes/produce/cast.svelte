<script lang="ts">
	import type OSSCompiler from '$lib/compilers/opensourceshakespeare-org/compiler';
	import type { Character, Production } from '$lib/types';

	import { currentProductionStore } from '$lib/stores/production-store';

	import VoiceChooser from './voice-chooser.svelte';

	export let compiler: OSSCompiler;

	let volume = 0.3;
	let currentCast: Production['cast'] = [];
	let uncastCharacters: Character[] = compiler.dramatisPersonae;

	$: currentCast = $currentProductionStore?.cast || [];
	$: uncastCharacters = compiler.dramatisPersonae.filter(
		(character) =>
			!$currentProductionStore?.cast.find((castMember) => castMember.character === character.name)
	);
</script>

<div class="basis-prose">
	<h1>Cast</h1>
	<p>Uncast Characters: {uncastCharacters.length}</p>
	<label>Volume: <input type="range" min={0} max={1} step={0.01} bind:value={volume} /></label>
	<div>
		{#each compiler.dramatisPersonae as character}
			{@const castMember = currentCast.find((c) => c.character === character.name)}
			<VoiceChooser
				{castMember}
				{character}
				{volume}
				handleSave={(a) => {
					console.log('a', a);
				}}
			/>
		{/each}
	</div>
</div>
