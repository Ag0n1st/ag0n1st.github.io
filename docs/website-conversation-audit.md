# Vollständiger Konversationsabgleich: Website-Projekt (PDF-Archiv)

**Ausgewertet am:** 16.10.2026.  
**Quelle:** Vom Betreiber im Chat bereitgestellte Datei `Bisherige Website Konversation.pdf`, **75 Seiten**, rund **57.000 extrahierte Wörter**. Die gesamte PDF wurde Seite für Seite textuell ausgelesen und thematisch geprüft.  
**Datenschutz:** Die PDF enthält historische Chatverläufe einschließlich lokaler Rechner-/Terminalinformationen. **Die Original-PDF, rohe Text-Extrakte und personenbezogene Details werden nicht in dieses öffentliche Repository übernommen.** Hier steht ausschliesslich die für das Website-Projekt benötigte fachliche Zusammenfassung.  
**Einordnung:** Eine historische Chat-Aussage ist **kein Code-Nachweis**. Der jetzige Implementierungsstand ergibt sich aus `main`, Tests und Deploys. Bei Widersprüchen gelten ausdrücklich spätere Nutzerentscheidungen und aktuelle, geprüfte GitHub-Dateien.  
**Zentrale aktuelle Übergabe:** [ROADMAP.md](../ROADMAP.md), insbesondere Kapitel 14.

## A. Vollständige Zeitachse der 75 Seiten

| PDF-Seiten | Historische Etappe | Maßgeblicher Entscheidungs-/Lernstand |
| --- | --- | --- |
| **1–4** | GitHub Pages und visuelle Builder | Exportierbare statische Website, Community-/Gaming-Portal nach funktionalem Vorbild von Wakayashi; Silex/GrapesJS als **frühe, später verworfene** Optionen. |
| **5–10** | Datenmodell und Toolauswahl | Flexible Operator-Guides mit variablen Teams, Ausrüstung und optionalen Themen. Langfristige strukturierte Wiederverwendung wichtiger als reines Drag & Drop. |
| **11–14** | Hosting-/Lizenzfragen, VS Code und Astro | Geschlossene Builder passen nicht zum GitHub-Pages-Ziel; Quelle möglichst eigenständig besitzen. Der Betreiber bevorzugt schließlich **VS Code + Astro** statt Silex. |
| **15–18** | Einrichtung lokal | Node/npm/Windows-Sicherheitskonflikt; CMD bzw. `npm.cmd` statt blockiertem PowerShell-`npm.ps1`; Astro-Entwicklungsserver läuft. **Historische Fehlersuche, kein neuer Entwicklungsauftrag.** |
| **18–25** | Erste Landingpage und GitHub | Konkretes Header-/Hero-/Twitch-/Beiträge-/Video-/Footer-Layout. GitHub Pages via Astro/Actions als einheitlicher Veröffentlichungsweg, bestehendes Repository wiederverwenden. |
| **26–31** | Lokaler Workflow, Branches, Build und Git | GitHub Desktop, VS Code, `.gitignore`, sauberer Build; nicht versehentlich `node_modules` etc. einchecken. `main` als bevorzugter Endzustand. |
| **32–38** | YouTube-Feed, mobile Darstellung und Integration älterer Chats | Videos dürfen nicht falsche Titel mit anderen Thumbnails vermischen; „Add to Queue“ als Parserfehler; echte Veröffentlichung und deutsch formatierte Zeitangaben. Responsives Card-Grid konkretisiert. Endfield-Neun-Reiter-Navigation festgelegt. |
| **38–40** | Ursprung des Guide-Frameworks, Übersicht | Eigene Mobalytics-Guides als inhaltliche Referenz und Motivation zur Unabhängigkeit; neun Abschnitte; charakterzentrierte Übersicht mit Profil/Video, Stärken/Schwächen, Build und drei 1–5-Wertungen. |
| **41–43** | Operator Kit, Fertigkeiten, Waffen | Progressionsmaterialien, alle **vier** aktiven Skills und Prioritätszeichen `>` oder `>=`; Waffen BiS/BP/F2P/Alternative; Bewertung statt „Ag0n1sts Analyse“. |
| **44–46** | Ausrüstung und Potenziale | Level- **und** Fabrik- **und** Story-Abhängigkeiten. Ein Gear-Build hat **immer vier** Teile. Potenziale inklusive visueller Belohnungen und freundlichem, nicht zum Pull drängendem Hinweis. |
| **46–50** | Teams: Konzept bewusst vereinfacht | Anfangs komplexe Team-/Slot-/Rotationsideen wurden **reduziert**: wenige Meta-Teams mit kurzer Einordnung, viele weitere Teams als Inspiration, scrollbare Darstellung; **zentrale Builds pro Einsatzzweck**, Team verweist über ID. |
| **50–54** | Gameplay, Fazit, reale Guide-Prototypen | Gameplay vor allem Trial Run und weitere Showcases, Rotationstipps nur wo sinnvoll; Operatoren-Kartenraster; Guide-Inhaltsnavigation scrollgebunden mit aktivem Abschnitt; Favicon und Ausrüstungsdisclaimer. |
| **55–61** | Supabase/SQL/SQLite abgewogen und verworfen als Pflicht | Kostentransparenz, Unabhängigkeit und eigene Pflege entscheidend: **JSON/YAML/Markdown im Repository**; Git/Dateikopie statt Admin-Login; keine externe Laufzeitdatenbank notwendig. |
| **61–63** | Offizielle SKPORT-Daten für Typhoeus | Anonyme/offizielle Daten primär; Rohdaten/Übersetzungen/Redaktion getrennt; Skills, Talente, Potenziale, Aufstiegsmaterialien; lokal optimierte WebP statt Hotlinking; generischer Importer als Ziel. |
| **64–69** | Übergabe aus vorheriger PDF, Liino und Gear-Katalog | Zweiter Beispieloperator Liino; weitere Kategorien Waffen/Gear/Materialien; strukturierte Katalog-IDs und Standard-Herstellungsrezepte. |
| **70–72** | Bildorganisation und Budget, Fabrikkomponenten | Speicherbedarf des aktuellen Arbeitsbaums von Git-Historie unterscheiden; Bilder nach fachlichen Ordnern organisieren. Level allein schaltet neue Komponenten nicht frei. |
| **72–74** | Offizielle Karte, Kisten und Einzelteilrecherche | Offizielle Gebiete/Marker getrennt von nichtoffiziellen Kisteninhalten. Zunächst Set-Kandidaten, **danach vom Nutzer ausdrücklich genauer geforderte einzelne Ausrüstungsteile** und Quellenkonflikte. |
| **75** | Story-/Gebiets-/Besitzfilter und Roadmap-Wunsch | Filter nach Level, Fabrik, Region/Gebiet und **Besitz aller vier Einzelteil-Blaupausen**; Autoritätslevel auf **60** begrenzen; permanent aktualisierte Markdown-Übergabe erstellen. |

## B. Verbindliche Produktentscheidungen und konkrete UI-Details

### B.1 Kommunikation und Arbeitsweise

- **Alle weiteren Website-Projektchats sind ausschließlich textbasiert.** Keine generierten Bilder, Grafikvorschauen, Rich-UI, Diagramme oder sonstige visuelle Ausschmückung im Chat. Falls der Betreiber später **ausdrücklich** eine Grafik beauftragt, diese isolierte Anweisung neu prüfen. **Die tatsächliche Website darf selbstverständlich vorhandene Bilder und Icons benutzen.** PDF-Seiten 40, 64; erneute Bestätigung 16.10.2026.
- Der Betreiber soll später auch **ohne KI** neue Guide-Inhalte pflegen können: `_template.md` kopieren, YAML/Markdown im Editor bearbeiten, ins richtige Verzeichnis legen, Build/Commit/Deploy. Kein Betreiber-Login ausschließlich zur Inhaltspflege. Seiten 59–61.
- GitHub ist die gemeinsame Arbeitsquelle, **kein neuer Code-/Dateisatz bei jeder Chatfortsetzung**. Bestehende Komponenten/Dateien präzise ändern und nachvollziehbare Diffs liefern. Seiten 19–20, 24–25.
- **`main` bleibt dauerhafter Hauptbranch.** Aus der historischen Vorliebe „möglichst auf main“ folgt **nicht**, dass größere ungeprüfte Features direkt live gehen sollen: Für größere Arbeiten Feature-Branch → Tests → PR → Merge auf `main` → Pages-Nachweis, wie später implementiert. Seiten 27–28; aktuelle ROADMAP §11.
- **Jeder abgeschlossene und jeder laufende Arbeitsschritt** muss in `ROADMAP.md` protokolliert werden: überprüfte Dateien, fachliche Entscheidung, PR/Commit, Test-/Deploy-Status, offene Punkte, kleinster nächster Schritt. Dies ist nach dem expliziten letzten PDF-Auftrag auf S. 75 eine fortgeltende Vorgabe. **Keine Behauptung „deployed“, bevor überprüft.**
- Die alte Builder-Debatte **Silex, GrapesJS, Squarespace, Supabase** ist historische Abwägung, **kein Auftrag**, diese Werkzeuge einzuführen.

### B.2 Startseite / Layout (PDF S. 18–19, 24, 32–38)

- Schrift **Geist**, genau die Gewichte **400** und **700**; dunkles Gaming-Design mit **Magenta und Cyan**.
- Header: Logo links, Links `ARKNIGHTS: ENDFIELD`, `NEVERNESS TO EVERNESS`, `ABOUT ME`; beim Scrollen feststehend mit transparentem/unscharfem Hintergrund. Mobile Navigation als rechts ausgerichteter **Hamburger-Button**.
- Hero-Grid: **zwei gleich große Cards** auf Desktop, **untereinander** auf Mobile (**Hero zuerst, Twitch danach**). Linke Karte: Ag0n1st, Kurzversprechen zu deutschsprachigen Guides/Streams/Tools, Twitch- und YouTube-CTA; der Betreiber wollte die `space-around`-Verteilung als Layoutversuch vergleichen. Nicht als globalen Zwang auf andere Cards interpretieren.
- Twitch-Karte: `twitch.tv/Ag0n1st`, Live-/Offline-Indikator, nur Video bzw. Offline-Fallback. Der Streamzustand ist dynamisch; Platzhalter dürfen nicht als Live-Daten ausgegeben werden.
- `NEUESTE BEITRÄGE`: zwei Spalten am Desktop, untereinander mobil, spielübergreifende aktuelle Inhalte.
- `LETZTE VIDEOS`: Karten als **sichtbar umrandete eigenständige Container** (Thumbnail/Play-Symbol oben, echter dazugehöriger Titel und **deutsche relative Zeit** darunter); 1 Spalte mobil; gesamter Bereich/Link zu YouTube. Die Fehlerserie mit versehentlich zusammengekoppelten Thumbnails und Titeln bzw. `Add to Queue` auf S. 32–37 ist ein **Regressionsrisiko**, kein akzeptierter Fallback. Bestehende Parserlogik nicht ohne Vergleich ersetzen.
- Footer: Social-Icons links, **Logo ohne zusätzliche Wortmarke** mittig, Copyright rechts. Historisch vorkommendes Copyright-Jahr **2025** ist keine Anweisung, es künftig ungeprüft festzuschreiben.
- Endfield-Navigation wurde später auf **Übersicht, Operatoren (früher „Charaktere“), Fabrik, Rekrutierung, Veredelung, Essenzen, Speedruns, Checkliste, Countdown** festgelegt. Leere Seiten sind Platzhalter, keine fertigen Tools.
- Domain-/SEO-/Deployment-Aussagen der frühen Sitzung haben gegenüber dem aktuellen GitHub-Stand keine Beweiskraft; insbesondere frühere Jekyll/Pages-Parallelveröffentlichung war ein gelöstes, aber beim nächsten Workflow-Problem zu berücksichtigendes Beispiel.

### B.3 Übersicht im einzelnen Operator-Guide (PDF S. 38–40)

1. Die Guide-Seite beginnt **direkt mit der großen Übersichtscard**, **ohne redundanten zusätzlichen Hero**; der Operator wird bereits in der Profilkarte benannt.
2. Darin zunächst **`Charakter Profil`** mit Desktop-50/50: links horizontales Character-Artwork mit Name, 5★/6★, Klasse-/Element-/Waffentyp-Icons, Trait-Chips und Haupt-/Nebenattribut-Chips; rechts die zum Operator gehörige Videokarte wie auf der Landingpage. Mobil gestapelt, **Video unter Profil**.
3. Im selben Profilblock **Stärken und Schwächen** nebeneinander; intern Cards ohne zusätzlichen Abschnittstrenner.
4. Als zweiter Unterbereich **`Build auf einen Blick`**: Waffen (BiS/BP/F2P/Alternativen), **vier konkrete Gear-Teile**, Skill-Priorität mit Icons und `>`/`>=` sowie Ziellevel/Mastery, empfohlene Partner ohne Ranking. Bild-/Itemdaten aus eigenem Katalog, nicht doppelt redaktionell eintragen.
5. Als dritter Unterbereich **`Einordnung`** mit drei **1–5-Skalen**: **Spielschwierigkeit** (Mechanikanspruch), **Flexibilität** (Teamintegration), **Zugänglichkeit** (Ressourcen). Die ursprüngliche dritte „vielleicht“-Skala wurde anschließend ausdrücklich als Zugänglichkeit definiert.
6. Große Card in Haupt-Unterbereiche trennen, kleinere Cards innerhalb; keinerlei Fantasie-Bewertung für Liino/Typhoeus.

### B.4 Die folgenden acht Guide-Abschnitte (PDF S. 38–54)

**2. Operator Kit:** Klasse, Element, Traits, Haupt-/Nebenattribut, Rolle, Kernmechaniken und verständliche Spielweise; Level-/Aufstiegsmaterialien und tatsächliche Ressourcenverfügbarkeit für neue Spieler. Die Tabellen/Level in frühen Entwürfen waren Platzhalter, **kein Ersatz für offizielle Leveldaten**.

**3. Fertigkeiten:** Vier aktive Skills **Basisangriff, Kampffertigkeit, Kombofertigkeit, Ultimative Fertigkeit** (keinen auslassen); zusätzlich Combat-/Ship-Talente. Pro Skill Effekte/Werte/Skalierung, Ränge und Materialkosten; vierteilige Priorität mit genau drei Vergleichsoperatoren `>` oder `>=`. Letzteres bedeutet: gleiche/equivalente Priorität, Reihenfolge praktisch austauschbar; Ziellevel 1–9 und M1/M2/M3 optional explizit.

**4. Waffen:** Kategorien **BiS**, **Battle Pass (BP)**, **Free to play (F2P)**, Alternativen; vollständige **offizielle** Waffenattribute, Effekte, Stufen und benötigte Materialien, gesonderte persönliche **„Bewertung“**, nicht die Überschrift „Ag0n1sts Analyse“. Prozentualer Vergleich nur mit dokumentierten Annahmen/Tests; kein erfundener 100%-Performanceindex.

**5. Ausrüstung:** Zentraler Build-Finder mit abgestufter Progression, gerade **nicht** nur ein Endgame-Meta-Set. Ein Setup hat **genau vier Ausrüstungsteile**; abhängig vom Operator-/Gear-Level, den tatsächlich herstellbaren Fabrikkomponenten, Story-/Gebietszugang und *explizitem Vorlagenbesitz*. Der Betreiber wollte zunächst redaktionell vor allem **Level 50/60/70** behandeln; die technisch breitere Auswahl (10/20/28/36/50/60/70) ist damit vereinbar und darf nicht eigenmächtig entfernt werden. Innerhalb Lv. 70 verschiedene Komponentenstufen und Einsatzzwecke möglich. Standardhinweis für frühere Level: Gear möglichst nach Haupt- und Nebenattribut des Operators auswählen. Ausrüstung nach Rolle und konkreter Herausforderung veränderbar; **Build-ID zentral verwalten**.

**6. Potenziale:** Alle P1–P5 mit offiziellen Effekten und redaktioneller Einordnung; ggf. Prozentvergleich zu vorherigem Potenzial und zu P0 **nur belegt**. In der ursprünglichen Anforderung werden auch **bei P1/P3/P5 freigeschaltete Profilgrafiken** als kleine Vorschau gewünscht (Verfügbarkeit/Rechte prüfen, nicht durch eine erfundene Grafik ersetzen). Freundlicher Hinweis: **Potenziale sind optional, kein Muss**; keine pauschale Kauf-/Pullpflicht. Konkrete wertende Abstufung ist redaktionell, nicht aus Spieldaten ableitbar.

**7. Teams:** Finale Einigung hat frühere komplexe Entwürfe bewusst vereinfacht: Rolle/Synergien des Operators zuerst, danach **wenige ausgewählte Meta-Teams** mit knapper Erklärung und Bewertung; **„Weitere Teamoptionen“** als beliebig erweiterbare Inspiration, kompakt und **scrollbar** (bei Bedarf Rollenfilter). **Keine Rotations-/Vergleichspflicht für jedes Team**, keine permanente Team-Slot-Swap-Engine aus dem verworfenen Entwurf. Dieselbe Teamkonstellation kann unterschiedliche Rollen begründen; speziell der damals anstehende Operator **Si** war Beispiel für Main-DPS-/Support-/Hybrid-Kontexte, **keine ungeprüfte aktuelle Charakterbewertung**. Jeder Guide-Build hat eine eindeutige ID und kann von mehreren Teams referenziert werden. Unterschiedliche Teammechanik/gewünschte Gear-Konfiguration → separaten Build anlegen, ansonsten **denselben Build wiederverwenden** (S. 50). Der Wunsch aus S. 5 nach **individueller Ausrüstung aller Teammitglieder** ist eine längerfristige Modellierungsoption; die spätere vereinfachte erste Version mit einem `buildId` des Guide-Operators ist der **aktuell verbindliche MVP**.

**8. Gameplay:** Schwerpunkt auf **Showcases** (häufig Operator-Probe/Trial Run), optional Boss- oder Speedrun-Clip. Kurze Rotations-/Timingtipps nur, wenn sie nicht bereits durch das begleitende YouTube-Video verständlich sind. Keine obligatorischen ausufernden Text-Rotationen für jedes Team. Mit neu erspielten Runs erweiterbar.

**9. Fazit:** Kurze Gesamteinordnung, wer profitiert und für wen der Operator keine Priorität hat, allgemeine Pull-Empfehlung. Potenzial-Pullberatung nicht ungefragt zum Kaufappell umdeuten; keine Wiederholung sämtlicher vollständiger Tabellen.

**Guide-Inhalt-Navigation:** Abschnittslinks sichtbar/erreichbar auch beim Scrollen; aktuell sichtbarer Abschnitt wird **dezent** markiert, bei Mobilansicht erreichbar. Das Operatoren-Menü davor ist ein **einfaches anklickbares Cards-Grid**, keine vorgeschaltete komplexe Datenbankansicht.

### B.5 Datenquelle, Qualität und Veröffentlichungsarchitektur (PDF S. 55–75)

- Aus der zunächst erwogenen **Supabase**-Lösung wurde nach Kosten-, Zukunfts- und Exit-Abwägung **Git als primärer Datenspeicher** gewählt: offizielle Spielinformationen als versionierte lokale JSON-Snapshots, redaktionelle Guide-Dokumente als Markdown/YAML, lokale WebP-Bilder nach Kategorien. Kein laufender Datenbankserver für die normale Website nötig.
- Eine **relationale Denkweise** (Item-/Operator-IDs und verlässliche Referenzen) wird bewahrt, damit eine spätere SQL-/SQLite-/andere Erweiterung möglich bleibt, falls tatsächliche Anforderungen entstehen. Die frühere Aussage „ab 50 Operatoren definitiv DB nötig“ ist **durch die spätere Entscheidung überholt**, nicht ein offener Auftrag.
- **Offizielle SKPORT-Daten** haben Vorrang für objektive Werte, Standardrezepte, Erwerbsarten, Skills und Kosten; **Community-Quellen** nur mit präzisen Quellen-/Vertrauensstufen für Fundorte; **Creator-Meinung** separat. Öffentlich nutzbare/anon­yme Daten; keine Account-/HAR-Geheimnisse. Skripte müssen inkonsistente Importdaten zurückweisen.
- **Typhoeus und Liino** sind die zwei Referenzoperatoren. Ihre Daten/Locales/Assets wurden importiert, persönliche Wertungen und Builds jedoch nicht automatisch generiert. Importer dürfen `liino.md`/`typhoeus.md` nicht überschreiben.
- **Bildbudget:** ausgewählte Icons/Artworks lokal optimiert als WebP, keine GIF-/Video-Dateien als standardmäßiger Snapshot; ursprüngliche und aktuelle Dateigröße, Git-Historie und Hosting-Limits sind **unterschiedliche Größen**. Spätere verbindliche interne Grenze: **100.000.000 Byte Endfield-Dateibudget**.
- **Ausrüstung:** 84 Waffen, 258 Gear-Details und offizielle Standardrezepte im geprüften Snapshot (vgl. ROADMAP §7). Für den Fortschritt zählt bei einem vierteiligen Build die höchste offiziell benötigte Komponentenstufe, **nicht** allein das nominelle Gear-Level.
- **Blaupausen:** offizielle Kartenmarker liefern nicht automatisch ihren Inhalt; Community-Kistenlisten wurden erst auf Setebene, dann auf **einzelne offizielle Gear-IDs** präzisiert. Unsichere oder widersprüchliche Zuordnungen transparent belassen. `gearId`, `crateClaim`, `officialMarkerId`, `areaId` und `blueprintOwned` nicht vermischen.
- **Story:** Gebiete können über Nebenquests bzw. unterschiedliche Pfade freigeschaltet sein; keine starre lineare Storykapitel-Automation. Gebiet betreten ≠ Bauplan erhalten. Ein Spieler kann den Besitz jedes konkreten Gear-Blueprints selbst bestätigen; Fortschritt ohne Login **im eigenen Browser** speichern. **Authority-Level maximal 60**, UI und Validierung gemeinsam anpassen.

## C. Historische Konzepte, die NICHT unbesehen wieder eingeführt werden dürfen

1. **Silex/GrapesJS/Squarespace als Produktstack:** verworfen zugunsten von Astro + VS Code.
2. **Supabase als Pflicht-Produktionsdatenbank:** nach Kosten-/Abhängigkeitsanalyse verworfen zugunsten lokaler Repository-Daten; eine Datenbank bleibt eine mögliche spätere, gesondert zu begründende Erweiterung.
3. **Für jedes Team komplette Rotation, per-Slot-Swap und Vollvergleich:** wurde vom Betreiber als zu aufwendig verworfen; verbindlich ist das vereinfachte Team-Konzept.
4. **Drei Gear-Teile pro Setup:** ausdrücklich vom Betreiber auf vier korrigiert.
5. **Zusätzlicher großer Operator-Guide-Hero oberhalb der Profilübersicht:** ausdrücklich als redundant gestrichen.
6. **„Ag0n1sts Analyse“ als Waffenbewertungstitel:** durch **„Bewertung“** ersetzt.
7. **Beliebiges maximal neues Meta-Set trotz Spielerfortschritt:** unzureichend, da Story, Fabrikkomponente, Gebiet und individuelle Blaupausen geprüft werden müssen.
8. **Grobe Set-Kistenzuordnung als endgültige Wahrheit:** später ausdrücklich einzelne Ausrüstungsteile verlangt; Konflikte sind weiterhin kein positiver Freischaltbeleg.
9. **Historische Code-Beispiele/Mockups als echte Empfehlungen:** Platzhalter aus den PDFs sind keine Creator-freigegebenen Veröffentlichungsdaten.
10. **PDF/Chatangaben wie „erfolgreich deployed“ als aktuellen Nachweis übernehmen:** GitHub-CI/-Pages für jeden neuen Merge neu prüfen.

## D. Gezielt zu prüfende Abweichungen/Ergänzungen gegenüber bestehender Roadmap

| Historische Anforderung | Bisheriger technischer Stand (Main-Prüfung 16.10.2026) | Folgeaktion |
| --- | --- | --- |
| Team-abhängige Gear-Varianten | `equipment.builds[]` + Team-`buildId` existieren; Teamkarten verlinken auf den Ausrüstungsabschnitt | **[IMPLEMENTIERT ALS MVP]**. Komplette Ausrüstung jedes *anderen* Teammitglieds **nicht** aus dem aktuellen Team-Schema ableiten; zunächst nur bei ausdrücklicher Ausbaubestellung priorisieren. |
| Teamübersicht nicht ausufernd | `OperatorTeams.astro`: Meta-Teams, weitere Optionen, `op-team-scroll`, Rollenfilter, knappe Texte | **[CODE VORHANDEN]**; mit echten redaktionellen Teams und vielen Einträgen testen. |
| Showcases statt Pflicht-Rotationsdokumentation | `gameplay.showcases`, optionale `rotationAndTips` | **[MODELL VORHANDEN]**; redaktionelle Inhalte fehlen. |
| Vier aktive Skills und optionale `>=`-Relation | Content-Schema erzwingt vier unterschiedliche Skill-Slots und drei `>`/`>=`-Zeichen | **[CODE VORHANDEN]**; echte Skill-Priorität vom Creator noch offen. |
| Potenzial-Avatare auf P1/P3/P5 | PDF-Wunsch ist eindeutig, Roadmap bisher nicht prominent | **[OFFEN/PRÜFEN]**: Offizielle Daten/Assets, Modell-/Darstellungsunterstützung und Lizenzstatus vor Implementierung prüfen. |
| Beschreibung möglichst ohne redundante Arbeit | Guide-Vorschau plus Video ist vorhanden; Markdown enthält bisher keine redaktionellen Liino-Builds | **[OFFEN]**: Vorhandenes Liino-Video/Skript als Quelle erbitten oder vom Betreiber genehmigte Analyse beauftragen. Keine Empfehlungen erfinden. |
| Startseite korrekt lokalisierte Videokarten | `src/pages/index.astro` enthält pro Video gekapselte Parserlogik und vermeidet irreführende Menütexte | **[REGRESSIONSRISIKO]**: bei Feed-/Parseränderungen Titel/Thumbnail/Datum/Deutsch und Mobile-Layout testbar halten; aktuelle Live-Daten nicht allein aus Code behaupten. |
| `main` und sämtliche Fortschritte sichtbar | `ROADMAP.md` ist zentrale Übergabe, PR #14 Dokumentationsnachtrag noch offen | **[DOKUMENTATION]**: Diese PDF-Auswertung in PR #14 integrieren; CI/Merge/Pages gesondert prüfen. |
| Redaktionslevel 50/60/70 vs. breiter Finder | Broader technische Levelauswahl existiert | **[KEIN WIDERSPRUCH]**: redaktionell sinnvolle Empfehlungen 50/60/70; technische Filteroptionen nicht unbegründet beschneiden. |

## E. Aktueller handlungsfähiger Übergabepunkt (Stand 16.10.2026)

1. **`main`-Snapshot geprüft:** `3f0e7125812216d7425c701dc95b66ce0e98e2fd` (Authority-Level 60, zentrale Roadmap). Offene PRs bei Prüfung: **#3** alte Forschung, **#14** dokumentierte Liino-Übergabe (dieses PDF-Audit wird in #14 ergänzt).
2. **Keine Veröffentlichung behaupten:** Dieses Audit ist eine Dokumentationsaufgabe. CI, Merge auf `main` und Website-Deploy nur bei tatsächlich bestätigtem Resultat als erfolgreich kennzeichnen.
3. **P1 bleibt fachlich offen:** `src/content/operator-guides/liino.md` enthält `equipment.builds: []` und ist `preview`. Echte vierteilige Build-IDs/Teile, Rolle und Bewertung von Ag0n1st benötigen Autorisierung bzw. explizit beauftragte, belegte Recherche.
4. **Prüf-Reihenfolge für P1:** Creator-Empfehlung → vier offizielle Gear-IDs/Slot-/Rezeptprüfung → Build in Liino-YAML → `npm run test:endfield`, Budget, `npm run build` → Browser mit Level/Komponente/Region/Gebiet/vier Blueprints/Reload/Reset → PR/CI/Merge/Pages → Roadmap fortschreiben.
5. **P2–P11** bleiben in `ROADMAP.md` priorisiert. Die zusätzlichen historischen Details in diesem Dokument werden künftig bei Design- und Content-Fragen herangezogen, ohne ältere Mockup-Specs als automatisch beauftragt zu interpretieren.

**Arbeitsregel:** Nach jeder folgenden Änderung die `ROADMAP.md` und, falls eine historische Präferenz betroffen ist, dieses Audit aktualisieren. Bei widersprüchlichen historischen Aussagen zuerst die **letzte ausdrückliche Entscheidung** und anschließend den **verifizierten Code** prüfen; verbleibende Konflikte offen benennen.
