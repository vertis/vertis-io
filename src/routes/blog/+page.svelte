<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/posts';
  import { fade } from 'svelte/transition';

  export let data: PageData;
</script>

<div class="min-h-screen bg-paper">
  <div class="border-b border-gray-100 bg-paper">
    <div class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 xl:py-24">
      <h1 class="font-serif text-6xl xl:text-7xl tracking-tight text-center">
        <span class="bg-gradient-to-b from-ink-dark to-ink bg-clip-text text-transparent">Blog</span>
      </h1>
    </div>
  </div>

  <main class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 xl:py-24">
    <div class="grid gap-20">
      {#each data.posts as post}
        <article class="group" transition:fade={{ duration: 400 }}>
          <div class="flex flex-col md:flex-row gap-12 items-start">
            <div class="w-full md:w-72 xl:w-80 2xl:w-96 aspect-[4/3] overflow-hidden rounded-lg shadow-sm {post.feature_image ? 'bg-paper-dark' : 'bg-paper-light'}">
              {#if post.feature_image}
                <img
                  src={post.feature_image.preview_url}
                  alt=""
                  class="w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-105"
                />
              {:else}
                <div class="w-full h-full flex items-center justify-center text-ink-light/20">
                  <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              {/if}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-xs xl:text-sm uppercase tracking-[0.2em] text-ink-light mb-4">
                {#if post.date}
                  <time datetime={post.date} class="font-serif">{formatDate(post.date)}</time>
                {/if}
                {#if post.minutes_read}
                  <span class="mx-2 opacity-50">·</span>
                  <span class="font-serif">{post.minutes_read} min read</span>
                {/if}
              </div>
              
              <h2 class="font-serif text-3xl xl:text-4xl leading-tight mb-4 text-ink-dark group-hover:text-ink transition-colors duration-300">
                <a href="/blog/{post.slug}" class="block">
                  {post.title}
                </a>
              </h2>
              
              {#if post.meta_description}
                <p class="text-ink leading-relaxed line-clamp-3 text-lg xl:text-xl">{post.meta_description}</p>
              {/if}
              
              <div class="mt-6 xl:mt-8">
                <a href="/blog/{post.slug}" class="inline-flex items-center text-sm xl:text-base text-ink-light hover:text-ink-dark transition-colors duration-300">
                  Continue reading
                  <svg class="w-4 h-4 ml-2 transform transition-transform duration-500 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      {/each}

      {#if data.posts.length === 0}
        <p class="text-ink-light text-center py-24 xl:py-32 font-serif italic text-lg xl:text-xl">No stories to tell... yet.</p>
      {/if}
    </div>
  </main>

  {#if data.pagination.totalPages > 1}
    <div class="border-t border-gray-100 bg-paper">
      <div class="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 xl:py-16">
        <div class="flex justify-center items-center gap-8 xl:gap-10 font-serif text-lg xl:text-xl">
          {#if data.pagination.hasPrevPage}
            <a
              href="/blog?page={data.pagination.currentPage - 1}"
              class="text-ink-light hover:text-ink-dark transition-colors duration-300 flex items-center gap-2"
            >
              ← Previous
            </a>
          {/if}
          
          <span class="text-sm xl:text-base text-gray-500">
            {data.pagination.currentPage} of {data.pagination.totalPages}
          </span>

          {#if data.pagination.hasNextPage}
            <a
              href="/blog?page={data.pagination.currentPage + 1}"
              class="text-ink-light hover:text-ink-dark transition-colors duration-300 flex items-center gap-2"
            >
              Next →
            </a>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
