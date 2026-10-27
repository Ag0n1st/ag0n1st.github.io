# Community-Tierlist – 23.08.2026

**Status:** erste gemeinsam im Stream bewertete und veröffentlichbare Tierlist. Historischer Stand vom **23. August 2026**, unabhängig von später veröffentlichten Operatoren und Balanceänderungen. Umsetzung DE/EN über denselben Datenstand; Fortschritt und Release in `ROADMAP.md` §18.51.

## Redaktionelle Datenquelle

- Editierbare Quelle: `src/data/endfield/tierlists/2026-08-23.json` (nicht automatisch durch Spiel- oder SKPORT-Import neu berechnen).
- Pro Stream-Edition `id` und `date`, dazu die drei Rollen `damage-dealer`, `enabler`, `buffer`. Jede Rolle besitzt die Ränge `S`, `A`, `B`, `C`, `D` und `F`, in der exakt angegebenen Reihenfolge.
- Datensätze speichern nur bestehende **Operator-Slugs** aus `src/data/endfield/endfieldle-roster.json`; Namen und lokal gespeicherte `official-icon.webp`-Bilder kommen automatisch aus dem Roster.
- Vorlage/Quelle der Platzierungen ist die **vom Betreiber direkt im Chat übermittelte Stream-Einordnung vom 23.08.**. Es gibt keinerlei neue, aus dem Wiki abgeleitete Rankings oder Änderungen für eine neuere Version. Eine zusätzliche Datei mit abweichenden Platzierungen wurde nicht übernommen.
- Abkürzungen aus dem Stream-Input wurden auf ihre belegten Identitäten aufgelöst: Zhuang → **Zhuang Fangyi**; Endmin → **Endministrator**; Chen → **Chen Qianyu**; Tang Tang → **Tangtang**; Wulfguard → **Wulfgard** (lokaler kanonischer Operatorname). Das Ranking blieb unverändert.
- Leere Plätze erhalten eine **—**-Anzeige. Insbesondere wurden für Buffer nur S/A/B/C geliefert: D und F erhalten keine erfundenen Operator-Platzierungen. Damage Dealer F und Enabler F bleiben ebenfalls leer.
- Rollen sind unabhängig: Arcane, Tangtang, Camille, Perlica, Lifeng, Antal, Akekuri und Pogranichnik können jeweils in mehr als einer Rolle vorkommen.

## User Interface

- `/endfield/tierlist/` und `/en/endfield/tierlist/` verwenden dasselbe `EndfieldTierlist.astro`-Component (zweisprachige Labels und Beschreibung).
- Eine große Card „Community-Ranking“ mit sichtbarem Stream-Datum und genau **3 Tabs**: Damage Dealer, Enabler, Buffer (gleiche Rolllabels wie im Stream).
- Pro Tab sechs Rang-Zeilen `S > A > B > C > D > F`, farbige Rang-Spalte links, rechts in mehreren Reihen umbrechende kompakte Mini-Cards (lokale Operatorbilder und vollständige Namen) – **kein horizontales Scrollen** auf Desktop/Smartphone.
- Tab-Interaktion per Klick, Pfeiltasten (links/rechts) und Home/End. Aktiver Tab und Panel sind per `aria-selected`, `tabpanel`, `hidden` zugänglich; der anfängliche Tab ist Damage Dealer.
- Die Navigation in DE/EN zeigt Tierlist als fertig statt als Baustelle; die Endfield-Startseite verweist auf die veröffentlichte August-Einordnung und behauptet nicht mehr „Die ersten Ranglisten folgen“.
- **Keine zusätzlichen Grafikdateien, keine neue Backend-API, keine Konten oder Speicherung von Nutzereingaben**: ausschliesslich bestehende lokale 1:1-Icons und statisch generiertes HTML/CSS.

## Spätere Stream-Editionen

Eine kommende Tierlist als **neue JSON-Datei** unter `src/data/endfield/tierlists/` anlegen, damit das historische Ranking vom 23.08.2026 unverändert bleibt. Zunächst aktualisiert die gemeinsame Tierlist-Komponente den aktiven Import, sobald die neue Ausgabe redaktionell freigegeben wurde. Ein Archiv-Auswahlmenü erst bei mehreren tatsächlichen Editionen hinzufügen; keine nicht vorhandenen Tierlists oder Streaming-Daten erfinden.

## QA und Limits

- `scripts/endfield/community-tierlist.test.mjs`: alle 36 Platzierungen und ihre Reihenfolge, erlaubte Slugs, Dateipfade, leere Ränge, DE/EN-Routen, gültige Tastatur-Tabs, Ablehnung doppelter/ungültiger Eingaben.
- `scripts/endfield/browser-smoke.py`: echte Chromium-Kontrolle DE/EN Desktop (1440 px)/Mobil (390 px), sichtbare Rolle, Umschalten, Tastatur, korrekte ausgewählte Operators, 0 horizontales Seiten-Overflow, lokal dargestellte Icons.
- Vor Veröffentlichung: `npm run test:endfield`, 100 MB Endfield, `npm run build`, 1 GB Pages, Chromium-Tests und erfolgreicher PR-CI-Lauf. Merge und unabhängigen Produktivdeploy gesondert belegen, exakte Bytes in `ROADMAP.md` notieren.
