<script>
	import { browser } from '$app/environment';
	import '../app.css';

	if (browser) {
		document.title = 'Play Reader';
	}
</script>

<div>
	<nav class="mx-2 my-2 flex flex-row justify-start">
		<a class="rounded border border-gray-300 px-2 py-1" href="/">Home</a>
		<a class="rounded border border-gray-300 px-2 py-1" href="/writer">Writer</a>
		<a class="rounded border border-gray-300 px-2 py-1" href="/actors">Actors</a>
	</nav>
	<hr />
	<div class="flex flex-row justify-center">
		<div class="max-w-prose"><slot /></div>
	</div>
</div>
