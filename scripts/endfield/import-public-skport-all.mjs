#!/usr/bin/env node
/**
 * Anonymous, source-validated SKPORT bulk import. No login or signed-request
 * reconstruction. Only game data from verified public item/info responses.
 * Cached images: only static.skport.com/image, optimized WebP within limits.
 */
import {readFile,writeFile,mkdir,access} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import {pathToFileURL} from "node:url";
import {importOperator} from "./import-operator.mjs";
import {expectedInfoResponse,publicIndex} from "./probe-public-operator.mjs";
import roster from "../../src/data/endfield/endfieldle-roster.json" with {type:"json"};
import catalog from "../../src/data/endfield/catalog/items.json" with {type:"json"};

const root="https://wiki.skport.com/endfield";
const day=new Date().toISOString().slice(0,10);
const baseDir="src/data/endfield/operators";
const imageDir="public/images/endfield/operators";
const cap=40;
const msg=error=>String(error?.message??error).replace(/https?:\/\/\S+/g,"[source-url]").slice(0,210);
const exists=async p=>access(resolve(p)).then(()=>true,error=>{if(error.code==="ENOENT")return false;throw error;});
const preview=result=>({
  skillRanks:result.main.skills.map(x=>x.upgradeCosts.length),
  talents:result.extras.talents.length,potentials:result.extras.potentials.length,
  promotions:result.extras.promotions.length,materialNames:Object.keys(result.extras.materials).length
});
export function validateNormalized(op,result){
  if(!result||result.main.operator.id!==op.itemId||result.main.operator.slug!==op.id)
    throw Error("Official itemId / slug mismatch");
  if(result.main.skills.length!==4 || result.main.skills.some(x=>x.upgradeCosts.length!==12))
    throw Error("Incomplete four-skills/12-rank data");
  if(result.extras.potentials.length!==5||result.extras.promotions.length<1||result.extras.talents.length<1)
    throw Error("Incomplete potential/talent/promotion data");
  if(!Object.keys(result.extras.materials).length)
    throw Error("Missing referenced material labels");
  return result;
}
function indexWithCatalogue(liveIndex,publicCatalogue){
  const items=publicIndex(liveIndex);
  for(const section of publicCatalogue){
    for(const type of section?.typeSub??[])
      for(const item of type?.items??[])
        if(/^\d+$/.test(String(item.itemId)) && item.name)
          items[String(item.itemId)]={name:String(item.name)};
  }
  return items;
}
async function optimizedImage(url,kind){
  const u=new URL(url);
  if(u.protocol!=="https:"||u.hostname!=="static.skport.com"||!u.pathname.startsWith("/image/"))
    throw Error("Unexpected official image source");
  const response=await fetch(u,{signal:AbortSignal.timeout(25000)});
  if(!response.ok||!/^image\/(png|jpeg|webp)/i.test(response.headers.get("content-type")??""))
    throw Error("Official CDN did not return a static image "+response.status);
  const source=Buffer.from(await response.arrayBuffer());
  if(source.length<250||source.length>10_000_000)throw Error("Invalid source image size");
  const {default:sharp}=await import("sharp");
  const config=kind==="illustration"?{w:900,h:1125,max:550000}:
    kind==="cover"?{w:420,h:420,max:180000}:{w:200,h:200,max:64000};
  for(const [factor,quality] of [[1,74],[1,63],[.85,54],[.72,44]]){
    const output=await sharp(source).resize({width:Math.floor(config.w*factor),
      height:Math.floor(config.h*factor),fit:"inside",withoutEnlargement:true})
      .webp({quality,effort:5}).toBuffer();
    if(output.length<=config.max)return output;
  }
  throw Error("Official image cannot fit capped WebP budget");
}
async function saveImages(op,result){
  const records=[];
  const assets=[
    ["cover",result.main.operator.coverUrl,"cover.webp"],
    ["illustration",result.main.operator.illustrationUrl,"illustration.webp"],
    ...result.main.skills.map(skill=>["icon",skill.iconUrl,"skills/skill-"+skill.slot+".webp"])
  ];
  for(const [kind,url,relative] of assets){
    if(!url)continue;
    const destination=imageDir+"/"+op.id+"/"+relative;
    if(await exists(destination)){records.push({type:relative,status:"already-cached"});continue}
    try{
      const output=await optimizedImage(url,kind);
      await mkdir(resolve(dirname(destination)),{recursive:true});
      await writeFile(resolve(destination),output,{flag:"wx"});
      records.push({type:relative,status:"saved",bytes:output.length});
    }catch(error){records.push({type:relative,status:"unavailable",reason:msg(error)})}
  }
  return records;
}
async function captureFor(page,op,cache){
  const itemId=op.itemId;
  cache.current=itemId;
  cache.details=[];
  const urlBase=root+"/detail?mainTypeId=1&subTypeId=1&gameEntryId="+itemId;
  for(const url of [urlBase,urlBase+"&header=0"]){
    try{
      await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
      await page.waitForTimeout(3600);
    }catch(error){console.log("SKPORT_PAGE_WARNING",op.id,msg(error))}
    if(cache.details.length)break;
  }
  return cache.details.at(-1)??null;
}
async function main(){
  const {chromium}=await import("playwright");
  const existing=roster.operators.filter(op=>!op.availableFrom||op.availableFrom<=day);
  const targets=[];
  for(const op of existing){
    if(await exists(baseDir+"/"+op.id+".json"))continue;
    targets.push(op);
  }
  if(targets.length>cap)throw Error("Too many public operator targets");
  const browser=await chromium.launch({headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
  const results=[],cache={current:null,details:[],list:null,catalogue:[]};
  try{
    const page=await browser.newPage({locale:"en-US",viewport:{width:1440,height:900}});
    page.on("response",async response=>{
      try{
        const u=new URL(response.url());
        if(u.hostname!=="zonai.skport.com"||response.status()!==200||
          !u.pathname.startsWith("/web/v1/wiki/item/"))return;
        const data=await response.json().catch(()=>null);
        if(data?.code!==0)return;
        if(u.pathname==="/web/v1/wiki/item/list"&&data.data?.items)cache.list=data.data.items;
        if(u.pathname==="/web/v1/wiki/item/catalog"&&Array.isArray(data.data?.catalog))
          cache.catalogue.push(...data.data.catalog.flat(2));
        if(cache.current && expectedInfoResponse(response.url(),response.status(),data,cache.current))
          cache.details.push(data);
      }catch{}
    });
    try{
      await page.goto(root+"/catalog?mainTypeId=1&subTypeId=1",
        {waitUntil:"domcontentloaded",timeout:45000});
      await page.waitForTimeout(4300);
    }catch(error){console.log("SKPORT_CATALOG_WARNING",msg(error))}
    console.log("SKPORT_BULK_BEGIN",JSON.stringify({date:day,targets:targets.length,itemsInLocalCatalogue:catalog.items.length}));
    for(const op of targets){
      try{
        const response=await captureFor(page,op,cache);
        if(!response){results.push({slug:op.id,id:op.itemId,status:"public-response-missing"});continue}
        const parsed=validateNormalized(op,importOperator(
          response,indexWithCatalogue(cache.list,cache.catalogue),
          {itemId:op.itemId,slug:op.id,snapshot:day}));
        const path=baseDir+"/"+op.id;
        await writeFile(resolve(path+".json"),JSON.stringify(parsed.main,null,2)+"\n",{flag:"wx"});
        await writeFile(resolve(path+".extra.json"),JSON.stringify(parsed.extras,null,2)+"\n",{flag:"wx"});
        const images=await saveImages(op,parsed);
        results.push({slug:op.id,id:op.itemId,status:"imported",...preview(parsed),images});
      }catch(error){
        results.push({slug:op.id,id:op.itemId,status:"validation-or-asset-error",reason:msg(error)});
      }
      const last=results.at(-1);
      console.log("SKPORT_BULK_ITEM",JSON.stringify({slug:last.slug,status:last.status,reason:last.reason??null,
        imageFiles:last.images?.filter(x=>x.status==="saved").length??0}));
    }
  }finally{await browser.close()}
  const report={
    schemaVersion:1,provider:"SKPORT Wiki",snapshot:day,
    captureMethod:"anonymous public browser /web/v1/wiki/item/info responses",
    fullImportsBefore:roster.operators.length-targets.length,
    attempted:targets.length,imported:results.filter(x=>x.status==="imported").length,
    results
  };
  const reportPath="src/data/endfield/catalog/operator-public-import-report.json";
  await writeFile(resolve(reportPath),JSON.stringify(report,null,2)+"\n");
  console.log("SKPORT_BULK_RESULT",JSON.stringify({
    attempted:report.attempted,imported:report.imported,
    missing:results.filter(x=>x.status!=="imported").map(x=>({id:x.id,slug:x.slug,status:x.status,reason:x.reason}))}));
  if(!report.imported)process.exitCode=2;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)
  main().catch(e=>{console.error("SKPORT_BULK_ERROR",msg(e));process.exitCode=2});
