import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {join} from "node:path";

const roadmap=readFileSync("ROADMAP.md","utf8");
const readme=readFileSync("README.md","utf8");

test("living project roadmap is discoverable, substantial and handoff-ready",()=>{
 assert.ok(readme.includes("[ROADMAP.md](ROADMAP.md)"),"README must prominently link roadmap");
 assert.ok(roadmap.length>30000,"Roadmap must document the complete project");
 const sections=[
  "0. SOFORTSTART: NEUER CHAT / ANDERE KI",
  "1. VISION",
  "2. REPOSITORY",
  "3. HISTORIE",
  "4. AKTUELLER PRODUKTSTATUS",
  "5. ARCHITEKTUR",
  "6. OPERATOR-GUIDES",
  "7. OFFIZIELLER",
  "8. STORY-",
  "9. BUILD-FINDER",
  "10. GEPLANTE ENTWICKLUNGSPHASEN",
  "11. VERBINDLICHER ARBEITSPROZESS",
  "12. RICHTIGER UMGANG MIT QUELLEN",
  "13. RISIKEN",
  "14. AKTUELLER ÜBERGABEPUNKT",
  "15. WICHTIGE LINKS",
  "16. ENTSCHEIDUNGSLOG"
 ];
 for(const heading of sections)
   assert.ok(roadmap.includes("## "+heading),"Roadmap missing heading "+heading);
 assert.ok(roadmap.includes("equipment.builds: []"),"State of editorial builds must be explicit");
 assert.ok(roadmap.includes("Autoritätslevel **maximal 60**"));
 assert.ok(roadmap.includes("Nächste Aufgabe"));
});
test("file-level handoff lists refer to existing core project files",()=>{
 const files=[
  "src/content/operator-guides/_template.md",
  "src/content/operator-guides/liino.md",
  "src/content/operator-guides/typhoeus.md",
  "src/lib/endfield/buildStoryProgress.mjs",
  "src/lib/endfield/buildFinder.mjs",
  "src/data/endfield/progression/story-areas.json",
  "src/data/endfield/progression/blueprint-precise-gear-index.json",
  "docs/endfield-story-build-filter.md",
  "scripts/endfield/check-budget.mjs"
 ];
 for(const file of files){
   assert.equal(existsSync(join(".",file)),true,"Referenced source is missing: "+file);
   assert.ok(roadmap.includes(file),"Missing documented path "+file);
 }
});
