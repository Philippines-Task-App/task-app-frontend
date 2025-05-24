<!-- src/routes/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  // Svelte 5 runes: $props() declares reactive props
  let { data }: { data: PageData } = $props();

  // Reactive derived state for easier access if needed
  const category = $derived(data.category);
</script>

<div class="container mx-auto p-4 md:p-8">
  {#if category}
    <!--
      Replace with Skeleton UI components like Card, Typography, etc.
      e.g.,
      <div class="card p-4 variant-ghost-surface">
        <header class="card-header">
          <h1 class="h1">{category.name}</h1>
        </header>
        <section class="p-4">
          <p>{category.description}</p>
        </section>
        <footer class="card-footer">
          <small>Slug: {category.slug}</small>
        </footer>
      </div>
    -->
    <article class="prose dark:prose-invert max-w-none">
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      <small class="text-surface-500">Slug: {category.slug}</small>
    </article>
  {:else if !category && data}
    <!-- This case might occur if load function returns without a category
         but doesn't throw an error (though our current load function does).
         Or if data is still loading (if using streaming, which we aren't here). -->
    <p class="text-lg text-warning-500">Category data is not available.</p>
  {/if}
  <!-- SvelteKit's error handling will catch errors thrown in `load`
       and display the nearest +error.svelte page. -->
</div>

<style lang="postcss">
  /* Basic styling, Skeleton and Tailwind will provide more.
     If using prose, ensure typography plugin is configured in tailwind.config.cjs */
</style>