# Endfield Build-Finder: Story, Gebiete und Blaupausen

Stand 15.10.2026. Diese Funktion erweitert die bereits vorhandene
Progression aus Operator-Level und Amethyst- bis Pyrrolit-Komponente.

## Was der Filter tatsächlich prüft

Ein redaktioneller Build besteht aus genau **vier** offiziellen SKPORT-Gear-IDs.
Für die Einstufung **Passend** müssen alle folgenden Bedingungen erfüllt sein:

1. Alle vier Ausrüstungsteile und ihre Standardrezepte sind offiziell validiert.
2. Das ausgewählte Level reicht für alle vier Teile aus.
3. Die höchste herstellbare Komponente deckt alle vier Standardrezepte ab.
4. Der Nutzer hat die **Blaupausen aller vier einzelnen Teile ausdrücklich als
   erhalten markiert**.

Der Fundort darf dafür unbekannt sein: Wer eine Blaupause bereits besitzt,
muss sie nicht noch einmal im Spiel suchen. Die Checkbox bezieht sich
aber ausdrücklich auf den tatsächlichen Besitz, nicht nur die Möglichkeit,
eine Vorlage zu finden.

## Story- und Gebietsfilter

Die Website bietet eine eigenständige Regionsauswahl (`Tal4` / `Wuling`),
darunter **19 einzelne Gebiete** aus dem offiziellen SKPORT-Kartenregister
(6 in Tal4, 13 in Wuling). Ein Häkchen bedeutet, dass der Nutzer das
Gebiet nach eigener Angabe bereits betreten kann. Ein späteres Storykapitel
schaltet die Gebiete **nicht automatisch** frei. Nebenmissionen und
Erkundungsgebiete können parallele Wege besitzen.

Für die 125 Gear-Einträge mit offizieller Erwerbsart `Gear Template Crate`
wertet der Finder die neueste **einzelteilbezogene** Recherche aus.
Nur eindeutig einem einzelnen Gebiet zugeordnete Teile erhalten
eine konkrete Gebietsvoraussetzung. Quellenkonflikte oder
Set-Familien-Vermutungen reichen nicht aus, um eine gesicherte
Freischaltung zu behaupten. Selbst bei bestätigtem Gebiet bleibt
die Blaupause **unbestätigt**, bis der Nutzer ihren Besitz markiert.

Zusätzlich sind zwei optionale Fortschrittsfelder vorhanden:
Autoritätslevel und Stufe der Wuling-Warenumverteilung.
Sie werden nur bei den entsprechenden offiziellen Gear-Erwerbswegen
berücksichtigt. Eine ausreichende Stufe bedeutet `eligible` bzw.
noch nicht bestätigte Vorlage, nicht automatisch `available`.

**Die bekannten Quest-Namen stehen weiterhin im zentralen Register**
`src/data/endfield/progression/story-areas.json`.
Da keine belastbaren einzelnen Quests für sämtliche Gebiete vorliegen,
wird absichtlich keine lineare Kapitel-zu-Gebiet-Tabelle erfunden.

## Anzeigestatus

| Status | Bedeutung |
| --- | --- |
| Passend | Level, Komponenten und alle vier Blaupausen bestätigt |
| Level zu niedrig | Das offiziell benötigte Gear-Level ist höher |
| Komponente fehlt | Höhere Fabrikkomponente aus offizieller Rezeptliste nötig |
| Region fehlt | Die benötigte Region wurde noch nicht erreicht |
| Gebiet nicht bestätigt | Konkretes einzelteilbezogenes Kistengebiet nicht abgehakt |
| Freischaltung fehlt | Autoritätslevel/Warenumverteilung zu niedrig |
| Blaupause nicht bestätigt | Gebiet/Erwerbsbedingung erreichbar, Besitz noch offen |
| Story/Fundort ungeklärt | Nicht zugeordneter oder widersprüchlicher Fundort |

Die Ergebnisse führen zu **keiner** Änderung der offiziellen Gear-Dateien.
Freiform-Text `equipment.builds[].storyUnlock` bleibt redaktioneller
Hinweis, kann aber eine fehlende Blaupause nicht mehr freischalten.

## Speicherung ohne Konto

Story-Region, einzelne freigeschaltete Gebiete, Autoritätslevel,
Warenumverteilung und bestätigte individuelle Gear-IDs bleiben ausschließlich
im Browser-`localStorage` unter
`ag0n1st:endfield:build-story-progress:v1`. Das funktioniert
über mehrere Operator-Guides hinweg, soweit derselbe Browser verwendet wird.
Es gibt eine Schaltfläche zum Zurücksetzen. Die aktuelle Auswahl der
Fabrikkomponente startet bewusst **immer mit Pyrrolit** – der letzten
Komponentenstufe – auch wenn der Browser ältere Formularwerte wiederherstellt.

Nicht gespeicherte/ungeklärte Angaben werden nie automatisch als
abgeschlossene Quests oder gesammelte Blaupausen interpretiert.

## Pflege und Regression

- Story/Karten: `src/data/endfield/progression/story-areas.json`.
- Einzelfundorte: `blueprint-precise-gear-index.json` und
  `src/lib/endfield/gearBlueprintResearch.ts`.
- Erwerbswege: offizielles `equipment-details.json`.
- Statuslogik: `src/lib/endfield/buildFinder.mjs` und
  `src/lib/endfield/buildStoryProgress.mjs`.
- Oberfläche: `src/components/operator/sections/OperatorEquipment.astro`
  und `src/components/operator/OperatorGuide.astro`.
- Tests: `scripts/endfield/build-finder.test.mjs`,
  `scripts/endfield/build-story-progress.test.mjs`.

Prüfen mit `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`
und `npm run build`. Es werden keine neuen Bilder benötigt.

**Redaktionelle Builds werden hier noch nicht ergänzt.**
Liino und Typhoeus behalten ihre bisherigen Guide-Inhalte.
Wenn vier echte redaktionelle Gear-IDs eingetragen sind, wertet
der Finder sie automatisch über dieselbe gemeinsame Logik aus.
