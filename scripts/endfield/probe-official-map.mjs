/**
 * One-time anonymous official SKPORT Map Tools audit.
 * Only prints safe public category/region metadata; never copies cookies,
 * profile data, or full private headers into logs.
 */
import {chromium} from "playwright-core";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
const responses=[];
const counts=new Map();
const summarize=(obj,depth=0)=>{
  if(depth>2||obj===null)return null;
  if(Array.isArray(obj))return {len:obj.length,examples:obj.slice(0,3).map(x=>summarize(x,depth+1))};
  if(typeof obj==="object"){
    return Object.fromEntries(Object.entries(obj).slice(0,12).map(([k,v])=>[k,summarize(v,depth+1)]));
  }
  return typeof obj==="string"?obj.slice(0,80):obj;
};
try{
 const context=await browser.newContext({locale:"en-US",viewport:{width:1280,height:900}});
 const page=await context.newPage();
 page.on("response",async res=>{
  try {
   const url=new URL(res.url());
   if(!url.hostname.endsWith("skport.com") ||
      (!url.pathname.includes("/web/v1/game/endfield/map/")&&!url.pathname.includes("/map/endfield")))return;
   if(url.pathname.includes("/map/endfield")&&!url.pathname.includes("/web/v1"))return;
   counts.set(url.pathname,(counts.get(url.pathname)??0)+1);
   if(res.status()!==200)return;
   const json=await res.json().catch(()=>null);
   if(json && responses.length<15)responses.push({path:url.pathname,query:url.search,
     code:json.code,data:summarize(json.data)});
  }catch{}
 });
 const result=await page.goto("https://game.skport.com/map/endfield",{waitUntil:"domcontentloaded",timeout:50000});
 await page.waitForTimeout(11000);
 const text=await page.locator("body").innerText().catch(()=>"");
 console.log("OFFICIAL_MAP_BROWSER",JSON.stringify({httpStatus:result?.status(),url:page.url(),
   content:text.slice(0,700),calls:[...counts],responses}));
 // Same origin public APIs, no login or signing; only metadata.
 for(const endpoint of ["tree","catalog"]){
  const uri="https://zonai.skport.com/web/v1/game/endfield/map/"+endpoint;
  const val=await page.evaluate(async url=>{
    try{
      const r=await fetch(url,{credentials:"omit",headers:{"sk-language":"en"}});
      return {status:r.status,body:await r.json().catch(()=>null)};
    }catch(e){return {error:String(e)}}
  },uri);
  console.log("OFFICIAL_MAP_"+endpoint.toUpperCase(),JSON.stringify({
    status:val.status,error:val.error,sample:summarize(val.body?.data)
  }));
 }
}finally{await browser.close();}
