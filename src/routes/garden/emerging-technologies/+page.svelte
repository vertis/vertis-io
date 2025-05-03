<script lang="ts">
    import PostList from '$lib/components/PostList.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="relative max-w-7xl mx-auto my-12">
    <div class="text-center">
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Emerging Technologies
        </h2>
        <p class="mt-3 max-w-4xl mx-auto text-xl text-gray-500 sm:mt-4">
            I've been following and working with emerging technologies for as long as I can remember. 
            It's not always the right decision because you get caught up in the hype and end up working 
            with technologies that are a "Solution in search of a problem". Never-the-less, these are 
            a series of posts on various emerging technologies over the years.
        </p>
    </div>
    <div class="mt-12">
        <PostList posts={data.posts} />
    </div>
</div>
