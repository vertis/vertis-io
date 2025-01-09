<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/posts';
  import { fade } from 'svelte/transition';
  import PostGrid from '$lib/components/PostGrid.svelte';

  export let data: PageData;
  const { recentPosts, popularPosts, notablePosts } = data;
</script>

<div class="relative bg-white overflow-hidden">
  <div class="relative px-4 sm:px-6 lg:px-8">
    <div class="text-lg max-w-5xl mx-auto">
      <section>
        <article class="mt-12 mb-24">
          <h1>
            <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Blog</span>
          </h1>

          {#if data.pagination.currentPage === 1}
            <div class="mt-12 mb-16">
              <div class="mb-16 pb-16 border-b border-gray-100">
                <PostGrid
                  {recentPosts}
                  {popularPosts}
                  {notablePosts}
                  columns={3}
                />
              </div>
            </div>
          {/if}

          <div class="mt-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-8">All Posts</h2>
    <div class="grid gap-20">
      {#each data.posts as post}
        <article class="group" transition:fade={{ duration: 400 }}>
          <div class="flex flex-col md:flex-row gap-12 items-start">
            <div class="w-full md:w-72 xl:w-80 2xl:w-96 aspect-[4/3] overflow-hidden rounded-lg shadow-sm {post.feature_image ? 'bg-paper-dark' : 'bg-paper-light'}">
              {#if post.feature_image && post.feature_image.preview_url}
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
              
              <h2 class="text-2xl xl:text-3xl leading-tight mb-4 text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                <a href="/blog/{post.slug}" class="block">
                  {post.title}
                </a>
              </h2>
              
              {#if post.meta_description}
                <p class="text-gray-500 leading-relaxed line-clamp-3 text-base xl:text-lg">{post.meta_description}</p>
              {/if}
              
              <div class="mt-6 xl:mt-8">
                <a href="/blog/{post.slug}" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors duration-300">
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
        <p class="text-gray-500 text-center py-12 xl:py-16 italic text-base">No stories to tell... yet.</p>
      {/if}
    </div>
          </div>
        </article>
      </section>

      {#if data.pagination.totalPages > 1}
    <div class="border-t border-gray-100">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 xl:py-12">
        <div class="flex justify-center items-center gap-6 xl:gap-8 text-base xl:text-lg">
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
  </div>
</div>
