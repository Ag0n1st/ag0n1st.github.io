import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { extractDocument, selectWikiItem } from "./skport-extract.mjs";

const trim = v => String(v ?? "").trim();
const slug = v => trim(v).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const refs = c => (c ?? []).map(e=>({id:trim(e.id),count:Number(e.count)})).filter(e=>e.id);
function widget(document,title) {
  const w=document.chapterGroup.flatMap(g=>g.widgets)
    .find(w=>w.title.replace(/^\/\//,"").toLowerCase()===title.toLowerCase());
  if(!w) throw Error("Widget missing: "+title);
  return document.widgetCommonMap[w.id];
}
function tabRows(document,id) {
  if(!document.documentMap[id])throw Error("Missing document: "+id);
  const sections=extractDocument(id,document.documentMap[id]).sections;
  return {text:sections.filter(s=>s.kind==="text").map(s=>s.text).filter(Boolean),
    tables:sections.filter(s=>s.kind==="table").map(s=>s.table)};
}
function tabs(w) {
  const titles=new Map(w.tabList.map(t=>[t.tabId,t.title]));
  return Object.entries(w.tabDataMap).map(([id,d])=>({name:titles.get(id),documentId:d.content}));
}
export function extractExtras(publicItemResponse, publicItemIndex, snapshot="unbekannt") {
  const item=selectWikiItem(publicItemResponse);
  const d=item.document;
  const profile=Object.fromEntries(widget(d,"Basic Information").tableList.map(r=>[r.label,r.value]));
  const levelWidget=widget(d,"Level Up");
  const overviewId=tabs(levelWidget).find(t=>t.name==="Overview")?.documentId;
  const levelRows=tabRows(d,overviewId).tables[0].rows;
  if(levelRows.length!==8||levelRows[0].cells.length!==7) throw Error("Bad level grid");
  const levels=levelRows[0].cells.slice(1);
  const attributes={
    levels,
    metrics:levelRows.slice(1,-1).map(r=>({name:r.cells[0],values:r.cells.slice(1)})),
    levelCosts:levels.map((level,i)=>({level,items:refs(levelRows.at(-1).entries[i+1])})),
    mainAttribute:levelRows.find(r=>r.cells[0].includes("(Main)"))?.cells[0].replace(" (Main)",""),
    secondaryAttribute:levelRows.find(r=>r.cells[0].includes("(Secondary)"))?.cells[0].replace(" (Secondary)","")
  };
  const categories=["attribute","combat","combat","ship","ship"];
  const talents=tabs(widget(d,"Talent Nodes")).map((tab,i)=>{
    const doc=tabRows(d,tab.documentId);
    const name=doc.text[0];
    const rows=doc.tables[0].rows;
    const costColumn=rows[0].cells.length-1;
    return {id:slug(name),name,category:categories[i],
      levels:rows.slice(1).map(r=>({
        name:trim(r.cells[0]),effect:trim(r.cells[1]),
        requirements:r.cells.slice(2,costColumn).filter(s=>s&&s!=="-"),
        cost:refs(r.entries[costColumn])
      }))};
  });
  const promotions=tabs(widget(d,"Elite")).map(tab=>{
    const rows=tabRows(d,tab.documentId).tables[0].rows;
    if(rows.length!==2||rows[0].cells.length!==4)throw Error("Bad promotion grid");
    const r=rows[1];
    return {name:r.cells[0],effect:r.cells[1],requirement:r.cells[2],cost:refs(r.entries[3])};
  });
  const potentialId=widget(d,"Potential Phases").tabDataMap.default.content;
  const potentials=tabRows(d,potentialId).tables[0].rows.map((r,i)=>({
    level:i+1,name:r.cells[1].split("\n")[0],effect:trim(r.cells[2])
  }));
  if(talents.length!==5||promotions.length!==7||potentials.length!==5)throw Error("Unexpected operator sections");
  const materialIds=new Set();
  attributes.levelCosts.forEach(l=>l.items.forEach(x=>materialIds.add(x.id)));
  talents.forEach(t=>t.levels.forEach(l=>l.cost.forEach(x=>materialIds.add(x.id))));
  promotions.forEach(p=>p.cost.forEach(x=>materialIds.add(x.id)));
  const materials={};
  for(const id of [...materialIds].sort((a,b)=>Number(a)-Number(b))){
    if(!publicItemIndex[id]?.name)throw Error("Unknown material ID: "+id);
    materials[id]={name:publicItemIndex[id].name};
  }
  return {schemaVersion:1,source:{provider:"SKPORT Wiki",itemId:trim(item.itemId),
    language:trim(item.lang),snapshot,itemListEndpoint:"/web/v1/wiki/item/list"},
    operator:slug(item.name),profile,attributes,talents,promotions,potentials,materials};
}

if(process.argv[1]?.endsWith("skport-extras.mjs")){
  const args=process.argv.slice(2);
  const arg=flag=>args.includes(flag)?args[args.indexOf(flag)+1]:null;
  const input=arg("--input"),items=arg("--items"),out=arg("--out");
  if(!input||!items||!out)throw Error("Usage: node scripts/endfield/skport-extras.mjs --input public-item.json --items public-item-index.json --out output.json [--snapshot YYYY-MM-DD]");
  const result=extractExtras(JSON.parse(await readFile(input,"utf8")),
    JSON.parse(await readFile(items,"utf8")),arg("--snapshot")??"unbekannt");
  await mkdir(dirname(resolve(out)),{recursive:true});
  await writeFile(out,JSON.stringify(result,null,2)+"\n");
  console.log("Saved public operator data to",out);
}
