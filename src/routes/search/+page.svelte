<script lang="ts">
    import SEO from '$lib/components/SEO.svelte';
    import PostList from '$lib/components/PostList.svelte';
    import type { Post } from '$lib/posts';

    export let data: {
        query: string;
        results: Post[];
    };
</script>

<SEO
    title={data.query ? `Search results for "${data.query}"` : "Search"}
    description={data.query ? `Search results for "${data.query}"` : "Search blog posts"}
/>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Search</h1>

    <form method="get" class="mb-8">
        <div class="flex gap-4">
            <input
                type="search"
                name="q"
                value={data.query}
                placeholder="Search posts..."
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button
                type="submit"
                class="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
                Search
            </button>
        </div>
    </form>

    {#if data.query}
        <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900">
                {#if data.results.length > 0}
                    Found {data.results.length} {data.results.length === 1 ? 'result' : 'results'} 
                    for "{data.query}"
                {:else}
                    No results found for "{data.query}"
                {/if}
            </h2>
        </div>

        {#if data.results.length > 0}
            <PostList posts={data.results} />
        {/if}
    {/if}
</div>
