#!/usr/bin/env node
/**
 * Generic, offline SKPORT Endfield operator importer.
 *
 * Input MUST be one publicly obtainable item/info response, or a network
 * capture with an explicitly selected public item. Companion --items must be
 * the PUBLIC response.data.items map from wiki/item/list.
 *
 * No network access, cookies, login or external DB. No hard-coded operator
 * name, item ID, skill widget ID or tab/document IDs.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { extractDocument } from "./skport-extract.mjs";

const safeSlug=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const clean=value=>String(value??"").trim();
const object=value=>!!value && typeof value==="object" && !Array.isArray(value);
const costRefs=cells=>(cells??[]).filter(cell=>cell?.id).map(cell=>{
  const id=clean(cell.id),count=Number(cell.count);
  if(!/^\d+$/.test(id)||!Number.isSafeInteger(count)||count<=0)
    throw Error("Ungültige Materialreferenz "+id+":"+String(cell.count));
  return {id,count};
});
function assert(condition,message) {
  if(!condition)throw Error("SKPORT-Daten ungültig: "+message);
}
function selection(raw,itemId) {
  let response=raw;
  if(Array.isArray(raw)){
    const found=raw.filter(record=>{
      try {
        const u=new URL(record.url);
        return record.status===200 && u.pathname.endsWith("/web/v1/wiki/item/info") &&
          u.searchParams.get("id")===itemId;
      }catch{return false;}
    });
    assert(found.length===1,"genau eine öffentliche item/info-Antwort für ID "+itemId+" erwartet");
    response=found[0].response;
  }
  const item=response?.data?.item??response?.item??response;
  assert(object(item) && object(item.document),"document fehlt");
  assert(clean(item.itemId)===itemId,"Item-ID weicht ab");
  return item;
}
function widget(document,title,mandatory=true) {
  const definitions=(document.chapterGroup??[]).flatMap(group=>group.widgets??[]);
  const named=definitions.filter(w=>clean(w.title).replace(/^\/\//,"").toLowerCase()===title.toLowerCase());
  if(!named.length&&!mandatory)return null;
  assert(named.length===1,"Widget "+title+" nicht eindeutig vorhanden");
  const selected=document.widgetCommonMap?.[named[0].id];
  assert(!!selected,"Widget-Daten fehlen: "+title);
  return selected;
}
function tabs(w){
  const definitions=new Map((w?.tabList??[]).map(t=>[t.tabId,t]));
  return Object.entries(w?.tabDataMap??{}).map(([id,value])=>({
    id,title:clean(definitions.get(id)?.title),
    iconUrl:clean(definitions.get(id)?.icon),
    intro:value?.intro??{},
    content:clean(value?.content)
  })).filter(t=>t.id!=="default");
}
function sections(document,id) {
  assert(id&&document.documentMap?.[id],"Dokument fehlt: "+id);
  return extractDocument(id,document.documentMap[id]).sections;
}
function oneTable(document,id,description){
  const found=sections(document,id).filter(s=>s.kind==="table").map(s=>s.table);
  assert(found.length===1,description+" benötigt genau eine Tabelle: "+id);
  return found[0];
}
function description(document,id) {
  return sections(document,id).filter(s=>s.kind==="text").map(s=>s.text).filter(Boolean).join("\n\n");
}
function tagged(item,tagGroupId){
  const id=item.brief?.subTypeList?.find(t=>clean(t.subTypeId)===tagGroupId)?.value;
  const group=item.subType?.filterTagTree?.find(t=>clean(t.id)===tagGroupId);
  return group?.children?.find(c=>clean(c.id)===clean(id))?.name??"";
}
function source(item,itemId,snapshot){
  return {provider:"SKPORT Wiki",itemId,language:clean(item.lang),snapshot};
}
function metricName(label){
  return clean(label).replace(/\s+/g," ");
}
function itemLookup(index,id){
  const found=index?.[id]?.name;
  assert(typeof found==="string" && !!found.trim(),"Itemname für Material-ID "+id+" fehlt");
  return {name:found.trim()};
}
function collectMaterials(main,attributes,talents,promotions,index) {
  const ids=new Set();
  for(const skill of main.skills) for(const level of (skill.upgradeCosts??[]))for(const entry of level.items)ids.add(entry.id);
  for(const level of attributes.levelCosts)for(const item of level.items)ids.add(item.id);
  for(const talent of talents)for(const stage of talent.levels)for(const item of stage.cost)ids.add(item.id);
  for(const promotion of promotions)for(const item of promotion.cost)ids.add(item.id);
  return Object.fromEntries([...ids].sort((a,b)=>Number(a)-Number(b)).map(id=>[id,itemLookup(index,id)]));
}
function simplifyTalentSlug(name) {
  return name.normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

export function importOperator(itemResponse,publicItems,{itemId,slug,snapshot}){
  assert(/^\d+$/.test(itemId),"gültige numerische Item-ID erforderlich");
  assert(safeSlug.test(slug),"Slug darf nur Kleinbuchstaben, Ziffern und Bindestriche enthalten");
  assert(/^\d{4}-\d{2}-\d{2}$/.test(snapshot),"Snapshot-Datum YYYY-MM-DD erforderlich");
  assert(object(publicItems),"öffentliche wiki/item/list-Itemnamen fehlen");
  const item=selection(itemResponse,itemId);
  const document=item.document;
  assert(object(document.documentMap)&&object(document.widgetCommonMap),
    "Wiki-Dokumente oder Widgets fehlen");

  const combat=tabs(widget(document,"Combat Skills"));
  assert(combat.length===4,"vier Skills werden erwartet; erkannt "+combat.length);
  const slotTypes={"basic attack":"basic","battle skill":"battle",
    "combo skill":"combo","ultimate":"ultimate"};
  const skills=[];
  for(const tab of combat){
    const name=clean(tab.intro.name),type=clean(tab.intro.type);
    const slot=slotTypes[type.toLowerCase()];
    assert(!!name&&!!slot,"Skillname oder Typ nicht erkannt: "+name+" / "+type);
    assert(!!tab.intro.description,"Beschreibung fehlt für "+name);
    const ownDescription=description(document,clean(tab.intro.description));
    assert(!!ownDescription,"Leere Beschreibung für "+name);
    const table=oneTable(document,tab.content,name);
    const rows=table.rows;
    const header=rows[0]?.cells??[];
    const ranks=header.slice(1);
    assert(ranks.length===12,"12 Rang-/Mastery-Stufen für "+name+" erwartet");
    assert(rows.every(r=>r.cells.length===header.length),"Defekte Skill-Zeile: "+name);
    const cost=rows.find(row=>metricName(row.cells[0]).toLowerCase()==="cost");
    assert(!!cost,"Upgrade-Kostenzeile fehlt bei "+name);
    const metricRows=rows.slice(1).filter(row=>row!==cost);
    assert(metricRows.length>=1,"Keine Skillwerte gefunden bei "+name);
    const skill={
      slot,name,type,iconUrl:tab.iconUrl,
      description:ownDescription,
      metrics:metricRows.map(row=>[metricName(row.cells[0]),...row.cells.slice(1)]),
      upgradeCosts:ranks.map((rank,i)=>({rank,items:costRefs(cost.entries[i+1])}))
    };
    skills.push(skill);
  }
  assert(new Set(skills.map(s=>s.slot)).size===4,"fehlender oder doppelter Skilltyp");
  const ordered=["basic","battle","combo","ultimate"].map(key=>skills.find(s=>s.slot===key));
  const rankHeaders=oneTable(document,combat[0].content,"Skillränge").rows[0].cells.slice(1);
  assert(ordered.every(s=>s.upgradeCosts.length===12),"unvollständige Skillkosten");
  for(const tab of combat.slice(1)){
    const labels=oneTable(document,tab.content,"Skillränge").rows[0].cells.slice(1);
    assert(JSON.stringify(labels)===JSON.stringify(rankHeaders),"unterschiedliche Rangsätze");
  }
  const main={
    schemaVersion:2,source:source(item,itemId,snapshot),
    operator:{
      id:itemId,slug,name:clean(item.name),
      rarity:Number(tagged(item,"10000").match(/[1-6]/)?.[0]??0),
      element:tagged(item,"10100"),class:tagged(item,"10200"),
      weaponType:tagged(item,"10213"),faction:tagged(item,"10219"),
      coverUrl:clean(item.brief?.cover),
      illustrationUrl:clean(document.extraInfo?.illustration)
    },ranks:rankHeaders,skills:ordered
  };
  assert(main.operator.name&&main.operator.rarity>0,"Operatorname oder Seltenheit fehlen");
  // Other widgets are intentionally parsed by their names; no temporal tab IDs.
  const profileWidget=widget(document,"Basic Information");
  const profile=Object.fromEntries((profileWidget.tableList??[])
    .filter(row=>clean(row.label)).map(row=>[clean(row.label),clean(row.value)]));

  const levelWidget=widget(document,"Level Up");
  const overview=tabs(levelWidget).find(t=>t.title.toLowerCase()==="overview");
  assert(overview,"Levelübersicht fehlt");
  const levels=oneTable(document,overview.content,"Levelübersicht").rows;
  assert(levels.length>=3,"Levelübersicht ist leer");
  const levelHeaders=levels[0].cells.slice(1);
  const body=levels.slice(1);
  const materialRow=body.find(row=>metricName(row.cells[0]).toLowerCase()==="cost");
  assert(!!materialRow,"Levelkosten-Zeile fehlt");
  const metrics=body.filter(row=>row!==materialRow).map(row=>({
    name:clean(row.cells[0]),values:row.cells.slice(1)
  }));
  assert(metrics.every(m=>m.values.length===levelHeaders.length),"Attributspalten fehlerhaft");
  const mainAttr=metrics.find(m=>/\(Main\)/i.test(m.name))?.name.replace(/\s*\(Main\)/i,"");
  const secondaryAttr=metrics.find(m=>/\(Secondary\)/i.test(m.name))?.name.replace(/\s*\(Secondary\)/i,"");
  assert(mainAttr&&secondaryAttr,"Haupt-/Sekundärattribut nicht erkannt");
  const attributes={
    levels:levelHeaders,metrics,
    levelCosts:levelHeaders.map((level,i)=>({level,items:costRefs(materialRow.entries[i+1])})),
    mainAttribute:mainAttr,secondaryAttribute:secondaryAttr
  };

  const talentTabs=tabs(widget(document,"Talent Nodes"));
  const talents=talentTabs.map((tab,i)=>{
    const tree=sections(document,tab.content);
    const name=tree.find(s=>s.kind==="text")?.text;
    // SKPORT may attach a small supplemental metadata table to one talent.
    // Select the unique upgrade table by its labelled columns and preserve
    // supplemental data instead of assuming there can only be one table.
    const grids=tree.filter(section=>section.kind==="table").map(section=>section.table);
    const upgradeCandidates=grids.filter(table=>
      table.rows.length>=2 && table.rows[0]?.cells.length>=4);
    assert(upgradeCandidates.length===1,"Talent benötigt genau eine eindeutige Upgrade-Tabelle: "+tab.content);
    const talentTable=upgradeCandidates[0];
    const supplementalTables=grids.filter(table=>table!==talentTable).map(table=>
      table.rows.map(row=>row.cells));
    const heading=talentTable.rows[0];
    const costCol=heading.cells.length-1;
    assert(costCol>=3,"Talent-Kostenspalte fehlt");
    const stages=talentTable.rows.slice(1).map(row=>({
      name:clean(row.cells[0]),effect:clean(row.cells[1]),
      requirements:row.cells.slice(2,costCol).filter(v=>v&&v!=="-"),
      cost:costRefs(row.entries[costCol])
    }));
    assert(!!name && stages.length>0 && stages.every(stage=>stage.effect),"Talent unvollständig");
    // Known wiki order: attribute, combat, combat, ship, ship.
    // For different talent counts, don't fabricate a category.
    const knownCategories=["attribute","combat","combat","ship","ship"];
    const category=talentTabs.length===5 ? knownCategories[i] : "other";
    return {id:simplifyTalentSlug(name),name,category,levels:stages,
      ...(supplementalTables.length ? {supplementalTables} : {})};
  });
  assert(new Set(talents.map(t=>t.id)).size===talents.length,"Doppelte Talent-ID");

  const promotionTabs=tabs(widget(document,"Elite"));
  const promotions=promotionTabs.map(tab=>{
    const table=oneTable(document,tab.content,"Promotion");
    const row=table.rows[1];
    assert(table.rows.length===2 && row?.cells.length===4,"Promotion-Daten nicht eindeutig");
    return {name:clean(row.cells[0]),effect:clean(row.cells[1]),
      requirement:clean(row.cells[2]),cost:costRefs(row.entries[3])};
  });
  const potentialWidget=widget(document,"Potential Phases");
  const potentialRef=potentialWidget.tabDataMap?.default?.content;
  assert(!!potentialRef,"Potenzial-Tabelle fehlt");
  const potentialTable=oneTable(document,clean(potentialRef),"Potenziale");
  const potentials=potentialTable.rows.map((row,i)=>({
    level:i+1,name:clean(row.cells[1]).split("\n")[0],
    effect:clean(row.cells[2])
  }));
  assert(potentials.length>=1 && potentials.every(p=>p.name&&p.effect),
    "Potenzialnamen/Effekte fehlen");
  const materials=collectMaterials(main,attributes,talents,promotions,publicItems);
  const extras={
    schemaVersion:2,source:source(item,itemId,snapshot),operator:slug,
    profile,attributes,talents,promotions,potentials,materials
  };
  return {main,extras};
}

async function main(){
  const args=process.argv.slice(2);
  const arg=flag=>args.includes(flag)?args[args.indexOf(flag)+1]:undefined;
  const [input,items,id,slug,snapshot,outDir]=[
    arg("--input"),arg("--items"),arg("--id"),arg("--slug"),arg("--snapshot"),arg("--out-dir")
  ];
  if(!input||!items||!id||!slug||!snapshot||!outDir){
    throw Error("Nutzung: node scripts/endfield/import-operator.mjs --input local-data/public-item.json --items local-data/public-items-index.json --id 1173 --slug typhoeus --snapshot YYYY-MM-DD --out-dir src/data/endfield/operators");
  }
  // Parse and validate both datasets IN MEMORY before writing either.
  const data=JSON.parse(await readFile(resolve(input),"utf8"));
  const list=JSON.parse(await readFile(resolve(items),"utf8"));
  const {main,extras}=importOperator(data,list,{itemId:id,slug,snapshot});
  await mkdir(resolve(outDir),{recursive:true});
  for(const [suffix,contents] of [[".json",main],[".extra.json",extras]]){
    const path=join(resolve(outDir),slug+suffix);
    await writeFile(path,JSON.stringify(contents,null,2)+"\n");
    console.log("Exportiert: "+path);
  }
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  main().catch(error=>{console.error(error.message);process.exitCode=1;});
}
