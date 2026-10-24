# Endfield – offizielle Spieldaten ohne externe Datenbank

> **Aktueller SKPORT-Datenstand 24.10.2026:** Die historische Entwicklung in den nachfolgenden Abschnitten beschreibt die damaligen Einzelimporte. Inzwischen sind **33/34 eindeutige Operatoren** durch echte öffentliche SKPORT-`item/info`-Antworten erfasst. Die drei ursprünglichen Vollprofile (Liino, Typhoeus, Si) wurden nicht überschrieben. **30 zusätzliche Profile**, inkl. 4×12 Skillränge und – für Arcane – den drei zusätzlichen WILL-Varianten, sowie **180 optimierte offizielle SKPORT-Cover/Illustrationen/Skillicons** wurden auf einem anonymen Chromium-Workflow importiert. Nur **Argent Flow** (Debüt 05.11.2026) ist bislang nicht erfasst; bei Endministrator fehlen im öffentlichen Wiki weiterhin die Effekte von Potenzial 4/5 (keine erfundenen Daten). Die vollständigen Quellnachweise, Tests und Befehle sind unter **[`docs/endfield-operator-import-status.md`](../../docs/endfield-operator-import-status.md)** dokumentiert. Neue Importer: `import-public-skport-all.mjs`, `probe-public-operator.mjs`; Parser `import-operator.mjs` erkennt Yvonnes Rangschreibweise, Arcanes Dual-Skills und unbekannte Potenziale. Der ältere manuelle JSON-Workflow bleibt als Fallback bestehen.



## Aktueller Aufbau

- **Redaktionelle Guides:** `src/content/operator-guides/<slug>.md` – deine Texte, Bewertungen, Builds und Teams.
- **Importierte Spieldaten:** `src/data/endfield/operators/<slug>.json` und `<slug>.extra.json` – lokale, versionierte Snapshots.
- **Deutsche Texte:** `src/data/endfield/locales/de/<slug>.json` – bewusst separat gepflegt, keine Überschreibung durch einen Datenimport.
- **Bilder/Icons:** `public/images/endfield/operators/<slug>/` – lokale statische Dateien, soweit verfügbar.
- **Astro-Seiten:** `src/pages/endfield/operatoren/[slug].astro` – eine Vorlage für jeden veröffentlichten Guide.

Der gesamte Seitenaufruf funktioniert ohne Datenbank oder SKPORT-API-Verbindung. Bei vorhandenen lokalen Grafiken wird auch kein SKPORT-CDN benötigt.

## Bestätigter Import zweier echter SKPORT-Operatoren

- **Typhoeus**, offizieller Wiki-Eintrag `1173`, auf Basis des öffentlichen Exports vom 12.10.2026.
- **Liino**, offizieller Wiki-Eintrag `1041`, auf Basis der anonymen Browser-Abfrage vom 15.10.2026: **6★ Electric Supporter, Polearm, TGCC**, vier Skills mit je zwölf Rang-/Meisterschaftsstufen, fünf Talentknoten, sieben Promotions-/Outfittings, fünf Potenziale und 22 Materialnamen.
- Bei Liino besitzen der Attribut-Talentknoten und die Potenziale **zusätzliche Metadatentabellen**. `import-operator.mjs` identifiziert deshalb die eigentlichen Tabellen anhand ihrer Struktur und bewahrt weitere Tabellen gesondert auf, statt sie mit Skill-/Potenzialwerten zu vermischen.
- Die Liino-Grafiken wurden wie bei Typhoeus in WebP komprimiert und im Repository gespeichert. Alle angezeigten Datenseiten werden aus lokalen Dateien generiert.
- **Liino-Guide-Vorschau:** `src/content/operator-guides/liino.md` mit `status: preview`. Die eigenen Wertungen, Teams und Builds sind bewusst noch nicht ausgefüllt.
- **Deutsche Übersetzungen:** `src/data/endfield/locales/de/liino.json`. Die englischen offiziellen Texte bleiben in der Rohdatendatei zur Gegenprüfung erhalten.

Ein öffentliches, **anonymes** Abrufen einzelner Operatoren wurde mit `scripts/endfield/probe-liino-wiki.mjs` und dem GitHub-Workflow `probe-liino-wiki.yml` erfolgreich getestet. Dies ist noch kein vollständig automatisierter Sammelimport für sämtliche Operatoren. Für weitere Operatoren müssen ihre offiziellen IDs ermittelt und die Extraktion überprüft werden.

## Neuer allgemeiner Operator-Importer

`scripts/endfield/import-operator.mjs` benötigt keine fest eincodierte Operator-ID, keine vorab bekannte Tab-ID und keinen Typhoeus-Namen. Er sucht die Kapitel anhand ihrer Widget-Titel (Combat Skills, Basic Information, Level Up, Talent Nodes, Elite, Potential Phases) und prüft jede referenzierte Dokument-/Tabellen-ID.

**Benötigte lokale Dateien:**

1. Ein **öffentlicher** SKPORT-Wiki-Eintrag als JSON (Antwort `/web/v1/wiki/item/info?id=...`, alternativ genau eine entsprechende öffentliche Antwort aus einem Netzwerkmitschnitt).
2. Die **öffentliche** Itemnamen-Tabelle aus `/web/v1/wiki/item/list`, als reines `response.data.items`-Objekt.

Beide ausschließlich unter dem nicht versionierten `local-data/` ablegen. Keine Account-Antworten, Cookies oder Login-Daten in ein öffentliches Repository übernehmen.

Beispiel für eine spätere Operator-ID und einen Slug:

```bash
node scripts/endfield/import-operator.mjs \
  --input local-data/skport/new-operator.json \
  --items local-data/skport/public-items-index.json \
  --id 1234 \
  --slug neuer-operator \
  --snapshot 2026-10-15 \
  --out-dir src/data/endfield/operators
```

**`1234` ist lediglich eine Beispiel-ID!** Die tatsächliche öffentliche Item-ID muss vorher aus der Wiki ermittelt werden. Der Import bricht bei unpassender ID, fehlenden Skilltypen, Level-/Materialreferenzen oder unbekannten Tabellenschemata ab, statt Werte zu erfinden. Bei Operatoren mit einer anderen Wiki-Struktur muss der Parser gegebenenfalls erweitert werden.

Die zwei erzeugten Dateien werden anschließend lokal mit `npm run build` geprüft und in GitHub eingecheckt. Erst dann sind ihre Spieldaten im Astro-Build verfügbar. Eine automatische Anmeldung oder ein neues API-Konto ist nicht vorgesehen. Der öffentliche Browser-Abruf wurde für Liino getestet; ein generischer, selbstständig sämtliche Operatoren aktualisierender Abruf fehlt noch.

**Tests:** `npm run test:endfield`. Die generischen Tests nutzen zusätzlich synthetische Fehlerfälle. Darüber hinaus wurde die vollständige Extraktion **mit dem echten Liino-Wiki-Eintrag** bestätigt.


## Offizieller SKPORT-Grafikkatalog und Speicherbudget

- **Quelle ausschließlich:** öffentliche offizielle SKPORT-Endfield-Wiki, keine sekundären Datenbanken.
- **Kategorien (Snapshot 2026-10-15):** Operatoren 35, Waffen 84, Ausrüstung (Gear) 258, Item Files 340, Valuables Stash 223; insgesamt **940** offizielle Item-IDs.
- **Dateiformat:** Statische **WebP**-Icons nach offiziellen Kategorien: `operators/icons/`, `weapons/`, `gear/`, `materials/`, `valuables/`, jeweils unter `public/images/endfield/`. Bereits vorhandene Operator-Cover von Typhoeus und Liino werden ohne zweite Kopie referenziert.
- **Manifest:** `src/data/endfield/catalog/items.json` (Item-ID, Name, Kategorie, lokaler Bildpfad, Quelle).
- **Wiederverwendung:** `src/lib/endfield/itemCatalog.ts`, `src/components/endfield/ItemIcon.astro` und `MaterialCosts.astro`. Aufstiegs-, Level-, Skill- und Talentmaterialien zeigen WebP-Icons mit Mengenangabe und barrierefreiem Materialnamen. Fehlende Bilder fallen auf Text zurück.
- **Größenmessung:** 938 neue Originalbilder (161.381.687 Byte) wurden auf **14.941.296 Byte** WebP reduziert. Einschließlich der vorhandenen Operatorbilder, JSON-Daten und derzeitigen Endfield-Code-Dateien: **17.124.917 Byte** bei der ersten Importmessung.
- **Endfield-Grenze:** **100.000.000 Byte** (dezimal 100 MB). `node scripts/endfield/check-budget.mjs` kontrolliert sie vor Asset-Commits, Pull-Request-Builds und Deployments. Der Wert zählt den aktuellen Dateibestand, nicht sämtliche alten Git-Objekte; dank vorhandene-Bilder-überspringen vermeidet die Synchronisierung unnötige neue Versionen.
- **Manueller Workflow:** `.github/workflows/import-endfield-catalog-assets.yml` synchronisiert nur öffentliche Katalog-Cover, keine kompletten Galerie-Grafiken oder GIFs/Videos. Bereits gespeicherte WebP-Dateien werden standardmäßig nicht erneut geladen.
- **Redaktionelle Daten:** Material-IDs und Spielwerte bleiben in offiziellen Snapshot-Dateien, subjektive Builds und Bewertungen in den Markdown-Guides.

## Offizielle Waffen- und Ausrüstungsdetaildaten

Die ID-basierte Datenbank für **84 Waffen** und **258 Ausrüstungsteile** wird ausschließlich aus der offiziellen öffentlichen SKPORT-Wiki erzeugt. Der Katalog und die 940 lokalen WebP-Grafiken bilden den Schlüssel.

- `scripts/endfield/equipment-normalize.mjs` validiert offizielle Wiki-Widgets (Attribute Preview, Tuning, Skill Details & Essence, Potential Phases, Stats, Artificing und Gear Pack). Keine Bewertungen oder Empfehlungen aus Drittquellen.
- `scripts/endfield/import-equipment.mjs` liest öffentliche Wiki-Einträge anonym mit Chrome und erzeugt einen **lokalen, überprüfbaren Snapshot**. Das Script lässt Werte leer bzw. setzt `incomplete`, wenn offizielle Detail-Werte fehlen.
- `src/data/endfield/catalog/equipment-details.json` speichert die validierten Ergebnisse nach dem importierenden GitHub-Actions-Lauf. Die Website lädt nur diese Datei, niemals die Live-API.
- `src/lib/endfield/equipmentDetails.ts` und die Waffen-/Ausrüstungsabschnitte der Operator-Vorlage verknüpfen die Daten mit redaktionellen Empfehlungen.
- Die Schreibweise `weaponId` und `equipment.builds[].items` in den Guide-Templates akzeptiert die **offizielle numerische Item-ID als String** oder den aus dem englischen SKPORT-Namen abgeleiteten Slug. Beispiel: `"1046"` oder `"bedazzling-night-debut"`. Ein numerischer Eintrag ist eindeutiger und empfohlen.
- `standardRecipe` bleibt bei **offiziellen Standard-Herstellungskosten**, nicht alternativen Verfahren aus anderen Wikis. Bei der ersten Wiki-Darstellung erscheinen Mengen oft **vor** den Materialnamen. Der generische `import-equipment.mjs`-Workflow wartet deshalb auf die vollständig aufgelösten Zutaten und speichert außerdem die wörtlich angegebenen Blaupausen-Freischaltungen (`acquisitionNotes`). Bei nicht zuverlässig erkennbaren Rezepten wird `recipeStatus: needs-review` gesetzt.
- **Build-Finder:** bleibt ein separat zu entwickelndes Feature. Hersteller- und Fabrikfreischaltungen dürfen nicht allein aus einem Level oder Rezept erschlossen werden.
- Die 100-MB-Endfield-Grenze wird vor Datencommits und beim GitHub-Pages-Build kontrolliert.

### Veröffentlichungsprüfung für Ausrüstungsstufen

Die offizielle SKPORT-Wiki enthält für alle 258 Gear-Einträge `Stats`, aber nur für 167 davon auch `Artificing`. Fehlende Veredelung ist auf frühen Gear-Stufen kein Beweis für fehlende Grundwerte: solche Datensätze gelten mit offiziellen Stats als **verified**, das fehlende Veredelungs-Widget wird als `artificingStatus: not-listed` ausgewiesen. Bei den vier neuen Waffen ohne Detail-Widgets lautet der Status weiterhin `incomplete`.

### Abschlussstand des offiziellen SKPORT-Imports vom 15.10.2026

- **80 Waffen** besitzen vollständige Attribute-, Tuning-, Effekt- und Potenzial-Widgets.
- **4 neuere Waffen** (Wiki-IDs 1280–1283) besitzen aktuell noch keine auslesbaren Detail-Widgets. Diese Werte bleiben leer und werden nicht erfunden.
- **258 Ausrüstungsteile** haben offizielle Stats. Bei **167** ist zusätzlich Artificing dokumentiert; die übrigen 91 bleiben mit Stats gültig.
- **258 von 258 Ausrüstungsteilen** haben ein eindeutig aus der offiziellen Website identifiziertes Standard-Herstellungsrezept. Für frühe Gear-Teile wurden die nachgeladenen Materialnamen gezielt kontrolliert.
- Offizielle Blaupausen-Freischalttexte werden mitgeführt, aber nicht automatisch zu einer subjektiven Progressions- oder Build-Empfehlung verarbeitet.
- Die einmaligen Diagnose-Workflows sind nach Prüfung entfernt worden. Die allgemeine Import-Action bleibt manuell ausführbar.

## Build-Finder: sieben Komponentenstufen statt pauschaler Fabrikfortschritt

Der Build-Finder und künftig weitere Endfield-Frameworks beziehen ihre gemeinsame
Progressionsdefinition aus `src/lib/endfield/buildFinder.mjs`. Diese Klassifikation
wurde redaktionell anhand der Komponenten festgelegt. **Offizielle SKPORT-IDs**,
**WebP-Bilder** und **Standard-Herstellungsrezepte** stammen aus unserer lokalen
Wiki-Datenbank. Es werden keine anderen Wikis benötigt.

| Tier | Komponentenname auf der Website | Offizielle Item-ID | Gear-Level | Spielphase |
| --- | --- | --- | --- | --- |
| 1 | Amethyst-Komponente | 525 | 20/28 | Early-Game |
| 2 | Ferrium-Komponente | 526 | 36 | Early-Game |
| 3 | Cryston-Komponente | 527 | 50 | Early-Game |
| 4 | Xiranit-Komponente | 528 | 60/70 | Mid-Game |
| 5 | Cuprium-Komponente | 747 | 70 | Mid-Game |
| 6 | Hetonit-Komponente | 844 | 70 | End-Game |
| 7 | Pyrrolit-Komponente | 1067 | 70 | End-Game |

**Standardwert im Build-Finder ist immer Pyrrolit**, die letzte verfügbare
Komponentenstufe. Das Ausrüstungslevel ist separat auf Level 70 vorausgewählt.
Alle sieben Einträge sind auswählbar und nach Early-/Mid-/End-Game gruppiert.

### Automatische Einstufung eines Builds

1. Die vier ID-basierten Ausrüstungsteile des **redaktionellen Builds** werden
   anhand der offiziellen lokalen Detaildaten geladen.
2. Der Finder prüft für jedes Teil ausschließlich das dokumentierte
   **Standard-Herstellungsrezept**. Er ermittelt daraus die höchste Komponentenstufe.
   Stock Bills sind **keine** Komponentenstufe.
3. Unabhängig davon gilt das höchste offizielle Gear-Level der vier Teile oder
   ein noch höheres redaktionelles `availableFromLevel`.
4. Die vier Level-10-Basic-Gear-Teile bestehen ausschließlich aus Origocrust
   und Wood; sie zählen als **Vorstufe vor Amethyst**, ohne einen achten Eintrag
   in der Fabrikauswahl hinzuzufügen.
5. Falls ein Material unbekannt, ein Rezept nicht vollständig oder ein
   Ausrüstungsteil nicht validiert ist, lautet der Status `unverified`.
6. **Story- und Facility-Freischaltungen sind getrennte Voraussetzungen.**
   Komponentenstufe und Ausrüstungslevel beweisen keine Story-Freigabe.
   Dafür dokumentiert der Guide-Autor optional den konkreten Nachweis:

```yaml
equipment:
  builds:
    # Für reale Builds die IDs erst nach eigener Empfehlung eintragen.
    - id: beispiel
      title: "Nur ein Schema-Beispiel"
      role: support
      items: ["1246", "1245", "1244", "1243"]
      availableFromLevel: 70
      storyUnlock: "Belegte Story-/Blaupausen-/Facility-Voraussetzung"
```

**Wichtig:** Das obige YAML ist ausschließlich ein Syntaxbeispiel. Es stellt
keine getestete Build-Empfehlung und keine verifizierte Freischaltung dar.
Ohne `storyUnlock` bleibt die Story-Verfügbarkeit ausdrücklich **ungeklärt**.
Sobald Level und Komponenten erfüllt sind, wird ein Build deshalb noch nicht
automatisch als verfügbar bezeichnet.

Je nach Auswahl weist die UI „Passend“, „Level zu niedrig“, „Komponente fehlt“,
„Story ungeklärt“ oder „Rezept/Daten ungeklärt“ aus. Gesperrte und ungeprüfte
redaktionelle Builds können durch den expliziten Schalter eingeblendet werden.
Persönliche Builds und Team-Empfehlungen werden weiterhin ausschließlich in
`src/content/operator-guides/<slug>.md` gepflegt.

**Tests:** `scripts/endfield/build-finder.test.mjs` prüft alle sieben
Komponenten-IDs, die 258 offiziellen Standardrezepte, gemischte vierteilige
Builds, die Level-10-Ausnahme sowie ungeklärte Story-Voraussetzungen.

## Bilder lokal sichern (ohne GIF/Video)

`scripts/endfield/sync-assets.mjs` kopiert ausschließlich die aus unseren JSON-Daten bekannten SKPORT-PNG-, JPEG- oder WebP-URLs für Cover, Illustration und Skill-Icons ins Repository. GIFs, Videos und zusätzliche unbekannte URLs werden ausgeschlossen.

```bash
npm run assets:endfield
# Optional nur einen Operator:
npm run assets:endfield -- --slug typhoeus
```

Alternativ: <https://github.com/Ag0n1st/ag0n1st.github.io/actions/workflows/sync-endfield-assets.yml> → **Run workflow**. Diese Action synchronisiert die Bilder, installiert einmalig den WebP-Optimierer `sharp`, reduziert die Bildgrößen und committet ausschließlich die optimierten statischen Bilddateien. Anschließend startet sie den GitHub-Pages-Deploy.

Bereits gespeicherte Assets werden standardmäßig nicht überschrieben. Die Website bevorzugt lokale Kopien; andernfalls bleiben die in den importierten Daten hinterlegten SKPORT-CDN-URLs als Übergangslösung bestehen.

Für **Typhoeus und Liino** sind jeweils Cover, Illustration und vier Skill-Icons als WebP im Repository gesichert. Die Skill-Icons liegen jetzt unter `operators/<slug>/skills/`. Die sechs Typhoeus-Dateien benötigen zusammen rund **0,74 MB statt zuvor 4,70 MB**. GIFs, Videos und Animationen werden nicht importiert.

**Bildrechte:** Die Rechte an offiziellen Spielgrafiken liegen weiterhin bei den jeweiligen Rechteinhabern. Die Wiki ist als Quelle gekennzeichnet; das gilt nicht als eigene Nutzungsrechtsfreigabe.

## Weiterhin wichtig

- Deutsch ist bei **Typhoeus und Liino** eine **redaktionelle Übersetzung** der englischen SKPORT-Daten; kein offiziell bestätigtes deutsches Skript.
- SKPORT-Werte werden nicht mit deiner eigenen Skill-Priorität oder deinen Builds vermischt.
- Nach einem Import braucht es einen neuen GitHub-Build, um aktualisierte Webseiten zu veröffentlichen.
- Fehlt die API, bleiben die letzte geprüfte JSON-Version und die bereits generierte Website nutzbar.

---

## Vorherige Typhoeus-spezifische Verarbeitung


## Status

Die öffentliche SKPORT-Antwort vom 12.10.2026 (Wiki-Item **1173**) wurde auf folgende Strukturen geprüft und ihre Ergebnisse wurden getrennt ins GitHub-Repository übernommen:

- `src/data/endfield/operators/typhoeus.json`: Stammdaten sowie **4 Fertigkeiten × Rang 1–9 + Meisterschaft I–III**, mit englischen Originalkennzahlen.
- `src/data/endfield/operators/typhoeus.extra.json`: **6 Attributstufen, 7 Promotions/Outfittings, 5 Talentknoten, P1–P5 und 15 Materialnamen** mit Item-IDs und Mengen.
- `src/content/operator-guides/typhoeus.md`: Deine **redaktionellen Texte**, unabhängig vom Datenimport.

Die vorhandene Astro-Vorlage verwendet diese beiden JSON-Datensätze. Wir benötigen für diese Seiten **keine laufende Datenbank und keine Live-Anbindung** an SKPORT.

### Was die Quelldaten tatsächlich enthalten

- Operatorattribute: **LV.1 / 20 / 40 / 60 / 80 / 90**; Hauptattribut **Agility**, Sekundärattribut **Will**. Diese Level haben **nichts** mit unserem Ausrüstungsfilter (50/60/70) zu tun.
- Talentknoten: **Skirmisher** (Attribut-Knoten), **Prey Checklist** und **Huntress's Focus** (Combat Talents), **Lithic Murmurs** und **Life in the Spores** (Schiffstalente).
- Aufstieg: Promotion I–IV und Outfitting I–III. Voraussetzungen und Kosten wurden getrennt übernommen.
- Potenziale: **Samifjod Fletching, Huntress's Stride, Thorny Trap, No Escape, Fatal Shot**.
- Materialnamen aus der separat mitgelieferten öffentlichen `/web/v1/wiki/item/list`-Antwort: Item-ID, englischer Name, im Import gespeicherte Kostenmenge.

## Für zukünftige lokale Updates

**Wichtig:** Der originale Browser-Netzwerkmitschnitt kann auch Antworten von Account-/Login-Anfragen enthalten. Diese Rohdatei bitte **niemals** öffentlich in GitHub speichern oder teilen. `local-data/` ist in `.gitignore` ausgeschlossen.

Speichere einen eigenen Roh-Mitschnitt lokal als:

`local-data/skport/skport-relevant.json`

Danach im Projektordner:

```bash
npm run test:endfield

node scripts/endfield/import-typhoeus.mjs \
  --input local-data/skport/skport-relevant.json \
  --snapshot 2026-10-12 \
  --out-dir src/data/endfield/operators

npm run build
```

`--snapshot` immer auf das tatsächliche Datum der jeweiligen Aufnahme setzen. Das Programm verarbeitet nur die öffentliche SKPORT-Typhoeus-Item-Antwort und die öffentliche Item-Namensliste, nicht die übrigen Anfragen des Mitschnitts. Bei unvollständigen Skill-Tabellen, ungültigen Zuordnungen oder fehlenden Materialnamen bricht es ab.

**Vor dem Commit** die Änderung der generierten Daten vergleichen. Bei unplausiblen API-Änderungen den alten, gültigen JSON-Stand in Git beibehalten.

Für einzelne öffentliche Antworten ohne Netzwerk-Mitschnitt:

```bash
node scripts/endfield/skport-extras.mjs \
  --input local-data/skport/typhoeus-public-item.json \
  --items local-data/skport/public-items-index.json \
  --snapshot 2026-10-12 \
  --out src/data/endfield/operators/typhoeus.extra.json
```

Die Datei `public-items-index.json` muss hierbei das Objekt `response.data.items` aus der öffentlichen Wiki-Itemlisten-Antwort enthalten.

Die Testdateien `skport-extract.test.mjs` und `skport-extras.test.mjs` laufen vor jedem GitHub-Pages-Deployment.

## Fachliche Einschränkungen

- **Stand und Sprache:** Originaldaten sind auf Englisch (EN). Eine deutsche Lokalisierung müssen wir separat einrichten.
- **Werte:** Die Tabellenstruktur wurde auf Basis der Aufnahme kontrolliert, aber nicht jeder Zahlenwert mit dem laufenden Spiel gegengeprüft.
- **Bewertungen:** Persönliche Builds, Teamlisten, Prozent-Vergleiche und Skill-Prioritäten sind **nicht** aus der SKPORT-API abzuleiten. Diese bleiben in den Markdown-Guides.
- **Grafiken:** Die Quelle liefert URLs zu Operator-Artwork, Icons und teilweise Animationen. Die Dateibereinigung/Optimierung für unser Repository ist ein eigener Schritt; Videos/GIFs sollen nicht lokal gehostet werden.
- **Materialkosten:** Wir zeigen die im SKPORT-Export je Fertigkeitsstufe angegebenen Materialkosten an, ohne unbestätigte Gesamtkosten zu errechnen.
- **Ausfall:** Wenn die Quelle nicht erreichbar ist, baut Astro mit den letzten im Repository gespeicherten Dateien weiter. Kein Supabase erforderlich.


## Story- und Gebietsfilter (Build-Finder)

Der Build-Finder prüft inzwischen **vier einzelne Blaupausen** pro Build
zusätzlich zu Level und Fabrikkomponente. Die zentrale Auswahl nutzt
Tal4/Wuling, 19 offizielle Einzelgebiete, optionale Autoritäts-/Warenumverteilungs-
werte und eine lokale Checkbox für den tatsächlich vorhandenen
Blaupausenbesitz je Gear-ID. Die Story-/Gebietseingaben bleiben im Browser
und benötigen keinen Login. Die letzte Fabrikkomponente (Pyrrolit)
ist beim Laden immer vorausgewählt.

Bei vorhandenen, aber nicht eindeutig durch Quellen bestätigten Fundorten
werden die Builds weiterhin als **ungeklärt** behandelt. Freier
`storyUnlock`-Text erlaubt keine automatische Freischaltung.

Ausführliche Entwickler- und Datenpflegehinweise:
`docs/endfield-story-build-filter.md`.

## Blaupausen-Recherche (offizielle Kisten + Community-Fundorte, Oktober 2026)

Nach der offiziellen Gebiets- und Markergrundlage wurde eine **eigenständige, klar
als Community-Recherche gekennzeichnete** Fundortdatenbank angelegt:

- `src/data/endfield/progression/blueprint-community-claims.json`:
  27 quellenverlinkte Wuling-Kistenhinweise, davon 15 mit Set-/Einzelteilangaben;
  bekannte Gebietseingänge und Story-Hinweise werden separat gesammelt.
- `src/data/endfield/progression/blueprint-research-index.json`:
  100 vorläufige Gear-ID-Kandidaten aus 125 offiziellen Kistenerwerbswegen;
  21 mit mehreren möglichen Gebieten, 25 ohne hinreichend konkrete Zuordnung.
- `src/data/endfield/progression/blueprint-confirmations.json`:
  für später **persönlich bestätigte** Gear-ID plus Marker-ID-Verbindungen.
- `src/lib/endfield/blueprintResearch.mjs`, `blueprintConfirmations.mjs` und
  `gearBlueprintResearch.ts`: reproduzierbare Datenverknüpfung,
  Bestätigungsvalidierung und Website-Lookup.
- `docs/endfield-blueprint-research.md`: sämtliche 27 Hinweise, Quellen,
  Gebiets-/Storyrecherche und editierbarer Bestätigungsprozess.

Alle vorläufigen Hinweise werden auf der Website als Community-Recherche
gekennzeichnet. **Kein unbestätigter Fundort entsperrt automatisch einen Build.**
Bei neuen Einträgen `node scripts/endfield/build-blueprint-index.mjs`
ausführen, danach `npm run test:endfield` und `npm run build`.
## Konkrete Kisteninhalte pro Ausrüstungsteil (15.10.2026)

Die frühere datenbankweite **Set-Näherung** aus dem 27-Kisten-Fundortindex
wurde durch eine zweite, genauere Ebene ergänzt:

- `src/data/endfield/progression/blueprint-wiki-crate-contents.json`:
  **24 Kisten**, **113 einzelne Wiki-Gear-Icon-Links**, **112 Gear-IDs**;
  davon drei Erwerbsartkonflikte und ein doppelter Name auf zwei Kisten.
- `src/data/endfield/progression/gear-piece-acquisition-sources.json`:
  exakter Name und Erwerbsort von **258 offiziellen Gear-IDs** aus der
  261-zeiligen Community-Datenbank Endfield Hub. 69 Einzelteil-Fundorte
  stimmen direkt mit dem offiziellen Kistenerwerb überein; widersprüchliche
  Erwerbsarten bleiben gesondert erhalten.
- `src/data/endfield/progression/blueprint-precise-gear-index.json`:
  **92 von 125 offiziellen Kisten-Gear-Teilen** haben jetzt eine konkrete
  vorläufige Kiste ohne Quellenkonflikt (53 mit Bestätigung durch beide
  Community-Quellen, 38 aus der Wiki-Einzelteilliste, 1 aus Endfield Hub).
  **23** sind umstritten, **10** ohne Einzelfundort. Die old Set-Hints
  bleiben nur letzte Orientierung, nie konkrete Freischaltungsnachweise.
- `docs/endfield-blueprint-piece-audit.md`: vollständige Einzelteilliste
  für alle 24 recherchierten Kisten, SKPORT-IDs, offene Teile und Konflikte.
- `src/lib/endfield/preciseBlueprints.mjs` vereinigt beide Quellen
  deterministisch; `gearBlueprintResearch.ts` bietet auf der Website
  Einzelteil-Fundorte mit eigener Quellenkennzeichnung und Konkurrenzangaben an.

**Nicht automatisch freischalten:** Selbst zwei übereinstimmende Community-Quellen
bestätigen nicht den tatsächlichen Besitz der Vorlage und noch keine
konkrete **offizielle** Marker-ID. Die offizielle SKPORT-Erwerbsart
wird bei Datenkonflikten nicht ersetzt.

**Aktualisierung (lokal, manuell):**
`node scripts/endfield/import-gear-piece-sources.mjs`,
`node scripts/endfield/import-wiki-crate-contents.mjs` und
`node scripts/endfield/build-precise-blueprints.mjs` ausführen.
Danach `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`
und `npm run build`. Die 3 Import-Skripte laden ausschließlich textuelle
Metadaten; **keine** Bilder, GIFs oder Videos.

V1.6: Die zwei Si's-Painting-Kisten haben im bisherigen Wiki-Einzelteilindex
noch keine benannten Inhalte; keine neuen Gegenstände werden geraten.
## Technischer Aufbau

`scripts/endfield/skport-extract.mjs` erkennt das Skill-Widget. Die früher verwechselten IDs `gIuAIUyt`, `0ctR1S1J`, `CqJxefHj`, `tVlf3UYx` sind **Beschreibungsdokumente** und nicht Tab-IDs. Jeder Skill besitzt eine getrennte Tabellen-Dokumentreferenz.

`scripts/endfield/skport-extras.mjs` extrahiert weitere, im `chapterGroup` ausdrücklich benannte Widgets und ihre relationalen `documentMap`-Tabellen, einschließlich referenzierter Material-IDs.

`scripts/endfield/import-typhoeus.mjs` führt beide Schritte zusammen und erzeugt nach Validierung die beiden versionierten Operator-JSON-Dateien.

Offizielle Quelle: https://wiki.skport.com/endfield

### Endfield-Assetbibliothek: Kategorisiert, ohne neue Bilddateien

Die frühere Catch-all-Struktur wurde am 15.10.2026 durch Verschieben unveränderter Original-WebPs aufgeteilt:

```text
public/images/endfield/
├── operators/
│   ├── icons/                         33 Katalog-Operatoren
│   ├── liino/                         cover.webp, illustration.webp, skills/
│   └── typhoeus/                      cover.webp, illustration.webp, skills/
├── weapons/                           84 Katalog-WebPs
├── gear/                              258 Katalog-WebPs
├── materials/                         340 Item-Files-WebPs
└── valuables/                         223 Valuables-Stash-WebPs
```

**Operator-Cover von Liino und Typhoeus werden weiterhin direkt wiederverwendet.**
Die 940 offiziellen Item-IDs bleiben unverändert. `src/data/endfield/catalog/items.json` enthält ihre jeweiligen kanonischen `iconPath`-Werte. Alle 342 Waffen- und Ausrüstungs-Detaildatensätze referenzieren dieselben Pfade.

**Speicher und Git:** 938 Katalog-WebPs und 8 Skill-WebPs wurden weder heruntergeladen noch konvertiert, sondern byte-identisch verschoben. Der Git-Blob-SHA-Vergleich gegen den ursprünglichen `main`-Stand ergab **0 Abweichungen**. Bei weiterhin **950 Bildern und 16.537.472 Bytes Bilddaten** entstehen in der Git-Historie nur die zusätzlichen Commit-/Tree-Metadaten, keine neuen unterschiedlichen Bildobjekte. Die 100-MB-Endfield-Grenze bleibt aktiv.

**Zukünftige Importe:** `scripts/endfield/catalog-assets.mjs` speichert neue SKPORT-Cover direkt im jeweiligen Kategorieziel; `sync-assets.mjs` nutzt für Operator-Skills die Ordner `operators/<slug>/skills/`. `scripts/endfield/asset-layout.test.mjs` prüft über `npm run test:endfield` sämtliche Bildpfade und die gemeinsamen Waffen-/Ausrüstungsreferenzen.
