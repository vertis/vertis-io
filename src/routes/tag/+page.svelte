<script lang="ts">
    import SEO from '$lib/components/SEO.svelte';
    import type { Post } from '$lib/posts';

    interface TagInfo {
        name: string;
        count: number;
        posts: Post[];
    }

    export let data: { tags: TagInfo[] };
</script>

<SEO
    title="Tags"
    description="Browse posts by tag"
/>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Tags</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.tags as tag}
            <a 
                href="/tag/{tag.name}"
                class="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
                <h2 class="text-xl font-semibold text-gray-900 mb-2">
                    {tag.name}
                </h2>
                <p class="text-gray-600">
                    {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                </p>
            </a>
        {/each}
    </div>
</div>
