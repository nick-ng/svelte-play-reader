<script lang="ts">
	import type { Scene } from '$lib/types';

	export let scenes: Scene[] = [];
	export let currentStep = '';
	export let currentFeet = '';

	let currentSceneIndex = 0;
	let currentScene: Scene | undefined;

	$: currentScene = scenes[currentSceneIndex];
</script>

<div class="my-2 max-h-96 overflow-y-scroll rounded-sm border border-gray-500">
	<h2 class="mx-1">Stage</h2>

	<div>
		{#each scenes as scene}
			<h3 class="mx-1">Act: {scene.act}, Scene: {scene.scene}</h3>
			{#each scene.settings as setting}
				<p class="mx-1">{setting}</p>
			{/each}
			<table class="max-w-prose">
				<tbody>
					{#each scene.steps as s, i}
						<tr
							id={`a${scene.act}_s${scene.scene}_${i}`}
							class={`a${scene.act}_s${scene.scene}_${i}` === currentStep
								? 'bg-green-200 dark:bg-green-800'
								: 'odd-rows'}
						>
							{#if s.type === 'character-lines'}
								<td class="relative bg-inherit px-2 py-1 align-top font-bold"
									><div class="sticky top-0 bg-inherit">{s.character}.</div></td
								>
								<td class="px-2 py-1 align-top">
									{#each s.feets as feet, j}
										<div
											id={`a${scene.act}_s${scene.scene}_${i}_${j}`}
											class={currentFeet === `a${scene.act}_s${scene.scene}_${i}_${j}`
												? 'underline'
												: ''}
										>
											{feet}
										</div>
									{/each}
								</td>
								<td class="px-2 py-1 text-xs">
									{`a${scene.act}_s${scene.scene}_${i}`}
								</td>
							{:else if s.type === 'stage-direction' && s.subType === 'movement'}
								<td colspan="2" class="px-2 py-1 align-top text-lg italic">
									<span class="capitalize">{s.direction}</span>
									{s.characterNames.join(s.timing === 'sequential' ? ' then ' : ', ')}
								</td>
								<td class="px-2 py-1 text-xs">
									{`a${scene.act}_s${scene.scene}_${i}`}
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		{/each}
	</div>
</div>
