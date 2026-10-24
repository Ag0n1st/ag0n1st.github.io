# Endfieldle – Operator-Trivia, Datenpflege und Tagesplan

**Stand:** 2026-10-24 · DE/EN · **kein Login**, **kein Cloudflare-/Gewinnerzähler**.

## Spiel

- Beide Routen verwenden denselben Operator des Tages: `/endfield/endfieldle/` und `/en/endfield/endfieldle/`.
- **Sieben Kategorien**: Geschlecht, Spezies, Fraktion, Element, Klasse, Waffentyp und Release-Version. Rarität, Hauptattribut, Meta-Rollen und Traits sind bewusst **keine** Spielkategorien.
- Grün = gleicher Wert, Rot = verschiedener Wert, neutral = nicht vergleichbar (z. B. `Undisclosed` oder variables Geschlecht). Bei Release-Version zeigen ↑/↓ die Richtung der **gesuchten** Version; `v1.10` wird korrekt nach `v1.9` behandelt.
- Ein Tagesrätsel startet um **00:00 Europe/Berlin**; die Anzeige bestimmt das Datum im Browser mittels `Intl.DateTimeFormat({timeZone:"Europe/Berlin"})`. Sommer-/Winterzeit wird berücksichtigt.
- Ein vorberechneter, **fest eingefrorener Tagesplan** enthält pro Tag einen Operator und schließt die letzten **drei** Lösungen aus; je 34 Operatoren entsteht eine durchmischte Reihenfolge ohne Wiederholung innerhalb des Beutels. Beim Ergänzen neuer Operatoren dürfen **bereits veröffentlichte** Datums-Lösungen nicht nachträglich geändert werden.
- „Gestern“ liest den gestrigen Eintrag aus demselben festen Plan. Keine globale Siegerzahl.
- Pro Browser/Gerät Speichern in `localStorage` (Key `endfieldle:v1`) für Tagesversuche, erreichte Lösungen, Streak, beste Streak; keine Synchronisierung und keine Konten. Wird der Speicher gelöscht, gehen lokale Statistiken verloren. Kein Cross-Device-Counter. Optionales Ergebnis-Sharing ohne Lösung im Text.

## Datenquellen und Pflege

- `src/data/endfield/endfieldle-roster.json`: **34 eindeutige Operatoren** auf Basis von 35 bereits im Repository liegenden offiziellen SKPORT-Item- und Gryphline-Bild-Datensätzen. Die zwei Endministrator-Varianten zählen **nur einmal**; Geschlecht bleibt neutral/variabel. Operatorenbezeichnungen verwenden die offiziellen englischen Namen (`Wulfgard` statt Tippfehler `Wulfguard`, letztere wird bei der Suche als Alias akzeptiert).
- Die Release-Versionen `v1.0`–`v1.6` wurden **explizit vom Betreiber vorgegeben**, nicht aus Wiki-Snapshots abgeleitet.
- Alle 34 Einträge haben lokale offizielle quadratische Icons und Portrait-WebPs, **33 zusätzlich Banner**. Die vollständig eigenständigen SKPORT-Splash-/Illustration-Artworks und Cover sind nur für die drei Vollimporte **Liino, Typhoeus und Si** belegt und nun als `assets.splash`/`assets.cover` direkt verlinkt. Für die übrigen **31** fehlen verifizierte SKPORT-Splash-/Illustration-Quellen. Der 34er-Pool benutzt deshalb jeweils das schon vorhandene offizielle vertikale Porträt statt eine nicht nachgewiesene Splashart-Datei zu erfinden. Der bisherige Banner von Argent Flow ist in `src/data/endfield/catalog/operator-artwork-sources.json` als **HTTP 404** dokumentiert, ohne einen Ersatz zu erfinden. Für Endfieldle wird kein neues Bild importiert; die vorhandenen Originale werden verwendet. `src/data/endfield/catalog/operator-official-artwork.json` enthält weiterhin alle **35** Gryphline-Varianten mit eigenen Icons/Porträts.
- **SKPORT-Abgrenzung:** Der echte öffentliche `item/info`-Vollimport liegt bisher nur für `src/data/endfield/operators/{liino,typhoeus,si}.json` und `.extra.json` vor. Die übrigen 31 Endfieldle-Metadatensätze wurden anhand offizieller Namen/Bilder und unabhängig dokumentierter Operatorprofile kuratiert (`sourceQuality: cross-checked-official-and-community`), **nicht** als vollständige offizielle SKPORT-Skill-/Potenzial-/Materialimporte ausgegeben. Ein vollständiger Import aller Skill-Tabellen benötigt pro Operator ein gültiges öffentliches, signiertes SKPORT `/web/v1/wiki/item/info?id=…`-Snapshot; das vorhandene `scripts/endfield/import-operator.mjs` importiert solche Captures vollständig. Bitte **keine** unbestätigten Tabellen erfinden. Quellen stehen im JSON.
- `src/data/endfield/endfieldle-schedule.json`: täglich festgeschriebene Auswahl **23.10.2026–31.12.2030**, `Europe/Berlin`, mindestens drei Tage Abstand. Bei zusätzlichem Operator oder Verlängerung nur zukünftige Datumswerte mit neuem überprüften Plan ergänzen; bisherige historische Tage unverändert lassen.
- **Tageslösung ist auf einer rein statischen Website prinzipbedingt im öffentlichen JS-/JSON-Bundle zu finden.** Es gibt keinen serverseitigen Lösungsgeheimnisschutz. Anti-Cheating und einen globalen Lösezähler erst bei ausdrücklich separat genehmigtem kleinen Backend planen, nicht stillschweigend Cloudflare anbinden.

## Qualität

`npm run test:endfield` kontrolliert den offiziellen Asset-Verweis pro Operator, sieben Kategorien, den Nutzer-Versionsplan, Versions-Pfeile, alle Terminologien, DST-Tage, eingefrorenen Tagesplan und Ausschluss der letzten drei Tage. `npm run build`, Endfield-100-MB-Limit, Pages-1-GB-Limit und Chromium-Tests 1440/390 px mit beiden Sprachrouten müssen vor jedem Merge grün sein. Neue Komponenten müssen **DE und EN zugleich** aktualisieren. Event-Leaderboard, Fabrik und Operator-Guide-Redaktion bleiben unverändert.

## Debüt-Version vs. tatsächliche Verfügbarkeit

Die Debüt-Version ist das **Patchlabel**, nicht automatisch der erste Banner-Tag. Argent Flow gehört nach dem Betreiberplan zu **v1.6**, wird aber laut [veröffentlichtem Zeitplan](https://enfieldbuild.com/characters/argent-flow) erst am **05.11.2026** spielbar. Deshalb trägt er `availableFrom: "2026-11-05"` und wird vorher weder als Tageslösung noch in der Ratensuche angezeigt. Im noch unveröffentlichten Tagesplan wurden **31.10. (Gilberta)** und **05.11. (Argent Flow)** getauscht; alle früheren Tagesrätsel sind gleich geblieben. Der Build-Validator verhindert Verfügbarkeit vor dem angekündigten Datum.
