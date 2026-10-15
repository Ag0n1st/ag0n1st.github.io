import fs from "node:fs";
const data=JSON.parse(fs.readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
const groups=new Map(),noNotes=[];
for(const gear of data.gear){
 const notes=gear.acquisitionNotes??[];
 if(!notes.length)noNotes.push({id:gear.id,name:gear.name});
 const key=notes.join(" | ")||"(missing)";
 if(!groups.has(key))groups.set(key,{count:0,examples:[]});
 const entry=groups.get(key);
 entry.count++;
 if(entry.examples.length<12)entry.examples.push({id:gear.id,name:gear.name,level:gear.level});
}
console.log("BLUEPRINT_NOTE_DISTINCT",JSON.stringify({
 gearItems:data.gear.length,
 withNotes:data.gear.length-noNotes.length,
 withoutNotes:noNotes.length,
 uniqueNoteTypes:groups.size,
 groups:[...groups.entries()].map(([note,d])=>({note,count:d.count,examples:d.examples}))
 .sort((a,b)=>b.count-a.count).slice(0,50)
}));
const matches=data.gear.filter(g=>/painting|wuling|valley|missions|quest|explor|yinglung|version|city|story|blueprint|si's|area/i.test((g.acquisitionNotes??[]).join(" | ")));
console.log("MATCHING_BLUEPRINT_NOTES",JSON.stringify(matches.map(g=>({id:g.id,name:g.name,level:g.level,notes:g.acquisitionNotes})).slice(0,70)));
