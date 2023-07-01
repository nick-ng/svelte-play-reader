<script lang="ts">
	import { onMount } from 'svelte';
	import { writerEditor } from '$lib/writer-store';
	import { lexer } from '$lib/opensourceshakespeare-org/lexer';

	let fullText = $writerEditor;

	$: tokens = lexer(fullText);
	$: fullText, writerEditor.set(fullText);
	$: unknownTokens = tokens.filter((t) => t.type === 'unknown');
	$: tokensWithMatch = tokens.filter((t) => t.match);
	$: dramatisPersonae = tokens
		.filter((t) => t.type === 'character-lines')
		.reduce((accumulator, token) => {
			if (token.character && !accumulator[token.character]) {
				accumulator[token.character] = { name: token.character };
			}

			return accumulator;
		}, {} as { [characterName: string]: { name: string } });

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
			<textarea class="h-[80ch] w-[65ch] max-w-[48vw] resize-none p-1" bind:value={fullText} />
		</form>
		<div class="inline-block w-[65ch] max-w-[48vw] align-top">
			<p>Unknown Token Count: {unknownTokens.length}</p>
			<h3>Dramatis Personae</h3>
			<ul class="ml-5 list-disc">
				{#each Object.values(dramatisPersonae) as character}
					<li>
						{character.name}
					</li>
				{/each}
			</ul>
			<ul class="ml-5 list-disc">
				{#each unknownTokens as token}
					<li><pre class="w-min bg-gray-200 dark:bg-gray-700">{token.raw}</pre></li>
				{/each}
			</ul>
			<ul class="ml-5 list-disc">
				{#each tokensWithMatch as token}
					<li><pre>{JSON.stringify(token, null, '  ')}</pre></li>
				{/each}
			</ul>
			<pre>{JSON.stringify(tokens, null, '  ')}</pre>
		</div>
	</div>
</div>
