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

  # The public Next.js chunk graph contains every static icon as a hashed
  # media filename; it does not require visiting private APIs or accounts.
  script_urls=await page.evaluate("""()=>[...document.querySelectorAll('script[src],link[rel=stylesheet]')].map(e=>e.src||e.href).filter(Boolean)""")
  media_files=set()
  for js_url in script_urls:
   if not js_url.startswith("https://web-static.hg-cdn.com/endfield/official-v4/_next/static/") or not js_url.split("?")[0].endswith((".js",".css")):
    continue
   try:
    with urlopen(Request(js_url,headers={"User-Agent":"Mozilla/5.0"}),timeout=18) as handle:
     body=handle.read(8_000_001)
    if len(body)>8_000_000:continue
    media_files.update(re.findall(rb'([A-Za-z][A-Za-z0-9_-]{1,35}\.[0-9a-f]{8}\.(?:png|webp))',body))
   except Exception as e:print("STATIC_CHUNK_UNAVAILABLE",type(e).__name__,js_url[-70:])
  media_names={v.decode("ascii") for v in media_files}
  print("PUBLIC_MEDIA_FILES",len(media_names),"SI_ICON_FOUND","jsspsi.0a31758c.png" in media_names)

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
    if file.exists():row["assets"][variant]={"path":"/"+str(file).removeprefix("public/"),"source":url,"status":"already-present","bytes":file.stat().st_size};continue
    try:
     compressed,size,outSize=download(url,variant)
     file.parent.mkdir(parents=True,exist_ok=True);file.write_bytes(compressed)
     row["assets"][variant]={"path":"/"+str(file).removeprefix("public/"),"source":url,"status":"cached","size":outSize,"sourceSize":size,
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
   if not icon:
    # Resolve exact same-site, same-asset-stem candidates from Next.js bundles.
    # Require a uniquely square image to distinguish icons from portraits.
    portrait_stem=urlsplit(portrait).path.split("/")[-1].split(".")[0]
    candidates=sorted(name for name in media_names if name.split(".")[0] in (portrait_stem,key)
       and ASSET_PREFIX+name!=portrait and name.endswith(".png"))
    matching=[]
    for filename in candidates:
     try:
      compressed,source_size,out_size=download(ASSET_PREFIX+filename,"official-icon")
      ratio=source_size[0]/source_size[1]
      if 0.88<=ratio<=1.13:matching.append((ASSET_PREFIX+filename,compressed,source_size,out_size))
     except (OSError,ValueError):pass
    if i in (0,1,4,6,9,14) or len(matching)>1:
     print("ICON_CANDIDATES",name,[(v[0].split("/")[-1],v[2]) for v in matching])
    if len(matching)==1:
     icon=matching[0][0]
    elif len(matching)>1:
     # Distinguish a dedicated small square thumbnail from square splash art.
     smallest=sorted(matching,key=lambda v:v[2][0]*v[2][1])
     if smallest[0][2][0]<=512 and smallest[0][2][1]<=512 and (len(smallest)<2 or smallest[0][2][0]*smallest[0][2][1]<smallest[1][2][0]*smallest[1][2][1]*0.6):
      icon=smallest[0][0]
   if icon:
    variant="official-icon";file=ROOT/variant_slug/(variant+".webp")
    if file.exists():row["assets"][variant]={"path":"/"+str(file).removeprefix("public/"),"source":icon,"status":"already-present","bytes":file.stat().st_size}
    else:
     try:
      compressed,size,outSize=download(icon,variant)
      file.parent.mkdir(parents=True,exist_ok=True);file.write_bytes(compressed)
      row["assets"][variant]={"path":"/"+str(file).removeprefix("public/"),"source":icon,"status":"cached","size":outSize,"sourceSize":size,
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
