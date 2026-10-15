export interface ImportedSkill {
  slot: "basic" | "battle" | "combo" | "ultimate";
  name: string;
  type: string;
  iconUrl?: string;
  // Metric name followed by the 12 values for ranks 1–9 and mastery I–III.
  metrics: string[][];
}
export interface ImportedOperator {
  schemaVersion: number;
  source: { provider: string; itemId: string; language: string; snapshot: string };
  operator: {
    id: string;
    slug: string;
    name: string;
    rarity: number;
    element: string;
    class: string;
    weaponType: string;
    faction?: string;
    coverUrl?: string;
    illustrationUrl?: string;
  };
  ranks: string[];
  skills: ImportedSkill[];
}
// Public, versioned repository data only; no runtime network/API request.
// New operator JSON files are discovered automatically by Astro/Vite.
const modules = import.meta.glob("../../data/endfield/operators/*.json", {
  eager: true,
  import: "default"
}) as Record<string, ImportedOperator>;

const operatorIndex = new Map<string, ImportedOperator>();
for (const imported of Object.values(modules)) {
  if (imported?.operator?.slug) {
    if (operatorIndex.has(imported.operator.slug)) {
      throw new Error("Doppelte Endfield-Operator-ID: " + imported.operator.slug);
    }
    if (imported.ranks.length !== 12 ||
        imported.skills.some(skill => skill.metrics.some(metric => metric.length !== 13))) {
      throw new Error("Ungültige SKPORT-Skilltabelle: " + imported.operator.slug);
    }
    operatorIndex.set(imported.operator.slug, imported);
  }
}
export function getImportedOperator(slug: string): ImportedOperator | undefined {
  return operatorIndex.get(slug);
}
