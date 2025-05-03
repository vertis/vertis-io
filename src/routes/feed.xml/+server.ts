import { getAllPosts, getPublishedPosts } from '$lib/posts';
import { siteConfig } from '$lib/config';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const allPosts = await getAllPosts();
    const publishedPosts = getPublishedPosts(allPosts);
    const recentPosts = publishedPosts.slice(0, 10);

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${siteConfig.title}</title>
        <description>${siteConfig.description}</description>
        <link>${siteConfig.url}</link>
        <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
        <pubDate>${new Date().toUTCString()}</pubDate>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <generator>SvelteKit</generator>
        ${recentPosts.map((post) => {
            const pubDate = new Date(post.date).toUTCString();
            const postUrl = `${siteConfig.url}${post.path}`;
            const tagsXml = post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n                ') : '';
            
            return `
            <item>
                <title><![CDATA[${post.title}]]></title>
                <description><![CDATA[${post.content || ''}]]></description>
                <pubDate>${pubDate}</pubDate>
                <link>${postUrl}</link>
                <guid isPermaLink="true">${postUrl}</guid>
                ${tagsXml}
            </item>`;
        }).join('\n        ')}
    </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
