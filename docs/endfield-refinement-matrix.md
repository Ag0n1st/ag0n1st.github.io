# Veredelungs-Matrix / Artificing Good Matches (v1.6)

**Stand: 27.10.2026.** DE/EN auf einer gemeinsamen Datenquelle. Dokumentierter Aufgaben-/Release-Kontext: `ROADMAP.md` §18.47.

## Datenbasis und Quellengrenze

- Primärdaten: `src/data/endfield/catalog/equipment-details.json`, offizieller SKPORT-Wiki-Snapshot, mit Gear-IDs und vollständigen statischen `artificing`-Tabellen. Der ursprüngliche Snapshot vom 15.10. enthielt **258 Gear-IDs**, davon 167 mit Veredelungswidget.
- Mit anonymem öffentlichen SKPORT-Katalog/Item-Detailabruf am 27.10. wurden **18 zusätzliche offizielle Gear-IDs 1380–1397** mit Name, Slot, Stat- und Veredelungswidget nachgewiesen. Der Katalog enthält danach **276 Gear-Items**. Importbericht `src/data/endfield/catalog/v16-skport-import.json`.
- Die 18 lokalen optimierten WebP-Icons (`public/images/endfield/gear/<id>.webp`) stammen aus den offiziellen CDN-Pfaden. Das Browser-Frontend lädt nur die lokal ausgelieferte statische Website, keine API-Requests an SKPORT.
- Bei den neuen Items sind **12 Herstellungsrezepte weiterhin `needs-review`**. Ihre unbelegten Kosten bleiben ausdrücklich unbestätigt; ein verifiziertes `artificing`-Widget und die Verfügbarkeit einer verifizierten Grundrezepttabelle sind unterschiedliche Tatsachen.
- **Namensdopplung:** `Type 50 Yinglung Gloves` existiert unter SKPORT-IDs `411` (älter) und `1381` (v1.6). Nur die numerische ID ist eindeutig; die Namen dürfen niemals automatisch dedupliziert werden. Frühere Community-v1.6-Gear-Vorschauen bleiben mit ihren redaktionell getrennten Slug-IDs bestehen und behaupten keine offizielle ID-Identität.

## Darstellung und Good Matches

Die erste Cheat-Sheet-Card enthält **22 explizit vorgegebene Kategorien**, DE/EN parallel: vier Hauptattribute; neun Schadensboni; neun weitere Werte. Drei Tabbereiche machen die mobile Nutzung ohne horizontal scrollende Gesamttabelle möglich. Jede Attributkarte zeigt **Armor, Gloves, Kit** als drei kleine Karten nebeneinander. Verfügbare offizielle Teile verwenden die gemeinsame `ItemIcon.astro`-/`ItemDetailPopup.astro`-Vorschau per Hover/Fokus/Tap; vorhandene `T1/T2/S1/S2`-Suffixe werden aus dem echten Namen abgeleitet und unten rechts angezeigt.

**Wert- und Rankingregel:** Für eine der 22 Kategorien wird je Gear-Slot nur der größte positive **`Default`-Wert in der offiziellen `Artificing`-Tabelle** berücksichtigt, nicht der Basisstat des Items oder ein Stufe-3-Wert. Offizielle Schreibvarianten und Wiki-Tippfehler werden anhand einer expliziten Alias-Liste in `src/lib/endfield/refinementMatrix.mjs` auf das gleiche Attribut normalisiert. Gleichstände werden deterministisch mit Level, Name und offizieller numerischer ID aufgelöst; alle Kandidaten sind im lokalen Snapshot weiterhin vorhanden. Gewinner pro Klasse bekommen den gelben Indikator **Good Match / Gute Übereinstimmung**, weil gleiche Attribute und Slot-Klassen relevant sind und Armor-/Gloves-/Kit-Grundwertbereiche nicht quer miteinander verglichen werden dürfen. **Das Gewinneritem ist kein passender Veredelungspartner für sich selbst.** Leere Slots erscheinen als `—`; insbesondere bleibt `ANG / ATK` ohne offizielles passendes Veredelungsitem leer.

`src/components/pages/EndfieldCheatSheets.astro` setzt die Card **vor** die übrigen Rubriken. Die Legacy-Anker `#refinement` und `#artificing` bleiben erhalten, auch die alten DE/EN-Redirects. Deutsch und Englisch nutzen dasselbe Datenmodell und vollständige, separat definierte Labeltexte.

## QA und Updates

Nach offiziellem Patchdaten-Refresh das konsolidierte Snapshot-/Icon-Manifest und `v16-skport-import.json` nachvollziehbar aktualisieren. Kein ungefragtes Überschreiben manueller Builds/Guide-Texte. Prüfungen: `npm run test:endfield` inklusive `scripts/endfield/refinement-matrix.test.mjs`, Endfield-100-MB-Gate, `npm run build`, 1-GB-Pages-Gate, `scripts/endfield/browser-smoke.py` mit Desktop 1440 px und Mobil 390 px für DE/EN einschliesslich Tabs und Item-Popup. Veröffentlichung nur nach grüner PR-CI, Merge und dokumentiertem erfolgreichen Pages-Deploy.
