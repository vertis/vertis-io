interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  youtube: string;
  dribbble: string;
  pinterest: string;
  feed: string;
}

interface Author {
  name: string;
  url: string;
  bio: string;
  email: string;
  image: string;
}

interface NavLink {
  href: string;
  name: string;
}

interface SiteConfig {
  title: string;
  email: string;
  description: string;
  url: string;
  logoUrl: string;
  author: Author;
  social: SocialLinks;
  analytics: {
    googleAnalyticsId: string;
    domain: string;
  };
  theme: {
    readingTime: boolean;
    alwaysShowNav: boolean;
  };
  navigation: NavLink[];
}

export const siteConfig: SiteConfig = {
  title: "vertis.io",
  email: "luke@vertis.io",
  description: "Writings about development, future technology and life",
  url: "https://vertis.io",
  logoUrl: "/assets/img/bloglogo.jpg",
  author: {
    name: "Luke Chadwick",
    url: "https://vertis.io",
    bio: "Geek since birth. Futurist. Lover. Idealist.",
    email: "me@vertis.io",
    image: "/assets/img/authorimage.jpg"
  },
  social: {
    twitter: "https://twitter.com/vertis",
    github: "https://github.com/vertis",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    dribbble: "https://dribbble.com",
    pinterest: "https://pinterest.com",
    feed: "https://feeds.feedburner.com/vertis"
  },
  analytics: {
    googleAnalyticsId: "UA-1940507-6",
    domain: "vertis.io"
  },
  theme: {
    readingTime: true,
    alwaysShowNav: false
  },
  navigation: [
    { href: "/blog", name: "Blog" },
    { href: "/consulting", name: "Consulting" },
    { href: "/about", name: "About Me" },
    { href: "/contact", name: "Contact" }
  ]
};

// Utility types for blog posts
export interface FeatureImage {
  url: string;
  preview_url: string;
}

export interface PostFrontmatter {
  published: boolean;
  title: string;
  author: string;
  minutes_read: number;
  feature_image?: FeatureImage;
  caption?: string;
  meta_description?: string;
  date: string;
}

// Export individual config sections for convenience
export const { author, social, navigation } = siteConfig;
