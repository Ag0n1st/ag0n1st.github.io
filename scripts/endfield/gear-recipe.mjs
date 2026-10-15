/**
 * Extract the STANDARD manufacturing recipe from the publicly rendered
 * "Source" section of an official SKPORT Endfield gear detail page.
 *
 * This is deliberately not a parser for alternate techniques. They are not
 * consistently exposed in the public detail response. Never invent them.
 * The UI may change; reject unfamiliar text instead of publishing bad data.
 */
const numericId = /^\d+$/;
const isoDate = /^\d{4}-\d{2}-\d{2}$/;
function required(condition, message) {
  if (!condition) throw new Error("SKPORT gear recipe: " + message);
}

/**
 * @param {string} renderedSource - text between //Source and //Stats
 * @param {{gearId:string,gearName:string,snapshot:string,itemsByName?:Record<string,string>}} meta
 */
export function parseStandardGearRecipe(renderedSource,meta) {
  required(typeof renderedSource==="string" && renderedSource.length>0,"empty public Source section");
  required(numericId.test(String(meta?.gearId??"")),"invalid official gear item ID");
  required(typeof meta?.gearName==="string" && !!meta.gearName.trim(),"gear name missing");
  required(isoDate.test(meta?.snapshot??""),"invalid snapshot date");
  const rows=renderedSource.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const start=rows.findIndex(x=>x==="Each gear piece costs");
  required(start>=0,"standard recipe heading not found");
  const after=rows.slice(start+1);
  const materials=[];
  let pointer=0;
  while(pointer<after.length){
    const token=after[pointer];
    if(token==="and" || token===","){pointer++;continue;}
    if(token.startsWith("//") || token.startsWith("Gear Template") || token.startsWith("*Gear ")
      || token.startsWith("Entry Contributors") || token.startsWith("Gear Artificing")) break;
    if(!token || token.startsWith("*")) break;
    const quantity=after[pointer+1];
    if(!/^\*\s*\d[\d\s,.]*$/.test(quantity??"")) break;
    const digits=quantity.replace(/[^\d]/g,"");
    const count=Number(digits);
    required(Number.isSafeInteger(count) && count>0,"invalid material quantity "+quantity);
    const id=meta.itemsByName?.[token];
    if(id!==undefined)required(numericId.test(id),"invalid mapped item ID for "+token);
    materials.push({
      ...(id!==undefined?{itemId:id}:{}),
      name:token,
      count
    });
    pointer+=2;
  }
  required(materials.length>=2,"missing component or currency quantity");
  required(new Set(materials.map(x=>x.name)).size===materials.length,"duplicate materials");
  required(materials.some(x=>/stock bill/i.test(x.name)),"stock bill cost missing");
  required(materials.some(x=>/component/i.test(x.name)),"component cost missing");
  return {
    schemaVersion:1,
    source:{provider:"SKPORT Wiki",surface:"public rendered Source section",language:"en",snapshot:meta.snapshot},
    gear:{id:String(meta.gearId),name:meta.gearName},
    recipes:[{id:"standard",method:"default",materials}],
    alternateRecipesStatus:"not-verified"
  };
}

/** Limits parsing to the Source widget to avoid accidentally reading upgrade costs. */
export function getPublicGearSourcePanel(pageText) {
  required(typeof pageText==="string","invalid rendered wiki text");
  const start=pageText.indexOf("//Source");
  const end=pageText.indexOf("//Stats",start+1);
  required(start>=0 && end>start,"Source and Stats section boundaries missing");
  return pageText.slice(start,end);
}
