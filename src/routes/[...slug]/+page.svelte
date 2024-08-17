<script lang="ts">
	import { formatDate } from '$lib/utils'

	export let data
	console.log('data', data);
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="relative bg-white overflow-hidden">
	<div class="relative px-4 sm:px-6 lg:px-8">
		<div class="text-lg max-w-prose mx-auto">
			<section>
				<article class="mt-12 mb-24">
					<header>
						<h1 class="mt-2 block text-xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-1xl">{data.meta.title}</h1>
						<div class="mb-2 space-x-1 text-sm text-center text-gray-500">
							<time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
							{#if data.meta.minutes_read}
							<span aria-hidden="true">
								·
							</span>
							<span>
								{data.meta.minutes_read} min read
							</span>
							{/if}
						</div>
					</header>
					{#if data.meta.feature_image}
					<figure class="mb-6">
						<img class="mx-auto w-full rounded-lg shadow-lg" src={data.meta.feature_image.url} alt={data.meta.feature_image.caption || ''} />
						{#if data.meta.feature_image.caption}
						<figcaption class="mt-2 text-center text-xs text-gray-500">{data.meta.feature_image.caption}</figcaption>
						{/if}
					</figure>
					{/if}
					<div class="mt-6 prose prose-cyan prose-lg text-gray-500 mx-auto">
						<svelte:component this={data.content} />
					</div>
					<hr class="mt-12"/>
				</article>
			</section>

			{#if data.meta.categories && Array.isArray(data.meta.categories) && data.meta.categories.length > 0}
			<section class="mt-12">
				<h2 class="text-2xl font-bold">Categories</h2>
				<ul class="mt-4 list-disc">
					{#each data.meta.categories as category}
					<li>
						<span class="text-blue-500">&num;{category}</span>
					</li>
					{/each}
				</ul>
			</section>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	:global(.prose) {
		@apply text-base text-gray-800;
	}
	:global(.prose h1) {
		@apply text-4xl font-bold mb-6 text-gray-900;
	}
	:global(.prose h2) {
		@apply text-3xl font-semibold mb-4 mt-8 text-gray-800;
	}
	:global(.prose p) {
		@apply mb-4 leading-relaxed;
	}
	:global(.prose a) {
		@apply text-blue-600 hover:text-blue-800 underline;
	}
	:global(.prose ul, .prose ol) {
		@apply mb-4 pl-8;
	}
	:global(.prose li) {
		@apply mb-2;
	}
	:global(.prose blockquote) {
		@apply pl-4 border-l-4 border-gray-300 italic my-4;
	}
	:global(.prose code) {
		@apply bg-gray-100 rounded px-1 py-0.5 font-mono text-sm;
	}
	:global(.prose pre) {
		@apply bg-gray-100 rounded p-4 overflow-x-auto my-4;
	}
</style>
