# Endfield: Blaupausen-Fundortrecherche und überprüfbare Zuordnungen

**Präzisionsupdate (15.10.2026):** Die ältere, nachfolgend dokumentierte
Set-Zuordnung mit 100 Kandidaten dient nur noch als **Fallback**.
Aus der Talos-Wiki-Kistentabelle wurden inzwischen 113 **explizite
Einzelteil-Links** extrahiert und mit Endfield Hubs individuellen Fundorten
abgeglichen. **92 der 125 offiziell als Kistengear geführten Teile**
haben dadurch eine konkrete recherchierte Kiste ohne Quellenkonflikt,
**23 sind widersprüchlich**, **10 noch offen**.
Den aktuellen Einzelteil-für-Einzelteil-Nachweis mit SKPORT-IDs enthält
[die präzise Kistenauswertung](endfield-blueprint-piece-audit.md).
Keine Community-Fundortangabe belegt bereits eine offizielle Marker-ID
oder die tatsächlich erworbene Blaupause.

**Recherche-Snapshot:** 15.10.2026, Version **Sanctuary of Ink**.

## Quellen und Qualitätsstufen

**Offizielle Grundlage:** Die SKPORT-Wiki liefert **258 offizielle Ausrüstungs-IDs** mit
Herstellungsrezept und Erwerbsweg. Die offiziellen SKPORT Map Tools liefern **27 genaue
Kistenmarkierungen** mit eindeutigen IDs, Gebieten und Koordinaten. Sie nennen aber
bei diesen Markierungen **keine konkreten enthaltenen Ausrüstungs-IDs**.

**Community-Ergänzung:** Game8 und NerdsChalk benennen in 15 Fällen konkrete
Fundortmarken und Gear-Sets bzw. einzelne Teile; zwei unabhängige Quellen
stimmen insbesondere für die 12 Kisten in Jingyu Valley und Wuling City überein.
Talos Wiki und Video-Guides liefern für weitere neun Gebiete/Kisten
Fundortmarken, aber noch keine überprüfbaren Gear-Inhalte.

**Ergebnis des offiziellen Gear-ID-Abgleichs:**

| Kennzahl | Ergebnis |
| --- | ---: |
| Offizielle Gear-Einträge | 258 |
| Davon Erwerbsweg „Gear Template Crate“ | 125 |
| Mit mindestens einem Community-Gebietskandidaten | 100 |
| Davon mehr als ein mögliches Gebiet | 21 |
| Ohne ausreichend konkrete Recherche-Zuordnung | 25 |
| Community-Kistenhinweise gesamt | 27 |
| Mit benannten Gear-Belohnungshinweisen | 15 |
| Ohne inhaltliche Belohnungszuordnung | 12 |
| Offiziell bestätigte individuelle Marker-zu-Gear-Verknüpfungen | **0** |

**Sehr wichtig:** Diese 100 Gear-IDs sind **Kandidaten** anhand der benannten
Set-Familien. Sie sind *keine* Behauptung, dass jeder Gegenstand in einem
bestimmten Behälter steckt. Ein Set kann Vorlagen in verschiedenen Gebieten
haben. Die 21 mehrdeutigen Kandidaten sind ausdrücklich gekennzeichnet.

## Übersicht der 27 untersuchten Wuling-Kisten

Das erste Feld ist ein selbstgewählter stabiler **Recherche-Identifier**,
kein offizieller SKPORT-Marker. Ohne eindeutig bekannte Kartenkoordinaten
bleibt `officialMarkerId` in den Quelldaten absichtlich `null`.

| Recherche-ID | Gebiet | Community-Fundorthinweis | Belohnungshinweis | Belege |
| --- | --- | --- | --- | --- |
| `jingyu-valley-1` | Jingyu Valley | Passage northwest of Gloomvale | Swordmancer (Set-Hinweis); LYNX Gauntlets (Einzelteil) | `game8-crates`, `nerds-jingyu` |
| `jingyu-valley-2` | Jingyu Valley | Dock at Stragglers Ford | Eternal Xiranite (Set-Hinweis) | `game8-crates`, `nerds-jingyu` |
| `jingyu-valley-3` | Jingyu Valley | Cliff north of Sky King Flats | Tide Surge (Set-Hinweis); Eternal Xiranite Aux Arm (Einzelteil) | `game8-crates`, `nerds-jingyu` |
| `jingyu-valley-4` | Jingyu Valley | North of Ecological Research Station, city approach | Type 50 Yinglung (Set-Hinweis) | `game8-crates`, `nerds-jingyu` |
| `wuling-city-1` | Wuling City | Cliff north of Chenshan Way | Hot Work (Set-Hinweis) | `game8-crates`, `nerds-city` |
| `wuling-city-2` | Wuling City | Building east of Bureau of Swordmancers | Frontiers (Set-Hinweis) | `game8-crates`, `nerds-city` |
| `wuling-city-3` | Wuling City | Roof east of Residential Area square | Frontiers (Set-Hinweis); MI Security (Set-Hinweis) | `game8-crates`, `nerds-city`, `nerds-landmark-detail` |
| `wuling-city-4` | Wuling City | Monitoring Center entrance | MI Security (Set-Hinweis) | `game8-crates`, `nerds-city` |
| `wuling-city-5` | Wuling City | Riverbank Grotto | Bonekrusha (Set-Hinweis) | `game8-crates`, `nerds-city` |
| `wuling-city-6` | Wuling City | Northwest of Field Logistics Depot, by TP | Bonekrusha (Set-Hinweis); Pulser Labs (Set-Hinweis) | `game8-crates`, `nerds-city` |
| `wuling-city-7` | Wuling City | Upper level, Institute of Materials Science | LYNX (Set-Hinweis) | `game8-crates`, `nerds-city` |
| `wuling-city-8` | Wuling City | Roof east of Citizen Square, jump pads | Æthertech (Set-Hinweis); LYNX Aegis Injector (Einzelteil) | `game8-crates`, `nerds-city` |
| `qingbo-stockade-1` | Qingbo Stockade | Main Fort, beside Delta Bot | Type 50 Yinglung Heavy Armor (Einzelteil); Frontiers Fiber Gloves (Einzelteil) | `game8-crates` |
| `qingbo-stockade-2` | Qingbo Stockade | Watchtower west of Cuprium Ore Mining Spot | Bonekrusha (Set-Hinweis); Frontiers Protection Suit (Einzelteil) | `game8-crates` |
| `qingbo-stockade-3` | Qingbo Stockade | South of Bladewoods, near Blight Obstruction | MI Security T1 (Set-Hinweis); Frontiers Accessories (Einzelteil) | `game8-crates` |
| `marker-stone-1` | Marker Stone | Watchtower Reservoir Station B1, first template crate | Ungeklärt | `talos-gear`, `factory-tutorial` |
| `marker-stone-2` | Marker Stone | Watchtower Reservoir Station B1, second template crate | Ungeklärt | `talos-gear`, `factory-tutorial` |
| `marker-stone-3` | Marker Stone | Beside entrance to Marker Stone Interiors | Ungeklärt | `talos-gear`, `factory-tutorial` |
| `marker-stone-interiors-1` | Marker Stone Interiors | One crate shown in official interiors map | Ungeklärt | `official-map` |
| `sword-vault-dale-1` | Sword Vault Dale | South Gorge Rampart | Ungeklärt | `talos-gear`, `youtube-sword` |
| `sword-vault-dale-2` | Sword Vault Dale | North Gorge Crag | Ungeklärt | `talos-gear`, `youtube-sword` |
| `yinglung-pass-1` | Yinglung Pass | Pass-Side Canal | Ungeklärt | `talos-gear`, `youtube-yinglung` |
| `yinglung-pass-2` | Yinglung Pass | Stonepond Cliff | Ungeklärt | `talos-gear`, `youtube-yinglung` |
| `snowy-forest-1` | Snowy Forest | Hoarfrost Woods | Ungeklärt | `talos-gear`, `youtube-snowy` |
| `snowy-forest-2` | Snowy Forest | Snowpriestess's Cabin | Ungeklärt | `talos-gear`, `youtube-snowy` |
| `sis-painting-1` | Si's Painting | Exact landmark still unverified (official marker A) | Ungeklärt | `official-map`, `official-patch-1_6` |
| `sis-painting-2` | Si's Painting | Exact landmark still unverified (official marker B) | Ungeklärt | `official-map`, `official-patch-1_6` |

## Gebietszugang: Hinweise, nicht automatisch bestätigte Story-Gates

Die Community beschreibt Eingänge zwischen Gebieten. Ein Eingang beweist **nicht**,
dass eine bestimmte Hauptmission der einzige Weg zur Freischaltung ist.
Das Register `story-areas.json` bleibt deshalb von diesen Hinweisen getrennt.

| Gebiet | Beobachteter Eingang von |
| --- | --- |
| Wuling City | Jingyu Valley |
| Qingbo Stockade | Wuling City |
| Marker Stone | Wuling City |
| Marker Stone Interiors | Marker Stone |
| Sword Vault Dale | Qingbo Stockade |
| Yinglung Pass | Wuling City |
| north-wuling-exclusion-zone | Yinglung Pass |
| Snowy Forest | Yinglung Pass |
| Si's Painting | north-wuling-exclusion-zone |

Konkretere Story-Hinweise werden in
`blueprint-community-claims.json` unter `areaProgressHints` gepflegt.
Besonders relevant sind die Nebenmission **Deep Vaulted Steel** für
Sword Vault Dale, Typhoeus' Narrative Event für **Snowy Forest**
und die Story-/Eventvoraussetzung um **Chapter II Process VIII**
für **Si's Painting**. Für diese Hinweise ist jeweils ein Quellen- und
Prüfstatus hinterlegt. Keine davon wird als automatisch bestätigter
Gebietszugang missverstanden.

## Die heute neue Version (15.10.2026)

Die GRYPHLINE-Patchnotes führen neue Ausrüstungsteile für
**Pulser Labs, Eternal Xiranite, Rift Trekker, Type 50 Yinglung und AIC Fieldwork**
auf. Gleichzeitig existieren in Si's Painting **zwei offiziell kartierte Kisten**.
**Es gibt noch keinen belastbaren Beleg**, welche der neuen Teile in welcher
dieser Kisten enthalten sind. Deshalb dürfen wir weder sämtliche neuen
Teile pauschal Si's Painting zuschreiben noch älteren Set-Teilen
ihre bereits bekannten Erwerbswege überschreiben.

## Struktur für die Website und spätere eigene Korrekturen

- `src/data/endfield/progression/blueprint-community-claims.json`:
  Transparente Quellen, 27 recherchierte Kistenbeschreibungen,
  Set- und Einzelteilhinweise, Gebietseingänge sowie Story-Hypothesen.
- `src/data/endfield/progression/blueprint-research-index.json`:
  Reproduzierbarer ID-basierter Abgleich mit den **offiziellen Gear-Daten**.
  Wird mit `node scripts/endfield/build-blueprint-index.mjs` neu erzeugt.
- `src/lib/endfield/blueprintResearch.mjs`: Regelt den konservativen Abgleich.
- `src/lib/endfield/gearBlueprintResearch.ts`: Website-Schnittstelle für
  mögliche Fundgebiete, Community-Belege und später bestätigte Kisten.
- `src/data/endfield/progression/blueprint-confirmations.json`:
  **Von dir manuell bestätigte** Gear-ID zu SKPORT-Marker-ID-Verbindungen.
  Die Liste ist zunächst leer.
- `src/lib/endfield/blueprintConfirmations.mjs`: Validiert jeden manuellen
  Eintrag gegen die vorhandenen offiziellen Gear- und Karten-IDs.
- `src/data/endfield/progression/gear-template-crates.json`:
  Originale SKPORT-Kistenmarkierungen; weiterhin ohne erfundene Inhalte.

### So prüfst du künftig einen Fundort

1. In `blueprint-research-index.json` die Gear-ID und Kandidatengebiete nachsehen.
2. In `blueprint-community-claims.json` über die `claimId` den Fundorthinweis
   und die Quellen öffnen.
3. Die entsprechende Kiste im Spiel besuchen und ihre **konkreten Vorlagen**
   mit den SKPORT-Gear-Namen/IDs vergleichen.
4. Die betreffende offizielle `markerId` aus
   `gear-template-crates.json` heraussuchen (Gebiet und XYZ-Koordinaten).
5. In `blueprint-confirmations.json` unter `confirmedLinks` die Gear-ID
   und Marker-ID sowie Nachweismethode, Datum, Name und Notiz ergänzen.
6. `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`
   und `npm run build` ausführen; anschließend über GitHub Desktop committen.

**Beispielformat – nicht als bestätigte Daten importieren:**

```json
{
  "gearId": "271",
  "markerId": "<tatsaechliche 32-stellige SKPORT-ID>",
  "checkedOn": "2026-10-15",
  "evidenceType": "in-game",
  "evidenceNotes": "Auf dieser Kiste diese Gear-Vorlage persönlich gesehen.",
  "reviewedBy": "Ag0n1st"
}
```

**Der Build-Finder darf vorläufige Kandidaten nicht automatisch freischalten.**
Die Website zeigt höchstens ausdrücklich gekennzeichnete Fundorthinweise
und Links auf die Community-Belege. Level und Fabrikfortschritt bleiben
wie bisher aus den offiziellen Rezepten abgeleitet. Der echte Besitz
von Blaupausen und Storyfortschritt wird später separat geprüft.

## Recherchierte öffentliche Quellen

| ID | Quelle | URL |
| --- | --- | --- |
| `official-map` | SKPORT Endfield Map Tools | https://game.skport.com/map/endfield |
| `official-wiki` | SKPORT Wiki official Gear acquisition and recipes | https://wiki.skport.com/endfield |
| `game8-crates` | Game8: Gear Template Crate Interactive Map and Locations | https://game8.co/games/Arknights-Endfield/archives/577443 |
| `nerds-jingyu` | NerdsChalk: Jingyu Valley Gear Template Crates | https://nerdschalk.com/arknights-endfield-jingyu-valley-template-crates-all-4-locations/ |
| `nerds-city` | NerdsChalk: Wuling City Gear Template Crates | https://nerdschalk.com/all-wuling-city-gear-template-crate-locations-in-arknights-endfield/ |
| `talos-gear` | Endfield Talos Wiki: Gear Template Crate location table | https://endfield.wiki.gg/wiki/Gear |
| `talos-sword` | Endfield Talos Wiki: Search for Sword Vault Dale | https://endfield.wiki.gg/wiki/Search_for_Sword_Vault_Dale |
| `talos-nexus` | Endfield Talos Wiki: Nexus Files | https://endfield.wiki.gg/wiki/Nexus_Files |
| `factory-tutorial` | END Wiki: Gear Templates Marker Stone Area tutorial | https://endfield.games/en/tutorials/factory/?t=fac-port |
| `youtube-sword` | TheSams x Gaming: 2 Gear Template Crates in Sword Vault Dale | https://www.youtube.com/watch?v=-qK4Kc-VsZk |
| `youtube-yinglung` | ON Game: Yinglung Pass 100% exploration | https://www.youtube.com/watch?v=3dtz1X73hl8 |
| `youtube-snowy` | ON Game: Snowy Forest 100% exploration | https://www.youtube.com/watch?v=1a5FMyhN7CA |
| `official-patch-1_6` | GRYPHLINE: Sanctuary of Ink (Oct 15) update notes | https://endfield.gryphline.com/en-us/news/9560 |
| `official-patch-1_3` | GRYPHLINE: Sword Vault Dale opening and updates | https://endfield.gryphline.com/en-us/news/0758 |
| `nerds-landmark-detail` | NerdsChalk: Residential Area crate navigation | https://nerdschalk.com/residential-area-gear-template-crate-location-arknights-endfield/ |
| `talos-city-route` | Endfield Talos Wiki: Wuling City | https://endfield.wiki.gg/wiki/Wuling_City |
| `talos-qingbo-route` | Endfield Talos Wiki: Qingbo Stockade | https://endfield.wiki.gg/wiki/Qingbo_Stockade_%28location%29 |
| `talos-marker-route` | Endfield Talos Wiki: Marker Stone | https://endfield.wiki.gg/wiki/Marker_Stone |
| `talos-marker-interiors-route` | Endfield Talos Wiki: Marker Stone Interiors | https://endfield.wiki.gg/wiki/Marker_Stone_Interiors |
| `talos-sword-route` | Endfield Talos Wiki: Sword Vault Dale | https://endfield.wiki.gg/wiki/Sword_Vault_Dale |
| `talos-yinglung-route` | Endfield Talos Wiki: Yinglung Pass | https://endfield.wiki.gg/wiki/Yinglung_Pass |
| `talos-exclusion-route` | Endfield Talos Wiki: North Wuling Exclusion Zone | https://endfield.wiki.gg/wiki/North_Wuling_Exclusion_Zone |
| `talos-snowy-route` | Endfield Talos Wiki: Snowy Forest | https://endfield.wiki.gg/wiki/Snowy_Forest |
| `talos-painting-route` | Endfield Talos Wiki: Si's Painting | https://endfield.wiki.gg/wiki/Si%27s_Painting |
| `talos-inky-event` | Endfield Talos Wiki: All the Inky Hues | https://endfield.wiki.gg/wiki/All_the_Inky_Hues |
