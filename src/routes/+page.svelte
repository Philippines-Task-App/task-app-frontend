<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
    import { Combobox } from '@skeletonlabs/skeleton-svelte';
    import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import SearchIcon from '@lucide/svelte/icons/search';
	import ChevronDown from '@lucide/svelte/icons/chevron-down'; 
	import type { PageData } from './$types'; 
	import type { TaskCategory as TaskCategories } from '$lib/types';

	let { data }: { data: PageData } = $props();
	let selectedCategory = $state<string[]>([]);
	let location = $state('');

	interface ComboBoxCategory {
		label: string;
		value: string;
	}

	const comboBoxCategories = $derived<ComboBoxCategory[]>(
		(data.taskCategories || []).map((backendCategory: TaskCategories) => ({
			label: backendCategory.name,
			value: backendCategory.slug 
		}))
	);

	function handleCategoryChange(event: { value: string[] }) {
		selectedCategory = event.value;
		if (selectedCategory.length > 0) {
			console.log('Selected category:', comboBoxCategories.find(cat => cat.value === selectedCategory[0])?.label);
		} else {
			console.log('No category selected');
		}
	}
</script>

<svelte:head>
	<title>TaskBuddy - Find Help with your tasks in Metro Manila</title>
</svelte:head>

<div class="p-4 md:p-10 text-center">

	<!-- Submit Task Section -->
	<section class="max-w-2xl mx-auto space-y-8">
		<h2 class="h2 mb-6 text-primary-400">What do you need help with?</h2>

		<div class="card preset-tonal-surface p-6 md:p-8 space-y-6">
			<div>
				<Combobox
					data={comboBoxCategories}
					bind:value={selectedCategory}
					onValueChange={handleCategoryChange}
					placeholder="Select a category (e.g., Cleaning)"
					--input-group-input-classes="placeholder:text-surface-500/50"
					--button-classes="preset-outlined-surface"
				>
					<!-- Optional: Custom rendering for each item in the dropdown -->
					{#snippet item(item)}
						<div class="flex w-full items-center space-x-2">
							<span>{item.label}</span>
						</div>
					{/snippet}
				</Combobox>
				{#if selectedCategory.length > 0}
					<p class="text-sm text-left mt-2 text-surface-600-400">
						Selected: {comboBoxCategories.find(cat => cat.value === selectedCategory[0])?.label}
					</p>
				{/if}
			</div>

			<div>
				<div class="input-group">
					<input
						class="ig-input !border-surface-400-600 placeholder:text-surface-500/50"
						type="text"
						id="location"
						bind:value={location}
						placeholder="Location"
					/>
				</div>
				{#if location}
					<p class="text-sm text-left mt-2 text-surface-600-400">
						Location: {location}
					</p>
				{/if}
			</div>

			<button class="btn preset-filled-primary-500 w-full btn-lg mt-4">
				<span>Post My Task</span>
                <ArrowRight size={20} />
			</button>
		</div>
	</section>
</div>