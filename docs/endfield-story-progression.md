# Endfield: Story-, Gebiets- und Blaupausen-Register

Stand: 15.10.2026. **Nur offiziell bestätigte Angaben** werden als Fakten übernommen.

## Datenlage und Quellen

- Offizielle GRYPHLINE-Patchnotes für **[Sanctuary of Ink]** vom 15.10.2026:
  https://endfield.gryphline.com/en-us/news/9560
- Offizielle GRYPHLINE-DEV-Comm vom 07.10.2026:
  https://endfield.gryphline.com/en-us/news/7014
- Offizielle GRYPHLINE-DEV-Comm zur Regionalentwicklung:
  https://endfield.gryphline.com/en-us/news/1340
- Offizieller lokaler SKPORT-Snapshot für 258 Ausrüstungseinträge:
  `src/data/endfield/catalog/equipment-details.json` (`acquisitionNotes`).

Die offiziellen Patchnotes belegen mehrere Gebiete in **Wuling**, insbesondere
**Wuling City** sowie das neu eingeführte **Si's Painting**. Zudem nennen sie den neuen Hauptstoryinhalt
bis einschließlich **Chapter II Process VIII: Paint with Fresh Ink**. Daraus
folgt ausdrücklich **nicht**, dass gerade der Abschluss dieser Mission als
Zugangsvoraussetzung zu Si's Painting oder einer bestimmten Blaupause gilt.

Valley IV (im Projekt **Tal4**) ist ebenfalls offiziell als Region belegt.
Die von GRYPHLINE verlinkte offizielle SKPORT-Karte bestätigt sechs Kartenebenen in Tal4 und dreizehn in Wuling. Die geografische Relevanz einzelner Ausrüstungsblaupausen ist separat zu prüfen.

## Bestätigte Wuling-Gebiete und Veröffentlichungsdaten

Die folgenden Namen sind jeweils durch offizielle GRYPHLINE-Patchnotes bestätigt.
Die Veröffentlichung eines Gebiets ist **kein** Beweis dafür, dass es in
dieser Reihenfolge durch die Hauptstory freigeschaltet wird oder dort bestimmte
Blaupausen liegen.

| Gebiet | In Patchnotes genannt | Offizielle Quelle |
| --- | --- | --- |
| Wuling City | Grundgebiet, Datum hier noch ungeklärt | GRYPHLINE 2026-03-12 |
| Qingbo Stockade | 12.03.2026 | https://endfield.gryphline.com/en-us/news/8907 |
| Marker Stone | 17.04.2026 | https://endfield.gryphline.com/en-us/news/0751 |
| Test Area | 17.04.2026 | https://endfield.gryphline.com/en-us/news/0751 |
| Sword Vault Dale | 05.06.2026 | https://endfield.gryphline.com/en-us/news/0758 |
| Yinglung Pass | 16.07.2026 | https://endfield.gryphline.com/en-us/news/5200 |
| North Wuling Exclusion Zone | 16.07.2026 | https://endfield.gryphline.com/en-us/news/5200 |
| Si's Painting | 15.10.2026 | https://endfield.gryphline.com/en-us/news/9560 |

Die offizielle Juli-Mitteilung dokumentiert zudem einen Weg zum **früheren
Wuling-Zugang**: Nach der Hauptmission *Chapter I Process II: Remediation Progress*
kann über das Event Center die Mission *Chapter II Process I: Arrival at Wuling*
vorgezogen angenommen werden. Damit ist **nicht** bewiesen, dass der reine
Abschluss von Kapitel I, Prozess II schon den Regionszugang bestätigt.

Die Patchnotes vom 15.10.2026 nennen neue Teile für **Type 50 Yinglung,
Pulser Labs, Eternal Xiranite, Rift Trekker und AIC Fieldwork**, jedoch
keine Liste ihrer individuellen Blaupausenfundorte. Die Gear-IDs werden
erst bei belegter Zuordnung eingetragen.

Die von GRYPHLINE ausdrücklich verlinkten offiziellen **SKPORT Map Tools**
finden sich unter https://game.skport.com/map/endfield (vgl.
https://endfield.gryphline.com/en-us/news/9562). Die Website liefert
ohne Login eine Karte mit Gebieten und Positionsmarkierungen.
**Die Detailprüfung hat ergeben:** Die Karte enthält in Wuling 27 Gear-Template-Crate-Punkte, liefert für diese Marker aber keine einzelnen Gear-IDs und keine Inhaltsbeschreibungen. Die Kistenstandorte sind damit belegbar, ihre Inhalte noch nicht.

## Erwerb: Zugang, Belohnungsberechtigung und Besitz

Die Funktionen in `src/lib/endfield/storyAreas.mjs` kennen die Zustände
`unverified`, `locked`, `eligible` und `acquired`.

- **Authority Level Reward:** Bei erreichtem Level ist die Vorlage höchstens
  *eligible*; ihre Abholung muss separat bestätigt werden.
- **Wuling Stock Redistribution:** Eine ausreichende Stufe ist ebenfalls
  keine Bestätigung des tatsächlichen Erwerbs.
- **Wuling Region Story Progress:** Der ausdrücklich bestätigte Regionszugang
  kann als *eligible* gelten. Daraus wird nicht auf eine konkrete Kiste geschlossen.
- **Gear Template Crate:** Solange der einzelne Fundpunkt und der tatsächliche
  Besitz ungeklärt sind, bleibt sie *unverified*.
- **Explizit erhaltene Blaupausen:** Nur ein bestätigter Besitz wird als
  *acquired* ausgewiesen.

## Bestandsaufnahme: Wie die offizielle Wiki Blaupausen beschreibt

Die 258 Gear-Einträge wurden ausschließlich anhand ihres tatsächlichen
`Gear Template Acquisition Method`-Feldes aus der SKPORT-Wiki gruppiert.

| Erwerbsweg aus offizieller SKPORT-Wiki | Gear-Einträge | Belastbarkeit |
| --- | ---: | --- |
| Gear Template Crate | 125 | Behälter genannt; **kein** Gebiet/konkreter Fundpunkt |
| Authority Level Reward | 86 | Autoritätslevel genannt; kein Gebiet |
| Wuling Stock Redistribution (Level 1–3) | 20 | Regionaler Tausch/Fortschritt; kein Fundgebiet |
| Game progress reaches the [Wuling] region | 15 | **Regionszugang** belegt, Gebiet/Fundpunkt nicht |
| Keine Acquisition Notes | 12 | Ungeklärt; keine Annahmen |
| **Gesamt** | **258** | |

Für sechs der 15 Wuling-Zugangs-Einträge wird zusätzlich ein
Version-Update-Hinweis aufgeführt. Dieser ist kein zusätzlicher
Freischalt-Meilenstein. Die aktuelle Version ergänzt neue Ausrüstungsteile
mehrerer bestehender Sets; die offiziellen Patchnotes enthalten keine vollständige
Liste mit individuellen Fundorten der Blaupausen.

## Dateistruktur und Erweiterung

- `src/data/endfield/progression/story-areas.json` enthält Regionen, bestätigte
  Gebiete, freigegebene Storyinhalte, Quellen und später verifizierte Zuordnungen.
- `src/lib/endfield/storyAreas.mjs` klassifiziert die offiziellen Erwerbswege,
  validiert das Register und wertet Gebietszugang konservativ aus.
- `scripts/endfield/story-areas.test.mjs` schützt gegen erfundene
  Blaupausenfundorte und spekulative Missionsabhängigkeiten.

Die stabilen IDs sind z.B. `valley-iv`, `wuling`, `wuling-city` und `sis-painting`.
Story-Meilensteine, Gebietszugänge und der **Besitz einer Blaupause** sind
drei verschiedene Dinge. In der aktuellen Version des Registers sind
`blueprintAreaLinks` deshalb noch **leer**.

**Späteres Vorgehen je Gear-ID:**

1. Offiziellen Erwerbsweg im lokalen SKPORT-Datensatz prüfen.
2. Wenn ausdrücklich ein benanntes Gebiet und ein nachprüfbarer Blueprint-Fundort
   vorliegen, diesen mit Item-ID, Gebiets-ID, offizieller Quelle und Verifikationsstatus
   in `blueprintAreaLinks` hinterlegen.
3. Das Gebiet nur dann von einem Story-Meilenstein abhängig machen, wenn
   genau dieser Zusammenhang offiziell belegbar ist.
4. Im Build-Finder getrennt prüfen: Gear-Level, benötigte
   Fabrikkomponente, Gebietszugang, Blueprint-Besitz, Zusatzbedingungen
   wie Autoritätslevel oder regionale Warenumverteilung.
5. Fehlende Belege führen zu **ungeklärt**, nicht zu **freigeschaltet**.

Ein Nutzer kann später ein tatsächlich freigeschaltetes Gebiet ausdrücklich
angeben. Das bestätigt aber noch **nicht** automatisch, dass sämtliche
Blaupausen innerhalb des Gebiets eingesammelt wurden.


## Offizieller SKPORT-Kartensnapshot: 19 Gebiete, 27 Gear Template Crates

Die zugehörigen **unveränderten Quellenangaben** kommen direkt aus den anonym
abrufbaren SKPORT Map Tools:

- Offizieller Kartenbereich: https://game.skport.com/map/endfield
- Öffentliche SKPORT-Map-Endpunkte: `map/tree`, `map/mark/list`,
  `map/mark/info` innerhalb von `/web/v1/game/endfield/`.
- `src/data/endfield/progression/story-areas.json`: **6 Tal4-Kartenebenen** und
  **13 Wuling-Kartenebenen** mit offiziellen `officialMapLevelId`-Schlüsseln.
- `src/data/endfield/progression/gear-template-crates.json`: 27 amtliche
  Wuling-Markierungs-IDs, `areaId`, `officialMapLevelId`,
  dreidimensionale `position` und explizit **leere** `containedGearIds`.
- Importer: `scripts/endfield/import-official-gear-map.mjs`.

| Offizielles Wuling-Gebiet | Gear-Template-Crate-Markierungen |
| --- | ---: |
| Jingyu Valley | 4 |
| Wuling City | 8 |
| Qingbo Stockade | 3 |
| Marker Stone | 3 |
| Marker Stone Interiors | 1 |
| Sword Vault Dale | 2 |
| Yinglung Pass | 2 |
| Snowy Forest | 2 |
| Si's Painting | 2 |
| **Gesamt** | **27** |

Die übrigen Wuling-Kartenebenen wie Test Area, Suiming, North Wuling
Exclusion Zone und Main Pillar Office haben im aktuellen offiziellen
Snapshot keine Gear-Template-Crate-Markierungen. Das ist kein endgültiger
Nachweis, dass dort niemals Baupläne zu erhalten sind.

**Wichtige Quellenbeschränkung:** Alle 27 markierten Kisten wurden zusätzlich
über den öffentlichen Endpunkt `mark/info?mapId=map02&markId=<id>` geprüft.
Die Detailantwort enthielt bei keiner Kiste eine Gear-Wiki-ID oder eine
Inhaltsbeschreibung. Folglich sind **0 der 125 durch Gear Template Crate
erhältlichen Gear-Einträge** derzeit einer **einzelnen offiziellen Kiste**
zugeordnet. Wir dürfen diese beiden Zahlen nicht miteinander verwechseln.

Auch ein bestätigter Kistenort beweist noch keine Freischaltung der
betreffenden Storymission oder das tatsächliche Einsammeln durch den Spieler.
Diese beiden Bedingungen bleiben separate Felder.
## Noch offene Recherche

- Für die 27 offiziellen Wuling-Kisten: die jeweils enthaltenen Gear-Vorlagen,
  ihre Story-Zugangsvoraussetzungen und eine belegbare Gear-ID-Zuordnung ermitteln.
- Für `sis-painting`: konkreter Gebietszugang und individuelle Fundorte
  neuer Gear-Blaupausen anhand offizieller, eindeutig zuordenbarer Daten prüfen.
- Zusätzliche Fortschrittsmerkmale (Autoritätslevel, Warenumverteilung,
  erhaltene Blueprint-Kisten) im späteren UI erfassbar machen.

**Kein Einfluss auf die derzeitige Website:** Der Build-Finder wird hier
noch nicht erweitert. Diese Änderung schafft zunächst nur ein geprüftes
Register und seine wiederverwendbaren Auswertungsfunktionen; bestehende
redaktionelle Guide-Daten bleiben unberührt.
