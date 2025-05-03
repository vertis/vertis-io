<script lang="ts">
    import { siteConfig } from '$lib/config';

    export let title: string = siteConfig.title;
    export let description: string = siteConfig.description;
    export let image: string | undefined = undefined;
    export let url: string | undefined = undefined;
    export let type: string = 'website';
    export let article: {
        publishedTime?: string;
        modifiedTime?: string;
        author?: string;
        tags?: string[];
    } | undefined = undefined;

    const fullTitle = title === siteConfig.title ? title : `${title} | ${siteConfig.title}`;
    const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
    const imageUrl = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.author.image}`;
</script>

<svelte:head>
    <!-- Basic Meta -->
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0891b2" />
    <link rel="canonical" href={fullUrl} />
    <link rel="icon" href="/favicon.png" />

    <!-- Open Graph -->
    <meta property="og:site_name" content={siteConfig.title} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={fullUrl} />
    <meta property="og:type" content={type} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:alt" content={description} />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:url" content={fullUrl} />
    <meta name="twitter:image" content={imageUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@vertis" />
    <meta name="twitter:site" content="@vertis" />
    <meta name="twitter:image:alt" content={description} />

    <!-- Article Specific -->
    {#if article}
        {#if article.publishedTime}
            <meta property="article:published_time" content={article.publishedTime} />
        {/if}
        {#if article.modifiedTime}
            <meta property="article:modified_time" content={article.modifiedTime} />
        {/if}
        {#if article.author}
            <meta property="article:author" content={article.author} />
        {/if}
        {#if article.tags}
            {#each article.tags as tag}
                <meta property="article:tag" content={tag} />
            {/each}
        {/if}
    {/if}
</svelte:head>
