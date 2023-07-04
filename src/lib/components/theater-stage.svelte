<script lang="ts">
	import type { Scene } from '$lib/types';

	export let scenes: Scene[] = [];

	let currentSceneIndex = 0;
	let currentScene: Scene | undefined;

	$: currentScene = scenes[currentSceneIndex];
</script>

<h2>Stage</h2>
