import { getAllPosts, getPublishedPosts } from '$lib/posts';

export async function load() {
    const allPosts = await getAllPosts();
    const publishedPosts = getPublishedPosts(allPosts);
    const emergingTechPosts = publishedPosts.filter(post => 
        post.tags?.includes('emerging-technologies')
    );
    
    return {
        posts: emergingTechPosts
    };
}
