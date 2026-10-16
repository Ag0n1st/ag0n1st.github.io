#!/usr/bin/env python3
"""Read the RENDERED DOM of one public Datafield character page, not initial HTML.

Install once: python -m pip install playwright && python -m playwright install chromium
Run: python scripts/endfield/datafield_rendered_export.py liino --output liino-datafield.json

This is a research-only exporter. It does NOT publish recommendations, infer
benchmark assumptions or scrape behind authentication; source/conditions need
editorial verification before updating a guide. One page per invocation.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import sys

from playwright.sync_api import TimeoutError as BrowserTimeout
from playwright.sync_api import sync_playwright

SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
PERCENT = re.compile(r"(?<![\w.])([+-]?\d+(?:[.,]\d+)?)\s*%")
POTENTIAL = re.compile(r"\bPotential\s*([1-5])\b", re.I)
WEAPON = re.compile(r"^(.*?)\s+R(\d+)\b", re.I)

SNAPSHOT_JS = r"""() => {
  const title = document.title;
  const bodyText = document.body ? document.body.innerText : '';
  const headingNodes = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]')];
  const named = (name) => headingNodes.find(el =>
    (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase().includes(name.toLowerCase()));
  const mark = (name) => named(name);
  const flatten = (root) => {
    if (!root) return [];
    const lines = [];
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const x = (node.textContent || '').replace(/\s+/g, ' ').trim();
        if (x) lines.push(x);
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE &&
          node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
      if (node.tagName === 'IMG') {
        const alt = (node.getAttribute('alt') || '').trim();
        if (alt) lines.push(alt);
      }
      for (const child of node.childNodes) walk(child);
    };
    walk(root);
    return lines;
  };
  const section = (startLabel, stopLabels) => {
    const start = mark(startLabel);
    if (!start) return {found:false,lines:[],htmlPreview:''};
    const all = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]')];
    let stop = null;
    for (const h of all) {
      if (h === start || !(start.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      const text = (h.textContent || '').replace(/\s+/g,' ').trim().toLowerCase();
      if (stopLabels.some(label => text.includes(label.toLowerCase()))) {stop = h;break;}
    }
    const range = document.createRange();
    range.setStartAfter(start);
    if (stop) range.setEndBefore(stop);
    else range.setEndAfter(document.body.lastChild);
    const holder = document.createElement('div');
    holder.append(range.cloneContents());
    return {
      found:true,
      lines:flatten(holder).slice(0, 900),
      htmlPreview:holder.innerHTML.slice(0, 6000),
      headingTag:start.tagName
    };
  };
  const links = [...document.querySelectorAll('a[href]')].filter(a=>
    /sheet|calculat|spreadsheet|source|excel/i.test((a.textContent || '') + ' ' + (a.href || ''))
  ).slice(0, 30).map(a=>({
    label:(a.textContent || '').trim().slice(0, 120), href:a.href
  }));
  return {
    title, url:location.href,
    loaded: !!mark('Recommended Weapons') || !!mark('Potentials (DPS Increase)'),
    headings:headingNodes.map(h=>({tag:h.tagName, text:(h.textContent||'').trim().slice(0,120)})).slice(0,100),
    potentials:section('Potentials (DPS Increase)', ['Talent Priority','Recommended Teammates','Recommended Weapons','Teams in database']),
    weapons:section('Recommended Weapons', ['Recommended Gear Sets','Teams in database','Disclaimer','Recommended Teammates']),
    spreadsheetLinks:links,
    bodyPreview:bodyText.slice(0,1200)
  };
}"""


def pct(value: str) -> float | None:
    match = PERCENT.search(value)
    return float(match.group(1).replace(",", ".")) if match else None


def parse_potentials(lines: list[str]) -> list[dict]:
    result: list[dict] = []
    for i, value in enumerate(lines):
        match = POTENTIAL.search(value)
        if not match:
            continue
        level = int(match.group(1))
        if any(p["level"] == level for p in result):
            continue
        value_after = next((pct(v) for v in lines[i + 1:i + 5] if pct(v) is not None), None)
        result.append({"level": level, "reportedPercent": value_after})
    return sorted(result, key=lambda x: x["level"])


def parse_weapons(lines: list[str]) -> list[dict]:
    result: list[dict] = []
    for i, value in enumerate(lines):
        match = WEAPON.match(value)
        if not match:
            continue
        name = match.group(1).strip()
        if not name:
            continue
        level = int(match.group(2))
        following = lines[i + 1:i + 6]
        value_after = next((pct(v) for v in following if pct(v) is not None), None)
        unique = (name.casefold(), level)
        if any((w["name"].casefold(), w["rank"]) == unique for w in result):
            continue
        result.append({"name": name, "rank": level, "reportedPercent": value_after})
    return result


def run(slug: str, output: Path, headed: bool, timeout: int) -> int:
    target = f"https://datafield.cc/characters/{slug}"
    print(f"Opening rendered page: {target}", file=sys.stderr)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=not headed)
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, locale="en-US")
        try:
            page.goto(target, wait_until="domcontentloaded", timeout=timeout)
            page.wait_for_function(
                """() => document.body &&
                  /Potentials \\(DPS Increase\\)|Recommended Weapons/i.test(document.body.innerText) &&
                  !(/^\\s*Loading data\\.\\.\\.\\s*$/.test(document.body.innerText))""",
                timeout=timeout,
            )
            # A "Show N More Weapons" button reveals additional rendered entries.
            for _ in range(12):
                more = page.get_by_role("button", name=re.compile(r"Show\s+\d+\s+More\s+Weapons", re.I))
                if more.count() == 0 or not more.first.is_visible():
                    break
                more.first.click(timeout=5000)
                page.wait_for_timeout(150)
            data = page.evaluate(SNAPSHOT_JS)
        except BrowserTimeout as exc:
            print("ERROR: Rendered Datafield data did not load; no values were inferred.", file=sys.stderr)
            print("Browser diagnostic: " + str(exc)[:1400], file=sys.stderr)
            try:
                state=page.evaluate("""() => ({
                  url:location.href, title:document.title,
                  textLength:(document.body?.innerText||'').length,
                  loadingText:(document.body?.innerText||'').includes('Loading data...'),
                  potentialPresent:(document.body?.innerText||'').includes('Potentials (DPS Increase)'),
                  weaponsPresent:(document.body?.innerText||'').includes('Recommended Weapons'),
                  headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(x=>x.textContent?.trim()).slice(0,40),
                  bodyStart:(document.body?.innerText||'').slice(0,900),
                  bodyEnd:(document.body?.innerText||'').slice(-3000)
                })""")
                print("Current rendered URL: " + state["url"], file=sys.stderr)
                print("Headings: " + str(state["headings"]), file=sys.stderr)
                output.parent.mkdir(parents=True, exist_ok=True)
                output.write_text(json.dumps({
                  "schemaVersion":1,"source":"Datafield",
                  "status":"INCOMPLETE_DO_NOT_PUBLISH",
                  "url":target,"diagnostic":state,
                  "potentials":[],"weapons":[]
                },ensure_ascii=False,indent=2)+"\\n",encoding="utf-8")
            except Exception as debug_exc:
                print("Diagnostic extraction also failed: "+str(debug_exc)[:350],file=sys.stderr)
            return 2
        finally:
            browser.close()

    potentials = parse_potentials(data["potentials"]["lines"])
    weapons = parse_weapons(data["weapons"]["lines"])
    result = {
        "schemaVersion": 1,
        "source": "Datafield",
        "url": target,
        "retrievedAtUtc": datetime.now(timezone.utc).isoformat(),
        "method": "Playwright rendered DOM (public page; one character)",
        "potentialPercentageBaseline": "UNVERIFIED – check Datafield spreadsheet and comparison wording",
        "weaponPercentageBaseline": "UNVERIFIED – check Datafield spreadsheet, rank, rotation and reference",
        "sections": {"potentials": data["potentials"]["found"], "weapons": data["weapons"]["found"]},
        "potentials": potentials,
        "weapons": weapons,
        "spreadsheetLinks": data["spreadsheetLinks"],
        "diagnostics": {
            "title": data["title"], "headings": data["headings"],
            "potentialTokens": data["potentials"]["lines"],
            "weaponTokens": data["weapons"]["lines"],
            "bodyPreview": data["bodyPreview"]
        }
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Exported: {output} | potentials={len(potentials)} | weapons={len(weapons)}", file=sys.stderr)
    if len(potentials) < 5 or not weapons or not any(w["reportedPercent"] is not None for w in weapons):
        print("PARTIAL: Missing entries or percentages; examine diagnostics, do NOT publish.", file=sys.stderr)
        return 3
    print("Structured entries detected. Comparison assumptions STILL REQUIRE manual verification.", file=sys.stderr)
    return 0


def main() -> int:
    arg = argparse.ArgumentParser(description="Export one Datafield character from the rendered browser DOM.")
    arg.add_argument("slug", help="Datafield character slug, e.g. liino")
    arg.add_argument("--output", type=Path, default=Path("datafield-character-snapshot.json"))
    arg.add_argument("--headed", action="store_true", help="Show Chromium window for debugging")
    arg.add_argument("--timeout-ms", type=int, default=60000)
    opts = arg.parse_args()
    if not SLUG.fullmatch(opts.slug):
        arg.error("Only lowercase a-z, digits and hyphen slugs are allowed.")
    if opts.timeout_ms < 3000 or opts.timeout_ms > 180000:
        arg.error("--timeout-ms must be between 3000 and 180000.")
    return run(opts.slug, opts.output, opts.headed, opts.timeout_ms)


if __name__ == "__main__":
    sys.exit(main())
