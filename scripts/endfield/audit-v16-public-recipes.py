#!/usr/bin/env python3
"""Read-only public item/info SKPORT Source widget inspection for three known IDs."""
import json
from urllib.parse import urlparse,parse_qs
from playwright.sync_api import sync_playwright
ids=("1380","1389","1395")
def short(value,n=3000):
 s=json.dumps(value,ensure_ascii=False)
 return s[:n]
def summary(raw,id):
 doc=raw.get("document",{})
 refs=doc.get("documentMap",{})
 matches=[]
 for group in doc.get("chapterGroup",[]):
  for heading in group.get("widgets",[]):
   if "source" not in str(heading.get("title","")).lower():continue
   w=doc.get("widgetCommonMap",{}).get(heading.get("id"),{})
   tabs=w.get("tabDataMap",{})
   allrefs=set()
   def visit(obj):
    if isinstance(obj,str) and obj in refs:allrefs.add(obj)
    if isinstance(obj,dict):
     for x in obj.values():visit(x)
    elif isinstance(obj,list):
     for x in obj:visit(x)
   visit(tabs)
   for key in sorted(allrefs):
    node=refs[key]
    blocks=node.get("document",node).get("blockMap",{})
    found=[]
    def visit_entries(obj):
     if isinstance(obj,dict):
      if "entry" in obj or "itemId" in obj or "entryId" in obj:
       found.append({k:obj.get(k) for k in ("entry","itemId","entryId","count") if k in obj})
      for x in obj.values():visit_entries(x)
     elif isinstance(obj,list):
      for x in obj:visit_entries(x)
    visit_entries(blocks)
    matches.append({"ref":key,"blockCount":len(blocks),"entries":found[:30],
      "head":short(blocks,3400)})
   print("STRUCTURED_SOURCE_DIAG",json.dumps({"id":id,"api_id":str(raw.get("itemId")),"widgetTabs":tabs,
    "referencedDocCount":len(allrefs),"docs":matches},ensure_ascii=False))
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
 page=b.new_page(locale="en-US",viewport={"width":1280,"height":800})
 def event(res):
  try:
   u=urlparse(res.url)
   if u.hostname=="zonai.skport.com" and u.path=="/web/v1/wiki/item/info" and res.status==200:
    id=parse_qs(u.query).get("id",[""])[0]
    if id in ids:
     raw=res.json().get("data",{}).get("item",{})
     if str(raw.get("itemId"))==id:summary(raw,id)
  except Exception as e:print("STRUCTURED_DIAG_ERROR",str(e)[:200])
 page.on("response",event)
 for id in ids:
  try:
   res=page.goto("https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id,wait_until="domcontentloaded",timeout=45000)
   page.wait_for_timeout(4500)
   print("PAGE_RESULT",id,res.status if res else "no-response")
  except Exception as e:print("PAGE_ERROR",id,str(e)[:200])
 b.close()
