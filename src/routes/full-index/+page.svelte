<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if data.posts && data.posts.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each data.posts as post}
                <a href="/{post.slug}" class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {#if post.metadata && post.metadata.feature_image}
                        <img src={post.metadata.feature_image.url} alt={post.metadata.title || ''} class="w-full h-48 object-cover" />
                    {:else}
                        <img src="https://picsum.photos/200/300" alt="{post.metadata?.title || 'Untitled'}" class="w-full h-48 object-cover" />
                    {/if}
                    <div class="p-4">
                        <h2 class="text-xl font-semibold mb-2">{post.metadata?.title || 'Untitled'}</h2>
                        {#if post.metadata && post.metadata.meta_description}
                            <p class="text-gray-600">{post.metadata.meta_description}</p>
                        {/if}
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-600">No posts found.</p>
    {/if}
</div>
