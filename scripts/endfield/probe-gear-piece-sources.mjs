import {chromium} from "playwright-core";
const browser=await chromium.launch({channel:"chrome",headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
try{
 const page=await browser.newPage({locale:"en-US",viewport:{width:1450,height:940}});
 const res=await page.goto("https://endfieldhub.org/database/gears",{waitUntil:"domcontentloaded",timeout:55000});
 await page.waitForTimeout(2000);
 const data=await page.evaluate(()=>{
   const tables=[...document.querySelectorAll("table")];
   return {title:document.title,
     description:(document.body?.innerText||"").slice(0,550),
     tables:tables.map((table,i)=>{
       const headers=[...table.querySelectorAll("thead th")].map(x=>(x.innerText||"").trim());
       const rows=[...table.querySelectorAll("tbody tr")].map(tr=>
         [...tr.querySelectorAll("td")].map(td=>(td.innerText||"").replace(/\s+/g," ").trim())
       ).filter(c=>c.length>1);
       return {i,headers,rowCount:rows.length,rows:rows.slice(0,6),
         withSource:rows.filter(x=>x.some(v=>/Wuling|Jingyu|Purchase|Authority|Template|Gear Pack|Crate/i.test(v))).length,
         tail:rows.slice(-4),
         uniqueSources:[...new Set(rows.map(row=>row.at(-1)))].slice(0,100)};
     })}
 });
 console.log("INDIVIDUAL_GEAR_SITE_PROBE",JSON.stringify({status:res?.status(),url:page.url(),...data}));
}finally{await browser.close()}
