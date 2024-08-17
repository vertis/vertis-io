import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export async function load({ params }) {
	const postsDirectory = path.join(process.cwd(), 'src', 'posts');
	const posts = [];

	try {
		const files = fs.readdirSync(postsDirectory);
		for (const file of files) {
			if (file.endsWith('.md')) {
				const filePath = path.join(postsDirectory, file);
				const fileContent = fs.readFileSync(filePath, 'utf-8');
				const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
				let frontmatter = {};
				if (frontmatterMatch) {
					const frontmatterContent = frontmatterMatch[1];
					frontmatter = yaml.load(frontmatterContent) as Record<string, any>;
				}
				posts.push({
					slug: file.slice(0, -3),
					date: fs.statSync(path.join(postsDirectory, file)).mtime,
					metadata: frontmatter
				});
			}
		}
	} catch (err) {
		console.error('Error reading posts directory:', err);
		error(500, 'Internal Server Error');
	}

	return {
		posts: posts.reverse()
	};
}
