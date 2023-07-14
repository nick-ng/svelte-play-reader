<script lang="ts">
	import type { Character, Production } from '$lib/types';

	export let character: Character;
	export let castMember: Production['cast'][number] | undefined;
	export let handleSave: (newCastMember: Production['cast'][number]) => void | Promise<void>;

	const DEFAULT_CAST_SETTINGS = {
		rate: 1,
		pitch: 1,
		gender: 'female',
	};

	let currentRate = castMember?.rate || DEFAULT_CAST_SETTINGS.rate;
	let currentPitch = castMember?.pitch || DEFAULT_CAST_SETTINGS.pitch;
	let currentGender = castMember?.gender || DEFAULT_CAST_SETTINGS.gender;
</script>

<details open={!castMember?.voiceURI}>
	<summary>{character.name}</summary>
	<table>
		<tbody>
			<tr>
				<td>Speech Rate</td>
				<td><input type="range" min="0.1" max="2" step="0.1" bind:value={currentRate} /></td>
			</tr>
			<tr>
				<td>Speech Pitch</td>
				<td><input type="range" min="0.1" max="2" step="0.1" bind:value={currentPitch} /></td>
			</tr>
			<tr>
				<td>Gender</td>
				<td>
					<select bind:value={currentGender}>
						<option value="female">Female</option>
						<option value="male">Male</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
	<div>
		<button
			on:click={() => {
				console.log('currentRate', currentRate);
				console.log('currentPitch', currentPitch);
				console.log('currentGender', currentGender);
			}}
		>
			Save
		</button>
	</div>
</details>
