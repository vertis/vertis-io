import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { imageIdMap } from '../images';

const POSTS_DIR = 'src/posts';
const IMAGE_PATTERN = /!\[([^\]]*)\]\(([^)]+)\)/g;
const HTML_IMG_PATTERN = /<img[^>]+src="([^"]+)"[^>]*>/g;

async function updateImageUrls() {
    try {
        // Get all markdown files
        const files = await readdir(POSTS_DIR);
        const mdFiles = files.filter(file => file.endsWith('.md'));

        for (const file of mdFiles) {
            const filePath = join(POSTS_DIR, file);
            const content = await readFile(filePath, 'utf-8');

            // Update markdown image syntax
            let updatedContent = content.replace(IMAGE_PATTERN, (match, alt, src) => {
                const imageId = imageIdMap[src];
                if (imageId) {
                    return `![${alt}](https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/${imageId}/w=800)`;
                }
                return match;
            });

            // Update HTML img tags
            updatedContent = updatedContent.replace(HTML_IMG_PATTERN, (match, src) => {
                const imageId = imageIdMap[src];
                if (imageId) {
                    return match.replace(src, `https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/${imageId}/w=800`);
                }
                return match;
            });

            // Write updated content back to file
            if (content !== updatedContent) {
                await writeFile(filePath, updatedContent, 'utf-8');
                console.log(`Updated images in ${file}`);
            }
        }

        console.log('Image URL update complete');
    } catch (error) {
        console.error('Error updating image URLs:', error);
    }
}

updateImageUrls();
