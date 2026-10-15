import { defineCollection, z } from "astro:content";
import { operatorGuideSchema } from "./operatorGuideSchema";

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

// New operator-guide files are editorial Markdown entries. A leading underscore
// (_template.md) is ignored by Astro and can be copied for each new operator.
const operatorGuides = defineCollection({
  type: "content",
  schema: operatorGuideSchema,
});

export const collections = { posts, "operator-guides": operatorGuides };
