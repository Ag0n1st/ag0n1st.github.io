#!/usr/bin/env python3
"""Cache wiki operator header BANNERS (900x352), not square splash art or portrait PNG.
No account data, external image hotlinking, approximate asset/ID matching, or overwrites.
"""
import hashlib, io, json, os, re, time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen
from PIL import Image, UnidentifiedImageError

OPERATORS = ["Si","Argent Flow","Endministrator (Female)","Endministrator (Male)","Perlica","Chen Qianyu","Typhoeus",
 "Purrchena","Arcane","Liino","Mi Fu","Camille","Zhuang Fangyi","Tangtang","Rossi",
 "Laevatain","Yvonne","Gilberta","Ardelia","Ember","Last Rite","Lifeng","Pogranichnik",
 "Alesh","Arclight","Avywenna","Da Pan","Snowshine","Wulfgard","Xaihi","Akekuri",
 "Antal","Catcher","Estella","Fluorite"]
BASE=Path("public/images/endfield/operators")
MANIFEST=Path("src/data/endfield/catalog/operator-artwork-sources.json")
LIMIT_PER_SOURCE=7_000_000
def url_for(name):
    return "https://endfield.wiki.gg/wiki/Special:Redirect/file/"+quote(name.replace(" ","_")+"_Banner.png")
def slugify(name):
    return re.sub(r"[^a-z0-9]+","-",name.lower()).strip("-")
def fetch_image(url):
    last=None
    for retry in range(2):
        try:
            req=Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; Ag0n1stGuidePortal/1.0)"})
            with urlopen(req,timeout=23) as r:
                ctype=r.headers.get("content-type","")
                if not ctype.startswith("image/"):return None,"not-an-image: "+ctype
                data=r.read(LIMIT_PER_SOURCE+1)
                if len(data)>LIMIT_PER_SOURCE:return None,"exceeds-download-limit"
                return data,"ok"
        except HTTPError as e:
            last=f"HTTP {e.code}"
            if e.code not in (429,500,502,503,504):break
        except (URLError,TimeoutError) as e:last=type(e).__name__
        time.sleep(0.4+retry*1.5)
    return None,last or "unavailable"

def main():
    records=[]
    for name in OPERATORS:
        slug=slugify(name)
        source=url_for(name)
        output=BASE/slug/"banner.webp"
        if output.exists():
            saved=output.read_bytes()
            records.append({"operator":name,"slug":slug,"variant":"wiki-infobox-header",
                "path":"/"+str(output).removeprefix("public/"),"source":source,"status":"already-present",
                "bytes":len(saved),"sha256":hashlib.sha256(saved).hexdigest()})
            print("SKIP",slug,"cached and retained")
            continue
        data,status=fetch_image(source)
        if data is None:
            records.append({"operator":name,"slug":slug,"source":source,"status":status})
            print("UNAVAILABLE",slug,status)
            continue
        try:
            with Image.open(io.BytesIO(data)) as photo:
                photo.load()
                w,h=photo.size
                if photo.format not in ("PNG","JPEG","WEBP") or w<400 or h<300 or w>6000 or h>6000 or w/h<2.0:
                    records.append({"operator":name,"slug":slug,"source":source,"status":"unsupported-artwork-shape","sourceSize":[w,h]})
                    print("REJECTED",slug,w,h)
                    continue
                img=photo.convert("RGBA")
                img.thumbnail((1120,1024),Image.Resampling.LANCZOS)
                buffer=io.BytesIO()
                img.save(buffer,format="WEBP",quality=80,method=5)
                compressed=buffer.getvalue()
                if len(compressed)>750_000:
                    buffer=io.BytesIO()
                    img.thumbnail((900,900),Image.Resampling.LANCZOS)
                    img.save(buffer,format="WEBP",quality=72,method=5)
                    compressed=buffer.getvalue()
                if len(compressed)>750_000:
                    records.append({"operator":name,"slug":slug,"source":source,"status":"optimized-image-too-large"})
                    continue
                output.parent.mkdir(parents=True,exist_ok=True)
                output.write_bytes(compressed)
                records.append({"operator":name,"slug":slug,"variant":"wiki-infobox-header","path":"/"+str(output).removeprefix("public/").replace(os.sep,"/"),"source":source,
                    "status":"cached","sourceSize":[w,h],"size":[img.width,img.height],
                    "bytes":len(compressed),"sha256":hashlib.sha256(compressed).hexdigest()})
                print("CACHED",slug,w,h,"->",img.width,img.height,len(compressed))
        except (UnidentifiedImageError,OSError,ValueError) as e:
            records.append({"operator":name,"slug":slug,"source":source,"status":"invalid-file"})
            print("INVALID",slug,type(e).__name__)
        time.sleep(1.35)
    MANIFEST.parent.mkdir(parents=True,exist_ok=True)
    MANIFEST.write_text(json.dumps({"schemaVersion":1,"sourceType":"community-mediawiki-image",
      "verifiedAt":"2026-10-17","rights":"Game imagery belongs to the respective rightsholders; refer to the individual Wiki file page for attribution and licence.",
      "items":records},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("TOTAL",len(records),"CACHED",sum(x["status"] in ("cached","already-present") for x in records),
       "UNAVAILABLE",sum(x["status"] not in ("cached","already-present") for x in records))
if __name__=="__main__":main()
