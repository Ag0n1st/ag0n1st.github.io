import officialItems from "../../data/endfield/catalog/items.json";
import v16Gear from "../../data/endfield/catalog/v16-gear.json";

export interface EndfieldCatalogItem {
  id: string;
  name: string;
  categories: string[];
  iconPath: string | null;
  cacheStatus: string;
  coverUrl: string | null;
}

const items=new Map<string,EndfieldCatalogItem>();
const releaseItems=new Map<string,EndfieldCatalogItem>();
// 18 community-indexed v1.6 gear pieces plus one user-supplied Gloves variant are provisional preview identities. They do
// not grant recipe, blueprint or source-verification status in the Build-Finder.
if(v16Gear.version!=="1.6"||v16Gear.items.length!==19)throw Error("Incomplete v1.6 release gear inventory");
for(const x of v16Gear.items){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.id)||releaseItems.has(x.id))throw Error("Invalid nonnumeric release gear identifier");
  if(x.iconPath&&!/^\/images\/endfield\/gear\/releases\/(?:si|v16)\/[a-z0-9-]+\.webp$/.test(x.iconPath))throw Error("Untrusted version 1.6 release icon path");
  if(x.officialNumericId!==null||x.identityStatus!=="official-numeric-id-unverified")throw Error("Provisional v1.6 gear cannot masquerade as officially verified");
  releaseItems.set(x.id,x);
}

for(const row of officialItems.items){
  if(!/^\d+$/.test(row.id) || items.has(row.id))
    throw new Error("Invalid or duplicate SKPORT item ID: "+row.id);
  if(row.iconPath && !/^\/images\/endfield\/(?:operators\/(?:icons\/\d+|[a-z0-9-]+\/cover)|(?:weapons|gear|materials|valuables)\/\d+)\.webp$/.test(row.iconPath))
    throw new Error("Unsafe SKPORT static item path: "+row.id);
  items.set(row.id,row);
}
/** Resolves each wiki item ID to one cached WebP icon for every guide/tool. */
export function getEndfieldItem(id:string|number):EndfieldCatalogItem|undefined {
  return items.get(String(id))??releaseItems.get(String(id));
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
const ambiguousOfficial=new Set<string>();
for(const item of items.values()){
  const key=item.categories[0]+"::"+normalizedId(item.name);
  if(ambiguousOfficial.has(key))continue;
  if(namedIndex.has(key)){namedIndex.delete(key);ambiguousOfficial.add(key);}
  else namedIndex.set(key,item);
}
// Provisional release slugs remain available for older guide references, but
// an unverified community alias must NEVER replace an official numeric match.
for(const item of releaseItems.values()){
  const key=item.categories[0]+"::"+normalizedId(item.name);
  if(!namedIndex.has(key)&&!ambiguousOfficial.has(key))namedIndex.set(key,item);
}
export function resolveOfficialItem(reference:string,category:"Weapons"|"Gear"):EndfieldCatalogItem|undefined{
  const direct=items.get(reference)??releaseItems.get(reference);
  if(direct?.categories.includes(category))return direct;
  return namedIndex.get(category+"::"+normalizedId(reference));
}

/** Use already cached official operator portraits for Meta partner cards,
 * even if the full operator guide has not yet been imported. */
export function findOperatorCatalogItem(slug:string):EndfieldCatalogItem|undefined{
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))return undefined;
  return [...items.values()].find(item=>
    item.categories.includes("Operators") && normalizedId(item.name)===slug);
}
