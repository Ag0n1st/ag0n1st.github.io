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
  if(row.iconPath && !/^\/images\/endfield\/(?:operators\/(?:icons\/\d+|[a-z0-9-]+\/cover)|(?:weapons|gear|materials|valuables)\/\d+)\.webp$/.test(row.iconPath))
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


/** Accept official item IDs or slugified official English names in editable guide templates. */
const normalizedId=name=>name.normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
  .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const namedIndex=new Map<string,EndfieldCatalogItem>();
for(const item of items.values()){
  const slug=normalizedId(item.name);
  const key=item.categories[0]+"::"+slug;
  if(!namedIndex.has(key))namedIndex.set(key,item);
  else namedIndex.delete(key); // ambiguous aliases are not auto-resolved
}
export function resolveOfficialItem(reference:string,category:"Weapons"|"Gear"):EndfieldCatalogItem|undefined{
  const direct=items.get(reference);
  if(direct?.categories.includes(category))return direct;
  return namedIndex.get(category+"::"+normalizedId(reference));
}
