import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(path,"utf8");
const liino=read("src/content/operator-guides/liino.md");
const si=read("src/content/operator-guides/si.md");
const schema=read("src/content/operatorGuideSchema.ts");
const ui=read("src/components/operator/sections/OperatorEquipment.astro");
const css=read("src/styles/operator-guides.css");
const liinoSection=liino.split("  matrix:\n")[1]?.split("\npotentials:")[0]??"";
const siSection=si.split("  matrix:\n")[1]?.split("\npotentials:")[0]??"";
const labels=[...liinoSection.matchAll(/^      - id: (.+)\n        label: "([^"]+)"\n        values: \{([^\n]*)\}\n        weaponId: "([^"]+)"\n        weaponPotential: "(P[05])"\n        weaponTuning: "(9\/9\/[49])"\n        armorId: "([^"]+)"\n        glovesId: "([^"]+)"\n        kit1Id: "([^"]+)"\n        kit2Id: "([^"]+)"/gm)].map(m=>({id:m[1],title:m[2],values:m[3],weapon:m[4],potential:m[5],tuning:m[6],gear:m.slice(7,11)}));
const expected=[
 ["signature-p0-max-will","1046","P0","9/9/4","1126","1129","365","365"],
 ["signature-p0-lynx","1046","P0","9/9/4","1134","1133","365","365"],
 ["signature-p0-xiranite","1046","P0","9/9/4","1134","1138","1236","365"],
 ["bp-p0-max-will","1044","P0","9/9/4","1126","1129","365","365"],
 ["bp-p0-lynx","1044","P0","9/9/4","1134","1133","365","365"],
 ["bp-p0-xiranite","1044","P0","9/9/4","1134","1138","1236","365"],
 ["bp-p5-max-will","1044","P5","9/9/9","1126","1129","365","365"],
 ["bp-p5-lynx","1044","P5","9/9/9","1134","1133","365","365"],
 ["bp-p5-xiranite","1044","P5","9/9/9","1134","1138","1236","365"]
];
test("Liino matrix imports all nine CSV build names, gear identities and P0/P5 weapon progressions",()=>{
  assert.equal(labels.length,9);
  assert.deepEqual(labels.map(r=>[r.id,r.weapon,r.potential,r.tuning,...r.gear]),expected);
  assert.deepEqual(labels.map(r=>r.title),[
    "Signature (P0) · max. WILL","Signature (P0) · LYNX","Signature (P0) · Xiranite",
    "BP (P0) · max. WILL","BP (P0) · LYNX","BP (P0) · Xiranite",
    "BP (P5) · max. WILL","BP (P5) · LYNX","BP (P5) · Xiranite"
  ]);
  assert.match(liinoSection,/id: will, labelDe: "WILL"/);
  for(const label of ["ULT Gain","AMP Bonus","Weapon Bonus","Set Bonus"])
    assert.ok(liinoSection.includes(label));
});
test("Only three Liino rows have calculated WILL/ULT.gain/AMP, unknown cells remain truly missing",()=>{
  const known=[["1320 WILL","+0%","52.8%"],["1261 WILL","+42.7%","50.44%"],["1072 WILL","+74.8%","42.88%"]];
  for(let i=0;i<3;i++){
    assert.ok(labels[i].values.includes('will: "'+known[i][0]+'"'));
    assert.ok(labels[i].values.includes('ult-gain: "'+known[i][1]+'"'));
    assert.ok(labels[i].values.includes('amp-bonus: "'+known[i][2]+'"'));
    assert.ok(labels[i].values.includes("ATK +5.6 / 11.2 / 16.8 / 22.4%"));
  }
  for(const row of labels.slice(3)){
    for(const name of ["will:","ult-gain:","amp-bonus:"])
      assert.ok(!row.values.includes(name),row.id+" must not fabricate "+name);
  }
  for(let i=3;i<9;i++)assert.ok(labels[i].values.includes(i<6?"+8%":"+14%"));
  for(const i of [2,5,8])assert.ok(labels[i].values.includes('set-bonus: "DMG dealt +16%"'));
  for(const i of [0,1,3,4,6,7])assert.ok(!labels[i].values.includes("set-bonus:"));
});
test("Both operators label every weapon card but never hide name/preview; P5 badge is yellow",()=>{
  assert.match(schema,/weaponPotential: z\.enum\(\["P0","P5"\]\)\.optional\(\)/);
  assert.match(schema,/weaponTuning: z\.enum\(\["9\/9\/4","9\/9\/9"\]\)\.optional\(\)/);
  assert.equal((siSection.match(/weaponPotential: "P0"/g)||[]).length,18);
  assert.equal((siSection.match(/weaponTuning: "9\/9\/4"/g)||[]).length,18);
  assert.equal((siSection.match(/weaponPotential: "P5"/g)||[]).length,0);
  assert.match(ui,/data-matrix-weapon-potential/);
  assert.match(ui,/data-matrix-weapon-tuning/);
  assert.match(ui,/op-matrix-weapon-label/);
  assert.match(ui,/<ItemIcon id=\{id\} lang=\{model\.lang\} size="small" \/>/);
  assert.match(css,/\.op-matrix-weapon-label\.is-p5\{color:#ffe985/);
  assert.match(css,/pointer-events:none/);
  assert.match(ui,/Alle Werte beziehen sich auf Si P0 und Jade Vessel P0/);
  assert.match(ui,/Alle Setups beziehen sich auf Liino P0/);
  assert.match(ui,/All setups assume Liino at P0/);
});
