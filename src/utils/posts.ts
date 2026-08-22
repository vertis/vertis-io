import { getCollection, type CollectionEntry } from "astro:content";
import relatedContent from "../data/related-content.json";

export type Post = CollectionEntry<"posts">;

const FILENAME_RE = /^(\d{4})-(\d{2})-(\d{2})-(.+)$/;

export function postUrl(post: Post): string {
  if (post.data.permalink) {
    return post.data.permalink.replace(/\/$/, "") + "/";
  }
  const match = post.id.match(FILENAME_RE);
  if (!match) throw new Error(`Unexpected post id: ${post.id}`);
  const [, year, month, day, slug] = match;
  return `/${year}/${month}/${day}/${slug}/`;
}

export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => data.published);
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

const related = relatedContent as Record<string, string[][]>;

export function getRelatedPosts(post: Post, allPosts: Post[]): Post[] {
  const entries = related[`${post.id}.md`];
  if (!entries) return [];
  const filenames = entries.flat();
  const byId = new Map(allPosts.map((p) => [`${p.id}.md`, p]));
  return filenames
    .map((f) => byId.get(f))
    .filter((p): p is Post => p !== undefined);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
