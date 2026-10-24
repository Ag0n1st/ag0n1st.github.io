#!/usr/bin/env node
// Structural diagnostic of official PUBLIC SKPORT wiki widgets only.
// Never emit raw documents, descriptions, cookies, request headers, or private data.
import {extractDocument} from "./skport-extract.mjs";
const items=[["Endministrator","2"],["Yvonne","14"],["Arcane","1040"]];
const {chromium}=await import("playwright");
const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
 const page=await browser.newPage({locale:"en-US"});
 let current=null,info=null;
 page.on("response",async response=>{
  try{
   const u=new URL(response.url());
   if(u.hostname!=="zonai.skport.com"||u.pathname!=="/web/v1/wiki/item/info"||
      u.searchParams.get("id")!==current||response.status()!==200)return;
   const j=await response.json();
   if(j?.code===0&&String(j.data?.item?.itemId)===current&&j.data.item.document)info=j.data.item;
  }catch{}
 });
 const report=[];
 for(const [name,id] of items){
  current=id;info=null;
  const url="https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=1&gameEntryId="+id;
  try{await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});await page.waitForTimeout(5000)}
  catch(e){report.push({name,status:"navigation-error",error:String(e.message).slice(0,120)});continue}
  if(!info){report.push({name,status:"no-public-item/info"});continue}
  const doc=info.document,widgets=(doc.chapterGroup??[]).flatMap(x=>x.widgets??[]);
  const section=nameContains=>{
   const def=widgets.find(x=>String(x.title).replace(/^\/\//,"").toLowerCase()===nameContains.toLowerCase());
   return doc.widgetCommonMap?.[def?.id];
  };
  const combat=section("Combat Skills"),pot=section("Potential Phases");
  const getTables=id=>doc.documentMap?.[id]
   ? extractDocument(id,doc.documentMap[id]).sections.filter(x=>x.kind==="table").map(x=>x.table)
   : [];
  const combats=Object.entries(combat?.tabDataMap??{}).filter(([key])=>key!=="default").map(([key,tab])=>{
   const tables=getTables(tab.content),ranks=tables[0]?.rows[0]?.cells?.slice(1)??[];
   return {tabId:key,type:tab.intro?.type,name:String(tab.intro?.name??"").slice(0,100),
    ranks:ranks.length,firstRank:ranks[0],lastRank:ranks.at(-1),allTables:tables.map(t=>({rows:t.rows.length,cols:t.rows[0]?.cells.length}))};
  });
  const allPot=getTables(pot?.tabDataMap?.default?.content);
  report.push({name,id,combat:combats,potentialTables:allPot.map(t=>({
   rows:t.rows.length,columns:t.rows[0]?.cells.length,
   sample:t.rows.slice(0,7).map(row=>row.cells.slice(0,3).map(x=>String(x).slice(0,115)))
  }))});
 }
 console.log("SKPORT_SPECIAL_WIDGET_AUDIT",JSON.stringify(report));
}finally{await browser.close()}
