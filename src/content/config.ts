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


// One Markdown document per manually reviewed run; draft entries are never ranked.
const leaderboardRuns=defineCollection({
  type: "content",
  schema:z.object({
    runId:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    playerId:z.string().min(1),
    discordName:z.string().min(1),
    countryCode:z.string().regex(/^[A-Z]{2,3}$/).optional(),
    boss:z.string().regex(/^[a-z0-9-]+$/),
    version:z.string().regex(/^v\d+\.\d+$/),
    time:z.string().regex(/^\d{2,}:[0-5]\d$/),
    video:z.string().url(),
    eventId:z.string().regex(/^[a-z0-9-]+$/).optional(),
    eligibleForCommunity:z.boolean().default(false),
    status:z.enum(["draft","verified"]).default("draft"),
    team:z.array(z.object({
      slug:z.string().regex(/^[a-z0-9-]+$/),
      potential:z.number().int().min(0).max(5)
    })).length(4)
  })
});

// Event editorial metadata and both approved language variants live in one file.
const leaderboardEvents=defineCollection({
  type:"content",
  schema:z.object({
    eventId:z.string().regex(/^[a-z0-9-]+$/),
    title:z.string().min(1),
    boss:z.string().regex(/^[a-z0-9-]+$/),
    version:z.string().regex(/^v\d+\.\d+$/),
    startsOn:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endsOn:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    image:z.string().startsWith("/images/endfield/"),
    backgroundImage:z.string().startsWith("/images/endfield/"),
    rulebookUrl:z.string().url(),
    demoRunId:z.string().optional(),
    rules:z.array(z.object({
      id:z.string().min(1),
      de:z.string().min(1),
      en:z.string().min(1)
    })).min(1)
  })
});

export const collections = { posts, "operator-guides": operatorGuides, "leaderboard-runs":leaderboardRuns, "leaderboard-events":leaderboardEvents };
