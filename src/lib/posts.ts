import type { ComponentType } from 'svelte';
import { dev } from '$app/environment';

export interface PostFrontmatter {
	title: string;
	author: string;
	published: boolean;
	layout?: string;
	date?: string;
	minutes_read?: number;
	feature_image?: {
		url: string;
		preview_url: string;
	};
	caption?: string;
	meta_description?: string;
}

export interface Post extends PostFrontmatter {
	slug: string;
	content?: string;
	default?: ComponentType;
	path: string;
	tags?: string[];
	date: string; // Make date required
}

// Function to extract date and slug from filename
// e.g., "2024-02-08-that-time-i-accidentally-terminated-600-instances.md"
export function parseFilename(filename: string): { date: string; slug: string } {
	const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
	if (!match) {
		throw new Error(`Invalid post filename format: ${filename}`);
	}
	return {
		date: match[1],
		slug: match[2]
	};
}

// Calculate reading time in minutes
export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

// Sort posts by date (newest first)
export function sortPostsByDate(posts: Post[]): Post[] {
	return [...posts].sort((a, b) => {
		return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
	});
}

// Filter published posts
export function getPublishedPosts(posts: Post[]): Post[] {
	return posts.filter((post) => post.published);
}

// Get posts for a specific page (pagination)
export function getPaginatedPosts(posts: Post[], page: number, perPage: number): Post[] {
	const start = (page - 1) * perPage;
	const end = start + perPage;
	return posts.slice(start, end);
}

// Get total number of pages
export function getTotalPages(posts: Post[], perPage: number): number {
	return Math.ceil(posts.length / perPage);
}

// Format date for display
export function formatDate(date: string): string {
	const d = new Date(date);
	const day = d.getDate();
	const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
	const year = d.getFullYear();
	return `${month} ${day}, ${year}`;
}

// Generate HN comments link
export function getHNCommentsLink(url: string): string {
	return `https://news.ycombinator.com/item?id=${url.split('#')[1]}`;
}

// Validate post frontmatter and provide defaults
export function validateFrontmatter(frontmatter: unknown): PostFrontmatter {
	if (typeof frontmatter !== 'object' || frontmatter === null) {
		// Return default frontmatter if none exists
		return {
			title: 'Untitled Post',
			author: 'Anonymous',
			published: false
		};
	}

	const f = frontmatter as Record<string, unknown>;
	const result: PostFrontmatter = {
		title: typeof f.title === 'string' ? f.title : 'Untitled Post',
		author: typeof f.author === 'string' ? f.author : 'Anonymous',
		published: typeof f.published === 'boolean' ? f.published : false
	};

	// Add optional fields if they're valid
	if (typeof f.layout === 'string') {
		result.layout = f.layout;
	}

	if (typeof f.minutes_read === 'number') {
		result.minutes_read = f.minutes_read;
	}

	if (typeof f.date === 'string') {
		result.date = f.date;
	}

	if (typeof f.caption === 'string') {
		result.caption = f.caption;
	}

	if (typeof f.meta_description === 'string') {
		result.meta_description = f.meta_description;
	}

	// Handle feature image if present
	if (f.feature_image && typeof f.feature_image === 'object') {
		const img = f.feature_image as Record<string, unknown>;
		if (typeof img.url === 'string' && typeof img.preview_url === 'string') {
			result.feature_image = {
				url: img.url,
				preview_url: img.preview_url
			};
		}
	}

	return result;
}

// Get related posts (placeholder - implement actual logic based on tags/categories)
export function getRelatedPosts(currentPost: Post, allPosts: Post[], limit = 3): Post[] {
	return sortPostsByDate(allPosts.filter((post) => post.slug !== currentPost.slug)).slice(0, limit);
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
    const paths = import.meta.glob('/src/posts/*.md', { eager: true });
    
    return Object.entries(paths)
        .map(([path, post]) => {
            const filename = path.split('/').pop() || '';
            const { date, slug } = parseFilename(filename);
            const postData = post as unknown as { metadata: PostFrontmatter; default: ComponentType };
            
            return {
                ...validateFrontmatter(postData.metadata),
                slug,
                date,
                path: `/blog/${slug}`,
                content: (post as any).default?.render?.()?.html,
                default: postData.default
            };
        })
        .filter(post => dev || post.published)
        .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());
}
