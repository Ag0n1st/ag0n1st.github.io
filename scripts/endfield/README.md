# Endfield – offizielle Spieldaten ohne externe Datenbank

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
- **Dateiformat:** statische **WebP**-Icons, ein Bild pro offizieller Item-ID in `public/images/endfield/items/<id>.webp`. Bereits vorhandene Operator-Cover von Typhoeus und Liino werden ohne zweite Kopie referenziert.
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
- `standardRecipe` bleibt bei **offiziellen Standard-Herstellungskosten**, nicht alternativen Verfahren aus anderen Wikis. Bei der ersten Wiki-Darstellung erscheinen Mengen oft **vor** den Materialnamen. `fill-standard-recipes.mjs` wartet deshalb auf die vollständigen, namentlich aufgelösten Zutaten und speichert außerdem die wörtlich angegebenen Blaupausen-Freischaltungen (`acquisitionNotes`). Bei nicht zuverlässig erkennbaren Rezepten wird `recipeStatus: needs-review` gesetzt.
- **Build-Finder:** bleibt ein separat zu entwickelndes Feature. Hersteller- und Fabrikfreischaltungen dürfen nicht allein aus einem Level oder Rezept erschlossen werden.
- Die 100-MB-Endfield-Grenze wird vor Datencommits und beim GitHub-Pages-Build kontrolliert.

## Bilder lokal sichern (ohne GIF/Video)

`scripts/endfield/sync-assets.mjs` kopiert ausschließlich die aus unseren JSON-Daten bekannten SKPORT-PNG-, JPEG- oder WebP-URLs für Cover, Illustration und Skill-Icons ins Repository. GIFs, Videos und zusätzliche unbekannte URLs werden ausgeschlossen.

```bash
npm run assets:endfield
# Optional nur einen Operator:
npm run assets:endfield -- --slug typhoeus
```

Alternativ: <https://github.com/Ag0n1st/ag0n1st.github.io/actions/workflows/sync-endfield-assets.yml> → **Run workflow**. Diese Action synchronisiert die Bilder, installiert einmalig den WebP-Optimierer `sharp`, reduziert die Bildgrößen und committet ausschließlich die optimierten statischen Bilddateien. Anschließend startet sie den GitHub-Pages-Deploy.

Bereits gespeicherte Assets werden standardmäßig nicht überschrieben. Die Website bevorzugt lokale Kopien; andernfalls bleiben die in den importierten Daten hinterlegten SKPORT-CDN-URLs als Übergangslösung bestehen.

Für **Typhoeus und Liino** sind jeweils Cover, Illustration und vier Skill-Icons als WebP im Repository gesichert. Die sechs Typhoeus-Dateien benötigen zusammen rund **0,74 MB statt zuvor 4,70 MB**. GIFs, Videos und Animationen werden nicht importiert.

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

## Technischer Aufbau

`scripts/endfield/skport-extract.mjs` erkennt das Skill-Widget. Die früher verwechselten IDs `gIuAIUyt`, `0ctR1S1J`, `CqJxefHj`, `tVlf3UYx` sind **Beschreibungsdokumente** und nicht Tab-IDs. Jeder Skill besitzt eine getrennte Tabellen-Dokumentreferenz.

`scripts/endfield/skport-extras.mjs` extrahiert weitere, im `chapterGroup` ausdrücklich benannte Widgets und ihre relationalen `documentMap`-Tabellen, einschließlich referenzierter Material-IDs.

`scripts/endfield/import-typhoeus.mjs` führt beide Schritte zusammen und erzeugt nach Validierung die beiden versionierten Operator-JSON-Dateien.

Offizielle Quelle: https://wiki.skport.com/endfield
