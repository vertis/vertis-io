<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<article class="prose prose-lg mx-auto max-w-prose mt-10">
  <h1>{data.frontmatter.title || 'No title'}</h1>
  
  {#if data.frontmatter.feature_image}
    <figure>
      <img 
        src={data.frontmatter.feature_image.url} 
        alt={data.frontmatter.caption || data.frontmatter.title}
        class="w-full"
      />
      {#if data.frontmatter.caption}
        <figcaption class="text-center text-sm text-gray-600">{data.frontmatter.caption}</figcaption>
      {/if}
    </figure>
  {/if}

  <div class="text-sm text-gray-600 mb-8">
    {#if data.frontmatter.author}
      <span>By {data.frontmatter.author}</span>
    {/if}
  </div>

  <div>
    {#if data.component}
      <svelte:component this={data.component} />
    {:else}
      <p>No content available</p>
    {/if}
  </div>
</article>
