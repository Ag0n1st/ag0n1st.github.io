# Community Leaderboard – eigenständig mit Markdown pflegen

**Stand:** 24.10.2026 · Astro 5 / GitHub Pages · gilt gleichermaßen für DE und EN.  
Diese Dateien sind **Redaktionsdaten**, keine öffentliche Formular- oder Live-Datenbank.

## Neuen normalen Run eintragen

1. Vorlage `src/content/leaderboard-runs/general/_regular-run-template.md` kopieren nach `src/content/leaderboard-runs/general/<boss>/<dateiname>.md` (kein führender Unterstrich). Existiert der Boss-Ordner noch nicht, einfach erstellen.
2. Alle Beispielwerte ersetzen: `runId` **eindeutig und dauerhaft**, `playerId` auch bei Discord-Namensänderung stabil, Name, Boss-Slug, Patchversion, offizielle **MM:SS**-Ingame-Zeit, echter YouTube-Videolink und genau vier Operator-Slugs samt **P0–P5**.
3. `countryCode` nur nach ausdrücklicher freiwilliger Freigabe zur **öffentlichen** Anzeige eintragen; sonst weglassen (neutrales Globussymbol). Validierte Einreichung erfordert weiterhin Video, komplettes Team/Gear und Einhaltung des bestehenden Discord-Regelwerks.
4. Solange ungeprüft: `status: draft` (nicht sichtbar). **Nur nach deiner Freigabe** `status: verified` setzen.
5. Mit GitHub Desktop committen und auf `main` pushen oder besser über einen PR mit grünem CI mergen. Nach erfolgreichem **Pages-Build + Deploy** werden dieselben Dateien automatisch in beiden Sprachen angezeigt. Es gibt **keine Live-Synchronisation ohne Build**, keinen Login und keine zusätzlichen APIs.

## Event-Runs

Vorlage `src/content/leaderboard-runs/events/_event-run-template.md` kopieren nach `events/<eventId>/<name>.md`.
`eventId` muss auf eine vorhandene Eventdefinition verweisen, und Boss/Patch müssen übereinstimmen.
Ein Event-Run steht **nur einmal** in `events/`. `eligibleForCommunity: true` bedeutet: nach gesonderter Freigabe zusätzlich im allgemeinen Si/Boss-All-Time- und Patchranking anzeigen. `false` bedeutet: nur Event. `status: draft` erscheint in keiner Liste.

Der bisherige Krombi-Run liegt genau einmal unter `events/duality/krombi-0129.md`, ist `verified` und bereits für die allgemeine Rangliste freigegeben. Das Ag0n1st-**Demo** bleibt gesondert in `src/data/endfield/community-leaderboard.json`, niemals als verifizierter Run.

## Neue Events

Vorlage `src/content/leaderboard-events/_event-template.md` nach `src/content/leaderboard-events/<eventId>.md` kopieren. Alle Eventdaten, bereits vorhandenen WebP-Assetpfade, Regelwerklink und die **DE/EN-Texte jeder Regel** ausfüllen. Ein Event muss erst redaktionell vollständig bestätigt werden. Neuere Events stehen automatisch im Event-Selector vor älteren (nach `startsOn`). **Event-Archiv (automatisch):** Die Daten `startsOn` und `endsOn` sind inklusive Kalenderdaten in der Zeitzone **Europe/Berlin**. Während des Zeitraums steht das Event im oberen Event Leaderboard. Ab dem folgenden lokalen Tag wird es beim nächsten GitHub-Pages-Build in das einklappbare **Event-Archiv** überführt, einschließlich seiner Regeln, des originalen Banners, des Hintergrunds, der Top-10-Ergebnisse und aller freigegebenen Videos. Der bestehende Deploy-Workflow erstellt die Seite alle **sechs Stunden** neu; die Umstellung muss also nicht exakt um Mitternacht sichtbar werden. Archivierte Events bleiben per `?event=<eventId>` direkt verlinkbar. Zukünftige, bereits angekündigte Events werden schon vor ihrem Start als Vorschau mit Startdatum in der oberen Schnellauswahl angezeigt, jedoch nicht als laufend bezeichnet. Ab dem eigentlichen Startdatum bleibt die Auswahl gleich und der Vorschau-Hinweis entfällt beim nächsten Build.

**Kein automatischer Ergebnis-Freeze:** Das Archiv verwendet dieselben verifizierten Markdown-Runs; Korrekturen an bereits freigegebenen Einreichungen erfolgen weiterhin bewusst über Markdown/PR. Entwürfe und Demo-Einträge können im Archiv keine Endplatzierung beanspruchen. Duality bleibt einschließlich **25.11.2026** aktiv und wird ab **26.11.2026 (Europe/Berlin)** beim nächsten Build archiviert. Es gibt weder eine erfundene weitere Challenge noch eine automatische Neuausschreibung.

**Optionales Achievement-Badge:** Ein Event kann im Markdown zusätzlich `achievement:` mit `image` (lokaler WebP-Pfad), `tooltipDe` und `tooltipEn` festlegen. Das Bild wird dann oben rechts neben dem **Event Leaderboard**-Titel angezeigt, ohne zusätzlichen sichtbaren Hinweistext. Beim Hover oder Tastaturfokus erscheint die zweisprachige Kurzbeschreibung. Das Badge folgt der Auswahl im aktiven Event-Selector und wird bei anderen Events ohne Badge bzw. bei Archiv-Auswahl ausgeblendet. Das vorhandene „Duality“-Badge beschreibt ausschließlich den Discord-Erfolg für eine **gültige Run-Einreichung**; das Abzeichen wird auf der Website nicht automatisch zugewiesen. Für neue Events ohne Badge ist kein Feld erforderlich.

## Schutz und Ranking

Der Build prüft doppelte Run-/Event-IDs, bekannte Boss-/Operator-Slugs, maximal P5, vier unterschiedliche Mitglieder, MM:SS ohne Hundertstel, YouTube-Video-URL, Event-Zuordnung/Boss/Patch, zulässigen Ordnerpfad sowie Datums- und Regel-ID-Konsistenz. Ungültige Daten **stoppen den Build**. `draft` wird nicht veröffentlicht.

Der bestehende Algorithmus bleibt unverändert: pro Spieler/Boss/Version nur die schnellste gültige Zeit, All-Time separat, gleich schnelle Runs teilen sich die Platzierung (1,1,3), Rang 10 enthält alle Gleichstände. Einträge ohne freigegebene Länderangabe zeigen die neutrale Flaggenalternative. **Nie** denselben Eventrun zusätzlich im general-Ordner duplizieren.

Für größere Änderungen immer `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`, `npm run build` und danach `node scripts/check-pages-budget.mjs` sowie Browser-Smoke 390/1440px für DE/EN. Jede Änderung/Abnahme in `ROADMAP.md` vermerken.


## Contingency Contracts (ab v1.6)
- Eventdefinition aus `src/content/leaderboard-events/_contingency-contract-template.md` kopieren; `kind: contingency-contract`, **kein `boss`**.
- CC-Runs aus `src/content/leaderboard-runs/events/_contingency-contract-run-template.md`; `points` ganzzahlig ≥0, offizielle `time: "MM:SS"`, Video, vier Operatoren und `status: draft` bis zur Freigabe. Kein `boss` und immer `eligibleForCommunity: false`.
- Sortierung: Punkte absteigend, bei gleicher Punktzahl schnellere Zeit zuerst; identische Punkte **und** Zeit teilen die Platzierung. Beste Einreichung pro Spieler.
- Reale CC-Runs erscheinen nie in regulären Boss-Bestenlisten. Archivierbare CC-Events verwenden dieselbe Markdown-/Grafikstruktur wie Boss-Events.
- `demoRun` in der Eventdefinition ist ein **nicht verifizierter Platzhalter** und wird nach Abschluss des Events nicht im Archiv als Ergebnis gezeigt. Ohne freigegebenes Video wird keine fiktive YouTube-Verlinkung angehängt.
- Neue Eventgrafiken müssen zuerst unter `public/images/endfield/leaderboard/` vorhanden sein; Bildlinks in der Eventdefinition sind exakt zu übernehmen.


## CC v1.6 – Woche 1 / Woche 2 (10.11.2026)
- `weekTwoStartsOn: "2026-11-15"` ist in der Event-Metadatei hinterlegt. Bis einschließlich 14.11.2026 (Europe/Berlin) ist **Woche 1** ausgewählt; **Woche 2** ist ausgegraut und nicht bedienbar. Ab **15.11.2026** wird Woche 2 beim Seitenaufruf automatisch auswählbar und als Standard gezeigt. Woche 1 bleibt jederzeit verfügbar, auch nach dem Event im Archiv. Die Umschaltung erfolgt anhand des Berliner Kalendertages – nicht der Browser-Zeitzone – zusätzlich zum regulären 6-Stunden-Deployment.
- CC-Run-Dateien benötigen `ccWeek: 1` für gültige Einreichungen der ersten Risk-/Perk-Phase bzw. `ccWeek: 2` für die zweite Phase. Bei neuen Videos **nicht** den bestehenden Woche-1-Run überschreiben: eine neue Markdown-Datei mit eindeutiger `runId` und derselben stabilen `playerId` anlegen.
- Woche 1 bleibt auf CC-Einträge mit `ccWeek: 1` beschränkt. Woche 2 zeigt alle Woche-1-Ergebnisse sowie Woche-2-Submissions. Bei mehreren Videos desselben Spielers zählt **nur das beste Ergebnis** nach bestehendem CC-Ranking (höchste Punktzahl, bei Gleichstand kürzeste Ingame-Zeit). Das Woche-1-Ergebnis bleibt unberührt. Keine Duplikate des Spielers innerhalb einer Wochenansicht.
- Vier vom Betreiber am 10.11.2026 ausdrücklich zur Anzeige eingereichte eigene Ergebnisse sind in verifizierten Markdown-Dateien gespeichert: Duality/Si 01:40 (auch allgemeiner Si-Boss), Nefarith 00:39 (v1.5), Alleikhreos 01:22 (v1.4), CC Risk 48 / 06:14 (Woche 1; v1.6). Die Links und P0–P5-Angaben entsprechen den Originaleinreichungen. Keine zusätzlichen Bildassets oder externen APIs.

## CC v1.6 – Design-Feinschliff (02.11.2026)
- Bei angekündigten Events nur im Panel den einmaligen Start-Hinweis rendern. Schnellauswahl-Buttons zeigen lediglich den Eventtitel.
- CC-Punkte erscheinen als goldener, zum Eventpassender Badge mit offizieller weißer Symbolquelle (lokale transparente WebP-Maske); der Wert bleibt les- und per `aria-label` zugänglich in beiden Sprachen. Punktesortierung bleibt rein numerisch.
- Das 800×320-CC-Banner wird pixelgetreu/lossless statt verlustbehaftet gespeichert, damit die vom Betreiber gelieferte Grafik vollständig erhalten bleibt. Das 100-MB-/1-GB-Gate muss nach jeder Änderung bestanden werden.
