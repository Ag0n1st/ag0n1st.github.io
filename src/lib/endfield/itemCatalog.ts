import officialItems from "../../data/endfield/catalog/items.json";

export interface EndfieldCatalogItem {
  id: string;
  name: string;
  categories: string[];
  iconPath: string | null;
  cacheStatus: string;
  coverUrl: string | null;
}

const items=new Map<string,EndfieldCatalogItem>();
for(const row of officialItems.items){
  if(!/^\d+$/.test(row.id) || items.has(row.id))
    throw new Error("Invalid or duplicate SKPORT item ID: "+row.id);
  if(row.iconPath && !/^\/images\/endfield\/(?:items\/\d+|operators\/[a-z0-9-]+\/cover)\.webp$/.test(row.iconPath))
    throw new Error("Unsafe SKPORT static item path: "+row.id);
  items.set(row.id,row);
}
/** Resolves each wiki item ID to one cached WebP icon for every guide/tool. */
export function getEndfieldItem(id:string|number):EndfieldCatalogItem|undefined {
  return items.get(String(id));
}
export const endfieldCatalogMeta={
  snapshot:officialItems.source.snapshot,
  categories:officialItems.categories,
  items:items.size
};
