/**
 * Public SKPORT wiki probe for Liino. Runs in a fresh, unsigned-in browser.
 * Captures ONLY /web/v1/wiki/item/{catalog,list,info} JSON responses.
 * Never serializes any login/user/account responses.
 */
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { extractDocument } from "./skport-extract.mjs";

const target="Liino";
const output=resolve("local-data/skport/liino-public-snapshot.json");
const observed=[];
const details=[];
let catalog=[];
let list=[];
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const page=await browser.newPage({viewport:{width:1440,height:900},locale:"en-US"});
page.on("console",msg=>{if(msg.type()==="error")console.log("Browser console error:",msg.text().slice(0,200));});
page.on("response",async response=>{
  try{
    const url=new URL(response.url());
    if(url.hostname!=="zonai.skport.com" || !url.pathname.startsWith("/web/v1/wiki/item/"))return;
    const kind=url.pathname.split("/").at(-1);
    if(!["catalog","list","info"].includes(kind))return;
    const status=response.status();
    const result=await response.json().catch(()=>null);
    observed.push({kind,status,path:url.pathname,id:url.searchParams.get("id"),code:result?.code,hasData:!!result?.data});
    if(status!==200||result?.code!==0)return;
    if(kind==="catalog")catalog.push(result);
    if(kind==="list")list.push(result);
    if(kind==="info" && result?.data?.item)details.push(result);
  }catch(error){console.log("Public response parse error:",String(error).slice(0,100));}
});
function findLiino(item,depth=0){
  if(depth>14||!item)return [];
  if(Array.isArray(item))return item.flatMap(v=>findLiino(v,depth+1)).slice(0,50);
  if(typeof item!=="object")return [];
  let matches=[];
  if(Object.entries(item).some(([k,v])=>typeof v==="string"&&/^(liino|梨诺|梨諾)$/i.test(v.trim()))){
    matches.push({name:item.name??item.title??item.label??"Liino",id:item.itemId??item.gameEntryId??item.id??null,keys:Object.keys(item).slice(0,12)});
  }
  for(const [key,value] of Object.entries(item)){
    if(["token","cookie","cred","salt","authorization"].includes(key.toLowerCase()))continue;
    matches.push(...findLiino(value,depth+1));
  }
  return matches.slice(0,50);
}
const base="https://wiki.skport.com/endfield/catalog?typeMainId=1&typeSubId=1";
try{
  console.log("Opening official public SKPORT operator catalog");
  const pageResult=await page.goto(base,{waitUntil:"domcontentloaded",timeout:45000});
  console.log("Page status:",pageResult?.status(),"title:",await page.title());
  await page.waitForTimeout(6500);
  console.log("Wiki API responses:",JSON.stringify(observed));
  console.log("Catalog Liino matches:",JSON.stringify(catalog.flatMap(findLiino).slice(0,15)));
  const text=page.getByText(target,{exact:true});
  console.log("Exact Liino text count:",await text.count());
  if(await text.count()){
    try{await text.first().click({timeout:10000});await page.waitForTimeout(6000);}
    catch(err){console.log("Liino item click failed:",String(err).slice(0,350));}
  }else{
    // Directly follow only ID actually documented by the PUBLIC catalog response.
    const candidate=catalog.flatMap(findLiino).find(c=>/^\d+$/.test(String(c.id??"")));
    if(candidate){
      console.log("Directly opening official Liino item ID from catalog:",candidate.id);
      await page.goto("https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=1&gameEntryId="+candidate.id,{waitUntil:"domcontentloaded",timeout:45000});
      await page.waitForTimeout(6000);
    }
  }
  console.log("Final URL:",page.url());
  console.log("Wiki responses after detail:",JSON.stringify(observed));
  const publicLiino=details.filter(response=>response.data.item?.name?.toLowerCase()==="liino");
  console.log("Public Liino item captures:",publicLiino.map(x=>({id:x.data.item.itemId,name:x.data.item.name,hasDocument:!!x.data.item.document})));
  if(publicLiino.length===1){
    const item=publicLiino[0].data.item;
    const doc=item.document;
    console.log("Liino chapter widgets:",JSON.stringify((doc.chapterGroup??[]).flatMap(group=>group.widgets??[]).map(w=>({name:w.title,id:w.id}))));
    const talents=(doc.chapterGroup??[]).flatMap(group=>group.widgets??[]).find(w=>/talent nodes/i.test(w.title));
    if(talents){
      const w=doc.widgetCommonMap?.[talents.id];
      for(const [id,tab] of Object.entries(w?.tabDataMap??{})){
        const docId=String(tab?.content??"");
        const sections=doc.documentMap?.[docId] ? extractDocument(docId,doc.documentMap[docId]).sections : [];
        console.log("Liino talent tab:",JSON.stringify({
          id,docId,intro:tab?.intro?.name??null,rawBlockIds:doc.documentMap?.[docId]?.blockIds??[],
          sectionCount:sections.length,
          types:sections.map(x=>x.kind),
          texts:sections.filter(x=>x.kind==="text").map(x=>x.text.slice(0,250)),
          tables:sections.filter(x=>x.kind==="table").map(x=>({rows:x.table.rows.length,columns:x.table.rows[0]?.cells.length}))
        }));
      }
    }

    await mkdir(resolve("local-data/skport"),{recursive:true});
    await writeFile(output,JSON.stringify({code:0,data:{item}},null,2));
    if(list.length)await writeFile(resolve("local-data/skport/public-items-index.json"),JSON.stringify(list.at(-1).data.items,null,2));
    const potentialWidget=(doc.chapterGroup??[]).flatMap(g=>g.widgets??[]).find(w=>/potential phases/i.test(w.title));
    if(potentialWidget){
      const widget=doc.widgetCommonMap?.[potentialWidget.id];
      const ref=widget?.tabDataMap?.default?.content;
      const grids=ref&&doc.documentMap?.[ref] ? extractDocument(ref,doc.documentMap[ref]).sections.filter(t=>t.kind==="table") : [];
      console.log("Liino potential tables diagnostic:",JSON.stringify(grids.map((grid,i)=>({
        i,rows:grid.table.rows.length,
        preview:grid.table.rows.slice(0,6).map(row=>row.cells.map(c=>String(c).slice(0,190)))
      }))));
    }
    console.log("Success: public Liino Wiki response captured safely. Bytes:",JSON.stringify(item).length);
  }else{
    console.log("No unambiguous official Liino Wiki response. The probe did NOT produce game data.");
    process.exitCode=2;
  }
}catch(err){console.error("Public wiki probe failed:",String(err).slice(0,900));process.exitCode=2;}
finally{await browser.close();}
