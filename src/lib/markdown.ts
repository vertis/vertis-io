import MarkdownIt from 'markdown-it';
import fm from 'front-matter';
import type { Post, PostFrontmatter } from './posts';
import { validateFrontmatter } from './posts';
import { readFileSync } from 'node:fs';

// Initialize markdown-it with options
const md = new MarkdownIt({
  html: true,        // Enable HTML tags in source
  xhtmlOut: true,    // Use '/' to close single tags (<br />)
  breaks: true,      // Convert '\n' in paragraphs into <br>
  linkify: true,     // Autoconvert URL-like text to links
  typographer: true  // Enable smartquotes and other replacements
});

// Custom renderer for code blocks
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info || '';
  return `<pre><code class="language-${lang}">${token.content}</code></pre>`;
};

export function parseMarkdownFile(filePath: string): Post {
  // Read the markdown file
  const fileContent = readFileSync(filePath, 'utf-8');

  // Parse frontmatter
  const { attributes, body } = fm<PostFrontmatter>(fileContent);

  // Validate frontmatter
  if (!validateFrontmatter(attributes)) {
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }

  // Parse markdown content
  const content = md.render(body);

  // Extract slug from filename
  const slug = filePath.split('/').pop()?.replace(/\.md$/, '') || '';

  return {
    ...attributes,
    content,
    slug
  };
}
