<script lang="ts">
    import { getCloudflareImageUrl, getResponsiveImageSrcSet, imageIdMap } from '$lib/images';

    export let src: string;
    export let alt: string = '';
    export let width: number | undefined = undefined;
    export let height: number | undefined = undefined;
    export let className: string = '';
    export let loading: 'lazy' | 'eager' = 'lazy';

    // Convert old image paths to Cloudflare IDs if needed
    $: imageId = imageIdMap[src] || src;
    $: srcSet = getResponsiveImageSrcSet(imageId);
    $: mainSrc = getCloudflareImageUrl(imageId, { width, height });
</script>

<img
    src={mainSrc}
    srcSet={srcSet}
    {alt}
    {loading}
    class={className}
    sizes="(min-width: 1536px) 1536px, (min-width: 1280px) 1280px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, (min-width: 640px) 640px, 320px"
    decoding="async"
    width={width}
    height={height}
/>
