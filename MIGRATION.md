# Jekyll to SvelteKit Migration Tasks

## Initial Setup

- [x] Create new SvelteKit project (already done)
- [x] Configure essential dependencies (Tailwind, PostCSS, etc.)
- [x] Port configuration from \_config.yml to SvelteKit equivalent (in lib/config.ts)
- [ ] Setup environment variables (.env file)

## Content Migration

- [x] Migrate blog posts from \_posts/
  - [x] Convert frontmatter to SvelteKit format
    - [x] Create types for frontmatter data
    - [x] Define feature_image interface
    - [x] Create utility functions for frontmatter parsing
    - [x] Setup minutes_read calculation
    - [x] Add post validation with type safety
    - [x] Add sorting and pagination utilities
    - [x] Add HN comments link generation
  - [ ] Update image references to new CDN URLs
  - [x] Ensure markdown processing works correctly
    - [x] Configure mdsvex
    - [x] Add markdown content cleaning utilities
      - [x] Convert HTML to markdown before processing
      - [x] Handle HTML entities and special characters
      - [x] Preserve code blocks and formatting
      - [x] Fix curly quotes and apostrophes
      - [x] Handle frontmatter correctly
      - [x] Clean content in both blog index and individual posts
    - [x] Use TypeScript satisfies operator for better type safety
  - [] Setup HN comments linking
- [ ] Migrate pages from \_pages/
  - [x] About page
  - [x] Blog index
  - [x] Consulting page
  - [x] Contact page
  - [ ] Garden pages
  - [ ] Mentoring page
- [ ] Migrate drafts from \_drafts/
- [ ] Update internal links between posts/pages

## Layout & Components

- [x] Create base layout (+page.svelte)
- [x] Port header component
- [x] Port footer component
  - [x] Setup route structure
  - [x] Create blog/+page.svelte for blog index
    - [x] List posts with feature images
    - [x] Add pagination
    - [x] Sort by date
  - [x] Create blog/[slug]/+page.svelte for individual posts
    - [x] Display feature image with caption
    - [x] Show reading time
    - [x] Add HN comments link
  - [x] Create blog/+page.server.ts for data loading
    - [x] Load and parse markdown files
    - [x] Extract and validate frontmatter
    - [x] Generate post metadata (slug, date parsing)
  - [x] Setup dynamic imports for markdown files
  - [x] Create blog post layout
  - [ ] Create page layout
- [x] Port home page layout and components from index.html
  - [x] Add hero section with author info
  - [x] Add post lists (recent, popular, notable)
  - [x] Add quote section
- [ ] Implement pagination for blog posts
- [ ] Port image caption component
- [x] Create reusable components for common elements
  - [x] Post list item component (used in recent/popular/notable sections)

## Styling

- [x] Migrate Tailwind configuration
- [x] Setup base CSS structure
- [x] Uncomment and enhance prose styles
  - [x] Add table styles
  - [x] Add image styles
  - [x] Update colors to match site theme
- [ ] Port remaining custom CSS from \_src/
- [ ] Ensure responsive design works
- [ ] Maintain existing color scheme and typography
- [ ] Test dark/light mode if applicable

## Data & Assets

- [x] Migrate site metadata
- [x] Create lib/config.ts for site configuration
  - [x] Port settings from \_config.yml
  - [x] Add type definitions for site config
  - [x] Add type definitions for blog posts
  - [x] Setup author information
  - [ ] Update image paths to use CDN URLs
- [x] Port \_data/notable_posts.yml
- [x] Port \_data/popular_posts.yml
- [x] Port \_data/related_content.yml
- [ ] Setup image handling with CDN
- [ ] Migrate static assets
- [ ] Update image references in content

## Functionality

- [ ] Implement RSS feed
- [ ] Create sitemap.xml
- [ ] Setup redirects (from \_redirects)
- [ ] Implement search functionality
- [ ] Setup tag/category pages
- [ ] Implement related posts functionality

## SEO & Meta

- [ ] Port meta tags and SEO settings
- [ ] Maintain existing URLs structure
- [ ] Setup robots.txt
- [ ] Configure social media meta tags
- [ ] Ensure Google verification file is present

## Build & Deploy

- [x] Configure build process (vite)
- [x] Setup development environment
- [ ] Test build output
- [ ] Configure deployment
- [ ] Setup CI/CD if needed

## Testing

- [x] Setup testing framework (Playwright, Vitest)
- [ ] Test all pages render correctly
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Test performance
- [ ] Validate RSS feed
- [ ] Verify redirects
- [ ] Test social media sharing
- [ ] Check SEO meta tags

## Post-Migration

- [ ] Backup old Jekyll site
- [ ] Document any manual steps needed
- [ ] Create content management guide
- [ ] Monitor analytics for issues
- [ ] Update DNS if needed
- [ ] Remove unused Jekyll files

## Code Quality & TypeScript

- [x] Configure TypeScript
- [x] Setup ESLint
- [x] Setup Prettier
- [x] Configure test runners

## Optional Improvements

- [x] Implement better code syntax highlighting (via mdsvex)
- [ ] Add search functionality
- [ ] Improve image loading/lazy loading
- [ ] Add dark mode support if not present
- [ ] Implement better responsive images
- [ ] Add reading time calculation
- [ ] Improve site performance
