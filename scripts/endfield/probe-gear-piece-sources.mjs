const url="https://r.jina.ai/https://endfield.wiki.gg/wiki/Gear";
const r=await fetch(url,{signal:AbortSignal.timeout(45000)});
if(!r.ok)throw Error("Wiki mirror "+r.status);
const text=await r.text();
for(const key of ["## Gear Template Crate","Gear Template Crate\n","Gears  | Location"]){
 const i=text.indexOf(key);
 console.log("WIKI_SECTION",JSON.stringify({key,index:i,sample:i>=0?text.slice(i,i+1800):""}));
}
const lines=text.split(/\r?\n/);
const crateLines=lines.filter(line=>
  /^\|.*(?:Jingyu Valley|Wuling City|Qingbo Stockade|Marker Stone|Sword Vault Dale|Yinglung Pass|Snowy Forest|Si.s Painting)/i.test(line)||
  /Jingyu Valley\s*\|\s*Stragglers/.test(line)
);
for(const line of crateLines.slice(0,33)){
 const images=[...line.matchAll(/!\[Image\s+\d+:\s*([^\]]+)\]/g)].map(x=>x[1]);
 const names=[...line.matchAll(/\]\(https:\/\/endfield\.wiki\.gg\/wiki\/([^)]+)\)/g)].map(x=>decodeURIComponent(x[1]).replaceAll("_"," "));
 console.log("WIKI_CRATE_ROW",JSON.stringify({line:line.slice(0,1500),images:images.slice(0,35),names:names.slice(0,35),imageCount:images.length}));
}
