#!/usr/bin/env node
/**
 * ONE-TIME migration: relocate existing WebP assets without changing a
 * single image byte. Rewrite ONLY static paths in the two official snapshots.
 * Afterwards the permanent importers use the same categorized locations.
 *
 * IMPORTANT: rename, never re-download, re-encode, or copy an image.
 * Running against an already-migrated checkout fails instead of touching it.
 */
import {readFileSync,writeFileSync,renameSync,mkdirSync,existsSync,readdirSync,statSync} from "node:fs";
import {dirname,join} from "node:path";
import {createHash} from "node:crypto";

const PREFIX="/images/endfield/";
const OLD=PREFIX+"items/";
const DIRS={
 "Operators":"operators/icons",
 "Weapons":"weapons",
 "Gear":"gear",
 "Item Files":"materials",
 "Valuables Stash":"valuables"
};
const catalogPath="src/data/endfield/catalog/items.json";
const detailsPath="src/data/endfield/catalog/equipment-details.json";
const list=JSON.parse(readFileSync(catalogPath,"utf8"));
const details=JSON.parse(readFileSync(detailsPath,"utf8"));
if(list.items.length!==940||details.weapons.length!==84||details.gear.length!==258)
  throw Error("Unexpected catalog size: abort asset migration");

const hash=file=>createHash("sha256").update(readFileSync(file)).digest("hex");
const beforeImages=new Map();
function recordRename(oldName,newName){
 if(!existsSync(oldName)||existsSync(newName)||!oldName.endsWith(".webp")||!newName.endsWith(".webp"))
   throw Error("Unsafe/ambiguous image rename: "+oldName+" -> "+newName);
 const beforeHash=hash(oldName),size=statSync(oldName).size;
 mkdirSync(dirname(newName),{recursive:true});
 renameSync(oldName,newName);
 if(hash(newName)!==beforeHash||statSync(newName).size!==size)
   throw Error("Image content modified during move: "+newName);
 beforeImages.set(newName,{hash:beforeHash,size});
}
let moved=0,reused=0;
const indexed=new Map();
for(const item of list.items){
 if(!/^\d+$/.test(item.id)||indexed.has(item.id)||item.categories.length!==1)
   throw Error("Unrecognized or duplicate official item "+item.id);
 const folder=DIRS[item.categories[0]];
 if(!folder)throw Error("Unknown category "+item.categories[0]);
 if(item.iconPath===OLD+item.id+".webp"){
   const destination=PREFIX+folder+"/"+item.id+".webp";
   recordRename("public"+item.iconPath,"public"+destination);
   item.iconPath=destination;
   moved++;
 }else if(/^\/images\/endfield\/operators\/[a-z0-9-]+\/cover\.webp$/.test(item.iconPath)){
   if(item.categories[0]!=="Operators"||!existsSync("public"+item.iconPath))
     throw Error("Misclassified existing operator cover "+item.id);
   reused++;
 }else throw Error("Unrecognized icon path for "+item.id+": "+item.iconPath);
 indexed.set(item.id,item);
}
if(moved!==938||reused!==2)throw Error("Expected 938 moved icons and 2 reused operator covers");

// Reuse all original Git blobs for skill artwork as well.
let skillCount=0;
const operatorRoot="public/images/endfield/operators";
for(const slug of readdirSync(operatorRoot)){
 const base=join(operatorRoot,slug);
 if(!statSync(base).isDirectory()||slug==="icons")continue;
 for(const skill of ["basic","battle","combo","ultimate"]){
   const old=join(base,"skill-"+skill+".webp");
   recordRename(old,join(base,"skills","skill-"+skill+".webp"));
   skillCount++;
 }
}
if(skillCount!==8)throw Error("Expected eight existing Liino/Typhoeus skill images");

// Reuse the canonical manifest paths in the weapon + gear detailed records.
let updatedDetails=0;
for(const item of [...details.weapons,...details.gear]){
 const ref=indexed.get(item.id);
 if(!ref||!ref.categories.includes(item.kind==="weapon"?"Weapons":"Gear"))
   throw Error("Unknown detailed item "+item.id);
 if(item.iconPath!==OLD+item.id+".webp")
   throw Error("Unexpected original weapon/gear URL "+item.id);
 item.iconPath=ref.iconPath;
 updatedDetails++;
}
if(updatedDetails!==342)throw Error("Expected 342 updated weapon/gear references");
for(const [filename,content] of [
  [catalogPath,list],[detailsPath,details]
])writeFileSync(filename,JSON.stringify(content,null,2)+"\n");

// No image duplicates or data loss; verify every manifest entry and byte.
for(const item of list.items){
 if(!existsSync("public"+item.iconPath))throw Error("Dangling manifest image: "+item.id);
}
for(const [filename,proof] of beforeImages){
 if(!existsSync(filename)||hash(filename)!==proof.hash||statSync(filename).size!==proof.size)
   throw Error("Nonidentical file after migration: "+filename);
}
const remaining=existsSync("public/images/endfield/items")
 ?readdirSync("public/images/endfield/items"):[]; 
if(remaining.length)throw Error("Old items directory still contains image assets");
console.log("MIGRATION_RESULT",JSON.stringify({
 movedCatalogWebps:moved,reusedExistingOperatorCovers:reused,
 relocatedSkillWebps:skillCount,changedDetailImageReferences:updatedDetails,
 newImageBlobs:0,changedImageBytes:0,movedWebpBytes:[...beforeImages.values()].reduce((n,x)=>n+x.size,0)
}));
