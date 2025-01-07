import type { ComponentType } from 'svelte';

export interface PostFrontmatter {
  title: string;
  author: string;
  published: boolean;
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
  return posts.filter(post => post.published);
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
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Generate HN comments link
export function getHNCommentsLink(url: string): string {
  return `https://news.ycombinator.com/item?id=${url.split('#')[1]}`;
}

// Validate post frontmatter
export function validateFrontmatter(frontmatter: unknown): frontmatter is PostFrontmatter {
  if (typeof frontmatter !== 'object' || frontmatter === null) {
    return false;
  }

  const f = frontmatter as Record<string, unknown>;
  
  // Check required fields
  if (typeof f.title !== 'string' || 
      typeof f.author !== 'string' || 
      typeof f.published !== 'boolean') {
    return false;
  }

  // Check optional fields if present
  if ('minutes_read' in f && typeof f.minutes_read !== 'number') {
    return false;
  }

  if ('feature_image' in f) {
    const img = f.feature_image as Record<string, unknown>;
    if (typeof img?.url !== 'string' || typeof img?.preview_url !== 'string') {
      return false;
    }
  }

  if ('caption' in f && typeof f.caption !== 'string') {
    return false;
  }

  if ('meta_description' in f && typeof f.meta_description !== 'string') {
    return false;
  }

  if ('date' in f && typeof f.date !== 'string') {
    return false;
  }

  return true;
}

// Get related posts (placeholder - implement actual logic based on tags/categories)
export function getRelatedPosts(currentPost: Post, allPosts: Post[], limit = 3): Post[] {
  return sortPostsByDate(
    allPosts.filter(post => post.slug !== currentPost.slug)
  ).slice(0, limit);
}
