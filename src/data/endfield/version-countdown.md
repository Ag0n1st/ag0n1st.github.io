---
version: "1.6"
name: "Sanctuary of Ink"
endsAt: "2026-11-26T00:00:00+02:00"
timeZone: "Etc/GMT-2"
displayZoneDe: "MESZ (UTC+2)"
displayZoneEn: "CEST (UTC+2)"
status: "estimated"
sourceLabelDe: "Vergleich: Ende des aktuell laufenden Protokoll-Pass."
sourceLabelEn: "Reference: End of the currently active Protocol Pass."
---

Hier den Endzeitpunkt zukünftiger Versionen anpassen. `endsAt` benötigt ein
ISO-8601-Datum mit Uhrzeit und UTC-Offset. Beispiel:
`2026-11-26T00:00:00+02:00` (fest vorgegebener UTC+2-Offset).

Der Termin orientiert sich an der Anzeige des Protokoll-Pass im Spiel.
Der Betreiber hat für dieses Ereignis ausdrücklich **00:00 bei UTC+2** vorgegeben.
Diese feste Versatzzeit weicht am 26. November von der regulären deutschen
Winterzeit (MEZ, UTC+1) ab. `Etc/GMT-2` ist die technische Zone für festes
UTC+2 (IANA-Notation mit umgekehrtem Vorzeichen). Für die Anzeige werden
die editierbaren `displayZoneDe`/`displayZoneEn` genutzt.
Die angenommene Uhrzeit (00:00 Uhr) ist eine Schätzung, solange
keine exakte Uhrzeit feststeht. Behalte `status: "estimated"` bis zur Bestätigung bei.

Die sichtbaren Quellenhinweise stehen oben in `sourceLabelDe` und
`sourceLabelEn`; beide Sprachen immer gemeinsam pflegen.
