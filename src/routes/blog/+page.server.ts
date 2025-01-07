import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPublishedPosts, getPaginatedPosts, getTotalPages, parseFilename, validateFrontmatter } from '$lib/posts';
import type { Post } from '$lib/posts';

export const load: PageServerLoad = async ({ url }) => {
  try {
    // Get page number from URL query params
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = 10;

    // Import all markdown files from src/posts
    const posts = await Promise.all(
      Object.entries(import.meta.glob('/src/posts/*.md', { eager: true }))
        .map(async ([path, post]) => {
          const filename = path.split('/').pop() || '';
          const { date, slug } = parseFilename(filename);
          
          // Type assertion for the imported post
          const importedPost = post as {
            metadata: unknown;
            default: { render: () => { html: string } };
          };

          if (!validateFrontmatter(importedPost.metadata)) {
            throw new Error(`Invalid frontmatter in ${filename}`);
          }

          // Process with mdsvex
          const rendered = importedPost.default.render();

          return {
            ...importedPost.metadata,
            slug,
            date,
            content: rendered.html
          } satisfies Post;
        })
    );

    // Filter published posts and sort by date
    const publishedPosts = getPublishedPosts(posts);
    const paginatedPosts = getPaginatedPosts(publishedPosts, page, perPage);
    const totalPages = getTotalPages(publishedPosts, perPage);

    if (page > totalPages) {
      throw error(404, 'Page not found');
    }

    return {
      posts: paginatedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (e) {
    console.error('Error loading blog posts:', e);
    throw error(500, 'Error loading blog posts');
  }
};
