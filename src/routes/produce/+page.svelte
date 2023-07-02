<script lang="ts">
	import { onMount } from 'svelte';

	import OSSCompiler from '$lib/opensourceshakespeare-org/compiler';

	let fullText = '';

	$: compiler = new OSSCompiler(fullText);

	onMount(async () => {
		const res = await fetch('/oss-hamlet-a1-s1.txt');

		fullText = await res.text();
	});
</script>

<div>
	<h1>Produce</h1>

	<div>
		<pre>{JSON.stringify(compiler.scenes, null, '  ')}</pre>
	</div>
</div>
