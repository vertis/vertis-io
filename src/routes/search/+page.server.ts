import { getAllPosts } from '$lib/posts';
import type { Post } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const query = url.searchParams.get('q')?.toLowerCase() || '';
    const posts = await getAllPosts();
    
    let searchResults: Post[] = [];
    
    if (query) {
        searchResults = posts.filter(post => {
            const searchableText = [
                post.title,
                post.meta_description,
                post.content,
                ...(post.tags || [])
            ].join(' ').toLowerCase();
            
            return searchableText.includes(query);
        }).sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    return {
        query,
        results: searchResults
    };
};
