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
    // Optional: a non-character Gameplay/Factory/Systems guide becomes a
    // bilingual homepage entry as soon as both actual routes are ready.
    feed: z.object({
      category: z.enum(["character", "gameplay", "factory", "systems", "news"]),
      titleEn: z.string().trim().min(3).max(100),
      summaryEn: z.string().trim().min(15).max(240),
      hrefDe: z.string().startsWith("/"),
      hrefEn: z.string().startsWith("/en/"),
      listedAt: z.coerce.date(),
      game: z.string().trim().min(2),
    }).optional(),
  }),
});

// New operator-guide files are editorial Markdown entries. A leading underscore
// (_template.md) is ignored by Astro and can be copied for each new operator.
const operatorGuides = defineCollection({
  type: "content",
  schema: operatorGuideSchema,
});

export const collections = { posts, "operator-guides": operatorGuides };
