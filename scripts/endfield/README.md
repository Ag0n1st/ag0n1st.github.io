# SKPORT-Importer: Typhoeus

## Status (15.10.2026)

Der Importer wurde an der **echten öffentlichen Wiki-Antwort** aus einer SKPORT-Netzwerkaufzeichnung für Typhoeus (`itemId=1173`) ausgerichtet. Die beigefügten 22 aufgezeichneten Requests enthielten auch Account-/Authentifizierungsantworten, weshalb wir **niemals den kompletten Netzwerk-Mitschnitt ins öffentliche GitHub-Repository übernehmen dürfen**.

Es konnten in der Originalantwort nachgewiesen werden:

| Skilltyp | Skillname | Beschreibung | Werte je Rang |
|---|---|---|---|
| Basic Attack | Wildlands Huntress | eigenes Dokument | 12 Spalten |
| Battle Skill | Piercing Arrows of the Woods | eigenes Dokument | 12 Spalten |
| Combo Skill | Rampant Thorns | eigenes Dokument | 12 Spalten |
| Ultimate | Call of Ice Mountain | eigenes Dokument | 12 Spalten |

Die Rangfolge ist **RANK 1 bis RANK 9**, danach **Mastery I bis Mastery III**. Die einzelnen Fertigkeiten enthalten sieben bis acht Zahlen-/Kostenzeilen; die Kosten bestehen aus Itemreferenzen (`entry.id` plus `entry.count`).

Die offizielle Wiki-Antwort liegt im Feld `response.data.item`. Der relevante Datenbaum ist `item.document` mit `documentMap`, `widgetCommonMap` und `extraInfo`. Das Skill-Widget `1SuOqtCW` enthält `tabList` (vier dynamische, zeitbasierte Tab-IDs) und `tabDataMap`. **Wichtig:** Die früher angenommenen Kennungen `gIuAIUyt`, `0ctR1S1J`, `CqJxefHj`, `tVlf3UYx` sind **Beschreibungs-Dokument-IDs und KEINE Tab-IDs**. Das Leveltabellen-Dokument steht unabhängig davon direkt in `tabDataMap[tabId].content`.

Die Verarbeitung ist offline und schreibt ausschließlich Felder aus dem **öffentlichen Wiki-Datensatz**, nicht aus danebenliegenden Login-/User-Responses.

## Lokale Verwendung

Den kompletten Nutzer-Mitschnitt nur lokal außerhalb des Repositorys ablegen:

```text
local-data/skport/skport-relevant.json
```

Der Ordner `local-data/` ist bewusst in `.gitignore` ausgeschlossen. Das Script sucht aus dem Mitschnitt genau die öffentliche Antwort `/web/v1/wiki/item/info?id=1173` heraus. Alternativ akzeptiert es direkt die einzelne `response` oder `response.data.item` als JSON.

```bash
npm run test:endfield

node scripts/endfield/skport-extract.mjs \
  --input local-data/skport/skport-relevant.json \
  --report local-data/skport/typhoeus-inspection.json \
  --out src/data/endfield/imports/typhoeus.skport.json
```

Bei Problemen mit Struktur, Skillnamen, Tabellen, Dokumentzuordnung oder Rangspalten wird `--out` verhindert. Mit `--report` kann die Fehlerdiagnose auch dann untersucht werden.

**Der Status `validated-structure` bedeutet eine geprüfte Tabellenstruktur, aber nicht, dass die offizielle Quelle unveränderlich oder jeder Spielwert fachlich mit dem Live-Spiel verglichen wurde.** In der Quelle steht `lang: en`; eine deutsche Übersetzung muss separat erfolgen. URLs zu Animationen sind Metadaten und werden nicht als GIF-Dateien ins Repository gespeichert.

## Hinweise zu Daten und Sicherheit

- Die vollständige Aufzeichnung darf wegen möglicher Kontodaten **nicht** veröffentlicht werden.
- Im Export wird nur `response.data.item` verwendet; andere Requests werden vollständig ignoriert.
- Der Quellfingerabdruck wird ausschließlich aus dem öffentlichen Wiki-Eintrag berechnet.
- Eigene Guidebewertungen verbleiben unter `src/content/operator-guides/` und werden nicht überschrieben.
- Itemreferenzen sind IDs: Materialnamen/Icons sind erst nach separater Item-Zuordnung bekannt.
- Die kompakte Operatorstruktur enthält Seltenheit, Element, Klasse, Waffentyp, Fraktion sowie Cover-/Illustrations-URLs.

## Nächster Schritt

Den bereinigten Import in die Astro-Darstellung integrieren: Operatorprofil, vier Fertigkeiten einschließlich dynamischer 12-Rang-Tabelle und Materialreferenzen. Anschließend Talent-/Potenzial-/Aufstieg-Widgets ebenfalls prüfen. Vor dem produktiven Veröffentlichen müssen Sprache, Asset-Nutzung und Wertabgleich geklärt sein.

Der CI-Test vor jedem Website-Deploy prüft den Parser mit reproduzierbaren Fixtures – **nicht** automatisch den aktuellen SKPORT-Server.
