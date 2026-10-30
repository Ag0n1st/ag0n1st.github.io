/** Normalize only PUBLIC SKPORT Wiki equipment widgets; no guide recommendations. */
import { extractDocument } from "./skport-extract.mjs";
const str=value=>String(value??"").trim();
const validId=value=>/^\d+$/.test(str(value));
const assert=(ok,msg)=>{if(!ok)throw Error("SKPORT equipment: "+msg);};
const headings=d=>(d?.chapterGroup??[]).flatMap(g=>g.widgets??[]);
const rowTable=t=>({columns:t.rows[0]?.cells??[],
  rows:t.rows.slice(1).map(r=>({cells:r.cells.map(c=>str(c).slice(0,10000)),
    costs:r.entries?.flatMap(cell=>cell.filter(x=>validId(x.id)&&Number(x.count)>0)
      .map(x=>({id:str(x.id),count:Number(x.count)})))??[]}))});
function tables(doc,title){
  const defs=headings(doc).filter(w=>str(w.title).replace(/^\/\//,"").toLowerCase()===title.toLowerCase());
  if(!defs.length)return [];
  assert(defs.length===1,"ambiguous widget "+title);
  const widget=doc.widgetCommonMap?.[defs[0].id];
  assert(widget,"missing data for "+title);
  return Object.entries(widget.tabDataMap??{}).map(([tab,entry])=>{
    const ref=str(entry?.content);
    assert(ref&&doc.documentMap?.[ref],"missing tab document "+title+"/"+tab);
    const s=extractDocument(ref,doc.documentMap[ref]).sections;
    return {tab,introName:str(entry?.intro?.name),
      tables:s.filter(x=>x.kind==="table").map(x=>rowTable(x.table)),
      texts:s.filter(x=>x.kind==="text").map(x=>str(x.text).slice(0,6000))};
  });
}
function tag(item,id){
  const selected=str(item.brief?.subTypeList?.find(x=>str(x.subTypeId)===id)?.value);
  const group=item.subType?.filterTagTree?.find(x=>str(x.id)===id);
  return group?.children?.find(x=>str(x.id)===selected)?.name??null;
}
function gearEffect(doc){
  const defs=headings(doc).filter(w=>/gear pack/i.test(w.title));
  if(!defs.length)return null;
  assert(defs.length===1,"ambiguous gear pack");
  const ref=str(doc.widgetCommonMap?.[defs[0].id]?.tabDataMap?.default?.intro?.description);
  if(!ref)return null;
  assert(doc.documentMap?.[ref],"gear set effect reference missing");
  return extractDocument(ref,doc.documentMap[ref]).sections
    .filter(x=>x.kind==="text").map(x=>str(x.text)).filter(Boolean).join("\n\n")||null;
}
/**
 * Find official default crafting materials in the rendered Source widget text.
 * This is intentionally conservative: invalid names/quantities remain unavailable.
 */

/**
 * Official Source widgets embed numeric material IDs and quantities directly.
 * Read that data before falling back to rendered text; linked item names may
 * appear late or be absent in the browser's innerText.
 */
export function structuredStandardRecipe(doc,catalog){
  const source=headings(doc).filter(w=>str(w.title).replace(/^\\/\\//,"").toLowerCase()==="source");
  if(source.length!==1)return null;
  const tabs=doc.widgetCommonMap?.[source[0].id]?.tabDataMap??{};
  const references=[...new Set(Object.values(tabs).map(t=>str(t?.content)).filter(Boolean))];
  if(references.length!==1)return null;
  const sourceDoc=doc.documentMap?.[references[0]]?.document??doc.documentMap?.[references[0]];
  const candidates=Object.values(sourceDoc?.blockMap??{}).map(block=>block?.text?.inlineElements)
    .filter(Array.isArray).filter(elements=>elements.some(el=>
      str(el?.text?.text??el?.text)==="Each gear piece costs"));
  if(candidates.length!==1)return null;
  const entries=candidates[0].filter(el=>el?.kind==="entry"&&el.entry).map(el=>el.entry);
  if(entries.length<2||entries.length>8)return null;
  const allowed=new Set(catalog.map(row=>str(row.id)));
  const materials=[];
  for(const entry of entries){
    const id=str(entry.id??entry.itemId),count=Number(entry.count);
    if(!validId(id)||!allowed.has(id)||!Number.isSafeInteger(count)||count<=0||
        materials.some(x=>x.id===id))return null;
    materials.push({id,count});
  }
  return {id:"official-standard",materials,source:"SKPORT Wiki / Source"};
}

export function standardRecipe(sourcePanel,catalog){
  const lines=str(sourcePanel).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const at=lines.indexOf("Each gear piece costs");
  if(at<0)return null;
  const lookup=new Map(catalog.map(x=>[x.name,x.id]));
  const materials=[];
  for(let i=at+1;i+1<lines.length;){
    if(lines[i]==="and"||lines[i]===","){i++;continue;}
    if(lines[i].startsWith("//")||lines[i].startsWith("*Gear ")||
       lines[i].startsWith("Gear Template"))break;
    const name=lines[i],n=lines[i+1];
    if(!/^\*[0-9][0-9,.\s]*$/.test(n??""))break;
    const count=Number(n.slice(1).replace(/[,.\s]/g,""));
    const id=lookup.get(name);
    if(!validId(id)||!Number.isSafeInteger(count)||count<=0)return null;
    if(materials.some(m=>m.id===id))return null;
    materials.push({id,count});
    i+=2;
  }
  if(materials.length<2)return null;
  return {id:"official-standard",materials,source:"SKPORT Wiki / Source"};
}
/** Only literal publicly displayed blueprint acquisition notes; no inferred unlocks. */
export function officialBlueprintAcquisition(sourcePanel){
  const lines=String(sourcePanel??"").split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  const index=lines.findIndex(x=>x==="Gear Template Acquisition Method:");
  if(index<0)return [];
  const out=[];
  for(const value of lines.slice(index+1, index+9)){
    if(value.startsWith("//")||value.startsWith("Gear Artificing")||value.startsWith("Entry Contributors"))break;
    if(value.length<=240)out.push(value);
  }
  return out;
}
export function extractRenderedGearSource(body){
  if(typeof body!=="string")return "";
  const start=body.indexOf("//Source");
  const end=body.indexOf("//Stats",start+1);
  return start>=0&&end>start?body.slice(start,end):"";
}
export function normalizeEquipment(item,expected,stamp,{sourcePanel="",catalog=[]}={}){
  assert(item&&validId(item.itemId)&&str(item.itemId)===str(expected.id),"unexpected item ID");
  assert(str(item.name)===expected.name,"item name mismatch "+expected.id);
  assert(item.document&&typeof item.document==="object","missing wiki document");
  assert(["Weapons","Gear"].includes(expected.category),"unsupported type");
  assert(/^\d{4}-\d{2}-\d{2}$/.test(stamp),"invalid snapshot date");
  const doc=item.document;
  const common={id:str(item.itemId),name:str(item.name),category:expected.category,
    iconPath:expected.iconPath??null,source:{provider:"SKPORT Wiki",itemId:str(item.itemId),language:str(item.lang),snapshot:stamp},
    rarity:tag(item,"10000")};
  if(expected.category==="Weapons"){
    const attributes=tables(doc,"Attribute Preview");
    const tuning=tables(doc,"Tuning");
    const details=tables(doc,"Skill Details & Essence");
    const potentials=tables(doc,"Potential Phases");
    const complete=attributes.some(a=>a.tables.length)&&details.some(a=>a.tables.length);
    return {...common,kind:"weapon",weaponType:tag(item,"10207"),
      status:complete?"verified":"incomplete",
      attributes,tuning,details,potentials};
  }
  const stats=tables(doc,"Stats"),artificing=tables(doc,"Artificing");
  const bonus=gearEffect(doc);
  const standard=structuredStandardRecipe(doc,catalog)??standardRecipe(sourcePanel,catalog);
  const costHeading=sourcePanel.includes("Each gear piece costs");
  const recipeStatus=standard?"verified":costHeading?"needs-review":"not-listed";
  const complete=stats.some(t=>t.tables.length); // Artificing is absent on earlier low-rarity gear.
  const statsRow=stats.flatMap(t=>t.tables.flatMap(table=>table.rows))
    .find(row=>str(row.cells[0]).toLowerCase()==="level");
  const level=Number(statsRow?.cells?.[1] ?? (stats.flatMap(t=>t.tables).find(table=>str(table.columns?.[0]).toLowerCase()==="level")?.columns?.[1]));
  return {...common,kind:"gear",gearSlot:tag(item,"10243"),setName:tag(item,"10288"),
    level:Number.isFinite(level)&&level>0?level:null,status:complete?"verified":"incomplete",
    artificingStatus:artificing.some(t=>t.tables.length)?"available":"not-listed",
    stats,artificing,setEffect:bonus,standardRecipe:standard,
    recipeStatus,acquisitionNotes:officialBlueprintAcquisition(sourcePanel)};
}
