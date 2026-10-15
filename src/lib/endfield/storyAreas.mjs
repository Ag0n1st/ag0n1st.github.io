/**
 * Extract exactly what the OFFICIAL SKPORT Wiki already says about how a
 * gear template is acquired. Region access != blueprint collected.
 * Unknown notes remain unknown rather than guessed from gear set/patch.
 */
export function classifyOfficialGearAcquisition(gear){
  const raw=(gear?.acquisitionNotes??[]).map(x=>String(x).trim()).filter(Boolean);
  const versionNotes=raw.filter(x=>/^\[[^\]]+\] Version Update$/.test(x));
  const acquisition=raw.filter(x=>!versionNotes.includes(x));
  const base={gearId:String(gear?.id??""),source:"SKPORT Wiki / Gear Template Acquisition Method",
    officialNotes:raw,releaseNotes:versionNotes,areaId:null,blueprintLocationStatus:"unverified"};
  if(acquisition.length!==1) return {...base,kind:"unknown",regionId:null};
  const label=acquisition[0];
  if(label==="Gear Template Crate")
    return {...base,kind:"template-crate",regionId:null};
  const authority=/^Authority Level (\d+) Reward$/.exec(label);
  if(authority)return {...base,kind:"authority-level-reward",regionId:null,
    authorityLevel:Number(authority[1])};
  const redistribution=/^Wuling Stock Redistribution Level (\d+)$/.exec(label);
  if(redistribution)return {...base,kind:"regional-stock-redistribution",regionId:"wuling",
    stockRedistributionLevel:Number(redistribution[1])};
  if(label==="Game progress reaches the [Wuling] region")
    return {...base,kind:"region-story-progress",regionId:"wuling"};
  return {...base,kind:"unknown",regionId:null};
}

/** Candidate areas, story steps and verified links are intentionally independent.
 * Providing only a late chapter does NOT prove access to arbitrary side areas.
 */
export function validateStoryAreaRegistry(registry){
  if(registry?.schemaVersion!==1||!Array.isArray(registry?.regions)||
     !Array.isArray(registry?.areas)||!Array.isArray(registry?.storyMilestones)||
     !Array.isArray(registry?.blueprintAreaLinks))
    throw Error("Invalid Endfield story-area registry schema");
  const unique=(arr,label)=>{
    const ids=arr.map(x=>x.id);
    if(ids.some(id=>typeof id!=="string"||!/^[a-z0-9-]+$/.test(id))||
       new Set(ids).size!==ids.length)throw Error("Invalid/duplicate "+label+" IDs");
    return new Set(ids);
  };
  const regions=unique(registry.regions,"region");
  const areas=unique(registry.areas,"area");
  const missions=unique(registry.storyMilestones,"milestone");
  const sources=new Set(registry.sources?.map(x=>x.id));
  if(!sources.size||sources.size!==registry.sources?.length)
    throw Error("Official source metadata required");
  for(const node of [...registry.regions,...registry.areas,...registry.storyMilestones]){
    if(!Array.isArray(node.sourceIds)||!node.sourceIds.length||
       node.sourceIds.some(id=>!sources.has(id)))
      throw Error("Missing official source for "+node.id);
  }
  for(const area of registry.areas){
    if(!regions.has(area.regionId))throw Error("Unknown region "+area.regionId);
    if(!["verified","unverified"].includes(area.unlock?.status))
      throw Error("Unknown unlock verification state");
    if(area.unlock.status==="unverified" && area.unlock.requiredMissionIds.length)
      throw Error("Cannot claim mission requirements for unverified area "+area.id);
    if(area.unlock.requiredMissionIds.some(id=>!missions.has(id)))
      throw Error("Unknown area-unlock story milestone "+area.id);
  }
  for(const link of registry.blueprintAreaLinks){
    if(!/^\d+$/.test(String(link.gearId))||!areas.has(link.areaId)||
       link.verification!=="verified"||!sources.has(link.sourceId))
      throw Error("Unverified gear blueprint-area link cannot be published");
  }
  return true;
}
/** Do not claim a map unlocked without direct progress confirmation. */
export function evaluateAreaAccess(registry,areaId,progress={}){
  const area=registry?.areas?.find(a=>a.id===areaId);
  if(!area)return {status:"unknown",reason:"Unbekanntes Gebiet"};
  if(progress.unlockedAreaIds?.includes(areaId))
    return {status:"confirmed",reason:"Gebiet vom Spieler ausdrücklich als freigeschaltet angegeben"};
  if(area.unlock?.status!=="verified")
    return {status:"unknown",reason:"Exakte Story-Freischaltung des Gebiets noch nicht bestätigt"};
  const required=area.unlock.requiredMissionIds??[];
  if(!required.length)return {status:"unknown",reason:"Kein belegter Zugangsnachweis"};
  const completed=new Set(progress.completedMissionIds??[]);
  if(required.some(id=>!completed.has(id)))
    return {status:"locked",reason:"Erforderliche Storymission noch nicht abgeschlossen"};
  return {status:"confirmed",reason:"Bestätigte Freischaltbedingungen erfüllt"};
}
/** A known region, crate, authority reward or shop listing is not a map chest. */
export function getVerifiedBlueprintArea(registry,gearId){
  const links=registry?.blueprintAreaLinks?.filter(link=>link.gearId===String(gearId)&&
    link.verification==="verified")??[];
  return links.map(link=>link.areaId);
}
