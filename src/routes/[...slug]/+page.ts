import { error } from '@sveltejs/kit';

export async function load({ params }) {
	console.log('params', params);
	try {
		let post;
		let date;
		try {
			console.log('trying to import', `../../posts/${params.slug}.md`);
			post = await import(`../../posts/${params.slug}.md`);
			date = new Date(params.slug.slice(0, 10)); // Extract date from slug
		} catch (e) {
			console.log('post not found', e);
			// Handle old URL format
			const parts = params.slug.split('/');
			console.log('parts', parts);
			if (parts.length === 4) {
				const [year, month, day, title] = parts;
				const oldSlug = `${year}-${month}-${day}-${title}`;
				post = await import(`../../posts/${oldSlug}.md`);
				date = new Date(`${year}-${month}-${day}`);
			} else {
				error(404, `Could not find ${params.slug}`);
			}
		}

		return {
			content: post.default,
			meta: {
				...post.metadata,
				date: date.toISOString().split('T')[0] // Add date to metadata
			}
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
