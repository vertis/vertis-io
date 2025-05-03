import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import matter from 'front-matter';
import type { PostMetadata } from '../types';

interface DraftAttributes {
    [key: string]: unknown;
}

const POSTS_DIR = 'src/posts';
const HN_LINK_PATTERN = /https:\/\/news\.ycombinator\.com\/item\?id=(\d+)/;

async function updateHNLinks() {
    try {
        // Get all markdown files
        const files = await readdir(POSTS_DIR);
        const mdFiles = files.filter(file => file.endsWith('.md'));

        for (const file of mdFiles) {
            const filePath = join(POSTS_DIR, file);
            const content = await readFile(filePath, 'utf-8');

            // Parse frontmatter and content
            const { attributes, body } = matter<DraftAttributes>(content);

            // Look for HN links in the content
            const match = body.match(HN_LINK_PATTERN);
            if (match) {
                const hnId = match[1];
                const updatedAttributes: DraftAttributes = {
                    ...attributes,
                    hn_id: hnId
                };

                // Create new markdown content
                const newContent = `---
${Object.entries(updatedAttributes)
    .map(([key, value]) => {
        if (typeof value === 'object') {
            return `${key}: ${JSON.stringify(value)}`;
        }
        return `${key}: ${value}`;
    })
    .join('\n')}
---

${body.trim()}`;

                // Write updated content back to file
                await writeFile(filePath, newContent, 'utf-8');
                console.log(`Updated HN link in ${file} (ID: ${hnId})`);
            }
        }

        console.log('HN link update complete');
    } catch (error) {
        console.error('Error updating HN links:', error);
    }
}

updateHNLinks();
