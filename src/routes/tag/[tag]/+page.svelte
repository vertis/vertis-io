<script lang="ts">
    import SEO from '$lib/components/SEO.svelte';
    import PostList from '$lib/components/PostList.svelte';
    import type { Post } from '$lib/posts';

    export let data: {
        tag: string;
        posts: Post[];
    };
</script>

<SEO
    title={`Posts tagged "${data.tag}"`}
    description={`Browse all posts tagged with "${data.tag}"`}
/>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
        <a href="/tag" class="text-cyan-600 hover:text-cyan-700">← All Tags</a>
        <h1 class="text-4xl font-bold text-gray-900 mt-4">
            Posts tagged "{data.tag}"
        </h1>
        <p class="text-gray-600 mt-2">
            {data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'}
        </p>
    </div>

    <PostList posts={data.posts} />
</div>
