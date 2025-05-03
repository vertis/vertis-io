import { getAllPosts } from '$lib/posts';
import type { Post } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

    const posts = await getAllPosts();
    const tag = params.tag;
    
    // Filter posts by tag
    const taggedPosts = posts.filter(post => 
        post.tags?.includes(tag)
    ).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (taggedPosts.length === 0) {
        throw error(404, `Tag '${tag}' not found`);
    }

    return {
        tag,
        posts: taggedPosts
    };
}
