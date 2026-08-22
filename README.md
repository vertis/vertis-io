# vertis.io

Personal blog and website of Luke Chadwick - writings about software development, future technology, and life.

## Project Overview

Personal blog built with Astro, featuring 160+ articles spanning two decades of software engineering, technology trends, and personal reflections. Migrated from Jekyll in 2025 (see `_bin/migrate-to-astro.ts`).

**Status:** ✅ **Active** - Last updated 2025

## Tech Stack

- **Static Site Generator:** Astro 5
- **Styling:** Tailwind CSS 3 + @tailwindcss/typography
- **Content:** Astro Content Collections (Markdown, Shiki highlighting)
- **Runtime:** Bun (also used for TypeScript utility scripts)

## Content Sections

- **Blog** (`/blog`) - Main article feed with pagination
- **Consulting** (`/consulting`) - Professional services information
- **About** (`/about`) - Personal bio and background
- **Contact** (`/contact`) - Contact information
- **Garden** (`/garden`) - Digital garden / notes section
- **Mentoring** (`/mentoring`) - Mentoring services

## Development

### Prerequisites

- Bun

### Local Setup

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Production build (outputs to dist/)
bun run build
```

### Helper Scripts

Located in `_bin/`:
- `new-post.sh` - Create new blog post
- `copy-from-obsidian.sh` - Import posts from Obsidian
- `sync-images.ts` - Sync images to CDN (requires `CLOUDFLARE_IMAGES_API_TOKEN`)
- `sync-new-image.ts` - Upload a single new image to CDN
- `chore-image-to-cdn.ts` - Replace local image URLs in posts with CDN URLs
- `chore-add-preview-url.ts` - Add feature image preview URLs to posts
- `related-content.py` - Generate related content embeddings (ChromaDB)
- `migrate-to-astro.ts` - One-time Jekyll → Astro migration (reference only)

## Repository Structure

```
├── astro.config.mjs    # Astro configuration
├── src/
│   ├── content/posts/  # Blog articles (160+ posts, markdown)
│   ├── components/     # Astro components
│   ├── layouts/        # Base/Post/Page layouts
│   ├── pages/          # Routes (index, blog, catch-all post route)
│   ├── data/           # related-content.json (ChromaDB embeddings)
│   └── utils/          # Post URL helpers
├── public/
│   ├── assets/img/     # Local images
│   ├── post/           # Legacy .html redirect stubs (Tumblr permalinks)
│   └── ...             # favicon, robots.txt, apks
└── _bin/               # Build and maintenance scripts
```

## URL Scheme

All historical URLs are preserved:

- Posts: `/YYYY/MM/DD/<slug>/` (case-sensitive slugs)
- Legacy Tumblr permalinks: `/post/<id>/<slug>` with `.html` redirect stubs in `public/`
- Pagination: `/blog/` and `/blog/page2..N/`
- RSS: `/feed.xml`, Sitemap: `/sitemap-index.xml`

## Deployment

Static build deployed to https://vertis.io via Vercel (auto-detects Astro: build command `astro build`, output `dist`).

## License

Personal blog content - all rights reserved to the author.

---

**Author:** Luke Chadwick
**Website:** https://vertis.io
**Email:** me@vertis.io
**GitHub:** [@vertis](https://github.com/vertis)
