import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {join} from "node:path";

// Test only user-facing guide copy: editorial provenance belongs in internal
// documentation, not in the guide voice or displayed operator data.
const forbidden = [
  /\bvom\s+(?:Creator|Autor|Verfasser|Ersteller)\b/iu,
  /\b(?:laut|durch)\s+(?:den\s+)?(?:Creator|Autor|Verfasser|Ersteller)\b/iu,
  /\bauf\s+Wunsch\s+des\s+(?:Creators|Autors|Verfassers|Erstellers)\b/iu,
  /\b(?:der\s+)?(?:Creator|Autor|Verfasser|Ersteller)\s+(?:empfiehlt|ordnet|stuft|hat\s+festgelegt)\b/iu,
];
const scan = (path, text, skipComments = false) => {
  for (const [index,line] of text.split(/\r?\n/).entries()) {
    if (skipComments && /^\s*#/.test(line)) continue;
    for (const pattern of forbidden)
      assert.doesNotMatch(line,pattern,`Fremdautoren-Perspektive in ${path}:${index+1}`);
  }
};
const read = path => readFileSync(path,"utf8");
const recurse = folder => readdirSync(folder,{withFileTypes:true}).flatMap(entry => {
  const path=join(folder,entry.name);
  return entry.isDirectory()?recurse(path):[path];
});

test("Operator guide texts use direct editorial voice, never external attribution",()=>{
  for(const path of recurse("src/content/operator-guides").filter(p=>p.endsWith(".md")))
    scan(path,read(path),true); // Markdown/YAML notes beginning with # are not rendered.
});

test("Operator presentation components contain no third-person author attribution",()=>{
  for(const path of recurse("src/components/operator").filter(p=>p.endsWith(".astro")))
    scan(path,read(path));
});

test("Displayed German localisation never frames the guide as third-party authored",()=>{
  for(const path of recurse("src/data/endfield/locales/de").filter(p=>p.endsWith(".json"))){
    const locale=JSON.parse(read(path));
    // Internal status/terminologyNote explain provenance and are not UI content.
    const {status,terminologyNote,sourceLanguage,sourceSnapshot,...displayed}=locale;
    scan(path,JSON.stringify(displayed));
  }
});
