import type { PageLoad } from './$types';
import type { PostMetadata } from '$lib/types';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob('/src/posts/*.{md,svx,svelte.md}');

	let match: { path?: string; resolver?: App.MdsvexResolver } = {};
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = { path, resolver: resolver as unknown as App.MdsvexResolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	if (!post || !post.metadata.published) {
		throw error(404); // Couldn't resolve the post
	}
	const metadata = post.metadata as Record<string, any>;
	
	const frontmatter: PostMetadata = {
		published: Boolean(metadata.published),
		layout: String(metadata.layout || 'post'),
		title: String(metadata.title || ''),
		author: metadata.author,
		minutes_read: metadata.minutes_read ? Number(metadata.minutes_read) : undefined,
		feature_image: metadata.feature_image ? {
			url: String(metadata.feature_image.url),
			preview_url: String(metadata.feature_image.preview_url)
		} : undefined,
		caption: metadata.caption,
		meta_description: metadata.meta_description,
		tags: Array.isArray(metadata.tags) ? metadata.tags : undefined
	};

	return {
		component: post.default,
		frontmatter
	};
};
