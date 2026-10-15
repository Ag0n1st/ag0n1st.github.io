import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync,readdirSync,statSync} from "node:fs";
import {join} from "node:path";

const catalog=JSON.parse(readFileSync("src/data/endfield/catalog/items.json","utf8"));
const details=JSON.parse(readFileSync("src/data/endfield/catalog/equipment-details.json","utf8"));
const categoryFolders={
 "Operators":"operators/icons",
 "Weapons":"weapons",
 "Gear":"gear",
 "Item Files":"materials",
 "Valuables Stash":"valuables"
};
const expected={"Operators":35,"Weapons":84,"Gear":258,"Item Files":340,"Valuables Stash":223};
const itemById=new Map(catalog.items.map(item=>[item.id,item]));
test("all 940 official SKPORT IDs resolve to unique local WebPs in their categories",()=>{
 assert.equal(catalog.items.length,940);
 assert.equal(itemById.size,940);
 const counts=Object.fromEntries(Object.keys(expected).map(key=>[key,0]));
 const catalogImages=new Set();
 let borrowedCovers=0;
 for(const item of catalog.items){
   assert.equal(item.categories.length,1,"ambiguous item "+item.id);
   const cat=item.categories[0],folder=categoryFolders[cat];
   assert.ok(folder,"unknown category "+cat);
   counts[cat]++;
   const target="/images/endfield/"+folder+"/"+item.id+".webp";
   const borrowing=item.iconPath!==target&&
     cat==="Operators"&&/^\/images\/endfield\/operators\/[a-z0-9-]+\/cover\.webp$/.test(item.iconPath);
   assert.ok(item.iconPath===target||borrowing,"incorrect item icon path "+item.id);
   if(borrowing)borrowedCovers++;
   assert.ok(existsSync("public"+item.iconPath),"broken asset "+item.iconPath);
   assert.ok(!catalogImages.has(item.iconPath),"duplicate catalog icon path "+item.iconPath);
   catalogImages.add(item.iconPath);
 }
 assert.deepEqual(counts,expected);
 assert.equal(borrowedCovers,2);
 assert.ok(!existsSync("public/images/endfield/items"),
   "old catch-all item directory must not survive");
 for(const [category,folder] of Object.entries(categoryFolders)){
   const expectedFiles=expected[category]-(category==="Operators"?2:0);
   const realFiles=readdirSync("public/images/endfield/"+folder);
   assert.equal(realFiles.length,expectedFiles,category+" unexpected additional files");
   assert.ok(realFiles.every(x=>/^\d+\.webp$/.test(x)),category+" nonnumeric or non-WebP");
 }
});
test("all weapon and gear detail records share the canonical icon path",()=>{
 assert.equal(details.weapons.length,84);
 assert.equal(details.gear.length,258);
 for(const entry of [...details.weapons,...details.gear]){
   const target=itemById.get(entry.id);
   assert.ok(target,"unknown equipment ID "+entry.id);
   assert.equal(entry.iconPath,target.iconPath,"incorrect detail reference for "+entry.id);
 }
});
test("operator art and all 8 skill WebPs use separate per-operator folders",()=>{
 for(const slug of ["liino","typhoeus"]){
   const base="public/images/endfield/operators/"+slug;
   for(const name of ["cover.webp","illustration.webp"]){
     const filepath=join(base,name);
     assert.ok(existsSync(filepath),"missing character artwork "+filepath);
     assert.ok(statSync(filepath).size>100);
   }
   for(const slot of ["basic","battle","combo","ultimate"]){
     const fp=join(base,"skills","skill-"+slot+".webp");
     assert.ok(existsSync(fp),"missing ability image "+fp);
     assert.ok(!existsSync(join(base,"skill-"+slot+".webp")),"old skill path should not remain");
   }
 }
});
