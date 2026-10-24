# Operator-Datenbank: öffentlicher Quellenstand und Vollimport-Checkliste

**Stand:** 24.10.2026 · **Status: Teilimport; SKPORT-Vollimport weiterhin offen.**

## Tatsächliche Abdeckung

- Offizielle SKPORT-Katalogidentitäten: 35 Item-IDs; für Gameplay/Endfieldle **34** eindeutige Operatoren (Endministrator M/F als eine Rateidentität).
- Offizielle lokal zwischengespeicherte Bilder: **34/34 Icons und vertikale Porträts**, **33/34 Banner**, **3/34 echte SKPORT-Splash-/Illustrations-Assets**. Der fehlende Banner gehört zu Argent Flow. Vorhandene Bilddateien werden referenziert, **nicht** dupliziert.
- **3/34 vollständige SKPORT-`item/info`-Importpaare** in `src/data/endfield/operators/<slug>.json` plus `.extra.json`: **Liino, Typhoeus, Si**. Nur diese enthalten belegt die vollständigen 12 Skillränge, Level-/Aufstiegskosten, Talente, Potenziale und Materialnamen aus der offiziellen Quelle.
- Neu: `src/data/endfield/catalog/operator-combat-reference.json` hat **30/34 Operatoren mit je vier Fertigkeitsnamen** und **29/34 mit Basisfähigkeiten-Namen/-Räumen und numerischen Wertstufen** aus `eldritchtools/endfield-assets`. **Dies ist Community-Metadatenabgleich, KEIN Ersatz für einen originalen SKPORT-Vollimport.** Längere fremde Fertigkeitsbeschreibungen wurden nicht kopiert, und kein Rang-/Material-/Potenzialwert wird aus unbekannten Quellen erfunden. Arcane besitzt zwei getrennte offiziell zu prüfende INT-/WILL-Varianten. Fehlende Community-Fertigkeitseinträge: **Typhoeus, Purrchena, Si, Argent Flow**; für Typhoeus und Si liegen die eigenen vollständigen offiziellen SKPORT-Importe bereits vor.
- Diese Referenzdaten verändern bis zu einem separaten redaktionell geprüften Integrationsauftrag **weder Endfieldle noch deine veröffentlichten Operator-Guides**.

## Herkunft und Unterscheidung

- **Offizielle SKPORT-Katalogdaten:** `src/data/endfield/catalog/items.json`, `operator-official-artwork.json`, `src/data/endfield/operators/{liino,typhoeus,si}*.json`.
- **Community-Rohquelle:** [eldritchtools/endfield-assets, `skills.json`](https://github.com/eldritchtools/endfield-assets/blob/main/data/skills.json) und [`base_skills.json`](https://github.com/eldritchtools/endfield-assets/blob/main/data/base_skills.json), feste Git-Blob-IDs zur Nachprüfung in `operator-combat-reference.json.source`. Nur knappe Fakten (Fertigkeitsnamen, Trigger-Kennungen, Basisfähigkeitsnamen/-Raum/-Zahlen), ohne deren geschützte Prosa.
- **API-Zugang:** Die [öffentlich dokumentierte SKPORT-V2-Signatur](https://github.com/AixLnyt/skport-api-docs) benötigt ein authentifiziertes Sitzungssalz; die öffentliche `/web/v1/wiki/item/info?id=<ID>`-Antwort konnte in dieser Umgebung nicht als zuverlässiger Snapshot bezogen werden. Keine Zugangsdaten, Cookies, Tokens oder signierte Privat-URLs öffentlich committen.

## Nächster Schritt zum echten Vollimport

Der vorhandene `scripts/endfield/import-operator.mjs` liest ein **öffentliches, personenbezugsfreies** `item/info`-JSON für eine Operator-ID und den dazugehörigen **öffentlichen** `wiki/item/list`-Index. Der neue Batch-Aufrufer nutzt **denselben** ausgetesteten Parser und verhindert versehentliches Überschreiben bestehender Originale:

```bash
node scripts/endfield/import-operator-batch.mjs \
  --capture-dir /privat/skport-public-operator-snapshots \
  --items /privat/skport-public-item-index.json \
  --snapshot 2026-10-24 \
  --out-dir src/data/endfield/operators \
  --dry-run
```

Wenn alle erkannten Datensätze vollständig und verifiziert sind, denselben Befehl **ohne `--dry-run`** ausführen. Capture-Dateien müssen numerische Namen wie `1.json`, `615.json` haben, passend zu `itemId` in `endfieldle-roster.json`. Das Skript verarbeitet mehrere Operatoren und validiert **alle Eingaben, bevor eine normalisierte Datei geschrieben wird**; es bricht bei fehlenden/unerwarteten IDs, überschreibungsgefährdeten vorhandenen Paaren oder entdeckten Zugangsdatenfeldern ab. Rohantworten gehören in einen **lokalen privaten Ordner außerhalb des öffentlichen GitHub-Repositories**, niemals in `src/`.

Bei erfolgreichen Neuimporten anschließend nur öffentlich belegte SKPORT-Assets mit `npm run assets:endfield -- --slug <slug>` ergänzen, anschließend **100-MB-Endfield-/1-GB-Pages-Budget**, DE+EN und vollständige Tests prüfen. Das Import-Skript ist kein automatischer API-Bypass und erfasst nichts aus privaten Spielerprofilen.

## Offene Restarbeiten

Die anderen **31 SKPORT-Vollimporte** sind noch ausstehend. Nur quellengestützte `item/info`-Captures können die bereits vorhandenen 3 Originalprofile ohne Schätzwertmischung auf alle Operatoren erweitern. Auch zusätzliche echte Illustration-/Splasharts müssen pro verfügbarer offizieller CDN-Quelle importiert werden; bloß existierende Gryphline-Porträts nicht irreführend als vollwertige SKPORT-Illustration deklarieren. Ausstehende oder zukünftig erst veröffentlichte Operatoren (z. B. Argent Flow zum Stand 24.10.2026) dürfen nicht als bereits mit vollständigem Releasedetailstatus ausgewiesen werden.

**Automatischer Audit:** `scripts/endfield/operator-import-coverage.mjs`, Tests `scripts/endfield/operator-reference-coverage.test.mjs`. Die Roadmap dokumentiert jedes Update; die Spieloberfläche bleibt in DE/EN unverändert.
