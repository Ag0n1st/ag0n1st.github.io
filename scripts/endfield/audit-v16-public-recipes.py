#!/usr/bin/env python3
"""One-off inspection of public SKPORT recipe DOM markup, no repository writes."""
import json
from urllib.parse import urlparse,parse_qs
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage"])
 page=browser.new_page(locale="en-US",viewport={"width":1350,"height":900})
 responses={}
 def onresponse(res):
  try:
   u=urlparse(res.url)
   if u.hostname=="zonai.skport.com" and u.path=="/web/v1/wiki/item/info" and res.status==200:
    id=parse_qs(u.query).get("id",[""])[0]
    if id in ("1380","1389","1395"):
     raw=res.json().get("data",{}).get("item",{})
     doc=raw.get("document",{})
     headings=[{"title":w.get("title"),"id":w.get("id")} for g in doc.get("chapterGroup",[]) for w in g.get("widgets",[])]
     source_widgets=[w for w in headings if "source" in (w.get("title") or "").lower()]
     responses[id]={"id":str(raw.get("itemId")),"sourceWidgets":source_widgets,"headings":headings,
       "widgetKeys":{w["id"]:list(doc.get("widgetCommonMap",{}).get(w["id"],{}).keys()) for w in source_widgets}}
  except Exception as e:print("API_DIAGNOSTIC_ERROR",str(e)[:160])
 page.on("response",onresponse)
 for id in ("1380","1389","1395"):
  url="https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=4&gameEntryId="+id
  try:
   page.goto(url,wait_until="domcontentloaded",timeout=45000)
   page.wait_for_timeout(4500)
   needle=page.get_by_text("Each gear piece costs",exact=True)
   count=needle.count()
   if count:
    diag=needle.first.evaluate("""el=>{
      const out=[];let n=el;
      for(let depth=0;depth<5&&n;depth++,n=n.parentElement){
       out.push({depth,tag:n.tagName,classes:n.className?.toString().slice(0,180),
        html:n.outerHTML.slice(0,9000),text:n.innerText?.slice(0,800)});
      }return out;}""")
   else:
    diag=[]
   print("DOM_RECIPE_DIAG",json.dumps({"id":id,"api":responses.get(id),"matches":count,"parents":diag},ensure_ascii=False))
  except Exception as e:
   print("DOM_RECIPE_ERROR",json.dumps({"id":id,"error":str(e)[:240]}))
 browser.close()
