import { getAllPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    const posts = await getAllPosts();
    const siteUrl = 'https://vertis.io';

    const rssItems = posts
        .filter(post => post.published)
        .map(post => {
            const url = `${siteUrl}/blog/${post.slug}`;
            return `
                <item>
                    <title><![CDATA[${post.title}]]></title>
                    <link>${url}</link>
                    <guid isPermaLink="true">${url}</guid>
                    <description><![CDATA[${post.meta_description || ''}]]></description>
                    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
                    ${post.tags?.map(tag => `<category>${tag}</category>`).join('\n') || ''}
                </item>
            `.trim();
        })
        .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>vertis.io</title>
        <link>${siteUrl}</link>
        <description>Writings about development, future technology and life</description>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        <language>en</language>
        ${rssItems}
    </channel>
</rss>`.trim();

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
