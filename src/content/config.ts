import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    type: z.string(),
    accent: z.enum(["pink", "cyan"]).default("pink"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
