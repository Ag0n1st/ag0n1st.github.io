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

Die Patchnotes bestätigen die **Region Wuling**, das Gebiet **Wuling City** und das
neu eingeführte Gebiet **Si's Painting**. Zudem nennen sie den neuen Hauptstoryinhalt
bis einschließlich **Chapter II Process VIII: Paint with Fresh Ink**. Daraus
folgt ausdrücklich **nicht**, dass gerade der Abschluss dieser Mission als
Zugangsvoraussetzung zu Si's Painting oder einer bestimmten Blaupause gilt.

Valley IV (im Projekt **Tal4**) ist ebenfalls offiziell als Region belegt.
Konkrete Untergebiete nehmen wir erst nach offiziell belegter Benennung und
Blueprint-Relevanz in das Register auf.

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

## Noch offene Recherche

- Für Tal4 und Wuling: tatsächlich Blueprint-relevante Teilgebiete und
  ihre überprüfbaren Freischaltquests ermitteln.
- Für `sis-painting`: konkreter Gebietszugang und individuelle Fundorte
  neuer Gear-Blaupausen anhand offizieller, eindeutig zuordenbarer Daten prüfen.
- Zusätzliche Fortschrittsmerkmale (Autoritätslevel, Warenumverteilung,
  erhaltene Blueprint-Kisten) im späteren UI erfassbar machen.

**Kein Einfluss auf die derzeitige Website:** Der Build-Finder wird hier
noch nicht erweitert. Diese Änderung schafft zunächst nur ein geprüftes
Register und seine wiederverwendbaren Auswertungsfunktionen; bestehende
redaktionelle Guide-Daten bleiben unberührt.
