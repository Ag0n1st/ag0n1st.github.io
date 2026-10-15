/**
 * Diagnose publicly accessible SKPORT Endfield wiki categories for weapons/gear.
 * All calls run inside a fresh, unsigned-in Chrome session.
 * Only metadata from /web/v1/wiki/item/catalog|list|info may be inspected.
 * Nothing is written to tracked files or to the published website.
 */
import { chromium } from "playwright-core";
import { extractDocument } from "./skport-extract.mjs";

const allow = /^\/web\/v1\/wiki\/item\/(catalog|list|info)$/;
const observed = [];
const captures = [];
const browser = await chromium.launch({
  channel: "chrome", headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"]
});
const context = await browser.newContext({locale:"en-US", viewport:{width:1280,height:900}});
const page = await context.newPage();
page.on("response", async response => {
  try {
    const u = new URL(response.url());
    if(u.hostname!=="zonai.skport.com" || !allow.test(u.pathname)) return;
    const status=response.status();
    const payload=await response.json().catch(()=>null);
    const ok = status===200 && payload?.code===0 && payload?.data;
    const row={
      endpoint:u.pathname.split("/").at(-1), status,
      query:Object.fromEntries(u.searchParams),
      code:payload?.code??null,
      dataKeys:ok?Object.keys(payload.data).slice(0,25):[],
      itemCount:ok&&payload.data.items?Object.keys(payload.data.items).length:null
    };
    observed.push(row);
    if(ok) captures.push({row,data:payload.data});
  } catch (error) { console.log("PUBLIC_RESPONSE_PARSE_ERROR",String(error).slice(0,160)); }
});

async function visit(url,label) {
  try {
    const res=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
    await page.waitForTimeout(4500);
    console.log("VISIT",JSON.stringify({label,status:res?.status(),url:page.url(),title:await page.title()}));
    const visible=(await page.locator("body").innerText().catch(()=>""))
      .split("\n").map(s=>s.trim()).filter(Boolean);
    console.log("VISIBLE_NAVIGATION",JSON.stringify(visible.slice(0,75).map(s=>s.slice(0,90))));
    const links=await page.locator("a[href]").evaluateAll(nodes=>nodes
      .map(el=>({text:(el.textContent||"").trim().slice(0,70),href:el.getAttribute("href")||""}))
      .filter(x=>/catalog|weapon|gear|equipment|waffe|ausrüst|operator|character/i.test(x.href+" "+x.text))
      .slice(0,60)).catch(()=>[]);
    console.log("LINKS",JSON.stringify(links));
  } catch (error) {console.log("VISIT_FAILURE",label,String(error).slice(0,320));}
}
function discoverCategories(root) {
  const seen=new WeakSet(), out=[];
  function scan(value,trail="",depth=0) {
    if(!value||typeof value!=="object"||depth>8||out.length>160||seen.has(value))return;
    seen.add(value);
    if(!Array.isArray(value)) {
      const name=Object.entries(value).find(([k,v])=>/^(name|title|label|typeName|typeMainName|typeSubName)$/i.test(k)&&typeof v==="string")?.[1];
      if(name) {
        const keys=Object.keys(value);
        const ids=Object.fromEntries(Object.entries(value).filter(([k,v])=>/id/i.test(k)&&["string","number"].includes(typeof v)).slice(0,7));
        out.push({path:trail,name:String(name).slice(0,80),ids,keys:keys.slice(0,12)});
      }
      for(const [k,v] of Object.entries(value))
        if(!/(token|cookie|login|password|auth|secret|credential|profile)/i.test(k))scan(v,trail+"/"+k,depth+1);
    }else value.slice(0,140).forEach((v,i)=>scan(v,trail+"/"+i,depth+1));
  }
  scan(root);
  return out;
}
try {
  await visit("https://wiki.skport.com/endfield","home");
  await visit("https://wiki.skport.com/endfield/catalog?typeMainId=1&typeSubId=1","operator-reference");
  for(const label of ["Weapons","Weapon","Equipment","Gear","Gears"]) {
    const matches=page.getByText(label,{exact:true});
    const total=await matches.count().catch(()=>0);
    console.log("CATEGORY_TEXT",JSON.stringify({label,count:total}));
    if(total>0) {
      try {
        await matches.first().click({timeout:5000});
        await page.waitForTimeout(3500);
        console.log("AFTER_CLICK",JSON.stringify({label,url:page.url()}));
      } catch(error) { console.log("CLICK_FAILURE",label,String(error).slice(0,150)); }
    }
  }

  // Discover live item IDs from the official public catalogue, never guessed IDs.
  const catalogue = captures.filter(x=>x.row.endpoint==="catalog");
  const pick = subId => catalogue.flatMap(c => c.data.catalog??[])
    .flatMap(g => g.typeSub??[]).find(group => String(group.id)===String(subId) && (group.items?.length??0)>0);
  const requested=[
    {type:"weapon",subId:"2",group:pick(2)},
    {type:"gear",subId:"4",group:pick(4)}
  ];
  for(const type of requested) {
    const items=type.group?.items??[];
    console.log("CATEGORY_SUMMARY",JSON.stringify({
      type:type.type,subId:type.subId,count:items.length,
      filters:(type.group?.filterTagTree??[]).map(tag=>({label:tag.name,id:tag.id,values:(tag.children??[]).map(c=>c.name).slice(0,15)})),
      names:items.slice(0,12).map(item=>({id:item.itemId,name:item.name}))
    }));
    if(!items.length) { console.log("NO_PUBLIC_ITEMS",type.type); process.exitCode=3; continue; }
    const preferred=type.type==="weapon"
      ? items.find(item=>item.name==="Bedazzling Night Debut") : null;
    const unique = [...new Map([items[0],preferred,items[Math.floor(items.length/2)]]
      .filter(Boolean).map(item=>[String(item.itemId),item])).values()].slice(0,3);
    for(const record of unique) {
      const id=String(record.itemId);
      if(!/^\d+$/.test(id)) continue;
      const url=new URL("https://wiki.skport.com/endfield/detail");
      url.searchParams.set("mainTypeId","1");
      url.searchParams.set("subTypeId",type.subId);
      url.searchParams.set("gameEntryId",id);
      await visit(url.toString(),type.type+"-"+id);
      const found=captures.filter(x=>x.row.endpoint==="info" &&
        String(x.data.item?.itemId)===id && x.data.item?.document);
      if(!found.length) {console.log("NO_PUBLIC_ITEM_DETAIL",type.type,id,record.name);process.exitCode=4;continue;}
      const item=found.at(-1).data.item;
      const doc=item.document;
      if(type.type==="gear") {
        const allDocuments=Object.entries(doc.documentMap??{}).map(([key,data])=>{
          try {
            const extracted=extractDocument(key,data).sections;
            return {key,
              tables:extracted.filter(x=>x.kind==="table").map(x=>x.table.rows.map(r=>r.cells).slice(0,10)),
              text:extracted.filter(x=>x.kind==="text").map(x=>x.text).join(" ").slice(0,1300)};
          } catch(error){return {key,error:String(error).slice(0,130)};}
        });
        const matched=allDocuments.filter(d=>/component|stock bill|gear assembl|craft|recipe|production|gear template|parts|piece set effect|obtain/i.test(JSON.stringify(d)));
        const source=(doc.chapterGroup??[]).flatMap(g=>g.widgets??[]).find(w=>/source/i.test(w.title));
        const src=source&&doc.widgetCommonMap?.[source.id];
        const text=await page.locator("body").innerText().catch(()=>"");
        const materialEls=await Promise.all(["Xiranite Component","Wuling Stock Bill","Gear Assembly"].map(async term=>{
          try{
            const loc=page.getByText(term,{exact:false}).first();
            if(!await loc.count())return {term,found:false};
            return loc.evaluate(el=>({term,found:true,html:el.parentElement?.parentElement?.outerHTML.slice(0,2300)}));
          }catch(error){return {term,error:String(error).slice(0,150)};}
        }));
        console.log("CRAFTING_DOM",JSON.stringify({gear:item.name,id,materialEls}).slice(0,7800));
        console.log("RECIPE_DIAGNOSTIC",JSON.stringify({
          id,item:item.name,
          brief:item.brief,
          itemTypeKeys:Object.keys(item),
          docCount:allDocuments.length,
          matchedDocuments:matched.slice(0,18),
          sourceIntro:src?.tabDataMap?.default?.intro,
          sourceDetails:src?.tableList,
          sourceWidget:src,
          networkEndpoints:observed.slice(-15),
          visibleSourceBlock:(()=>{
            const i=text.indexOf("//Source");
            return i>=0?text.slice(i,i+1350):"Source heading missing";
          })(),
          pageMentions:(text.match(/.{0,90}(?:craft|recipe|stock bill|component|manufactur|source|assembly).{0,150}/gi)??[]).slice(0,12)
        }).slice(0,12000));
      }
      const widgets=(doc.chapterGroup??[]).flatMap(g=>g.widgets??[]).map(w=>{
        const common=doc.widgetCommonMap?.[w.id];
        const tabs=Object.entries(common?.tabDataMap??{}).map(([key,value])=>{
          const ref=String(value?.content??"");
          const data=doc.documentMap?.[ref];
          let sections=[];
          if(data) {
            try {
              sections=extractDocument(ref,data).sections.map(section=>
                section.kind==="table"
                  ? {kind:"table",rows:section.table.rows.length,cols:section.table.rows[0]?.cells.length,
                     header:section.table.rows[0]?.cells.slice(0,7),
                     example:section.table.rows[1]?.cells.slice(0,5)}
                  : {kind:section.kind,text:String(section.text??"").slice(0,200)}
              );
            } catch(error) { sections=[{error:String(error).slice(0,160)}]; }
          }
          return {key,ref,sections};
        });
        return {
          title:w.title,id:w.id,widgetKeys:common?Object.keys(common):[],
          tableRows:(common?.tableList??[]).slice(0,7).map(row=>({label:row.label,value:String(row.value??"").slice(0,130)})),
          tabs:tabs.slice(0,10)
        };
      });

      if(type.type==="gear") {
        const pack=(doc.chapterGroup??[]).flatMap(g=>g.widgets??[]).find(w=>/gear pack/i.test(w.title));
        const common=pack&&doc.widgetCommonMap?.[pack.id];
        const targets=Object.values(common?.tabDataMap??{}).map(tab=>String(tab?.content??"")).filter(Boolean);
        console.log("GEAR_SET_DIAGNOSTIC",JSON.stringify({
          item:item.name,id,
          extraInfo:doc.extraInfo,
          packWidget:pack,
          packData:common,
          packDocuments:targets.map(key=>({key,record:doc.documentMap?.[key]})),
          setBonusDescription:(()=>{
            const id=String(common?.tabDataMap?.default?.intro?.description??"");
            if(!id||!doc.documentMap?.[id])return {id,error:"Referenced description unavailable"};
            try{
              return {id,sections:extractDocument(id,doc.documentMap[id]).sections.map(section=>
                section.kind==="table"
                  ? {kind:"table",rows:section.table.rows.map(r=>r.cells).slice(0,10)}
                  : {kind:section.kind,text:String(section.text??"").slice(0,1800)}
              )};
            }catch(err){return {id,error:String(err).slice(0,200)};}
          })()
        }).slice(0,13500));
      }
      if(type.type==="weapon" || type.type==="gear") {
        const detailWidgets=(doc.chapterGroup??[]).flatMap(g=>g.widgets??[]);
        for(const w of detailWidgets) {
          if(!/stats|skill details|potential phases|gear pack|artificing|tuning|source/i.test(w.title))continue;
          const common=doc.widgetCommonMap?.[w.id];
          const selected=Object.entries(common?.tabDataMap??{}).slice(0,2);
          for(const [tabId,v] of selected){
            const key=String(v?.content??"");
            let sections=[];
            if(key&&doc.documentMap?.[key]) {
              try {sections=extractDocument(key,doc.documentMap[key]).sections.map(section=>
                section.kind==="table"
                  ? {kind:"table",rows:section.table.rows.map(row=>row.cells.slice(0,9)).slice(0,14)}
                  : {kind:section.kind,text:String(section.text??"").slice(0,700)}
              );} catch(err){sections=[{error:String(err).slice(0,150)}]}
            }
            console.log("WIDGET_ROWS",JSON.stringify({type:type.type,id,title:w.title,tabId,tabIntro:v?.intro,sections}).slice(0,6500));
          }
        }
      }
      console.log("OFFICIAL_DETAIL",JSON.stringify({
        category:type.type,id,name:item.name,lang:item.lang,
        itemKeys:Object.keys(item),documentKeys:Object.keys(doc),briefKeys:Object.keys(item.brief??{}),
        subTypes:item.brief?.subTypeList??[],
        filters:(item.subType?.filterTagTree??[]).map(t=>({id:t.id,name:t.name})),
        widgetCount:widgets.length, widgets:widgets.slice(0,35)
      }).slice(0,17000));
    }
  }
  console.log("PUBLIC_ENDPOINT_SUMMARY",JSON.stringify(observed.slice(0,45)));
  for(const kind of ["catalog","list"]) {
    const arr=captures.filter(x=>x.row.endpoint===kind);
    console.log("CAPTURE_COUNT",kind,arr.length);
    for (const sample of arr.slice(0,3)) {
      console.log("STRUCTURE",JSON.stringify({
        kind,query:sample.row.query,
        keys:Object.keys(sample.data).slice(0,35),
        categories:discoverCategories(sample.data).slice(0,100)
      }));
    }
  }
  const info=captures.filter(x=>x.row.endpoint==="info");
  for(const sample of info.slice(0,6)){
    const item=sample.data.item;
    const doc=item?.document;
    console.log("PUBLIC_ITEM_SAMPLE",JSON.stringify({
      id:item?.itemId,name:item?.name,
      briefKeys:Object.keys(item?.brief??{}).slice(0,20),
      widgetTitles:(doc?.chapterGroup??[]).flatMap(g=>g.widgets??[]).map(w=>w.title).slice(0,32),
      documentKeys:doc?Object.keys(doc):[]
    }));
  }
  if(!observed.some(x=>x.status===200&&x.code===0)) process.exitCode=2;
} catch(error) {
  console.error("SKPORT_PROBE_FAILURE",String(error).slice(0,700));
  process.exitCode=2;
} finally { await browser.close(); }