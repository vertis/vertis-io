# vertis.io

Personal blog and website of Luke Chadwick - writings about software development, future technology, and life.

## Project Overview

This is an actively maintained personal blog built with Jekyll, featuring 156+ articles spanning two decades of software engineering, technology trends, and personal reflections. The site serves as both a portfolio and knowledge repository, documenting experiences with Ruby/Rails, security, DevOps, AI, and various technology ecosystems.

**Status:** ✅ **Active** - Last updated May 2025

## Tech Stack

- **Static Site Generator:** Jekyll 4.3
- **Styling:** Tailwind CSS with PostCSS
- **Languages:** Ruby, TypeScript
- **Build Tools:**
  - Jekyll with Paginate plugin
  - PostCSS CLI for CSS compilation
  - Bun runtime for TypeScript tooling
  - Foreman for process management

## Project Timeline

- **Content History:** Blog posts dating back to 2004
- **Git Repository:** Established December 2020
- **Recent Activity:** Consistently maintained through 2025
- **Post Frequency:** 156+ published articles over 20 years

## Content Sections

- **Blog** (`/blog`) - Main article feed with pagination
- **Consulting** (`/consulting`) - Professional services information
- **About** (`/about`) - Personal bio and background
- **Contact** (`/contact`) - Contact information
- **Garden** (`/garden`) - Digital garden / notes section
- **Mentoring** (`/mentoring`) - Mentoring services

## Development

### Prerequisites

- Ruby (see `.ruby-version` for specific version)
- Bundler
- Bun (for TypeScript tools)

### Local Setup

```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
bun install

# Build CSS
bun run build-css

# Start Jekyll server
bundle exec jekyll serve
```

### Helper Scripts

Located in `_bin/`:
- `new-post.sh` - Create new blog post
- `copy-from-obsidian.sh` - Import posts from Obsidian
- `sync-images.ts` - Sync images to CDN
- `chore-image-to-cdn.ts` - Migrate images to CDN
- `related-content.py` - Generate related content links

## Repository Structure

```
├── _config.yml          # Jekyll configuration
├── _data/              # Site data files
├── _drafts/            # Unpublished drafts
├── _includes/          # Reusable components
├── _layouts/           # Page templates
├── _pages/             # Static pages (About, Contact, etc.)
├── _posts/             # Blog articles (156+ posts)
├── _src/               # Source files for assets
├── assets/             # Compiled CSS, images, etc.
├── _bin/               # Build and maintenance scripts
└── Gemfile             # Ruby dependencies
```

## Features

- Responsive design with Tailwind CSS
- Pagination for blog posts
- Social media integration
- Related content suggestions
- RSS feed
- Reading time estimates
- Google Analytics integration
- CDN-hosted images

## Deployment

Site is deployed to https://vertis.io with Netlify redirects configured in `_redirects`.

## License

Personal blog content - all rights reserved to the author.

---

**Author:** Luke Chadwick
**Website:** https://vertis.io
**Email:** me@vertis.io
**GitHub:** [@vertis](https://github.com/vertis)
