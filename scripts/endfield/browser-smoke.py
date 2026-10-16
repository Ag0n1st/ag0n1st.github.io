#!/usr/bin/env python3
"""Chromium smoke QA for built Astro operator guides.

Run after npm run build. No screenshots or videos are produced.
External YouTube playback is not tested, only the embedded URL.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright

DIST = Path(__file__).resolve().parents[2] / "dist"
PARTNERS = ["Zhuang Fangyi", "Perlica", "Arclight",
            "Arcane", "Tangtang", "Xaihi"]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def verify(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS:", message, flush=True)


def guide(page, base_url, slug):
    response = page.goto(base_url + "/endfield/operatoren/" + slug + "/",
                         wait_until="domcontentloaded")
    verify(response is not None and response.status == 200,
           slug + ": guide route serves HTTP 200")
    page.locator("#op-level").wait_for(state="attached")
    page.wait_for_function(
        "() => !document.querySelector('#op-build-results').textContent.includes('Prüfe vorhandene')"
    )


def check_overflow(page, label):
    metrics = page.evaluate(
        "() => ({viewport: innerWidth, document: document.documentElement.scrollWidth})"
    )
    verify(metrics["document"] <= metrics["viewport"] + 2,
           label + ": no page-wide horizontal overflow " + str(metrics))


def smoke(page, base_url, width):
    label = str(width) + "px"
    guide(page, base_url, "liino")
    check_overflow(page, label)
    verify(page.locator("#build-finder").get_attribute("open") is None,
           label + ": Build-Finder initially collapsed")
    verify(page.locator("#op-level").input_value() == "70",
           label + ": maximum profile level for first visit")

    names = [x.strip() for x in page.locator(
        ".op-partners-grid .op-gear-part small").all_text_contents()]
    verify(names == PARTNERS, label + ": all six distinct Meta partners")
    video_src = page.locator(
        "#uebersicht iframe.op-video-embed").first.get_attribute("src") or ""
    verify("youtube-nocookie.com/embed/F1sx8IuOIK4" in video_src
           and "autoplay=1" not in video_src,
           label + ": correct privacy-enhanced guide embed, no autoplay")

    verify(page.locator("#uebersicht .op-quick-weapon-grid .op-quick-weapon-card").count() == 4,
           label + ": four separate overview weapon cards")
    verify(page.locator("#uebersicht .op-rating").first.locator(".op-rating-header").inner_text().startswith("Einsteigerfreundlichkeit"),
           label + ": positive ease rating replaces negative difficulty heading")
    verify(page.locator("#uebersicht .op-rating").first.locator(".op-meter i.active").count() == 5,
           label + ": Liino difficulty 1 renders five beginner-friendliness bars")
    verify(page.locator("#operator-kit").get_by_text("Ressourcen & Verfügbarkeit").count() == 0,
           label + ": obsolete resources block removed")
    verify(page.locator("#operator-kit").get_by_text("Liino unterstützt ihr Team").count() == 1,
           label + ": approved Liino Kit playstyle is displayed")
    if width > 1000:
        video = page.locator("#uebersicht .op-video-card").bounding_box()
        profile = page.locator("#uebersicht .op-profile-card").bounding_box()
        verify(video is not None and profile is not None
               and video["height"] < profile["height"],
               label + ": video card no longer stretches to profile height")
        verify(page.locator("#uebersicht .op-quick-stats").evaluate(
            "(el) => getComputedStyle(el).alignItems") == "start",
               label + ": gear and skill quick cards do not stretch")
    for n in (1, 3, 5):
        page.locator('[data-potential-button="' + str(n) + '"]').click()
        img = page.locator('[data-potential-panel="' + str(n) +
                           '"] .op-potential-snapshot img')
        img.wait_for(state="visible")
        verify(img.count() == 1 and img.get_attribute("src").endswith(
            "/images/endfield/operators/liino/potentials/potential-" + str(n) + ".webp"),
               label + ": Liino P" + str(n) + " uses local WebP snapshot")
        page.wait_for_function(
            "(el) => el.complete && el.naturalWidth > 100", arg=img.element_handle())
        verify(img.evaluate("(el) => el.complete && el.naturalWidth > 100"),
               label + ": Liino P" + str(n) + " WebP loads in Chromium")

    verify(page.locator(".op-meta-build-card").count() == 3,
           label + ": exactly three visible Meta equipment builds")
    labels = page.locator("#teams .op-meta-team-labels")
    verify(labels.count() == 2, label + ": two Meta team headings")
    for entry in labels.all():
        chips = entry.locator(".op-chip")
        verify(chips.count() == 2, label + ": distinct Meta and Support chips")
        if width > 1000:
            first, second = chips.nth(0).bounding_box(), chips.nth(1).bounding_box()
            verify(first is not None and second is not None
                   and 0 <= second["x"] - first["x"] - first["width"] <= 12,
                   "desktop: Meta and Support labels remain adjacent")

    link = page.locator(".op-meta-build-card [data-select-build]").first
    build_id = link.get_attribute("data-select-build")
    link.click()
    verify(page.locator("#build-finder").get_attribute("open") is not None,
           label + ": Meta link opens build finder")
    verify(page.locator('[data-build-button="' + build_id +
                        '"]').get_attribute("aria-pressed") == "true",
           label + ": Meta link selects its build")

    page.locator("#op-progress-min").click()
    verify(page.locator("#op-level").input_value() == "10",
           label + ": minimal preset sets level 10")
    verify(page.locator("#op-story-region").input_value() == "",
           label + ": minimal preset clears region")
    verify(page.locator("[data-story-area]:checked").count() == 0,
           label + ": minimal preset clears areas")
    verify(page.locator("[data-blueprint-owned]:checked").count() == 0,
           label + ": minimal preset clears blueprint ownership assumptions")

    blueprint = page.locator("[data-blueprint-owned]:not([disabled])").first
    gear_id = blueprint.get_attribute("data-blueprint-owned")
    blueprint.evaluate(
        "el => {el.checked = true; el.dispatchEvent(new Event('change', {bubbles:true}));}")
    mode = page.evaluate(
        "() => JSON.parse(localStorage.getItem('ag0n1st:endfield:build-story-progress:v2')).selectionMode"
    )
    verify(mode == "min", label + ": minimal mode saved as localStorage v2")

    page.reload(wait_until="domcontentloaded")
    page.locator("#op-level").wait_for(state="attached")
    verify(page.locator("#op-level").input_value() == "10",
           label + ": minimum survives reload")
    verify(page.locator('[data-blueprint-owned="' + gear_id +
                        '"]:checked').count() >= 1,
           label + ": selected blueprint survives reload")

    guide(page, base_url, "typhoeus")
    verify(page.locator("#op-level").input_value() == "10",
           label + ": minimum carries across operator guides")
    guide(page, base_url, "liino")
    verify(page.locator('[data-blueprint-owned="' + gear_id +
                        '"]:checked').count() >= 1,
           label + ": blueprint selection survives guide switch")

    page.locator("#build-finder").evaluate("el => el.open = true")
    page.locator("#op-progress-reset").click()
    verify(page.locator("#op-level").input_value() == "70",
           label + ": maximum reset restores level 70")
    verify(page.locator("[data-blueprint-owned]:not([disabled]):not(:checked)").count() == 0,
           label + ": maximum reset enables all available blueprints")
    page.locator(".op-story-extra").evaluate("el => el.open = true")
    authority = page.locator("#op-authority-level")
    authority.fill("200")
    authority.press("Tab")
    verify(authority.input_value() == "60",
           label + ": authority input clamps to 60")

    gameplay = page.locator('.op-guide-toc-links a[href="#gameplay"]')
    gameplay.click()
    page.wait_for_timeout(80)
    verify(gameplay.get_attribute("aria-current") == "location",
           label + ": Gameplay TOC active on anchor navigation")
    check_overflow(page, label)


def main():
    if not (DIST / "index.html").is_file():
        raise SystemExit("Missing dist; run npm run build first")
    server = ThreadingHTTPServer(("127.0.0.1", 0),
                                 partial(QuietHandler, directory=str(DIST)))
    Thread(target=server.serve_forever, daemon=True).start()
    base_url = "http://127.0.0.1:" + str(server.server_port)
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            try:
                for width in (1440, 390):
                    context = browser.new_context(
                        viewport={"width": width, "height": 900},
                        reduced_motion="reduce")
                    try:
                        smoke(context.new_page(), base_url, width)
                    finally:
                        context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
    print("Desktop and mobile Chromium smoke checks passed.", flush=True)


if __name__ == "__main__":
    main()
