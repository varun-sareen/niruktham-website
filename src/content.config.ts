import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['REST API', 'GlideRecord', 'Platform', 'Flow Designer', 'Integration']),
    excerpt: z.string().max(220),
    linkedinUrl: z.string().url().optional(),
  }),
});

export const collections = { posts: postsCollection };
