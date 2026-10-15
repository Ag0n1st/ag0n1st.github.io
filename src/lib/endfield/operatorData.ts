export interface ImportedItemCost { id: string; count: number; }
export interface ImportedOperatorExtras {
  schemaVersion: number;
  source: { provider: string; itemId: string; language: string; snapshot: string };
  operator: string;
  profile: Record<string,string>;
  attributes: {
    levels: string[];
    metrics: { name: string; values: string[] }[];
    levelCosts: { level: string; items: ImportedItemCost[] }[];
    mainAttribute: string;
    secondaryAttribute: string;
  };
  talents: {
    id: string;
    name: string;
    category: "attribute" | "combat" | "ship" | "other";
    levels: {name:string;effect:string;requirements:string[];cost:ImportedItemCost[]}[];
  }[];
  promotions: { name:string;effect:string;requirement:string;cost:ImportedItemCost[] }[];
  potentials: { level:number;name:string;effect:string }[];
  materials: Record<string,{name:string}>;
}
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

const extraModules = import.meta.glob("../../data/endfield/operators/*.extra.json", {
  eager: true,
  import: "default"
}) as Record<string, ImportedOperatorExtras>;
const extraIndex = new Map<string,ImportedOperatorExtras>();
for(const extras of Object.values(extraModules)) {
  if(extraIndex.has(extras.operator)) throw Error("Doppelte Operator-Ergänzung: "+extras.operator);
  if(
    extras.attributes.levels.length !== 6 ||
    extras.attributes.metrics.some(metric=>metric.values.length!==6) ||
    extras.talents.length!==5 ||
    extras.promotions.length!==7 ||
    extras.potentials.length!==5 ||
    extras.potentials.some((potential,i)=>potential.level!==i+1)
  ) throw Error("Unvollständige SKPORT-Operator-Ergänzung: "+extras.operator);
  const official = operatorIndex.get(extras.operator);
  if(official && official.operator.id!==extras.source.itemId) {
    throw Error("Nicht übereinstimmende SKPORT-Item-ID für "+extras.operator);
  }
  extraIndex.set(extras.operator,extras);
}
export function getImportedOperatorExtras(slug: string): ImportedOperatorExtras | undefined {
  return extraIndex.get(slug);
}
