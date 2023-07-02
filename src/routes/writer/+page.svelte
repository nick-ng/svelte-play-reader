<script lang="ts">
	import { onMount } from 'svelte';
	import { writerEditor } from '$lib/writer-store';

	import OSSCompiler from '$lib/opensourceshakespeare-org/compiler';

	let fullText = $writerEditor;

	$: compiler = new OSSCompiler(fullText);
	$: fullText, writerEditor.set(fullText);
	$: unknownTokens = compiler.tokens.filter((t) => t.type === 'unknown');
	$: tokensWithMatch = compiler.tokens.filter((t) => t.match);

	onMount(() => {
		writerEditor.subscribe((newWriterEditor) => {
			fullText = newWriterEditor;
		});
	});
</script>

<div>
	<h1>Writer</h1>
	<div>
		<form class="sticky top-1 inline-block w-[65ch] max-w-[48vw]">
			<textarea class="mt-1 h-[80ch] w-[65ch] max-w-[48vw] resize-none p-1" bind:value={fullText} />
		</form>
		<div class="inline-block w-[65ch] max-w-[48vw] align-top">
			<h3>Dramatis Personae (ordered by appearance)</h3>
			<ul class="ml-8 list-decimal">
				{#each compiler.dramatisPersonae as character}
					<li>
						{character.name}
					</li>
				{/each}
			</ul>
			<details open={tokensWithMatch.length > 0}>
				<summary>Debug</summary>
				<details open>
					<summary>Tokens - Unknown Count: {unknownTokens.length}</summary>
					<ul class="ml-5 list-disc">
						{#each tokensWithMatch as token}
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
			</details>
		</div>
	</div>
</div>
