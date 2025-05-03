import { getAllPosts } from '$lib/posts';
import type { Post } from '$lib/posts';

interface TagInfo {
    name: string;
    count: number;
    posts: Post[];
}

export async function load() {
    const posts = await getAllPosts();
    
    // Create a map of tags to posts
    const tagMap = new Map<string, Post[]>();
    
    // Collect all unique tags and their associated posts
    posts.forEach(post => {
        if (post.tags) {
            post.tags.forEach(tag => {
                if (!tagMap.has(tag)) {
                    tagMap.set(tag, []);
                }
                tagMap.get(tag)?.push(post);
            });
        }
    });

    // Convert map to array and sort by tag name
    const tags: TagInfo[] = Array.from(tagMap.entries()).map(([tag, posts]) => ({
        name: tag,
        count: posts.length,
        posts: posts.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
    })).sort((a, b) => a.name.localeCompare(b.name));

    return {
        tags
    };
}
