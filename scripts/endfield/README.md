# Endfield – offizielle Spieldaten ohne externe Datenbank

## Aktueller Aufbau

- **Redaktionelle Guides:** `src/content/operator-guides/<slug>.md` – deine Texte, Bewertungen, Builds und Teams.
- **Importierte Spieldaten:** `src/data/endfield/operators/<slug>.json` und `<slug>.extra.json` – lokale, versionierte Snapshots.
- **Deutsche Texte:** `src/data/endfield/locales/de/<slug>.json` – bewusst separat gepflegt, keine Überschreibung durch einen Datenimport.
- **Bilder/Icons:** `public/images/endfield/operators/<slug>/` – lokale statische Dateien, soweit verfügbar.
- **Astro-Seiten:** `src/pages/endfield/operatoren/[slug].astro` – eine Vorlage für jeden veröffentlichten Guide.

Der gesamte Seitenaufruf funktioniert ohne Datenbank oder SKPORT-API-Verbindung.

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

Die zwei erzeugten Dateien werden anschließend lokal mit `npm run build` geprüft und in GitHub eingecheckt. Erst dann sind ihre Spieldaten im Astro-Build verfügbar. Eine automatische Anmeldung oder ein neues API-Konto ist nicht vorgesehen. **Das direkte automatische Abrufen der öffentlichen SKPORT-Daten ohne vorab gespeicherte JSON-Antwort ist noch nicht implementiert.**

**Tests:** `npm run test:endfield`. Die generischen Tests nutzen einen zweiten synthetischen Operator mit ganz anderer ID und dynamischen Tab-IDs. Das beweist die fehlende Typhoeus-Festverdrahtung, noch nicht die Kompatibilität mit einem zweiten echten SKPORT-Operator.

## Bilder lokal sichern (ohne GIF/Video)

`scripts/endfield/sync-assets.mjs` kopiert ausschließlich die aus unseren JSON-Daten bekannten SKPORT-PNG-, JPEG- oder WebP-URLs für Cover, Illustration und Skill-Icons ins Repository. GIFs, Videos und zusätzliche unbekannte URLs werden ausgeschlossen.

```bash
npm run assets:endfield
# Optional nur einen Operator:
npm run assets:endfield -- --slug typhoeus
```

Alternativ: <https://github.com/Ag0n1st/ag0n1st.github.io/actions/workflows/sync-endfield-assets.yml> → **Run workflow**. Diese Action synchronisiert die Bilder, committet nur die neuen statischen Bilddateien und startet dann den GitHub-Pages-Deploy.

Bereits gespeicherte Assets werden standardmäßig nicht überschrieben. Die Website bevorzugt lokale Kopien; andernfalls bleiben die in den importierten Daten hinterlegten SKPORT-CDN-URLs als Übergangslösung bestehen.

Für Typhoeus sind **Cover, Illustration und vier Skill-Icons** bereits erfolgreich gesichert. Die große Illustration sollte vor einem Ausbau auf sehr viele Operatoren perspektivisch zu WebP optimiert werden, um die GitHub-Pages-Größengrenze zu schonen.

**Bildrechte:** Die Rechte an offiziellen Spielgrafiken liegen weiterhin bei den jeweiligen Rechteinhabern. Die Wiki ist als Quelle gekennzeichnet; das gilt nicht als eigene Nutzungsrechtsfreigabe.

## Weiterhin wichtig

- Deutsch ist bei Typhoeus eine **redaktionelle Übersetzung** der englischen SKPORT-Daten; kein offizielles deutsches Skript.
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
- **Materialkosten:** Wir zeigen die im SKPORT-Export angegebenen Kosten an. Ob diese als Einzel-/Gesamtkosten gelten, wird erst beim fachlichen Abgleich festgelegt. Keine frei erfundenen Summen.
- **Ausfall:** Wenn die Quelle nicht erreichbar ist, baut Astro mit den letzten im Repository gespeicherten Dateien weiter. Kein Supabase erforderlich.

## Technischer Aufbau

`scripts/endfield/skport-extract.mjs` erkennt das Skill-Widget. Die früher verwechselten IDs `gIuAIUyt`, `0ctR1S1J`, `CqJxefHj`, `tVlf3UYx` sind **Beschreibungsdokumente** und nicht Tab-IDs. Jeder Skill besitzt eine getrennte Tabellen-Dokumentreferenz.

`scripts/endfield/skport-extras.mjs` extrahiert weitere, im `chapterGroup` ausdrücklich benannte Widgets und ihre relationalen `documentMap`-Tabellen, einschließlich referenzierter Material-IDs.

`scripts/endfield/import-typhoeus.mjs` führt beide Schritte zusammen und erzeugt nach Validierung die beiden versionierten Operator-JSON-Dateien.

Offizielle Quelle: https://wiki.skport.com/endfield
