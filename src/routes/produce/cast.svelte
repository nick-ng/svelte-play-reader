<script lang="ts">
	import type OSSCompiler from '$lib/compilers/opensourceshakespeare-org/compiler';

	import { currentProductionStore } from '$lib/stores/production-store';

	import VoiceChooser from './voice-chooser.svelte';

	export let compiler: OSSCompiler;
	export let volume: number;

	$: currentCast = $currentProductionStore?.cast || [];
	$: uncastCharacters = compiler.dramatisPersonae.filter(
		(character) =>
			!$currentProductionStore?.cast.find((castMember) => castMember.character === character.name)
	);
	$: totalWords = compiler.dramatisPersonae.reduce((accumulator, c) => accumulator + c.words, 0);
</script>

<div class="basis-prose">
	<h1>Cast</h1>
	<p>Uncast Characters: {uncastCharacters.length}</p>
	<div>
		{#each compiler.dramatisPersonae as character}
			{@const castMember = currentCast.find((c) => c.character === character.name)}
			<VoiceChooser
				{castMember}
				{character}
				{volume}
				{totalWords}
				handleSave={(newCasting) => {
					currentProductionStore.update((prevProduction) => {
						const prevCast = prevProduction.cast;

						return {
							...prevProduction,
							cast: prevCast
								.filter((c) => c.character !== newCasting.character)
								.concat([newCasting]),
						};
					});
				}}
			/>
		{/each}
	</div>
</div>
