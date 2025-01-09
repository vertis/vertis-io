<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="min-h-screen bg-paper">
  <article class="max-w-[65ch] mx-auto px-6 py-16 xl:py-24">
    <!-- Title Section -->
    <header class="text-center mb-16">
      <h1 class="font-serif text-4xl xl:text-5xl tracking-tight text-ink-dark mb-6">
        {data.frontmatter.title || 'No title'}
      </h1>
      
      {#if data.frontmatter.author}
        <div class="text-base text-ink-light font-serif">
          By {data.frontmatter.author}
        </div>
      {/if}
    </header>

    <!-- Feature Image -->
    {#if data.frontmatter.feature_image}
      <figure class="-mx-6 sm:-mx-12 md:-mx-16 mb-16">
        <img 
          src={data.frontmatter.feature_image} 
          alt={data.frontmatter.caption || data.frontmatter.title}
          class="w-full rounded-lg shadow-md"
        />
        {#if data.frontmatter.caption}
          <figcaption class="text-center text-sm text-ink-light mt-3 px-6">
            {data.frontmatter.caption}
          </figcaption>
        {/if}
      </figure>
    {/if}

    <!-- Content -->
    <div class="prose prose-lg mx-auto 
      prose-headings:font-serif prose-headings:text-ink-dark prose-headings:tracking-tight 
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
      prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
      prose-p:text-ink prose-p:leading-relaxed 
      prose-a:text-ink-dark prose-a:no-underline hover:prose-a:underline 
      prose-strong:text-ink-dark prose-strong:font-medium
      prose-code:text-ink-dark prose-code:bg-paper-dark/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
      prose-pre:bg-paper-dark prose-pre:shadow-sm prose-pre:rounded-lg
      prose-img:rounded-lg prose-img:shadow-md
      prose-blockquote:border-ink-light/30 prose-blockquote:text-ink-light prose-blockquote:italic
      prose-li:text-ink prose-li:marker:text-ink-light">
      {#if data.component}
        <svelte:component this={data.component} />
      {:else}
        <p class="text-ink-light italic text-center">No content available</p>
      {/if}
    </div>
  </article>
</div>
