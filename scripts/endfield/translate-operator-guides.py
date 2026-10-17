#!/usr/bin/env python3
"""One-off static, local neural DE→EN translation of public operator guide prose.

The translation model runs inside GitHub Actions. NO network requests from the
published website; exported English editorial JSON is committed and reviewed.
Immutable gameplay IDs, numbers, links, Teams, blueprint requirements, rank
metrics and official SKPORT JSON are kept in their canonical source files.
"""
import json, os, re, sys, time
from copy import deepcopy
from pathlib import Path
import yaml

SOURCE=Path("src/content/operator-guides")
DEST=Path("src/data/i18n/en-guide-content.json")
HAND=Path("src/data/i18n/en-guides.json")

def load_guide(slug):
    content=(SOURCE/(slug+".md")).read_text(encoding="utf-8")
    if not content.startswith("---\n"):
        raise RuntimeError("Not a markdown frontmatter guide: "+slug)
    return yaml.safe_load(content.split("---",2)[1])

class Translator:
    def __init__(self):
        import argostranslate.package, argostranslate.translate
        installed=argostranslate.translate.get_installed_languages()
        de=next((i for i in installed if i.code=="de"),None)
        en=next((i for i in installed if i.code=="en"),None)
        if not(de and en and de.get_translation(en)):
            available=argostranslate.package.get_available_packages()
            package=next((p for p in available if p.from_code=="de" and p.to_code=="en"),None)
            if not package: raise RuntimeError("Argos offline German-English model not available")
            path=package.download()
            argostranslate.package.install_from_path(path)
            installed=argostranslate.translate.get_installed_languages()
            de=next(i for i in installed if i.code=="de")
            en=next(i for i in installed if i.code=="en")
        self.engine=de.get_translation(en)
        self.memo={}
        self.count=0

    def translate(self,raw):
        if not isinstance(raw,str) or not raw.strip():return raw
        if raw in self.memo:return self.memo[raw]
        # Pure game codes and localized references are intentionally not prose.
        if re.fullmatch(r"(M[123]|P[0-5]|Lv\\.? ?[0-9]+|\\d+(?:[.,]\\d+)? ?%|Datafield)",raw.strip()):
            return raw
        pieces=re.split(r"(?<=\\.)\\s+(?=[A-ZÄÖÜ])|(?<=\\!)\\s+|(?<=\\?)\\s+",raw)
        output=[]
        for p in pieces:
            if len(p)>1000:
                # Preserve sentence order and limit context length.
                chunks=re.split(r"(?<=;)\\s+|(?<=:)\\s+",p)
            else:chunks=[p]
            for chunk in chunks:
                if not chunk.strip():continue
                # The official English SKPORT vocabulary is protected from
                # German gameplay back-translations where possible.
                for old,new in (
                  ("Kombofertigkeit","Combo Skill"),("Kampffertigkeit","Battle Skill"),
                  ("Basisangriff","Basic Attack"),("Ultimative Fertigkeit","Ultimate"),
                  ("Beweglichkeit","Agility"),("Stärke","Strength"),("Intellekt","Intellect"),
                  ("Wille","Will"),("Kryo","Cryo"),("Hitze","Heat"),
                  ("Natur-Explosion","Nature Burst"),("Natur-Kumulierung","Nature Infliction"),
                  ("Elektrifizierung","Electrification"),("Taumelpunkte","Stagger"),
                  ("Künstlerische Absicht","Artful Intent"),("Tintenseele","Inksoul"),
                  ("Erster Pinselstrich","Initial Stroke"),("Letzter Pinselstrich","Final Stroke"),
                  ("Zeichen","Signs"),("Jagdpfeile","Hunting Arrows"),("Schwebeflug","Hovering"),
                  ("Ultimative Energie","Ultimate Energy"),("Waffentyp","Weapon Type"),
                  ("Hauptattribut","Main Attribute"),("Sekundärattribut","Secondary Attribute"),
                  ("Warenumverteilung","Stock Redistribution")
                ):
                    chunk=chunk.replace(old,new)
                output.append(self.engine.translate(chunk).strip())
        result=" ".join(output)
        # Original German guides use FP; SKPORT authoritative English uses SP.
        result=re.sub(r"\\bFP\\b","SP",result)
        result=result.replace("Ink Soul","Inksoul").replace("Initial Brushstroke","Initial Stroke")
        result=result.replace("Final Brushstroke","Final Stroke")
        self.memo[raw]=result
        self.count+=1
        if self.count%50==0:print("Translated editorial fields:",self.count,flush=True)
        return result

def field(obj,k,tr):
    if isinstance(obj,dict) and isinstance(obj.get(k),str):
        obj[k]=tr.translate(obj[k])
def fields(obj,keys,tr):
    if isinstance(obj,dict):
        for k in keys:field(obj,k,tr)
def rows(obj,keys,tr):
    if isinstance(obj,list):
        for row in obj:fields(row,keys,tr)
def strings(obj,k,tr):
    if isinstance(obj,dict) and isinstance(obj.get(k),list):
        obj[k]=[tr.translate(item) if isinstance(item,str) else item for item in obj[k]]

def translate_editorial(data,tr,manual):
    d=deepcopy(data)
    o=d.get("overview",{})
    fields(o,["summary","accessibilityNote"],tr)
    strings(o,"strengths",tr)
    strings(o,"weaknesses",tr)
    fields(d.get("operatorKit",{}),["playstyle"],tr)
    skills=d.get("skills",{})
    fields(skills.get("active",{}),["basic","battle","combo","ultimate"],tr)
    rows(skills.get("combatTalents",[]),["evaluation"],tr)
    rows(skills.get("shipTalents",[]),["evaluation"],tr)
    weapons=d.get("weapons",{})
    fields(weapons,["generalNotes"],tr)
    rows(weapons.get("recommendations",[]),["evaluation","comparisonConditions"],tr)
    rows(weapons.get("comparisons",[]),["comparisonConditions"],tr)
    equip=d.get("equipment",{})
    fields(equip,["generalNotes"],tr)
    rows(equip.get("progression",[]),["note"],tr)
    rows(equip.get("builds",[]),["title","metaSummary","storyUnlock","teamContext",
        "evaluation","craftingNotes","setBonusNotes"],tr)
    pot=d.get("potentials",{})
    rows(pot.get("entries",[]),["evaluation","comparisonConditions"],tr)
    rows(pot.get("comparisons",[]),["comparisonConditions"],tr)
    teams=d.get("teams",{})
    fields(teams,["introduction"],tr)
    for group in ["meta","more"]:
        for team in teams.get(group,[]):
            fields(team,["note","evaluation"],tr)
            for row in team.get("memberGear",[]):
                fields(row,["note"],tr)
                rows(row.get("alternatives",[]),["note"],tr)
    gameplay=d.get("gameplay",{})
    fields(gameplay,["explanation"],tr)
    rows(gameplay.get("showcases",[]),["title","description","rotationAndTips"],tr)
    conclusion=d.get("conclusion",{})
    fields(conclusion,["verdict","pullAdvice","closingNote"],tr)
    strings(conclusion,"recommendedFor",tr)
    strings(conclusion,"skipIf",tr)
    # The author's already-reviewed English explanations take precedence when
    # they preserve the same exact set of source strengths/weaknesses.
    if len(manual.get("strengths",[]))==len(o.get("strengths",[])):
        o["strengths"]=manual["strengths"]
    if len(manual.get("weaknesses",[]))==len(o.get("weaknesses",[])):
        o["weaknesses"]=manual["weaknesses"]
    if len(manual.get("recommendedFor",[]))==len(conclusion.get("recommendedFor",[])):
        conclusion["recommendedFor"]=manual["recommendedFor"]
    if len(manual.get("skipIf",[]))==len(conclusion.get("skipIf",[])):
        conclusion["skipIf"]=manual["skipIf"]
    o["summary"]=manual.get("intro",o.get("summary",""))
    conclusion["verdict"]=manual.get("conclusion",conclusion.get("verdict",""))
    # Keep original video URLs, explicitly state that they are German videos.
    if d.get("guideVideo",{}).get("url"):
        d["guideVideo"]["title"]=d["displayName"]+" – German-language video guide"
    # A stable source reference for contract tests.
    return {
        "operator":d["operator"],"overview":o,"operatorKit":d.get("operatorKit",{}),
        "skills":skills,"weapons":weapons,"equipment":equip,"potentials":pot,
        "teams":teams,"gameplay":gameplay,"conclusion":conclusion,
        "guideVideo":d.get("guideVideo",{})
    }

def main():
    hand=json.loads(HAND.read_text(encoding="utf-8"))
    tr=Translator()
    result={"schemaVersion":1,"source":"local Argos Translate de-en neural draft; manual QA required",
       "guides":{}}
    for slug in ["liino","typhoeus","si"]:
        print("Translating",slug,flush=True)
        result["guides"][slug]=translate_editorial(load_guide(slug),tr,hand[slug])
    DEST.parent.mkdir(parents=True,exist_ok=True)
    DEST.write_text(json.dumps(result,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("EN_FULL_GUIDE_EXPORT",json.dumps({"operators":list(result["guides"]),"editorialFields":tr.count,
        "bytes":DEST.stat().st_size}),flush=True)

if __name__=="__main__":
    main()
