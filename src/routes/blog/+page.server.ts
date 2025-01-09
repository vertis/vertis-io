import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	getPublishedPosts,
	getPaginatedPosts,
	getTotalPages,
	parseFilename,
	validateFrontmatter,
	sortPostsByDate
} from '$lib/posts';
import type { Post, PostFrontmatter } from '$lib/posts';

interface PageData {
	posts: Post[];
	recentPosts: Post[];
	popularPosts: Post[];
	notablePosts: Post[];
	pagination: {
		currentPage: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
}

export const load: PageServerLoad<PageData> = async ({ url }) => {
  try {
    // Get page number from URL query params
    const page = Number(url.searchParams.get('page')) || 1;
    const perPage = 10;

    // Import all markdown files
    const posts = await Promise.all(
      Object.entries(import.meta.glob('/src/posts/*.md', { eager: true }))
        .map(async ([path, post]) => {
          const importedPost = post as {
            metadata: PostFrontmatter;
            default: { render: () => { html: string } };
          };

          if (!validateFrontmatter(importedPost.metadata)) {
            throw new Error(`Invalid frontmatter in ${path}`);
          }

          const metadata = importedPost.metadata;
          const content = importedPost.default.render().html;
          const filename = path.split('/').pop() || '';
          const { date, slug } = parseFilename(filename);
          metadata.date = date; // Set the date from filename

          return {
            title: metadata.title,
            author: metadata.author,
            published: metadata.published,
            minutes_read: metadata.minutes_read,
            feature_image: metadata.feature_image,
            caption: metadata.caption,
            meta_description: metadata.meta_description,
            date: metadata.date,
            content,
            slug: `${date}-${slug}` // Include date in slug
          } satisfies Post;
        })
    );

    // Get published posts sorted by date
    const publishedPosts = sortPostsByDate(getPublishedPosts(posts));

    // Get paginated posts for the main list
    const paginatedPosts = getPaginatedPosts(publishedPosts, page, perPage);
    const totalPages = getTotalPages(publishedPosts, perPage);

    if (page > totalPages) {
      throw error(404, 'Page not found');
    }

    // Get recent posts (last 5)
    const recentPosts = publishedPosts.slice(0, 5);

    // Popular posts based on predefined list
    const popularUrls = [
      '/2013/12/16/unauthorised-litecoin-mining/',
      '/2024/01/26/how-singlefile-transformed-my-obsidian-workflow/',
      '/2024/01/26/migrating-from-plausible-to-umami/',
      '/2024/03/10/why-i-m-embracing-ai-as-a-programmer/',
      '/2024/02/08/that-time-i-accidentally-terminated-600-instances/'
    ];
    const popularPosts = popularUrls
      .map(url => {
        const parts = url.split('/').filter(Boolean);
        const fullSlug = `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}`;
        return publishedPosts.find(post => post.slug === fullSlug);
      })
      .filter((post): post is Post => post !== undefined)
      .slice(0, 5);

    // Notable posts based on predefined list
    const notableUrls = [
      '/2022/11/14/obsidian-image-layouts/',
      '/2020/12/21/healthcare-in-estonia-for-digital-nomads/',
      '/2024/02/08/that-time-i-accidentally-terminated-600-instances/',
      '/2021/06/17/my-digital-nomad-carry/',
      '/2021/03/03/case-study-laundromat/'
    ];
    const notablePosts = notableUrls
      .map(url => {
        const parts = url.split('/').filter(Boolean);
        const fullSlug = `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}`;
        return publishedPosts.find(post => post.slug === fullSlug);
      })
      .filter((post): post is Post => post !== undefined)
      .slice(0, 5);

    return {
      posts: paginatedPosts,
      recentPosts,
      popularPosts,
      notablePosts,
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
