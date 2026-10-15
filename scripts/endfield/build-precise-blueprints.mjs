#!/usr/bin/env node
import {readFileSync,writeFileSync} from "node:fs";
import {compilePreciseGearEvidence} from "../../src/lib/endfield/preciseBlueprints.mjs";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const docs=read("src/data/endfield/catalog/equipment-details.json").gear;
const hub=read("src/data/endfield/progression/gear-piece-acquisition-sources.json");
const wiki=read("src/data/endfield/progression/blueprint-wiki-crate-contents.json");
const community=read("src/data/endfield/progression/blueprint-community-claims.json");
const result=compilePreciseGearEvidence(docs,hub,wiki,community);
if(result.coverage.total!==258||result.coverage.officialCrateGear!==125||
  result.coverage.withLogicalCrate<70)
  throw Error("Official coverage did not meet reviewed precision criteria "+JSON.stringify(result.coverage));
const out="src/data/endfield/progression/blueprint-precise-gear-index.json";
writeFileSync(out,JSON.stringify(result,null,2)+"\n");
const areaNames=new Map(read("src/data/endfield/progression/story-areas.json").areas
  .map(x=>[x.id,x.displayNameDe]));
const byId=new Map(result.entries.map(x=>[x.gearId,x]));
const md=[
 "# Ausrüstungs-Blaupausen: konkrete Einzelteile pro Kiste",
 "",
 "Stand: 15. Oktober 2026. Offizielle IDs/Erwerbsarten aus SKPORT;",
 "namentliche Kisteninhalte aus der verlinkten Talos-Wiki-Tabelle und",
 "Einzelteil-Fundorte aus Endfield Hub. Kein automatisches Entsperren.",
 "",
 "## Abdeckungsgrad",
 "",
 "| Kennzahl | Einträge |","| --- | ---: |",
 ...Object.entries(result.coverage).map(([key,count])=>"| "+key+" | "+count+" |"),
 "",
 "## 24 Kisten mit namentlich verlinkten Einzelteilen",
 "",
 "Die Recherche-Kisten-IDs sind noch KEINE zugeordneten offiziellen SKPORT-Marker-IDs.",
 "",
 "| Recherche-Kiste | Gebiet / Fundort | Zugeordnete Einzelteile und SKPORT-IDs |",
 "| --- | --- | --- |"
];
for(const crate of wiki.crates){
 const names=crate.gearIds.map(id=>{
   const row=byId.get(id);
   const warning=row?.status==="source-conflict"||row?.status==="acquisition-conflict"
     ?" (Quellenkonflikt)":"";
   return (row?.name??id)+" [ID "+id+"]"+warning;
 });
 md.push("| "+crate.claimId+" | "+(areaNames.get(crate.areaId)??crate.areaId)+
   " – "+crate.wikiLocation.split(" — ").at(-1).replace(/\|/g,"/")+
   " | "+names.join("; ").replace(/\|/g,"/")+" |");
}
md.push("",
 "Drei offiziell kartierte Kisten ohne einzelne Wiki-Liste:",
 "marker-stone-interiors-1, sis-painting-1, sis-painting-2.",
 "Das bedeutet nicht, dass sie keine Ausrüstungsrezepte enthalten.",
 "",
 "## Widersprüche bei offizieller Kisten-Erwerbsart",
 "",
 "| Gear-ID / Name | Wiki-Kisten | Endfield-Hub-Quelle | Grund |",
 "| --- | --- | --- | --- |");
for(const row of result.entries.filter(x=>x.status==="source-conflict")){
 md.push("| "+row.gearId+" / "+row.name+" | "+
  (row.wikiItemLinks.map(x=>x.claimId).join(", ")||"—")+" | "+
  (row.hubItemLink?.sourceText??"—").replace(/\|/g,"/")+" | "+
  row.conflictingEvidence.join(", ")+" |");
}
md.push("",
 "## Noch nicht konkret lokalisierte Gear-Template-Items",
 "",
 "| Gear-ID | Name |","| --- | --- |");
for(const row of result.entries.filter(x=>x.status==="unresolved"))
 md.push("| "+row.gearId+" | "+row.name+" |");
md.push("",
 "## Hinweise zur Datenpflege",
 "",
 "Die offiziellen Kistenerwerbsarten können abweichend zur Community-Wiki",
 "angegeben sein. In solchen Fällen hat SKPORT Vorrang, bis der Sachverhalt",
 "im Spiel geprüft ist.",
 "",
 "Öffentliche Quellen:",
 "- https://endfield.wiki.gg/wiki/Gear",
 "- https://endfieldhub.org/database/gears",
 "- https://game.skport.com/map/endfield",
 "- https://wiki.skport.com/endfield",
 "",
 "Bei einer späteren Aktualisierung können die drei Datenimporte nacheinander",
 "ausgeführt werden: import-gear-piece-sources.mjs, import-wiki-crate-contents.mjs",
 "und build-precise-blueprints.mjs, jeweils unter scripts/endfield/.",
 "Danach npm run test:endfield, Budgetprüfung und npm run build ausführen.",
 "Nur persönliche Gear-ID plus offizieller SKPORT-Kisten-ID Nachweise",
 "gehören nach blueprint-confirmations.json. Keine vorläufigen Fundortangaben",
 "geben automatische Build-Freischaltungen.",
 ""
);
writeFileSync("docs/endfield-blueprint-piece-audit.md",md.join("\n"));

console.log("PRECISE_BLUEPRINT_COVERAGE",JSON.stringify({
  coverage:result.coverage,
  conflicted:result.entries.filter(x=>x.status==="source-conflict").map(x=>({
    id:x.gearId,name:x.name,conflicts:x.conflictingEvidence,
    wikiCrates:x.wikiItemLinks.map(w=>w.claimId),hubCrate:x.hubItemLink?.claimId
  })),
  examples:result.entries.filter(x=>x.status==="two-source-exact-piece").slice(0,14)
    .map(x=>({id:x.gearId,name:x.name,crate:x.exactLogicalCrateId}))}));
