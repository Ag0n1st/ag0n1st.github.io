#!/usr/bin/env python3
"""Import public SKPORT Wiki Threats via the website's own public API response.

The catalog endpoint requires browser-side initialization, so anonymous direct
HTTP requests return 401; Playwright accesses precisely the public Threats page.
No user credentials, tokens or private game account data are requested.
Run: python -m pip install playwright pillow && python -m playwright install chromium
     python scripts/endfield/import-threats-wiki.py
Snapshot remains deterministic and gets committed for GitHub Pages builds.
"""
import asyncio
import io
import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path

SOURCE="https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId=3&filterIds=&header=0"
ROOT=Path(__file__).resolve().parents[2]
OUTPUT=ROOT/"src/data/endfield/catalog/threats.json"
ART=ROOT/"public/images/endfield/threats"
FEATURED={
 "rhodagn": lambda x: x.startswith("Rhodagn"),
 "triaggelos": lambda x: x.startswith("Triaggelos"),
 "marble-aggelomoirai": lambda x: x.startswith("Marble Aggelomoirai"),
 "ruan-yi": lambda x: x=="Ruan Yi",
 "nefarith": lambda x: x.startswith("Nefarith"),
 "alleikhreos": lambda x: x.startswith("Alleikhreos"),
}
USER_BOSSES=[
 {"slug":"rhodagn","name":"Rhodagn"},
 {"slug":"triaggelos","name":"Triaggelos"},
 {"slug":"marble-aggelomoirai","name":"Marble Aggelomoirai"},
 {"slug":"ruan-yi","name":"Ruan Yi"},
 {"slug":"nefarith","name":"Nefarith"},
 {"slug":"alleikhreos","name":"Alleikhreos"},
 {"slug":"si","name":"Si"},
]

def catalog_threats(payload):
    if not isinstance(payload,dict) or payload.get("code") not in (0, "0", None):
        raise ValueError("Invalid response envelope or non-success official catalog")
    groups=payload.get("data",{}).get("catalog",[])
    for group in groups:
        if str(group.get("id"))!="1":
            continue
        for sub in group.get("typeSub",[]):
            if str(sub.get("id"))=="3" and sub.get("name")=="Threats":
                return sub
    raise ValueError("Official Threats subcategory (1 / 3) not found")

async def fetch_public_catalog():
    from playwright.async_api import async_playwright
    answers=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,args=["--no-sandbox"])
        page=await browser.new_page(locale="en-US",viewport={"width":1365,"height":800})
        async def observe(response):
            if "/web/v1/wiki/item/catalog" not in response.url or response.status!=200:
                return
            try:
                data=await response.json()
                sub=catalog_threats(data)
                if len(sub.get("items",[]))>=40:
                    answers.append(sub)
            except Exception:
                pass
        page.on("response",observe)
        await page.goto(SOURCE,wait_until="domcontentloaded",timeout=30000)
        await page.wait_for_timeout(10000)
        await browser.close()
    if not answers:
        raise RuntimeError("SKPORT Threats catalog not available anonymously in this run; keep last verified snapshot unchanged.")
    return answers[-1]

def normalize(sub):
    tags={}
    def collect(rows):
        for row in rows or []:
            tags[str(row.get("id"))]=row.get("name","")
            collect(row.get("children",[]))
    collect(sub.get("filterTagTree",[]))
    all_items=[]
    ids=set()
    for row in sub.get("items",[]):
        ident=str(row.get("itemId",""))
        name=str(row.get("name","")).strip()
        if not ident.isdecimal() or ident in ids or not name:
            raise ValueError("Invalid or repeated official Threats entry ID/name: "+ident)
        ids.add(ident)
        brief=row.get("brief") or {}
        captions=row.get("caption") or []
        desc=" ".join(c.get("text",{}).get("text","").strip()
                      for c in captions if isinstance(c,dict) and isinstance(c.get("text"),dict))
        cover=brief.get("cover") or ""
        if cover and not re.fullmatch(r"https://static\\.skport\\.com/image/[A-Za-z0-9/_-]+\\.png",cover):
            # Do not cache untrusted images from arbitrary hosts.
            cover=""
        all_items.append({
            "id":ident,"name":name,"officialName":name,
            "description":desc,"source":"skport-official-wiki",
            "iconPath":None,"coverUrl":cover or None,
            "tags":[tags.get(str(tid),str(tid)) for tid in row.get("tagIds",[])],
            "tagIds":[str(tid) for tid in row.get("tagIds",[])]
        })
    if len(all_items)<40:
        raise ValueError("Unexpectedly small Threats import: "+str(len(all_items)))
    bosses=[]
    for requested in USER_BOSSES:
        slug=requested["slug"]
        match=[x["id"] for x in all_items if FEATURED.get(slug,lambda _:False)(x["name"])]
        if slug!="si" and not match:
            raise ValueError("Missing expected official Wiki Boss: "+slug)
        bosses.append({
            "slug":slug,"label":requested["name"],"threatIds":match,
            "provisional":slug=="si",
            "portraitPath":"/images/endfield/operators/si/official-portrait.webp" if slug=="si" else None,
            "note":"Operator portrait placeholder pending official Threats record" if slug=="si" else None
        })
    # The user calls this boss "Si" but it is not yet in the official Threats database.
    return {
        "schemaVersion":1,
        "source":{"provider":"SKPORT Wiki","catalogUrl":SOURCE,
          "category":{"mainTypeId":"1","subTypeId":"3"},"language":"en",
          "importMode":"public-browser-response","isComplete":True,
          "snapshotDate":datetime.now(timezone.utc).date().isoformat()},
        "bosses":bosses,"items":all_items
    }

def fetch_icon(row):
    if not row["coverUrl"]:
        return row["id"],False
    try:
        from PIL import Image,ImageOps
        req=urllib.request.Request(row["coverUrl"],headers={"User-Agent":"Mozilla/5.0","Referer":"https://wiki.skport.com/"})
        with urllib.request.urlopen(req,timeout=13) as stream:
            raw=stream.read(2_200_000)
        im=Image.open(io.BytesIO(raw))
        im.load()
        im=im.convert("RGBA")
        im.thumbnail((320,320),Image.Resampling.LANCZOS)
        ART.mkdir(parents=True,exist_ok=True)
        target=ART/(row["id"]+".webp")
        im.save(target,"WEBP",quality=79,method=5)
        return row["id"],True
    except Exception as exc:
        print("ART_SKIPPED",row["id"],str(exc)[:90],flush=True)
        return row["id"],False

def cache_art(payload):
    items=payload["items"]
    cached=set()
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures=[executor.submit(fetch_icon,item) for item in items]
        for future in as_completed(futures):
            ident,ok=future.result()
            if ok:cached.add(ident)
    for row in items:
        if row["id"] in cached:
            row["iconPath"]="/images/endfield/threats/"+row["id"]+".webp"
    print("OFFICIAL_THREATS",len(items),"FEATURED",[(b["slug"],b["threatIds"]) for b in payload["bosses"]],
          "WEBP_CACHED",len(cached),flush=True)

async def main():
    data=normalize(await fetch_public_catalog())
    cache_art(data)
    OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    OUTPUT.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\\n",encoding="utf-8")
    print("SAVED",OUTPUT,"SIZE",OUTPUT.stat().st_size,flush=True)

if __name__=="__main__":
    asyncio.run(main())
