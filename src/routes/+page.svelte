<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
    import { Combobox } from '@skeletonlabs/skeleton-svelte';
	import { Switch } from '@skeletonlabs/skeleton-svelte';
    import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import IconMoon from '@lucide/svelte/icons/moon';
	import IconSun from '@lucide/svelte/icons/sun';

	let selectedCategory = $state<string[]>([]);
	let location = $state('');

	// Bind to the checked state
	let mode = $state(false);

	// Handle the change in state when toggled.
	function handleModeChange(checked: boolean) {
		// NOTE: implementation may differ per Tailwind config and framework:
		// https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
		console.log({ mode });
		mode = checked;
	}

	interface Category {
		label: string;
		value: string;
		// emoji?: string; // Optional: as shown in Skeleton docs
	}

	const taskCategories: Category[] = [
		{ label: 'Cleaning', value: 'cleaning' },
		{ label: 'Home Repairs', value: 'repairs' },
		{ label: 'Moving & Delivery', value: 'moving' },
		{ label: 'Errands & Shopping', value: 'errands' },
		{ label: 'Painting', value: 'painting'},
		{ label: 'Tech Support', value: 'tech'}
	];

	function handleCategoryChange(event: { value: string[] }) {
		selectedCategory = event.value;
		if (selectedCategory.length > 0) {
			console.log('Selected category:', taskCategories.find(cat => cat.value === selectedCategory[0])?.label);
		} else {
			console.log('No category selected');
		}
	}
</script>

<svelte:head>
	<title>TaskBuddy - Find Help with your tasks in Metro Manila</title>
</svelte:head>

<div class="relative p-4 md:p-10 text-center min-h-screen
            bg-surface-100 dark:bg-surface-900
            transition-colors duration-300 ease-in-out">

	<!-- Light/Dark Mode Toggle Button -->
	<Switch name="mode" controlActive="bg-surface-200" checked={mode} onCheckedChange={(e) => handleModeChange(e.checked)}>
		{#snippet inactiveChild()}<IconMoon size="14" />{/snippet}
		{#snippet activeChild()}<IconSun size="14" />{/snippet}
	</Switch>

	<!-- Submit Task Section -->
	<section class="max-w-2xl mx-auto space-y-8">
		<h2 class="h2 mb-6 text-primary-400">What do you need help with?</h2>

		<div class="card preset-tonal-surface p-6 md:p-8 space-y-6">
			<div>
				<Combobox
					data={taskCategories}
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
					<p class="text-sm text-left mt-2 text-surface-600 dark:text-surface-300">
						Selected: {taskCategories.find(cat => cat.value === selectedCategory[0])?.label}
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