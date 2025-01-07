import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [
		[remarkGfm, {
			log: (message) => {
				console.log('Remark:', message);
			}
		}]
	],
	layout: false,
	smartypants: false,
	highlight: {
		alias: { shell: 'bash' }
	},
	rehypePlugins: [
		[rehypeRaw, {
			log: (message) => {
				console.log('Rehype:', message);
			}
		}]
	],
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexOptions.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter({ strict: false })
	}
};

export default config;
