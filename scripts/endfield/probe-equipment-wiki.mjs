/**
 * Diagnose publicly accessible SKPORT Endfield wiki categories for weapons/gear.
 * All calls run inside a fresh, unsigned-in Chrome session.
 * Only metadata from /web/v1/wiki/item/catalog|list|info may be inspected.
 * Nothing is written to tracked files or to the published website.
 */
import { chromium } from "playwright-core";

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