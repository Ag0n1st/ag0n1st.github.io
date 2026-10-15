import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {validateBlueprintConfirmations,getVerifiedBlueprintLink} from "../../src/lib/endfield/blueprintConfirmations.mjs";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const initial=read("src/data/endfield/progression/blueprint-confirmations.json");
const map=read("src/data/endfield/progression/gear-template-crates.json");
const gear=read("src/data/endfield/catalog/equipment-details.json").gear;
test("no unverified community claim is silently promoted to an owner-confirmed blueprint link",()=>{
 assert.equal(validateBlueprintConfirmations(initial,map,gear),true);
 assert.deepEqual(initial.confirmedLinks,[]);
});
test("verifying a manual link requires an actual official gear and crate marker ID with evidence",()=>{
 const crate=gear.find(x=>x.acquisitionNotes?.includes("Gear Template Crate"));
 const marker=map.markers[0];
 const valid={gearId:crate.id,markerId:marker.markerId,
   evidenceType:"in-game",evidenceNotes:"Opened and observed this exact Gear Template in-game",
   checkedOn:"2026-10-15",reviewedBy:"Creator"};
 assert.equal(validateBlueprintConfirmations({...initial,confirmedLinks:[valid]},map,gear),true);
 assert.equal(getVerifiedBlueprintLink({...initial,confirmedLinks:[valid]},crate.id,map)[0].areaId,marker.areaId);
 assert.throws(()=>validateBlueprintConfirmations({...initial,confirmedLinks:[{...valid,evidenceNotes:""}]},map,gear),/evidence/);
 assert.throws(()=>validateBlueprintConfirmations({...initial,confirmedLinks:[{...valid,markerId:"fake"}]},map,gear),/Unrecognized/);
});
