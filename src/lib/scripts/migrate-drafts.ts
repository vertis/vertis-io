import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import matter from 'front-matter';
import { validateFrontmatter, type PostFrontmatter } from '../posts';

const DRAFTS_DIR = 'jekyll-old/_drafts';
const POSTS_DIR = 'src/posts';

interface DraftAttributes {
    [key: string]: unknown;
}

async function migrateDrafts() {
    try {
        // Get all markdown files from drafts
        const files = await readdir(DRAFTS_DIR);
        const mdFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.html'));

        for (const file of mdFiles) {
            const filePath = join(DRAFTS_DIR, file);
            const content = await readFile(filePath, 'utf-8');

            // Parse frontmatter
            const { attributes, body } = matter<DraftAttributes>(content);
            
            // Validate and update frontmatter
            const frontmatter = validateFrontmatter({
                title: attributes.title as string || 'Untitled Draft',
                author: attributes.author as string || 'vertis',
                published: false, // Mark as unpublished since it's a draft
                date: new Date().toISOString().split('T')[0], // Use current date
                layout: attributes.layout as string || 'post',
                meta_description: attributes.meta_description as string || '',
                feature_image: attributes.feature_image as PostFrontmatter['feature_image'],
                caption: attributes.caption as string || '',
                tags: attributes.tags as string[] || []
            });

            // Create new markdown content
            const newContent = `---
${Object.entries(frontmatter)
    .map(([key, value]) => {
        if (typeof value === 'object') {
            return `${key}: ${JSON.stringify(value)}`;
        }
        return `${key}: ${value}`;
    })
    .join('\n')}
---

${body.trim()}`;

            // Create filename with date prefix
            const newFileName = `${frontmatter.date}-${file.replace(/\.(md|html)$/, '.md')}`;
            const newPath = join(POSTS_DIR, newFileName);

            // Write the new file
            await writeFile(newPath, newContent, 'utf-8');
            console.log(`Migrated draft: ${file} -> ${newFileName}`);
        }

        console.log('Draft migration complete');
    } catch (error) {
        console.error('Error migrating drafts:', error);
    }
}

migrateDrafts();
