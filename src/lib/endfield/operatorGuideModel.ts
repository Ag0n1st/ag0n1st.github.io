import type { CollectionEntry } from "astro:content";
import type { ImportedOperator, ImportedOperatorExtras, ImportedItemCost } from "./operatorData";
import type { OperatorLocale } from "./operatorLocale";
import { getOperatorImageUrl } from "./operatorAssets";

// Shared presentation data for all nine guide sections.
// Source values and editorial recommendations remain separate.
type GuideData = CollectionEntry<"operator-guides">["data"];
export interface OperatorGuideProps {
  guide: GuideData;
  operatorName: string;
  preview?: boolean;
  gameData?: ImportedOperator;
  extraData?: ImportedOperatorExtras;
  localized?: OperatorLocale;
}

export function createOperatorGuideModel({ guide, operatorName, preview = false, gameData, extraData, localized }: OperatorGuideProps) {
const trTerm = (word?: string) => word ? localized?.operatorTerms[word] ?? word : "";
const trMetric = (name:string) => localized?.metricLabels[name] ?? name;
const trReq = (req:string) => localized?.requirementLabels[req] ?? req;
const trTalent = (id:string,index:number,english:string) =>
  localized?.talents[id]?.levelEffects[index] ?? english;
const trPotential = (level:number,english:string) =>
  localized?.potentials[String(level)]?.effect ?? english;
const trPromotion = (name:string) => localized?.promotions[name];

const officialPotentials = new Map((extraData?.potentials ?? []).map(p => [p.level,p]));
const combatTalents = extraData?.talents.filter(t => t.category === "combat") ?? [];
const shipTalents = extraData?.talents.filter(t => t.category === "ship") ?? [];
const attributeNodes = extraData?.talents.filter(t => t.category === "attribute") ?? [];
const otherTalents = extraData?.talents.filter(t => t.category === "other") ?? [];
function formatCost(items: ImportedItemCost[]):string {
  if (!items?.length) return "–";
  return items.map(item => (localized?.materials[item.id] ?? extraData?.materials[item.id]?.name ?? "Item "+item.id) +
    " × " + item.count.toLocaleString("de-DE")).join(" · ");
}

const gameSkills = gameData?.skills ?? [];
const importedBySlot = new Map(gameSkills.map(skill => [skill.slot,skill]));
const skillImage = (slot: string) =>
  getOperatorImageUrl(guide.operator, ("skill-"+slot) as "skill-basic" | "skill-battle" | "skill-combo" | "skill-ultimate", importedBySlot.get(slot)?.iconUrl);
const defaultSkillRank = 8; // Rank 9, never a guide skill-priority recommendation.


const missing = "[Noch keine Angaben]";
const slotLabels: Record<string,string> = {
  basic: "Basis-Angriff", battle: "Kampffertigkeit",
  combo: "Kombofertigkeit", ultimate: "Ultimative Fertigkeit"
};
const slotIcons: Record<string,string> = {
  basic: "BA", battle: "KF", combo: "KO", ultimate: "ULT"
};
const priority = guide.skills.priority;
const priorityOrder = priority?.order ?? ["basic","battle","combo","ultimate"];
const priorityComparisons = priority?.comparisons ?? ["·","·","·"];
const weaponLabels: Record<string,string> = {
  bis:"Best in Slot",bp:"Battle Pass",f2p:"F2P",alternative:"Alternative"
};
const roleLabels: Record<string,string> = {
  "main-dps":"Main DPS","sub-dps":"Sub DPS",support:"Support",
  hybrid:"Hybrid",control:"Control",other:"Weitere Rolle"
};
const stageLabels: Record<string,string> = {
  early:"Early Game",mid:"Mid Game",late:"Late Game",endgame:"Endgame"
};
const showcaseTypeLabels: Record<string,string> = {
  trial:"Trial Run",boss:"Bosskampf",speedrun:"Speedrun",other:"Gameplay"
};
const pullLabels: Record<string,string> = {
  recommended:"Klare Empfehlung",conditional:"Situationsabhängig",
  optional:"Eher verzichtbar"
};

const weapons = guide.weapons.recommendations.map((w,i) => ({
  id:"weapon-"+i, label:weaponLabels[w.category], name:w.weaponId,
  source:w.sourceNote, evaluation:w.evaluation,
  comparisonConditions:w.comparisonConditions,
  performancePercent:w.performancePercent
}));
const demoWeapons = [
  {id:"demo-bis",label:"Best in Slot",name:"[BiS-Waffe]",source:"",evaluation:"",comparisonConditions:"",performancePercent:undefined},
  {id:"demo-bp",label:"Battle Pass",name:"[BP-Waffe]",source:"",evaluation:"",comparisonConditions:"",performancePercent:undefined},
  {id:"demo-f2p",label:"F2P",name:"[F2P-Waffe]",source:"",evaluation:"",comparisonConditions:"",performancePercent:undefined},
  {id:"demo-alt",label:"Alternative",name:"[Alternative Waffe]",source:"",evaluation:"",comparisonConditions:"",performancePercent:undefined}
];
const shownWeapons = weapons.length ? weapons : preview ? demoWeapons : [];

const demoBuilds = [
  {id:"demo-main",title:"[Build A – Main DPS]",role:"main-dps",meta:false,metaSummary:"",items:["[Teil 1]","[Teil 2]","[Teil 3]","[Teil 4]"],evaluation:"",teamContext:"",storyUnlock:"",craftingNotes:"",setBonusNotes:"",availableFromLevel:undefined},
  {id:"demo-support",title:"[Build B – Support]",role:"support",meta:false,metaSummary:"",items:["[Teil 1]","[Teil 2]","[Teil 3]","[Teil 4]"],evaluation:"",teamContext:"",storyUnlock:"",craftingNotes:"",setBonusNotes:"",availableFromLevel:undefined},
  {id:"demo-hybrid",title:"[Build C – Hybrid]",role:"hybrid",meta:false,metaSummary:"",items:["[Teil 1]","[Teil 2]","[Teil 3]","[Teil 4]"],evaluation:"",teamContext:"",storyUnlock:"",craftingNotes:"",setBonusNotes:"",availableFromLevel:undefined}
];
const builds = guide.equipment.builds.length ? guide.equipment.builds : preview ? demoBuilds : [];
const featuredBuild = builds.find(b => b.id === guide.overview.featuredBuildId) ?? builds[0];

const demoTeams = [
  {id:"demo-team-1",title:"[Main-DPS-Team]",role:"main-dps",members:[guide.operator,"[Op 2]","[Op 3]","[Op 4]"],buildId:"demo-main",note:"",evaluation:""},
  {id:"demo-team-2",title:"[Support-Team]",role:"support",members:[guide.operator,"[Op 2]","[Op 3]","[Op 4]"],buildId:"demo-support",note:"",evaluation:""}
];
const metaTeams = guide.teams.meta.length ? guide.teams.meta : preview ? demoTeams : [];
const extraTeams = guide.teams.more.length ? guide.teams.more : preview ?
  Array.from({length:8},(_,i)=>({
    id:"demo-extra-"+i,title:"[Teamoption "+(i+1)+"]",
    role:i%3===0?"main-dps":i%3===1?"support":"hybrid",
    members:[guide.operator,"[Op 2]","[Op 3]","[Op 4]"],
    buildId:i%3===0?"demo-main":i%3===1?"demo-support":"demo-hybrid",
    note:"",evaluation:""
  })) : [];
const teamRoles = [...new Set(extraTeams.map(team=>team.role))];

const demoShowcases = [
  {id:"demo-trial",title:"[Operator-Probe]",type:"trial",url:undefined,description:"[Trial Run mit einer repräsentativen Rotation]",rotationAndTips:"",featured:true},
  {id:"demo-boss",title:"[Boss-Showcase]",type:"boss",url:undefined,description:"[Zusätzlicher Bosskampf]",rotationAndTips:"",featured:false},
  {id:"demo-speed",title:"[Speedrun]",type:"speedrun",url:undefined,description:"[Optimierter Run]",rotationAndTips:"",featured:false},
];
const showcases = guide.gameplay.showcases.length ? guide.gameplay.showcases : preview ? demoShowcases : [];
const selectedShowcaseIndex = Math.max(0,showcases.findIndex(s=>s.featured));

function youtubeEmbed(url?:string):string|null {
  if (!url) return null;
  try {
    const parsed=new URL(url);
    const host=parsed.hostname.toLowerCase();
    let id:string|null=null;
    if(host==="youtu.be" || host==="www.youtu.be") id=parsed.pathname.slice(1).split("/")[0];
    else if(["youtube.com","www.youtube.com","m.youtube.com","youtube-nocookie.com","www.youtube-nocookie.com"].includes(host)) {
      if(parsed.pathname==="/watch") id=parsed.searchParams.get("v");
      else if(parsed.pathname.startsWith("/shorts/")||parsed.pathname.startsWith("/embed/")||parsed.pathname.startsWith("/live/")) id=parsed.pathname.split("/")[2];
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? "https://www.youtube-nocookie.com/embed/"+id : null;
  }catch{return null;}
}
const videoEmbed=youtubeEmbed(guide.guideVideo.url);
const ratingRows = [
  ["Spielschwierigkeit","difficulty","Wie anspruchsvoll sind die Mechaniken?"],
  ["Flexibilität","flexibility","Wie leicht lässt sich der Operator in Teams einbauen?"],
  ["Zugänglichkeit","accessibility","Wie einfach kommt man an die benötigten Ressourcen?"]
] as const;
const potentialByLevel = new Map(guide.potentials.entries.map(p=>[p.level,p]));

  return {
    guide, operatorName, preview, gameData, extraData, localized, trTerm, trMetric, trReq, trTalent, trPotential, trPromotion, officialPotentials, combatTalents, shipTalents, attributeNodes, otherTalents, formatCost, gameSkills, importedBySlot, skillImage, defaultSkillRank, missing, slotLabels, slotIcons, priority, priorityOrder, priorityComparisons, weaponLabels, roleLabels, stageLabels, showcaseTypeLabels, pullLabels, weapons, demoWeapons, shownWeapons, demoBuilds, builds, featuredBuild, demoTeams, metaTeams, extraTeams, teamRoles, demoShowcases, showcases, selectedShowcaseIndex, youtubeEmbed, videoEmbed, ratingRows, potentialByLevel, getOperatorImageUrl
  };
}

export type OperatorGuideModel = ReturnType<typeof createOperatorGuideModel>;
