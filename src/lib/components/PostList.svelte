<script lang="ts">
    import type { Post } from '$lib/posts';

    export let posts: Post[] = [];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
    {#each posts as post}
        <div class="flex flex-col">
            {#if post.feature_image}
                <div class="flex-shrink-0">
                    <img
                        class="h-48 w-full object-cover rounded-lg shadow-sm"
                        src={post.feature_image.preview_url}
                        alt=""
                    />
                </div>
            {/if}
            <div class="flex-1 mt-4">
                <a href="/blog/{post.slug}" class="block">
                    <h3 class="text-xl font-semibold text-gray-900 hover:text-cyan-600 transition-colors duration-300">
                        {post.title}
                    </h3>
                </a>
                {#if post.meta_description}
                    <p class="mt-3 text-base text-gray-500">
                        {post.meta_description}
                    </p>
                {/if}
            </div>
        </div>
    {/each}
</div>
