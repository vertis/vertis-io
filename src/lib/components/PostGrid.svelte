<script lang="ts">
  import type { Post } from '$lib/posts';

  export let recentPosts: Post[] = [];
  export let popularPosts: Post[] = [];
  export let notablePosts: Post[] = [];
  export let columns: 2 | 3 = 3;
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 {columns === 3 ? 'lg:grid-cols-3' : ''} gap-6 xl:gap-8">
  {#if recentPosts.length > 0}
    <div>
      <h3 class="font-serif text-2xl xl:text-3xl text-ink-dark border-b border-gray-100 pb-3 mb-4">Recent</h3>
      <ul class="text-ink text-base xl:text-lg flex flex-col gap-3">
        {#each recentPosts as post}
          <li class="flex items-center gap-3 group">
            {#if post.feature_image}
              <img
                class="w-16 h-16 flex-shrink-0 object-cover rounded-lg shadow-sm"
                src={post.feature_image.preview_url}
                alt=""
              />
            {/if}
            <a href="/blog/{post.slug}" class="group-hover:text-ink-dark transition-colors duration-300">
              {post.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if popularPosts.length > 0}
    <div>
      <h3 class="font-serif text-2xl xl:text-3xl text-ink-dark border-b border-gray-100 pb-3 mb-4">Popular</h3>
      <ul class="text-ink text-base xl:text-lg flex flex-col gap-3">
        {#each popularPosts as post}
          <li class="flex items-center gap-3 group">
            {#if post.feature_image}
              <img
                class="w-16 h-16 flex-shrink-0 object-cover rounded-lg shadow-sm"
                src={post.feature_image.preview_url}
                alt=""
              />
            {/if}
            <a href="/blog/{post.slug}" class="group-hover:text-ink-dark transition-colors duration-300">
              {post.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if notablePosts.length > 0}
    <div>
      <h3 class="font-serif text-2xl xl:text-3xl text-ink-dark border-b border-gray-100 pb-3 mb-4">Notable</h3>
      <ul class="text-ink text-base xl:text-lg flex flex-col gap-3">
        {#each notablePosts as post}
          <li class="flex items-center gap-3 group">
            {#if post.feature_image}
              <img
                class="w-16 h-16 flex-shrink-0 object-cover rounded-lg shadow-sm"
                src={post.feature_image.preview_url}
                alt=""
              />
            {/if}
            <a href="/blog/{post.slug}" class="group-hover:text-ink-dark transition-colors duration-300">
              {post.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
