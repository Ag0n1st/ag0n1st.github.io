# Endfield – Threats-Datenbank, Ausrüstungs-Matrix und neue Utility-Bereiche

**Stand:** 19.10.2026. Dieses Dokument ergänzt die zentrale `ROADMAP.md`. Alle sichtbaren Änderungen müssen DE und EN gemeinsam betreffen.

## 1. Official Threats: vollständiger SKPORT-Import

- Quelle: **offizielle Arknights: Endfield SKPORT Wiki**, Kategorie **Threats**, `mainTypeId=1`, `subTypeId=3`: https://wiki.skport.com/endfield/catalog?mainTypeId=1&subTypeId=3&filterIds=&header=0
- Snapshot: `src/data/endfield/catalog/threats.json`, importiert am **19.10.2026**, **85 offizielle Threat-Datensätze** einschließlich echter Wiki-`itemId`, englischem Namen, Kurzbeschreibung, Klassifikations-Tags und offiziellen Bildreferenzen.
- Bilder: **85** auf maximal 320×320 optimierte WebP-Quellbilder unter `public/images/endfield/threats/<id>.webp`, von offiziellen `static.skport.com`-Cover-URLs gesichert. Bestehendes Endfield-/Pages-Dateibudget weiter beachten.
- Normale anonyme HTTP-Abfrage an `zonai.skport.com/web/v1/wiki/item/catalog` ergibt **401**. Die öffentliche SKPORT-Website initialisiert diese Anfrage clientseitig korrekt. Der einmalige Import nutzte deshalb ein anonymes Playwright-Chromium auf der echten öffentlichen Threats-Seite, las nur deren offizielles `typeSub[3]`-JSON und optimierte die verlinkten Bilder. **Keine Accounts/Logins/Cookies des Nutzers**, keine privaten Daten.
- Erneut importierbar durch `python3 -m pip install playwright pillow`, `python3 -m playwright install chromium`, `python3 scripts/endfield/import-threats-wiki.py`. Der Import verweigert partielle Ergebnisse (<40), doppelte IDs und fremde Cover-Hosts.
- Laufzeit ohne Wiki-Zugriff: ausschließlich der lokal eingecheckte Snapshot, kein clientseitiges Tracking oder API-Abhängigkeit.
- Zentrale TS-Leseoberfläche: `src/lib/endfield/threatCatalog.ts` (`allThreats`, `getThreatById`, `featuredBosses`).

### Redaktionell priorisierte Speedrun-Bosse

| Bossgruppe | Echte SKPORT-IDs | Einordnung |
| --- | --- | --- |
| Rhodagn | 431 | Offizieller Wiki-Eintrag |
| Triaggelos | 400 | Offizieller Wiki-Eintrag |
| Marble Aggelomoirai | 688, 401 | Beide offiziellen Formen separat bewahren |
| Ruan Yi | 751 | Offizieller Wiki-Eintrag |
| Nefarith | 868, 867 | Beide offiziellen Formen separat bewahren |
| Alleikhreos | 1115 | Offizieller Wiki-Eintrag „Alleikhreos, Chiliarch“ |
| **Si** | **KEINE** | **Manuell als Boss des v1.6-Speedrun-Rosters aufgenommen, aber noch kein offizieller Threats-Wiki-Datensatz.** `provisional:true`, `threatIds:[]`, Bild `/images/endfield/operators/si/official-portrait.webp`, ausdrücklich **kein** erfundener ID- oder Stat-Eintrag. |

Die vollständigen anderen **85 Threats** bleiben gespeichert für spätere Speedrun-, Gegner- und Nachschlagefunktionen. Die sieben Bossgruppen werden bereits auf der neuen Leaderboard-Platzhalterseite mit passenden Bildern hervorgehoben; es werden **keine erfundenen Community-Laufzeiten oder Platzierungen** gezeigt. Nach SKPORT-Aktualisierung Si-ID aus offizieller Quelle nachtragen, das Porträt durch ein offizielles Threat-Bild ersetzen und `provisional:false` erst nach Prüfung.

## 2. Operatorenübersicht

- Genau **ein** Badge „NEW“ oben rechts in der Operatorcard mit dem **neuesten Release-Datum** aus dem bestehenden `getOperatorsByRelease()`, unabhängig von zuletzt bearbeiteten Guide-Dateien.
- Elementfarben: **Elektro Gelb**, **Hitze Rot**; Kryo Blau, Natur Grün unverändert. CSS nutzt Quell-Element-IDs und nicht lokalisierte Labels.

## 3. Ausrüstungs-Matrix

Die vom Nutzer beigefügte Grafik `Xaihi-Showcase v1.5.png` dient **ausschließlich als Layout- und Spaltenreferenz**, **nicht** als freigegebene Si-/Liino-Statistik. Es werden keine fremden Xaihi-Werte oder unbekannten Meta-Builds übernommen.

- Template: `src/content/operatorGuideSchema.ts`, `equipment.matrix` mit **`enabled: false`** als Default, eigener Liste `metrics` (`id`, `labelDe`, `labelEn`) und `rows` (optionale `weaponId`, `armorId`, `glovesId`, `kit1Id`, `kit2Id`, sowie `values` pro Metrik-ID). IDs aus offizieller SKPORT-Waffen-/Gear-Datenbank nutzen.
- Editor-Dateien: `src/content/operator-guides/si.md` und `src/content/operator-guides/liino.md` aktivieren `equipment.matrix.enabled: true`, mit **editierbaren pro Operator sinnvollen Spaltenüberschriften, ohne ungeprüfte Werte/Zahlen**. Weitere Guides bleiben beim Default aus; Kopiervorlage `src/content/operator-guides/_template.md` ausdrücklich `enabled: false`.
- Position: direkt **nach dem Build-Finder** innerhalb des Ausrüstungskapitels, getrennt durch die bestehende `op-divided`-Linie und standardmäßig zusammengeklappt.
- Darstellung: horizontale Matrix auf kleinen Geräten scrollbar, feste 5 Gear-Spalten, per Operator frei konfigurierbare Kennzahlspalten, Kopfzeile mit lokalem offiziellen Operator-Icon. Bei noch fehlenden Zeilen eine aussagekräftige **Leermeldung statt Fantasiewerten**.
- Hochgeladene vier weiße Inventar-Symbole (originalgetreu, transparent, verlustfreie WebP-Konvertierung): `public/images/endfield/ui/matrix-weapons.webp`, `matrix-armor.webp`, `matrix-gloves.webp`, `matrix-kit.webp`. Der Kit-Header erscheint zweimal für die zwei Accessory-/Kit-Slots.
- Beispiel zum späteren Befüllen (nur Struktur, keine Daten behaupten): In `matrix.rows` Einträge mit `id`, `label`, numerischen oder textuellen Anzeige-`values` passend zu den Spalten-`id` und mit dem offiziell überprüften Weapon-/Gear-ID-Fünfersatz erstellen. **Alle Angaben inklusive P-/Waffenrang, Ultgain/Setbonus und gemessene Werte müssen vorher operator- und setupbezogen geprüft werden.**

## 4. Countdown – korrektes absolutes Zeitziel

- Beibehalten: `src/data/endfield/version-countdown.md` **`2026-11-26T00:00:00+01:00`**, `Europe/Berlin`, Status geschätzt laut Protokoll-Pass.
- Exakter UTC-Zeitpunkt: **`2026-11-25T23:00:00.000Z`**; Frontmatter-Parser validiert mit `Intl.DateTimeFormat` den korrekten UTC-Offset zur tatsächlichen lokalen Wanduhr. Ein falsches `+00:00` bei gleicher „00:00“-Lokalangabe wird abgelehnt.
- Serverrendering und Browser nutzen denselben `endTimestamp` / `endsAtUtc` ohne nachträgliche Zeitverschiebung. Test: **22:00Z ⇒ 1 h Rest; 23:00Z ⇒ 0 h Rest**, unabhängig von Browser-System-Zeitzone.
- Keine Verschiebung auf 23:00 **MEZ** oder 01:00 **MEZ**; keinesfalls das korrekt freigegebene Zieldatum zur Symptombehebung verändern.

## 5. Neue zweisprachige Endfield-Teilbereiche

- **Community Leaderboard** unter `/endfield/leaderboard/` und `/en/endfield/leaderboard/`; Navigationstext optisch zweizeilig „Community / Leaderboard“, Wrench-Icon, Platzhalter für spätere Boss-Run-Rankings, spätere Version-Events und Discord-Einreichungen unter https://discord.gg/v2h9KKT. Sieben Boss-Cards aus Threats-Datenbank; noch **keine echte Einreichungsmaske, Ergebnisse oder Regeldefinition**.
- **Cheat Sheets** unter `/endfield/cheatsheets/` und `/en/endfield/cheatsheets/`; Text zweizeilig „Cheat / Sheets“, Wrench-Icon, drei vorbereitete Karten:
  - `#ElasticGoods` – **Elastic Goods – Best Prices**;
  - `#Artificing` – **Veredelungs-Matrix – Best Matches** / **Refinement Matrix – Best Matches**;
  - `#Bufffood` – **Buff Food – Matrix**, besonderer Speedrun-Fokus auf ANG/ATK, Ultimate-Gain und andere Combat-Stats.
- Nur die Themen und Designcards stehen fest. **Keine erfundenen Preise, Veredelungswerte, Nahrungseffekte oder Rankings.**
- Beide Bereiche sind in `src/lib/i18n/site.mjs` für hreflang und über den gemeinsamen `EndfieldNav.astro` als bestehende DE/EN-Gleichheit integriert.

## 6. Übergabe und Abnahme

- Tests `scripts/endfield/threats-matrix-nav-countdown.test.mjs` prüfen 85 echte SKPORT-IDs und WebP-Magic, die sieben Bossgruppen inklusive zwei Variantengruppen, Si-Provisorium, vier Slot-WebPs, Matrix-Schema/Schalter, NEW-Card, Farben, DE/EN-Routen und absolute Countdown-Zeit.
- Chromium-Smoke `scripts/endfield/browser-smoke.py` erweitert um 1440/390 px und DE/EN, Matrix-Klappverhalten, zweizeilige Bereiche, Navigation, Countdown und fehlende Si-Wiki-ID.
- Roadmap bei jedem Entwicklungsschritt aktualisieren; 100-MB-Endfield- und 1-GB-Pages-Grenze und echte Pages-Publikation prüfen.
- **Fabrik bleibt laut früherer Entscheidung ausgesetzt.** An Fabrik-Guide-Konzept oder Fabrik-Seiten nichts verändern.
