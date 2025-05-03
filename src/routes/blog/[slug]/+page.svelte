<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/posts';
  import SEO from '$lib/components/SEO.svelte';
  export let data: PageData;
</script>

<SEO
  title={data.frontmatter.title}
  description={data.frontmatter.meta_description || data.frontmatter.title}
  image={data.frontmatter.feature_image?.url}
  url={`/blog/${data.frontmatter.slug}`}
  type="article"
  article={{
    publishedTime: data.frontmatter.date,
    author: data.frontmatter.author,
    tags: data.frontmatter.tags
  }}
/>

<div class="min-h-screen bg-paper flex flex-col pt-12 md:pt-16 pb-24 xl:pb-32">
  <article class="flex-1">
    <div class="max-w-[720px] mx-auto px-6 w-full">
    <!-- Title Section -->
    <header class="mb-16">
      <h1 class="font-serif text-4xl md:text-[2.75rem] leading-[1.1] tracking-tight text-ink-dark">
        {data.frontmatter.title || 'No title'}
      </h1>
      
      <div class="mt-6 text-lg text-ink-light font-serif">
        {#if data.frontmatter.author}
          <span>By {data.frontmatter.author}</span>
        {/if}
        {#if data.frontmatter.minutes_read}
          <span class="mx-2">·</span>
          <span>{data.frontmatter.minutes_read} min read</span>
        {/if}
      </div>
    </header>

    <!-- Feature Image -->
    {#if data.frontmatter.feature_image}
      <figure class="mb-16">
        <img 
          src={data.frontmatter.feature_image.url} 
          alt={data.frontmatter.caption || data.frontmatter.title}
          class="w-full aspect-[16/9] object-cover rounded-lg shadow-sm"
        />
        {#if data.frontmatter.caption}
          <figcaption class="mt-4 text-base text-ink-light text-center">
            {data.frontmatter.caption}
          </figcaption>
        {/if}
      </figure>
    {/if}

    <!-- Content -->
    <div class="prose mx-auto 
      prose-headings:font-serif prose-headings:text-ink-dark prose-headings:tracking-tight 
      prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
      prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
      prose-p:text-[1.125rem] prose-p:text-ink prose-p:leading-[1.85] prose-p:tracking-[0.01em] prose-p:mb-6
      prose-a:text-ink-dark prose-a:underline prose-a:decoration-ink-light/40 hover:prose-a:decoration-ink-dark/60
      prose-strong:text-ink-dark prose-strong:font-medium
      prose-code:text-ink-dark/90 prose-code:bg-paper-dark/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[0.9em]
      prose-pre:bg-paper-dark/5 prose-pre:shadow-sm prose-pre:rounded-lg prose-pre:border prose-pre:border-paper-dark/10
      prose-img:rounded-lg prose-img:shadow-sm
      prose-blockquote:border-l-2 prose-blockquote:border-ink-light/20 prose-blockquote:text-ink-light prose-blockquote:not-italic prose-blockquote:pl-6
      prose-li:text-ink prose-li:leading-[1.85] prose-li:mb-2 prose-li:marker:text-ink-light/40">
      {#if data.component}
        <svelte:component this={data.component} />
      {:else}
        <p class="text-ink-light italic text-center">No content available</p>
      {/if}
    </div>
  </article>
</div>
