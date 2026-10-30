#!/usr/bin/env python3
"""One-time public SKPORT Source widget recipe capture. No accounts or hidden APIs."""
import json,re
from datetime import datetime,timezone
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from playwright.sync_api import sync_playwright

root=Path("src/data/endfield/catalog")
official={str(row["id"]):row for row in json.loads((root/"items.json").read_text(encoding="utf-8"))["items"]}
start,end=1380,1397
ids={str(i) for i in range(start,end+1)}
captured={}
def parse_item(raw,id):
 if str(raw.get("itemId"))!=id or not isinstance(raw.get("document"),dict):
  raise ValueError("Public item/info ID/document mismatch for "+id)
 doc=raw["document"]
 sources=[w for g in doc.get("chapterGroup",[]) for w in g.get("widgets",[])
          if str(w.get("title","")).removeprefix("//").lower()=="source"]
 if len(sources)!=1:raise ValueError("Expected one official Source widget for "+id)
 tab=doc.get("widgetCommonMap",{}).get(sources[0]["id"],{}).get("tabDataMap",{})
 refs={v.get("content") for v in tab.values() if isinstance(v,dict) and isinstance(v.get("content"),str)}
 if len(refs)!=1:raise ValueError("Source document ambiguous for "+id)
 document=doc.get("documentMap",{}).get(next(iter(refs)))
 if not isinstance(document,dict):raise ValueError("Source document missing "+id)
 blocks=document.get("document",document).get("blockMap",{})
 candidates=[]
 for block in blocks.values():
  elements=block.get("text",{}).get("inlineElements",[]) if isinstance(block,dict) else []
  if not isinstance(elements,list):continue
  if any(isinstance(el,dict) and (el.get("text",{}).get("text") if isinstance(el.get("text"),dict) else el.get("text"))=="Each gear piece costs" for el in elements):
   candidates.append(elements)
 if len(candidates)!=1:raise ValueError("Official standard-recipe block ambiguous "+id)
 entries=[x["entry"] for x in candidates[0] if isinstance(x,dict) and x.get("kind")=="entry" and isinstance(x.get("entry"),dict)]
 if not 2<=len(entries)<=8:raise ValueError("Invalid material count "+id)
 seen=set();result=[]
 for e in entries:
  mid=str(e.get("id",e.get("itemId","")))
  raw_count=str(e.get("count",""))
  if mid not in official or not raw_count.isascii() or not raw_count.isdecimal() or int(raw_count)<1 or mid in seen:
   raise ValueError("Unverified official material reference for "+id)
  seen.add(mid)
  result.append({"id":mid,"count":int(raw_count)})
 return {"id":id,"materials":result,
  "sourceItemUrl":"https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id}

with sync_playwright() as playwright:
 browser=playwright.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
 page=browser.new_page(locale="en-US",viewport={"width":1350,"height":900})
 def capture(response):
  try:
   url=urlparse(response.url)
   if url.hostname!="zonai.skport.com" or url.path!="/web/v1/wiki/item/info" or response.status!=200:return
   id=parse_qs(url.query).get("id",[""])[0]
   if id not in ids:return
   response_json=response.json()
   if response_json.get("code")!=0:return
   record=parse_item(response_json.get("data",{}).get("item",{}),id)
   captured[id]=record
  except Exception as e:
   print("V16_SOURCE_CAPTURE_WARNING",str(e)[:200])
 page.on("response",capture)
 for id in sorted(ids,key=int):
  for attempt in range(1,4):
   if id in captured:break
   try:
    url="https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id
    result=page.goto(url,wait_until="domcontentloaded",timeout=45000)
    if not result or result.status!=200:raise RuntimeError("Public page not reachable")
    page.wait_for_timeout(3500)
    if id in captured:break
    page.reload(wait_until="domcontentloaded",timeout=45000)
    page.wait_for_timeout(2000)
   except Exception as e:print("V16_SOURCE_RETRY",id,attempt,str(e)[:130])
  if id not in captured:print("V16_SOURCE_MISSING",id)
  else:print("V16_SOURCE_VERIFIED",json.dumps({"id":id,"materials":captured[id]["materials"]}))
 browser.close()
if set(captured)!=ids:raise SystemExit("Refusing partial source capture: "+str(sorted(ids-set(captured))))
output={"schemaVersion":1,"provider":"SKPORT Wiki","snapshot":datetime.now(timezone.utc).date().isoformat(),
        "evidence":"anonymous public /web/v1/wiki/item/info Source widget documentMap entry IDs and counts",
        "recipes":[captured[id] for id in sorted(ids,key=int)]}
(root/"v16-structured-recipes.json").write_text(json.dumps(output,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
print("V16_ALL_RECIPES_VERIFIED",len(captured))
