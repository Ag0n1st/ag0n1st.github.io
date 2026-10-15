import fs from "node:fs";
const list=JSON.parse(fs.readFileSync("src/data/endfield/catalog/items.json","utf8"));
const detail=JSON.parse(fs.readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
const tokens=["amethyst","ferrium","cryston","xiran","cuprium","heton","pyrrol"];
const matches=list.items.filter(x=>tokens.some(t=>x.name.toLowerCase().includes(t)));
console.log("COMPONENT_NAMES",JSON.stringify(matches.map(x=>({id:x.id,name:x.name,categories:x.categories,iconPath:x.iconPath}))));
const components=new Map(matches.map(x=>[x.id,x.name]));
const all=new Map(list.items.map(x=>[x.id,x.name]));
const stats=new Map();
for(const gear of detail.gear){
 const mats=gear.standardRecipe?.materials||[];
 for(const m of mats){
  const prev=stats.get(m.id)??{id:m.id,name:all.get(m.id),count:0,levels:{},examples:[]};
  prev.count++;
  prev.levels[String(gear.level)]=(prev.levels[String(gear.level)]||0)+1;
  if(prev.examples.length<4)prev.examples.push({gear:gear.name,level:gear.level,id:gear.id});
  stats.set(m.id,prev);
 }
}
console.log("RECIPE_MATERIALS",JSON.stringify([...stats.values()].sort((a,b)=>b.count-a.count)));
console.log("COVERAGE",JSON.stringify({gear:detail.gear.length,recipes:detail.gear.filter(x=>x.standardRecipe).length,levels:Object.fromEntries([...new Set(detail.gear.map(x=>x.level))].map(l=>[l,detail.gear.filter(g=>g.level===l).length]))}));
