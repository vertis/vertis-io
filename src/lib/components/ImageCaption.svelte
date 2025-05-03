<script lang="ts">
    import Image from './Image.svelte';

    export let src: string;
    export let alt: string = '';
    export let caption: string = '';
    export let width: number | undefined = undefined;
    export let height: number | undefined = undefined;
    export let className: string = '';
</script>

<figure class="my-8">
    <Image
        {src}
        {alt}
        {width}
        {height}
        className={`w-full ${className}`}
    />
    {#if caption}
        <figcaption class="text-center text-sm text-gray-600 mt-2">
            {caption}
        </figcaption>
    {/if}
</figure>
