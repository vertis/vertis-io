import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const POSTS_DIR = 'src/posts';
const OLD_LINK_PATTERN = /\]\((\/\d{4}\/\d{2}\/\d{2}\/[^)]+)\)/g;
const OLD_HTML_LINK_PATTERN = /href="(\/\d{4}\/\d{2}\/\d{2}\/[^"]+)"/g;

// Map of old URLs to new URLs
const urlMap = new Map<string, string>();

async function buildUrlMap() {
    const files = await readdir(POSTS_DIR);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    for (const file of mdFiles) {
        // Extract date and slug from filename
        const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
        if (match) {
            const [_, date, slug] = match;
            const [year, month, day] = date.split('-');
            
            // Create old URL format
            const oldUrl = `/${year}/${month}/${day}/${slug.replace(/\.md$/, '')}`;
            // Create new URL format
            const newUrl = `/blog/${slug.replace(/\.md$/, '')}`;
            
            urlMap.set(oldUrl, newUrl);
        }
    }
}

async function updateInternalLinks() {
    try {
        // First build the URL map
        await buildUrlMap();

        // Get all markdown files
        const files = await readdir(POSTS_DIR);
        const mdFiles = files.filter(file => file.endsWith('.md'));

        for (const file of mdFiles) {
            const filePath = join(POSTS_DIR, file);
            let content = await readFile(filePath, 'utf-8');
            let hasChanges = false;

            // Update markdown links
            content = content.replace(OLD_LINK_PATTERN, (match, oldUrl) => {
                const newUrl = urlMap.get(oldUrl);
                if (newUrl) {
                    hasChanges = true;
                    return `](${newUrl})`;
                }
                return match;
            });

            // Update HTML links
            content = content.replace(OLD_HTML_LINK_PATTERN, (match, oldUrl) => {
                const newUrl = urlMap.get(oldUrl);
                if (newUrl) {
                    hasChanges = true;
                    return `href="${newUrl}"`;
                }
                return match;
            });

            if (hasChanges) {
                await writeFile(filePath, content, 'utf-8');
                console.log(`Updated links in ${file}`);
            }
        }

        console.log('Internal link update complete');
    } catch (error) {
        console.error('Error updating internal links:', error);
    }
}

updateInternalLinks();
