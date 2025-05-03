import { getAllPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

interface SitemapUrl {
    url: string;
    lastmod?: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: string;
}

export const GET: RequestHandler = async () => {
    const posts = await getAllPosts();
    const siteUrl = 'https://vertis.io';

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/blog',
        '/consulting',
        '/contact',
        '/mentoring',
        '/search',
        '/tag'
    ];

    const staticUrls: SitemapUrl[] = staticPages.map(page => ({
        url: `${siteUrl}${page}`,
        changefreq: 'monthly',
        priority: page === '' ? '1.0' : '0.8'
    }));

    // Blog posts
    const postUrls: SitemapUrl[] = posts
        .filter(post => post.published)
        .map(post => ({
            url: `${siteUrl}/blog/${post.slug}`,
            lastmod: post.date,
            changefreq: 'monthly',
            priority: '0.6'
        }));

    // Tag pages
    const tags = new Set<string>();
    posts.forEach(post => {
        post.tags?.forEach(tag => tags.add(tag));
    });

    const tagUrls: SitemapUrl[] = Array.from(tags).map(tag => ({
        url: `${siteUrl}/tag/${tag}`,
        changefreq: 'weekly',
        priority: '0.4'
    }));

    // Combine all URLs
    const urls = [...staticUrls, ...postUrls, ...tagUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(({ url, lastmod, changefreq, priority }) => `
    <url>
        <loc>${url}</loc>
        ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`.trim()).join('\n')}
</urlset>`.trim();

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
