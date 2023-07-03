<script>
	import { browser } from '$app/environment';
	import '../app.css';

	if (browser) {
		document.title = 'Play Reader';
	}
</script>

<nav class="mx-2 flex flex-row justify-start py-2">
	<a class="rounded border border-gray-300 px-2 py-1" href="/">Home</a>
	<a class="ml-1 rounded border border-gray-300 px-2 py-1" href="/write">Write</a>
	<a class="ml-1 rounded border border-gray-300 px-2 py-1" href="/audition">Audition</a>
	<a class="ml-1 rounded border border-gray-300 px-2 py-1" href="/produce">Produce</a>
	<div class="flex-grow" />
	<a
		class="rounded border border-gray-300 px-2 py-1"
		href="https://github.com/nick-ng/svelte-play-reader"
		target="_blank">GitHub</a
	>
</nav>
<hr />
<div class="flex flex-row justify-center">
	<slot />
</div>
