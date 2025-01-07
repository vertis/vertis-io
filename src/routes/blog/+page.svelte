<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/posts';

  export let data: PageData;
</script>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 class="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

  <div class="space-y-10">
    {#each data.posts as post}
      <article class="prose max-w-none">
        <div class="flex items-center gap-4">
          {#if post.feature_image}
            <img
              src={post.feature_image.preview_url}
              alt=""
              class="w-32 h-32 object-cover rounded"
            />
          {/if}
          <div>
            <h2 class="text-2xl font-bold mb-2">
              <a href="/blog/{post.slug}" class="hover:text-cyan-600">
                {post.title}
              </a>
            </h2>
            <div class="text-gray-600 text-sm mb-2">
              {#if post.date}
                {formatDate(post.date)}
              {/if}
              {#if post.minutes_read}
                • {post.minutes_read} min read
              {/if}
            </div>
            {#if post.meta_description}
              <p class="text-gray-700">{post.meta_description}</p>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>

  {#if data.posts.length === 0}
    <p class="text-gray-600 text-center py-10">No posts found.</p>
  {/if}

  {#if data.pagination.totalPages > 1}
    <div class="flex justify-center gap-4 mt-10">
      {#if data.pagination.hasPrevPage}
        <a
          href="/blog?page={data.pagination.currentPage - 1}"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Previous
        </a>
      {/if}
      
      <span class="px-4 py-2">
        Page {data.pagination.currentPage} of {data.pagination.totalPages}
      </span>

      {#if data.pagination.hasNextPage}
        <a
          href="/blog?page={data.pagination.currentPage + 1}"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Next
        </a>
      {/if}
    </div>
  {/if}
</div>
