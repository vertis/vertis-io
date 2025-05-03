import { visit } from 'unist-util-visit';
import { imageIdMap } from './images';

export function remarkImageCloudflare() {
    return function transformer(tree) {
        visit(tree, 'image', (node) => {
            // Check if the image URL is in our mapping
            if (node.url.startsWith('/assets/img/')) {
                const imageId = imageIdMap[node.url];
                if (imageId) {
                    // Transform to use our Image component
                    const title = node.title || '';
                    node.type = 'html';
                    node.value = `<Image src="${node.url}" alt="${node.alt || ''}" ${title ? `caption="${title}"` : ''} />`;
                }
            }
        });
    };
}
