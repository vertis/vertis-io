import type { PageServerLoad } from './$types';
import { getPublishedPosts, sortPostsByDate, validateFrontmatter } from '$lib/posts';
import type { Post, PostFrontmatter } from '$lib/posts';

export const load: PageServerLoad = async () => {
  try {
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
          const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';

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
            slug
          } satisfies Post;
        })
    );

    // Get published posts sorted by date
    const publishedPosts = sortPostsByDate(getPublishedPosts(posts));

    // Get recent posts (last 5)
    const recentPosts = publishedPosts.slice(0, 5);

    // TODO: Implement popular posts logic using _data/popular_posts.yml
    const popularPosts = publishedPosts.slice(0, 5);

    // TODO: Implement notable posts logic using _data/notable_posts.yml
    const notablePosts = publishedPosts.slice(0, 5);

    return {
      recentPosts,
      popularPosts,
      notablePosts
    };
  } catch (e) {
    console.error('Error loading posts:', e);
    return {
      recentPosts: [],
      popularPosts: [],
      notablePosts: []
    };
  }
};
