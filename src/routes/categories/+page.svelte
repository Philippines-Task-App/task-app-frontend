<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const categories = $derived(data.categories);
</script>

<div class="container mx-auto p-8">
  <h1 class="h1 mb-6">Task Categories</h1>
  {#if categories && categories.length > 0}
    <ul class="list">
      {#each categories as category (category.slug)}
        <li class="list-item">
          <a href="/{category.slug}" class="anchor">
            <h2 class="h2">{category.name}</h2>
            {#if category.description}
              <p class="text-sm opacity-75">{category.description.substring(0, 100)}{category.description.length > 100 ? '...' : ''}</p>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  {:else if categories}
    <p>No task categories found.</p>
  {/if}
</div>