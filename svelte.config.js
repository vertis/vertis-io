import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [
		[remarkGfm, {
			singleTilde: false,
			tableCellPadding: true,
			tablePipeAlign: true,
			stringLength: str => str.length
		}]
	],
	layout: false,
	highlight: {
		alias: { shell: 'bash' }
	}
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
