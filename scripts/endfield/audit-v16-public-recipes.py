#!/usr/bin/env python3
"""One-off read-only SKPORT v1.6 recipe audit; no tokens, no repository writes."""
import json
from pathlib import Path
from urllib.parse import urlparse, parse_qs
from playwright.sync_api import sync_playwright

root=Path("src/data/endfield/catalog")
items=json.loads((root/"items.json").read_text(encoding="utf-8"))["items"]
details=json.loads((root/"equipment-details.json").read_text(encoding="utf-8"))
report=json.loads((root/"v16-skport-import.json").read_text(encoding="utf-8"))
byid={str(x["id"]):x for x in details["gear"]}
byreport={str(x["id"]):x for x in report["entries"]}
lookup={x["name"]:str(x["id"]) for x in items}
ids=[str(x) for x in range(1380,1398)]
print("SNAPSHOT_RECIPE_SUMMARY",json.dumps({
 "report":{s:sum(byreport[i]["recipeStatus"]==s for i in ids) for s in ("verified","needs-review","not-listed")},
 "normalized":{s:sum(byid[i]["recipeStatus"]==s for i in ids) for s in ("verified","needs-review","not-listed")},
 "coverage":details.get("coverage",{}),
 "items":len(items),"gear":len(details["gear"]),
},ensure_ascii=False))
for id in ids:
 d=byid[id];r=byreport[id]; materials=(d.get("standardRecipe") or {}).get("materials")
 print("SNAPSHOT_RECIPE_ENTRY",json.dumps({"id":id,"name":d["name"],"report":r["recipeStatus"],
  "normalized":d.get("recipeStatus"),"materials":materials,"level":d.get("level"),
  "artificing":d.get("artificingStatus"),"notes":d.get("acquisitionNotes")},ensure_ascii=False))

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
 context=browser.new_context(locale="en-US",viewport={"width":1350,"height":900})
 page=context.new_page()
 captured={}
 def onresponse(response):
  try:
   url=urlparse(response.url)
   if url.hostname=="zonai.skport.com" and url.path=="/web/v1/wiki/item/info" and response.status==200:
    id=parse_qs(url.query).get("id",[""])[0]
    if id in ids:
     doc=response.json()
     if doc.get("code")==0:
      item=doc.get("data",{}).get("item",{})
      captured[id]={"itemId":str(item.get("itemId")),"name":item.get("name"),"document":bool(item.get("document"))}
  except Exception as e:
   print("CAPTURE_WARNING",str(e)[:100])
 page.on("response",onresponse)
 for id in ids:
  url="https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id
  try:
   result=page.goto(url,wait_until="domcontentloaded",timeout=45000)
   page.wait_for_timeout(2500)
   try:page.wait_for_function("document.body.innerText.includes('Each gear piece costs')",timeout=6500)
   except:pass
   body=page.locator("body").inner_text(timeout=8000)
   start=body.find("//Source");end=body.find("//Stats",start+1)
   panel=body[start:end] if 0<=start<end else ""
   lines=[x.strip() for x in panel.splitlines() if x.strip()]
   at=lines.index("Each gear piece costs") if "Each gear piece costs" in lines else -1
   snippet=lines[at+1:at+24] if at>=0 else lines[:14]
   print("LIVE_RECIPE_DIAG",json.dumps({
    "id":id,"http":result.status if result else None,"api":captured.get(id),
    "source":bool(panel),"hasCostHeading":at>=0,
    "costLines":snippet,"costNamesRecognized":{v:lookup.get(v) for v in snippet if not v.startswith("*") and v!="and"},
   },ensure_ascii=False))
  except Exception as e:print("LIVE_RECIPE_ERROR",json.dumps({"id":id,"error":str(e)[:260]}))
 browser.close()
