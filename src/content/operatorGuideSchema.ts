import { z } from "astro:content";

// Redaktionelle Guide-Daten: Spielwerte (Skills, Waffenwerte, Materialkosten)
// werden später getrennt aus dem Endfield-Importer geladen.
const identifier = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Bitte eine ID aus Kleinbuchstaben, Zahlen und Bindestrichen verwenden.");
const text = z.string().trim().max(12000);
const skillSlot = z.enum(["basic", "battle", "combo", "ultimate"]);
const role = z.enum(["main-dps", "support", "hybrid", "sub-dps", "control", "other"]);
const equipmentLevel = z.union([z.literal(50), z.literal(60), z.literal(70)]);
const operatorParty = z.tuple([identifier, identifier, identifier, identifier]);
const noDuplicateIds = (items: { id: string }[]) => new Set(items.map(item => item.id)).size === items.length;

const skillPriority = z.object({
  // Alle vier Fertigkeiten einmalig, von höchster zu niedrigster Priorität.
  order: z.array(skillSlot).length(4)
    .refine(slots => new Set(slots).size === 4, "Alle vier Fertigkeiten müssen genau einmal angegeben werden."),
  // Drei Verknüpfungen zwischen den vier Einträgen: '>' oder '>='.
  comparisons: z.array(z.enum([">", ">="])).length(3),
  // Frei formulierbare Level-Ziele, z.B. '9', 'M1', 'M3'.
  targetLevels: z.object({
    basic: text.optional(),
    battle: text.optional(),
    combo: text.optional(),
    ultimate: text.optional(),
  }).default({}),
});

const weaponRecommendation = z.object({
  weaponId: identifier,
  category: z.enum(["bis", "bp", "f2p", "alternative"]),
  evaluation: text.default(""),
  sourceNote: text.optional(),
  // Nur auf Basis nachvollziehbarer Vergleiche angeben!
  performancePercent: z.number().finite().optional(),
  comparisonConditions: text.optional(),
}).superRefine((weapon, ctx) => {
  if (weapon.performancePercent !== undefined && !weapon.comparisonConditions?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["comparisonConditions"], message: "Prozentvergleiche benötigen nachvollziehbare Vergleichsbedingungen." });
  }
});

const equipmentBuild = z.object({
  id: identifier,
  title: z.string().trim().min(1),
  role: role,
  // Die vier Ausrüstungsplätze sind verbindlich.
  items: z.tuple([identifier, identifier, identifier, identifier]),
  availableFromLevel: equipmentLevel.optional(),
  factoryUnlock: text.optional(),
  teamContext: text.optional(),
  evaluation: text.default(""),
  craftingNotes: text.optional(),
  setBonusNotes: text.optional(),
});

const team = z.object({
  id: identifier,
  title: z.string().trim().min(1),
  role: role,
  // Endfield-Teams: exakt vier Operatoren inkl. des Guide-Operators.
  members: operatorParty.refine(members => new Set(members).size === 4, "Ein Team benötigt vier unterschiedliche Operatoren."),
  buildId: identifier.optional(),
  note: text.optional(),
  evaluation: text.optional(),
});

const showcase = z.object({
  id: identifier,
  title: z.string().trim().min(1),
  type: z.enum(["trial", "boss", "speedrun", "other"]),
  url: z.string().url().optional(),
  featured: z.boolean().default(false),
  description: text.optional(),
  rotationAndTips: text.optional(),
});

const potential = z.object({
  level: z.number().int().min(1).max(5),
  evaluation: text.default(""),
  // Werte sind optional: Nicht jedes Potenzial lässt sich seriös quantifizieren.
  increaseOverPreviousPercent: z.number().finite().optional(),
  increaseOverP0Percent: z.number().finite().optional(),
  comparisonConditions: text.optional(),
});

export const operatorGuideSchema = z.object({
  operator: identifier,
  // Anzeigename, bis die offiziellen Operator-Metadaten importiert werden.
  displayName: z.string().trim().min(1).max(120).optional(),
  status: z.enum(["draft", "preview", "published"]).default("draft"),
  updatedAt: z.coerce.date().optional(),
  guideVideo: z.object({
    title: text.optional(),
    url: z.string().url().optional(),
  }).default({}),

  overview: z.object({
    summary: text.default(""),
    strengths: z.array(text).default([]),
    weaknesses: z.array(text).default([]),
    ratings: z.object({
      difficulty: z.number().int().min(1).max(5).optional(),
      flexibility: z.number().int().min(1).max(5).optional(),
      accessibility: z.number().int().min(1).max(5).optional(),
    }).default({}),
    featuredBuildId: identifier.optional(),
    partners: z.array(identifier).default([]),
  }).default({}),

  operatorKit: z.object({
    playstyle: text.default(""),
    progressionNotes: text.default(""),
    resourceNotes: text.default(""),
  }).default({}),

  skills: z.object({
    priority: skillPriority.optional(),
    active: z.object({
      basic: text.optional(),
      battle: text.optional(),
      combo: text.optional(),
      ultimate: text.optional(),
    }).default({}),
    // Offizielle Talente kommen aus der Datenquelle; hier nur eigene Erklärungen.
    combatTalents: z.array(z.object({ talentId: identifier, evaluation: text })).default([]),
    shipTalents: z.array(z.object({ talentId: identifier, evaluation: text })).default([]),
  }).default({}),

  weapons: z.object({
    recommendations: z.array(weaponRecommendation).default([]),
    generalNotes: text.default(""),
  }).default({}),

  equipment: z.object({
    builds: z.array(equipmentBuild)
      .refine(noDuplicateIds, "Ausrüstungs-Build-IDs müssen eindeutig sein.")
      .default([]),
    progression: z.array(z.object({
      stage: z.enum(["early", "mid", "late", "endgame"]),
      note: text,
    })).default([]),
    generalNotes: text.default(""),
  }).default({}),

  potentials: z.object({
    entries: z.array(potential)
      .refine(entries => new Set(entries.map(p => p.level)).size === entries.length, "Jedes Potenzial P1 bis P5 darf nur einmal vorkommen.")
      .default([]),
    pullAdvice: text.default(""),
  }).default({}),

  teams: z.object({
    introduction: text.default(""),
    roles: z.array(role).default([]),
    meta: z.array(team).default([]),
    more: z.array(team).default([]),
  }).default({}),

  gameplay: z.object({
    showcases: z.array(showcase).default([]),
  }).default({}),

  conclusion: z.object({
    verdict: text.default(""),
    recommendation: z.enum(["recommended", "conditional", "optional"]).optional(),
    pullAdvice: text.default(""),
    recommendedFor: z.array(text).default([]),
    skipIf: z.array(text).default([]),
    closingNote: text.default(""),
  }).default({}),
}).superRefine((guide, ctx) => {
  const buildIds = new Set(guide.equipment.builds.map(build => build.id));
  if (guide.overview.featuredBuildId && !buildIds.has(guide.overview.featuredBuildId)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["overview", "featuredBuildId"], message: "featuredBuildId muss auf einen vorhandenen Ausrüstungs-Build verweisen." });
  }

  const allTeams = [...guide.teams.meta, ...guide.teams.more];
  if (!noDuplicateIds(allTeams)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["teams"], message: "Team-IDs müssen über Meta- und weitere Teams hinweg eindeutig sein." });
  }
  for (const [i, team] of allTeams.entries()) {
    if (!team.members.includes(guide.operator)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["teams", i], message: "Der Guide-Operator muss Teil seines Teams sein." });
    }
    if (team.buildId && !buildIds.has(team.buildId)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["teams", i, "buildId"], message: "buildId muss auf einen vorhandenen Ausrüstungs-Build verweisen." });
    }
  }

  if (guide.gameplay.showcases.filter(run => run.featured).length > 1) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["gameplay", "showcases"], message: "Höchstens ein Showcase darf featured: true sein." });
  }
  if (!noDuplicateIds(guide.gameplay.showcases)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["gameplay", "showcases"], message: "Showcase-IDs müssen eindeutig sein." });
  }

  if (guide.status === "published") {
    if (!guide.overview.summary) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["overview", "summary"], message: "Veröffentlichte Guides benötigen eine Kurzbeschreibung." });
    }
    if (!guide.conclusion.verdict) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["conclusion", "verdict"], message: "Veröffentlichte Guides benötigen ein Fazit." });
    }
  }
});
