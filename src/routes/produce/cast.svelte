<script lang="ts">
	import type OSSCompiler from '$lib/compilers/opensourceshakespeare-org/compiler';
	import type { Production } from '$lib/types';

	import { currentProductionStore } from '$lib/stores/production-store';

	import VoiceChooser from './voice-chooser.svelte';

	export let compiler: OSSCompiler;

	let currentCast: Production['cast'] = [];

	$: currentCast = $currentProductionStore?.cast || [];
</script>

<div class="basis-prose">
	<h1>Cast</h1>

	<div>
		{#each compiler.dramatisPersonae as character}
			{@const castMember = currentCast.find((c) => c.character === character.name)}
			<VoiceChooser
				{castMember}
				{character}
				handleSave={(a) => {
					console.log('a', a);
				}}
			/>
		{/each}
	</div>
</div>
