#!/usr/bin/env node
/**
 * Official, anonymous SKPORT map of Endfield's Gear Template Crates.
 * Export only public marker metadata. NO accounts, cookies, private APIs
 * or guessed associations to 258 wiki gear items.
 */
import {chromium} from "playwright-core";
import {readFile,writeFile,mkdir} from "node:fs/promises";
import {dirname} from "node:path";
const path="src/data/endfield/progression/gear-template-crates.json";
const mapId="map02",templateId="fc5fdd8cc5b2b77f9a1fdf1c94d5f738";
const registry=JSON.parse(await readFile("src/data/endfield/progression/story-areas.json","utf8"));
const byLevel=new Map(registry.areas.map(a=>[a.officialMapLevelId,a]));
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
let tree=null,list=null;
try{
 const context=await browser.newContext({locale:"en-US",viewport:{width:1350,height:900}});
 const page=await context.newPage();
 page.on("response",async r=>{
  try{
   const u=new URL(r.url());
   if(u.hostname!=="zonai.skport.com"||r.status()!==200)return;
   const val=await r.json().catch(()=>null);
   if(val?.code!==0||!val?.data)return;
   if(u.pathname==="/web/v1/game/endfield/map/tree")tree=val.data;
   if(u.pathname==="/web/v1/game/endfield/map/mark/list" &&
      u.searchParams.get("mapId")===mapId && !u.searchParams.has("levelId"))
      list=val.data;
  }catch{}
 });
 const res=await page.goto("https://game.skport.com/map/endfield",{waitUntil:"domcontentloaded",timeout:45000});
 if(res?.status()!==200)throw Error("Official SKPORT map returned HTTP "+res?.status());
 for(let i=0;i<20&&(!tree||!list);i++)await page.waitForTimeout(800);
 if(!tree||!list)throw Error("Official public SKPORT map metadata not returned");
 const map=tree.maps.find(m=>m.id===mapId);
 if(!map)throw Error("Wuling official map ID unavailable");
 const officialLevels=new Set(map.levels.map(l=>l.id));
 const rows=list.marks.filter(mark=>mark.templateId===templateId);
 if(rows.length!==27)throw Error("Gear Template Crate count changed; review official map before updating: "+rows.length);
 const sorted=rows.sort((a,b)=>String(a.id).localeCompare(String(b.id)));
 const result=[];
 for(const mark of sorted){
  if(!/^[a-f0-9]{32}$/.test(String(mark.id)))throw Error("Unexpected marker ID");
  if(!officialLevels.has(mark.levelId))throw Error("Unrecognized official level "+mark.levelId);
  const area=byLevel.get(mark.levelId);
  if(!area||area.regionId!=="wuling")throw Error("Map level lacks official registry area: "+mark.levelId);
  if(!mark.pos || !["x","y","z"].every(axis=>Number.isFinite(mark.pos[axis])))
    throw Error("Invalid official map coordinates "+mark.id);
  const url="https://zonai.skport.com/web/v1/game/endfield/map/mark/info?mapId=map02&markId="+mark.id;
  const details=await page.evaluate(async uri=>{
    const response=await fetch(uri,{credentials:"omit",headers:{"sk-language":"en"}});
    if(!response.ok)throw Error("Map info HTTP "+response.status);
    const data=await response.json();
    if(data?.code!==0||!data.data?.info)throw Error("Official map marker info is missing");
    const info=data.data.info;
    return {id:info.id,templateId:info.templateId,mapId:info.mapId,
      levelId:info.levelId,wikiItemId:String(info.wikiItemId??"0"),
      desc:String(info.desc??"").slice(0,1000),link:String(info.link??"").slice(0,300)};
  },url);
  if(details.id!==mark.id || details.mapId!==mapId ||
     details.levelId!==mark.levelId || details.templateId!==templateId)
    throw Error("Map marker metadata mismatch for "+mark.id);
  // A generic Wiki item ref or unstructured desc is NOT a verified list
  // of the gear items contained inside the crate.
  result.push({markerId:mark.id,areaId:area.id,officialMapLevelId:mark.levelId,
    position:{x:mark.pos.x,y:mark.pos.y,z:mark.pos.z},
    officialWikiItemId:details.wikiItemId==="0"?null:details.wikiItemId,
    publicDescription:details.desc||null,
    containedGearIds:[],contentsVerification:"not-verified"});
 }
 const snapshot={schemaVersion:1,source:{provider:"SKPORT Map Tools",url:"https://game.skport.com/map/endfield",
   endpoint:"/web/v1/game/endfield/map/mark/list",mapId,
   language:"en",snapshot:"2026-10-15"},
  template:{id:templateId,name:"Gear Template Crate"},markers:result,
  caution:"Exact crate positions and map levels are official; gear recipes contained inside them and their mission unlock requirements are not yet verified."};
 await mkdir(dirname(path),{recursive:true});
 await writeFile(path,JSON.stringify(snapshot,null,2)+"\n");
 const areaCounts={};
 for(const item of result)areaCounts[item.areaId]=(areaCounts[item.areaId]||0)+1;
 console.log("OFFICIAL_CRATE_IMPORT",JSON.stringify({count:result.length,areaCounts,
  withText:result.filter(x=>x.publicDescription).length,
  withWikiItemId:result.filter(x=>x.officialWikiItemId).length,
  bytes:JSON.stringify(snapshot).length}));
}finally{await browser.close()}
