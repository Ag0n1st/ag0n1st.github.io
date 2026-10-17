#!/usr/bin/env python3
"""Import official operator card portraits + detail icons from the public Gryphline site.
Read-only browser, public CDN URLs, strict matching by actual rendered card identity.
Never write to existing SKPORT official-item catalog or overwrite guide cover/illustration.
"""
import asyncio, hashlib, io, json, re
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
from PIL import Image
from playwright.async_api import async_playwright

PAGE="https://endfield.gryphline.com/en-us/operator"
ASSET_PREFIX="https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/"
ROOT=Path("public/images/endfield/operators")
MANIFEST=Path("src/data/endfield/catalog/operator-official-artwork.json")
NAMES=["Si","Argent Flow","Endministrator","Endministrator","Perlica","Chen Qianyu","Typhoeus",
"Purrchena","Arcane","Liino","Mi Fu","Camille","Zhuang Fangyi","Tangtang","Rossi",
"Laevatain","Yvonne","Gilberta","Ardelia","Ember","Last Rite","Lifeng","Pogranichnik",
"Alesh","Arclight","Avywenna","Da Pan","Snowshine","Wulfgard","Xaihi","Akekuri","Antal","Catcher","Estella","Fluorite"]
def slug(s):return re.sub(r"[^a-z0-9]+","-",s.lower()).strip("-")
def url_in_css(css):
 matches=re.findall(r"https://web-static\.hg-cdn\.com/endfield/official-v4/_next/static/media/[a-zA-Z0-9._-]+\.(?:png|jpg|jpeg|webp)",css or "")
 return matches[0] if len(matches)==1 else None
def download(url,variant):
 if not url or not url.startswith(ASSET_PREFIX) or not re.search(r"\.(png|jpe?g|webp)$",url,re.I):
  raise ValueError("Unapproved external asset")
 with urlopen(Request(url,headers={"User-Agent":"Mozilla/5.0"}),timeout=27) as f:
  if not f.headers.get("content-type","").startswith("image/"):raise ValueError("Not image")
  raw=f.read(7_000_001)
 if len(raw)>7_000_000:raise ValueError("Too large image")
 with Image.open(io.BytesIO(raw)) as source:
  source.load();w,h=source.size
  if w<100 or h<100 or w>6500 or h>6500:raise ValueError("Invalid dimensions")
  img=source.convert("RGBA")
  img.thumbnail((720,1150) if variant=="official-portrait" else (320,320),Image.Resampling.LANCZOS)
  out=io.BytesIO();img.save(out,format="WEBP",quality=83 if variant=="official-portrait" else 88,method=5)
  data=out.getvalue()
  if len(data)>700_000:raise ValueError("Optimized image > 700k")
  return data,[w,h],[img.width,img.height]
async def main():
 rows=[]
 async with async_playwright() as playwright:
  browser=await playwright.chromium.launch(headless=True)
  page=await browser.new_page(viewport={"width":1440,"height":900})
  await page.goto(PAGE,wait_until="domcontentloaded",timeout=90_000)
  await page.wait_for_timeout(2000)
  cards=await page.evaluate("""()=>[...document.querySelectorAll('[class*="OperatorItem_operatorItem__"]')].map((card,i)=>{
    let img=card.querySelector('[class*="OperatorItem_image__"]');
    return {label:(card.innerText||'').replace(/\\s+/g,' ').trim(),siteKey:img?.getAttribute('data-key'),portrait:img?.style.backgroundImage};
  })""")
  if len(cards)!=len(NAMES):raise ValueError(f"Expected {len(NAMES)} distinct official cards, found {len(cards)}")
  for i,(card,name) in enumerate(zip(cards,NAMES)):
   if not card["label"].startswith(name+" // "+name):
    raise ValueError(f"Official card #{i+1} changed mapping: {card['label'][:90]}")
   key=card.get("siteKey") or ""
   portrait=url_in_css(card.get("portrait"))
   if not key or not portrait:raise ValueError("Missing official portrait for "+name)
   variant_slug=slug(name)
   if name=="Endministrator":variant_slug="endministrator-"+("2" if i==2 else "1")
   row={"operator":name,"slug":variant_slug,"siteKey":key,"sourcePage":PAGE,"assets":{}}
   for variant,url in [("official-portrait",portrait)]:
    file=ROOT/variant_slug/(variant+".webp")
    if file.exists():row["assets"][variant]={"path":"/"+str(file),"source":url,"status":"already-present","bytes":file.stat().st_size};continue
    try:
     compressed,size,outSize=download(url,variant)
     file.parent.mkdir(parents=True,exist_ok=True);file.write_bytes(compressed)
     row["assets"][variant]={"path":"/"+str(file),"source":url,"status":"cached","size":outSize,"sourceSize":size,
       "sha256":hashlib.sha256(compressed).hexdigest(),"bytes":len(compressed)}
    except (OSError,ValueError) as e:
     row["assets"][variant]={"source":url,"status":"unavailable","reason":str(e)}
   # The detail panel has a separate square image asset (Si: jsspsi.0a31758c.png).
   await page.evaluate("""i=>document.querySelectorAll('[class*="OperatorItem_operatorItem__"]')[i]?.click()""",i)
   icon=None
   for attempt in range(12):
    await page.wait_for_timeout(130)
    css=await page.evaluate("""()=>{
      const el=document.querySelector('[class*="__02-Operator_image__"]');
      return el?getComputedStyle(el).backgroundImage:"";
    }""")
    candidate=url_in_css(css)
    stem=(urlsplit(candidate).path.split("/")[-1].split(".")[0] if candidate else "")
    portraitStem=urlsplit(portrait).path.split("/")[-1].split(".")[0]
    if candidate and stem in (portraitStem,key) and candidate!=portrait:
     icon=candidate;break
   if icon:
    variant="official-icon";file=ROOT/variant_slug/(variant+".webp")
    if file.exists():row["assets"][variant]={"path":"/"+str(file),"source":icon,"status":"already-present","bytes":file.stat().st_size}
    else:
     try:
      compressed,size,outSize=download(icon,variant)
      file.parent.mkdir(parents=True,exist_ok=True);file.write_bytes(compressed)
      row["assets"][variant]={"path":"/"+str(file),"source":icon,"status":"cached","size":outSize,"sourceSize":size,
       "sha256":hashlib.sha256(compressed).hexdigest(),"bytes":len(compressed)}
     except (OSError,ValueError) as e:row["assets"][variant]={"source":icon,"status":"unavailable","reason":str(e)}
   else:row["assets"]["official-icon"]={"status":"unverified","reason":"No unique matching detail icon on current official page"}
   rows.append(row)
   print("OFFICIAL",i+1,"/",len(NAMES),name,key,{k:v["status"] for k,v in row["assets"].items()})
  await browser.close()
 if len({r["siteKey"] for r in rows})!=35:raise ValueError("Duplicate official operator keys")
 MANIFEST.write_text(json.dumps({"schemaVersion":1,"sourceType":"official-GRYPHLINE-public-assets","verifiedAt":"2026-10-17",
   "notes":"The official card image and detail icon are different assets; Endministrator has two separately keyed variants.",
   "items":rows},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print("TOTAL_OFFICIAL",len(rows),"PORTRAITS",sum(r["assets"]["official-portrait"]["status"] in ("cached","already-present") for r in rows),
   "ICONS",sum(r["assets"]["official-icon"]["status"] in ("cached","already-present") for r in rows))
if __name__=="__main__":asyncio.run(main())
