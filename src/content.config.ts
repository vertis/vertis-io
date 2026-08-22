import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
    // Preserve original filename casing (Jekyll URLs are case-sensitive)
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      published: z.boolean().default(true),
      minutes_read: z.number().nullable().optional(),
      meta_description: z.string().nullable().optional(),
      feature_image: z
        .object({
          url: z.string(),
          preview_url: z.string().optional(),
          caption: z.string().optional(),
        })
        .nullable()
        .optional(),
      tags: z.array(z.string().nullable()).nullable().optional(),
      permalink: z.string().optional(),
    })
    .passthrough(),
});

export const collections = { posts };
