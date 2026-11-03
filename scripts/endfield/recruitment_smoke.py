"""Chromium smoke: bilingual recruitment guide at 1440/390 px, no external services."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright

DIST=Path(__file__).resolve().parents[2]/"dist"

def verify(ok,message):
    if not ok: raise AssertionError(message)
    print("PASS:",message,flush=True)

def smoke(page,base,lang,width):
    prefix="/en" if lang=="en" else ""
    page.goto(base+prefix+"/endfield/cheatsheets/")
    entries=page.locator("[data-cheatsheet-entry]")
    verify(entries.count()==5 and all(x.get_attribute("open") is None for x in entries.all()),
           str(width)+lang+": five Cheat Sheets start collapsed")
    detail=page.locator('[data-cheatsheet-entry="recruitment"]')
    detail.locator(":scope > summary").click()
    verify(detail.get_attribute("open") is not None and detail.locator("#recruitment").is_visible(),
           str(width)+lang+": Gacha System expands on demand")
    root=page.locator("[data-rc-guide]")
    verify(root.count()==1 and page.locator("html").get_attribute("lang")==lang and
           page.locator("#recruitment").count()==1 and
           root.locator("h2#rc-title").inner_text()=="Gacha System" and
           root.locator("[data-rc-mode-tab]").count()==2 and
           root.locator('[data-rc-mode-tab="operators"]').get_attribute("aria-selected")=="true" and
           root.locator('[data-rc-mode-panel="weapons"]').is_hidden(),
           str(width)+lang+": Gacha card embedded in canonical Cheat Sheets with operator default")
    event=root.locator('[data-rc-panel="event"]')
    verify(root.locator('[data-rc-tab]').count()==3 and event.is_visible() and
           event.locator('[data-rc-pity] progress').count()==3 and
           event.locator('.rc-icon-list [data-operator]').count()==7 and
           event.locator('.rc-pool-previous').count()==2 and
           event.locator('.rc-meter-explanation').count()==3 and
           event.locator('[data-rc-milestone]').count()==2 and
           event.locator('.rc-milestone-note').count()==1 and
           event.locator('.rc-milestone-grid').count()==0 and
           event.locator('.rc-oroberyl u').count()==1 and
           event.locator('.rc-oroberyl').count()==1,
           str(width)+lang+": priority 80/120/240 Pity, milestone boxes and highlighted previous event operators")
    icon=root.locator(".rc-headhunt-art")
    icon.scroll_into_view_if_needed()
    verify(icon.get_attribute("src")=="/images/endfield/cheatsheets/headhunting.webp" and
           icon.evaluate("(img)=>img.decode().then(()=>img.naturalWidth===75).catch(()=>false)") and
           icon.evaluate("(img)=>Math.abs(img.getBoundingClientRect().right-img.parentElement.getBoundingClientRect().right)<2"),
           str(width)+lang+": supplied Headhunting icon aligns top-right")
    token=event.locator('[data-rc-kind="token"] img.rc-token-icon')
    token.scroll_into_view_if_needed()
    verify(token.count()==1 and token.evaluate("(img)=>img.decode().then(()=>img.naturalWidth>0).catch(()=>false)"),
           str(width)+lang+": Si token asset loads")
    a=event.locator('[data-rc-example="70"]')
    b=event.locator('[data-rc-example="10"]')
    advanced=event.locator('[data-rc-advanced]')
    verify(all(x.get_attribute("open") is None for x in (a,b,advanced)),
           str(width)+lang+": three instructional disclosures collapsed")
    a.locator("summary").click()
    verify(a.get_attribute("open") is not None and
           a.locator('progress[max="240"]').get_attribute("value")=="70" and
           "170" in a.inner_text() and "140" not in a.inner_text(),
           str(width)+lang+": 70/240 leaves 170 without referring to the conversation typo")
    a.locator("summary").focus()
    a.locator("summary").press("Enter")
    b.locator("summary").click()
    verify(a.get_attribute("open") is None and b.get_attribute("open") is not None and
           b.locator('progress[max="240"]').get_attribute("value")=="10" and
           "230" in b.inner_text(),
           str(width)+lang+": 10/240 leaves 230")
    b.locator("summary").click()
    advanced.locator("summary").click()
    verify(advanced.locator(".rc-example-body").is_visible() and
           advanced.locator(".rc-strategy-grid > div").count()==4 and
           advanced.locator(".rc-setup-choices > div").count()==2 and
           advanced.locator(".rc-strategy-outcomes > p").count()==3 and
           advanced.locator(".rc-example-body > .rc-callout-warning u").count()==3 and
           advanced.locator(".rc-strategy-grid > div").evaluate_all(
               "(els)=>els.every((el,i)=>getComputedStyle(el).getPropertyValue('--rc-strategy').trim()===(i===0?'#82e3eb':'#ee99d5'))"),
           str(width)+lang+": advanced 161-pull strategy and outcomes expand")
    advanced.locator("summary").click()
    event_tab=root.locator('[data-rc-tab="event"]')
    event_tab.focus()
    event_tab.press("ArrowRight")
    rerun=root.locator('[data-rc-panel="rerun"]')
    verify(rerun.is_visible() and event.is_hidden() and
           root.locator('[data-rc-tab="rerun"]').get_attribute("aria-selected")=="true" and
           rerun.locator('.rc-meter-explanation').count()==3 and
           rerun.locator('[data-rc-cycle-guarantee] progress').get_attribute("value")=="69" and
           rerun.locator('[data-rc-issue]').count()==3 and
           rerun.locator('[data-rc-issue] progress[value="69"]').count()==3 and
           rerun.locator('[data-rc-re-milestone]').count()==3 and
           rerun.locator('[data-rc-re-milestone] progress').evaluate_all("(els)=>els.map(x=>x.value).join(',')==='30,30,9'") and
           rerun.locator('[data-operator="tangtang"] progress').get_attribute("value")=="69" and
           rerun.locator('[data-operator="rossi"] progress').get_attribute("value")=="0",
           str(width)+lang+": three Tangtang issues, one-time 120 and 30/60/90 bonuses")
    image=rerun.locator('[data-rc-kind="token"] img.rc-token-icon')
    image.scroll_into_view_if_needed()
    verify(image.evaluate("(img)=>img.decode().then(()=>img.naturalWidth>0).catch(()=>false)"),
           str(width)+lang+": Tangtang token asset loads")
    root.locator('[data-rc-tab="standard"]').click()
    standard=root.locator('[data-rc-panel="standard"]')
    verify(standard.is_visible() and
           standard.locator('[data-rc-pity="80"]').count()==1 and
           standard.locator('.rc-standard-list [data-operator]').count()==5,
           str(width)+lang+": standard banner still has five operators")
    root.locator('[data-rc-mode-tab="operators"]').focus()
    root.locator('[data-rc-mode-tab="operators"]').press("ArrowRight")
    verify(root.locator('[data-rc-mode-tab="weapons"]').get_attribute("aria-selected")=="true" and
           root.locator('[data-rc-mode-panel="weapons"]').is_visible() and
           root.locator('[data-rc-mode-panel="operators"]').is_hidden(),
           str(width)+lang+": Weapon Issue switch accessible and reserved for next iteration")
    root.locator('[data-rc-mode-tab="operators"]').click()
    verify(root.locator('[data-rc-mode-panel="operators"]').is_visible(),
           str(width)+lang+": operator panel restores")
    for img in standard.locator(".rc-standard-list img").all(): img.scroll_into_view_if_needed()
    verify(standard.locator(".rc-standard-list img").evaluate_all(
           "(imgs)=>imgs.every(im=>im.complete&&im.naturalWidth>0)"),
           str(width)+lang+": standard icons load")
    detail.locator(":scope > summary").focus()
    detail.locator(":scope > summary").press("Enter")
    verify(detail.get_attribute("open") is None and not root.is_visible(),
           str(width)+lang+": Gacha System collapses with keyboard")
    page.goto(base+prefix+"/endfield/cheatsheets/#recruitment")
    verify(page.locator('[data-cheatsheet-entry="recruitment"]').get_attribute("open") is not None,
           str(width)+lang+": deep link auto-expands the Gacha card")
    verify(page.evaluate("document.documentElement.scrollWidth<=innerWidth+1"),
           str(width)+lang+": no page-wide overflow")
    old=page.request.get(base+prefix+"/endfield/cheatsheets/"+("recruitment" if lang=="en" else "rekrutierung")+"/")
    verify(old.status==200 and 'http-equiv="refresh"' in old.text() and
           prefix+"/endfield/cheatsheets/#recruitment" in old.text(),
           str(width)+lang+": old detail route redirects to the canonical card")

def main():
    server=ThreadingHTTPServer(("127.0.0.1",0),partial(SimpleHTTPRequestHandler,directory=str(DIST)))
    Thread(target=server.serve_forever,daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser=pw.chromium.launch(headless=True)
            for width in (1440,390):
                for lang in ("de","en"):
                    context=browser.new_context(viewport={"width":width,"height":900},reduced_motion="reduce")
                    try: smoke(context.new_page(),"http://127.0.0.1:"+str(server.server_port),lang,width)
                    finally: context.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    print("Recruitment DE/EN desktop/mobile smoke passed.",flush=True)
if __name__=="__main__": main()
