#!/usr/bin/env node
/**
 * One-time official SKPORT v1.6 gear delta import.
 * Only the 18 observed IDs 1380-1397 from the anonymous /item/catalog response
 * are eligible. Never overwrite original snapshots or invent a duplicate for
 * Type 50 Yinglung Gloves (older 411, newer 1381).
 */
import {chromium} from "playwright";
import sharp from "sharp";
import {readFile,writeFile,mkdir,access} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import {normalizeEquipment,extractRenderedGearSource} from "./equipment-normalize.mjs";

const catalogPath="src/data/endfield/catalog/items.json";
const detailPath="src/data/endfield/catalog/equipment-details.json";
const reportPath="src/data/endfield/catalog/v16-skport-import.json";
const termPath="src/data/endfield/terminology.json";
const old=JSON.parse(await readFile(catalogPath,"utf8"));
const details=JSON.parse(await readFile(detailPath,"utf8"));
const terminology=JSON.parse(await readFile(termPath,"utf8"));
const published=new Set(old.items.map(row=>String(row.id)));
const first=1380,last=1397,day=new Date().toISOString().slice(0,10);
const expect=Array.from({length:last-first+1},(_,n)=>String(first+n));
if(expect.some(id=>published.has(id)))throw Error("Delta is already imported; refusing to overwrite official source");
if(old.source.provider!=="SKPORT Wiki"||details.source.provider!=="SKPORT Wiki")throw Error("Only trusted original snapshots are supported");
const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
let listing=[],sources=new Map();
let page;
try{
 page=await browser.newPage({locale:"en-US",viewport:{width:1350,height:900}});
 page.on("response",async response=>{
  try{
   const u=new URL(response.url());
   if(u.hostname!=="zonai.skport.com"||response.status()!==200)return;
   const data=await response.json().catch(()=>null);
   if(data?.code!==0)return;
   if(u.pathname==="/web/v1/wiki/item/catalog"){
    const seen=new Set();
    const visit=(obj,depth=0)=>{
     if(!obj||typeof obj!=="object"||depth>12||seen.has(obj))return;
     seen.add(obj);
     if(Array.isArray(obj)){for(const x of obj)visit(x,depth+1);return}
     if(/^\d+$/.test(String(obj.itemId??""))&&typeof obj.name==="string")listing.push(obj);
     for(const value of Object.values(obj))visit(value,depth+1);
    };
    visit(data.data?.catalog);
   }
   if(u.pathname==="/web/v1/wiki/item/info"){
    const id=u.searchParams.get("id");
    if(expect.includes(id) && String(data.data?.item?.itemId)===id && data.data?.item?.document)
     sources.set(id,data.data.item);
   }
  }catch(e){console.log("SKPORT_CAPTURE_WARNING",String(e.message).slice(0,140))}
 });
 const root="https://wiki.skport.com/endfield";
 for(const url of [root+"/catalog?mainTypeId=1&subTypeId=4",root+"/catalog?mainTypeId=1&subTypeId=4&header=0"]){
  const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
  if(res?.status()!==200)throw Error("Public catalogue not reachable");
  await page.waitForTimeout(4800);
 }
 const byId=new Map();
 for(const row of listing)if(expect.includes(String(row.itemId)))byId.set(String(row.itemId),row);
 console.log("OFFICIAL_V16_CATALOG_FOUND",JSON.stringify([...byId.values()].map(row=>({id:String(row.itemId),name:row.name}))));
 if(byId.size!==18||expect.some(id=>!byId.has(id)))throw Error("Official catalogue missing one of 18 IDs");
 const known=old.items.map(row=>({id:row.id,name:row.name}));
 const parsed=[],added=[],images=[];
 for(const id of expect){
  const entry=byId.get(id);
  const url=root+"/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id;
  sources.delete(id);
  const nav=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
  if(nav?.status()!==200)throw Error("Public item page is unavailable "+id);
  await page.waitForTimeout(3800);
  const item=sources.get(id);
  if(!item)throw Error("Missing verified public item/info response "+id);
  const body=await page.locator("body").innerText().catch(()=>"");
  const panel=extractRenderedGearSource(body);
  const cover=String(entry?.brief?.cover||item?.brief?.cover||"");
  const official=normalizeEquipment(item,{id,name:entry.name,category:"Gear",
    iconPath:"/images/endfield/gear/"+id+".webp"},day,{sourcePanel:panel,catalog:known});
  if(official.status!=="verified"||!["Armor","Gloves","Kit"].includes(official.gearSlot) ||
      !official.stats.length||!official.stats.some(tab=>tab.tables.length))
    throw Error("Official Gear detail not verified "+id);
  // Keep official stats and artificing if Source recipe text needs review; never invent material costs.
  if(official.recipeStatus==="needs-review")console.log("OFFICIAL_V16_RECIPE_REVIEW",id);
  const uri=new URL(cover);
  if(uri.protocol!=="https:"||uri.hostname!=="static.skport.com"||!uri.pathname.startsWith("/image/"))
    throw Error("Unverified official icon CDN for "+id);
  const resp=await fetch(uri,{signal:AbortSignal.timeout(30000)});
  if(!resp.ok||!/^image\/(png|jpeg|webp)/i.test(resp.headers.get("content-type")??""))
    throw Error("Official image HTTP or MIME rejected "+id);
  const binary=Buffer.from(await resp.arrayBuffer());
  if(binary.length<200||binary.length>8_000_000)throw Error("Invalid original icon size");
  const webp=await sharp(binary).resize({width:190,height:190,fit:"inside",withoutEnlargement:true})
    .webp({quality:78,effort:5}).toBuffer();
  if(webp.length>75_000)throw Error("Official icon not within 75 KB per item "+id);
  const target="public/images/endfield/gear/"+id+".webp";
  await access(target).then(()=>{throw Error("Refusing icon overwrite "+id)},err=>{if(err.message?.startsWith("Refusing"))throw err;if(err.code!=="ENOENT")throw err});
  await mkdir(dirname(target),{recursive:true});
  await writeFile(target,webp,{flag:"wx"});
  const catalogItem={id,name:entry.name,categories:["Gear"],iconPath:"/images/endfield/gear/"+id+".webp",
   cacheStatus:"cached",coverUrl:cover};
  known.push({id,name:entry.name});added.push(catalogItem);parsed.push(official);
  images.push({id,bytes:webp.length});
  console.log("OFFICIAL_V16_GEAR",JSON.stringify({id,name:entry.name,slot:official.gearSlot,
   refining:official.artificingStatus,recipe:official.recipeStatus,bytes:webp.length}));
 }
 if(parsed.length!==18)throw Error("All 18 public v1.6 Gear entries must validate");
 const byName=new Map();
 for(const v of added){const list=byName.get(v.name)||[];list.push(v.id);byName.set(v.name,list)}
 // Official older Type 50 Gloves 411 is valid and must never be overwritten by 1381.
 if(old.items.find(x=>x.id==="411")?.name==="Type 50 Yinglung Gloves")
   console.log("OFFICIAL_V16_DUPLICATE_NAME",JSON.stringify({oldId:"411",newId:"1381",name:"Type 50 Yinglung Gloves"}));
 old.items.push(...added);
 for(const entry of added){
  if(terminology.itemsById[entry.id])throw Error("Translation entry already exists "+entry.id);
  // Official EN names are retained for both locale lookups until a real DE name is verified.
  terminology.itemsById[entry.id]={category:"Gear",en:entry.name,de:entry.name};
 }
 const category=old.categories.find(x=>x.name==="Gear");
 if(!category)throw Error("Official Gear category missing");
 category.count+=18;
 old.source.snapshot=day;
 details.gear.push(...parsed);
 details.gear.sort((a,b)=>Number(a.id)-Number(b.id));
 details.source.snapshot=day;
 details.source.description="Official public item/info widgets + rendered default gear Source; earlier records retain their individual capture dates; 18 verified v1.6 Gear items appended.";
 const all=[...details.weapons,...details.gear];
 details.coverage={...details.coverage,requested:all.length,parsed:all.length,
  verified:all.filter(x=>x.status==="verified").length,incomplete:all.filter(x=>x.status!=="verified").length,
  errors:0,weaponCount:details.weapons.length,gearCount:details.gear.length,
  standardRecipesVerified:details.gear.filter(x=>x.recipeStatus==="verified").length,
  recipeNeedsReview:details.gear.filter(x=>x.recipeStatus==="needs-review").length,
  recipesNotListed:details.gear.filter(x=>x.recipeStatus==="not-listed").length};
 const summary={schemaVersion:1,provider:"SKPORT Wiki",snapshot:day,
  evidence:"anonymous /web/v1/wiki/item/catalog and /web/v1/wiki/item/info",
  count:added.length,originalGearCount:258,latestGearCount:details.gear.length,
  entries:parsed.map(p=>({id:p.id,name:p.name,slot:p.gearSlot,
   artificingStatus:p.artificingStatus,recipeStatus:p.recipeStatus,image:"/images/endfield/gear/"+p.id+".webp"})),
  duplicateNameNotice:"Type 50 Yinglung Gloves exists under distinct official IDs 411 and 1381; preserve both numeric IDs.",
  images};
 await writeFile(catalogPath,JSON.stringify(old,null,2)+"\n");
 await writeFile(detailPath,JSON.stringify(details,null,2)+"\n");
 await writeFile(reportPath,JSON.stringify(summary,null,2)+"\n");
 await writeFile(termPath,JSON.stringify(terminology,null,2)+"\n");
 console.log("OFFICIAL_V16_IMPORT_COMPLETE",JSON.stringify({count:added.length,gearTotal:details.gear.length,
  coverage:details.coverage,iconBytes:images.reduce((s,x)=>s+x.bytes,0)}));
}finally{await browser.close()}
