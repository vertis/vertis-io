import type { Root, Image, HTML } from 'mdast';
import { visit } from 'unist-util-visit';
import { imageIdMap } from './images';

export function remarkImageCloudflare() {
    return function transformer(tree: Root) {
        visit(tree, 'image', (node: Image) => {
            // Check if the image URL is in our mapping
            if (node.url.startsWith('/assets/img/')) {
                const imageId = imageIdMap[node.url];
                if (imageId) {
                    // Transform to use standard img tag
                    const htmlNode = node as unknown as HTML;
                    htmlNode.type = 'html';
                    const alt = node.alt || '';
                    const title = node.title || '';
                    htmlNode.value = `<img src="${node.url}" alt="${alt}" ${title ? `title="${title}"` : ''} class="w-full rounded-lg shadow-sm" />`;
                    if (title) {
                        htmlNode.value += `\n<figcaption class="mt-2 text-base text-ink-light text-center">${title}</figcaption>`;
                    }
                }
            }
        });
    };
}
