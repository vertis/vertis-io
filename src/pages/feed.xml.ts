import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getSortedPosts, postUrl } from "../utils/posts";

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();
  return rss({
    title: "vertis.io",
    description: "Writings about development, future technology and life",
    site: context.site!,
    items: posts.slice(0, 10).map((post) => ({
      title: post.data.title,
      description: post.data.meta_description ?? "",
      pubDate: post.data.date,
      link: postUrl(post),
      categories: (post.data.tags ?? []).filter(
        (tag): tag is string => !!tag,
      ),
    })),
  });
}
