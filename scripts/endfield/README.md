# Endfield: SKPORT-Importer (Typhoeus)

**Stand:** Erste lauffähige, lokal ausführbare Import- und Prüfstrecke. Noch **kein** vollständig mit einer echten SKPORT-Antwort geprüfter Import. Der öffentliche Typhoeus-Guide verwendet weiterhin ausschließlich gekennzeichnete Platzhalter, bis die Daten validiert sind.

## Ziel

Offizielle SKPORT-Wiki-Daten einmalig/längerfristig in eigene, versionierbare JSON-Dateien überführen. Die Website wird bei jeder Veröffentlichung aus diesen **lokalen Daten** erzeugt und hängt nicht bei jedem Build oder Seitenaufruf von SKPORT ab. Eigene Bewertungen, Teamempfehlungen und Builds bleiben unabhängig unter `src/content/operator-guides/`.

## Bekannter Ausgangspunkt

- SKPORT-Wiki-Endpoint: `/web/v1/wiki/item/info?id=1173` (Typhoeus).
- Die inoffizielle API-Dokumentation nennt `zonai.skport.com` und weist für `/web/v1/wiki/*` auf V2-signierte Requests hin.
- Unser bisheriger, in einer älteren Unterhaltung erstellter PowerShell-Exporter ist **nicht** im GitHub-Repository vorhanden.
- Aus der bisherigen Untersuchung sind diese Zuordnungen bekannt; sie müssen mit einem aktuellen Originalexport bestätigt werden:

| Skillname | Tab-ID | Bekannte zweite ID |
|---|---|---|
| Wildlands Huntress | `gIuAIUyt` | `ENfCCHbD` |
| Piercing Arrows of the Woods | `0ctR1S1J` | `fD8zxhWN` |
| Rampant Thorns | `CqJxefHj` | `1G405tY0` |
| Call of Ice Mountain | `tVlf3UYx` | `mDY9OqqE` |

- Skill-Widget `1SuOqtCW` enthält `tabList` und `tabDataMap`, dessen Tab-Objekte u.a. `intro.name/type/imgUrl/description` und `content` besitzen.
- `documentMap` enthält Dokumente mit `blockIds` / `blockMap`; Tabellen enthalten `rowIds`, `columnIds`, `cellMap`, ihre Zellen verweisen mittels `childIds` auf Textblöcke. Inline-Elemente können Materialreferenzen (`entry.id/count`) tragen.

**Noch offen:** Der frühere Export zeigte vier Skills und offenbar zwölf Tabellenspalten bei etwa 7–8 Datenzeilen. Der entscheidende Fehler war die Zuordnung der Dokumente bzw. Tabellen zu den jeweiligen Fertigkeiten. Ohne originale Exportdatei behaupten wir nicht, dass dieser Fehler bereits im echten Datenmaterial behoben ist.

## So führst du eine Prüfung aus

1. Eine **originale JSON-Antwort für den öffentlichen Wiki-Eintrag** (nicht die bereits reduzierte `typhoeus-skill-tables.json`) lokal in `local-data/skport/typhoeus-info.json` ablegen. `local-data/` ist bewusst in `.gitignore` ausgeschlossen.
2. Keine Cookies, Auth-Tokens, Kontodaten oder persönlich identifizierende Daten in GitHub hochladen. Der Importer fragt selbst keine privaten/endpunktgeschützten APIs ab.
3. Im Repository ausführen:

```bash
npm run test:endfield
node scripts/endfield/skport-extract.mjs \
  --input local-data/skport/typhoeus-info.json \
  --report local-data/skport/typhoeus-report.json
```

4. Den Report prüfen: vier Tabs, eindeutige Quelldokumente pro Skill, mindestens eine Tabelle je Skill und lesbare Spalten/Zeilen. Die tatsächlichen Werte dann anhand der offiziellen Wiki-Oberfläche gegenprüfen.

**Erst bei erfolgreicher struktureller Prüfung:**

```bash
node scripts/endfield/skport-extract.mjs \
  --input local-data/skport/typhoeus-info.json \
  --report local-data/skport/typhoeus-report.json \
  --out src/data/endfield/imports/typhoeus.skport.json
```

Wenn Zuordnungen fehlen oder Dokumente mehrdeutig sind, verweigert `--out` das Schreiben (Exit-Code 2). `--report` schreibt trotzdem die Diagnose in den lokalen Ordner.

Ein `validated-structure`-Ergebnis garantiert nur, dass die **Struktur** plausibel ist, nicht dass jedes Skill-Level und jeder Multiplikator bereits inhaltlich geprüft wurde. Die Quelle, der SHA-256-Fingerprint und Original-Dokument-IDs bleiben im Export erhalten.

## Was der Exporter bereits macht

- Entpackt `data`-Wrapper und sucht `documentMap` sowie `widgetCommonMap`.
- Ordnet Skills ausschließlich über `tabList` und **tatsächlich im jeweiligen Tab referenzierte** Quelldokument-IDs zu. Zweite, bisher bekannte IDs dienen nur der Diagnose, nicht zum automatischen Hinzuerfinden von Beziehungen.
- Liest zusammengehörige Textblöcke und einfache Tabellen aus `blockMap`, `rowIds`, `columnIds` und `cellMap`.
- Erhält Inline-Itemverweise als `[item:ID xAnzahl]` und zusätzlich als strukturierte Referenzen.
- Meldet fehlende Skillnamen, fehlende Dokumente, Tabellen ohne Daten und mehrfach zugeordnete Dokumente.
- Schreibt einen **Import-Kandidaten** nur bei korrekter Struktur.

Die Tests unter `scripts/endfield/skport-extract.test.mjs` arbeiten mit **synthetischen Testdaten**. Sie belegen die Parserlogik, nicht die Kompatibilität zu einem aktuellen echten API-Datensatz.

## Schritte danach

1. Original-Export des SKPORT-Eintrags 1173 gegen den Inspector laufen lassen und konkrete Feldabweichungen beheben.
2. Vier Skillnamen, Beschreibungen, Animations- und Tabellenwerte gegen die offizielle Typhoeus-Seite vergleichen; die bisherige fehlerhafte Abschnittserkennung vollständig entfernen.
3. Normierte, geprüfte Operator-, Fertigkeiten- und Talentdateien mit stabilen IDs und deutscher Lokalisierung erstellen.
4. Bilder und Icons mit nachvollziehbaren Quellen nach Nutzungsrechten gesondert einbinden.
5. Astro-Guide-Komponenten auf die importierten Spieldaten verweisen lassen. **Keine** automatischen Überschreibungen der Markdown-Guide-Texte.
6. Erst danach einen optionalen automatischen Import per GitHub Actions erwägen. Er darf bei Quellfehlern niemals bereits verifizierte Dateien löschen.

Referenzen:
- Offizielle Wiki: https://wiki.skport.com/endfield
- Inoffizielle API-Dokumentation: https://github.com/AixLnyt/skport-api-docs
