const r=await fetch("https://r.jina.ai/https://endfieldhub.org/database/gears",{signal:AbortSignal.timeout(40000)});
if(!r.ok)throw Error("Jina public text HTTP "+r.status);
const body=await r.text();
const lines=body.split(/\r?\n/);
const candidate=lines.filter(line=>/^!\[Image \d+:\s/.test(line));
const parsed=[],bad=[];
for(const line of candidate){
 const m=/^!\[Image \d+:\s*([^\]]+)\]\([^)]+\)(.+?)\s+(Armor|Gloves|Kit)[★☆]/.exec(line);
 const v=/\bv(\d+\.\d+)\s*(.*)$/.exec(line);
 if(!m||!v){bad.push(line.slice(0,350));continue;}
 parsed.push({name:m[2].trim(),imageAlt:m[1],type:m[3],version:v[1],source:v[2].trim()});
}
const bySource={};for(const x of parsed)bySource[x.source]=(bySource[x.source]||0)+1;
console.log("HUB_GEAR_FORMAT_AUDIT",JSON.stringify({http:r.status,bytes:body.length,lineCount:lines.length,
 candidate:candidate.length,parsed:parsed.length,bad:bad.slice(0,15),
 sources:Object.entries(bySource).sort((a,b)=>b[1]-a[1]),examples:parsed.slice(0,10),
 tail:parsed.slice(-8)}));
