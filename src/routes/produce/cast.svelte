<script lang="ts">
	import type OSSCompiler from '$lib/compilers/opensourceshakespeare-org/compiler';
	import type { Production } from '$lib/types';

	import { currentProductionStore } from '$lib/stores/production-store';

	export let compiler: OSSCompiler;

	let currentCast: Production['cast'] = [];

	const DEFAULT_CAST_SETTINGS = {
		rate: 1,
		pitch: 1,
	};

	$: currentCast = $currentProductionStore?.cast || [];
</script>

<div class="basis-prose">
	<h1>Cast</h1>

	<div>
		{#each compiler.dramatisPersonae as character}
			{@const castMember = currentCast.find((c) => c.character === character.name)}
			<details open={!castMember?.voiceURI}>
				<summary>{character.name}</summary>
				<table>
					<tbody>
						<tr>
							<td>Speech Rate</td>
							<td
								><input
									type="range"
									min="0.1"
									max="2"
									step="0.1"
									value={castMember?.rate || DEFAULT_CAST_SETTINGS.pitch}
									on:change={(e) => {
										console.log('speech pitch', e.currentTarget.value);
									}}
								/></td
							>
						</tr>
						<tr>
							<td>Speech Pitch</td>
							<td
								><input
									type="range"
									min="0.1"
									max="2"
									step="0.1"
									value={castMember?.pitch || DEFAULT_CAST_SETTINGS.pitch}
									on:change={(e) => {
										console.log('speech pitch', e.currentTarget.value);
									}}
								/></td
							>
						</tr>
						<tr><td>Gender</td><td>label</td></tr>
						<tr>
							<td colspan="2">
								<div />
							</td>
						</tr>
					</tbody>
				</table>
			</details>
		{/each}
	</div>
</div>
