<script lang="ts">
	import { writerEditorStore } from '$lib/stores/writer-store';
	import { currentProductionStore } from '$lib/stores/production-store';

	import OSSCompiler from '$lib/compilers/opensourceshakespeare-org/compiler';

	$: compiler = new OSSCompiler($writerEditorStore);
	$: unknownTokens = compiler.tokens.filter((t) => t.type === 'unknown');
</script>

<div>
	<h1>Write</h1>
	<button
		on:click={() => {
			currentProductionStore.update((prevProduction) => {
				if (prevProduction) {
					return {
						...prevProduction,
						sourceText: $writerEditorStore
					};
				}

				const temp = $writerEditorStore.split('\n')[0];

				const name = temp.startsWith('//') ? temp.replace(/^\/\//, '').trim() : '';

				return {
					name,
					sourceText: $writerEditorStore,
					cast: [],
					direction: [],
					updatedTimestamp: Date.now()
				};
			});
		}}>Save as Current Production</button
	>
	<div>
		<form class="sticky top-1 inline-block w-[65ch] max-w-[48vw]">
			<textarea
				class="mt-1 h-[80ch] w-[65ch] max-w-[48vw] resize-none"
				bind:value={$writerEditorStore}
			></textarea>
			<button
				class="block"
				type="button"
				on:click={async () => {
					const res = await fetch('/oss-hamlet-a1-s1.txt');

					$writerEditorStore = await res.text();
				}}>Hamlet Act I, Scene 1</button
			>
			<button
				class="mt-1 block"
				type="button"
				on:click={async () => {
					const res = await fetch('/oss-hamlet-a1-full.txt');

					$writerEditorStore = await res.text();
				}}>Hamlet Act I, Scene 1-5</button
			>
			<button
				class="mt-1 block"
				type="button"
				on:click={async () => {
					const res = await fetch('/oss-hamlet-full.txt');

					$writerEditorStore = await res.text();
				}}>Hamlet Act I - V</button
			>
			<button
				class="mt-1 block"
				type="button"
				on:click={async () => {
					const res = await fetch('/mongodb-is-web-scale.txt');

					$writerEditorStore = await res.text();
				}}>MongoDB is Web Scale</button
			>
		</form>
		<div class="inline-block w-[65ch] max-w-[48vw] align-top">
			{#if compiler.error}
				<h3>Error</h3>
				<p>{compiler.error}</p>
			{/if}
			<h3>Dramatis Personae (ordered by appearance)</h3>
			<ul class="ml-8 list-decimal">
				{#each compiler.dramatisPersonae as character}
					<li>
						{character.name}
					</li>
				{/each}
			</ul>
			<details open={unknownTokens.length > 0}>
				<summary>Debug</summary>
				<details open>
					<summary>Tokens - Unknown Count: {unknownTokens.length}</summary>
					<ul class="ml-5 list-disc">
						{#each unknownTokens as token}
							<li><pre>{JSON.stringify(token, null, '  ')}</pre></li>
						{/each}
					</ul>
					<ul class="ml-8 list-disc">
						{#each unknownTokens as token}
							<li><pre class="w-min bg-gray-200 dark:bg-gray-700">{token.raw}</pre></li>
						{/each}
					</ul>
					<pre>{JSON.stringify(compiler.tokens, null, '  ')}</pre>
				</details>
				<details>
					<summary>Scenes</summary>
					<pre>{JSON.stringify(compiler.scenes, null, '  ')}</pre>
				</details>
			</details>
		</div>
	</div>
</div>
