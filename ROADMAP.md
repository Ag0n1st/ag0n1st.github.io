# AG0N1ST.COM – PROJEKT-ROADMAP, ENTWICKLUNGSSTAND & KI-ÜBERGABE

> **Zentrale Projektdokumentation / Single Point of Entry.**  
> **Stand:** 16. Oktober 2026 (Europe/Berlin).  
> **Projekt:** Ag0n1st – deutschsprachiges Gaming-/Guide-Portal.  
> **Repository:** https://github.com/Ag0n1st/ag0n1st.github.io  
> **Produktionswebsite:** https://ag0n1st.com (eigene Domain), alternativ https://ag0n1st.github.io  
> **Hauptbranch:** `main`. Si-Guide aus **PR #34** live; anschließender Recherche- und Editorial-Voice-Abschluss **PR #35**, Squash `c5189e529237ca7707cb3d5824c1fc16219ad0b8`, [CI #157](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38933564698) und [Pages #280](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38933850978) erfolgreich. Nachfolgende reine Roadmap-Commits können den HEAD erneut ändern. Historischer erster Übergabestand war PR #12.  
> **Diese Dokumentation und die Autoritätslevel-Grenze 60:** [Pull Request #13](https://github.com/Ag0n1st/ag0n1st.github.io/pull/13).  
> **Wichtig:** Bei jeder folgenden Entwicklungsphase diese Datei und das tatsächliche Repository **gemeinsam** prüfen. GitHub-Code und erfolgreiche CI-Läufe sind der Nachweis für Implementierungen; die Roadmap ist die verbindliche Sammlung von Anforderungen, Entscheidungen, Aufgaben und Übergabehinweisen.

## 0. SOFORTSTART: NEUER CHAT / ANDERE KI

### 0.1 Startanweisung, die kopiert werden kann

> Wir entwickeln meine Website **Ag0n1st** weiter: Astro auf GitHub Pages, Repository `Ag0n1st/ag0n1st.github.io`, Branch `main`, Website `ag0n1st.com`. Bitte öffne zuerst die **aktuelle `ROADMAP.md` im Repository**, lies zusätzlich die darin verlinkten Fachdokumente für die konkret nächste Aufgabe, prüfe den GitHub-`main`-Stand sowie offene Pull Requests und setze bei „Aktueller Übergabepunkt“ fort. Halte dich an die dokumentierten Architektur-, Quellen- und Designregeln. **Nichts nur aufgrund der Roadmap als implementiert annehmen, sondern im Code verifizieren.** Arbeite für größere Änderungen mit Branch → Tests → Pull Request → Merge → erfolgreicher Pages-Deploy. Aktualisiere am Ende die Roadmap einschließlich neuer Entscheidungen, Dateien, Testergebnisse und nächster Schritte. Keine unbestätigten Gamedaten oder redaktionellen Builds erfinden.

### 0.2 Schnellorientierung in unter fünf Minuten

| Frage | Antwort / maßgebliche Stelle |
| --- | --- |
| Was ist das Produkt? | Deutsches Creator-Portal mit Anleitungen, Spiele-Nachschlagewerken, interaktiven Tools, Streams und Videos. |
| Was ist aktuell der Schwerpunkt? | **Arknights: Endfield** → Operator-Guides, SKPORT-Daten, Ausrüstung und Build-Finder. |
| Wo liegt die Arbeit? | Öffentliches GitHub-Repo `Ag0n1st/ag0n1st.github.io`; lokales Arbeiten mit VS Code und GitHub Desktop möglich. |
| Welcher Branch? | Normalerweise `main`; komplexe Änderungen zuerst in einem Feature-Branch, danach Merge. |
| Welche Technologie? | Astro 5, HTML/CSS, wenig clientseitiges TypeScript/JavaScript; GitHub Pages per Actions. |
| Was ist tatsächlich funktional? | Landing, Endfield-Übersicht, Operatoren-Karten & neunteiliges Guide-Framework, lokale SKPORT-Daten, Build-Finder-Level/Fabrik/Region/Gebiete/Blaupausen. |
| Was ist inhaltlich noch leer? | Echte redaktionelle Builds/Teams/Wertungen der Operatoren; mehrere Endfield-Toolseiten; Neverness to Everness; About. |
| Was nicht verändern? | Öffentlich sichtbare Texte nicht aus Fantasie erstellen; kein Pflicht-Login; keine externe Datenbank zur normalen Anzeige; 100-MB-Endfield-Dateibudget. |
| Wo liegen die Endfield-Spieldaten? | `src/data/endfield/`; offizielle Daten in `catalog/`, `operators/`; explizit recherchierte Community-Daten in `progression/`. |
| Wo liegen persönliche Guide-Texte? | `src/content/operator-guides/<slug>.md`; Vorlage `_template.md`. |
| Wie heißt der zentrale UI-Bereich? | `src/components/operator/sections/OperatorEquipment.astro`; Browserinteraktionen in `src/components/operator/OperatorGuide.astro`. |
| Welche Tests? | `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`, `npm run build`. |
| Was ist aktuell als Nächstes sinnvoll? | **Si v1.6 sichten/freigeben**, danach fehlende numerische SKPORT-IDs, offiziellen Item-Details und Blaupausen-/Rezeptnachweise sicher nachziehen; nie Community-Namen als offizielle IDs ausgeben. Liino, Typhoeus und Si sind bereits online. Details: §14.3t/u und `docs/si-v16-gear-followup-20261016.md`; historisches PDF-Audit: `docs/website-conversation-audit.md`. |
| Stand Authority? | Obergrenze **60**, inklusive HTML-Feld, gespeicherten Eingaben und Auswertelogik; bei künftiger Erhöhung zentral anpassen. |

**Diese Datei ist kein Ersatz für die Dateien im Repository.** Wo der Code und die Roadmap abweichen, nicht stillschweigend „korrigieren“: Diskrepanz feststellen, Ursache prüfen, dem Nutzer erläutern, dann dokumentiert ändern.

### 0.3 Status-Vokabular für diese Datei

- **[FERTIG]**: im Repository implementiert und in `main`; mindestens Build-/Testprüfung absolviert.
- **[TEILWEISE]**: technische Basis existiert, aber Inhalt, Daten oder Funktionen fehlen.
- **[RECHERCHE]**: Hinweise/Datensätze sind vorhanden, aber bewusst nicht vollständig verifiziert.
- **[GEPLANT]**: Nutzerwunsch oder aus der Architektur abgeleiteter Arbeitspunkt; noch keine vollständige Implementierung.
- **[OFFEN / PRÜFEN]**: konkrete Unsicherheit, Fehlergefahr oder notwendige Entscheidung.
- **[NICHT GEPLANT]**: bewusster Ausschluss, außer der Nutzer revidiert die Entscheidung.

Die Kennzeichnungen beziehen sich auf den **Stand vom 15.10.2026**. Alte Abschnitte werden bei Änderungen nicht ungeprüft weiterkopiert.

---

## 1. VISION, ZIELGRUPPE UND NICHT VERHANDELBARE VORGABEN

### 1.1 Produktidee

Die Website ist die langfristige, auffindbare Wissensplattform rund um die Streams, YouTube-Guides, Showcases und das Theorycrafting von **Ag0n1st**. Der Content ist **Deutsch zuerst**, richtet sich insbesondere an deutschsprachige Spieler von Gacha-/Anime-Action-RPGs und soll mehr leisten als eine Link-Sammlung:

1. **Praxistaugliches Nachschlagewerk**: Mechaniken, Fertigkeiten, Builds, Sets, Teams, Fortschritt, passende Videos.
2. **Fortschrittsorientierte Hilfen**: Empfehlungen müssen zu Level, Fabrikausbau, Story und tatsächlich verfügbaren Ressourcen passen.
3. **Transparente Herkunft von Informationen**: Offizielle Spieldaten vs. Community-Recherche vs. subjektive Creator-Bewertung sichtbar trennen.
4. **Leicht eigenständig redigierbar**: neue Guides und Empfehlungen mittels Markdown/YAML/JSON und Dateikopie; kein CMS-Login nur für den Betreiber.
5. **Geringe Betriebs-/Abhängigkeitkosten**: statisch ausgelieferte Seiten, GitHub Pages, kein Laufzeit-Backend für Guides oder Nutzerkonten.
6. **Content-Verbindung**: Texte dienen als eigenständige Nachschlagewerke; Twitch/YouTube als ergänzende Live-/Video-Kanäle, nicht als einzige Informationsquelle.

### 1.2 Priorität der Spiele und Website-Bereiche

1. **Arknights: Endfield**: aktueller Hauptschwerpunkt und zuerst tief ausbauen.
2. **Neverness to Everness (NTE)**: eigener Website-Bereich und später vergleichbares, aber spielangepasstes System.
3. **Startseite/Branding**: stabile zentrale Navigation, Twitch/YouTube, redaktionelle Highlights.
4. **About Me / Kooperationen**: Creator-Profil und professionelle Anlaufstelle, später ergänzen.
5. **Weitere Spiele**: erst nach konkreter Nutzerentscheidung, nicht automatisch neue Rubriken eröffnen.

### 1.3 Verbindliche Produkt-/Designpräferenzen

- **Deutsch** als Primärsprache; Mehrsprachigkeit langfristig vorbereiten, nicht automatisch undurchsichtig übersetzen.
- **Dark-Gaming-Portal** mit **Magenta/Pink und Cyan** als CI-Akzenten; **Geist 400/700**.
- Gleiche visuelle Grundsprache über alle Spiele hinweg; **spielspezifische Akzente** möglich.
- Navigation: Logo/Wordmark links; Hauptlinks **Arknights: Endfield**, **Neverness to Everness**, **About Me**; Endfield-Zweitnavigation unter dem Hauptheader.
- Responsive Desktop/Mobile, auf kleinen Displays keine abgeschnittenen Texte/Karten, lesbare Formularbeschriftungen, Tastaturbedienung und sinnvolle Fokuszustände.
- **Sämtliche weiteren Website-Entwicklungschats bleiben ausschließlich textbasiert.** Nur Text, Code und normale Links; keine automatisch erstellten Bilder, Diagramme, Rich-UI-Karten oder andere grafische Vorschauen im Chat. Neue Bilder nur bei späterem ausdrücklichen Auftrag; bis dahin Platzhalter nutzen. Diese Regel betrifft die **Chat-Ausgabe**, nicht die bestehenden Grafiken der Website selbst. Bekräftigt am 16.10.2026 nach vollständiger PDF-Auswertung.
- Keine ungefragten neuen Logos/Texte/Branding-Elemente.
- Spielerorientierte Begriffe: **Operatoren** (nicht mehr „Charaktere“ in der Endfield-Navigation); offizielle IDs als Schlüssel, nicht künstlich umbenannte Übersetzungs-IDs.
- Echte Quellenbelege vor Annahmen. Wenn etwas unsicher ist, im Datensatz kenntlich machen.
- Persönliche Bewertungen, Teambuilds, Skill-Prioritäten, Prozentvergleiche, Pull-Empfehlungen **nur redaktionell vom Creator oder auf ausdrücklich gewünschter, nachvollziehbarer Analysebasis**. Keine erfundenen Beispiel-Meta-Builds veröffentlichen.
- Spielwerte und Herstellungskosten dürfen durch neue Imports aktualisiert werden; **niemals eigene redaktionelle Texte dabei überschreiben**.

### 1.4 Klare Ausschlüsse / bevorzugte Lösungen

| Thema | Vorgabe |
| --- | --- |
| Webseiten-CMS | **Kein eigener Admin-Login** nur zum Einpflegen; Git/VS Code + Markdown/YAML/JSON genügt. |
| Nutzerfortschritt | Vorzugsweise **lokaler Browser-`localStorage`**, ohne Konto; Transparenz über Gerätebindung. |
| Speedruns | **Eigene Runs/YouTube-Playlist**, keine offene Community-Rangliste. |
| Assets | Statische WebP-Icons und ausgewählte Operator-Cover; keine GIF-/Videodateien in Endfield importieren. |
| Abhängigkeit der Website | Kein benötigter SKPORT-API-Call im Browser zur Laufzeit; Snapshots bei Build/Import versionieren. |
| Gamedaten | **Offizielle SKPORT-Wiki** als Quelle für objektive Stammdaten und Rezepte; Community für begründete, getrennt gekennzeichnete Fundorthinweise. |
| Unsicherheit | Unbekannte Daten bleiben `unknown`/`unverified`/`incomplete`; nicht implizit als freigeschaltet interpretieren. |
| Datenbudget | Endfield-bezogene **tracked working-tree Dateien ≤ 100.000.000 Byte**; Test vor jedem Merge/Deploy. |

---

## 2. REPOSITORY, DOMAIN, INFRASTRUKTUR UND WORKFLOWS

### 2.1 Technischer Stand [FERTIG]

- **Repository:** https://github.com/Ag0n1st/ag0n1st.github.io (öffentlich).
- **Primärbranch:** `main`, PR-basierte Änderungen; GitHub Desktop für Pull/Commit/Push möglich.
- **Astro:** Paket aus `package.json`, aktuell Major-Version **5**, bundler-/buildbasiert; Seite ohne serverseitige Sessions.
- **Konfiguration:** `astro.config.mjs` → aktuell `site: "https://ag0n1st.github.io"` und `base: "/"`. **Achtung:** Bei SEO-/Canonical-Arbeit eigene Domain und diese Einstellung gemeinsam prüfen.
- **Hosting:** GitHub Pages mit GitHub Actions als Veröffentlichungsquelle. Workflow `.github/workflows/deploy.yml` (bei Push auf `main`, manuell und zusätzlich Zeitplan alle sechs Stunden).
- **PR-Prüfung:** `.github/workflows/validate-astro.yml`; `npm ci`, Endfield-Tests, 100-MB-Kontrolle, Astro-Build.
- **Vorschau lokal:** `npm run dev`. Statische Produktionsansicht via `npm run build` und `npm run preview`.
- **Schreibplattform:** Windows 11, Visual Studio Code und GitHub Desktop; in früheren lokalen Sitzungen konnte `npm.ps1` durch PowerShell ExecutionPolicy blockiert sein (dann CMD oder eine zulässige lokale Lösung nutzen).
- **Offizielle Domain:** `ag0n1st.com` über Cloudflare Registrar. Custom-Domain/DNS/HTTPS wurden im Projektverlauf eingerichtet. Bei Änderungen in DNS oder Pages immer **GitHub Settings → Pages** und den Live-HTTPS-Endpunkt verifizieren, nicht nur frühere Aussagen zitieren.
- **Keine Laufzeitdatenbank**, keine Nutzerauthentifizierung für den normalen Sitebetrieb.

### 2.2 Entwicklungsbefehle

~~~bash
npm ci
npm run dev

npm run test:endfield
node scripts/endfield/check-budget.mjs
npm run build
node scripts/check-pages-budget.mjs  # 1-GB-Website-Artefaktlimit (dist/)
npm run preview
~~~

Der Pull-Request-Workflow führt zusätzlich `scripts/endfield/browser-smoke.py` in echtem Chromium bei 1440/390 px aus (Python-Playwright im Runner temporär installiert). Deployment kontrolliert nach `npm run build` die Grösse des fertigen `dist/`-Ordners auf maximal **1.000.000.000 Byte**, unabhängig vom **100.000.000-Byte-Endfield-Arbeitsbaumlimit**.

`npm run test:endfield` führt alle `scripts/endfield/*.test.mjs` per Node-Test-Runner aus. Änderungen an der Datenstruktur, an Importern, am Build-Finder und an der Quelle-zu-ID-Zuordnung benötigen Regressionstests.

### 2.3 Grenzen und Speicherberechnung

- **Verbindliches eigenes Endfield-Budget:** **100 MB dezimal = 100.000.000 Byte**.
- Prüfung in `scripts/endfield/check-budget.mjs` zählt definierte Endfield-Verzeichnisse plus einzelne Style-/Nav-Dateien.
- **Nicht dasselbe wie:** Größe der gesamten Repository-Git-Historie, Gesamtgröße von GitHub Pages, Git-LFS-Quota oder eine angebliche feste Dateianzahlbegrenzung.
- Ein Datei-Umzug ohne Duplikation vergrößert den **aktuellen Arbeitsbaum** nicht wesentlich, kann aber zusätzliche Git-History-Objekte erzeugen. Alte Commits sind nicht in der 100-MB-Anzeige des Prüfscripts enthalten.
- Snapshot vor dieser Roadmap: Bilddateien unter `public/images/endfield/` insgesamt **950 Dateien**, rund **16,54 MB** reine Bilder. Der zuletzt vor diesem Task geprüfte vollständige Endfield-Bereich lag bei etwa **20,29 MB/100 MB**; bei jedem Build die **neue exakte Messung** heranziehen.
- Große Bilder weiterhin komprimieren und nicht unnötig erneut committen. Cache-/Import-Actions dürfen keine undokumentierten Massen-Downloads ins Repo schreiben.

**Letzter geprüfter Built-Site-Snapshot aus CI #117/#118 (16.10.2026):** Endfield-Arbeitsbaum 20.451.384 Byte / 100.000.000 Byte (20,45 %); `dist/` 17.104.472 Byte / 1.000.000.000 Byte (1,71 %, 970 Dateien). Der gesamte *vor* PR #28 gemessene Git-Tree lag bei 23.728.364 Byte; dies ist keine dist-Messung. Ab PR #28 gibt es für beide Limits eigenständige CI-Gates.

### 2.4 Sicherheits-/Datenschutzgrundsätze

- Repository ist **öffentlich**. Keine Passwörter, Cookies, Auth-Header, Token, privaten Browser-HARs, Kontodaten, Kontaktinformationen Dritter oder sonstige Geheimnisse committen.
- `local-data/` ist in `.gitignore` ausgeschlossen und für öffentliche Roh-Responses/Kontrollimporte gedacht.
- Für offizielle SKPORT-Quellen **nur öffentliche/anonyme** Endpunkte; keinen Login automatisieren.
- Browser-`localStorage` enthält Fortschrittsauswahl ausschließlich **lokal pro Browser/Gerät**; keine Kontensynchronisation behaupten.
- Drittquellen verlinken statt fremde Screenshots/Bilder oder komplette Texte ungeprüft zu vervielfältigen.
- Preview-/Diagnostics-/Research-Actions bei Bedarf temporär auf separatem Branch ausführen und nach Übernahme der belegten Daten entfernen.

### 2.5 Wichtige Dateien außerhalb Endfield

| Ort | Rolle | Status |
| --- | --- | --- |
| `src/pages/index.astro` | Landingpage, Header, Hero, Twitch, Beiträge, letzte YouTube-Videos | [FERTIG als Grundversion] |
| `src/pages/endfield.astro` | Endfield-Landing/Teaser | [FERTIG als Grundversion] |
| `src/pages/nte.astro` | NTE-Platzhalter | [TEILWEISE] |
| `src/pages/about.astro` | About-Platzhalter | [TEILWEISE] |
| `src/pages/posts/[slug].astro` | Einzelne Beiträge aus der Posts-Collection | [TEILWEISE] |
| `src/content/config.ts` | Astro-Collections `posts` und `operator-guides` | [FERTIG] |
| `src/styles/global.css` | Gemeinsame Farb-/Typo-/Header-Stile | [FERTIG als Grundlage] |
| `src/components/EndfieldNav.astro` | 9 Reiter im Endfield-Bereich | [FERTIG] |
| `public/images/` | Brand-/Portalassets und kategorisierte Endfield-Bilder | [TEILWEISE, laufend erweiterbar] |

**Wichtig für neue KIs:** Im Repository existieren außerdem ältere Root-Dateien (`index.html`, `css/` etc.). Für die aktuelle Astro-Website primär `src/pages/`, `src/components/` und `src/styles/` bearbeiten. Ältere Dateien nur ändern, wenn tatsächlich noch ein Build-/Deploy-Pfad davon abhängt.

---

## 3. HISTORIE / TATSÄCHLICH DURCHGEFÜHRTE ARBEIT

Die folgende Tabelle ist die bisherige belegte PR-/Commit-Kette. Sie dient dazu, ursprüngliche Motive, Umbauten und bereits gelöste Probleme nachzuschlagen. **Nicht alle experimentellen Branches wurden gemergt.**

| PR | Was geleistet wurde | Status |
| --- | --- | --- |
| [#1](https://github.com/Ag0n1st/ag0n1st.github.io/pull/1) | Landingpage als Astro-Grundgerüst mit Portalnavigation erneuert. | [FERTIG, merged 10.10.2026] |
| [#2](https://github.com/Ag0n1st/ag0n1st.github.io/pull/2) | Modulare neun Abschnitte umfassende Operator-Guide-Vorlage; konsistente Namenskonvention. | [FERTIG, merged 15.10.2026] |
| [#3](https://github.com/Ag0n1st/ag0n1st.github.io/pull/3) | Recherche zu öffentlichem SKPORT-Waffen-/Ausrüstungskatalog. | **[OFFEN, nicht merged]**; prüfen, ob obsolet, bevor fortgeführt. |
| [#4](https://github.com/Ag0n1st/ag0n1st.github.io/pull/4) | 940 offizielle Item-IDs, WebP-Bibliothek und 100-MB-Grenze. | [FERTIG, merged] |
| [#5](https://github.com/Ag0n1st/ag0n1st.github.io/pull/5) | Offizielle Waffen-/Ausrüstungsdetails und Herstellungskosten importiert. | [FERTIG, merged] |
| [#6](https://github.com/Ag0n1st/ag0n1st.github.io/pull/6) | Ursprünglicher Level-/Fabrikfilter. | [FERTIG, später fachlich erweitert] |
| [#7](https://github.com/Ag0n1st/ag0n1st.github.io/pull/7) | Ersetzt grobe Fabrikabstufung durch sieben Komponenten. | [FERTIG, merged] |
| [#8](https://github.com/Ag0n1st/ag0n1st.github.io/pull/8) | Bilder von Sammelordner nach Operatoren/Waffen/Gear/Materialien/Valuables sortiert, ohne Duplikat-Bilder. | [FERTIG, merged] |
| [#9](https://github.com/Ag0n1st/ag0n1st.github.io/pull/9) | Offizielle 19 Kartenebenen, 27 Wuling-Kistenmarker und Erwerbsartregister. | [FERTIG, merged] |
| [#10](https://github.com/Ag0n1st/ag0n1st.github.io/pull/10) | Community-Kisten-/Set-Recherche, 100 grobe Kandidaten. | [FERTIG als historischer Fallback] |
| [#11](https://github.com/Ag0n1st/ag0n1st.github.io/pull/11) | Konkrete Einzelteile aus Kisten-Iconlinks, Abgleich mit zweiter Datenbank und Konfliktberichten. | [FERTIG, merged] |
| [#12](https://github.com/Ag0n1st/ag0n1st.github.io/pull/12) | Tatsächlicher Story-/Gebiets-/Blaupausen-Filter inklusive `localStorage`. | [FERTIG, merged] |
| [#13](https://github.com/Ag0n1st/ag0n1st.github.io/pull/13) | Zentrale KI-Übergabe, Dokumentationsprozess, strikte Autoritätslevel-Grenze **60**. | Diese Roadmap-/Authority-Änderung; Merge/Deploy bei GitHub verifizieren. |

### 3.1 Frühe Produktentscheidungen, die erhalten bleiben sollen

- Von generischen Website-Buildern auf **Astro + GitHub Pages** gewechselt, damit flexible, vollständig kontrollierbare Guides und Tools möglich sind.
- Content aus Text-/Datendateien statt nur in einer grafischen Website-Oberfläche pflegen.
- **Operatoren-Kartenraster** als Einstieg, nicht primär eine reine Tabellenliste.
- Guide als **Wissensportal** mit neun wiederverwendbaren Sektionen, nicht nur eingebettetes YouTube-Video.
- **Komplexe Spiel-Datenstruktur** von redaktioneller Beurteilung entkoppeln; Importer frühzeitig auf zwei echte Operatoren testen.
- **Mobile-first-Korrektheit** bei wichtigen Profil-/Video-Sektionen: Desktop 50/50, Mobil Profil vor Video.
- Kein erfundenes Endgame-„bestes Set“, wenn dafür Quellen, Tests oder Creator-Entscheidungen fehlen.
- Bei Ausrüstung Nicht-Spielstand-abhängige Empfehlungen vermeiden: Story und tatsächlicher Fabrikausbau müssen berücksichtigt werden.
- Früheres allgemeines `items/`-Bildverzeichnis wurde nach userseitigem Hinweis **kategorisiert**. Keine erneute Sammlung unterschiedlicher Bildtypen in einem unklaren Ordner.

---

## 4. AKTUELLER PRODUKTSTATUS JE NAVIGATIONSSEITE

| Website-Bereich / Route | Implementierungsstatus | Konkret vorhanden | Was fehlt / nächste Maßnahme |
| --- | --- | --- | --- |
| **Startseite** `/` | [FERTIG als erste Version] | Hero, Twitch-Integration/Offline-Container, letzte Videos, Beitragskarten, Hauptnavigation, Footer. | Crossbrowser-Checks Live/Autoplay/Audio, SEO-Feinschliff, echte Beiträge, Änderungsmanagement. |
| **Endfield-Übersicht** `/endfield/` | [FERTIG als Grundversion] | Landing-Texte, Links zu Guide- und Tool-Bereichen; Zweitnavigation. | Mit echten fertigen Guides und Tools inhaltlich aktualisieren. |
| **Operatoren** `/endfield/operatoren/` | [FERTIG als Framework] | Kartenraster, lokales Cover, Klasse/Element/Seltenheit/Waffentyp, Preview-Kennzeichen. | Weitere Operatoren importieren, echte Guides ausbauen. |
| **Operator-Guide** `/endfield/operatoren/<slug>/` | [TEILWEISE] | 9-Abschnitte-Modell, offizielle Werte für Liino/Typhoeus, Source-/Material-/Stats-Anzeigen, Build-Finder. | Eigene Wertungen/Teams/Builds, weitere Operatoren, UI-/A11y-Feinschliff. |
| **Fabrik** `/endfield/fabrik/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Vollständige Tal4-/Wuling-Guides, Fortschrittsstufen, Plug-&-Play-Blueprints. |
| **Rekrutierung** `/endfield/rekrutierung/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Systemerklärung, Quoten/Fälle nur mit belastbaren Daten, Video-Integration. |
| **Veredelung** `/endfield/veredelung/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Werte, Schritte, Materialien, Anwendungsfälle und Fehlervermeidung. |
| **Essenzen** `/endfield/essenzen/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Erwerb, Werte, Zuordnung, Such-/Filterhilfen. |
| **Speedruns** `/endfield/speedruns/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Eigene Bossruns, Zeiten, Regeln, Filter und YouTube-Links. |
| **Checkliste** `/endfield/checkliste/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Daily-/Weekly-Aufgaben, lokale Speicherung, Reset-Regeln. |
| **Countdown** `/endfield/countdown/` | [GEPLANT; Seite vorhanden] | Routenseite/Platzhalter. | Offiziell belegbare Patchzeitpunkte, Zeitzone, UTC-/Sommerzeit-Logik. |
| **NTE** `/nte/` | [TEILWEISE/PLATZHALTER] | Eigene Seite, Navigation, Grundstil. | Eigene inhaltliche Informationsarchitektur, Guide-/Story-/Progressionssysteme. |
| **About** `/about/` | [TEILWEISE/PLATZHALTER] | Eigenständige Seite im CI-Stil. | Creator-Profil, Kooperationen und Kontaktinformationen nach Freigabe. |
| **Beiträge** `/posts/<slug>/` | [TEILWEISE] | Collection und Seitenroute. | Redaktionelle Beiträge, Teaser, SEO/Struktur. |

**Es sind aktuell keine redaktionellen Ausrüstungs-Builds in `liino.md` und `typhoeus.md` eingetragen** (`equipment.builds: []`). Deshalb lassen sich in der Live-Oberfläche noch keine echten vollständigen Buildvorschläge demonstrieren; die Filterlogik wurde mit Tests und einer temporären Browserprüfung validiert. Diesen Sachverhalt in neuen Chats nicht übersehen.

---

## 5. ARCHITEKTUR: CODE-, DATEN- UND VERANTWORTUNGSSCHICHTEN

### 5.1 Architekturgrundsatz: vier getrennte Datenebenen

1. **Offizielle objektive Spieldaten**: SKPORT-Snapshots (IDs, Seltenheit, Element, Skills, Stats, Materialkosten, Standardrezepte, offizielle Erwerbsweg-Texte). **Dürfen** durch überprüfbare Imports neu erzeugt werden.
2. **Community-Recherche und Quellenbelege**: mögliche konkrete Kistenstandorte, Inhaltslisten, individuell berichtete Fundorte und Story-Hinweise. **Müssen** Quellenqualität, Konflikte und Prüfstatus behalten; dürfen offizielle Daten nicht still überschreiben.
3. **Redaktionelle Creator-Ebene**: eigene Empfehlungen, Einschätzungen, Skill-/Team-/Build-Prioritäten, Videolinks, Prozentvergleiche mit Vergleichsbedingungen. **Darf nicht** beim automatischen Spieldatenimport verändert werden.
4. **Lokaler persönlicher Fortschritt des Besuchers**: Storyregion, freigeschaltete Gebiete, bestätigter Blaupausenbesitz und optionale Stufen im `localStorage`. **Darf nicht** als offizielle Tatsache über Spielmechaniken gespeichert/veröffentlicht werden.

**Abhängigkeit:** Objektive Daten + redaktionelle Einträge + optionale Community-Fundortbelege → Astro-Seite; lokale Fortschrittsauswahl → clientseitige Filterentscheidung. Keine öffentliche, persistente Multiplayer-/Nutzer-Datenbank.

### 5.2 Wichtigster Verzeichnisplan (tatsächlich vorhanden)

~~~text
/
├── ROADMAP.md                              # diese Datei, zentrale Übergabe
├── README.md                               # kurzer Setup-Einstieg
├── astro.config.mjs                       # Astro-site/base
├── package.json / package-lock.json
├── .gitignore                              # local-data ausgeschlossen
├── .github/workflows/
│   ├── deploy.yml                         # main -> GitHub Pages
│   ├── validate-astro.yml                 # PR-Tests
│   ├── import-endfield-catalog-assets.yml # manueller Katalogbildimport
│   ├── import-endfield-equipment.yml      # manueller Waffen-/Gearimport
│   ├── import-official-gear-map.yml       # offizieller Kartensnapshot
│   ├── probe-liino-wiki.yml               # vorhandene Probe-Action, prüfen vor Nutzung
│   └── sync-endfield-assets.yml           # WebP-Synchronisierung
├── docs/
│   ├── operator-guide-workflow.md
│   ├── endfield-story-progression.md
│   ├── endfield-story-build-filter.md
│   ├── endfield-blueprint-research.md
│   └── endfield-blueprint-piece-audit.md
├── src/
│   ├── pages/
│   │   ├── index.astro                    # Homepage
│   │   ├── endfield.astro                 # Endfield-Übersicht
│   │   ├── nte.astro                      # NTE-Platzhalter
│   │   ├── about.astro                    # About-Platzhalter
│   │   ├── posts/[slug].astro
│   │   └── endfield/
│   │       ├── operatoren/index.astro
│   │       ├── operatoren/[slug].astro
│   │       ├── charaktere/...             # alte Redirect-Routen
│   │       ├── fabrik/index.astro
│   │       ├── rekrutierung/index.astro
│   │       ├── veredelung/index.astro
│   │       ├── essenzen/index.astro
│   │       ├── speedruns/index.astro
│   │       ├── checkliste/index.astro
│   │       └── countdown/index.astro
│   ├── components/
│   │   ├── EndfieldNav.astro
│   │   ├── endfield/ItemIcon.astro
│   │   ├── endfield/MaterialCosts.astro
│   │   └── operator/
│   │       ├── OperatorGuide.astro
│   │       └── sections/
│   │           ├── OperatorOverview.astro
│   │           ├── OperatorKit.astro
│   │           ├── OperatorSkills.astro
│   │           ├── OperatorWeapons.astro
│   │           ├── OperatorEquipment.astro
│   │           ├── OperatorPotentials.astro
│   │           ├── OperatorTeams.astro
│   │           ├── OperatorGameplay.astro
│   │           └── OperatorConclusion.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── operatorGuideSchema.ts
│   │   └── operator-guides/
│   │       ├── _template.md
│   │       ├── liino.md
│   │       └── typhoeus.md
│   ├── data/endfield/
│   │   ├── catalog/items.json
│   │   ├── catalog/equipment-details.json
│   │   ├── operators/{liino,typhoeus}.json
│   │   ├── operators/{liino,typhoeus}.extra.json
│   │   ├── locales/de/{liino,typhoeus}.json
│   │   └── progression/
│   │       ├── story-areas.json
│   │       ├── gear-template-crates.json
│   │       ├── blueprint-community-claims.json
│   │       ├── blueprint-research-index.json
│   │       ├── blueprint-wiki-crate-contents.json
│   │       ├── gear-piece-acquisition-sources.json
│   │       ├── blueprint-precise-gear-index.json
│   │       └── blueprint-confirmations.json
│   ├── lib/endfield/
│   │   ├── operatorData.ts / operatorLocale.ts
│   │   ├── operatorAssets.ts / operatorGuideModel.ts
│   │   ├── itemCatalog.ts / equipmentDetails.ts
│   │   ├── blueprintResearch.mjs / preciseBlueprints.mjs
│   │   ├── gearBlueprintResearch.ts / blueprintConfirmations.mjs
│   │   ├── storyAreas.mjs
│   │   ├── buildFinder.mjs
│   │   └── buildStoryProgress.mjs
│   └── styles/
│       ├── global.css
│       └── operator-guides.css
├── public/images/endfield/
│   ├── operators/                       # Operator-Cover und icons/
│   ├── weapons/                         # Waffen-Icons
│   ├── gear/                            # konkrete Ausrüstungsteil-Icons
│   ├── materials/                       # Item Files / Materialien
│   └── valuables/                       # Valuables Stash
└── scripts/endfield/
    ├── README.md                        # umfangreiches Importer-Handbuch
    ├── import-operator.mjs
    ├── import-equipment.mjs
    ├── sync-assets.mjs
    ├── catalog-assets.mjs
    ├── equipment-normalize.mjs
    ├── import-gear-piece-sources.mjs
    ├── import-wiki-crate-contents.mjs
    ├── build-blueprint-index.mjs
    ├── build-precise-blueprints.mjs
    ├── import-official-gear-map.mjs
    ├── check-budget.mjs
    └── *.test.mjs
~~~

Der Baum ist eine **Orientierung**, keine Garantie, dass jede Datei in allen künftigen Commits unverändert existiert. Vor Bearbeitung Dateipfad prüfen.

### 5.3 Fachliche Modulverantwortlichkeiten

| Datei / Modul | Verbindliche Aufgabe |
| --- | --- |
| `src/lib/endfield/operatorData.ts` | Lokale Operator-/Extra-JSON-Dateien entdecken, validieren, abrufen. |
| `src/lib/endfield/operatorLocale.ts` | Deutschsprachige, snapshotgebundene Übersetzungen laden; veraltete Übersetzung nicht still auf neue Rohdaten anwenden. |
| `src/lib/endfield/operatorGuideModel.ts` | Importierte Spielwerte und redaktionelles Markdown für neun Guide-Abschnitte aufbereiten. |
| `src/lib/endfield/operatorAssets.ts` | Lokale Artworks/Icons und Fallbacks referenzieren. |
| `src/lib/endfield/itemCatalog.ts` | Offizielle Item-ID/Slug/Name und passenden lokalen Bildpfad auflösen. |
| `src/lib/endfield/equipmentDetails.ts` | Detaildatensätze für Waffen und Gear mit offiziellen Stats/Materialien bereitstellen. |
| `src/lib/endfield/storyAreas.mjs` | Offizielle Erwerbswege, 19 Gebiete, Belegstatus, Gebietszugang/Eligibility; keine erfundenen Quests. |
| `src/lib/endfield/blueprintResearch.mjs` | Historisch grobe Community-Kandidaten und Set-Vermutungen als Fallback. |
| `src/lib/endfield/preciseBlueprints.mjs` | Konkrete Wiki-Kisteninhalte + zweite Einzelteilquelle gegen offizielle Gear-IDs abgleichen; Widersprüche protokollieren. |
| `src/lib/endfield/gearBlueprintResearch.ts` | Für die UI belastbarste verfügbare Quellenebene bereitstellen (manuell bestätigt > konkretes Einzelteil > grobes Set). |
| `src/lib/endfield/blueprintConfirmations.mjs` | Persönlich geprüfte exakte Gear-ID/Marker-ID-Verbindungen validieren. |
| `src/lib/endfield/buildFinder.mjs` | Offizielle Standardrezept-Zutaten → höchste Fabrikkomponente; Level-/Vier-Teile-Check. |
| `src/lib/endfield/buildStoryProgress.mjs` | Storyregion, Gebiet, Erwerbsart, Autoritätslevel, Warenumverteilung und tatsächlichen Vorlagenbesitz auswerten. |
| `src/components/operator/OperatorGuide.astro` | Neun Guide-Abschnitte einbinden, Browser-Interaktionen, Inhaltsnavigation, lokale Nutzereingaben. |
| `src/components/operator/sections/OperatorEquipment.astro` | Level-/Fabrik-/Gebiets-/Besitz-Auswahl, Build-Karten und individuelle Quelleninformationen anzeigen. |
| `src/content/operatorGuideSchema.ts` | Redaktionelle YAML-Validierung, Feldregeln, Beziehungen zwischen Teams/Builds/Operatoren. |

---

## 6. OPERATOR-GUIDES: INHALT, TEMPLATE, IMPORT UND REDAKTION

### 6.1 Status [TEILWEISE]

- Die generische Route `/endfield/operatoren/[slug]/` und das Operatoren-Kartenraster sind implementiert.
- Guides erscheinen aus der Astro-Collection: `draft` unsichtbar, `preview` öffentlich klar als Vorschau gekennzeichnet, `published` regulär veröffentlicht.
- **Typhoeus** und **Liino** sind aktuell beide `preview` und haben noch keine selbst gepflegten Gear-Builds.
- Die beiden aktuell editierbaren redaktionellen Dateien sind ausdrücklich `src/content/operator-guides/liino.md` und `src/content/operator-guides/typhoeus.md`; beide verwenden das einheitliche Content-Schema.
- Objektive SKPORT-Snapshots sind für beide Operatoren vorhanden. Eigene Skillbewertungen, Pros/Cons, Gear-/Waffenranking, Pullberatung, Teams und Videos dürfen nicht dazuerfunden werden.
- **Operator-IDs/Quellen:** Typhoeus SKPORT-Item-ID **1173**, Liino **1041**. Die generischen Dateien liegen in `src/data/endfield/operators/`.
- Für Liino dokumentiert: 6★, Electric Supporter, Polearm, TGCC; Talent-/Promotion-/Potenzial-/Skillinformationen wurden in der Importerentwicklung gegen den echten Wiki-Export abgeglichen.
- Die Darstellung ist auf **neun wiederverwendbare Komponenten** statt separater, kopierter Seiten aufgebaut.

### 6.2 Das neunteilige Guide-Framework

1. **Übersicht / Charakterprofil** – Desktop 50/50 zwischen Operator-Profil und Video, mobil oben Profil und darunter Video. Bild, Name, Seltenheit/Sterne, Klasse, Element, Waffentyp, ggf. Traits sowie Haupt-/Sekundärattribut; **Stärken / Schwächen** und kompakter **Build auf einen Blick** (Waffen-, Gear-, Skill-Icons und Prioritätszeichen). Einordnung über **Schwierigkeit, Flexibilität, Zugänglichkeit**, je 1–5. Keine redundante riesige Investitionsübersicht.
2. **Operator Kit** – verständliche Kernmechaniken, Rolle, wichtige Talente, Spielweise, Ressourcen-/Fortschrittshinweise. Spieldaten aus Import, eigene Erklärungen aus Markdown.
3. **Fertigkeiten** – Basic/Battle/Combo/Ultimate, Skillwerte über Ränge und Masteries, Materialkosten, interaktiver Rangwechsel; redaktionelle Priorität (vier Skills, drei Vergleichszeichen) nur nach Bewertung.
4. **Waffen** – konkrete Empfehlungen über offizielle `weaponId`, Kategorien BiS/BP/F2P/Alternative, exakte Stats/Tuning/Potenziale, Begründungen. Prozentvergleiche nur mit tatsächlichem Testaufbau.
5. **Ausrüstung** – **vier Gear-IDs pro Build**, Level-/Komponenten-/Story-/Gebiets-/Vorlagenprüfung, konkrete Stats, Seteffekte, Materialkosten, freie Anzahl situativer Builds, Progression und Quellen-/Freischaltinformationen.
6. **Potenziale** – P1 bis P5, Effekte und Creator-Bewertung, ggf. belegbare Zuwächse gegenüber Vorgängerstufe und P0; konsistenter Hinweis zur eigenständigen Pullentscheidung.
7. **Teams** – Teambauprinzip, Meta-Teams und weitere Varianten, jeweils vier **unterschiedliche** Operatoren einschließlich des besprochenen Operators; optional Link auf `equipment.builds[].id`.
8. **Gameplay** – Showcases, Bosskämpfe/Speedruns, Rotationen/Tips, Videoeinbindung und optionale spezielle Deep-Dives.
9. **Fazit** – Gesamtbewertung, Eignung für Spielertypen, empfehlenswert/bedingt/optional und Pull-/Ressourcenhinweise.

**Designanforderungen:** Inhaltsverzeichnis beim Scrollen erreichbar und aktiver Abschnitt subtil hervorgehoben; mobile Lesbarkeit; große Bilddateien nicht unnötig vervielfältigen; Datenkarten mit kurzen klaren Labels; bei fehlenden Daten keine falschen Zahlen oder erfundenen Charakterdetails.

### 6.3 Ein neues Guide-Dokument anlegen

~~~text
1. src/content/operator-guides/_template.md kopieren
2. Nach <operator-slug>.md umbenennen
3. operator: <operator-slug>, status: draft
4. Objektive SKPORT-Operator-/Gear-IDs recherchieren und ggf. importieren
5. Eigene Texte/Builds/Waffen/Teams in YAML eintragen
6. npm run test:endfield / npm run build
7. Preview (status: preview) oder echte Veröffentlichung (status: published)
8. Pull Request -> CI -> Merge -> Deploy -> Browserprüfung
9. ROADMAP.md: Status, konkrete Quellen, nächste Schritte aktualisieren
~~~

**Schemaregeln:** IDs Kleinbuchstaben/Zahlen/Bindestriche; genau vier Gear-IDs je Ausrüstungs-Build; genau vier unterschiedliche Teammitglieder inklusive Guide-Operator; Team-`buildId` muss auf existierenden Build zeigen; nur ein „featured“ Gameplay-Showcase; bei `published` Kurzbeschreibung und Fazit zwingend; Prozentvergleiche nur mit dokumentierten Bedingungen.

**Editorielle Arbeitsdateien:** `liino.md` und `typhoeus.md` nicht als Import-Ausgaben behandeln. Die Markdown-Dateien sind die editierbaren Quelldokumente für persönliche Inhalte; importierte JSON-Dateien dagegen reproduzierbare Spielwerte.

### 6.4 SKPORT-Operator-Importer [FERTIG für zwei bestätigte Beispiele / TEILWEISE generisch]

- Fachliche Dokumentation: [`scripts/endfield/README.md`](scripts/endfield/README.md).
- Generischer Parser: `scripts/endfield/import-operator.mjs`.
- Rohdaten: **öffentliche** `/web/v1/wiki/item/info?id=...` und öffentlicher Itemindex `/web/v1/wiki/item/list`; bei notwendigen Netzwerkcapturen keine Credentials verwenden.
- Benötigte lokale Eingaben nach `local-data/skport/` (nicht committen), inklusive Item-JSON und öffentlichem Items-Index.
- Beispiel für eine noch zu prüfende Operator-ID:

~~~bash
node scripts/endfield/import-operator.mjs \
  --input local-data/skport/new-operator.json \
  --items local-data/skport/public-items-index.json \
  --id 1234 \
  --slug neuer-operator \
  --snapshot 2026-10-15 \
  --out-dir src/data/endfield/operators
~~~

**`1234` ist nur eine Platzhalter-ID, kein realer Operator.**

- Der Parser identifiziert Widgets/Abschnitte und validiert verschachtelte Referenz-IDs, Fertigkeiten, Rangtabellen, Materialien, Talente, Promotions und Potenziale. Bei Schema-Abweichungen anhalten und Parser/Tests erweitern.
- Liino hatte zusätzliche Metadaten neben den eigentlichen Skill-/Potenzialtabellen; diese nicht blind als Effektwerte interpretieren.
- Die Extra-Dateien (`<slug>.extra.json`) enthalten u. a. Attribute, Talente, Promotions und Potenziale.
- Separate deutsche Übersetzung unter `src/data/endfield/locales/de/`. **Snapshotbindung** schützt vor alten Übersetzungen nach einem Spielpatch.
- **Noch nicht umgesetzt:** Vollständig autonomer, fehlerfrei für alle Operatoren laufender Massenimport samt deutscher Qualitätssicherung. Nicht behaupten, dass „alle Operatoren“ bereits im Katalog der detaillierten Guide-Seiten existieren.

### 6.5 Operator-Guides: konkrete nächste Arbeiten

| Schritt | Status | Definition of Done |
| --- | --- | --- |
| Offizielle Liino-/Typhoeus-JSON und Cover | [FERTIG] | Aktuelle lokale Daten validieren und auf Guide-Seiten laden. |
| Liino-Guide redaktionell füllen | **[NÄCHSTER INHALTSSCHRITT]** | Erst echte freigegebene Builds, dann Bewertungen, Skill-Prio, Teamvorschläge, Videolink. |
| Typhoeus-Guide vervollständigen | [GEPLANT] | Gleiches Framework, Video und Fortschrittsvarianten aus echten Creator-Inhalten. |
| Build-Kurzüberblick in Sektion 1 befüllen | [TEILWEISE] | Nur aus tatsächlich angelegtem, referenziertem Build. |
| Weitere Operatoren importieren | [GEPLANT] | Je Operator offizielle Item-ID, normalisierte Daten, lokale WebPs, DE-Locale, Guide-Datei. |
| Guide-/Datenschema langfristig erweitern | [GEPLANT] | Nur bei belegter notwendiger Strukturabweichung; Rückwärtskompatibilität prüfen. |
| Daten-Diff nach Versionen | [GEPLANT] | Offizielle Änderungen sichtbar, manuelle Empfehlungen nie überschreiben. |

---

## 7. OFFIZIELLER END­FIELD-KATALOG, BILDER UND HERSTELLUNG

### 7.1 Offizielle Katalogbasis [FERTIG für Snapshot 15.10.2026]

Die öffentliche offizielle **SKPORT-Wiki** ist der Primärbeleg für objektive Item-Informationen. Der ursprüngliche Item-Snapshot enthält:

| Kategorie | Offizielle Einträge | Lokaler Ordner |
| --- | ---: | --- |
| Operatoren | **35** | `public/images/endfield/operators/icons/` und `operators/<slug>/` für zusätzliche Artworks |
| Waffen | **84** | `public/images/endfield/weapons/` |
| Ausrüstungsteile / Gear | **258** | `public/images/endfield/gear/` |
| Item Files / Materialien | **340** | `public/images/endfield/materials/` |
| Valuables Stash | **223** | `public/images/endfield/valuables/` |
| **Gesamt** | **940** | Lokale WebP-Bibliothek |

Die Bilddateien in `public/images/endfield/` sind mehr als 940, weil die Operator-Cover/Skills zusätzlich existieren. Unterscheidung zwischen **Katalog-Icons** und **extra Operator-Artworks** beibehalten.

- Manifest: `src/data/endfield/catalog/items.json`. Offizielle numerische Item-ID als Dateiname `<id>.webp` und Datenbankschlüssel.
- Bei Materialien etc. Symbole aus bestehender Katalogbibliothek verwenden statt kopieren; `ItemIcon.astro` und `MaterialCosts.astro`.
- Die Bilder wurden aus größeren Originaldateien als WebP komprimiert; keine zweite PNG-/JPEG-Bibliothek nebenbei erzeugen.
- Fehlerhafte/fehlende Dateien nicht auf ein fremdes Item umbiegen; wenn verfügbar, mit neutralem Text-Platzhalter und Fehlerhinweis arbeiten.
- Die Trennung in `gear/`, `materials/`, `weapons/`, `valuables/` und `operators/` ist eine bewusste Entscheidung aus PR #8.

### 7.2 Waffen und Gear-Details [FERTIG mit offenen Wiki-Lücken]

`src/data/endfield/catalog/equipment-details.json` enthält **84 Waffen** und **258 Ausrüstungsteile** mit geprüften offizielle Metadaten.

- **80 Waffen** besitzen die erwarteten Detail-Widgets; **4 neuere Waffen** (SKPORT-IDs 1280–1283) hatten beim Import keine vollständigen Details und bleiben bewusst `incomplete`.
- **258/258 Gear** haben ein offizielles Stats-Widget und einen eindeutig zugeordneten **Standard-Herstellungsweg**.
- Für **167/258 Gear** gibt es ein Artificing-/Veredelungswidget; bei anderen `not-listed`, ohne offizielle Grundwerte fälschlich als unvollständig zu markieren.
- Import-/Normalisierungs-Skripte: `scripts/endfield/import-equipment.mjs` und `equipment-normalize.mjs`.
- Offizielle SKPORT-`acquisitionNotes` beschreiben Erwerbswege, nicht automatisch eine individuelle Kartenposition.
- Bei fehlenden Widgets/Schemata: `incomplete`/`needs-review` statt eigener statischer Zahlen.

### 7.3 Ausrüstung darf nicht nur nach Rüstungs-Level sortiert werden

Die folgenden sieben Komponentenstufen sind eine redaktionell definierte Reihenfolge, **unterlegt mit offiziellen Komponenten-Item-IDs und Standardrezepten**. Siehe `src/lib/endfield/buildFinder.mjs`.

| Reihenfolge | Komponente | Item-ID | Typische Gear-Level im aktuellen Modell | Phase |
| ---: | --- | ---: | --- | --- |
| 1 | Amethyst | 525 | 20 / 28 | Early |
| 2 | Ferrium | 526 | 36 | Early |
| 3 | Cryston | 527 | 50 | Early |
| 4 | Xiranit | 528 | 60 / 70 | Mid |
| 5 | Cuprium | 747 | 70 | Mid |
| 6 | Hetonit | 844 | 70 | End |
| 7 | Pyrrolit | 1067 | 70 | End |

**Wichtig:** Allein Level 70 erlaubt *nicht* den Schluss, Pyrrolit-Verarbeitung oder entsprechende Blaupausen seien freigeschaltet. Das benötigte Tier eines Builds wird aus der **höchsten Komponente der vier offiziellen Standardrezepte** berechnet. Komponenten darf der Nutzer separat wählen.

**Default im Finder:** Spieler-Level **70** und Fabrikkomponente **Pyrrolit** (bewusst gewünscht). Das sind Eingabe-Defaults, **kein Beweis tatsächlicher Freischaltung**.

### 7.4 Offizielle Erwerbsarten: 258 Gear-IDs

| SKPORT-Erwerbsweg | Gear-Einträge |
| --- | ---: |
| `Gear Template Crate` | **125** |
| `Authority Level ... Reward` | **86** |
| `Wuling Stock Redistribution Level ...` | **20** |
| `Game progress reaches the [Wuling] region` | **15** |
| Nicht ausreichend bestimmbar | **12** |
| **Gesamt** | **258** |

Diese Unterscheidung ist implementiert in `src/lib/endfield/storyAreas.mjs`. Der Erwerbsweg ersetzt weder einen Story-Meilenstein noch den tatsächlichen Besitz der Vorlage. Insbesondere ist „Autoritätslevel erfüllt“ nicht gleich „Belohnung abgeholt“.

---

## 8. STORY-, GEBIETS- UND BLAUPAUSENRECHERCHE

### 8.1 Was die offiziellen SKPORT Map Tools nachweisen [FERTIG]

- Der vom Publisher verlinkte SKPORT-Kartendienst lautet https://game.skport.com/map/endfield.
- `src/data/endfield/progression/story-areas.json` führt **19 offiziell bezeichnete Kartenebenen**: **6 Tal4**, **13 Wuling**.
- `src/data/endfield/progression/gear-template-crates.json` enthält **27 offizielle Gear-Template-Crate-Marker in Wuling**, jeweils mit Marker-ID, Gebiet, `officialMapLevelId` und 3D-Positionskoordinaten.
- Die offiziellen Kistenmarker liefern in diesem Snapshot **keine eindeutige Liste konkreter enthaltenen Gear-IDs**. Keine fiktiven Marker-zu-Gear-Links eintragen.
- Quellen-Nachweise, Patchnotizen und Unsicherheiten stehen in [`docs/endfield-story-progression.md`](docs/endfield-story-progression.md).
- Der zugehörige Importer ist `scripts/endfield/import-official-gear-map.mjs`; aktuelle Marker-Anzahl niemals bei einem Versionswechsel einfach voraussetzen, sondern neu prüfen.

### 8.2 Offizielle Gebietshierarchie [FERTIG als Daten, nicht als Quest-Automation]

**Tal4 (Valley IV)** – 6 Ebenen:

1. The Hub (`the-hub`)
2. Valley Pass (`valley-pass`)
3. Aburrey Quarry (`aburrey-quarry`)
4. Originium Science Park (`originium-science-park`)
5. Origin Lodespring (`origin-lodespring`)
6. Power Plateau (`power-plateau`)

**Wuling** – 13 Ebenen:

1. Jingyu Valley (`jingyu-valley`)
2. Wuling City (`wuling-city`)
3. Qingbo Stockade (`qingbo-stockade`)
4. Marker Stone (`marker-stone`)
5. Marker Stone Interiors (`marker-stone-interiors`)
6. Test Area (`test-area`)
7. Sword Vault Dale (`sword-vault-dale`)
8. Yinglung Pass (`yinglung-pass`)
9. North Wuling Exclusion Zone (`north-wuling-exclusion-zone`)
10. Snowy Forest (`snowy-forest`)
11. Suiming (`suiming`)
12. Si's Painting (`sis-painting`)
13. Main Pillar Office (`main-pillar-office`)

**Keine automatische Kapitel-Reihenfolge erfinden.** Jede Kartenebene kann durch Hauptmission, Nebenquest, frühen Eventzugang oder andere Voraussetzungen erreicht werden. Der aktuelle UI-Filter fragt daher **erreichte Region und die einzelnen tatsächlich freigeschalteten Gebiete** ab, statt „Kapitel VIII fertig“ gleich allen früheren Gebieten zu setzen.

### 8.3 Die 27 Kisten nach Region

| Wuling-Gebiet | Offizielle Gear-Template-Marker |
| --- | ---: |
| Jingyu Valley | 4 |
| Wuling City | 8 |
| Qingbo Stockade | 3 |
| Marker Stone | 3 |
| Marker Stone Interiors | 1 |
| Sword Vault Dale | 2 |
| Yinglung Pass | 2 |
| Snowy Forest | 2 |
| Si's Painting | 2 |
| **Gesamt** | **27** |

Es sind **keine** Gear-Template-Marker in einigen anderen Kartenebenen des Snapshots gelistet. Daraus nicht schließen, dort könne das Spiel generell keine Gear-Vorlagen vergeben.

### 8.4 Von groben Sets zu konkreten Gear-IDs [FERTIG/RECHERCHE]

Die erste Community-Recherche in PR #10 sammelte Fundorte und Setnamen: **100/125** offizielle Kistengear-IDs hatten eine **mögliche** Gebietszuordnung, davon **21 mehrdeutig**, **25 ohne ausreichende Hinweise**. Diese Zahlen sind **historischer Fallback**, nicht der aktuelle Präzisionsstand.

PR #11 wertete die tatsächlich verlinkten Gear-Icons der Talos-Wiki-Kistentabelle aus und verglich die Einzelteilnamen mit der individuellen Endfield-Hub-Erwerbsortliste. **Aktueller genauer Datensatz:**

- **24** von **27** offiziellen Wuling-Kisten besitzen eine identifizierte Community-Wiki-Einzelteilliste.
- **113** Einzelteil-Kistenlinks führen auf **112 unterschiedliche offizielle SKPORT-Gear-IDs**.
- Bei **3** Kisten-/Teil-Zeilen widerspricht der offizielle SKPORT-Erwerbsweg der Community-Kistenaussage.
- **1** Einzelteil erscheint in der Wiki in **zwei verschiedenen Kisten**.
- Von **125** offiziell als Kistengear klassifizierten Gear-IDs sind **92** auf eine recherchierte Kiste ohne festgestellten Quellenkonflikt eingrenzbar:
  - **53** durch zwei Community-Quellen gestützt.
  - **38** anhand einer konkreten Wiki-Einzelteilliste.
  - **1** über die Endfield-Hub-Einzelteilliste.
- **23** offizielle Kistengear-IDs besitzen einen offenen Quellenkonflikt.
- **10** offizielle Kistengear-IDs sind einzelteilbezogen noch nicht zugeordnet.
- Zusätzlich haben **25** andere Gear-Einträge eine Community-Erwerbsaussage, die einem anderen offiziellen SKPORT-Erwerbsweg widerspricht.

**Die Zahlen beschreiben Evidenz und Konfliktstatus, nicht 92 bereits offiziell bestätigte Marker-zu-Gear-Verbindungen.** Die exakte Zuordnung der benannten Community-Kisten zu einzelnen SKPORT-Marker-IDs benötigt weiterhin überprüfte Koordinaten/Fotos/Videos/Ingame-Nachweise.

### 8.5 Wichtigste Forschungsdateien

| Datei | Zweck | Wie aktualisieren? |
| --- | --- | --- |
| `story-areas.json` | Regionen, Kartenebenen, Quellen, Story-Meilensteine, verifizierte Verknüpfungen | Neue Version/Map Tools prüfen und Register validieren. |
| `gear-template-crates.json` | Offizielle Kistenmarker/Koordinaten | `import-official-gear-map.mjs`; Größen-/Gebietsänderung kontrollieren. |
| `blueprint-community-claims.json` | Community-Quellen, Landmark-Namen, Kisten-/Setclaims, Quests/Wege | Quellen einzeln lesen, Änderungen mit Nachweis und Datum dokumentieren. |
| `blueprint-research-index.json` | Historischer grober Set-Kandidatenindex | `build-blueprint-index.mjs` bei Bedarf; nicht als exakte Quelle präsentieren. |
| `gear-piece-acquisition-sources.json` | Einzelteilweise Endfield-Hub-Orts-/Erwerbstexte | `import-gear-piece-sources.mjs`; Konflikte behalten. |
| `blueprint-wiki-crate-contents.json` | 24 konkrete Kistenlisten mit Einzelteil-Links | `import-wiki-crate-contents.mjs`; Tabellenstruktur beim Patch neu prüfen. |
| `blueprint-precise-gear-index.json` | Abgleich der offiziellen Gear-IDs gegen beide konkreten Quellen | `build-precise-blueprints.mjs` nach Quellenupdate. |

**Exakter Dateipfad des aktuellen Einzelteil-Index:** `src/data/endfield/progression/blueprint-precise-gear-index.json`. Eine neue KI darf diesen Ergebnis-Index nicht mit `blueprint-research-index.json` (ältere Set-Ebene) verwechseln.
| `blueprint-confirmations.json` | **Nur ausdrücklich persönlich belegte** Gear-ID + offizielle Marker-ID | Im Spiel/Video verifizieren und manuell ergänzen. |

Lesedokumente:
- [`docs/endfield-blueprint-piece-audit.md`](docs/endfield-blueprint-piece-audit.md): sämtliche 24 konkret erforschten Kisten, Inhalte, IDs, Konflikte.
- [`docs/endfield-blueprint-research.md`](docs/endfield-blueprint-research.md): ältere, grobere Recherche und Quellen.
- [`docs/endfield-story-progression.md`](docs/endfield-story-progression.md): SKPORT-Karte und Gebiets-/Storyannahmen.

### 8.6 Ein verlässliches Marker-zu-Gear-Mapping eintragen

1. Einzelteil anhand seiner **SKPORT-ID** und offiziellen Erwerbsart identifizieren.
2. In `blueprint-precise-gear-index.json` Recherche-Kisten-ID, Gebiet, Landmark-Namen und Quellen öffnen.
3. Passenden Marker aus `gear-template-crates.json` anhand **konkreter Koordinaten / nachvollziehbarer Karte** suchen.
4. Den Fund und **das tatsächlich angezeigte Gear-Teil** im Spiel oder in einem eindeutig zuordenbaren Video/Screenshot bestätigen.
5. `blueprint-confirmations.json` mit `gearId`, `markerId`, Datum, Nachweistyp, nachvollziehbarer Notiz und Prüfer aktualisieren.
6. Validator/Tests starten; die geprüfte Verbindung darf in den bestätigten Datenpfad. Vorher als Community-Kandidat belassen.
7. Dokumentation mit Quelle, Widerspruchsauflösung, betroffenen IDs und ggf. Patchversion aktualisieren.

**Besonderes Risiko:** In neuen Versionen können **bestehende Setfamilien** neue Ausrüstungsteile erhalten. Die Setzugehörigkeit beweist nicht, dass das neue Teil in einer Kiste des aktuellen neuen Gebiets liegt.

### 8.7 Version vom 15.10.2026 und offene Fragen

- Für **Si's Painting** sind **2** offizielle Kistenmarker erfasst. Ihre individuellen Gear-Inhalte fehlen weiterhin in der konkreten Community-Tabelle.
- Die Patchnotes führen neue Teile für die Setfamilien **Type 50 Yinglung**, **Pulser Labs**, **Eternal Xiranite**, **Rift Trekker** und **AIC Fieldwork** auf. Nicht pauschal alle neuen Teile denselben zwei Kisten zuordnen.
- Weitere Gebiets- und Missionseingänge sind als Community-Hinweise vorhanden; **nicht automatisch** offizielle Unlock-Quests daraus machen.
- Bei künftigen Patches: offizielle Daten → Community-Fundorte → Konfliktprüfung → Build-Finder-Regelprüfung → Redaktion freigeben.

---

## 9. BUILD-FINDER: FUNKTION, GRENZEN UND REGRESSIONSSZENARIEN

### 9.1 Implementiert [FERTIG als Engine/UI, Guides inhaltlich noch leer]

Der Browser-Build-Finder prüft **für einen vierteiligen redaktionellen Build**:

1. Es existieren vier offizielle Gear-Einträge und ihre Standardrezepte sind gültig.
2. Das gewählte **Operator-/Gear-Level** ist ausreichend.
3. Die gewählte **höchste herstellbare Fabrikkomponente** entspricht dem höchsten benötigten Rezepttier.
4. Der Spieler hat die **Storyregion Tal4/Wuling** selbst ausgewählt.
5. Er kann **einzelne offiziell bezeichnete Gebiete** als tatsächlich zugänglich markieren.
6. Für Gear-Erwerbsarten „Autoritätslevel“ oder „Wuling-Warenumverteilung“ sind **optionale Stufen** separat hinterlegt.
7. Für **jedes der vier Gear-Teile** kann der Spieler **tatsächlich erhaltene Blaupause** bestätigen.
8. Nur wenn die geltenden Prüfbedingungen erfüllt sind und **alle vier Blaupausen ausdrücklich bestätigt** wurden, gilt der Build als vollständig „Passend“.

**Grenzen und wichtige Semantik:**
- **Gebiet besucht ≠ Blaupause eingesammelt.**
- **Wuling erreicht ≠ alle Wuling-Nebenmissionen abgeschlossen.**
- **Autoritätslevel/Umverteilungsstufe erfüllt ≠ Belohnung beansprucht.**
- **`storyUnlock`-Freitext in Guide-YAML ≠ technisch bestätigte Freischaltung.**
- Wenn ein Besucher eine Blaupause bereits besitzt, kann er sie als vorhanden markieren, obwohl ihre alte Herkunft nicht mehr bekannt ist. Das darf die technische Verfügbarkeit durch fehlenden Kartenbeleg nicht fälschlich verhindern.
- **Widersprüchliche/ungeklärte Quellen** bleiben als solche markiert, solange der Besitz nicht bestätigt wurde.
- Keine vollständig redaktionellen Builds in Liino/Typhoeus = momentan nur Framework-UI, **keine** ungefragt erfundenen „Best Builds“.

### 9.2 Aktuelle Auswahlmöglichkeiten

- Gear-/Operator-Level: `70, 60, 50, 36, 28, 20, 10`.
- Fabrikkomponente: `Amethyst, Ferrium, Cryston, Xiranit, Cuprium, Hetonit, Pyrrolit`.
- Storyregion: leer / Tal4 / Wuling.
- Einzelne Gebietshäkchen: 6 + 13 offizielle Kartenebenen.
- **Autoritätslevel: maximal 60** (`MAX_AUTHORITY_LEVEL`; User-Änderung 15.10.2026). Optionale Eingabe, leere Werte bleiben „nicht angegeben“.
- Wuling-Warenumverteilung: Stufen 0–3 als aktuelle UI-Auswahl; eine spätere Spieländerung darf nicht ohne Quellenprüfung ergänzt werden.
- Vier einzelne Blueprint-Häkchen pro Build; gleiche Gear-ID über verschiedene Guides im selben Browser konsistent speichern.
- Anzeige aller Builds oder nur nachgewiesen verfügbarer Builds.
- **Zurücksetzen** der lokalen Story-/Gebiets-/Blaupauseneingaben.
- Die Fabrikauswahl startet bei jedem Seitenbesuch bewusst mit `Pyrrolit`, unabhängig von eventuell wiederhergestellten Browserformularwerten.

### 9.3 Statusmeldungen und Verhalten

| Code / UI | Wann? |
| --- | --- |
| `available` / „Passend“ | Level + Fabrik + alle vier Blaupausen bestätigt. |
| `level-locked` | Gear-Level reicht nicht. |
| `component-locked` | Offizielle Standardrezepte erfordern höhere Fabrikkomponente. |
| `region-locked` | Benötigte Region nicht erreicht. |
| `area-unconfirmed` | Konkretes Gebiet ist nicht als erreichbar markiert. |
| `acquisition-locked` | Offizielle Autoritäts-/Umverteilungsanforderung höher als Eingabe. |
| `blueprint-unconfirmed` | Gebiet/Erwerbsanforderung erreichbar, tatsächlicher Besitz fehlt. |
| `story-unverified` | Storyauswahl fehlt, Fundort unsicher oder widersprüchlich. |
| `unverified` | Daten, Rezept oder Vorschau ungeklärt; kein gültiger finaler Build. |

Priorität/Grund für einen gesperrten vierteiligen Build wird clientseitig ausgewertet. Bei Codeänderungen prüfen, ob die **erste Begründung** für mehrere fehlende Komponenten weiterhin verständlich ist. Ein Status allein ist **keine** Creator-Qualitätsbewertung der Ausrüstung.

### 9.4 Speicherung und Datenschutz

Schlüssel: `ag0n1st:endfield:build-story-progress:v1` im Browser-`localStorage`.

Gespeichert: Version, Region-ID, Gebiet-IDs, bestätigte Gear-/Blueprint-IDs, optional Autoritätslevel, optional Wuling-Warenumverteilungsstufe. Keine serverseitige Speicherung, kein Konto, keine personenbezogenen Trackingdaten für diesen Zweck.

**Besonderheiten:**
- Browser-/Gerätewechsel kann die Auswahl verlieren.
- Gespeicherte, künftig ungültige Werte müssen beim Laden bereinigt/ignoriert werden. Insbesondere: alte **Autoritätslevel über 60** nicht weiter als gültigen Fortschritt verwenden.
- Der Reset-Button entfernt die Fortschrittsauswahl.
- Ein weiterer Spielpatch kann neue Region-/Gebiets-IDs oder Erwerbsarten bringen; die bisherige Auswahl darf keine unbemerkt neuen Gebiete automatisch setzen.

### 9.5 Technische Pfade und Tests

- Daten-/Berechnungsmodul `src/lib/endfield/buildFinder.mjs`: sieben Stufen, Rezeptprüfung, Level und vier Teile.
- `src/lib/endfield/buildStoryProgress.mjs`: Erwerbsweg/Gebiets-/Authority-/Besitzprüfung.
- UI `OperatorEquipment.astro`, Browsercode `OperatorGuide.astro`.
- Tests `scripts/endfield/build-finder.test.mjs`, `build-story-progress.test.mjs`, `story-areas.test.mjs`, `precise-blueprints.test.mjs`.

**Unverzichtbare Regressionen:**

1. Ausreichendes Gear-Level allein gibt **keine** Verfügbarkeit.
2. Geringere Fabrikkomponente sperrt höhere offizielle Rezepte.
3. Regionen/Gebiete werden nicht aus Patchnummer/Storytext spekulativ freigeschaltet.
4. Ein Gebiet ist betretbar, aber seine Kiste ist noch ungeöffnet → **nicht verfügbar**.
5. Alle vier Blaupausen markiert → bei genug Level und Komponenten **verfügbar**, auch wenn eine frühere Fundortfrage ungeklärt ist.
6. Dasselbe Item ist in zwei Guide-Builds enthalten → eine gespeicherte Besitzbestätigung gilt konsistent für beide.
7. Widersprüchliche Wiki-/Hub-Orte bleiben erkennbar und werden nicht zu offiziellen Markerbeweisen.
8. Autoritätslevel **60** ist gültig, **61**, **200**, negative, nicht ganze und alte gespeicherte Werte nicht.
9. Bei Preview/unvollständigen offiziellen Items keine Freischaltung durch redaktionellen Hinweis.
10. Mobil/Desktop, Formularbedienung, Speichern/Reload/Reset überprüfen.

**Noch offen für Folgephase:** Echte durch Creator freigegebene Build-Daten einpflegen und vollständigen Browser-E2E-Test mit solchen realen Builds wiederholen.

---

## 10. GEPLANTE ENTWICKLUNGSPHASEN: REIHENFOLGE, UMFANG, ABNAHME

Dies ist eine **priorisierte Roadmap**, kein bereits bezahlter Projektvertrag und keine Schätzung von Release-Daten. Arbeitsschritte dürfen bei neuen Nutzerentscheidungen neu priorisiert werden. Nach jeder Phase den Status dieser Tabelle aktualisieren. **Kein Feature ohne Nutzerentscheidung als „fertig“ ausgeben.**

### Phase P0 – Stabilisierung, Datenvertrauen und Dokumentation

**Status:** [TEILWEISE, laufend], höchste technische Grundpriorität.

**Enthält:**

- [x] Astro-/GitHub-Pages-Basis, PR-Tests, Deploy.
- [x] Benutzerfreundliches Operator-Guide-Framework und Katalogdaten.
- [x] Offizielle 100-MB-Budget-Kontrolle.
- [x] Kategorien für WebP-Bilder.
- [x] Stand 15.10.2026: Autoritätslevel bis max. **60** (UI + Validierung).
- [x] Zentrale `ROADMAP.md` als Übergabe-/Verlaufsdatei.
- [x] Historische **75-seitige Website-Konversation vollständig evaluiert** und dokumentierte Entscheidungen nach letzter Nutzerfestlegung priorisiert (16.10.2026; `docs/website-conversation-audit.md` auf Dokumentations-PR #14).
- [ ] Laufende Überprüfung von Website-Header, Mobile-Layout, Tastaturnavigation, Formularen und Links.
- [ ] Bei künftigen Website-Änderungen die **historischen Regressionsrisiken** beachten: Hamburger-Navigation, gleiche Hero-Card-Größen, mobiles einspaltiges Videogrid, echte Übereinstimmung von YouTube-Titel und Thumbnail, deutsch formatierte relative Zeit; Details mit PDF-Seiten in `docs/website-conversation-audit.md`.
- [ ] Prüfen, ob die ursprünglich gewünschten **P1/P3/P5-Potenzial-Profilbilder** aus verifizierten Assets verfügbar sind und im aktuellen Guide-Modell abgebildet werden; nicht ungefragt Fantasiebilder erzeugen.
- [ ] Unmerged Forschungs-PR #3 auf Obsoleszenz prüfen und ggf. schließen (nicht blind zusammenführen).
- [ ] GitHub Pages / Canonical-Domain / SSL und `astro.config.mjs` konsistent prüfen, insbesondere `ag0n1st.com` vs. konfigurierte `ag0n1st.github.io`.
- [ ] Asset- und Import-Actions kontrollieren, ob alte, einmalige Debug-Workflows später aufgeräumt werden müssen.
- [ ] Bei späteren Patch-/Datenupdates Snapshots und Übersetzungen auf übereinstimmende Versionen prüfen.

**Abnahme:** CI grün, kein Datenbudget-Überlauf, keine funktionale Regression, dokumentierte Quelle/Entscheidung, Pages deployed.

### Phase P1 – Erste **echte** Operator-Ausrüstungsbuilds und End-to-End-Kontrolle

**Status:** [CREATOR-BUILDS FREIGEGEBEN / AUF `main` GEMERGT; CI/ASTRO-BUILD GRÜN; LIVE-BROWSER-TEST OFFEN, 16.10.2026].** Exakt sechs bestätigte Liino-Builds (A: Ultimate, B: Balanced, C: Will, D: 60, E: 50, F: 36), vollständige Namens-/ID-Zuordnungen in [`docs/liino-approved-builds-20261016.md`](docs/liino-approved-builds-20261016.md). Der Guide bleibt **`preview`**, bis die restliche Redaktion P2 abschlossen ist. Die alten Vorschläge sind nur Forschungsarchiv.

**Vorbedingung:** Der Creator liefert/prüft die tatsächlichen vierteiligen Gear-Empfehlungen für einen Operator (zuerst **Liino**), Rollen, Levelvarianten, Zweck der Sets und ggf. Hinweise zu seltenen Materialien.

**Arbeitspakete:**

1. Creator-/Guide-Video und vorhandene Notizen prüfen; nur tatsächlich bestätigte Empfehlungen übernehmen.
2. Echte Gear-IDs aus dem SKPORT-Katalog ermitteln, vier Teile je Build. Slotverteilung gemäß offiziellem Datenmodell prüfen.
3. Mindestens ein Build für sinnvollen Fortschrittsstand; weitere Early-/Mid-/Endgame-Varianten nur nach echter Bewertung.
4. `liino.md`: `equipment.builds`, `role`, `evaluation`, `teamContext`, `availableFromLevel`, `craftingNotes`, `setBonusNotes`, `storyUnlock` als **Kommentar**.
5. Automatische Berechnung der höchsten Fabrikkomponente aus den vier offiziellen Rezepten gegenprüfen.
6. Jede Blaupause aus dem präzisen Fundortindex beurteilen; strittige Kandidaten nicht als „sicher“ darstellen.
7. Browser mit realem Build testen: Standardstatus ungeklärt, Region/Gebiet allein unzureichend, nach vier Besitz-Häkchen passend, Reset korrekt.
8. Übersicht-Card „Build auf einen Blick“ auf den finalen Build verlinken; keine Werte doppelt in YAML speichern.
9. `status: preview` belassen, bis Stärken/Schwächen, Bewertungen und übrige Freigabekriterien vollständig sind.
10. Tests, Screens auf Mobil/Desktop prüfen, PR und Merge/Deploy dokumentieren.

**Abnahme:** Kein Beispiel-/Fantasy-Build, korrekte Gear-IDs/Rezepte, alle vier Häkchen greifen, Quellenhinweise nachvollziehbar, fertige Redaktion wird nicht von Importskripten überschrieben.

### Phase P2 – Vollständiger Liino-Guide als veröffentlichbares Nachschlagewerk

**Status:** [BEGONNEN / SKILLS + VIER WAFFENKATEGORIEN CREATORFREIGEGEBEN; DATAFIELD-POTENZIAL-/WAFFENZAHLEN VIA PR #23 AUF `main` INTEGRIERT, CI #98 ERFOLGREICH, 16.10.2026]. Gear A–F unverändert bestätigt. Für die Zahlen gilt ein ausdrücklich sichtbarer Modell-Disclaimer, da die ursprünglichen Spreadsheet-Parameter nicht vollständig unabhängig überprüft sind. Persönliche Pull- und Potenzialempfehlungen, Teams/Fazit noch offen. P1 echter Browsertest separat offen.

**Verbindlicher Creator-Entscheid zu Skills (16.10.2026):** **ULT M3 > BS M3 ≥ CS M3 > BATK 1**. Anders als frühere Prydwen-/Mobalytics-Shortlists und unser archivierter P2-Entwurf. ULT M3 zuerst wegen starkem Willenskraft-Amp (SKPORT 0,04 % je Will, max. 60 % Will-Amp-Anteil). BS M3 wegen **10 % ANG-Bonus** (offiziell 6 % auf Rank 1); CS M3, da **Cooldown 10 → 8 Sekunden** (offizielle Daten) und dadurch häufiger Arts-Reaktions-Combo mit weiterhin konstant **20 Ultimate-Energie** möglich wird. Das Combat Talent kann nach Liinos Combo die nächste Elektro-/Natur-Kampffertigkeit um bis zu **10 FP/SP erstatten**, die FP stammen *indirekt aus dem Talent*. BS und CS sind in der Priorität nahezu gleichwertig; beide **M3**. BATK bewusst **Stufe 1**, keine zusätzliche Investition für Liinos Supportnutzung. Alle Ziele, Zeichen und individuellen Erklärtexte in `src/content/operator-guides/liino.md` eingetragen; **Gesamtguide bleibt `preview`**. Der allgemeine Satz „jeder Operator hat M3-CD-Reduktion“ ist für andere Operatoren **nicht** ohne deren Einzeldaten zu verallgemeinern.

**Ab sofort verbindliche externe Quellenkonvention (16.10.2026):** Der Creator nutzt **Datafield** als führende Quelle für rotations-/teamabhängige **Waffen- und Potenzial-Prozentvergleiche** sowie Excel-/Modellrechnungen. Beim Abgleich anderer Guide-Webseiten bevorzugt Datafield; SKPORT bleibt die offizielle Quelle für primitive Item-IDs, Fertigkeiten, Gear-Stats und Rezepte. **Gear-Redaktion** bleibt beim Creator und darf durch abweichende Datafield-Gear-Empfehlungen **nicht** überschrieben werden. **Datenquelle auf Website als reiner Text „Quelle: Datafield“ OHNE Verlinkung**; zum Prozentwert sind **Rang, P-Stand, Team, Rotation, Ausrüstung, Referenz/Baseline und Vergleichsart** möglichst konkret und nachvollziehbar zu dokumentieren. Wichtig: Datafield „Potentials (DPS Increase)“ **nicht ungeprüft als vs. P0** interpretieren; getrennte Felder `increaseOverPreviousPercent` und `increaseOverP0Percent`. Quelle + Bedingungen sind bei Waffen-/Potenzial-Prozentangaben über `operatorGuideSchema.ts` **Pflicht**; `OperatorWeapons.astro` und `OperatorPotentials.astro` zeigen Quellnamen als Klartext an; `_template.md` und `docs/operator-guide-workflow.md` aktualisiert.

**Verifizierter GitHub-Abschluss (16.10.2026):** [PR #21](https://github.com/Ag0n1st/ag0n1st.github.io/pull/21) nach GitHub Actions **„Validate Astro and operator guides“ #84 (success)** per Squash auf `main` gemergt, Merge-SHA **`c1d049ec517d20f8e2da6cf7070861ad68aa1c2a`**. Im CI-Job alle vier Kernschritte grün: locked Dependency-Installation, Endfield-Node-Tests, 100-MB-Endfield-Budget und Astro-Produktions-Build. Liino-Skillsektion in `liino.md` **verifiziert gemergt**, der Gesamtguide weiterhin `preview`. **Potenzial-/Waffen-Prozentwerte nach Datafield noch nicht übernommen. Pages-Deploy und Live-Browser-Abnahme separat nicht nachgewiesen.**

**WICHTIGE AKTUALISIERUNG / KORREKTUR (16.10.2026):** Die ältere Aussage „Datafield liefert für Liino nur Loading data, daher keine Zahlen auslesbar“ ist **technisch WIDERLEGT**. Ein einfacher HTML-/Textcrawler sieht nur den Shell-Platzhalter, aber ein echter **Chromium/Playwright-Browser** kann den nach JavaScript befüllten DOM auslesen. Für Liino wurde dies anhand der erfolgreichen GitHub-Actions-Probe **#87** und **#91** praktisch bewiesen: **fünf Potenzial-Prozente** (+3,2 / +0,7 / +0,8 / +0,0 / +4,7 %; **jeweils gegenüber der vorherigen Potenzialstufe**) und **zwei Teamabhängige Waffen-Rankings**, im ersten **7**, im zweiten **6** Zeilen. Team A: `Zhuang Perlica Arclight Team`, Team B: `Arcane TT Xaihi Team`, beide Referenz **Bedazzling Night Debut R4 = 100 %**, aber z. B. `Golden Age R9` **85,0 %** (A) vs. **91,6 %** (B). Primäre Auditdatei: [`docs/datafield-rendered-extraction-20261016.md`](docs/datafield-rendered-extraction-20261016.md). Browser-Exporter: `scripts/endfield/datafield_rendered_export.py`; rein **manuell auslösbarer** Datafield-GitHub-Workflow: `.github/workflows/datafield-probe.yml`, kein Massenscraping und keine Abhängigkeit für GitHub Pages. Die Spreadsheet-Modellannahmen von Datafield (genaue Team-/Rotation-/Waffenrang-/Potential-Kontexte) müssen **vor redaktioneller Übernahme** in `liino.md` weiterhin geprüft werden. **Bis dahin** keine Prozente fälschlich ohne Teamkontext und Vergleichsbedingungen veröffentlichen. Die früher dokumentierte „Loading data“-Beobachtung beschreibt **nur das alte Abrufwerkzeug**, nicht die Datenverfügbarkeit.

**Datafield-Liino-Abrufstand:** Nutzer hat `https://datafield.cc/characters/liino` als konkretes Beispiel übermittelt. Die zugängliche Webfassung lieferte am 16.10.2026 aber nur **„Loading data…“** und **keine auslesbaren Liino-Waffen-/Potenzial-Prozentwerte oder Excel-Modellbedingungen**. Deshalb noch **keine Zahlen übertragen**; `liino.md` hat weiterhin `weapons.recommendations: []` und `potentials.entries: []`. Sobald lesbare Originalwerte inklusive Bezugsgrößen vorliegen, dürfen Datafield-Zahlen ohne eigene Neusimulation übernommen und korrekt mit `sourceNote: "Datafield"` eingetragen werden. **Nicht** vorläufige Prozente oder andere Quellen als Datafield ausgeben.



- [ ] Operatorprofil sowie vorhandene Haupt-/Nebenattribute prüfen; unstrukturierte Traits nur bei glaubwürdiger Quelle.
- [ ] Stärken und Schwächen nach eigener Analyse ausformulieren.
- [ ] Schwierigkeit, Flexibilität, Zugänglichkeit (1–5) redaktionell festlegen.
- [x] **Creatorfreigabe 16.10.2026:** Skill-Priorität mit vier Slots, `>`/`>=`, Ziel-Rängen und Begründung **ULT M3 > BS M3 ≥ CS M3 > BATK 1** in `liino.md` eingetragen; CI/PR noch prüfen.
- [ ] Mechaniken/Rotation/Anwendungsfälle anhand eigener Screens/Video und Wiki abgleichen.
- [ ] Waffen-BiS/BP/F2P-Alternativen **bevorzugt nach Datafield** und dessen tatsächlichem Modellvergleich einstufen; Waffen-Rang/Baseline/Team/Rotation festhalten; **Quelle: Datafield** als Klartext, keine Links in der Website. Die bisherige Prydwen-Shortlist ist nur vorläufig.
- [ ] Potenziale P1–P5 bewerten; **Datafield-Prozentwerte samt Quelle ohne Link, Modellbedingungen und korrekter Bezugsgröße** verwenden, sobald die Liino-Seite/Excel zuverlässig ausgelesen wurde. **Keine** freien Schätzungen.
- [ ] Meta- und alternative Teams inklusive Rollen und `buildId`-Zuordnung pflegen.
- [ ] Eigenes YouTube-Guidevideo sinnvoll mit Zeitmarken/Abschnittslinks referenzieren.
- [ ] Fazit, Pull-/Ressourcenberatung und geeignet/nicht geeignet ergänzen.
- [ ] Sprachstil, SEO, Semantik, Mobile-/Desktop-A11y prüfen.
- [ ] Sobald vollständig: `status: published` und echte Freigabe.

**Abnahme:** Nutzer kann die gesamte Spielweise **ohne das Video vollständig anschauen zu müssen** verstehen, und alle Daten sind quellengerecht sowie von eigenen Empfehlungen unterscheidbar.

**P2-Start (16.10.2026):** Die bis dahin ausstehende Redaktion für Spielweise, Skill-Priorität und Waffen ist **nachprüfbar recherchiert, aber noch NICHT vom Creator freigegeben**. **GitHub-Abschluss:** [PR #20](https://github.com/Ag0n1st/ag0n1st.github.io/pull/20) wurde nach erfolgreicher **CI #83** auf `main` per Squash gemergt, Commit **`2ec1a504844defbe9a53bc7ac39872cf3906cd9e`**. Der Prüf-Workflow bestätigte locked Dependency-Installation, Endfield-Node-Tests, 100-MB-Endfield-Datenbudget und Astro-Produktions-Build jeweils als `success`. **Keine produktive Änderung am Liino-Guide, keine redaktionelle Freigabe und kein separater Pages-Deploy nachgewiesen**. Sie liegt vollständig in [`docs/liino-p2-kit-skills-weapons-draft-20261016.md`](docs/liino-p2-kit-skills-weapons-draft-20261016.md). Grundlage: offizieller lokaler SKPORT-Snapshot (`liino.json` + `liino.extra.json`, vier Skills, zwei Kampftalente, **Waffen 1046/1044/97/93/75**) und separat als Community-Vorschläge markierte Prydwen-/Mobalytics-Ranglisten. Das `liino.md` bleibt **unverändert** (`status: preview`; nur sechs bereits genehmigte Ausrüstungs-Builds vorhanden).

**Konkrete Inhalte für die redaktionelle Entscheidung:**
- Deutsche Spielweise mit Vocalist Stance **60s/25 SP**, Arts-Reaktions-Kom­bo mit **20 Ultimate-Energie**, Ultimate **160 Energie/15s**, willensbasierter Elektro-/Natur-Amp, Schutz-/SP-Talenten und Gefahren des vorzeitigen Haltung-Endes.
- Entwurf von **3 Stärken / 3 Schwächen** sowie Skill-Priorität **`Ultimate > Battle > Combo >= Basic`**; technische Besonderheit, dass die **20 Ultimate-Energie pro Kombo im offiziellen Snapshot nicht mit Skilllevel steigen**.
- Waffenliste mit **offiziellen IDs plus Namen**: **Bedazzling Night Debut 1046** (BiS-Kandidat), **Golden Age 1044** (Battle Pass, **nicht** gratis), **Cohesive Traction 97** (5★ Will-Alternative, F2P-Status nicht belegt), **Chimeric Justice 93** (5★, Stärke statt Will, UGE-Notlösung), **JET 75** (6★, hauptsächlich persönlicher Schaden). Keine unbelegten DPS-/Amp-Prozentvergleiche; offizielle Waffeneffekte nach **Rank** getrennt, nicht mit Potenzial verwechselt.
- **Offen:** Creator muss die deutschen redaktionellen Kurztexte, Prioritäten und Waffen-Auswahl bestätigen oder korrigieren. `overview.ratings` (Schwierigkeit/Flexibilität/Zugänglichkeit je 1–5), Potenziale, Teams, YouTube-URL und Fazit bleiben ohne eigene Creatorfreigabe offen. Die tatsächliche „F2P“-Bezugsquelle darf nicht aus unklarer Shop-/BP-Beschriftung geraten werden.
- **Nächste kleinste Aufgabe:** Entwurf in `docs/liino-p2-kit-skills-weapons-draft-20261016.md` dem Nutzer mit Quellenhierarchie vorstellen; **nach** ausdrücklicher Zustimmung nur akzeptierte Teile in `liino.md` übertragen, validieren/testen/mergen. P1-Browser-Abnahme (Max-/Min-Profile) separat offen und darf bei der redaktionellen P2-Recherche nicht als bestanden eingetragen werden.

### Phase P3 – Typhoeus-Guide, danach universelle Operator-Pipeline

**Status:** [GEPLANT], teils parallel zu P2.

- [ ] Bestehende Typhoeus-Rohdaten/DE-Locale auf aktuellen Patchstand prüfen.
- [ ] Redaktionelle Texte aus tatsächlich vorhandenem langen Guide-Skript/Video übernehmen, statt neu zu erfinden.
- [ ] Gear-/Waffen-/Teams-/Potenzial-Evaluation analog P1/P2.
- [ ] Wiederverwendbarkeit der neun Abschnitte und der Build-Filter über beide Operatoren validieren.
- [ ] Weitere Operatoren über den generischen SKPORT-Importer **pro realer Item-ID** importieren.
- [ ] Abweichende Wiki-Widgets explizit testen und ggf. Parser anpassen.
- [ ] Update-Prozess: neue Snapshot-Version, Text-Diff, übersetzungsbezogene Invalidierung, Bildbestand, vorher/nachher Tests.
- [ ] Optional Ausbau von Operatoren-Übersicht um Suche, Element/Klasse/Rolle, Status und relevante Filter; erst nach klarer Priorisierung.
- [ ] Einheitliche Review-Checkliste und Versionen-/Guide-Update-Markierung erstellen.

**Abnahme:** Ein dritter Operator kann ohne Änderungen an der UI-Struktur durch geprüfte Rohdaten + neue Guide-Datei ergänzt werden.

### Phase P4 – Offizielle Blaupausen-, Gebiets- und Story-Freischaltungen präzisieren

**Status:** [RECHERCHE / GEPLANT], kann parallel zu P1–P3 laufen.

- [x] 19 offizielle Kartenebenen und 27 Marker.
- [x] 24 explizite Community-Kistenlisten und Gear-ID-Abgleich.
- [x] Zwei getrennte Ebenen aus „Gebiet erreichbar“ und „Blaupause wirklich erhalten“.
- [ ] **10** noch nicht einzelteilgenau lokalisierte offizielle Kistengear-IDs recherchieren.
- [ ] **23** strittige Kistengear-IDs einzeln gegen Spiel-/Bildbeleg prüfen.
- [ ] **25** Community-Aussagen mit anderem offiziellen Erwerbsweg prüfen.
- [ ] Für die beiden **Si's-Painting**-Kisten die tatsächlichen Einzelteile/Versionserweiterungen recherchieren.
- [ ] Logische Research-Kiste mit exakter offizieller Marker-ID und XYZ-Koordinaten abgleichen; erst nach Beleg in `blueprint-confirmations.json` eintragen.
- [ ] Echte Storymissionen/Freischaltquests **pro Gebiet** mit offiziellen Belegen sammeln.
- [ ] Region-Zugang, Gebiet-Eingang, Nebenquest, Autoritätsbelohnung, Shopstufe und Besitz weiterhin unabhängig behandeln.
- [ ] Optional leicht verständliche grafische Story-Fortschrittsauswahl erst nach gesicherter Queststruktur.
- [ ] Bei neuen Updates importer-/snapshotfähigen Wiederholungsprozess dokumentieren.

**Abnahme:** Kein unbelegtes „dieser Gear-Blueprint ist garantiert in Kiste X“; einzelne sichere Marker-zu-Gear-Paare sind maschinell validiert und separat abrufbar; kein Rückschritt bei bestehender Build-Prüfung.

---

### Phase P5 – Fabrikbereich: vollständige, progressionsfähige Guides für **Tal4 und Wuling**

**Status:** [GEPLANT]; umfangreiches eigenständiges Teilprojekt.

**Produktwunsch:** Spieler, auch ohne Fabrik-Affinität, sollen ihren **aktuellen Storyfortschritt** auswählen und **sofort verwendbare, nachbaubare Fabrik-Blueprints** bekommen; fortgeschrittene Nutzer sollen die Produktionslogik vollständig verstehen.

**Bereits vereinbart:** Zwei große Guides/Videoreihen – **Tal4** und **Wuling** – mit passenden Website-Ressourcen. In der bisherigen Contentplanung **mit Wuling beginnen**. Nicht annehmen, dass auf der Website bereits die Fabrik-Simulationslogik existiert.

**Arbeitspakete:**

1. **Fachliche Grundlagen**: Fabriklevel, Forschungsstufen, Facilities, Fließband-/Fördersysteme, regionale Ressourcen, Nebenprodukte, Energie, Kapazitäts-/Output-Limits, Story-Freischaltungen und relevante Komponenten dokumentieren. Nur nach überprüfter Quelle.
2. **Progressionsgraph**: Welche Systeme/Produktionslinien sind ab welchem echten Story-/Gebietszugang erreichbar? **Nicht** allein nach Gear-Level sortieren.
3. **Tal4 vs. Wuling getrennt**: Ressourcen, Transportwege, Fabriklayouts und Freischaltungen pro Region getrennt modellieren.
4. **Stufenmodell**: Früh/Mitte/Spät sinnvoll unterteilen, Produktionsziele und tatsächlich benötigte Mindestressourcen ausweisen. Die sieben Gear-Komponenten sind eine wichtige Verbraucher-Sicht, aber **kein Ersatz für echte Fabrikforschungs-/Facility-Gates**.
5. **Blueprint-Bibliothek**: Downloadbare/Kopierbare Game-Blueprint-Codes oder überprüfbare Muster; klare Beschriftung, notwendige Gebäudefreischaltungen, Vorprodukte, Durchsatz, Eingänge/Ausgänge, Platzbedarf und Kompatibilitätsstufe.
6. **Plug & Play**: Einsteiger wählen „Was kann ich bei meinem Fortschritt bauen?“; die Website zeigt einen passenden geprüften Bauplan und kurze Nachbauanleitung.
7. **Erklärungsmodus**: Erfahrene Nutzer sehen Gründe, Materialflüsse, Produktionsengpässe, Erweiterungsschritte, Troubleshooting.
8. **Versionierung**: Game-Version, Quelle, letzter Ingame-Test, evtl. Anpassungsbedarf nach Patches.
9. **Videos**: Zwei umfangreiche Creator-Fabrikvideos als Ergänzung; Website bleibt auch ohne Video nachvollziehbar.
10. **Technikentscheidung**: Zuerst statische JSON/Markdown-Blueprint-Datensätze. Einen interaktiven visuellen Editor/Simulator erst bauen, wenn tatsächliche Anforderungen und Aufwände geklärt sind.

**Abnahme:** Mindestens ein tatsächlich im Spiel getesteter Wuling-Early-/Mid-/End-Schritt ist reproduzierbar und korrekt nach den realen Zugangsvoraussetzungen gefiltert; später Tal4 entsprechend. Keine „alles freigeschaltet“-Empfehlung für frühere Storyabschnitte.

### Phase P6 – Endfield-System-Nachschlagewerke

**Status:** [GEPLANT]. Getrennte, wiederverwendbare Seiten, keine unbelegte Zusammenfassung erfinden.

**A. Rekrutierung** (`/endfield/rekrutierung/`)

- [ ] Grundlagen, Operator-/Bannerarten, Ressourcen und Fristen korrekt beschreiben.
- [ ] Garantien, Pity-/Wahrscheinlichkeitssystem nur nach offiziell belegten Mechaniken.
- [ ] Pull-/Investitionsberatung deutlich als eigene Einordnung kennzeichnen.
- [ ] Relevante eigene YouTube-Guides einbinden.
- [ ] Änderungsstand je Spielversion dokumentieren.
- **Abnahme:** Nutzer kann Unterschiede der Rekrutierungswege ohne Video nachvollziehen und findet Quellen für alle Zahlen.

**B. Veredelung** (`/endfield/veredelung/`)

- [ ] Voraussetzungen, Materialien, Modifikation/Tuning und Standardablauf definieren.
- [ ] Offizielle Stats-/Artificing-Daten aus vorhandenen Gear-JSON nutzen; keine doppelte Pflege.
- [ ] Anwendungsbeispiele und typische Anfängerfehler mit Screens/Videobelegen.
- [ ] Optionale Item-/Kosten-/Wirkungs-Tabelle; Erweiterung um Tool erst bei überprüfter Berechnungsformel.
- **Abnahme:** Werte und Grenzen kommen aus dem Katalog, Erklärungen aus eigener fachlicher Redaktion.

**C. Essenzen** (`/endfield/essenzen/`)

- [ ] Essenzarten, Waffen-/Ausrüstungszuordnungen und Erwerbswege aus zuverlässigen Quellen.
- [ ] Filter nach Klasse/Attribut/Verwendung, sobald Datensatz vorhanden.
- [ ] Symbolbibliothek wiederverwenden.
- [ ] Quellen-/Versionsabgleich für jedes neue Release.
- **Abnahme:** Suchbare und überprüfte Übersicht ohne neue, unnötige Datenbank.

### Phase P7 – Community-nahe Endfield-Tools

**Status:** [GEPLANT]. Alle aktuellen Routen sind vorhanden, die Fachfunktionen fehlen.

**A. Speedrun-Archiv** (`/endfield/speedruns/`)

- [ ] Datenmodell für **eigene** Runs: Boss, Version, Schwierigkeitsstufe, Operator-Team, P-Stufen, Buff-Food-Regeln, Laufzeit, Datum, Videolink, Notes.
- [ ] Unterschiede der Regeln (z. B. P0/P5, Buff Food ja/nein) **explizit** speichern, damit Zeiten vergleichbar bleiben.
- [ ] YouTube-Videos/Playlists verlinken; optional nach Boss und Regeln filtern.
- [ ] Keine Community-Rangliste, keine Fremdrun-Einsendungen und kein Accountsystem.
- **Abnahme:** Eine vom Creator bestätigte Run-Datendatei erzeugt automatisch eine übersichtliche Archivkarte mit prüfbarem Video.

**B. Daily-/Weekly-Checkliste** (`/endfield/checkliste/`)

- [ ] Tatsächlich existierende Aufgaben und Resetzyklen recherchieren, keine erdachten Aufgaben.
- [ ] Eigene Checkboxen, optional Kategorien (daily/weekly/event) und lokale Speicherung.
- [ ] Klare Zeitzonen-/Serverreset-Logik, keine unzuverlässigen „Mitternacht lokal“-Annahmen.
- [ ] Bei Patches Aufgaben/Kategorien versionieren und gespeicherte Nutzerdaten behutsam migrieren.
- [ ] Kein Login; Offline-/Fehlersituationen bedenken.
- **Abnahme:** Checkboxen bleiben lokal bestehen und setzen sich nur zum wirklich richtigen Zeitpunkt zurück; E2E-Test über simulierten Tages-/Wochenwechsel.

**C. Patch-Countdown** (`/endfield/countdown/`)

- [ ] Nächsten offiziell bestätigten Patchtermin aus Quellen übernehmen; Zeitformat/Zeitzone/UTC dokumentieren.
- [ ] Countdown clientseitig oder statisch + JS rendern; keine falschen Versprechen bei nicht offiziellem Termin.
- [ ] Nach Ablauf verständliche Endmeldung und Aktualisierungsprozess.
- [ ] Ggf. nächsten Banner-/Eventtimer als eigene, belegte Datenklasse.
- **Abnahme:** Countdown stimmt über Zeitzonenwechsel und Sommer-/Winterzeit, und nennt klar die Quelle des Termins.

### Phase P8 – Neverness to Everness (NTE) Portal

**Status:** [GEPLANT; die Grundseite ist ein Platzhalter]. Nicht den Endfield-Skillbaum oder Endfield-Materialnamen ungeprüft kopieren.

**Geplante Arbeit nach konkreter Priorisierung:**

1. Produktseite vom Platzhalter zu echter Landing mit NTE-spezifischer Navigation.
2. Sammlung eigener Guide-/Video-/Story-Inhalte und patchbezogener Updates.
3. Operator-/Charakter-Systematik des jeweiligen Spiels recherchieren, **eigene** Stammdatenschemata festlegen.
4. Wiederverwendbare allgemeine Astro-UI/Card-/Content-Bausteine nutzen, aber keine Endfield-spezifischen IDs/Fabrikkategorien übernehmen.
5. Deutsche Begriffe und ggf. zweisprachige Ergänzung separat versionieren.
6. Zukünftige NTE-Progressionstools nur bei belastbaren Eingabedaten.
7. CI-, Asset-, Übersetzungs- und Publisher-Quellenstrategie analog dem erfolgreichen Endfield-Ansatz.

**Abnahme:** Kein Schein-Guide mit erfundenen Spielwerten; mindestens eine echte recherchierte NTE-Inhaltskategorie ist nutzbar, bevor die Seite als fertig deklariert wird.

### Phase P9 – Creator-Profil, Beiträge, SEO und Auffindbarkeit

**Status:** [TEILWEISE/GEPLANT], nicht vorzeitig Hauptentwicklungsfokus von Endfield weglenken.

**About Me / Kooperationen:**
- [ ] Echte vom Nutzer freigegebene Creator-Bio, Streaming-Kanäle, Content-Schwerpunkte und Partnerprogramme.
- [ ] Professionelle Kooperations-/Kontaktmöglichkeit, ohne private Adress-/Identitätsdaten offenzulegen.
- [ ] Partnerlogos/-marken nur nach Berechtigung und eigener Freigabe.

**Beiträge/News/Update-Logs:**
- [ ] Vorhandene `posts`-Collection redaktionell sinnvoll nutzen; Posts zu Patches/Guides/Mechaniken nur nach relevanter Quellenlage.
- [ ] Dateien als Markdown mit Frontmatter und Datum, verlinkt von Startseite/Spielen.
- [ ] Interne Verlinkung Guide ↔ relevante Beiträge ↔ Videos; Duplikate vermeiden.

**SEO / technische Qualität:**
- [ ] Canonical-URLs auf die tatsächlich gewünschte Primärdomain abstimmen; `astro.config.mjs`/Pages/DNS prüfen.
- [ ] Einzigartige Titel, Meta-Descriptions, strukturierte semantische Überschriften je Guide.
- [ ] OpenGraph-/Social-Share-Metadaten sinnvoll nutzen; nur beauftragte Logos/Assets.
- [ ] Sitemap/robots-Prüfung; keine erfundenen Indexierungs- oder Analytics-Erfolge behaupten.
- [ ] Bildalttexte, WebP-Loading, kontrastreiche UI, Tastaturbedienung, Fokus-/ARIA-Status.
- [ ] Nutzerfreundliche Fehler-/Leerseiten, `draft`/`preview` nicht versehentlich als fertige Empfehlungen bewerben.
- [ ] **Datenschutz** bei späteren Statistik- oder Drittanbieter-Embeds berücksichtigen; bei Bedarf consent-/rechtliche Prüfung.

### Phase P10 – Mehrsprachigkeit / Internationalisierung

**Status:** [LANGFRISTIG GEPLANT]; Deutsch zuerst, keine ungefragte englische Vollkopie.

- [ ] Einheitliche Locale-IDs und URL-Struktur festlegen.
- [ ] Bereits getrennte Operator-Rohdaten (EN) und `locales/de/` als Ansatz behalten.
- [ ] Navigation, Statische Texte, Datums-/Zahlformatierung, Einheiten, ggf. SEO-`hreflang` lokalisieren.
- [ ] Redaktionelle Creator-Bewertungen pro Sprache **bewusst** pflegen; keine maschinelle Übersetzung als redaktionell freigegeben markieren.
- [ ] Fremdsprachige Gamebegriffe gegen offizielle Quellen prüfen.
- [ ] Version-/Snapshotbindung von Übersetzungen auch für NTE und spätere Spiele übernehmen.
- **Abnahme:** Beide Sprachen sind in UI, Inhalt und Metadaten konsistent; defekte Übersetzungen fallen zuverlässig auf Basis-Sprache zurück, ohne Werte auszutauschen.

### Phase P11 – Release-/Datenpflege-Automatisierung

**Status:** [LANGFRISTIG GEPLANT / teilweise bestehende Scripts].

1. Offizielle Patchnotes erfassen; Version, Datum, betroffene Kategorien und Quellen protokollieren.
2. Öffentliche SKPORT-Snapshots **differenziell** aktualisieren, statt gesamte Bilder mehrfach einzubetten.
3. Prüfung von neuen Operatoren, Items, Waffen, Gear, Gebieten und neuen Kartenmarkern.
4. Deutsche Übersetzungen nur bei passenden Source-Snapshots als aktuell markieren.
5. Konflikt-Dashboard/Bericht erzeugen: unaufgelöste neue Gear-ID, fehlendes Artificing, Community-Widerspruch, unbekannte Area-ID.
6. Reviewer-Freigabe vor Änderung redaktioneller Bewertungen oder bestätigter Marker-Links.
7. Verifizierte Changes in PR, Actions grün, Pages deploy, Live-Kontrolle.
8. Später optional Termin-/Patch-Alerts; **nicht** einfach dauerhafte Hintergrundautomationen annehmen.
9. Performance-/Link-/Accessibility-Monitoring ohne ungewünschte Trackingdienste.

**Abnahme:** Ein neuer Spielpatch verursacht keinen stillen Bruch alter Guides; Datenherkunft und Patch-Diff sind nachvollziehbar.

---

## 11. VERBINDLICHER ARBEITSPROZESS PRO ENTWICKLUNGSSCHRITT

### 11.1 Vor jeder Umsetzung

1. **ROADMAP.md lesen**, nach „Aktueller Übergabepunkt“ suchen und echte Dateien öffnen.
2. `main` sowie offene PRs/Workflow-Runs prüfen. Die Roadmap nennt einen **Snapshot**, GitHub liefert den aktuellen Stand.
3. Aus der Nutzeranfrage die **genau begrenzte Aufgabe** formulieren. „Alle möglichen Features“ nicht ohne Nutzerfreigabe implementieren.
4. Klassifizieren: objektive SKPORT-Daten, Community-Recherche, redaktionelle Bewertung, technische Anzeige oder Nutzerfortschritt?
5. Bereits existierende Module und Tests finden, keine zweite parallele Datenquelle oder UI erfinden.
6. Akzeptanzkriterien und Sicherheitsgrenzen definieren; bei unklarer fachlicher Entscheidung Rückfrage stellen.

### 11.2 Während der Entwicklung

1. Für substanziellere Arbeiten vom aktuellen `main` einen Feature-Branch erstellen.
2. Kleinste wiederverwendbare Änderung statt großem Umbau; bestehende Architektur/IDs weiterverwenden.
3. JSON-/Markdown-/YAML-Datenänderungen mit Quellennachweis, Datum, Gameversion und Status versehen.
4. Bei Importdaten: Parser und Validierungsregeln anpassen; **keine** Bewertungstexte überschreiben.
5. Beim UI: Mobile, Formularzustände, Leerdaten, Fehlerfälle, Tastaturbedienung beachten.
6. Für jedes neue Status-/Fortschrittsfeld mindestens Tests für normal, Grenze, leer, ungültig, persistiert alt.
7. **Nicht** ungesicherte Community-Daten in als „offiziell“ bezeichnete Felder kopieren.
8. Wenn UI-Bilder nötig wären, zunächst bestehende WebP-Bibliothek und Nutzerwunsch prüfen.

### 11.3 Test-/Review-/Merge-Gate

~~~bash
npm ci
npm run test:endfield
node scripts/endfield/check-budget.mjs
npm run build
npm run preview
~~~

Pflichtkontrollen nach Inhalt:
- Neue Operator-Gear-IDs gegen offizielle `items.json`/`equipment-details.json` prüfen.
- Neue JSON-Referenzen auf existierende Daten/Quellen/Marker testen.
- Neue Story-/Blueprint-Regeln gegen **besitzt nicht / Gebiet nicht betreten / Gebiet betreten / Besitz bestätigt** testen.
- Mobile UI und Browser-`localStorage` mindestens bei größeren Formularänderungen tatsächlich testen.
- PR-Workflow `Validate Astro and operator guides` muss grün sein.
- Bei Merge nach `main` auch `Deploy Astro site to GitHub Pages`-Build **und Deploy-Job** prüfen.
- Nach Deployment betroffene URL in Produktion aufrufen, besonders wenn Navigation, Dateipfade, Assets oder Caching berührt sind.
- **Keinen Merge-Erfolg mit erfolgreichem Live-Deploy gleichsetzen.**

### 11.4 Abschluss und Übergabe nach jedem Arbeitsschritt

Am Ende jedes Features:

1. Roadmap-Status aktualisieren und nächste konkrete Aufgabe festlegen.
2. Zu neuer/entfernter Datei: Pfad, Rolle, Ein-/Ausgabe, Ownership erklären.
3. Quelle/Version, offene Unsicherheit, bewusste Nicht-Implementierung festhalten.
4. PR-Link, Merge-Commit, Test-/Deploy-Status ergänzen.
5. Den **„Aktueller Übergabepunkt“** so aktualisieren, dass ein Dritter ohne Chat verstehen kann, was zu tun ist.
6. Bei geplanten weiteren Aufgaben nicht behaupten, sie liefen „im Hintergrund“; nach der tatsächlichen Umsetzung erneut dokumentieren.

---

## 12. RICHTIGER UMGANG MIT QUELLEN UND FACHLICHER SICHERHEIT

### 12.1 Quellenhierarchie

1. **Offizielle Ingame-/SKPORT-/Publisher-Daten** für Werte, Materialkosten, reguläre Erwerbsarten, offizielle Kartenmarker, patchbezogene Releases.
2. **Mehrfach bestätigte Community-Quellen** für konkrete Gameplay-/Kisten-Fundortbeobachtungen; auch bei Übereinstimmung als Community kennzeichnen, solange kein offizieller eindeutiger Marker-Inhalts-Beleg vorliegt.
3. **Einzelne Community-Quelle** für vorläufige Hinweise; Herkunft deutlich angeben.
4. **Eigene Tests/Videos/Erfahrungen des Creators** für verifizierbare redaktionelle Strategien.
5. **Vermutungen** nur in ausdrücklich als unbestätigt markierten Forschungsnotizen, niemals als freigeschaltete Spielvoraussetzung oder perfekte Ausrüstung.

### 12.2 Felder, die nicht stillschweigend vermischt werden dürfen

- `gearId` ≠ `setName` ≠ `claimId` ≠ `officialMarkerId`.
- `areaId` (Gebiet) ≠ `regionId` (Region) ≠ `storyMilestoneId` (Mission).
- `eligible` (Voraussetzungen erfüllt) ≠ `acquired` (Vorlage erhalten).
- `componentRequirement` (Zutat im Standardrezept) ≠ tatsächliche Story-/Facility-Freischaltung einer Maschine.
- Offizielle EN-`sourceSnapshot` ≠ manuell gepflegte deutsche Übersetzung eines früheren Standes.
- Beispiel-/Guide-YAML ≠ vom Nutzer veröffentlichte Build-Empfehlung.

### 12.3 Besonders wichtige ungelöste Forschungsfragen

- Welcher **offizielle SKPORT-Marker** entspricht welcher benannten Community-Kiste?
- Welche exakten Gear-IDs stecken in den **zwei Si's-Painting-Kisten**?
- Wie lassen sich die **23 strittigen Kistengear-IDs** in Einzelbelegen entscheiden?
- Welche **10 offiziellen Kistengear-IDs** können noch nicht individuell lokalisiert werden?
- Welche konkreten Neben-/Hauptmissionen schalten **jedes einzelne** der 19 Gebiete tatsächlich frei? Wo sind alternative Eingänge möglich?
- Welche aktuell als `unknown` erfassten **12 Ausrüstungserwerbswege** sind nach neuen Wiki-Daten überprüfbar?
- Welche Artificing-/Waffen-Widgets der neuesten Version fehlen offiziell und benötigen spätere Daten-Nachlieferung?
- Welche Benutzerfortschrittsfelder benötigen bei neuen Versionen ein Schema-Upgrade ohne Datenverlust?
- Wie aktuell sind die offiziellen deutschen Übersetzungen und welche Begriffe bleiben bewusst im englischen Original?

Bei Untersuchung **nur die belegten Fälle korrigieren**, nicht auf ganze Sets/Regionen hochrechnen.

---

## 13. RISIKEN, TECHNISCHE SCHULDEN UND VERBESSERUNGEN

| Thema | Risiko | Handlung |
| --- | --- | --- |
| Alt-Dokumentationen | Ältere `scripts/endfield/README.md`-Absätze beschreiben teils inzwischen erledigte Arbeit noch als „zukünftig“. | Diese Roadmap + aktueller Code haben für **Status** Vorrang; Spezialdokumente bei Bearbeitung präzisieren. |
| Einmalige Importer/Actions | Nicht mehr notwendige Probes oder Workflow-Duplizierung. | Vor Löschung auf aktuelle Abhängigkeiten und Quelle prüfen; nicht blind aufräumen. |
| Drittquellen und Beweisniveau | 92 Einzelteil-Zuordnungen könnten als offiziell bestätigt missverstanden werden. | Immer `community`/`precise`/`conflict`/`verified` korrekt ausweisen; Besitz separat. |
| Git-Historie | Große WebP-Verschiebungen vergrößern ggf. historische Git-Objekte trotz unverändertem Working Tree. | Größe der **gegenwärtigen Dateien** vs. Repository-Historie getrennt betrachten. |
| API-/HTML-Quellenänderungen | SKPORT oder Community-Wiki ändern Feldnamen, Tabellen oder schützen Abfragen. | Importer abbrechen lassen, Schema-/Versionsdiff prüfen; keine stille Falschzuordnung. |
| Persistierte lokale Eingaben | Überholte IDs oder Level können nach Patchwechsel ungültig werden. | Schema-Version, Wertevalidierung und bei Bedarf Migration; maximale Authority 60. |
| Führende Projektdateien | Neue KIs lesen ggf. nur alte Chat-Zusammenfassungen. | `ROADMAP.md` zuerst und GitHub-Zustand direkt danach prüfen. |
| Brand-/Copyrightrechte | Ungefragt generierte Game-Assets, Bilder oder Partnerlogos. | Bestehende freigegebene/geeignete Assets verwenden; neue nur nach Auftrag und Rechtsprüfung. |
| Statische Daten versus „Live“ | Live-Twitch/YouTube/Countdown können browser-/API-bedingt scheitern. | Fallback und Source-Fehlerzustände testen, nicht Live-Verfügbarkeit zusichern. |
| SEO-Domain | Astro `site` steht bisher auf `ag0n1st.github.io`, Custom-Domain ist `ag0n1st.com`. | Bei nächstem SEO-Zyklus Kanonisierung und Custom-Domain-Setup konsistent prüfen. |
| Unvollständige Redaktion | Preview-Guides sehen strukturell vollständig aus, obwohl echte Empfehlungen fehlen. | Preview deutlich markieren, Freigabekriterien einhalten, nicht nach Anzahl Komponenten „fertig“ nennen. |
| Fehlende E2E-Regression | Browserprüfung des Story-Filters wurde einmalig erledigt, permanente E2E-Suite besteht noch nicht. | Bei echten Builds zunächst Browser erneut prüfen, später schlanke reproduzierbare E2E-Checks erwägen. |
| UX/Accessibility | Viele verschachtelte `details`, Tabellen und Checklisten auf Mobilgeräten. | Keyboard, Screenreader-Labels, Kontraste, kleine Viewports, Overflow und Fokus regelmäßig testen. |

---

## 14. AKTUELLER ÜBERGABEPUNKT: fortgeschrieben bis 16. OKTOBER 2026

### 14.1 Letzter abgeschlossener Funktionsstand

- [x] Astro-Landing und Endfield-Portal als Grundlage.
- [x] Modulares neunteiliges Operator-Guide-Framework.
- [x] Offizielle SKPORT-Operator-Daten für Liino/Typhoeus.
- [x] 940 offizielle Item-Katalogeinträge mit kategorisierter lokaler WebP-Bibliothek.
- [x] 84 Waffen- und 258 Gear-Datensätze, inkl. offizieller Standardrezepte.
- [x] Sieben Komponentenstufen, Level-/Fabrik-Eignung.
- [x] 19 offizielle Story-Kartenebenen und 27 Wuling-Kistenmarker.
- [x] Community-Einzelteil-/Kistenforschung: 24 Kisten, 92 präzise konfliktfreie Gear-Kandidaten, 23 strittige, 10 offene.
- [x] Storyregion, separate Gebiets-Checkboxen, optional Authority/Warenumverteilung, vier einzelne erhaltene Blaupausen.
- [x] Browser-`localStorage` ohne Login mit Reset.
- [x] **Authority-Feld auf 60 begrenzt** einschließlich Eingabe-/Speicher-/Auswertungsschutz.
- [x] Diese übertragbare Markdown-Roadmap.

### 14.2 Nächste Aufgabe – Stand der Entscheidung

**Vorschlag, nicht automatisch schon beauftragt:** Im nächsten Arbeitsschritt mit **Liino** anfangen und **echte redaktionelle Ausrüstungs-Builds** eintragen. Anschließend die neue Build-Finder-Oberfläche mit realen vierteiligen Builds in Produktion prüfen.

Warum dieser Schritt zuerst: Die technische Engine ist vorhanden, aber `liino.md` und `typhoeus.md` haben noch `equipment.builds: []`. Ohne freigegebene konkrete Builds wird die volle Benutzerfunktion auf der öffentlichen Guide-Seite noch nicht sichtbar.

**Voraussetzung:** Nutzer liefert/prüft echte Empfehlungen oder beauftragt eine neue, nachvollziehbare Guide-/Meta-Recherche. Nicht eigenständig eine vierteilige „perfekte“ Build-Empfehlung erfinden.

**Kleiner technisch sinnvoller Parallelpunkt:** Die **Autoritätslevel-Grenze 60** bei künftigen Patchänderungen zentral in `src/lib/endfield/buildStoryProgress.mjs` nachführen, UI/LocalStorage-/Testgrenzen nicht isoliert ändern.

### 14.2a Fortsetzung nach Repository-Prüfung (15.10.2026)

- Der aktuelle `main`-Commit wurde als `3f0e7125812216d7425c701dc95b66ce0e98e2fd` geprüft: Autoritätslevel-Begrenzung und Roadmap sind integriert.
- Der einzige offene ältere PR war **#3** (temporäre SKPORT-Katalog-Recherche); er ist **nicht gemergt** und fachlich durch spätere Katalog-Imports weitgehend überholt. Vor einer Schliessung sind seine etwaigen individuellen Erkenntnisse noch gegen den aktuellen Stand abzugleichen.
- `src/content/operator-guides/liino.md` ist weiterhin `status: preview` und hat `equipment.builds: []`; bei Typhoeus ebenso keine Builds. Keine redaktionelle Build-Empfehlung wurde erfunden oder veröffentlicht.
- `docs/operator-guide-workflow.md` wurde auf den tatsächlich vorhandenen Gear-Katalog und einen expliziten **Liino-Build-Abnahmeplan** aktualisiert (Branch `docs-liino-build-handoff-20261015`).
- **Offener nächster Produktschritt:** Creator-Freigabe von vier konkreten offiziellen Gear-IDs und ihrer Rolle/Bewertung für mindestens einen Liino-Build, danach Eingabe in `liino.md`, echte UI-Abnahme und CI. Bis dahin bleiben P1 und der vollständige Browser-E2E-Test ausdrücklich offen.
- **Branch-Prüfstand:** Reine Dokumentationskorrektur; keine Laufzeit-/Spieldaten-Änderung. CI und Merge-/Deploy-Status erst nach GitHub-Rückmeldung als erfolgreich bezeichnen.

### 14.3 Sofortleseliste für die nächste KI

1. **`ROADMAP.md`** – dieses Dokument vollständig für Kontext und Projektprioritäten.
2. **`README.md`** – minimaler Installations-/Startprozess.
3. **`scripts/endfield/README.md`** – SKPORT-Importer, Daten-/Bild-Budget, offizielle Datenstruktur.
4. **`docs/operator-guide-workflow.md`** – Guide-Template und redaktioneller Workflow.
5. **`src/content/operator-guides/_template.md`** – tatsächliche YAML-Felder, nicht aus Erinnerung ableiten.
6. **`src/content/operator-guides/liino.md`** – nächste redaktionelle Datei.
7. **`docs/liino-approved-builds-20261016.md`** – aktuell verbindliche, vom Creator bestätigte Builds A–F, exakte Namen und IDs, Einsatzszenarien, Herstellungsstand, Implementierung und verbleibende Checks.
8. **`docs/liino-build-proposals-20261016.md`** – historisches Forschungsarchiv, **nicht mehr die aktuelle Freigabe-Shortlist**.
9. **`docs/website-conversation-audit.md`** – vollständige, nach letzten Beschlüssen gewichtete Auswertung der 75-seitigen PDF-Vorgeschichte, inklusive verworfener Zwischenkonzepte, Designfeinheiten und konkreter Code-Abgleichpunkte.
10. **`src/lib/endfield/buildFinder.mjs`**, **`buildStoryProgress.mjs`**, **`gearBlueprintResearch.ts`** – Build-/Progressionsregeln.
11. **`docs/endfield-blueprint-piece-audit.md`** und **`docs/endfield-story-progression.md`** – Fundort-/Story-Fachbelege und offene Konflikte.
12. **GitHub Pull Requests/Actions auf `main`** – letzter tatsächlicher Code-/Deploy-Stand.

### 14.3a Vollständige historische Chat-Auswertung (16.10.2026)

- **Ausgangsdokument:** vom Betreiber am 16.10.2026 bereitgestellte `Bisherige Website Konversation.pdf`, **75 Seiten, ~57.000 Wörter**. Seite für Seite ausgewertet, inhaltlich konsolidiert. **Original-PDF und Rohtext nicht in das öffentliche Repository kopiert**, da historische Terminal- und persönliche Umgebungsinformationen enthalten sind.
- **Nachschlagedokument:** [`docs/website-conversation-audit.md`](docs/website-conversation-audit.md) – chronologische Seitenbereiche, verbindliche letzte Entscheidungen, Zwischenentwürfe, technische/inhaltliche Konflikte, konkrete zu prüfende Codeunterschiede.
- **Erneut verbindlich bestätigt:** Dieser und alle folgenden Website-Chats **ausschließlich Text**, keine selbständig generierten Bilder, Diagramme oder Visualisierungen. Eine reale Website darf selbstverständlich weiterhin die vorhandenen WebP-/Icon-Assets anzeigen.
- **Wichtigste Detailpräzisierungen:** Endfield-Operator-Übersicht mit Profil/Video 50:50, Stärken/Schwächen, kompakter Vier-Teile-Buildübersicht und 3×1–5-Ratings; vier aktive Skills mit `>`/`>=`; Waffen-BiS/BP/F2P; gear-/story-/fabrik-/besitzabhängige Builds; Potenzial-Avatare P1/P3/P5 als noch zu prüfender Wunsch; Meta-Teams **bewusst knapp**, weitere Inspirationsteams scrollbar; verschiedene Ausrüstungs-Builds per ID teilen; Gameplay primär Showcases/Trial statt Pflicht-Vollrotationen; Fazit ohne duplizierten Guide.
- **Historische Architekturentscheidung:** Silex/GrapesJS/Supabase waren untersuchte, inzwischen für den aktuellen Stack **nicht ausgewählte** Optionen. Das MVP bleibt Astro + GitHub Pages + repository-eigene SKPORT-JSON/WebP + redaktionelle Markdown-Dateien, ohne Admin-Login/Laufzeitdatenbank.
- **Technische Präzision:** Im aktuellen Schema referenziert ein Team über `buildId` den für den **Guide-Operator** gewählten Build. Der anfänglich überlegte Vollausrüstungsplan *jedes* weiteren Teammitglieds ist **nicht** als bereits implementierte oder verpflichtend sofort umzusetzende Funktion zu behaupten.
- **Bereits im Code geprüft:** `OperatorTeams.astro` hat Meta-/weitere Teams und scrollbare Liste; `operatorGuideSchema.ts` hat vier Skills, vier Gear-IDs, `buildId`; `liino.md` ist weiterhin `preview` mit `equipment.builds: []`. **Keine redaktionellen Builds, Daten oder produktiven UI-Funktionen durch diesen Audit geändert.**
- **Prüf-/Integrationsstand (16.10.2026):** PDF-Audit und Guide-Handoff wurden über [PR #14](https://github.com/Ag0n1st/ag0n1st.github.io/pull/14) auf `main` übernommen; Merge-Commit **`9901a9b5b876056d874ac22477e7aa5e17e5bf7f`**. Der zugehörige PR-Workflow **„Validate Astro and operator guides“ #73** wurde mit **`success`** bestätigt. **GitHub-Pages-Deploy nach diesem Merge: nicht abschließend verifiziert** (nicht fälschlich als erfolgreich eintragen). **PR #3** war weiterhin der offene historische Recherche-PR. Der frühere `main`-Basis-Snapshot war `3f0e712`.
- **Akzeptanz:** Die nächste KI kann anhand Roadmap + Audit ohne frühere Chatinhalte die endgültigen Nutzerentscheidungen von historischen Ideen unterscheiden. Fachlicher Folgepunkt bleibt Phase P1, **Liinos echte Builds erst nach Creator-Freigabe oder ausdrücklich beauftragter, belegbarer Recherche**.

### 14.3b Historischer Forschungsstand vor der Creator-Freigabe (16.10.2026)

> **Archivierter Zwischenstand:** Die nachfolgenden frühere P1-Forschungsaussagen (einschließlich „alle Builds unfreigegeben“ und offener Blocker B1–B3) gelten nur *vor* der Entscheidung des Creators. **Für den aktuellen Stand ausschließlich §14.3c und `docs/liino-approved-builds-20261016.md` lesen.**

- **Der Nutzer hat die eigene, quellenbasierte Analyse von Liinos Builds ausdrücklich beauftragt, aber noch keine Veröffentlichung genehmigt.** Die ausführliche Recherche mit offiziellen IDs, Slots, Rezepten, Community-Fundortnachweisen, Teamkontext, Energieannahmen und Freigabefragen liegt in [`docs/liino-build-proposals-20261016.md`](docs/liino-build-proposals-20261016.md).
- **6 konkrete Kandidaten** (je 1 Armor / 1 Gloves / 2 Kits beabsichtigt): L70-A Standard Eternal Xiranite (IDs **1134/1138/1236/365**); L70-B UGE-Alternative (**1134/1138/1236/1236**); L70-C LYNX-Sustain (**1134/1133/365/365**); L60-A AIC Fieldwork (**1117/1123/1120/1241**); L50-A Mordvolt + Aburrey (**279/331/335/335**); L36-A Mordvolt (**274/278/284/284**). Doppelte Kit-IDs bedeuten zwei gefertigte Exemplare, nicht zwei unterschiedliche Vorlagen.
- **Belegabgrenzung:** Offizielle SKPORT-JSONs vom **15.10.2026** liefern objektive Werte und Rezepte; externe Build-Reviews (v. a. Prydwen und Mobalytics) liefern **Community-Empfehlungen**, nicht Creator-Freigaben. Die nichtoffiziellen Kistenzuordnungen bleiben explizit unsicher. Die Energieverfügbarkeit hängt von tatsächlicher Teamrotation/Combos ab.
- **Befund B1 [OFFEN]:** Ausrüstung **ID 1138 (Eternal Xiranite Hands)** steht im lokalen importierten Datensatz als `gearSlot: "Kit"`, obwohl externe Einzelteil-Listen und die übrigen Werte **Gloves** nahelegen. Vor Veröffentlichung itemgenau gegen autoritative Quelle überprüfen und Import/Tests reparieren; nicht anhand des Namens pauschal korrigieren.
- **Befund B2 [OFFEN]:** `OperatorEquipment.astro` leitet `preview` vom **ganzen Guide** an `getBuildRequirements` weiter; `evaluateBuildAvailability` blockiert dann selbst echte bestätigte Builds als `unverified`. Nach Creator-Freigabe Demo-Vorschau von validen Real-Builds unterscheiden, `status: preview` des unfertigen Gesamtguides beibehalten; Regressionstests ergänzen.
- **Befund B3 [OFFEN]:** Vor Integration Slots **1/1/2** gegen den offiziellen Katalog validieren, ohne legitime Wiederholung in zwei Kit-Slots zu verbieten. Basis-Schema erzwingt bislang nur vier Item-Referenzen.
- **Aktueller Freigabestatus:** Noch **keiner** der sechs Vorschläge redaktionell bestätigt; `src/content/operator-guides/liino.md` bleibt **`equipment.builds: []`** und **`status: preview`**. Phase P1 ist noch **nicht fertig**.
- **Präsentationsentscheidung des Creators (16.10.2026):** In jeder Ausrüstungs-/Build-Übersicht **den vollständigen offiziellen Gear-Namen direkt neben seiner ID angeben** – bloße Nummernfolgen sind nicht als menschlich prüfbare Freigabegrundlage geeignet. Die sechs Kandidaten sind nun als ausformulierte 4-Slot-Tabelle in [`docs/liino-build-proposals-20261016.md`](docs/liino-build-proposals-20261016.md) dargestellt (Commit `59f75bf`). Keine Änderung an `liino.md`, keine Creator-Freigabe impliziert.
- **Folgeregel für UI/weitere Guides:** Nutzerlesbare Ausrüstungstitel samt offizieller Item-ID anzeigen, wo konkrete Gear-Sets/Baupläne/Builds zur Kontrolle oder Freigabe verglichen werden. Item-IDs als technische Referenzen beibehalten; Setbezeichnungen allein reichen nicht.
- **GitHub-Nachtrag:** [PR #15](https://github.com/Ag0n1st/ag0n1st.github.io/pull/15) (nur Dokumentation / Research) nach erfolgreichem PR-Workflow **„Validate Astro and operator guides“ #74** (`success`) auf `main` per Squash-Merge übernommen, Commit **`4c0d78108db38809ff9c8925715335ee0e1aa5ed`**. **Pages-Deploy dieses Commits separat nicht verifiziert**; keine produktiven Liino-Builds veröffentlicht. Die spätere Bestätigung durch den Creator steht weiterhin aus.
- **Nächster Auftrag:** Dem Nutzer die 6 geprüften Vorschläge mit Einsatzfall, offiziellen IDs, Voraussetzungen und Datenunsicherheit **zur Freigabe vorlegen**. Erst nach Rückmeldung B1–B3 technisch beheben und **nur die ausdrücklich freigegebenen** Builds in Liinos Markdown übernehmen. Danach volle Build-Finder-Tests, Browser und CI/Deploy; Roadmap fortschreiben.

### 14.3c Creator-Freigabe: 6 Liino-Builds + technische Umsetzung (16.10.2026)

**GitHub-Abschluss / nachträgliche Prüfung 16.10.2026:** [**PR #16**](https://github.com/Ag0n1st/ag0n1st.github.io/pull/16) wurde nach **Squash-Merge auf `main`** übernommen: Commit **`3ace991ff18781207fe8970c0fdfc62e8e52e682`**. GitHub Actions **Validate Astro and operator guides #76** war **success**; geprüft wurden `npm ci`, **Endfield-Node-Tests**, **100-MB-Endfield-Budget** und **Astro-Produktions-Build**, jeweils erfolgreich. Der vorherige Lauf #75 zeigte noch eine Legacy-Fixture mit zwei Rüstungen statt 1/1/2 (fehlgeschlagen); sie wurde auf einen echten tragbaren Vier-Teile-Build korrigiert, anschließend Lauf #76 grün. **Der separate GitHub-Pages-Deploy und ein realer Browser-/Mobil-End-to-End-Test sind weiterhin nicht verifiziert und dürfen nicht als abgeschlossen ausgegeben werden.** Die redaktionellen Liino-Builds sind technisch integriert; der komplette Liino-Guide bleibt `status: preview`.



**Verbindliche aktuelle redaktionelle Entscheidung:** Der Nutzer hat die sechs Builds *explizit* neu festgelegt. Maßgebliches Dokument: [`docs/liino-approved-builds-20261016.md`](docs/liino-approved-builds-20261016.md) mit sämtlichen **offiziellen Gear-Namen und IDs**, Einsatzkontext, Kosten, Datenvertrauen und Tests. Die ursprüngliche Vorschlagsdatei ist **ARCHIV** und darf nicht mehr als Freigabe-Liste behandelt werden.

| Build / neues redaktionelles Ziel | Vier offizielle Gear-IDs in Reihenfolge Rüstung / Handschuhe / Kit / Kit | Freigabestand |
| --- | --- | --- |
| **A – Ultimate-Fokus** | `1134 / 1138 / 1236 / 365` | [VOM CREATOR FESTGELEGT]; früherer Name „Standard-Support“ entfällt |
| **B – Balanced** | `1134 / 1133 / 365 / 365` | [VOM CREATOR FESTGELEGT]; 3 LYNX + 1 Eternal |
| **C – Will-Fokus** | `1126 / 1129 / 365 / 365` | [VOM CREATOR FESTGELEGT]; **Rift Trekker Light Armor + Rift Trekker Hands + 2× LYNX Slab**. Situativ: Start **mit voller Ultimate** und **keine zweite Ultimate** vorgesehen; Willenskraft → Ultimate-Amp. 2 LYNX → **kein** LYNX-3er-Setbonus |
| **D – Level 60** | `1117 / 1123 / 1120 / 1120` | [VOM CREATOR FESTGELEGT]; zweiter Ember **statt** Power Bank zugunsten von Ultimate Gain |
| **E – Level 50** | `279 / 331 / 335 / 335` | [VOM CREATOR UNVERÄNDERT BESTÄTIGT] |
| **F – Level 36** | `274 / 278 / 284 / 284` | [VOM CREATOR UNVERÄNDERT BESTÄTIGT] |

**Umsetzung aktuell auf Branch `feature-liino-approved-builds-20261016`:**
- `src/content/operator-guides/liino.md`: Sechs echte vierteilige YAML-Builds mit stabilen IDs `ultimate-fokus`, `balanced`, `will-fokus`, `level-60`, `level-50`, `level-36`, `overview.featuredBuildId: ultimate-fokus`, Progressionshinweisen und abgestimmter Bewertung. `status: preview` **bleibt**, weil andere Sektionen nicht fertig sind.
- **B1 technisch gelöst auf dem Feature-Branch (mit Quelle):** ID **1138** ist laut Talos Wiki ([Einzelteil](https://endfield.wiki.gg/wiki/Eternal_Xiranite_Hands)), Prydwen und Endfield Hub **Gloves**. Ursprünglicher 2026-10-15-JSON-Import nennt fälschlich `Kit`. `src/lib/endfield/gearSlotCorrections.mjs` normalisiert **nur diesen Item-ID/Namen-Fall** am `equipmentDetails.ts`-Zugriff, ohne die riesige importierte Original-JSON automatisch zu überschreiben. Bei nächstem offiziellen Import Quelle erneut prüfen.
- **B2 technisch gelöst auf dem Feature-Branch:** Nur generierte Demo-Builds ohne redaktionelle Einträge bleiben an `preview` gebunden; ein realer Gear-Build darf auch innerhalb des Gesamtguide-`preview` bei erfüllten Voraussetzungen als `available` erscheinen.
- **B3 technisch gelöst auf dem Feature-Branch:** `buildFinder.mjs` prüft nun genau **1 Armor, 1 Gloves, 2 Kits** zusätzlich zu vier vorhandenen offiziellen IDs/Rezepten. Zwei gleiche Kits sind legitim; Besitz wird nach **einmaliger Blaupausen-ID** geprüft, die Herstellung benötigt zwei Exemplare.
- Tests: `scripts/endfield/liino-builds.test.mjs` (Creator-IDs + offizielle Katalogwerte/Komponenten/Blaupausen) und erweiterte `build-finder.test.mjs` (Slots, doppelte Kits, Demo-Preview).
- **Wichtige Grenze:** Die Client-UI belegt sich noch mit echtem Browser-/Mobile-Check. **Bis erfolgreicher CI/Merge/Pages-Nachprüfung nicht `P1 FERTIG` markieren.** Unveränderte Story-/Gebiets-/Besitztrennung, 60er-Autoritätslimit, `localStorage` ohne Login.
- **Abgeschlossen:** PR #16, CI-Run #76 (Node-Tests, Budget, Astro-Build) und Squash-Merge auf `main` (`3ace991f`). **Offen:** tatsächlichen GitHub-Pages-Deploy dieses Commits verifizieren; anschließend Browser-Gegenprüfung mit realen Liino-Builds, Mobilansicht, `localStorage`/Reset, Level-/Fabrik-/Gebiets- und Blaupausenkombinationen sowie Typhoeus-Regression. Danach P2 Guide-Ausbau.

### 14.3d Wiederverwendbare „Meta Builds“-Cards vor dem Build-Finder (16.10.2026)

**Vom Nutzer ausdrücklich beauftragte Layout- und Architekturänderung:** Im Operator-Guideabschnitt **„Ausrüstung“** steht künftig **„Meta Builds“ vor „Build-Finder“**, mit dem vorhandenen `.op-divided`-Trennlinienmuster. Meta Builds dienen dem schnellen Überfliegen und Vergleichen; der Finder bleibt die zentrale Detailansicht für Statistiken, Setboni, Rezepte, Fortschritt und die tatsächliche Blaupausen-Besitzprüfung. Das gilt **operatorübergreifend** und erzeugt keine doppelte Meta-Datenhaltung.

**Design und technische Umsetzung (Branch `feature-operator-meta-build-cards-20261016`):**
1. `src/content/operatorGuideSchema.ts`: `equipment.builds[].meta: boolean` mit Default **`false`**; `metaSummary` als kurze Einzelbeschreibung (**max. 280 Zeichen**), beim `meta: true` redaktionell **Pflicht**. Damit können sich weitere Operatoren mit einem, mehreren oder gar keinen geprüften Meta-Builds problemlos selbst pflegen lassen.
2. `src/content/operator-guides/liino.md`: Nur die **drei Level-70-Builds** A **`ultimate-fokus`**, B **`balanced`** und C **`will-fokus`** erhalten **`meta: true`** mit je eigener prägnanter, an der Creator-Entscheidung orientierter `metaSummary`. Die Progressions-Builds **D / E / F** sind bewusst **nicht Meta**, bleiben jedoch im Finder vollständig verfügbar. Die bereits freigegebenen Gear-IDs, langfristigen Beschreibungen, Slots, Stats und Anforderungen werden **nicht geändert**.
3. `src/components/operator/sections/OperatorEquipment.astro`: Die vorhandene `officialBuilds`-Aufbereitung liefert **dieselben** offiziellen Gear-Namen, Icons und Item-IDs für Meta Cards und Finder. `officialBuilds.filter(build => build.meta===true)` rendert vor dem Finder eine kompakte Card je Meta-Build: Build-Titel, Level, 4 Gear-Icons mit **offiziellen Namen**, `metaSummary` und Link **„Details im Build-Finder ansehen“**. Unter den Cards: kleiner Hinweis, dass alle Werte, Rezepte, Freischaltungen und Progressions-Builds im Finder stehen. Die ganze Meta-Sektion wird bei **0** markierten echten Builds versteckt, um leere Typhoeus-/andere Guide-Übersichten nicht mit irrelevanten Platzhaltern zu füllen.
4. **Verknüpfung:** Card-Link `href="#build-finder"` + `data-select-build={build.id}` nutzt **den bereits existierenden** gemeinsamen Client-Handler in `OperatorGuide.astro`; keine neue doppelte JS-Logik. Beim Klick wird derselbe reale Finder-Build ausgewählt; bei einem vorher verborgenen gesperrten Build wird dessen Anzeige aktiviert. Die eigentliche Bestands-/Freischaltlogik bleibt unberührt.
5. `src/styles/operator-guides.css`: Card-Raster responsiv (**3 Spalten groß**, 2 mittel, **1 mobil**), lesbare Gear-Namen, kompakte Beschreibungen und Link-Tastaturfokus; `#build-finder` berücksichtigt den sticky Seitenheader als Scroll-Anker. Kein neuer Image-Asset-Import.
6. `src/content/operator-guides/_template.md` und `docs/operator-guide-workflow.md`: Gemeinsame Selbstpflege-Anleitung für jeden weiteren Guide ohne Login; keine zweite Definition eines Builds. `src/lib/endfield/operatorGuideModel.ts`: Demo-Einträge bekommen `meta:false` und erzeugen keine Fake-Meta-Cards.
7. `scripts/endfield/liino-builds.test.mjs`: Prüft **exakt A/B/C** als Meta, Kurztexte und ihre Länge, D/E/F als reine Progression sowie das allgemeine Schema, UI-Reihenfolge, Verlinkung, offizielle Item-Referenzen, mobile CSS und Nicht-Erzwingung von Meta-Daten auf Typhoeus.

**GitHub-Abschluss (16.10.2026):** [PR #17](https://github.com/Ag0n1st/ag0n1st.github.io/pull/17) erfolgreich als Squash-Merge nach `main` übernommen, Merge-Commit **`028463f6cca530d888510d4fa3969e29c962b557`**. GitHub Actions **„Validate Astro and operator guides“ #77** meldete **`success`**: locked Dependency-Install, alle Endfield-Node-Tests einschließlich der neuen Meta-Checks, **100-MB-Endfield-Budget** und **Astro-Produktions-Build** grün. Der folgende Dokumentationsnachtrag auf `main` ist kein separater Nachweis einer Pages-Auslieferung. **Live-Deploy dieses Stands und Browser-/Mobil-End-to-End-Kontrolle noch NICHT unabhängig verifiziert.** Keine Visualisierungen im Chat; normale Web-Assets auf der Website bleiben zulässig. P1-Restpunkt ist weiterhin die tatsächliche Browserkontrolle der Fortschritts- und Blaupausenlogik, jetzt einschließlich direkter Card→Finder-Auswahl.

**Konkrete Abnahmekriterien (statischer Build und CI bestanden, Browser-Sichtprüfung noch offen):** Liino-Sektion = „Meta Builds“ (A/B/C) → Trennlinie → „Build-Finder“ (A–F) → weitere bestehende Ausrüstungsabschnitte. Keine doppelten Build-Daten; Kartenübersicht ohne Detailtabellen, keine Meta-Pflicht für andere Operatoren, mobil untereinander, Card-Finder-Link selektiert die korrekte Build-ID. Vor Merge `npm run test:endfield`, `node scripts/endfield/check-budget.mjs`, `npm run build` durch GitHub Actions vollständig erfolgreich; anschließend PR-Merge, Deployment und offenen Browser-Check in der Roadmap nachtragen.

### 14.3e Build-Finder: standardmäßig geschlossen und maximale Fortschritts-Vorauswahl (16.10.2026)

**Verbindlicher neuer Designbeschluss des Creators nach eigener Layout-Prüfung:** Der Build-Finder war im Abschnitt `Ausrüstung` zu umfangreich und erzeugte **Information Overload**. Die unmittelbar sichtbare `Meta Builds`-Übersicht bleibt, der darunterliegende **gesamte Build-Finder** (Level-/Fabrik-/Story-/Gebiets-/Blaupausenfilter, detaillierte ausgewählte Ausrüstung und Ausrüstungsprogression) ist ab sofort ein **standardmäßig geschlossenes, semantisches HTML-`<details>`**. Die Summary `Build-Finder` zeigt eine kurze Öffnungsanweisung, eine klar sichtbare Aufklappmarkierung und einen Tastatur-Fokus. **Meta-Card-Links und Team-Ausrüstungslinks öffnen den Finder selbsttätig**, bevor sie die entsprechende Build-ID selektieren. Kein zusätzlicher Login, keine doppelten Builds und keine Veränderung der freigegebenen Liino-Builds.

**Zweiter verbindlicher Designbeschluss:** Der Standard soll **fortgeschrittenen Spielern** ohne zehn Klicks einen **vollständig freigeschalteten Vergleichszustand** bieten. Bei **keiner gespeicherten individuellen Auswahl** nimmt die UI an:
- Operator-/Ausrüstungslevel **70** und höchste Fabrikkomponente **Pyrrolit**.
- Storyregion **Wuling**, **alle 19** im aktuellen offiziellen Register vorhandenen Tal4- und Wuling-Gebiete (auch Neben-/parallel erreichbare Gebiete) als ausgewählt.
- Autoritätslevel **60** (keinesfalls über die offizielle Spielgrenze), Wuling-Warenumverteilung **Stufe 3**.
- **Alle für den jeweiligen Operator-Guide tatsächlich in den vierteiligen Builds auftauchenden offiziellen Blaupausen-IDs** als ausgewählt, pro Gear-ID einmalig auch bei doppelten Kits; neue Guides/Blaupausen starten ebenfalls standardmäßig mit Häkchen.
- Das ist **ausschließlich ein Vergleichs-Preset**, **kein nachgewiesener Spielerbesitz** und kein serverseitig bestätigter Quest-/Blueprintfund. Wording und Hilfetexte der UI weisen ausdrücklich darauf hin. Das Backend unterscheidet weiterhin Story-Zugang und Vorlagenbesitz; Benutzer können selbst getrennt Gebiete, Authority, Redistribution, Fabrik, Level und fehlende Einzelteil-Blaupausen abwählen. Ein ausdrücklich als vorhanden markiertes Teil kann durch eine niedrigere Region nicht nachträglich ungefragt enteignet werden.
- **Explizit gespeicherte ältere oder neue Einstellungen haben Vorrang** vor der Maximal-Voreinstellung; das Accordion selbst bleibt nach Reload trotzdem geschlossen (kein gespeichert offener Zustand).

**Technische Umsetzung (Branch `feature-collapsible-max-default-build-finder-20261016`):**
1. `src/components/operator/sections/OperatorEquipment.astro`: `<details class="op-divided op-build-finder-accordion" id="build-finder">` um gesamte Finder-UI, **ohne `open`-Attribut**. Meta-Cards, Slot-/Icon-Daten und allen sechs Liino-Builds unverändert; die bisherigen `.op-divided`-Trennlinien bleiben. Einzelne vorhandene Unter-`<details>` sind im äußeren geschlossenen Finder verschachtelt und öffnen erst nach dessen Aufklappen.
2. `src/styles/operator-guides.css`: Responsive gestaltete Summary mit klarem Chevron, Hover und `:focus-visible`, Theme-Farben. Die bestehenden Meta-Build-Cards bleiben ohne Scroll-/Textüberlastung sichtbar.
3. `src/lib/endfield/buildFinderDefaults.mjs` **neu**: `getMaxBuildFinderPreset` liefert an offiziellen DOM-Auswahloptionen orientiert Level, höchste Fabrikkomponente, Region/Gebiete, Authority-Cap, Redistributon-Maximum, **eindeutige numerische** Gear-IDs. **Keine fingierten Spielquests oder offiziellen Markerzuordnungen.**
4. `src/components/operator/OperatorGuide.astro`: Neuer Erstaufruf `applyMaxPreset()`, dann gespeicherte Overrides; Linkhandler aktiviert `#build-finder.open=true` vor `showBuild(id)`. Level und Fabrikkomponente werden nun mit den restlichen Einstellungen persistent gehalten. `Reset` kehrt **zur Maximal-Vorauswahl** zurück (nicht mehr leere Felder).
5. **Speicherung ohne Accounts:** `localStorage`-Schema **v2** unter `ag0n1st:endfield:build-story-progress:v2`, statt große automatisch angenommene Besitzlisten zu speichern: **nur ausdrücklich abgewählte** `lockedAreaIds` und `unselectedGearBlueprintIds`. Neue fremde Guide- oder spätere Patch-IDs sind deshalb bei Erstansicht automatisch an. Zusätzliche Felder `regionId`, `authorityLevel`, `stockRedistributionLevel`, `level` und `factoryComponent`. Vorherige bewusst gespeicherte **v1-Einstellungen** werden beim Laden weiter akzeptiert und nach der nächsten Änderung nach v2 migriert; kein stilles Überschreiben solcher Wünsche. Bei Reset beide Keys entfernen und wieder maximal vorwählen. `acquiredGearBlueprintIds` wird weiterhin als **Auswahl der aktuellen Seite** an den unveränderten Story-/Build-Finder übergeben; die Annahme wird **nicht** als wirklicher Spielerbesitz behauptet.
6. `scripts/endfield/build-finder-defaults.test.mjs` **neu**: Prüfungen für Maximal-Preset, sechs reale Liino-Builds, Gegenfälle (Level/Fabrik/Blueprint), keine erfundenen IDs, geschlossene Summary samt kompletten Detailbereichen, Meta-/Teamlink öffnet Finder, Speicherung und Reset. Bestehende Import-/Story-/Authority-/Budgettests bleiben bestehen.
7. `docs/operator-guide-workflow.md` um Bestands-/Prioritätsregel, Rücksetzfunktion und fachlichen Unterschied zum früheren **leeren offenen** Standard ergänzt.

**GitHub-Abschluss (16.10.2026):** [PR #18](https://github.com/Ag0n1st/ag0n1st.github.io/pull/18) wurde nach vollständiger erfolgreicher CI **#80** per Squash auf `main` übernommen, Merge-SHA **`c63b4e93dfe9846c6a00fca0f4666ed29cf14122`**. Die finale GitHub Actions-Jobübersicht zeigt **Install locked dependencies**, **Test Endfield data importers**, **Enforce 100 MB Endfield project budget** und **Build Astro website** jeweils **`success`**. Der erste PR-Lauf #78 scheiterte an einem veralteten Meta-Build-Layout-Test (früher H3 statt neuer Summary), und #79 an einem Tippfehler in dessen Regex; die Tests wurden auf die korrekte native `details/summary`-Struktur umgestellt. **#80 ist vollständig grün.** **Die tatsächliche GitHub-Pages-Auslieferung dieses neuen Main-Commits sowie ein realer Desktop-/Mobile-/Keyboard-Test in einem Browser sind noch nicht gesondert verifiziert** und dürfen nicht als bestanden ausgegeben werden.

**Abnahmekriterien (CI/Astro-Build grün, tatsächlicher Browser-Test offen):** Direkt unter Meta A/B/C nur die geschlossene Zusammenfassung des Finders sichtbar. Klick öffnet alle Unterbereiche; Link von A/B/C selektiert richtigen der sechs Finder-Builds. Keine gespeicherten Nutzerdaten → alle bekannten Gebiete/Blueprints angehakt, Authority 60, Stock 3, Level 70, Pyrrolit. Explizite Abwahl begrenzt passende Builds und bleibt browser-/guideübergreifend erhalten; Reset wieder max. Echte Datenquellen und Unsicherheitslabels bleiben; keine tatsächliche Blaupausen-Bestätigung aus dem Preset. Mobile/Tastatur/Keyboard/Reload und bestehende Typhoeus-Vorschau ohne Regression testen.

### 14.3f Zusätzliche Minimal-Vorauswahl neben bestehendem Maximal-Button (16.10.2026)

**Neue verbindliche Entscheidung nach weiterer Layout-Prüfung durch den Creator:** Neben **„Maximal-Vorauswahl wiederherstellen (Anpassungen löschen)“** steht der neue Button **„Minimal-Vorauswahl einstellen (für neue Spieler)“**. Beide Buttons in **derselben, bei schmalem Display umbrechenden Zeile** des eingeklappten Build-Finders. Die globale **Vorauswahl bei neuen Besuchern bleibt unbedingt MAXIMAL** (aus §14.3e); **Minimal** ist eine freiwillige Aktion, damit Einsteiger nicht alle vorher ausgewählten Fortschrittsfelder einzeln deaktivieren müssen. Die Meta-Builds A/B/C, Finder-Builds A–F, Gear-IDs, offiziellen Rezepte und die vorhandene Trennung Storyzugang versus bestätigte Gear-ID bleiben unverändert.

**Implementierung auf Branch `feature-build-finder-minimal-preset-20261016`:**
1. `src/lib/endfield/buildFinderDefaults.mjs`: Neben `getMaxBuildFinderPreset` zusätzlich `getMinBuildFinderPreset`, der die niedrigste im Level-Auswahlfeld angebotene Stufe verwendet (aktuell **Level 10**), die niedrigste im vorhandenen Fabrikdropdown angebotene Komponente (**Amethyst** – das UI hat keine eigenständige Option vor Amethyst), Region leer, Gebiete leer, Gear-Blaupausen leer, Authority leer, Warenumverteilung leer. **Keine automatische Story-Freischaltung oder Besitzbehauptung.**
2. `src/components/operator/sections/OperatorEquipment.astro`: beiden Buttons über `.op-progress-preset-actions` nebeneinander; Hilfetext stellt klar, dass **neue Besucher weiterhin maximal starten**, Minimal dagegen eine bewusste Rückstellung für Einsteiger ist. Die bisherigen max/min-Profile und verfügbaren, detaillierten Gear-Builds bleiben unter der eingeklappten Finder-Summary.
3. `src/styles/operator-guides.css`: responsiver Flex-Container nebeneinander auf breiteren Displays, bei schmalen Bildschirmen untereinander, Mindesthöhe 44px, Hover und deutliche Tastatur-Fokuskonturen; kein neues Icon/Asset nötig.
4. `src/components/operator/OperatorGuide.astro`: `applyMinPreset` stellt alle auswählbaren Inputs zurück, speichert die Auswahl **sofort und bewusst** als `selectionMode: "min"` in bestehendem **`localStorage v2`** und aktualisiert den Finder. `applyMaxPreset` und die Standardinitialisierung bleiben maximal, der vorhandene Max-Button löscht v1/v2 und stellt max wieder her; die Auswahl wird nach Reload und Operatorwechsel korrekt wiederhergestellt.
5. **Wichtige Persistenzgrenze:** `selectionMode: "max"` bewahrt das bisherige **Opt-out**-Modell (`lockedAreaIds`, `unselectedGearBlueprintIds`): neue unbekannte Gear-IDs sind standardmäßig aktiv. `selectionMode: "min"` speichert dagegen **Opt-ins** (`selectedAreaIds`, `selectedGearBlueprintIds`): neue Gear-IDs in anderen Guides und nach Patches sind standardmäßig inaktiv. Eine separate `selectedBlueprintIds`-Menge bewahrt **auch gear-IDs aus anderen Operator-Guides**, die auf der aktuellen Guide-Seite nicht als Checkbox vorkommen; sonst könnten sie bei einem Seitenwechsel überschrieben werden. Alte v1- und v2-Daten ohne `selectionMode` werden unverändert aus dem bisherigen Max-/Legacy-Format gelesen. Eigene Level-, Fabrik-, Region-, Gebiet-, Blueprint-, Authority- und Stock-Anpassungen bleiben erhalten.
6. `scripts/endfield/build-finder-defaults.test.mjs` erweitert um Minimal-Preset, minimal gesperrte Liino-Builds, zwei Buttons in einem Container, Mobile-/Keyboard-CSS, Opt-in-Serialisierung, Nichtverlust über Guides und Nachweis, dass der anfängliche Maximal-Default unverändert bleibt. `docs/operator-guide-workflow.md` dokumentiert beide Modi und die Aufbewahrungsstrategie für spätere KIs.

**Abnahmekriterien:** Bei leerem localStorage weiterhin **Level 70, Pyrrolit, Wuling, alle Gebiete, Authority 60, Stock 3 und alle auf der Seite angebotenen Blaupausen markiert**; die Finder-Summary bleibt zugeklappt. Nach Klick auf Minimal **Level 10, Amethyst, keine Region/Authority/Stock-Werte, alle Gebiete/Blaupausen abgewählt**; ungeeignete Builds bleiben klar als gesperrt erkennbar. Änderungen bleiben nach Reload und Operatorwechsel erhalten; neu eingeführte Gear-IDs im Minimalmodus standardmäßig aus, im Maximalmodus standardmäßig an. Max-Button stellt exakt das ursprüngliche Defaultverhalten wieder her. Auch Mobile und Keyboard prüfen.

**Abschluss der Implementierung (16.10.2026):** [PR #19](https://github.com/Ag0n1st/ag0n1st.github.io/pull/19) nach **erfolgreicher CI #82** per Squash-Merge auf **`main`** übernommen; Merge-Commit **`343c8a0d0a626dc423a534bc9004d1eda971e796`**. Die CI-Jobübersicht belegt Erfolg für **locked Dependency-Installation**, **Endfield-Node-Tests**, **100-MB-Datenbudget** und **Astro-Produktions-Build**. Ursprünglicher Workflow #81 zeigte zwei **veraltete/inkorrekte Testannahmen** zur neuen Blaupausen-Labelbeschriftung und zu einer CSS-Klassensuche; diese wurden präzisiert. Die Geschäftslogik-Tests für die neue Minimal-Vorauswahl waren bereits erfolgreich, der finale Gesamtlauf #82 ist vollständig grün. **GitHub-Pages-Auslieferung und Live-Browser-/Mobile-/Keyboard-Abnahme sind separat noch nicht unabhängig bestätigt.** Ein erfolgreicher GitHub-Astro-Build allein belegt nicht, dass die Live-Domain aktualisiert wurde.

### 14.3g Datafield-Browser-Exporter: dynamische Liino-Werte verlässlich auslesen (16.10.2026)

**Vom Nutzer angestoßener Fehlerhinweis:** Im eigenen Browser zeigt Datafield die Zahlen in **aufklappbaren HTML-DIV-Elementen**, während unser einfacher Webseiten-Leser nur `Loading data...` zurückgab. Folgerung: **nicht die Daten fehlen, sondern der Crawler liest den HTML-Ausgangszustand statt des fertig hydrierten DOM**. Diese Unterscheidung ist ab sofort eine verbindliche Integrationsregel.

**Nachgewiesene Lösung:** Public Chromium mit Playwright startet eine einzige Datafield-Charakterseite, wartet auf den JS-gerenderten HTML-Abschnitt, erfasst `img.alt` sowie Inhalt der sichtbaren DOM-Karten und löst versteckte `Show N More Weapons`-Aktionen durch das **originale DOM-Click-Ereignis** aus. Hintergrund: Datafields eingeblendeter `#app-preloader` fängt Playwright-Mausklicks ab, obwohl Werte bereits im DOM stehen. `element.click()` auf der existierenden Schaltfläche behebt dies ohne Umgehen einer Anmeldung und ohne künstliche Werte. **GitHub Actions Probe #87** lieferte **5/5 Potenzialwerte und 7/7 Waffenrang-Varianten**, inklusive Datenquelle zum Original-Spreadsheet. **Probe #91** extrahierte zusätzlich **beide** Datafield-Teamtabs: 7 Waffen im standardmäßig aktiven **Zhuang Perlica Arclight Team** und 6 im **Arcane TT Xaihi Team**. Jeweils nachweisbar eigene Prozentwerte. Der **aktive Team-Tab** wurde am CSS-Status `button.char-tab.active` unabhängig bestätigt.

**Quelldaten Liino:** P1/P2/P3/P4/P5 = **+3,2 % / +0,7 % / +0,8 % / 0,0 % / +4,7 %**, Datafield-Originalsatz `Each % increase is relative to the previous potential.` => **nicht mit `increaseOverP0Percent` verwechseln**. Waffenvergleich jeweils normiert auf BND R4 = 100 %. Team A: BND R9 112,1 %; Golden Age R9 85,0 %; JET R9 84,7 %; JET R4 83,5 %; Golden Age R4 83,4 %; Cohesive Traction R9 81,3 %. Team B: BND R9 110,3 %; Golden Age R9 91,6 %; Golden Age R4 89,5 %; JET R9 89,0 %; Cohesive Traction R9 81,3 %. **Keine universelle Waffenliste ohne Teambezug erstellen.** Die exakten Gear-IDs dazu stehen im verlinkten Quellen-Dokument, getrennt vom Roh-SKPORT-Katalog.

**Langfristige Projekt-Architektur:**
- `scripts/endfield/datafield_rendered_export.py`: parametrischer **Read-only** Browser-Exporter `python scripts/endfield/datafield_rendered_export.py liino --output snapshot.json`, Playwright+Chromium lokal installiert. Kein Scrape-Mechanismus in Astro-Runtime oder Browser des Webseitenbesuchers; nur redaktionelles Build-/Guide-Datensammeln.
- `.github/workflows/datafield-probe.yml`: optionaler **workflow_dispatch** zum manuellen Export eines gewünschten Operator-Slugs über einen GitHub-Runner, mit JSON-Artefakt. Keine zeitgesteuerte Dauerabfrage, kein Login und keine fortwährenden Netzanfragen. Nicht mit dem bestehenden GitHub-Pages-Workflow verbinden.
- `docs/datafield-rendered-extraction-20261016.md`: Prüfbericht mit beiden Szenarien, Baseline, Einzelpotenzialwerten, Sheet-Dokument-ID sowie Qualitätsgates.
- **Harte Abnahme:** Nur bei geladener Datafield-DOM-Überschrift, vollständigen Rang-/P-Werten, sauberer Team- und Referenzzuordnung JSON als verwertbar melden. Sonst Fail/Partial und **keine** Prozentfelder füllen. Datafield-Spreadsheet-Bedingungen zu Team, Rotation, Gear und P-Stand separat prüfen. Quellenangabe in Website **„Quelle: Datafield“ als Klartext ohne Link**, wie §P2 beschlossen.
- **Kein Eingriff** in alle sechs redaktionell freigegebenen Liino Gear-Builds, Skill-Priorität, Status `preview`, Ausrüstungs-UI oder bestehendes Max-/Min-Finder-Profil.

**GitHub-Abschluss (16.10.2026):** [PR #22](https://github.com/Ag0n1st/ag0n1st.github.io/pull/22) nach erfolgreichem **Validate Astro and operator guides #95** (locked Dependencies, Endfield-Tests, 100-MB-Budget, Astro-Produktions-Build jeweils `success`) als Squash auf **`main`** gemergt, Commit **`c30057ae86c88be79d151c02ecfe059d2335dba4`**. Zuvor direkte Headless-Chromium-Proben in GitHub Actions **#87** (5 P + 7 Waffen) und **#91** (zwei Team-Szenarien mit je 7 bzw. 6 Waffen) durchgeführt und JSON-Artefakt technisch geprüft. **Der separate manuell startbare Datafield-Workflow wurde auf `main` hinzugefügt, ist aber noch NICHT selbst über `workflow_dispatch` erprobt.** Der temporäre Datafield-Testschnipsel aus `validate-astro.yml` wurde **vor Merge vollständig zurückgesetzt**. Kein automatischer Seitenbesuch beim normalen GitHub-Pages-Build. Eine reale Live-Browser-/Pages-Abnahme des Operator-Finders bleibt weiterhin offen. Die bisherigen Tests von Run #87 und #91 waren separate Browserproben auf dem PR-Zweig, **keine Validierung der Live-Pages-Domain**. Nächste Schritte: sauberen Workflow (nur manual, keine temporären CI-Probe-Steps) mergen, Vergleichsbedingungen aus Datafield-Originalsheets dokumentieren, dann erlaubt-basierte Waffen-/Potenzialfelder ohne Verwechslung der zwei Teamtabellen eintragen. P1-Live-Browser-Tests weiter offen.

### 14.3h Creator-Freigabe: Liino-Waffen/Prozente/Potenziale aus Datafield-CHARAKTERPROFIL (16.10.2026)

**Expliziter Nutzerbeschluss:** Von der **Datafield-Charakterseite** (`datafield.cc/characters/liino`) – **NICHT** dem Datafield-Team-Hub – werden die dort veröffentlichten berechneten **Waffen-Prozentwerte und Potenzialstufen-Prozente** ab sofort für Liino übernommen, **mit sichtbarem Disclaimer**. Dieselbe Quell-/Disclaimer-Konvention gilt künftig für **alle weiteren Operator-Guides**. Die **vom Creator vorgeschriebene Waffen-Kategorie in der Übersicht**: **BiS Bedazzling Night Debut (`1046`), BP Golden Age (`1044`), Alternative JET (`75`), F2P Cohesive Traction (`97`)**, jeweils **ohne R4/R9 im Übersichtseintrag**. Rangabhängigkeit **nur** unterhalb in Prozentvergleichstabellen. Community-Kategorien dürfen die redaktionelle Creator-Wahl nicht umsortieren.

**Echte Quelle und numerische Details:** Direkter Chromium-DOM-Export vom 16.10.2026, dokumentiert in `docs/datafield-rendered-extraction-20261016.md`, GitHub Browserproben #87/#91 und Original-Export. 2 **unabhängige Tabs** der Datafield-`/characters/liino`-Seite:
- **Zhuang Perlica Arclight Team:** Bedazzling Night Debut R9 **112,1 %**, R4 **100,0 %**; Golden Age R9 **85,0 %**, R4 **83,4 %**; JET R9 **84,7 %**, R4 **83,5 %**; Cohesive Traction R9 **81,3 %**.
- **Arcane TT Xaihi Team:** Bedazzling Night Debut R9 **110,3 %**, R4 **100,0 %**; Golden Age R9 **91,6 %**, R4 **89,5 %**; JET R9 **89,0 %**; Cohesive Traction R9 **81,3 %**. **JET R4 ist im zweiten Tab nicht angegeben und wird nicht erfunden**.
- **100-%-Referenz je Team:** Bedazzling Night Debut **R4**. Die Werte sind team- und rangspezifisch. Die exakte Teamrotation, Ausrüstung und andere Excel-Modellannahmen sind **noch nicht vollständig unabhängig nachgewiesen**. User genehmigt **trotzdem ausdrücklich Veröffentlichung MIT DISCLAIMER** – abweichend von der früheren Warteentscheidung aus §14.3g. Diese ältere Vorbedingung ist damit für die **Veröffentlichung gekennzeichneter Zahlen überholt**. Weiterhin nie als universelle Stärke oder garantierte DPS-Erhöhung ausgeben.
- **Potenziale:** P1 **+3,2 %**, P2 **+0,7 %**, P3 **+0,8 %**, P4 **+0,0 %**, P5 **+4,7 %**; Datafield-Seitentext `Each % increase is relative to the previous potential.` => nur **`increaseOverPreviousPercent`**, niemals ungeprüft `increaseOverP0Percent` füllen oder die Prozentwerte addieren. Es sind modellierte **Zusatzgewinne pro Stufe**, keine Pull-Empfehlung.

**Framework-Implementierung (Branch `feature-liino-datafield-weapons-potentials-20261016`):**
1. `src/content/operatorGuideSchema.ts`: wiederverwendbare `weapons.comparisons[]` mit jeweils `id/title/sourcePageType: character-profile/sourceNote/snapshotDate/referenceWeaponId/referenceRank/comparisonConditions/entries[]`; Einträge `weaponId/rank/performancePercent`. Semantische Prüfung einer **expliziten 100-%-Referenz pro Szenario**, eindeutiger Waffe+Rang-Kombination, id und **nur textueller Quellenangabe ohne URL**. Zusätzlich optionale `weapons.disclaimer` und `potentials.disclaimer`.
2. `src/content/operator-guides/liino.md`: **vier Creator-Waffenempfehlungen ohne Waffenränge**, darunter zwei getrennte Datafield-Teamtabellen mit 7 bzw. 6 Zeilen (offizielle SKPORT-Waffen-IDs); Potenziale P1–P5 als Vorstufen-Zusatzprozent. Texte und Disclaimer weisen auf **Charakterprofil statt Team-Hub** sowie ungeprüfte Modellbedingungen hin. **Bestehende Gear- und Skills-Abschnitte bleiben unverändert**, Gesamtguide `preview`.
3. `src/components/operator/sections/OperatorWeapons.astro`: kompakte Übersicht mit vier einzelnen Waffencards, danach **je eine Vergleichstabelle pro Team** mit Teamtitel, Waffennamen, Waffen-Rank, relativem Prozentwert, Datafield-Quelltext und aufklappbaren Vergleichsbedingungen; Disclaimer sichtbar darunter. **Keine Vermischung** der Teamwerte, keine URLs zur Quelle.
4. `src/components/operator/sections/OperatorPotentials.astro`: Potenzialtabelle korrigiert um **„Zusatzgewinn zur Vorstufe“** und optional getrennte „Gesamtgewinn vs. P0“-Spalte (für Liino bewusst leer); Quelle und Disclaimer. Der Friendly Disclaimer „Potenziale sind kein Muss“ bleibt erhalten.
5. `src/styles/operator-guides.css`: zwei Szenariokarten responsiv, lange Namen und Disclaimer lesbar; keine neuen Bild-Assets.
6. `src/content/operator-guides/_template.md` + `docs/operator-guide-workflow.md`: dauerhafte Selbstpflege-Konvention für weitere Operatoren: **Datafield-CHARAKTERSEITE**, mehrere Teamanwendungen getrennt; keine Ränge in der Waffenübersicht; Quellenhinweise als Klartext; Disclaimer **Pflicht** und modellbedingte Unsicherheit transparent.
7. `scripts/endfield/liino-datafield-comparisons.test.mjs` (neu): Test der 4 ausgewählten Waffenkategorien/IDs, vollständige 7+6 Prozentwerte (einschließlich Datenlücken), zwei Referenzen, 5 inkrementelle Potentialwerte, Disclaimertreue, korrekte UI-Spalten und Quellenlogik. CI `npm run test:endfield`, 100-MB-Budget und Astro-Build, danach PR-Merge auf `main` und separater Live-Browser-Check.

**GitHub-Abschluss (16.10.2026):** [PR #23](https://github.com/Ag0n1st/ag0n1st.github.io/pull/23) nach erfolgreicher **Validate Astro and operator guides #98** per Squash auf **`main`** übernommen, Merge-SHA **`2e1a0c1be1ccc413bbc317e9e59d2548212fab79`**. Die CI-Jobübersicht zeigt **alle Endfield-Node-Tests einschließlich des neuen 4-Waffen-/2-Szenario-/5-Potenzial-Regressionschecks, 100-MB-Budget und Astro-Produktions-Build** als `success`. Die anfänglichen Läufe #96 und #97 enthielten veraltete Testannahmen bzw. Test-Syntaxfehler; diese wurden korrigiert, **#98 ist komplett grün**. Die vier Waffenempfehlungen, zwei Datafield-Szenarien und fünf Potenzial-Prozentwerte sind damit **als Liino-Guide-Daten auf `main` enthalten**, jeweils mit Erläuterung und Disclaimer. **Der Liino-Gesamtguide bleibt bewusst `preview`**, die übrigen Abschnitte sind nicht redaktionell abgeschlossen. **Eine unabhängige Browser-Abnahme der realen Pages-Auslieferung und Mobile-Ansicht ist weiterhin offen**; CI-/Astro-Erfolg ist kein entsprechender Nachweis. Der numerische Vergleich ist als Datafield-Modell markiert und **nicht** als eigene unabhängige DPS-Simulation ausgegeben. `Potentials (DPS Increase)` bleibt kein Beweis für eine kumulative vs.-P0-Steigerung. P1-Live-Tests des Build-Finders sind unabhängig hiervon weiter offen.

### 14.3i Übersicht mit echten Items, automatischer Meta-Zugänglichkeit und kompakter Datafield-Darstellung (16.10.2026)

**Verbindliche achtteilige Designentscheidung des Creators nach Live-Layoutprüfung:**
1. **„Build auf einen Blick“** zeigt endlich **echte Item-Icons und Namen** sowohl für jede empfohlene Waffe als auch die **vier Ausrüstungsteile** des Featured-Builds. Die vorherige Ansicht zeigte bei Waffen `[Icon]` plus technische ID und bei Gear teilweise nur IDs. **Keine zweite manuell gepflegte Zuordnung:** `OperatorOverview.astro` nutzt `resolveOfficialItem(...,"Weapons"|"Gear")` und `ItemIcon` aus dem bestehenden offiziellen SKPORT-Cache. Der ausgewählte Gear-Build bleibt `overview.featuredBuildId` (Liino = `ultimate-fokus` mit 1134/1138/1236/365).
2. **Einordnung:** Liino **Spielschwierigkeit 1/5**, **Flexibilität 4/5** ausdrücklich redaktionell genehmigt in `liino.md`. **Zugänglichkeit für ALLE Operatoren automatisch**, **ausschließlich** basierend auf `equipment.builds[].meta===true`; darunterliegende Übergangs-Builds, etwa Liino D–F, beeinflussen die Einstufung **nie**. Die Bewertung der Gear-Slots/Standardrezepte beruht auf verifiziertem SKPORT-Import und `getBuildRequirements` – nicht auf Fantasie-/Account-Daten.
3. **Normiertes 1–5-Bewertungskonzept (5 = am leichtesten zugänglich):**
   - **5/5 (Early):** bis Lv36, Amethyst/Ferrium, Einsteigerkomponenten;
   - **4/5 (Early/Übergang):** Lv50 oder Cryston;
   - **3/5 (Mid):** Lv60 oder Xiranit;
   - **2/5 (fortgeschrittenes Mid):** Lv70 ohne Endgame-Komponente, z. B. Xiranit/Cuprium;
   - **1/5 (Endgame):** Hetonit oder Pyrrolit. **Bei jeder Buildbewertung zählt jeweils die strengere Anforderung aus gearLevel und höchster Fabrikkomponente.** Der **am frühesten verfügbare vollständig validierte Meta-Build** ist ausschlaggebend: Ein Spieler braucht für eine grundlegende Meta-Ausstattung nur **einen** solchen Build. Andere teurere Meta-Builds können weiterhin später verfügbar sein. Fehlt eine verified Slot-/Rezeptzuordnung bei auch nur einem ausgewiesenen Meta-Build oder existiert gar kein echter Meta-Build, **keine erfundene automatische Zahl**, sondern „–“. **Region, Quest-/Gebietszugang und tatsächlich eingesammelte Blaupausen** bleiben in einem **separaten Build-Finder** geprüft; die vereinfachte Zugänglichkeitswertung behauptet niemals Blaupausenbesitz. **Liino = 1/5**, weil A/B/C aus Pyrrolit-basierten Lv70-Items bestehen.
4. **Waffenempfehlungen** und **Waffendetails** sind **persönliche Creator-Einordnungen**. Beide zeigen **keinen** Quellenhinweis „Datafield“ und kein „Quelle der Einordnung“. Das `sourceNote` wurde aus den Liino-`recommendations` entfernt; quantitative Vergleiche werden davon getrennt gespeichert.
5. **Waffenvergleich**: Die zwei Teamkarten bleiben separat, mit je Teamname, **100-%-Referenz** (BND R4), Tabelle Waffe/Rang/Prozent und **winziger Fußnote** `Quelle: Datafield` **direkt unter der Tabelle**. Entfernt: erklärender Text oberhalb, aufklappbare `Vergleichsbedingungen`, allgemeiner `Hinweis zur Dateninterpretation` und redundante Lang-/Datumsquellen. **Methodik/Baselines bleiben intern im YAML** (`comparisonConditions`, `snapshotDate`, `sourceNote`) und in Forschungsdocs, auch wenn die UI bewusst minimal ist. Keine Berechnungen im Browser.
6. **Potenzialvergleich**: Nur noch **„Zusatzgewinn zur Vorstufe“**, ohne `Gesamtgewinn vs. P0` im Card-Detail, in der Übersichtstabelle oder im **Zod-Schema**. **Keine Quellenspalte, keine Quellenzeile an jeder P-Card, keine aufgeklappten Modellbedingungen und kein großer Disclaimer**. Genau **eine kleine Fußnote** `Quelle: Datafield` unter der Gesamttabelle. Die fünf Modellzahlen P1–P5 **3,2/0,7/0,8/0,0/4,7 %** und die Official-SKPORT-Effekte bleiben erhalten; interne `comparisonConditions` weiterhin aufzuzeichnen.
7. **`Potenziale > Pull-Empfehlung` komplett gestrichen**: Keine redundant dekorierten Pull-Badges/Buttons dort. Die **allgemeine persönliche Pull-Empfehlung** gehört später ausschließlich in den Guide-**Fazit-Abschnitt** (`conclusion.pullAdvice`). `potentials.pullAdvice` als Schema-/Template-Feld entfernt. Der kurze generelle Friendly Disclaimer „Potenziale sind kein Muss“ in der Sektion selbst bleibt zunächst.
8. **Framework-/Dokumentation konsistent:** `src/lib/endfield/metaAccessibility.mjs` neu mit reiner und testbarer Score-Funktion, `operatorGuideModel.ts` leitet die Bewertung global ab, `OperatorOverview.astro` rendert offizielle Item-Daten und automatisch berechnete Rating-Balken. `OperatorWeapons.astro`, `OperatorPotentials.astro`, `operatorGuideSchema.ts`, `_template.md`, `src/styles/operator-guides.css` sowie `docs/operator-guide-workflow.md` ziehen die Kompaktregeln durch. Die Quellenangabe bleibt **nur textuell**, ohne Hyperlink. Historische Disclaimers aus §14.3h werden **auf Creator-Wunsch von §14.3i ersetzt**; frühere Quellen-/Baseline-Daten werden **nicht gelöscht**, sondern bleiben im Repo nachvollziehbar.

**Validierung/Abnahme:** Neue `scripts/endfield/operator-guide-accessibility-layout.test.mjs` deckt 1–5-Grenzen, unbekannte/fehlende Gear-Daten, Ausschluss von Transition-Builds, früheste Meta-Option, reale Liino-Endgame-Daten, Vorhandensein echter Bilder/Namen und entfernte redundante Datenfelder ab. Ältere UI-Tests werden auf die **neue verbindliche Layoutstruktur** aktualisiert. **GitHub-Abschluss (16.10.2026):** [PR #24](https://github.com/Ag0n1st/ag0n1st.github.io/pull/24) nach vollständig erfolgreicher GitHub Actions **„Validate Astro and operator guides“ #101** per Squash auf **`main`** gemergt, SHA **`05e2e5b05af093eba109bd2586913f7799ffa840`**. Testlauf validierte offiziellen Meta-Gear- und Komponentenbedarf, Liinos Rating 1/5 bei Pyrrolit, die selbstständig definierte 1–5-Rubrik, Gear-/Waffen-Item-Lookups, kompakte Quellenfußnoten, entfernte P0-/Pull-Spalten sowie die ursprüngliche Liino-Build-/Skill-Logik. **Endfield-Node-Tests, 100-MB-Budget und Astro-Produktions-Build alle `success`**. Frühere Workflow #99 enthielt zwei unpassende Testannahmen (Disclaimers als Abschnittstrenner / Regex-Syntax); im Folgecommit korrigiert und im finalen Lauf #101 vollständig grün. **Live-GitHub-Pages-Deploy, reale Browser-/Mobile-/Tastatur-/LocalStorage-Prüfungen weiterhin separat nicht nachgewiesen.** Die **separate P1 Browser-/LocalStorage-Abnahme** des Build-Finders und Pages-Deploy bleibt weiterhin offen.

### 14.3j Liino-Redaktion: Traits, Stärken/Schwächen, zwei Meta-Supportteams, Videoplatzhalter und Fazit (16.10.2026)

**Ausdrückliche Creator-Freigabe; keine stillschweigende Extrapolation auf andere Operatoren:**
1. **Profil-Traits:** `HP Treatment` und `Amp` (exakt Englisch, Übersetzung kommt später). In `src/content/operator-guides/liino.md` unter `overview.traits`, Zod-Schema `overview.traits[]` optional für alle Guides und `OperatorOverview.astro` rendert echte Trait-Chips statt `[Offizielle Traits noch nicht importiert]`. **Nicht** als offiziell importierte Daten behaupten: redaktionelle Creator-Werte.
2. **Vier Stärken (Creator):** großzügige Verstärkungseffekte; FP-Generierung; vielseitiger Einsatz durch die lange Kampffertigkeit; sehr einfache Spielweise ohne komplexe Mechaniken.
3. **Zwei Schwächen (Creator):** weitgehende Abhängigkeit von der Signature-Waffe für maximale Verstärkungen; Golden Age (Battle Pass) als sinnvollste, aber deutlich schwächere Alternative bei den **Team-Verstärkungseffekten**. JET und Cohesive Traction bleiben als zuvor vom Creator bestätigte Alternativ-/F2P-Einträge bestehen. Dieser qualitative Nachteil darf NICHT in einen absoluten Ausschluss der anderen beiden Waffen umgedeutet werden.
4. **Fünf konkret freigegebene Liino-Support-Teams**, **exakt zwei Meta** (`teams.meta[]`) und **drei weitere** (`teams.more[]`). Liino übernimmt **in allen `role: support`**; kein Zwang, Liino als Main DPS oder unterschiedliche Hauptrollen vorzustellen. Meta **Zhuang Fangyi + Perlica + Arclight + Liino** (`zhuang-fangyi,perlica,arclight,liino`) und **Arcane + Tangtang + Xaihi + Liino** (`arcane,tangtang,xaihi,liino`). Weitere **Zhuang Fangyi + Perlica + Arcane + Liino**, **Arcane + Snowshine + Xaihi + Liino**, **Arcane + Estella + Xaihi + Liino**. Unter `Teamrolle & Synergien` nur Liino-Support und breite Nutzbarkeit als textliche Einordnung; `OperatorTeams.astro` zeigt **Teamnamen in normaler Schreibweise** statt rohe Slugs, die zwei Meta-Cards als `Meta · Support`, die weiteren Cards ohne unnötige zusätzliche Rollenfilter (nur ein `support`-Rollenwert). **Keine** ungefragten rotations- oder gear-spezifischen Empfehlungen pro Team hinzugefügt.
5. **Gameplay zunächst bewusst ohne Videos:** Keine erfundenen Thumbnail-/Clip-Runs. Neue optionale Guide-Angabe `gameplay.pending: true` im Liino-YAML; `OperatorGameplay.astro` zeigt **kleines FOLGT-Label links oberhalb der Überschrift** und einen einzigen kurzen Satz. `operatorGuideModel.ts` erzeugt in diesem Zustand **keine künstlichen Demo-Showcases**, obwohl der Gesamtguide noch `preview` ist. Andere Operator-Guides verhalten sich mit `pending: false` standardmäßig wie bisher. Nach künftigem echten Video-Import `pending` deaktivieren.
6. **Fazit / Pull-Empfehlung:** In `liino.md` `conclusion.recommendation: recommended` und vom Creator freigegebene klare Pro-Pull-Aussage: **grundsätzlich lohnender Account-Mehrwert**, auch jenseits von Elektro-/Natur-Teams dank langer **allgemeiner ANG-Verstärkung** der Kampffertigkeit; unkomplizierte passive Unterstützung nach der Aktivierung. Besonders für Elektro-/Natur-Fokus, aber in **weitaus mehr Teams als den fünf Beispielen** einsetzbar. Beim Verzichten **kein pauschaler Ausschluss**, sondern der Spieler beurteilt, ob ein sinnvoller Platz in den **eigenen** Teams besteht. `OperatorConclusion.astro` stellt bei `recommended` eine **fertige, grafisch gestaltete `✓ Empfehlung`-Plakette ohne eckige Klammern** dar (über CSS, kein generiertes Bild), entfernt die doppelte Anzeige des Verdict-Texts. Für andere Empfehlungsgrade bleibt der allgemeine Fallback bestehen.
7. **Guide-Framework & Übergabe:** Angepasst `operatorGuideSchema.ts`, `OperatorOverview.astro`, `OperatorTeams.astro`, `OperatorGameplay.astro`, `OperatorConclusion.astro`, `operatorGuideModel.ts`, `operator-guides/_template.md`, `operator-guides.css`, `docs/operator-guide-workflow.md`. Neue Testdatei `scripts/endfield/liino-profile-teams-conclusion.test.mjs` überprüft echte Textwerte/Teamlisten/Trait-Chips/FOLGT/veröffentlichungsfertige Badge ohne Regression der **sechs Gear-Builds**, Meta A/B/C, Skill-Priorität und Datafield-Tabellen.

**Was weiterhin offen bleibt:** Der separate redaktionelle **Operator-Kit-/Rotations-Text** sowie die tatsächlichen **Video-URLs/Showcase-Assets**. Auch die obere Videocard ohne eingebettete YouTube-URL bleibt bis dahin ein Platzhalter. `liino.md` bleibt darum **`status: preview`**, **nicht `published`**. Reale GitHub-Pages-Auslieferung und Browser-/Mobil-/Tastatur-Abnahme des gesamten Guides und Finder-LocalStorage weiterhin separat ausstehend. Diese Freigabe enthält keine automatische Zusicherung, dass zusätzliche Skills, Teams oder Potenziale neu berechnet wurden.

**GitHub-Abschluss (16.10.2026):** [PR #25](https://github.com/Ag0n1st/ag0n1st.github.io/pull/25) nach erfolgreicher GitHub Actions **„Validate Astro and operator guides“ #102** per Squash auf **`main`** gemergt, SHA **`8a50a1cd4c41db61d0f0fe4f35953a73fd15a68a`**. CI-Job: locked Dependencies, Endfield-Node-Tests einschließlich `liino-profile-teams-conclusion.test.mjs`, 100-MB-Datenbudget und Astro-Produktions-Build jeweils **`success`**. Das Operator-Guide-Template und `docs/operator-guide-workflow.md` wurden mitgezogen. **Kein echter Browser-/Mobile-Test und kein nachgewiesener Live-GitHub-Pages-Deploy**; diese bleiben getrennt offen. **Liino bleibt `preview`**, da das Operator-Kit/Video-Footage noch nicht vollständig redaktionell eingepflegt sind.

### 14.3k Guide-first Layout-Revision: kompakte Primärinhalte, sieben aufklappbare Sekundärbereiche und Navigation (16.10.2026)

**Neue verbindliche Entscheidung:** Der Creator empfindet die bisherige Operator-Guide-Vorlage als **zu stark wie eine Wiki-Seite** statt als priorisierten **Guide**. Deshalb bleibt nur das, was für eine direkte redaktionelle Entscheidung nötig ist, standardmäßig sichtbar. SKPORT-Daten/Detailtabellen bleiben **vollständig und unverändert verfügbar**, aber erst nach dem ausdrücklichen Öffnen einer nativen Disclosure. Diese Änderung gilt für **alle Guides**, nicht nur Liino. **Keine Datenquelle, Build, Teamzusammenstellung, Slot, Potenzial-Prozentzahl oder Skill-Priorität ändern.**

**1) Seitenmenü „Gameplay“ landet bei „Teams“ – Navigationsfehler:** Der bisherige `OperatorGuide.astro`-ScrollSpy nutzte eine feste Scrollschwelle. Bei sehr kurzem `#gameplay` und kurzem nachfolgendem Fazit **kann der Anker nahe dem Seitenende nicht hoch genug scrollen**. ScrollSpy identifizierte deshalb weiter `#teams`, obwohl `#gameplay` tatsächlich angewählt wurde. Neue `selectedByClick`-Auswahl, Hash- und `scrollIntoView`-Synchronisation; aktive `aria-current="location"`-Auswahl bleibt während des Klick-Zielwechsels erhalten, solange die gewählte Sektion sichtbar ist. Sobald anschließend echte Nutzer-Scroll-/Pointer-/Tastaturinteraktion stattfindet, übernimmt wieder ScrollSpy. Die TOC-IDs bleiben unverändert. **Live-Desktop/Mobilprüfung weiterhin noch nötig**, kein Browser-Test in CI behauptet.

**2) Fazit kompakt, ohne drei verschachtelte Wertungsebenen:** `OperatorConclusion.astro`: Statt `Gesamturteil`-Card plus `Pull-Empfehlung`-Card nun **ein einziger `Fazit`-Header** mit `✓ Empfehlung`-Badge auf derselben Höhe. **nur ein zusammenhängender Fazittext** (`conclusion.verdict`, ersatzweise `conclusion.pullAdvice` bei fehlendem Urteil), ohne duplizierte Erklärung oder Extra-Card. Liinos früher separate Verdict- und Pull-Absätze sind redaktionell in **einem** `conclusion.verdict` zusammengeführt; `pullAdvice` für Liino weggelassen. Die zwei Audience-Cards `Für wen lohnt es sich?` und `Wer kann verzichten?` bleiben separat erhalten. Die Empfehlungskategorie wird weder geändert noch doppelt angezeigt.

**3) Teams:** Zwei Meta-Team-Cards bleiben sofort sichtbar; das bisher zusammengefasste farbige `Meta · Support`-Label wird in **ein akzentuiertes `Meta`-Chip** und **ein neutrales `Support`-/Rollen-Chip** zerlegt. Die drei Liino-Alternativteams sind unter `<details class="op-divided op-guide-accordion" data-guide-disclosure="team-options">` mit neutralem `<summary>`-Toggle **anfänglich eingeklappt**. Andere Guides mit verschiedenen Teamrollen behalten beim Öffnen den vorhandenen Rollenfilter; kein Community-Rankingsystem.

**4) Potenziale:** `Potenzialübersicht` mit P1–P5 und offiziellem Effekt bleibt unmittelbar sichtbar. `Potenzialvergleich` (Vorstufen-Prozentwerte und eine Datafield-Fußnote) nun als **eigene anfänglich eingeklappte Card**. Die bereits beschlossene Entfernung kumulativer vs.-P0-Werte bleibt bestehen.

**5) Waffen:** `Waffenempfehlungen` mit Creator-BiS/BP/Alternative/F2P bleibt sichtbar, vier Karten unverändert. Die umfangreichen `Waffendetails` und `Waffenvergleich` mit getrennten Datafield-Teamtabellen erhalten **jeweils ein eigenes standardmäßig geschlossenes `<details>`**; dortige Waffen-Rank-Selector, Unterdetails und Datenquelle bleiben erhalten.

**6) Fertigkeiten:** `Skill-Priorität` **mit allen vier Zielstufen** wird weiterhin sofort gezeigt. Darunter **ein einzelnes geschlossenes `Fertigkeiten & Talente`-Accordion** mit allen offiziellen Fertigkeits-Cards, Rank-Auswahl, Effekten, Vollstufen-Metriken, Kosten, Combat-/Schiffs-/Attributtalenten und ihren bereits vorhandenen Unterdetails. Keine Fertigkeitswerte gelöscht.

**7) Operator-Kit:** `Operator-Profil & Spielweise` bleibt sichtbar. `Attributentwicklung` samt Kosten-Untertabelle und `Operator-Aufstieg & Freischaltungen` als **zwei unabhängige, standardmäßig geschlossene Details**. `Ressourcen & Verfügbarkeit` bleibt vorerst sichtbar.

**Implementierung und Zugänglichkeit:** Einheitliche CSS-Klasse `op-guide-accordion` und `op-guide-accordion-summary`, Tastaturfokus und Chevron; nativ funktionierende `<details><summary>` ohne `open`, daher auch ohne JavaScript benutzbar. Keine eigenen Persistenz-Keys für Disclosure-States, keine künstlich hinzugefügten Daten. Normale Build-Finder-Max-/Min-Persistenz und dessen Standard-`closed`-Zustand bleiben **unverändert**. Mobilansicht mit responsiven Titeln und kleinem Toggle-Text.

**Verifikation:** Neuer `scripts/endfield/operator-guide-disclosure-layout.test.mjs` testet **sieben** default-closed Sektionen, vorangestellte Primärinfos, badges, Fazit-Deduplizierung und Navi-Hash-/scrollSpy-Regressionsschutz. Historischer Liino-Meta-Test auf getrenntes Label angepasst. **GitHub-Abschluss (16.10.2026):** [PR #26](https://github.com/Ag0n1st/ag0n1st.github.io/pull/26) nach komplett erfolgreichem GitHub Actions **„Validate Astro and operator guides“ #109** auf `main` per Squash gemergt, SHA **`891a24b9d3d40c24709cdd7be3cf95b93cc1ab2a`**. CI erfolgreich für locked Dependencies, alle Endfield-Node-Tests inklusive neuem Disclosure-/Navigationstest, 100-MB-Projektbudget und Astro-Produktions-Build. **Historischer Workflow #103** zeigte eine zu restriktive CSS-Testannahme; nach Vereinheitlichung der Fazitabsätze musste CI #108 zudem zwei ältere Fazit-Assertions korrigieren. **Finaler Workflow #109 ist komplett grün.** Liinos Gesamtfazit wurde in `liino.md` zu **einem** redaktionellen Absatz konsolidiert, die Felder `conclusion.recommendedFor` und `skipIf` und ihre zwei Audience-Cards bleiben unverändert. **Live-Pages-Deploy und realer Desktop-/Mobile-/Tastatur-/Anker-Scroll-/LocalStorage-Test wurden noch nicht unabhängig durchgeführt.** Der User hat ein tatsächliches Live-Problem beobachtet; Erfolg der Node-Tests allein darf nicht als vollständig verifizierter Browserscroll-Fix dargestellt werden.

### 14.3l Redaktionelle Eigenstimme, automatisch aus Meta-Teams abgeleitete Partners, rechte Meta-Labels und Liino-YouTube-Guide (16.10.2026)

**Nutzerentscheidung:** Der veröffentlichte Text soll **wie ein eigenständig verfasster Guide** wirken. Fremdzuschreibungen wie „vom Creator eingeordnet“, „vom Creator ausgewählt“, „auf Wunsch des Creators“ sind im **sichtbaren Fließtext UNZULÄSSIG**. Die Assistenz darf den Input redaktionell optimieren und umformulieren, aber nicht aus einer distanzierten Erzählerperspektive darüber berichten, wer diese Empfehlungen ausgesprochen hat. **Interne** Markdown-Kommentare, GitHub-PRs und die ROADMAP selbst dürfen die Creator-Freigabe weiterhin als Quellen-/Prozessnachweis nennen.

**Konkret Liino (öffentliche Texte):**
- Cohesive Traction/F2P: „Cohesive Traction ist die F2P-Option“, ohne „vom Creator eingeordnete“. Die bestätigte Waffenwertung und ihre offizielle ID `97` bleiben bestehen.
- `weapons.generalNotes`-Absatz „Die Einordnung ... stammt vom Creator“ entfernt – sowohl wegen unpassender Erzählperspektive als auch weil Kategorien bereits selbsterklärend sind.
- Build B `evaluation`: direkte Darstellung der Kombination **3× LYNX + Eternal Xiranite Light Armor** statt „Vom Creator als Balanced-Variante ...“.
- Build C `evaluation`: aktive Erklärung des **Will-Fokus** statt „Vom Creator für Maximierung ...“.
- Build D `evaluation`: neutraler Vergleich der zwei AIC-Embers gegenüber Power Bank, ohne „auf Wunsch des Creators“; unveränderte Items `1117/1123/1120/1120`.
- Redundante weitere Teamnotiz Arcane+Estella+Xaihi+Liino mit „vom Creator“ entfernt. **Keine redaktionell bestätigte tatsächliche Gear-, Waffen-, Skill-, Team- oder Datafield-Zahl geändert.**

**Neue verbindliche Partners-Regel für ALLE Operator-Guides:**
- In `Build auf einen Blick > Partners` **automatisch und immer** sämtliche unterschiedlichen Operator-Slugs aus `guide.teams.meta[].members` zusammenführen. **Der Guide-Operator selbst wird ausgeschlossen** (z. B. Liino). Bei mehreren Meta-Teams nur einmal pro Partner, stabile Reihenfolge des ersten Auftretens. **Keine** zusätzlichen Mitglieder aus `guide.teams.more[]` in diese kompakte Liste übernehmen; dafür eine dezente, anklickbare Fußnote „Weitere Partner und Teamkombinationen findest du unter Teams“ (`href="#teams"`).
- Bei Liino ergeben sich exakt **6 einzigartige Partner** aus den zwei bereits genehmigten Meta-Teamzusammenstellungen: **Zhuang Fangyi, Perlica, Arclight, Arcane, Tangtang, Xaihi**. **Snowshine und Estella** bleiben zusätzliche Partner im Teamabschnitt, nicht in der Meta-Kurzliste.
- `src/lib/endfield/metaPartners.mjs` (NEU) dedupliziert Meta-Mitglieder ohne den Guide-Slug. `operatorGuideModel.ts` liefert `profilePartners` mit Klartextnamen über den SKPORT-Katalog (`getImportedOperator`) oder Slug-Formatierung, optional verfügbaren Cover-Assets und Initialen-Fallback. `OperatorOverview.astro` rendert diese Partner statt `[Op]`/unsynchronisiertem `overview.partners`. Wenn noch KEINE echten Meta-Teams hinterlegt wurden, dürfen vorhandene manuelle `overview.partners` als Altbestand-Fallback angezeigt werden; sobald echte Meta-Teams da sind, sind sie die **alleinige Quelle der Partner-Kurzliste**.
- `_template.md` erklärt die Konvention; **keine** separate manuelle Liste für neue Guides pflegen, bei Teamänderungen aktualisiert die Profil-Kurzliste automatisch.

**Meta-Label rechts am Teamtitel:** Das farbige `Meta`-Chip bleibt getrennt vom neutralen Rollen-Chip (`Support` bei Liino). Neu beide direkt nebeneinander in rechter CSS-Gruppe `op-meta-team-labels`, `margin-left:auto`, responsiv in `op-meta-team-heading`. Andere Teamrollen bleiben dynamisch über `roleLabels`. Die beiden Meta-Teamkarten selbst und die eingeklappten weiteren Teamoptionen werden inhaltlich nicht verändert.

**Videoguide:** Vom Nutzer vorgegebener YouTube-Link `https://www.youtube.com/watch?v=F1sx8IuOIK4` wurde unter `guideVideo.url` in `src/content/operator-guides/liino.md` übernommen, Anzeige-Titel `Liino Guide`. Bereits bestehender `OperatorOverview.astro`/Modell-Embed-Weg nutzt **`https://www.youtube-nocookie.com/embed/F1sx8IuOIK4`** mit lazy Iframe und externem YouTube-Link. **Gameplay-Kategorie bleibt `pending: true`**: Der komplette Guide als YouTube-Video ist keine zusätzliche gesonderte Gameplay-/Showcase-Clip-Sammlung. Liinos Guide bleibt deshalb auch weiterhin `status: preview`; weitere Kit-/Video-Inhalte sind noch offen.

**Validierung:** Neuer Test `scripts/endfield/liino-editorial-partners-video.test.mjs`: sechs Meta-Partner und Ausschluss des eigenen Operators, Ausschluss der beiden Zusatzteammitglieder, deterministische Deduplizierung bei Änderungen, lesbare Namen/Footnote und Portrait-Fallback, räumlich gruppierte Meta/Support-Labels, exakte YouTube-URL und intaktes `gameplay.pending`, keine Drittautor-Zuschreibungen in sichtbaren Guidefeldern. Historische Testregeln für Meta-Chip-Anordnung angepasst. `docs/operator-guide-workflow.md` um verbindliche redaktionelle Eigenstimme und Partnerquelle ergänzt.

**GitHub-Abschluss (16.10.2026):** [PR #27](https://github.com/Ag0n1st/ag0n1st.github.io/pull/27) nach erfolgreicher GitHub-Actions-Prüfung **„Validate Astro and operator guides“ #111** per Squash nach **`main`** gemergt, SHA **`a36f126ba24d2880b22e1eea8f9a209e52e118e3`**. Erfolgreich abgeschlossen: locked Dependencies, vollständige Endfield-Node-Tests einschließlich neuer Meta-Partner-/Editorial-Voice-/YouTube-Regression, 100-MB-Budget und Astro-Produktions-Build. Vorherige CI #110 enthielt eine überholte Satzform-Assertion zu „zweiten Ember“, ohne sachlichen Buildfehler; Assertion in CI #111 auf die tatsächliche Doppel-Ember-Aussage angepasst. Die veröffentlichten Guide-Daten sind jetzt im Repository `main`. **Der GitHub-Pages-Deploy wurde nicht separat bestätigt; YouTube-Playback und responsive Partner-Cards sind noch nicht in einem echten Browser abgenommen.** Nach erfolgreichem Endfield-Testlauf, 100-MB-Datenbudget und Astro-Produktions-Build squash auf `main` mergen, PR-/CI-SHA dokumentieren. **Echter Pages-Deploy, YouTube-Einbettung im Browser und Live-Desktop/Mobile-Prüfung** sind durch CI allein nicht nachgewiesen. Bestehende P1-Live-QA für Gameplay-Anker und Build-Finder-LocalStorage weiterhin offen.

### 14.4 Checkliste zur Aktualisierung DIESER Datei

Nach **jedem** zukünftigen Task, unabhängig davon, ob ihn dieselbe oder eine andere KI bearbeitet, prüfen:

- [ ] Datum und Status im Titel-/Übergabeblock anpassen.
- [ ] Erledigte Roadmap-Aufgaben abkreuzen und neue ggf. ergänzen.
- [ ] Neue/entfernte Dateien in der Architektur aufführen.
- [ ] PR-Link, getesteten Merge-Commit und zuletzt geprüften GitHub-Pages-Deploy dokumentieren.
- [ ] Geänderte User-Entscheidungen explizit als neue Vorgabe festhalten (alte Entscheidung nicht wortlos streichen).
- [ ] Neue Datenquellen, Versionsnummer, Konflikte und offene Verifikationsbedarfe aktualisieren.
- [ ] Die **nächste, konkrete und kleinste sinnvolle Aufgabe** benennen.
- [ ] Vor Merge die Datei gegen den tatsächlichen `main`-Code bzw. Branch-Diff gegenlesen.
- [ ] Ein neuer Chat soll von der Roadmap aus arbeiten können, **ohne die vorherigen Chats zu besitzen**.

---


### 14.3m Browser-Abnahme des Liino-Guide-Templates (16.10.2026; PR-/CI-Prüfung ausstehend)

**Ausgangslage:** Die vollständig textuell extrahierte PDF „Bisherige Website Konversation(1).pdf“ umfasst 84 Seiten, 707.601 Zeichen; die jüngsten Entscheidungen (Eigenstimme, Meta-Partner, rechte Labels, YouTube-Guide) stimmen mit ROADMAP §14.3l und PR #27 überein. Original-PDF und Extrakte bleiben ausserhalb des öffentlichen Repositories. Verifizierter Ausgangs-HEAD auf main: 0617cb6a3a74cd41b98fccee8420d3dd5969ad64. PR #27 ist gemergt; historischer Recherche-Draft PR #3 ist der einzige offene PR.

**Befund zur Build- und Repository-Grösse (GitHub-Git-Tree des genannten HEAD):**

| Messgrösse | Gemessener Wert |
| --- | ---: |
| Alle aktuellen getrackten Dateien | 23.728.364 Byte, 1.089 Blob-Dateien |
| Endfield-Dateigruppen gemäss check-budget.mjs | 20.443.931 Byte, 1.048 Dateien |
| Selbst auferlegte Endfield-Grenze | 100.000.000 Byte |
| Verbleibendes Endfield-Budget | 79.556.069 Byte (79,56 %) |
| Grenze GitHub Pages laut Projektvorgabe | 1 GB; aktueller getrackter Arbeitsbaum liegt deutlich darunter |

Die 100-MB-Zählung enthält die gleichen Verzeichnisse/Einzeldateien wie scripts/endfield/check-budget.mjs. Diese Werte betreffen den aktuellen *Git-Arbeitsbaum*, nicht die Git-Historie, node_modules oder die separat zu prüfende Grösse des ausgelieferten Astro-dist-/Pages-Artefakts.

**Neue technische QA-Arbeit im Branch qa-liino-browser-smoke-20261016:**

1. scripts/endfield/browser-smoke.py: Playwright-/Chromium-Browser-Smoketest für *wirklich gebaute* Astro-Seiten, lokal per HTTP ausgeliefert; 1.440 px Desktop und 390 px Mobil. Ausschliesslich Text-/Fehlermeldungsausgabe, keine Screenshots/Grafiken/Videos.
2. .github/workflows/validate-astro.yml: bestehenden Node-Test, 100-MB-Gate und Astro-Build um tatsächliche Chromium-Prüfung ergänzen. Playwright/Browser werden nur im CI-Runner vorübergehend installiert (keine neuen Repo-Assets); Ubuntu 24.04 gegen anstehenden Wechsel von ubuntu-latest fixiert.
**Zusätzliche verbindliche 1-GB-Pages-Grenze:** Neues Script scripts/check-pages-budget.mjs vermisst nach npm run build rekursiv alle Dateien unter dist/ (dezimal 1.000.000.000 Byte). Sowohl .github/workflows/validate-astro.yml als auch .github/workflows/deploy.yml prüfen dieses Limit nach dem Build und vor dem Pages-Artefakt-Upload. Eine belastbare absolute dist-Grösse ergibt erst der GitHub-CI-Log; sie ist **nicht** aus dem Git-Tree-Wert von 23.728.364 Byte ableitbar. Check zählt aktuelle dist-Dateien, nicht Git-Historie oder Infrastruktur-Overhead.

3. E2E-Prüfpunkte: Liino- und Typhoeus-Route; kein horizontaler Seitenüberlauf; sechs eindeutige, automatisch ermittelte Meta-Partner; Liino-YouTube-Nocookie-URL ohne Autoplay; drei Meta-Builds und zwei Meta-Team-Labelgruppen; Build-Link öffnet/selektiert den Finder; Minimal-/Maximal-Vorauswahl, Blaupausen-Opt-in, Reload und Operator-Wechsel; Authority max. 60; Gameplay-TOC.
4. **Keine Änderungen** an Waffen, Builds A–F, offiziellen SKPORT-Daten, Teams, Ratings, Datafield-Prozenten oder redaktionellen Guide-Texten.

**CI-Verlauf / Debug:** PR #28, erster Validierungslauf #112: bestehende Endfield-Tests, 100-MB-Gate, Astro-Build sowie Python-/Chromium-Installation **erfolgreich**. Browser-Smoke zuerst **fehlgeschlagen**, da Playwrights `locator.wait_for()` standardmäßig Sichtbarkeit verlangt, während `#op-level` absichtlich im anfangs geschlossenen Build-Finder liegt. Dies ist eine *Testannahme*, kein nachgewiesener Fehler der Website. QA-Script auf `wait_for(state="attached")` an beiden Stellen korrigiert; Folge-CI noch abzuwarten. Änderungen am UI oder redaktionellen Guide sind hierfür nicht erforderlich.

**Erfolgreiche technische QA-Abnahme:** [GitHub Actions #117](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38866232225) auf dem Feature-Branch komplett **success**.
109/109 Node-Endfield-Tests bestanden, Astro-Build erfolgreich, 100-MB-Endfield-Gate und neues 1-GB-Pages-dist-Gate bestanden.
Echte Chromium-Browser-Smoke-QA bei **1.440 px und 390 px** erfolgreich: Liino/Typhoeus-Routen, Partner/Meta-Labels, Video-Embed-URL, Meta-Build-Links, Max/Min-Profile, lokale Speicherung/Re-Load/Operator-Wechsel, Autoritätslevel max. 60, Gameplay-TOC und keine horizontale Überbreite.
Exakte CI-Messung: Endfield **20.451.384 Byte / 100.000.000 Byte**, Rest **79.548.616 Byte**, 1.049 Dateien. Gebautes Astro-dist für Pages **17.104.472 Byte / 1.000.000.000 Byte**, Rest **982.895.528 Byte**, 970 Dateien.
Der vorherige Main-Git-Tree enthielt 20.443.931 Endfield-Bytes; die neue Browser-Datei erhöht das Endfield-Budget genau um 7.453 Byte. Git-Historie und Pages-Overhead gehören nicht zur Arbeitsbaum-/dist-Messung.
**Grenzen:** externe YouTube-Wiedergabe und echtes produktives Pages-Deployment wurden nicht geprüft. Nach diesem Dokumentations-Commit finalen CI-Lauf erneut prüfen, dann PR #28 mergen und Deploy-Status nachtragen.

**Abschluss und Merge:** [PR #28](https://github.com/Ag0n1st/ag0n1st.github.io/pull/28) nach **vollständig grüner CI #118** (GitHub Actions Run 38866443001) per Squash auf main gemergt:
Commit **81501f580a95cc3a86354982e1049ca468a3bc85**. Die Chromium-Regressionstests laufen bei zukünftigen PRs; der 1-GB-dist-Budgetcheck zusätzlich beim regulären main-Pages-Deployment.
Alle 109 Endfield-Unit-Tests und die beiden Budgetchecks erfolgreich. Desktop 1440 px / Mobile 390 px bestätigen die in §14.3m aufgelisteten Interaktionen.
**Deployment-Abnahme:** Nach dem PR-#28-Merge war [Pages-Workflow #262](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38866584261) erfolgreich (Merge-SHA 81501f5). Nach dem ausführlichen Roadmap-Nachtrag ist auch [Pages-Workflow #263](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38866678915) zum main-Commit 21f0502a379f501a1e094c95e7f361d2db2381a7 vollständig **success** (Build, beide Budgets, Artefakt-Upload und Deploy-Job). **Weiterhin offen:** tatsächliche externe YouTube-Wiedergabe und fehlende redaktionelle Operator-Kit-/Gameplay-Inhalte. Ein weiterer reiner Roadmap-Commit wird erneut einen Pages-Run auslösen; dessen Erfolg immer separat auf GitHub prüfen.

**Prüfstatus bei Anlegen dieses Abschnitts:** Branch/Dateien vorbereitet; PR-Nummer, GitHub-CI-Resultat, Merge-Commit und Pages-Deploy **noch nicht bestätigt**. Erst nach tatsächlichem Durchlauf eintragen, Tests bei Fehlschlag korrigieren. CI im echten Browser des PR testet die lokale gebaute Version, nicht externe YouTube-Wiedergabe oder die Live-Domain. Die reale Video-Wiedergabe, mobil-spezifische manuelle Bewertung, die Liino-Kit-Redaktion und noch fehlende Gameplay-Einzelclips bleiben separate Abnahmepunkte.

**Nächste Entscheidung:** QA-PR nach erfolgreichem Lauf freigeben/mergen, danach die offenen echten Inhaltsarbeiten am Liino-Guide auf Basis eigener Angaben/Freigaben priorisieren. Keine ungeprüften Meta- oder Prozentangaben hinzufügen. Für alle Folgechats gilt: nur Text, jede Änderung in der Roadmap, Endfield maximal 100 MB und Pages-Gesamtziel 1 GB.

---


### 14.3n Liino-Operator-Kit: quellengestützter Freigabeentwurf (16.10.2026)

**Beschluss aus dem Folgechat:** Nach der abgeschlossenen Browser-QA von PR #28 wird **zuerst Liinos noch leere Operator-Kit-Redaktion zur Freigabe vorbereitet**. Es handelt sich ausdrücklich noch **nicht** um eine Zustimmung zu den konkreten Texten. Ziel ist, den zuletzt dokumentierten Übergabepunkt fortzusetzen und alle redaktionellen Änderungen kontrolliert auszuführen.

**Repository-Stand bei Beginn:** main-HEAD `eeb7915cf4f8e2b3d6108d692b7ef22487c521a5`, PR #28 bereits gemergt; Chromium-/Endfield- und 100-MB-/1-GB-Gates verfügbar.

**Neue Dokumentation:** [`docs/liino-operator-kit-review-20261016.md`](docs/liino-operator-kit-review-20261016.md) auf Feature-Branch `content-liino-operator-kit-review-20261016`. Enthält:
1. **Drei copy-ready YAML-Textfelder:** `operatorKit.playstyle`, `operatorKit.progressionNotes`, `operatorKit.resourceNotes` – in direkt verwendbarer redaktioneller Eigenstimme, aber **noch nicht vom Betreiber freigegeben**.
2. **Präzise SKPORT-Quellenkontrolle** aus dem unveränderten offiziellen Import `liino.json` und `liino.extra.json` (Snapshot 15.10.2026) sowie der vorhandenen deutschen Lokalisation: Vocalist 25 FP/60 s/ANG +10 % auf BS M3; Combo-Auslöser auf Arts-Reaktionen, 20 Ultimate-Energie; Talent-FP 5/10 erst bei Folgekampffertigkeit im 30-s-Fenster und abhängig von Talentstufe; Ultimate 160 Energie/15 s/Will-Amp, vorzeitiges Ende ohne Abschlussimpuls; Aufstiege E1–E4 mit Levelcaps und getrennten Ausrüstungsqualitäten; Stalwart-Vertrauensvoraussetzungen 20/50/100 %.
3. **Abgrenzungen:** Ultimate-Timing-Tipp ist redaktionelle Empfehlung zur Bestätigung, keine Spieldatenbehauptung; weder garantierte zweite Ultimate noch frei erfundene Farmrouten oder aktuelle Rekrutierungszeiten. Attribute, Skilltabellen, Materialkosten und Gameplay-Clips nicht dupliziert.

**Keine produktive Content-Änderung:** `src/content/operator-guides/liino.md` bleibt mit drei leeren `operatorKit`-Feldern und `status: preview`; alle sechs bestätigten Gear-Builds, zwei Meta-Teams, Waffen-/Datafield-Werte, Skill-Priorität, Eigenstimmenregeln und Gameplay-`pending` bleiben unverändert.

**Freigabefragen:** (F1) Spielweise und Timing-Erklärung, (F2) Ausführlichkeit der Progressionsnotiz, (F3) Soll die Datenlücke zu Farmorten/Rekrutierungszeiten sichtbar sein oder nur intern dokumentiert werden?

**PR-/CI-/Merge-Abschluss:** [PR #29](https://github.com/Ag0n1st/ag0n1st.github.io/pull/29) nach erfolgreicher [GitHub Actions CI #119](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38868259456) per Squash in `main` übernommen, Commit `48174a96eda620e7b28a84de225627cccc2f5d8c`. 109/109 Endfield-Unit-Tests erfolgreich, Astro-Build erfolgreich, Chromium-Desktop/Mobil erfolgreich; exakte CI-Budgets: Endfield **20.451.384 Byte / 100.000.000 Byte** (20,45 %, 1.049 Dateien), ausgeliefertes `dist/` **17.104.472 Byte / 1.000.000.000 Byte** (1,71 %, 970 Dateien). **Nur interne Markdown-Dokumentation/ROADMAP**, kein öffentlicher Operator-Kit-Text geändert, `liino.md` bleibt `preview` mit drei leeren `operatorKit`-Feldern. Der Nutzer muss die Entwurfstexte noch freigeben; Merge dieser Dokumentation ist keine inhaltliche Zustimmung. Pages-Deploy dieses Merges und des nachfolgenden Roadmap-Nachtrags getrennt auf GitHub prüfen.

**Pages-Deploy nach PR #29:** Der erste Deployment-Run #265 wurde wegen der unmittelbar nachfolgenden Roadmap-Aktualisierung vom Pages-Concurrency-Mechanismus planmäßig **abgebrochen**, nicht wegen eines Build- oder Testfehlers. Der aktuelle [Pages-Run #266](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38868418304) für `main`-Commit `8a79d6d93972fd37406e8fc99dae7f5939ca16b1` ist dagegen **vollständig erfolgreich** (Build, Endfield-100-MB-Gate, Pages-dist-1-GB-Gate, Pages-Upload, Deploy-Job). Der reine Dokumentationsnachtrag wird erneut ein Pages-Deployment auslösen; vor weiteren Features dessen Ergebnis prüfen.

**Technische Qualitätssicherung bei PR:** Endfield-Tests, Endfield-100-MB-Gate, Astro-Build, Pages-dist-1-GB-Gate und realer Chromium-Smoketest müssen grün bleiben. Als letzter bestätigter Stand vor dieser rein dokumentarischen Änderung: 20.451.384 Endfield-Byte / 100.000.000 und 17.104.472 dist-Byte / 1.000.000.000. Bei neuem CI die tatsächlichen Werte übernehmen; Git-History wird von diesen Messungen nicht erfasst.

**Danach:** Zuerst den Nutzer um Freigabe/Korrektur bitten. Nur akzeptierte Textteile per neuem Änderungs-PR nach `liino.md` übertragen und die Roadmap bei CI, Merge, Pages-Deploy und anschließenden offenen Gameplay-Clips aktualisieren.

---


### 14.3o Liino-Kit-Freigabe, kompakte Übersicht und lokale P1/P3/P5-Snapshots (16.10.2026)

**Neuer ausdrücklicher Redaktionsbeschluss des Nutzers:**
1. **F1 vollständig freigegeben:** Der bereits geprüfte Fließtext zu Liinos Vocalist-/Cosmovoice-Stance, 25 FP, 20 Ultimate-Energie, Talent-FP 10 nach passender Folgekampffertigkeit, Ultimate 160 Energie/15 Sekunden und Timing-Hinweis wird aus `docs/liino-operator-kit-review-20261016.md` direkt unter `operatorKit.playstyle` in `src/content/operator-guides/liino.md` übernommen. **Keine** Änderung der übrigen eigenen Guide-Empfehlungen, Datafield-Vergleiche, Meta-Teams, Potenziale oder A–F-Builds.
2. **F2 explizit verworfen:** Die beiden weiterhin wichtigen, **standardmäßig geschlossenen** offiziellen Tabellen zu Attributentwicklung sowie Aufstieg/Freischaltungen reichen aus. Separates Textfeld `operatorKit.progressionNotes` aus Schema, Template und Komponente entfernt.
3. **F3 als GANZER TEMPLATE-PUNKT entfernt:** `Ressourcen & Verfügbarkeit` ist weder als neue Sektion noch als UI-Card nötig, da der tatsächliche Ressourcen-/Besitz-/Blaupausen-/Gebietscheck vollständig im etablierten `Ausrüstung > Build-Finder` stattfindet. Feld `operatorKit.resourceNotes` aus Schema/Template, den öffentlichem Layout und Liino entfernt. Exakter verbleibender Redaktions-Kitwert: `playstyle`.
4. **Operator-Profil-Video:** Das 16:9-YouTube-Iframe bleibt unverzerrt und unverändert datenschutzfreundlich, aber die Video-Card wächst nicht länger künstlich auf die gesamte Profilhöhe; `op-profile-grid` `align-items:start`. Andere Cards benutzen unabhängige Inhaltsgrößen.
5. **Build auf einen Blick:** Die vier schon freigegebenen Waffeneinträge werden **als vier separate kleine Karten** in einem eigenen responsiven CSS-Grid dargestellt, je mit Kategorie/Icon/Name. Ausrüstung + Skill-Priorität als zwei nebeneinanderliegende, **nicht auf gleiche Höhe gestreckte** Cards, der Partners-Block als eigenständige Card mit automatisch abgeleiteten Meta-Partnern; Layout von 4 auf 2 Waffenspalten bei schmalem Fenster. Die Anzahl ist dynamisch für andere Operatoren; keine neuen Empfehlungen.
6. **Einordnung:** Der alte Name `Spielschwierigkeit` wurde durch das positive Label `Einsteigerfreundlichkeit` ersetzt: leicht spielbar = **5 gefüllte Balken**. Zur Vermeidung von Datenmigration bleibt `difficulty` in der Content-Datei und im Schema semantisch bei 1 = leicht / 5 = schwer; `operatorGuideModel.ts` berechnet exklusiv für das UI `beginnerFriendliness = 6 - difficulty`. Liinos bestehender Rohwert `difficulty: 1` zeigt damit 5/5 Balken. Flexibilität und Zugänglichkeit unverändert.
7. **Echte Potenzialbilder:** Vorher fehlten Assets vollständig, im offiziellen importierten `liino.extra.json` stehen nur die Effekte und Galerie-Texte, keine Bilddateien. Die drei zugeordneten `Snapshot Liino 1/3/5.png` sind in der **Endfield-Talos-Wiki-Galerie** zum selben Operator nachweisbar. Einmalige Github-Actions-Beschaffung über `scripts/endfield/import-liino-potentials.mjs` aus `https://endfield.wiki.gg/wiki/Special:Redirect/file/Snapshot_Liino_{1,3,5}.png`, mit strengem Herkunfts-/Mime-/Dateigrößen-/Auflösungscheck und `sharp`-WebP-Konvertierung (960×540, Qualität 70). Die einmalige Workflow-Datei wurde **nach Erfolg wieder gelöscht**, keine automatische externe Bildbeschaffung bei Website-Builds oder Seitenaufruf.
   - Nachgewiesene exakte Größen durch GitHub-Workflow [Import #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38870490689): P1 **64.600 Byte** aus PNG 2.353.566 Byte; P3 **67.890 Byte** aus PNG 1.854.548 Byte; P5 **63.216 Byte** aus PNG 2.009.536 Byte. **3 WebPs zusammen 195.706 Byte**, im Gegensatz zu 6.217.650 Originalbytes; Reduktion um ca. **96,85 %**. JPEG/GIF/Video nicht importiert. UI nutzt die lokal gespeicherten echten Bilddateien via `getOperatorImageUrl` und zeigt in den P1/P3/P5-Karten jeweils einen Quellenhinweis zur Wiki-Galerie.
   - Neue Assets im Repo: `public/images/endfield/operators/liino/potentials/potential-1.webp`, `potential-3.webp`, `potential-5.webp`. Pfadkonvention lässt spätere Operatoren durch eigene Dateien ergänzen; die UI setzt die Bilder **nicht** bei den anderen Potenzialen oder fehlenden Assets voraus. Pro zukünftigen Operator höchstens drei derartigen Bildern bei dieser Detailansicht ausrollen, ggf. Auflösungen/Qualität budgetgerecht weiter reduzieren, kein globaler Bulkdownload.
8. **QA erweitert:** Der schon vorhandene echte Browser-Smoke-Test wird um Text/Template-Bereinigung, Videocard-Höhe, Skill-/Gear-Grid-Stretch, 4 eigenständige Waffenkarten, Liino 5/5 positive Skala und vollständig geladene WebP-Snapshots (P1/P3/P5) ergänzt. Zwecks `loading="lazy"` müssen die verdeckten P3-/P5-Karten zuerst geöffnet werden. Verknüpfte Partner-/Meta-/Build-/Reload-Browserprüfung bleibt weiterhin bestehen.

**Quellenstand:** Quellenbeleg für Skillmechaniken weiterhin offizielle lokale SKPORT-Snapshots vom 15.10.2026, Operator 1041. Bilder der P-Snapshots stammen **explizit aus Endfield-Talos-Wiki**, nicht aus den SKPORT-Spielwert-JSON. Keine dritte redaktionelle Potenzialempfehlung daraus ableiten.

**Budget bei erfolgreichem Einmalimport** (Workflow während des Feature-Branches): Endfield **20.653.243 Byte / 100.000.000 Byte** (20,65 %, 1.053 Dateien), verbleiben **79.346.757 Byte**; inklusive der sieben dateibasierten Code-/Template-Anpassungen und drei WebPs, die Image-Importer-Datei mitzählt. Deploybares gesamtes Pages-`dist` wird erst im folgenden PR-CI-Build berechnet (HARD-Gate 1.000.000.000 Byte). Die Summe 195.706 Byte ist nur der Anteil der drei importierten WebPs, **nicht** das aktuelle Gesamtbudget. Künftige Bilder möglichst ebenso klein halten.

**PR-/CI-/Merge-Abschluss (16.10.2026):** [PR #30](https://github.com/Ag0n1st/ag0n1st.github.io/pull/30) ist nach vollständig grüner [CI #120](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38870980336) per Squash nach `main` gemergt; Merge-Commit **`b0f0e587cfe42a63f5a8553ccfbb0541a406e0e2`**. Alle **109/109 Node-Endfield-Tests** bestanden, Astro-Build bestanden, beide Budget-Hard-Gates bestanden, Chromium-Browserprüfung bei **1440px und 390px** inklusive Profil-Video-Natural-Height, vier separate Quick-Weapon-Cards, Gear-/Skill-Flex, 5/5 Liino-Einsteigerfreundlichkeit, ohne Ressourcen-Abschnitt und lokal gerenderten WebPs **P1/P3/P5** grün. Auch alte Max-/Min-Profile, Blaupausen-Persistenz, Meta-Team-Labels, Partner, Build-Finder und Gameplay-Anker erfolgreich. **Exakte PR-CI-Budgets:** Endfield `20.656.493 / 100.000.000 Byte` (**20,66 %**, 1.053 Dateien, **79.343.507 Byte Rest**); deploybares Gesamt-`dist/` `17.303.780 / 1.000.000.000 Byte` (**1,73 %**, 973 Dateien, **982.696.220 Byte Rest**). Quelle für Bildgrößen: einmaliger Import-Workflow #1; für aktuelle Budgets CI #120. Github-Pages-Deployment des main-Merges und des Roadmap-Nachtrags separat prüfen und dokumentieren.

**Pages-Live-Deployment zu PR #30 erfolgreich:** Nach Squash-Merge wurde der erste Workflow #268 durch den unmittelbar folgenden reinen Roadmap-Push überholt. Der aktuelle [Pages-Workflow #269](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38871176967) auf `main`-SHA `7bbf95e4d6fc4553c4a785b67cb83ca1e77a8049` hat **beide Jobs `build` und `deploy` erfolgreich** abgeschlossen. Die Build-Steps verifizieren erneut den SKPORT-Parser, Endfield-100-MB-Budgetcheck, Astro-Build, Pages-dist-1-GB-Budgetcheck und den Artefakt-Upload. Der nachfolgende rein dokumentarische Roadmap-Commit startet selbst einen neuen Pages-Run; dessen Erfolg anschließend separat prüfen.

**Handoff / Abnahme:** PR-Nummer, Endfield-Tests, Astro-Build, beide Budget-Gates, Chromium 1440/390 und der folgende GitHub Pages Deploy nach dem Merge prüfen und unten dokumentieren. `liino.md` bleibt bewusst `status: preview`, das Gameplay bleibt `pending: true`; keine erfundenen Rotationen/Videoclips. Jede technische Änderung in dieser Roadmap fortschreiben.

---


### 14.3p Liino-Finish: eine gemeinsame Waffen-Card + vollständige SKPORT-Waffendetails (16.10.2026)

**Auftrag/Entscheidung des Nutzers:** Bei `Build auf einen Blick` sollen **alle vier Waffen in einer einzigen gemeinsamen Card** erscheinen, analog zu `Partners`. Unter `Waffen > Waffendetails` müssen die rohen Wiki-Platzhalter und unbündigen Tabellen verschwinden. Offizielle Tuning-Materialien sollen **mit denselben lokalen Item-Icons und Mengen wie andere Guide-Materialtabellen** gezeigt werden. Alle übrigen durch PR #30 freigegebenen Funktionen und Texte unverändert lassen. Danach nur bei erfolgreicher Abnahme zum nächsten Operator wechseln.

**Ausgangsstand:** `main`-HEAD `e5e592d99a485dca5e5444221b6c98aaea1e24a3`, PR #30 + CI #120 vollständig erfolgreich, zuletzt Pages #270 erfolgreich. Feature-Branch `fix-operator-weapons-overview-details-20261016`.

**Technische Ursachenprüfung:**
- Vier kleine `op-quick-weapon-card`-Cards waren innerhalb eines zusätzlichen Grids einzeln umrandet. Der Nutzer möchte **eine Umrandung um die ganze Waffengruppe**, innen nur vier Icon-/Kategorie-/Namenseinträge.
- `OperatorWeapons.astro` verwendete die rohen `Attribute Preview`-Tabellenspalten direkt, einschließlich mehrfach leerer Headings. In den `Tuning`-Tabellen standen ursprüngliche Materialsyntax `[item:122 x5][item:145 x3][item:642 x2200]` und getrennte Quellen-Spalten ohne klare Labels. Der offizielle SKPORT-Importer speichert die gleichen Materialien bereits als **`row.costs[{id,count}]`**, bisher wurde diese Information in `Waffendetails` ignoriert.
- **Quellenbeleg mit tatsächlicher lokaler GitHub-Actions-Diagnose:** Ein **temporärer rein lesender Workflow**, nach erfolgreichem Auslesen vollständig aus dem Feature-Branch gelöscht, überprüfte `src/data/endfield/catalog/equipment-details.json` am 16.10.2026 direkt für Liinos vier bestehenden Waffen-IDs: `1046` (Bedazzling Night Debut), `1044` (Golden Age), `75` (JET), `97` (Cohesive Traction). Alle vier `status: verified`, jeweils eine `Attribute Preview`-Tabelle mit 4 Zeilen, **sechs** `Tuning`-Abschnitte einschließlich Anfang/Ende, offizielle Matrizen für `Skill Details & Essence` und `Potential Phases`. Material-IDs und Mengen liegen bei den mittleren vier Tuning-Abschnitten als `row.costs` vor, nicht als manuell zu parsende Displaystrings. Diagnose: GitHub Actions **Inspect local official weapon detail table schema #1**, Ref des Auslese-Commits `8fbe7637062305fc6fc1c52dd594a3fa002d1aca`; exakte Diagnoselogs bei Workflow abrufbar. **Kein neues Web-/SKPORT-Scraping**, keine offiziellen Daten verändert.

**Implementierung (gemeinsames Astro-Framework, gilt für alle Operatoren):**
1. `OperatorOverview.astro`: eine einzelne `<article class="op-cardlet op-quick-weapons-card">` enthält alle bisherigen `shownWeapons` als einfache unberandete `.op-quick-weapon-item`. Auf Desktop vier Positionen, mobil responsiv zwei Spalten. Icon, Waffenkategorie und Name bleiben, Empfehlungen und ihre Reihenfolge unverändert. Partners, Ausrüstung und Skills weiterhin eigene Cards.
2. `OperatorWeapons.astro`: Statt der rohen `Attribute Preview` mit 5 inkohärent betitelten Spalten jetzt eine dreispaltige, nachprüfbare **Attribut / Startwert / Maximalwert**-Tabelle; der lange originale Waffeneffekt separat als zwei lesbare Originalblöcke (Start-/Max-Wirkung). Keine Zahlen errechnet oder verändert. Waffenberatung weiterhin die vorhandene Redaktion.
3. **Tuning-Stufen 0–5:** Die **sechs offiziellen Tababschnitte** werden in einer semantischen Tabelle mit Überschriften **Stufe / Basis-ANG / erstes Attribut / zweites Attribut / Materialien** dargestellt. Ursprüngliche `before/after`-Werte und Quelle-Rangangaben bleiben als Text nachvollziehbar. Die Hauptfunktion `MaterialCosts.astro` rendert die existierenden `row.costs` über den lokalen, ID-geprüften WebP-Katalog als **Icon + Menge**; bei Stufen ohne Kosten erscheint neutral „–“. Die rohen `[item:…]`-Zeichenfolgen werden vollständig unterdrückt. Materialmengen nicht aus Parsertext rekonstruieren, sondern aus offizieller Importstruktur.
4. **Waffenrang und Waffenpotenziale** weiter vollständig im inneren aufklappbaren Detailabschnitt, aber mit normalisierten ersten Spalten, festem responsivem Layout, lesbarer multiline-Effektspalte und intern scrollbar auf schmalen Bildschirmen. Die Quellenangabe SKPORT mit Snapshot-Datum bleibt. Unverifizierte Einträge zeigen neutrale Datenschranke statt eckiger Platzhalter, keine erdachten Werte.
5. `operator-guides.css` gestaltet die neue gemeinsame Card, dreispaltige Preview, zweispaltige Waffeneffekte, zusammengefasste Tuning-Tabelle und breite Rank-Matrizen. Die vorhandene dynamische Waffen-Auswahllogik bleibt dieselbe, alle vier Waffeneinträge nutzbar. Das absichtliche lokale Horizontal-Scrolling einzelner großer Datentabellen darf **nicht** zu globalem Seitenoverflow werden.
6. `scripts/endfield/browser-smoke.py`: Testet bei **1440 px und 390 px** genau eine Waffen-Card in der Übersicht mit vier unberandeten Waffen, bei allen vier Waffen sichtbare Auswahl, genau drei normalisierte Attributzeilen, komplette Tuning-Tabelle, mindestens drei echte Material-Icons, geladenes erstes Bild und keine Roh-Platzhalter. Bestehende Tests (Meta-Partner, Builds, Presets, Gameplay, P1/3/5, Video, Rating) bleiben.

**Wichtige Grenzen:** `src/content/operator-guides/liino.md`, seine A–F-Ausrüstungs-Builds, Waffen-/Teams-/Datafield-/Potenzial-Empfehlungen, `status: preview` und Gameplay-`pending` **nicht ändern**. Der vorhandene 100-MB-Endfield-Budgetcheck und der 1-GB-Pages-`dist`-Budgetcheck gelten weiter. Keine neuen Bilder oder zusätzliche Pakete für dieses Feature. Der Diagnose-Workflow war nur kurzfristig vorhanden und wurde direkt nach Datenauswertung entfernt.

**Abgeschlossen / echte Prüfung (16.10.2026):** [PR #31](https://github.com/Ag0n1st/ag0n1st.github.io/pull/31) wurde nach vollständig grüner [CI #121](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38873401472) per Squash in `main` gemergt, Merge-Commit **`07c69cfce91d5a7f666d53cfae91c5483b02219b`**. **109/109 Endfield-Unit-Tests** bestanden, Astro-Build grün, 100-MB-Endfield-Gate grün, 1-GB-Gesamt-Pages-Gate grün. Chromium-Smoke bei **1440px und 390px** vollständig grün: eine gemeinsame Waffen-Card mit allen vier Liino-Einträgen, bei **allen vier** offiziellen Waffen Auswahltab funktionsfähig, 3 sauber beschriftete Attributzeilen, 6 Tuning-Stufen, Material-IDs gerendert als lokale WebP-Icons inklusive Mengen und wenigstens ein erfolgreich geladenes Materialbild je Waffe, keine `[item:...]`-, `[Icon]`- oder Bewertungsplatzhalter; kein Seitenoverflow. Die bisherigen Layout-, Video-, Potenzialbild-, Partner-, Meta-Team-, Build-Finder-, LocalStorage-/Gameplay-Tests laufen weiterhin erfolgreich. **Exakte CI-Werte:** Endfield `20.665.695 / 100.000.000 Byte` (**20,67 %**, 1.053 Dateien, Rest `79.334.305 Byte`), ausgeliefertes Pages-`dist/` `17.317.679 / 1.000.000.000 Byte` (**1,73 %**, 973 Dateien, Rest `982.682.321 Byte`). Keine neuen Bilder, keine neuen Abhängigkeiten, keine Änderungen an `liino.md`.

**Deployment bestätigt:** [GitHub Pages Run #271](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38873606020) auf Merge-SHA `07c69cfce91d5a7f666d53cfae91c5483b02219b` ist vollständig **success**: `build`-Job inkl. beide Budget-Hard-Gates, Astro und Upload sowie `deploy`-Job jeweils erfolgreich. Der folgende ausschließlich dokumentarische ROADMAP-Commit löst technisch ein neues Pages-Deployment aus; dieses wird abschließend separat kontrolliert. Redaktioneller nächster Schritt: Nutzer die visuelle Abnahme der konkreten Liino-Waffenansicht anbieten; nur nach dessen Zustimmung den nächsten Operator angehen.

**Abnahme/Übergabe:** Nach PR-Anlage CI-Run samt 109+ Unit-Tests, Astro-Build, 100-MB-Endfield- und 1-GB-Gesamtbudget und erweiterter Chromium-QA prüfen, bei Fehlern korrigieren, danach PR mergen und Pages-Live-Deploy verifizieren. Konkrete PR-/CI-/Merge-SHAs und Größen im weiteren Verlauf dieses Abschnitts nachtragen. Erst dann dem Nutzer die Änderungen zur visuellen/inhaltlichen Abnahme anbieten; **nächster Operator erst nach Rückmeldung**, nicht automatisch eröffnen.

---


### 14.3q Typhoeus – kompletter Guide mit eigenem 29:01-Video, Team-Gear und WebP-Assets (16.10.2026)

**Auftrag:** Nachdem Liinos letzter Waffen-Feinschliff aus PR #31 in GitHub Pages #272 erfolgreich live war, verlangt der Nutzer als nächsten Charakter **Typhoeus**. Er liefert das vollständige **16-seitige PDF `AKEF Typhi Skript.pdf`** und die URL seines persönlichen Mobalytics-Guides. **Vorab-Freigabe für die vollständige Ausarbeitung ausdrücklich erteilt**, danach sind redaktionelle Korrekturen möglich. Ziel ist wie bei Liino **jeder einzelne Guide-Template-Abschnitt** mit Quellenprüfung, verifizierten Item-IDs, vollständigem Gear-Finder, echten Bildern und echten eigenen Videos, ohne 100-MB-/1-GB-Budgets zu überschreiten.

**Ausgangsstand:** `main` bei Branch-Gründung `379aa895a45ef0b3b00e59c6783eeed14f1acc54`; Feature-Branch `feature-typhoeus-complete-guide-20261016`. Die bisherige `typhoeus.md` war ein inhaltsloser Vorschau-Prototyp mit Standard-Demo-Platzhaltern, obwohl offizielles `typhoeus.json`, `typhoeus.extra.json` und `de/typhoeus.json` bereits im Repository lagen. Offizielle Datenstruktur entspricht Operator-ID **1173**, SKPORT-Snapshot mit deutscher Redaktion seit 12.10.2026. Unter `public/images/endfield/operators/typhoeus/` waren Cover, Illustration und alle vier Fertigkeiten bereits optimiert als WebP vorhanden.

**Quellenhierarchie:**
1. **Eigene Redaktion:** Das vom Nutzer angehängte 16-Seiten-Skript (öffentlich nicht hochladen) ist Grundlage für Typhis Rolle als Natur-Main-DPS, den Jagdpfeil-/Zeichen-/Nature-Burst-Loop, Skills **Battle > Combo > Ultimate > Basic** (im originalen Video-Overlay), Deep-Rampart-Standard mit LYNX Slab, mögliche Doppel-Comms- und UE-Situationsvariante, starke P1/P5-Einordnung, Arcane/Fluorite als Stack-Lieferanten, Arcane-Will-Ziel **≥640** aus dem Skript, Ardelia/Perlica+Liino-Reaktionssynergie, Trial/Echos/Nefarith-Gameplay inkl. Dodge Cancels und finale vorsichtige Pull-Empfehlung. Die zeitgebundene September-Aussage über den kommenden Si-Release nicht als weiterhin zukünftige Behauptung ausgeben.
2. **Persönlicher Mobalytics-Guidelink des Nutzers:** `https://mobalytics.gg/arknights-endfield/profile/ag0n1st-aodh5g/characters/197f5164-a4a3-4870-9450-37497ae0a819`. Direkte Webansicht gesperrt; öffentliche/anonyme Github-Actions-Abfrage ebenfalls **403** ([Research Audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875402723)). **Inhalt nicht gelesen**, nicht behaupten! Separate Quellenabgleichrunde bei später exportiertem Text möglich. Allg. Mobalytics-Typhoeus-Artikel anderer Autoren sind nur Gegenprüfung, keine Wiedergabe des persönlichen Guides.
3. **Zahlen/Spieldaten:** Official SKPORT-Wiki-Operator 1173, offizielle Waffen- und Ausrüstungsdaten in `items.json`/`equipment-details.json` für Texte/Zahlen/Talente/Potenziale/Material-/Icons. [SKPORT-Faktenprüfung #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875402723) bestätigt Skillwerte 100-FP-Battle / 12 Ultimate pro Stack / 19-s-Combo auf M3 / 200 Ultimate, 4 Jagdpfeile/8 Zeichen und entsprechendes Talent. Vorhandene offizielle Übersetzungen weiterverwenden.
4. **Unabhängige Quellen:** Typhoeus Talos Wiki, Prydwen, Icy Veins, allg. Mobalytics-Guide (anderer Autor), Datafield.cc Team-Hub, Datafield-Teamkontext gespiegelt bei arknightsendfield.gg, Endfield Hub. **Datafield character-profile** liefert im verfügbaren JS-gesteuerten Abruf **keine direkt verifizierbare Waffen-Szenarienmatrix mit vollständiger Baseline** und keine eindeutig als vorherige-Potenzial-Stufe gelesenen inkrementellen Prozente. Daher werden in `weapons.comparisons[]` **keine fremden Solo- oder Team-Hub-Prozente als Datafield-Charakterprofilwerte ausgegeben** und `potentials.entries[].increaseOverPreviousPercent` bewusst nicht erfunden. Official P-Effekte und eigene Einordnungen trotzdem vollständig.
5. Ausführliche Provenienz **[`docs/typhoeus-source-audit-20261016.md`](docs/typhoeus-source-audit-20261016.md)**.

**Vollständige Content-Umsetzung in `src/content/operator-guides/typhoeus.md`:**
- Status `published`, Datum 16.10.2026, offizielles Video `https://www.youtube.com/watch?v=wNVJkGzkfMg` (**Ag0n1st, 1741 Sekunden/29:01**, [eigenes Public Metadata Audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875911263)).
- Übersicht (Kernrolle, Traits, 4 Stärken/Schwächen, Einsteigerfreundlichkeit aus `difficulty:4`, Flexibilität, aus überprüften Meta-Builds automatisch bestimmte Zugänglichkeit, featured Build), Operator Kit (ausführlich), aktive Fertigkeiten und alle Kampftalente/Schiffstalente, drei belegte Waffen 1175/1177/47 und vollständige Detail-/Tuningtabellen aus SKPORT.
- **Sechs vollständige Vier-Teile-Gear-Builds**: Level 70 A Standard `1239/1238/1240/365` (Deep Rampart + LYNX); B Explosion `1239/1238/1240/1240` (doppeltes Comms); C situativer UE `1239/1238/1240/1236`; Level 60 `1244/1243/1242/1120` AIC Fieldwork Assault; Level 50 `316/317/319/320` Roving MSGR; Level 36 `247/248/249/251` Roving MSGR. Quellenmaterial und Level/Stat-/Craft-Verifikation durch [Progression Audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38876229826). Blaupausen-/Storybesitz weiterhin getrennt im Build-Finder, kein pauschales Freigaberecht aus Charakterlevel.
- **Potenziale P1–P5**, Redaktion ohne ungesicherte DPS-Prozentzahlen, echtes Galerie-Artwork P1/P3/P5; **Teams** 2 Meta-Kerne aus PDF (Arcane/Ardelia/Liino und Arcane/Perlica/Liino), 5 Alternativen (Nefarith, Gilberta, Trial, Fluorite ohne Arcane, Purrchena), Partners automatisch aus Meta-Teams (Arcane, Ardelia, Liino, Perlica).
- **Neu für alle Guides optional, standardmäßig zugeklappt:** `teams.meta[].memberGear[]` mit 4 offiziellen Gear-IDs pro anderem Mitglied, in `src/content/operatorGuideSchema.ts` prüft Teammitgliedschaft und Duplikate, `TeamMemberGear.astro` rendert 3×4 Item-WebPs je Meta-Team, `OperatorTeams.astro` bindet es ein. Alle sechs Meta-Support-Loadouts in diesem Typhoeus-Guide sind anhand extern dokumentierter Datafield-Teambeispiele recherchierte **Beispiele**, nicht als wörtlich aus dem 403-blockierten persönlichen Mobalytics-Profil ableiten. Die Teamideen hingegen stammen redaktionell vom PDF.
- **Gameplay statt FOLGT:** 6 echte Showcase-Karten, darunter die drei PDF-Kapitel Trial ab 16:14, Echos ab 20:18, Nefarith-Erklärung ab 22:18, Quiz ab 25:26 im eigenen vollständigen Guide, sowie zwei eigens bestätigte Videos [Nefarith P0 0:39 ohne Buff-Food](https://www.youtube.com/watch?v=Zw8B2F2nJP8), [Rhodagn P0 0:23 mit GMS Food](https://www.youtube.com/watch?v=uixHyNlbwAQ). `youtubeEmbed` validiert den `t/start`-Parameter auf sichere numerische Sekunden und ergänzt `?start=N` am `youtube-nocookie` Embed, ohne Autoplay. `OperatorGameplay.astro` verwendet eigene lokale WebP-Thumbnails statt `[Thumbnail]`-Platzhalter, bei fehlendem Link ehrliche Textmeldung.
- Fazit mit optionaler Pull-Empfehlung: starker anspruchsvoller Natur-Main-DPS, nicht unbedingt nötig bei bereits gut ausgebautem DPS-Roster, Signature besonders relevant. Historisches Si-Timing aus dem September-Video explizit als zeitgebunden behandeln.

**Bildassets:**
- Die **bereits vorhandenen** lokalen Typhoeus-960/etc-WebPs Cover/Illustration/4 Skillicons werden wiederverwendet. Kein Bild duplizieren.
- Echte Typhoeus-Operator-Snapshots P1/P3/P5 einmalig aus **Talos Wiki** über [Image Import #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38875752256) als je 960×540 WebP: **49.798 + 118.712 + 83.994 = 252.504 Byte**. Keine PNGs im Repository. Quelle unter dem Bild verlinkt künftig die jeweils richtige Operator-Galerie (nicht immer Liino).
- Eigene YouTube-Thumbnail-WebPs 320×180 mit 3 verifizierten Video-IDs über [Thumb Import #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38876122327), **18.370 + 20.592 + 17.870 = 56.832 Byte**. Total der **sechs neuen WebPs 309.336 Byte**. Optimierte Assets gespeichert unter `public/images/endfield/operators/typhoeus/potentials/` und `public/images/endfield/video-thumbnails/`. Keine Videodateien gespeichert, keine CDN-Laufzeitabhängigkeit für statische Site-Grafiken.
- Wiederholbare Importer-Skripte unter `scripts/endfield/`; die fünf temporären Audit-/Import-Workflows wurden nach erfolgreicher Recherche aus dem Feature-Branch gelöscht. Normaler Deploy lädt niemals private PDFs, Mobalytics oder das Wiki.

**Qualitätssicherung:** Reale Chromium-Smoke-Cases für Typhoeus bei **1440/390px** in `scripts/endfield/browser-smoke.py` neu ergänzt: veröffentlicht ohne Preview-Banner, echter Hauptguide, 3 Waffen, 2 Meta-Builds, 6 Gesamt-Gear-Builds, 2 Meta-/5 alternative Teams, 4 Partner, zwei zugeklappte Beispiel-Gear-Details mit je 12 geladenen lokalen Icons, alle 3 Waffendetails/Tuning, P1/P3/P5 WebP+richtige Galerielinks, 6 echte Gameplay-Videos und kapitelgenaue Timestamps, lokales WebP-Thumbnail. Alle **alten Liino-Tests** bleiben bestehen. 109+ Node-Endfield-Tests, 100-MB-Endfield-/1-GB-Pages-`dist`-Gates, Astro-Build zusätzlich hart. **PR- und QA-Abschluss (16.10.2026):** [PR #32](https://github.com/Ag0n1st/ag0n1st.github.io/pull/32) per Squash **erfolgreich nach `main` gemergt**, Merge-Commit **`262b2b86d6be1bc2f98cd7de3c66843a8328330f`**. Endgültig vollständig grüne [CI #125](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38878529907), Prüfstand Feature-HEAD `fe8ea0b48e4835678594737977c55f42d778e319`. **109/109 Node-Tests**, Astro-Build und beide Speicherbudgets bestanden; vollständiger Chromium-Smoke **1440 px Desktop / 390 px Mobil** für Liino und Typhoeus bestanden (kein Überlauf, alle 3 Typhoeus-Waffen inkl. Tuning-Material-Icons, sechs Ausrüstungs-Builds, 2 Meta-/5 Alternativteams, 2× 12 Teammitglieder-Gear-WebP-Icons, 5 Potenziale, 3 korrekt geladene Typhoeus-Potenzialbilder, echte Video-Startzeiten und eigene WebP-Thumbs, 6 Showcases, Endfield-Spielerfortschritt weiter persistent und Autoritätscap 60). 

**Exakte aktuelle CI-Budgets:** Endfield **`21.024.790 / 100.000.000 Byte`** (21,02 %, 1.062 Dateien; **78.975.210 Byte Rest**), gesamte ausgelieferte `dist/`-Site **`17.777.805 / 1.000.000.000 Byte`** (1,78 %, 979 Dateien; **982.222.195 Byte Rest**). Insgesamt sechs neue bildliche Assets **309.336 Byte**. Quelle: finaler CI-Log #125 und die beiden dokumentierten Einmal-Image-Imports.

**Aufgetretene und behobene CI-Fehler (vollständig dokumentiert):**
1. [CI #122](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38877935969): alter `liino-builds.test.mjs`-Test verlangte fälschlich, dass der bisherige Typhoeus-**Prototyp** grundsätzlich keine Meta-Einträge haben dürfe. Durch genuine eigene zwei Meta-Builds nach Nutzerfreigabe jetzt nicht mehr zutreffend; Test auf genau zwei echte Meta- und dazu passende MetaSummary-Einträge umgestellt. **Keine Produktivdaten oder bisherige Liino-Empfehlungen dafür verändert.**
2. [CI #123](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38878253459): YAML-Fehler bei vier Typhoeus-Gameplay-Showcase-Zeilen: `type boss`/etc statt korrektem `type: boss`/etc. Korrigiert; danach 109 Node-Tests und Astro-Build grün.
3. [CI #124](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38878367706): Chromium bestätigte Typhoeus-Basis, Waffen, Teams und alle drei Potenzialbilder, entdeckte aber fehlerhaft doppelt escapetes Regex `\\d` statt `\d` bei YouTube-`t=`-Kapitelsekunden. Korrigiert; [CI #125](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38878529907) danach vollständig grün inkl. korrektem `?start=974` und `?start=1218` sowie Thumbnail-Bildern auf Desktop und Mobil.

**Erster bestätigter Live-Deploy:** [GitHub Pages #273](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38878718791) für Merge-Commit `262b2b86...` **build:success, deploy:success**. Produktionspfad `https://ag0n1st.com/endfield/operatoren/typhoeus/`. Der folgende reine ROADMAP-Status-Commit löst automatisch ein **neues** Pages-Deployment aus; auch dieses getrennt prüfen. Typhoeus ist im Astro-Guide **`published`**, Liino bleibt unverändert **`preview`**. Persönlicher Mobalytics-Guide weiterhin 403 und **nicht als gelesen behandelt**, numerische Datafield-Modelle ohne lückenlose Baseline weiter absichtlich ausgelassen.

**Übergabe:** Typhoeus fertiger, vollständig getesteter Guide ist auf main; als nächstes Nutzer die Seite auf Inhalts- und Designwünsche prüfen lassen. Bei Zugriff auf Mobalytics-Profil-Export gegebenenfalls per separates, quellengetrenntes PR die tatsächlich dort beschriebenen **Teamausrüstungs-Setups** vergleichen und einpflegen, ohne die aktuellen als aus Mobalytics zitiert zu kennzeichnen.

**Fortsetzung:** Branch fertigstellen, PR auf `main`, CI grünen Status verifizieren, bei Bedarf Fehler beheben, erst nach erfolgreichem 109+-Tests/Chromium/Budget-Gate mergen. Pages Deploy auf `main` prüfen, nächste Änderungen nach Sichtung durch Nutzer. Persönlichen Mobalytics-Export bei späterer Verfügbarkeit gesondert einarbeiten statt Blocker zu verschweigen.

---

### 14.3r Typhoeus-Feedback: Wille, Rating 1/5, Daten aus Datafield, Team-Loadout mit Waffen und Layout (16.10.2026)

**Nutzerauftrag (vollständig lesen):** Typhoeus-Template-Umsetzung redaktionell bestätigt, aber: `Will` deutsch **Wille**, niemals Willenskraft; **Einsteigerfreundlichkeit 1/5**, **Flexibilität 1/5** (Typhi aktuell der komplizierteste und stark teamabhängigste Operator, braucht Arcane oder Fluorite); Waffenvergleich und Potenziale in bewährter Liino-Form aus **Datafield.cc/characters/typhoeus**; für Partnerausrüstung **eigene Mobalytics-Redaktion**, nicht externe Datafield-Beispiele, zusätzlich **Waffen** der Partner; Arcane stets **Eternal Xiranite mit 2× Bracing Slabs**; bei Gameplay **Nefarith P0 No Food** großes Featured, Quiz entfernen; im Fazit **closingNote+Markdown nach Lead und vor den beiden Abschluss-Cards**, damit Cards letzter Inhalt sind. Nutzer kündigte `Mobalytics Guide.pdf` als Anhang an, **der aktuell nicht in den verfügbaren Uploads vorhanden ist** (nur `AKEF Typhi Skript.pdf` und Konversations-PDF, Bestätigung über Runtime und `files.search`). Deshalb nicht vortäuschen, vollständigen PDF-Vergleich erledigt zu haben.

**Entwicklungsbranch:** `refine-typhoeus-ratings-datafield-teams-20261016`, auf main `57db80840e59822aa75a237f682e3de69d1d7a75` gegründet. Änderungspaket in source branch, bis ausstehender persönlicher Mobalytics-PDF-Export eingetroffen ist. Falls vorher auf main gemergt, ausdrücklich als Zwischenstand kennzeichnen.

**Quellen-Hard-Check DATAFIELD:** Die direkte HTML-Textschnittstelle zeigt nur `Loading data...`, deshalb echte öffentlich rendernde Chromium-Abfrage über temporären, read-only GitHub Actions Workflow. [Audit #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38884193767) und [Audit #2](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38884421853) **beide erfolgreich**. Extra-Daten nach Anklicken der echten offiziellen Scenario-Schalter:
- **Weapon-Profil Ardelia Arcane Liino:** Umbra R9 124.7, R4 100.0; Suffering's End R9 84.3, R4 77.0; Detonation Unit R9 78.1, R4 72.2; Opus: Etch Figure R9 69.0, R4 66.3. Offizielle IDs **1175, 1177, 47, 65** jeweils im vorhandenen SKPORT-Itemkatalog bestätigt. Referenz Umbra R4 = 100 %; die 8 Werte im redaktionellen **Szenario** folgen der Originalseiten-Reihenfolge.
- **Weapon-Profil Non Liino Teams – LESS ATK:** Umbra R9 123.3, R4 100.0; Suffering's End R9 79.3, R4 73.7; Detonation Unit R9 77.5. Nur fünf sichtbar direkt geprüfte Werte, keine weiteren geschätzt. Separates `weapons.comparisons[]`-Szenario; keine Zusammenrechnung mit obigem.
- **Potenziale: Alle Werte sind Pn vs P(n−1)**, ausdrücklich so von Datafield beschriftet. **Teams with energy needs:** P1 8.8, P2 4.5, P3 0.8, P4 8.3, P5 6.5 %. **Teams without energy needs:** P1 6.6, P2 4.3, P3 1.0, P4 0.0, P5 5.2 %. Erstes Szenario in `potentials.entries[]` wie Liino, zweites zusätzlich in neuem optionalen `potentials.comparisons[]` mit klarer Matrix und Text-Quellenzeile – dadurch kein unkommentierter P4-Widerspruch. Standdatum `2026-10-16` und explizite Datafield-Modell-Baselines gespeichert.
- Kein zukünftiges Datafield-Datum behaupten, kein Rechenmodell nachbauen: Die Quelle ist der **bereits geladene Charakterprofil-DOM**, aber die Spreadsheet-Rotation selbst nicht nachgerechnet.

**Umgesetzte Code-/Template-Arbeit:**
1. `typhoeus.md`: `difficulty:5` → positive 1/5 Einsteigerfreundlichkeit, `flexibility:1`, übertrieben flexible Team-Beschreibung redaktionell präzisiert. Alle bisherigen Meta-/Skill-/Gear-IDs unverändert.
2. `src/content/operator-guides/liino.md`, `typhoeus.md` und beide `src/data/endfield/locales/de/*.json`: `Willenskraft` → **Wille** einheitlich. Hier ändert sich Liinos Formulierung, **nicht** ihre Empfehlung oder Formel.
3. `typhoeus.md`: zwei offizielle Datafield-Waffen-Szenarien unter dem bestehenden `weapons.comparisons` Schema sowie ein inkrementelles Default-Potenzial und ein alternatives Potenzialmodell. `OperatorPotentials.astro` stellt zusätzliche Szenariospalte mit lesbaren Titeln und Quellenfußnoten dar. `operatorGuideSchema.ts` erweitert optionale `potentials.comparisons` inklusive genau fünf unterschiedlichen P-Stufen und dokumentiert es im generischen Guide-Template. Liino behält seine bisherige singuläre Potenzialspalte.
4. In **beiden** Typhoeus-Meta-Team-Loadouts Arcane durch **`[1134,1138,1136,1136]`** ersetzt (Eternal Xiranite Light Armor, Hands und **zweimal Bracing Slab**); Wille statt Willenskraft in der Notiz, User-Vorgabe ist maßgeblich.
5. `teams.*[].memberGear[].weaponId` und `weaponRank` im **optional** validierten Team-Schema ergänzt: ID muss im SKPORT-Waffenregister nachweisbar sein, Rank 1–9 und **nur mit gesetzter Waffen-ID**. `TeamMemberGear.astro` zeigt Waffe mit Icon/Namen/Rang **oberhalb** der vier Gear-Slots. **ABER:** konkrete IDs der vom Nutzer persönlich empfohlenen Team-Waffen werden ohne das fehlende persönliche PDF bewusst nicht behauptet; es fehlen bis zur Quelle echte Werte. Andere noch in `typhoeus.md` gespeicherte Datafield-Teamausrüstungen dürfen nicht als seine persönlichen Empfehlungen ausgegeben werden und müssen nach Eingang des PDFs abgeglichen/gegebenenfalls ersetzt werden. **Dieser Punkt ist nicht abgeschlossen!**
6. `gameplay.showcases[]`: Quiz entfernt, insgesamt **fünf** statt sechs echte Run-Karten; `nefarith-p0` `featured:true`, Trial nicht mehr featured. Echte Spielvideos, Kapitelzeiten und Thumbnail-WebPs bleiben vorhanden.
7. `OperatorConclusion.astro` für **alle** Guides: direkt auf Lead folgen `closingNote` und Markdown-Slot; **zwei Zielgruppen-Cards bilden das endgültige Ende**. Kein Inhalt unterhalb mehr; redaktionelle Texte sonst unverändert.
8. Vorhandene Unit-/Chromium-Tests für Terminologie, beide Datafield-Modelle, 1/5 Ratings, Arcane-Set, Nefarith-Featured, fehlendes Quiz und Fazit-Endordnung anpassen. Vor Merge **109+ Unit-Tests, Astro-Build, 100MB Endfield, 1GB dist und Chromium desktop/mobile** bestanden haben.
9. [Source Audit Appendix VI](docs/typhoeus-source-audit-20261016.md) hält alle Quellendetails und die Blockade separat fest; temporäre Datafield Workflow nach Auslesen löschen.

**QA-Status dieser Teilumsetzung (16.10.2026):** [Draft-PR #33](https://github.com/Ag0n1st/ag0n1st.github.io/pull/33) bleibt **ausdrücklich ungeöffnet für Merge / nicht live** bis das persönliche Mobalytics-PDF geliefert und sämtliche Team-Waffen/-Gear-Items mit der eigenen Redaktion abgeglichen sind. **CI #128 vollständig grün:** [GitHub Actions #128](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38886303648), **113/113 Node-Tests** (vier neue Typhoeus-Datafield-/Konventionsregressionen), Astro-Build, Endfield-100-MB-Gate, gesamtes Pages-1-GB-Gate und kompletter Chromium-Desktop-/Mobiltest **1440/390 px** erfolgreich. Exakt **21.037.068 / 100.000.000 Byte** Endfield (21,04 %, 1.063 Dateien, 78.962.932 Byte Reserve); **17.779.095 / 1.000.000.000 Byte** deploytes `dist/`-Volumen (1,78 %, 979 Dateien, 982.220.905 Byte Reserve). Playwright bestätigt an beiden Viewports 1/5 und 1/5, Arcane pro Meta-Team zwei geladene SKPORT-1136-Slabs, beide Datafield-Waffenszenarien samt konkreten R9/R4-Werten, beide divergierenden Potenzialmodelle, fünf statt sechs Showcases, Nefarith P0 No Food featured, keine Layout-Überläufe sowie unveränderte Liino-Kernfunktionen. **QA-Zwischenkorrekturen:** CI #126 hatte Testblock irrtümlich bei Liino statt Typhoeus eingefügt; CI #127 prüfte zunächst fragile lokale `alt`-Texte für SKPORT-Slabs. Beide **nur testseitigen** Probleme behoben; CI #128 bestätigt reale korrekte Funktion. **Kein GitHub-Pages-Deploy ausgelöst, da PR draft.** Diesen CI-Status später nach tatsächlichem PDF-Abgleich und Merge erneut aktualisieren.

**Aktueller Handoff / OFFENER BLOCKER:** Die angehängte persönliche **Mobalytics-PDF-Datei ist bisher nicht angekommen** und öffentliche Mobalytics-HTML-Seite blockiert weiterhin mit HTTP 403. **Bis zum Dateieingang nicht behaupten, die persönlich gewünschten Waffen- und Rüstungs-Setups aller Teammitglieder vollständig implementiert oder geprüft zu haben.** Zwischenstand testbar als Draft-PR (nicht ohne klaren Zwischenstands-Hinweis veröffentlichen). Sobald das PDF bereitsteht: Team für Team wirklich nach PDF abgleichen, fehlende `weaponId`/optional `weaponRank` eintragen, 4 Gear-IDs je Person inklusive Off-Pieces validieren, Bewertungen aus eigener Redaktion übernehmen, QA/PR/Main/Pages durchführen und Roadmap fortschreiben.

---


### 14.3s Mobalytics-PDF angekommen: echte Teamwaffen, bedingte Gear-Sets und Skill-Gleichstand (16.10.2026)

**Neuer Status, ersetzt den PDF-Blocker aus §14.3r:** Der Nutzer hat jetzt **`Typhoeus Build Guide - Ag0n1st (Mobalytics).pdf`** als direkten Gesprächsanhang bereitgestellt. Die direkt eingelesene PDF beinhaltet den persönlichen ausführlichen Mobalytics-Textguide mit Datum **04.10.2026**; der public-Mobalytics-HTTP-403-Zugriff ist nicht mehr relevant für den inhaltlichen Abgleich. **PDF niemals in das öffentlich zugängliche Repository hochladen!** Textbasierte Quellenextraktion, PDF-Bildreferenzen und offizieller Item-Katalog reichen vollständig. [Genaue redaktionelle und technische Provenienz in `docs/typhoeus-source-audit-20261016.md`, neuer Abschnitt VII](docs/typhoeus-source-audit-20261016.md).

**Wesentliche Korrekturen gegenüber der zuvor aus externen Datafield-Teambeispielen zusammengebauten Fassung:**
- **Arcane überall:** Signature-Waffe `Type 42: Solemn Phalanx 1045`, alternative `Detonation Unit 47` und `Junction Point 1043`; Team-Wille-Variante **Light Armor 1134 / Wraps 1137 / Bracing Slab 1136 / Bracing Slab 1136** bei **allen acht** Teams mit Arcane. Vorher versehentlich **Hands 1138** (gehören zu Liino); das ist ausdrücklich korrigiert. Alle Meta-Teams haben nun passende Waffe+Set jedes dokumentierten Supports.
- **Ardelia:** `Dreams of the Starry Beach 49`; Hauptbuild mit Xiranit-Arcane **und Liino** `881/1131/876/876` (Qingbo/Hot Work), konditional ohne Xir-Nutzer `1134/332/337/337`, mit Xir aber ohne Liino `328/775/286/286`.
- **Liino:** `Bedazzling Night Debut 1046`, `Golden Age 1044`; **mit Xir+Ultimate-Energiebedarf** `1134/1138/365/365`; mit Xir **ohne** Extra-Energie `1126/1129/365/365` (max. Wille); ohne anderen Xir-Nutzer `1134/1138/337/365`.
- **Perlica:** `Stanza of Memorials 94`; Qingbo/Hot Work für Combo-CD/Elektrifikation `881/775/876/876`; mehr eigener Schaden `353/775/338/338`.
- **Gilberta:** `Delivery Guaranteed 79`, bedingte `Detonation Unit 47`; `328/874/793/793` für Taumel/Nuke, `328/775/286/286` für Technik-Intensität; ohne andere Xir-Nutzer `328/332/337/337`.
- **Typhi selbst / besondere UE-Variante:** Eigenes Build C aus PDF: **LYNX Cuirass T1 `1132` + Deep Rampart Gauntlets `1238` + 2× Deep Rampart Comms `1240`**, nicht `1239/1238/1240/1236`. Standard A und Doppel-Comms B bleiben.
- **Skill-Priorität:** Eigenes Mobalytics-PDF Seiten 2 und 9: **BS > CS > BA = ULT** bzw. **BS > CS > ULT = BA**, gleicher Schlussrang. Generisches Schema unterstützt jetzt exakt `=` (auch zukünftige Operatoren). Typhi `order: [battle,combo,ultimate,basic]`, `comparisons: [">",">","="]`; belegtes M3-Ziel für BS und Combo bleibt, die unbelegten numerischen Schluss-Level (Ult 9/Basic 1) wurden entfernt.
- **Meta-Team-Alternativen:** Außerdem explizit im Mobalytics-PDF enthalten Typhoeus+Arcane+**Ardelia bzw. Perlica+Gilberta** (ohne Liino). Zwei passende `teams.more[]`-Einträge ergänzen die bisherigen fünf, **insgesamt sieben weitere Teams**; bei `arcane-gilberta-liino` ist die eigene Rhodagn-Nuke-Rotation mit nötigem Combo-/Stagger-Timing erläutert, Gilbertas spezifischer Swordmancer-Taumbuild eingebunden.
- **Quellen-Hierarchie** endgültig: persönliches PDF/Skript = redaktionelle Waffen-/Gear-/Team-Entscheidungen und Bewertungen; öffentliches Datafield **Typhoeus Character Profile** = seine **zwei vollständig getrennten Waffen-Datenfelder** und **zwei inkrementellen Potenzialmodelle** (schon §14.3r direkt per Chromium erfasst); offizielle lokale SKPORT-Katalogdaten = sämtliche numerischen Item-IDs, Namen und WebP-Icons. Externe Datafield-Team-Gear-Empfehlungen ersetzt, nicht stillschweigend als eigene dargestellt.

**Gemeinsames Template für alle zukünftigen Operatoren erweitert:**
- `memberGear[].weaponId` (eine belegte Hauptwaffe), optional `weaponRank` nur bei belegter Stufe, `weaponAlternatives[]` (nur echte weitere Empfehlungen), `alternatives[{title,items[4],note}]` für abweichende nach Bedingungen ausgewählte 4-teilige Rüstungssets. Eindeutigkeit von Waffen und je maximal sechs Varianten über Zod abgesichert; `TeamMemberGear.astro` rendert kompakt Hauptwaffe + ggf. Alternativen + vier primäre Gear-Icons, **aufklappbare weitere Gear-Sets** mit Bedingungen statt zusätzliche übergroße Cards. Schrift/CSS und Template/Workflow-Dokumentation angepasst.
- Alle Typhoeus-Beispiele werden **per offiziellen Item-Katalog** verifiziert, insgesamt **48 4-Teile-Kombinationen**, **20 Teammitglied-Hauptwaffen** (Wiederholung in anderen Teams okay) und mehrere Alternativ-Waffen. **Keine neuen Bilder/Medien/Fonts**, vorhandene SKPORT-WebPs direkt wiederverwendet. Bei Figuren aus dem Skript ohne Waffenquelle (Xaihi, Antal, Fluorite, Purrchena) keine erfundenen Waffeneinträge.

**Abschluss nach tatsächlichem PDF-Abgleich (16.10.2026):** [PR #33](https://github.com/Ag0n1st/ag0n1st.github.io/pull/33) wurde nach Empfang der PDF, Quellenauswertung, vollständiger Implementierung und erfolgreich grüner [CI #143](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38890663573) aus Draft auf Ready gestellt und per **Squash nach `main` gemergt**, Merge-Commit **`19b036c472201c53c0711a8793de527048852029`**. Bei der endgültigen CI #143: **114/114 Endfield-Node-Tests**, keine Failures, Astro-Build, GitHub-Pages-dist-1-GB-Gate und Endfield-100-MB-Gate erfolgreich. **Komplette echte Chromium-Desktop/Mobil-Prüfung 1440/390 px** für Liino und Typhoeus erfolgreich, insbesondere 1/5 und 1/5, Datenfield-2× Waffen/2× inkrementelle Potenziale, Arcane-Wraps-1137 statt Hands und zweimal Bracing Slab 1136 pro Meta-Team, Type42-Waffen-Icons, 4 Gear-Icons, aufgeklappte bedingte PDF-Varianten, 2 Meta/7 Alternative-Teams, Korrektur für ULT-Build C, Priorität `BS > CS > ULT = BA`, Nefarith P0 Featured, Fazit-Cards letzter Inhalt, keine mobilen Seitenüberläufe. **Alle 48 Gear-Tupel und 20 primären Team-Waffenbelegungen** mit SKPORT-Itemkatalog gegengeprüft. **Exakte aktuelle CI-Budgets:** Endfield `21.054.998 / 100.000.000 Byte` (**21,05 %**, 1.063 Dateien, Rest `78.945.002 Byte`); gesamtes gebaute Pages-`dist/` `17.851.843 / 1.000.000.000 Byte` (**1,79 %**, 979 Dateien, Rest `982.148.157 Byte`). Keine weiteren Medien importiert, ursprüngliche sechs Typhoeus-WebPs bleiben.

**GitHub Pages erfolgreich deployed:** [Pages Run #275](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38890844106) auf main `19b036c4...` **beide Jobs `build` und `deploy` mit `success`** (inkl. beider Budget-Gates vor Upload). Produktivansicht `https://ag0n1st.com/endfield/operatoren/typhoeus/`. Der folgende nur dokumentarische ROADMAP-Commit startet erneut ein Deployment; auch diesen Run separat bestätigen.

**Weitere QA-Hinweise:** Der oben erwähnte ursprüngliche PDF-Blocker ist **vollständig erledigt**; die alte Dokumentation aus §14.3r über „Anhang fehlt“ ist ausdrücklich historische Information vor dem tatsächlichen Upload. Keine unverifizierten persönlichen Teamausrüstungswerte mehr aus öffentlichen Datafield-Team-Tabellen übernommen; Datafield bleibt **Quelle der Kennzahlen**, Mobalytics-PDF **Quelle der persönlichen Redaktion**, SKPORT **Quelle der Spiele- und Asset-IDs**. Gleichrangige Skills und optionale Teamloadout-Varianten sind nun Teil des für neue Operatoren wiederverwendbaren Templates.

**Nächster Übergabepunkt:** Nutzer um Sichtung der aktuellen Typhoeus-Seite nach Korrekturen bitten, eventuelle konkrete UI-Feinabstimmungen aufnehmen. Danach erst auf ausdrücklichen Wunsch den nächsten Operator beginnen.

---


### 14.3t Si – kompletter v1.6-Guide, eigene Theorycrafting-Redaktion und offiziell verifizierte Nach-Release-Daten (16.10.2026)

**Auslöser:** Nach erfolgreicher redaktioneller Freigabe von Liino/Typhoeus ist der nächste Operator **Si**. Nutzer liefert **`Si Build Guide - Ag0n1st (Mobalytics).pdf` (8 Seiten, 16.10.2026, WIP/Pre-Release-Theorycrafting)** mit ausdrücklicher redaktioneller Vorabfreigabe. Primärquellenhierarchie: **eigener Guide** für redaktionelle Team-/Gear-/Waffen-/Rotations-Einordnung; **seit 15.10.2026 öffentlich verfügbarer Si-Eintrag in der offiziellen SKPORT Wiki** für Skills, 12 Ränge, 5 Potenziale, Auswertungen, Materialien und WebP-Assets; **Datafield.cc/characters/si** für namentlich dokumentierte *simulierte* Waffen-/Potenzial-Relativvergleiche. Ergänzende unabhängige Quellen dienen nur zur Plausibilitätsprüfung, ersetzen nicht die Creator-Vorgaben. Original-PDF wird niemals öffentlich ins Repo hochgeladen. Vollständige Quellenkette im eigenen **[`docs/si-source-audit-20261016.md`](docs/si-source-audit-20261016.md)**.

**Fester Nutzerentscheid:** Si ist **6★ Kryo-Supporter mit Großschwert**, Main Attribut **Intellekt**, Sekundär **Stärke**, genaue Traits **Amp / Damage Dealer / Cryo Infliction**. Trotz unterschiedlicher DPS/Support-Rollen ausdrücklich **Flexibilität 5/5**, **Einsteigerfreundlichkeit 3/5** (Schwierigkeit `difficulty: 3`), da Kernrotation ohne Expertenhilfe nachvollziehbar bleibt, FP-/Timing-Feintuning aber anspruchsvoll ist. Sie ist Main DPS, Sub-DPS und Kryo-/Hitze-Unterstützerin; Ink-Soul/Tintenseele als feststehendes schadensübertragendes Ziel, die ursprüngliche Zielperson erhält Effekte, Schaden und Kumulierungen. Si kann abhängig von Teamposition 1 Kryo oder Hitze anwenden und über ihre Ultimate beide Elemente verstärken. Der Nutzer hat **deutsche Ingame-Skilltexte für alle vier aktiven Skills selbst im PDF ergänzt** (Seiten 3–4) und wünscht, diese **wortgetreu** zu übernehmen. Deshalb sind sie in `src/data/endfield/locales/de/si.json` getrennt von offiziellen englischen SKPORT-Tabellen und sonstigen übersetzten Werten eingebunden.

**Offizielle Nach-Release-Daten und Abgrenzung zu ungeprüften Assets:**
- **SKPORT Si `1278`** von öffentlichem Widget `https://wiki.skport.com/endfield/detail?mainTypeId=1&subTypeId=1&gameEntryId=1278` mit dem generischen validierenden Importer `scripts/endfield/import-operator.mjs` importiert. `src/data/endfield/operators/si.json` enthält vier originale Skilltabellen mit je **12 Rängen** und Kosten; `si.extra.json` Talente, Potenziale P1–P5, Promotionen, Haupt-/Sekundärattribute und Material-IDs; offizieller 6★ Cryo Supporter Greatsword. Ein vom Quell-Wiki unspezifisch mit `Skill Name` betitelter Battle-Skill wurde nur für die Anzeige anhand offizieller Beschreibung korrekt `Brushwork Realm` benannt.
- **Lokale tatsächliche Si-WebPs**: Cover, Illustration, vier Skill-Icons und drei echten Potenzialbildern P1/P3/P5; 6 weitere neue 1.6-Rüstungs-Piktogramme als lokale begrenzte WebPs. Skripte `scripts/endfield/import-si-public.mjs`, `import-si-wiki-gear.mjs` (nur Einmalimport bei Bedarf). Kein Runtime-API-Zugriff.
- **Originale SKPORT Item-Katalog `items.json` hatte am 16.10. nur 940 Items**; die frisch veröffentlichten Gear-Bezeichnungen **Type 50 Yinglung Soft Armor, Gauntlets, Beacon** und mehrere neue Eternal-Xiranite-Teile sind darin **noch nicht eindeutig mit numerischen offiziellen IDs zugeordnet**. Die sechs noch namensbasierten Einträge unter `src/data/endfield/catalog/si-release-gear.json` sind *ausdrücklich* nur von öffentlicher Wiki anhand Namen und kleinem WebP-Symbol verifiziert, **nicht** als blueprint-verfügbar/korrekte Herstellungsrezepte getarnt. Gegenprüfung im Build-Finder unterbindet entsprechende automatische Blaupausenbesitz-Behauptungen. Veröffentlichung kann mit vollständig ausgefülltem redaktionellen Guide passieren, die fehlenden neuen numerischen IDs und Recipes bleiben als klare spätere Daten-Aufgabe dokumentiert. Auch offizielle Si Signature `Jade Vessel 1280` und BP `Long Heritage 1281` bereits mit lokalem SKPORT-Item-Icon aus dem verifizierten Katalog; `Khravengger 70` als unabhängige dritte Option. Der offizielle, frisch veröffentlichte Detail-/Tuning-Endpunkt der Waffe ist beim strengen Einmalimport noch nicht vollständig – die UI darf keine unbestätigten Material-/Tuning-Zahlen erfinden.
- **Datafield.cc/characters/si** per headless Chromium direkt gerendert, reale Main-DPS-Baseline `Jade Vessel R4=100,0%`; R9 Jade Vessel 114,5%, Khravengger R9 96,1%, R4 91,0%, Long Heritage R9 90,5%, R4 86,8%. Die P1–P5-DPS-Zunahmen jeweils zur **unmittelbaren Vorstufe**: 5,6/6,2/3,6/2,8/9,3%. Support-Tab-Vergleiche wegen nicht vollständig auslesbarer Modelldaten **nicht erraten/vermischen**. Quellenstand und Rotationsbedingungen im Guide dokumentiert, keine universellen DPS-Behauptungen.

**Vollständige Template-Befüllung mit redaktioneller Freigabe:**
- `src/content/operator-guides/si.md` mit `status: published`, neun Abschnitte (Übersicht/Operator-Kit/Fertigkeiten/Waffen/Ausrüstung/Potenziale/Teams/Gameplay/Fazit) und wörtlichen deutschen Ingame-Skills.
- Eigener **Meta-Build Type 50 Yinglung** mit **Soft Armor + Gauntlets + Beacon + LYNX Slab (Off-Piece)** bleibt bewusst als Haupt-/Featured-Build. Alternative Type-50-/Xiranite-/Support-/Progressions-Einträge als eigener Build-Finder, insgesamt **5 Builds**; niemand überschreibt gegen Nutzer-Vorgabe automatisch das Off-Piece. Offizielle numerische Item-Freischaltungen werden nicht aus Theoriecrafting erfunden.
- **Exakt sechs eigenhändig als Meta hervorgehobene Teams und 37 weitere aus dem PDF**, zusammen 43 unterschiedliche Konstellationen mit eigenem Einordnungstext und aus Nutzervorgabe entnommenen Rollen: Yvonne+Tangtang+Xaihi; Last Rite+Tangtang+Xaihi; Laevatain+Wulfgard+Camille; Rossi+Mi Fu+Gilberta; Si+Tangtang+Arcane+Xaihi; Si+Tangtang+Arcane+Gilberta. Andere Nutzer-Theorycraft-Teams ebenfalls eingeordnet. Profil-Partners automatisch aus all den belegten Meta-Mitgliedern, aber ohne Si.
- **Skillpriorität Main-DPS** im Schnellüberblick **Combo > Battle > Ultimate > Basic** gemäß redaktionellem Schwerpunkt; ausdrücklich abweichende **Support-Priorität Ultimate > Battle > Combo** im ausführlichen Guide. Ohne eindeutige Nach-Release-Werte keine künstlich festgeschriebenen konkreten Skilllevelziele.
- **P1–P5** mit offizieller Effektbeschreibung, Einordnung, eigenen P1/P3/P5-Grafiken und streng getrennten Datafield-Inkrementen. **Gameplay** mit ausführlich aus eigenem PDF plus offiziellen Skills geschriebener Rotation: 15 FP für ersten Pinselstrich, kostenloses vorzeitiges Beenden, Teamposition 1, Kumulierungsverbrauch für Combo, Ultimate-Buffs und Team-FP-Fenster. `pending:true` **nur für noch nicht existierende eigene Si-Videos**: keine erfundenen Streamlinks oder Clips. **Fazit** differenziert Main-/Sub-DPS und Cryo-/Heat-Support, Karten zuletzt.

**Qualitätssicherung / aktuell vollständig GRÜN:** [PR #34](https://github.com/Ag0n1st/ag0n1st.github.io/pull/34) auf Feature-Branch `feature-si-complete-guide-20261016` (aus main bei `91480581175e14dd306a48a923c472aa4505322f`). **[CI #155](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38897941446) vollständig `success`**: **120/120 Endfield-Node-Tests**, Astro-Build, Endfield-100-MB-Hardgate, Pages-`dist/`-1-GB-Hardgate, kompletter realer Playwright-Chromium Smoke bei **1440 und 390 px**: Liino/Typhoeus-Regressions plus Si-Profil-Attribute, Rating 3/5 und 5/5, Traits, offizielle Portraitgrafik, Quellenwaffen, Video-Platzhalter ehrlich, beide Meta-Builds und drei weitere Builds, verifizierte vs. noch fehlende Gear-Numeric-IDs, 6 Meta- und 37 Extra-Teams, deutsche Ingame-Skilltexte nach korrektem Aufklappen, alle fünf Potenziale mit P1/P3/P5-WebPs, Datafield-Waffen-/Potenzialmodell, schriftliche Rotation, Fazit-Abschluss-Cards, mobile Überlaufprüfung erfolgreich.
- **Exakte CI-Metriken:** Endfield **`21.979.256 / 100.000.000 Byte`** (21,98 %, 1.086 Dateien, Rest 78.020.744 Byte), gesamtes gebaute Pages-`dist/` **`18.906.777 / 1.000.000.000 Byte`** (1,89 %, 994 Dateien, Rest 981.093.223 Byte). Keine 1-GB-oder-100-MB-Regel verletzt.
- **Behobener CI-Abnahmefehler:** [CI #154](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38896672608) hatte einen **Testfehler**, weil Playwright versuchte, die deutschen Original-Skilltexte in dem korrekt initial zugeklappten Fertigkeiten-`<details>` als sichtbaren Text zu lesen. Korrektur: vor Textprüfung `details[data-guide-disclosure="skill-details"]` tatsächlich aufklappen. Im [CI #155](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38897941446) bestätigt; der Website-Code selbst war an dieser Stelle korrekt.
- **Abgeschlossen (16.10.2026):** [PR #34](https://github.com/Ag0n1st/ag0n1st.github.io/pull/34) wurde nach erneut vollständig grüner [CI #156](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38898346410) aus Draft als bereit markiert und **per Squash nach `main` gemergt**, Merge-SHA **`a265af49d8cba1e68f2c79c50c15b344e2b6840c`**. CI #156: **120/120 Unit-Tests**, Astro-Build, beide harten Speichergrenzen, echter Chromium-Smoketest **1440/390 px** für Liino, Typhoeus und Si **vollständig `success`**, inklusive aller 43 authentischen PDF-Teams, persönlicher 6 Meta-Markierungen, deutschen Original-Skilltexten, Bilderladen, Datafield-Profilwerten und ehrlich als numerisch ungeprüft markierten neuen Type-50-Gear-Blaupausen. Offizielle `si.json` und `si.extra.json` samt PDF-Locale weiterhin vorhanden. Exakte Abnahmemetriken: **Endfield 21.979.256/100.000.000 Byte** (1.086 Dateien, 78.020.744 Byte Rest) und **gesamtes Pages-`dist/` 18.906.777/1.000.000.000 Byte** (994 Dateien, 981.093.223 Byte Rest). **Erster bestätigter produktiver GitHub Pages Build + Deploy: [Pages #277](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38898491895), beide Jobs `success`** auf dem Merge-SHA. Der nachfolgende reine ROADMAP-Commit triggert einen neuen Pages-Run, den abschließend getrennt kontrollieren. **Live-URL:** `https://ag0n1st.com/endfield/operatoren/si/`.

**Abnahme-/Weiterentwicklung:** Die Website liefert nun den aus eigener Theoriecrafting-Redaktion + offiziellen Release-Tabellen erstellten vollständigen Guide. Ein eigener Si-Video-Showcase existiert bislang nicht und wird nicht erfunden. Die numerischen SKPORT-Gear-/Blaupausen-/Waffen-Tuning-Details für frisch veröffentlichte v1.6-Gegenstände sind noch nicht durchgängig vorhanden und können später mit verifizierten Wikidaten ergänzt werden; solange bleiben Platzhalter klar kenntlich und entsprechende Blueprint-Checkboxen deaktiviert. Nutzer kann den Guide jetzt als vollständiges Lesewerk und für bestätigte Teile im Build-Finder nutzen; spätere redaktionelle Feinabnahme nach Sichtung.

---

### 14.3u Nach Si-Release: dokumentierte Recherche, Editorial-Voice-Regel und Deploy-Abnahme (16.10.2026)

- **GitHub unabhängig geprüft:** `main` HEAD `f5d7ccf4f650817e7f7059ac4e05a2d8b551990c`; nur `ROADMAP.md` gegenüber dem gemergten Si-PR #34 geändert. Deploy-Workflows [Pages #278](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38898689708) und [Pages #279](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38904475834) jeweils `success` im Build **und** Deploy, beide Budget-Gates grün. Bereits bei Si-CI #156 bestätigtes `dist/`: 18.906.777 / 1.000.000.000 Byte; für #279 **keine neue exakte dist-Größe abgelesen**, nur bestandenes Hard-Gate.
- **Endfield-Iststand anhand des nicht abgeschnittenen Git-Trees auf `main`:** exakt **21.979.256 / 100.000.000 Byte** (1.086 zu diesem Teilbudget gehörige Blob-Dateien, **78.020.744 Byte Rest**). Unabhängig vom Pages-`dist/`-Limit und von der Git-History. Die dokumentarischen Zusatzdateien verändern die Endfield-Quellbäume nur gering; neue CI liefert den gültigen Folge-Snapshot.
- **Alter PR #3 geprüft:** offen, `draft`, read-only-SKPORT-Wiki-Recherche, Branch 13 Commits vor / 60 hinter `main`, `diverged`. Keine Übernahme ohne erneuten Abgleich und Nutzerentscheidung; weiterhin nur ein veralteter Forschungszweig.
- **Erneute öffentliche Quellenprüfung:** fünf der sechs Si-v1.6-Release-Gear-Einträge besitzen unterscheidbare **Community-interne** `item_equip_...`-Kennungen. Für `type-50-yinglung-gauntlets` konkurrieren mehrere ähnlich benannte Type-50-Glove-Varianten; **keine eindeutige numerische SKPORT-ID** nachgewiesen. Teilweise genannte Community-Rezeptkosten sind **keine offiziell validierten SKPORT-Rezepte**. Deshalb **keine Änderung** des öffentlichen Gear-Manifests, der Build-IDs, der empfohlenen Type-50-/LYNX-Kombination oder des konservativen `unverified`-Build-Finder-Verhaltens. Einzelbelege, Links, strikter Migrationsablauf und nächste Abnahme: `docs/si-v16-gear-followup-20261016.md`.
- **Redaktionelle Eigenstimme als Regression:** Neu `scripts/endfield/editorial-voice.test.mjs` mit Prüfungen für Guide-Dateien, Operator-Astro-Komponenten und deutsche Anzeige-Lokalisierungen. Fremdautoren-Zuschreibungen sind in sichtbaren Guide-Inhalten verboten; interne YAML-Kommentare und ausdrücklich nicht angezeigte Herkunftsmetadaten sind ausgenommen. **Keine erneute Prosa über „vom Creator“ im ausgelieferten Guide.**
- **Abgeschlossen:** [PR #35](https://github.com/Ag0n1st/ag0n1st.github.io/pull/35) nach [CI #157](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38933564698) **123/123 Node-Tests**, beide Budgetgates, Astro-Build und erfolgreicher echter Chromium-Test auf 1440/390 px als Squash `c5189e529237ca7707cb3d5824c1fc16219ad0b8` in `main` gemergt. [Pages #280](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38933850978) hat Build und Deploy vollständig erfolgreich abgeschlossen. **Exakte CI-Budgets nach der Testergänzung:** Endfield **21.981.347 / 100.000.000 Byte** (1.087 Dateien), Pages-`dist/` **18.906.777 / 1.000.000.000 Byte** (994 Dateien). Keine Änderung am veröffentlichten Si-Guidetext oder Build-Finder.
- **Nächster redaktioneller Gate:** Nutzer-Sichtung des vollständigen [Si-Guides](https://ag0n1st.com/endfield/operatoren/si/). Keine nachträglichen, unfreigegebenen Build-Umwertungen, kein vierter Operator ohne Freigabe. Si-Gameplay-Einzelvideos bleiben `pending`.

### 14.3v Si-Guide: redaktionelle Revision nach Nutzerabnahme (16.10.2026; PR-/CI-Prüfung folgt)

**Ausgangspunkt:** Si v1.6 bereits veröffentlicht, letzter Grundstand `main` `87e0fc2a4d268928d9c6c11ceaabad559befaa72`. Konkrete Korrekturen wurden vom Betreiber in diesem Chat vollständig vorgegeben. Feature-Branch `feature-si-editorial-pass-20261016` (Guide und wiederverwendbares Template; keine externen Bilder oder Runtime-Abhängigkeiten hinzugefügt).

**Redaktioneller Inhalt – verbindlich:**
- Top-Hinweis nur `SKPORT-Datenstand: 2026-10-16`, kein eigener Herkunfts-/PDF-Metatext. Übersicht: höherer eigener Kryo-Combo-SDN, Kryo-/Hitze-DPS-/Support-Vielseitigkeit, nur drei wirkliche Schwächen (Spieltechnik, spätes Endgame-Gear, Abhängigkeit von limitierten Teammitgliedern). Explizite **vorläufige Zugänglichkeit 1/5** aufgrund des neuen Storygebiets, bis offizielle Gear-/Freischaltungsdaten vollständig vorliegen; Schwierigkeit 3/5, Flexibilität 5/5 unverändert.
- Kit-Schluss ohne Datafield-/Theorycrafting-Erzählung. Unabhängige Skill-Prioritäten: **DPS CS M3 > BS M3 > BATK M3 ≥ ULT M3**, **Support BS M3 > ULT M3 > CS M3 > BATK Lv 1–9 (optional)**. Erweiterung `skills.supportPriority` im generischen Zod-Schema, separate parallele/gestapelte Darstellung in `OperatorSkills.astro`; Quick-Card zeigt ausdrücklich DPS-Reihenfolge für Si, andere Guides unverändert.
- Waffen-Einleitung ersetzt durch praxisnahen Hinweis zu Signature-Waffe, unabhängig vom Waffenrang, mit den weiterhin nur **einem benannten** Datafield-Main-DPS-Vergleich.
- **3 Meta-Cards (Reihenfolge)**: (1) Type-50-Set 3× + **Redeemer Seal (offizielle numerische Gear-ID 349, INT + ULT-Effizienz)** als `Balanced` (Cyan), neue primäre Quick-Card `overview.featuredBuildId: si-balanced`; (2) bisheriges Type-50-3× + LYNX Slab `si-main` als `Max. DMG` (Magenta); (3) bedingtes Eternal-Xiranite-Set `si-support-xiranite` als `Max. Buffs` (neutral), wegen zu erwartender Type-50-Überlegenheit **nur situativ**. Meta-Tags sind `metaTag` im selben Build-Datensatz, keine zweite Datenhaltung. Das alte `si-main` behält seine ID und Gear; alte Links brechen nicht, und die bestehende Team-Build-Zuordnung bleibt bewusst erhalten.
- **Progression:** Zwei bewusst redaktionell ausgewählte, im offiziellen 940er-Itemkatalog vorhandene Übergangs-Builds im Finder, ohne unbelegte Schadensprozentvergleiche. **Lv50:** Mordvolt Insulation Vest T1 (322), Gloves T1 (323), Battery T1 (327) + Aburrey Flashlight (291). **Lv36:** Mordvolt Insulation Vest (256), Gloves (259), Wrench T1 (266) + Wrench (262). Beide nutzen entsprechende Status/Materialfilter; keine frühen Type-50-Blueprints behauptet. Bestehender Lv60-AIC-Build bleibt.
- Sechs Meta-Team-Titel nun `Yvonne Main DPS`, `Last Rite Main DPS`, `Laevatain Main DPS`, `Rossi Main DPS`, `Si Main DPS`, `Si Main DPS (2)`; beide Si-`main-dps`-Meta-Rollenlabels Magenta. Alle vier Slots jeder Meta- und weiteren Teamkarte verwenden gecachte Operatorporträts mit initialenbasiertem Fallback; keine neuen Assets. **6+37 Teamzusammensetzungen unverändert.**
- Gameplay wie bei Liino bis zur tatsächlichen Videoveröffentlichung nur `pending:true` mit knappem FOLGT-Abschnitt, keine lange Rotation. Fazit: erster Absatz `verdict` bleibt; `closingNote` gelöscht, 3 statt 4 Zielgruppenkriterien und einziges `skipIf`: `Du hast keine Nutzung für Kryo-/Hitze-Verstärkung und keine Möglichkeit, an das neue Ausrüstungs-Set zu kommen.`
- Sichtbare PDF-/Pre-Guide- und Drittautor-Formulierungen aus Si-Teambeschreibungen/Kit/Meta-Builds entfernt; internes Quellenprotokoll separat erhalten. Offizielle Skilltexte aus dem Spiel **nicht verändert**; Datafield-Waffen-/Potenzialprozente unverändert.

**Technische Implementierung:** `si.md`, `operatorGuideSchema.ts`, `operatorGuideModel.ts`, `OperatorGuide.astro`, `OperatorOverview.astro`, `OperatorSkills.astro`, `OperatorEquipment.astro`, `OperatorTeams.astro`, `operator-guides.css`; Template `_template.md` und `docs/operator-guide-workflow.md` nachgezogen. Vorhandene Tests `scripts/endfield/si-guide.test.mjs` und Browser-Smoke `scripts/endfield/browser-smoke.py` angepasst.

**Quellen- und Datengrenzen:** Type-50-Release-Slugs bleiben weiter nichtnumerisch und `unverified`. Nur **Redeemer Seal 349** und bestehende Mordvolt-/Aburrey-IDs stammen aus dem vorhandenen offiziellen Katalog. Provisorischer `accessibility:1`-Wert ist eine explizite redaktionelle Bewertung auf Basis der neuen Gebietsfreischaltung, **kein fingierter Wiki-Recipe-Nachweis**. `src/data/endfield/catalog/` bleibt unangetastet.

**CI-Abnahme:** [PR #36](https://github.com/Ag0n1st/ag0n1st.github.io/pull/36), [CI #163](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38942624652) **vollständig `success`**: **125/125 Node-Tests**, Astro-Build, Endfield **21.988.264 / 100.000.000 Byte** (21,99 %, 78.011.736 Byte frei, 1.087 Dateien), gesamter Pages-`dist/`-Build **18.969.697 / 1.000.000.000 Byte** (1,90 %, 994 Dateien), echter Chromium-Smoke bei **1440/390 px** inkl. Liino, Typhoeus und Si ohne horizontales Overflow. Spezifische Si-Prüfungen: SKPORT-Kopfzeile exakt, 1/5 Zugänglichkeit, Balanced-Quick-Build mit Redeemer 349, drei Meta-Cards/Tags, 8 Finder-Builds inkl. Level 36/50, LYNX weiterhin vorhanden, v1.6-Blueprints weiter gesperrt, 6+37 Teamkonstellationen samt offiziellen Porträts, nur zwei Si-Main-DPS-Magenta-Labels, beide Skill-Reihenfolgen und ihre Ziele, alle vier deutschen Ingame-Skilltexte, kompakter Gameplay-Pending-/Fazitbereich.

**QA-Korrekturen während Entwicklung:** Die ersten Läufe #158–#160 zeigten drei ältere Liino-Tests mit exakten JSX-Snapshotannahmen; Meta/Support-Chips wurden wieder für alle anderen Operatoren unverändert neutral gehalten, nur Si-Main-DPS per gekapselter CSS-Klasse hervorgehoben. CI #161/#162 deckten außerdem einen nicht abgeschlossenen Astro-Conditional-Renderblock auf, durch den aufklappbare Skilldetails fehlten; nach Syntaxkorrektur #163 inklusive Gameplay/Skilldetails und Mobilversion erfolgreich. Diese Fehler wurden **vor Merge** behoben, nicht in `main` veröffentlicht.

**Merge/Live-Deploy abgeschlossen:** [PR #36](https://github.com/Ag0n1st/ag0n1st.github.io/pull/36) per Squash in `main` als Commit `9f2005909ca8397bd63587ab9b9e39e32645685c`. [Pages #282](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38943033551) auf exakt diesem Commit mit den beiden Jobs **build und deploy `success`**. Der anschließende reine ROADMAP-Nachtrag ist kein erneuter Funktionsrelease; sein eigener Deploy ist unabhängig zu kontrollieren. **Nächster Feedbackpunkt:** [Si live](https://ag0n1st.com/endfield/operatoren/si/) prüfen, insbesondere 3 Meta-Labels, zwei Skill-Prioritäten, 4er-Team-Porträts und Balanced als erste Quick-Card.

### 14.3w Globale Übersicht-Card-Akzente, vierte Si-Meta-Option und neue v1.6-Datenrecherche (16.10.2026)

**Nutzerentscheidung:** Si-Revision aus PR #36 grundsätzlich abgenommen, erneute gezielte Änderungen explizit beauftragt. Keine Neufassung der zuvor freigegebenen drei Meta-Builds. Aktueller Feature-Branch `feature-si-early-access-color-cards-20261016`, Basis `main` `dad3b98064b81c1b45a67e296b4b01684cf4d5b1`.

1. **Globale Stärken/Schwächen in der Übersicht:** `OperatorOverview.astro` versieht die bestehenden Karten aller Operator-Guides mit `op-strengths-card` beziehungsweise `op-weaknesses-card`. `operator-guides.css` gestaltet sie dezent grün/rot durch schwachen Hintergrundverlauf, zurückhaltende Randakzente und barrierearm hell gefärbte Überschriften; Lesetext bleibt hell und kontrastreich. Keine Änderung in redaktionellen Datensätzen oder Bild-Assets.
2. **Si Early Access – vierte Meta-Card** `si-early-access`, `meta: true`, `metaTag: early-access`, Level 70; im bestehenden SKPORT-Katalog nachgewiesene Teile: **Redeemer Armor 796 (Rüstung)** / **Type 50 Yinglung Gloves 411 (Handschuhe, alte AGI/INT-Variante)** / **Type 50 Yinglung Knife T1 342 zweimal (beide Kit-Slots)**. Drei Type-50-Teile lösen den bestehenden Yinglung-Dreierbonus aus, während Redeemer Armor Intellekt/Ultimate-Energieeffizienz als Off-Piece liefert. **Übergangsversion vor neuen 1.6-Gear-Freischaltungen, nicht Level 36/50**. Keine Verwechslung mit den bisher nicht numerisch belegten neuen v1.6-Gauntlets; Blueprint-Besitz und Gebiet bleiben tatsächlichen offiziellen Freischaltungen unterworfen. Die bisherigen Balanced-, Max.-DMG- und Max.-Buffs-Meta-Builds bleiben an Position 1–3, Early Access als Position 4. `overview.featuredBuildId: si-balanced` bleibt unverändert.
3. **Meta-Grid** hat global zwei Spalten am Desktop/Tablet und eine Spalte unter 681 px. Auf Si ergeben vier Cards eine **2 × 2**-Anordnung, mit Early-Access-Kennzeichnung in gedämpftem Warmgold. `operatorGuideSchema.ts` erlaubt `early-access` als weiteren `metaTag`, erfordert weiterhin `meta:true`. Alle relevanten Frontend-/Guide-Template-/Browser-/Node-Tests werden angepasst.
4. **Nächste Entwicklungsphase – v1.6-Ausrüstungsdaten vervollständigen:** Die weitere öffentliche Quellenrecherche hat die Base-Stats von fünf neu erschienenen Type-50-/Eternal-Xiranite-Teilen, interne Community-Itemcodes und den problematischen `Gauntlets`-/`Gloves (03)`-Namenskonflikt genauer dokumentiert, **nicht** als offizielle numerische SKPORT-Daten ausgegeben. Einzelwerte und Quell-URLs im Anhang `docs/si-v16-gear-followup-20261016.md` §5. Bevor `items.json`/`equipment-details`/Build-Finder verändert werden, ist **ein neuer offizieller anonymer SKPORT-Katalog-/`item/info`-Abgleich erforderlich**. Eindeutige numerische IDs, Rezept-IDs, Materialkosten, Gebiet, Story und individuelle Blaupausenfundorte bleiben offen und dürfen nicht aus Wiki-Namensähnlichkeiten rekonstruiert werden.
5. **Abnahme-Gates abgeschlossen:** [PR #37](https://github.com/Ag0n1st/ag0n1st.github.io/pull/37) auf Feature-Branch; [CI #165](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38946502828) vollständig **success**: **127/127 Node-Tests**, Astro-Build, Endfield-Budget exakt **21.993.992 / 100.000.000 B** (1.087 Dateien, **78.006.008 B frei**), gesamter Pages-`dist/`-Build **18.989.307 / 1.000.000.000 B** (994 Dateien, **981.010.693 B frei**), echte Chromium-Abnahme **1440/390 px** für Liino/Typhoeus/Si. Verifiziert: alle vier Si-Meta-Tags, 2 Desktop-Spalten und 1 Mobile-Spalte, Early-Access-Icons 796/411/342×2, Stärken-/Schwächen-Cards, keine Overflow-Probleme oder erfundenen v1.6-Blueprints. **Merge/Pages:** [PR #37](https://github.com/Ag0n1st/ag0n1st.github.io/pull/37) per Squash auf `main`, Commit `130d1c17fb737ab755905023b0a2c943bad08dbc`. [Pages #284](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38946795050) auf diesem Commit: **build und deploy success**. Der folgende reine Roadmap-Nachtrag löst gegebenenfalls einen eigenen Pages-Lauf aus.

### 14.3x Vollständiger v1.6-Gear-Import: 18 statt 6 Items, echter Live-SKPORT-Abgleich und Preview-Katalog (16.10.2026)

**Neue Nutzerentscheidung:** Nicht nur sechs Si-Teile, sondern ausdrücklich **sämtliche Ausrüstungsstücke aus Version 1.6** in das Endfield-Katalogsystem aufnehmen. Der [Versionsartikel Sanctuary of Ink](https://endfield.wiki.gg/wiki/Sanctuary_of_Ink) enumeriert **18** Gegenstände in fünf Gruppen: Pulser Labs **3**, Eternal Xiranite **4**, Rift Trekker **5**, Type 50 Yinglung **3**, AIC Fieldwork **3**. Nicht mit anderer versionsübergreifender Differenz (z. B. 278 Community-Einträge vs. 258 alte SKPORT-Items) die Veröffentlichungszuordnung raten; tatsächlicher v1.6-Release-Abgleich ist die primäre feste Liste. Quelle für 17 basiswertbezogene externe Angaben: [Endfield Hub Gear Database](https://endfieldhub.org/database/gears), Datenstand 15.10.2026. **Type 50 Yinglung Gauntlets** fehlt als exakter Name in dieser Statistiktabelle und bleibt offen, nicht mit alter `Gloves` ID 411 oder `Gloves (03)` stillschweigend zusammenlegen.

**Live offiziell überprüft, ohne Accounts:** GitHub Action [Read-only v1.6 SKPORT gear catalogue probe #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38948911401) hat den offiziellen öffentlichen Katalog erfolgreich über Chrome/SKPORT-Wiki geladen (`/web/v1/wiki/item/catalog`), alle fünf Kategorien ohne Importfehler gelesen, Stand **2026-10-16**: 940 Gesamt-Items, **258 Gear**, **0/18 neue v1.6-Namen enthalten**. Die fehlenden numerischen SKPORT-ID-Zuordnungen sind damit aktuell ein echtes Quellenproblem, kein Transportfehler. Keine offiziellen Gear-Daten, Rezepte, Blaupausenfundorte oder Story-/Shop-Freischaltungen wurden vorgetäuscht. Der Workflow `.github/workflows/probe-v16-skport.yml` ist schreibgeschützt, `workflow_dispatch` zum späteren manuellen erneuten Abgleich vorgesehen; `scripts/endfield/probe-v16-skport.mjs` validiert den 18er-Sollumfang und zeigt je Name einen exakten/mehrdeutigen/fehlenden Treffer.

**Umgesetzt auf Branch `feature-endfield-v16-all-gear-20261016`:**
- Neues vollständig versioniertes `src/data/endfield/catalog/v16-gear.json` mit **18/18** Namen, englischer Spielbezeichnung, Kategorie, Slot und ursprünglichen Quellenlinks; für **17/18** die Community-Basiswerte (Attribute, Typ und Prozentwert des Effekts). Jeder einzelne Eintrag hat `officialNumericId:null`, `identityStatus: official-numeric-id-unverified`, getrennte Provenienz für Community-Werte. Der fehlende Gauntlet-Wert ist ausdrücklich `null`, nicht approximiert.
- `src/lib/endfield/itemCatalog.ts` verwendet nun den vollständigen v1.6-Katalog als Quelle für temporäre Slug-/Namensauflösung; die sechs bestehenden Si-Slugs und die aktuellen Builds funktionieren weiterhin. **Offizielle numerische Namen haben Priorität** bei gleicher Namensschreibweise; Community-Records dürfen den offiziellen Katalog nicht überschreiben. `src/data/endfield/catalog/si-release-gear.json` bleibt als alter unveränderter sechsfacher Nachweis bestehen, nicht mehr als aktiver Resolver.
- Das gemeinsame 100-MB-Endfield-Budget gilt weiterhin. Einzelne Bilder aus der Community-Wiki werden einmalig nur lokal als kompakte WebP-Dateien (240 px, max. 95 KB) gespeichert; **5 vorhandene + 6 neue + 7 fehlen**, letzteres aufgrund nachweisbarer **HTTP 429** bei [Cache Action #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38949465060). Nicht weiter aggressiv abrufen, bis der Rate-Limit-Zeitraum vorbei ist. Ein fehlendes Icon ist kein Grund, den eigentlichen Gear-Datensatz wegzulassen; keine falschen alten Icons zuordnen.
- Keine automatische Freischaltung im Build-Finder: Solange `equipment-details.json` keine bestätigten numerischen SKPORT-IDs/Rezepte enthält, bleiben diese temporären Items `unverified` und der Blaupausen-/Storyfilter konservativ gesperrt. Redaktionsseitig genehmigte Si-Builds und 6+37 Teams bleiben exakt wie vorher.
- Neues Testsuite `scripts/endfield/v16-gear.test.mjs` prüft 18 eindeutige Kennungen/5 Sets, Quell-URLs, 17 bestätigte **Community-only** Werte/1 offenen Handschuh, Vorwärtskompatibilität numerischer SKPORT-Namen sowie vorhandene lokale Symbole. `docs/v16-full-gear-import-20261016.md` enthält alle 18 Namen mit Werten und Quellen, Ergebnisse der offiziellen Live-Prüfung und den genauen Übergabepunkt.

**CI-Abnahme vollständig bestanden:** [PR #38](https://github.com/Ag0n1st/ag0n1st.github.io/pull/38), [CI #167](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38949955045) Status **success**: **131/131 Node-Tests**, kompletter Astro-Build, Endfield-Budget **22.096.502 / 100.000.000 Byte** (1.097 Dateien; 77.903.498 Byte frei), Pages-`dist/`-Budget **19.066.039 / 1.000.000.000 Byte** (1.000 Dateien; 980.933.961 Byte frei), echte Chromium-Prüfung 1440/390 px für Liino, Typhoeus, Si vollständig bestanden. [Erster v1.6-Icon-Cache-Lauf](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38949465060) mit zusätzlichen sechs WebPs und 131/131 Tests grün; **neuer offizieller SKPORT-Probelauf #2** ebenfalls erfolgreich, weiterhin 0/18 offizielle Gear-IDs. **Merge und Live-Deploy abgeschlossen:** [PR #38](https://github.com/Ag0n1st/ag0n1st.github.io/pull/38) Squash-Commit `4c98d72f7c2efbe2a8751ea2917bbf63d1a8a86c` auf `main`; [Pages #286](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38950223371) auf diesem Commit mit beiden Jobs **build/deploy success**. Anschließender reiner Roadmap-Abschluss-Commit löst einen separaten Pages-Lauf aus, ohne neue Funktionsänderungen.

**Nächster fachlicher Gate nach Staging:** Sobald der anonyme SKPORT-Gear-Katalog die v1.6-Artikel wirklich publiziert, die **18 numerischen Item-IDs und offiziellen `item/info`-Datensätze** einzeln verifizieren (Name, Slot, Icon, Attribute), `equipment-details.json`/Katalog aktualisieren und Blueprint-/Rezept-/Gebietsbelege einzeln anbinden. Nicht nur nach ähnlichen Community-Namen zuordnen. **Das ist noch nicht erfolgt**, weil die offizielle Quelle 0/18 enthält. Siehe `docs/v16-full-gear-import-20261016.md` und `docs/si-v16-gear-followup-20261016.md`.

### 14.3y Internationalisierung DE/EN, echte englische Endfield-Guides und SEO (17.10.2026)

**Nutzerziel:** Englisch als zweite Website-Sprache für internationale Community-Beiträge, offizielle englische SKPORT-Termini statt rückübersetzter Spielbegriffe, eigene übersetzte Redaktion, bessere englische Auffindbarkeit in Google. Deutsche Original-URLs bleiben **unverändert**, keine Redirects oder Accounts, weiterhin Astro/Pages static. Umsetzung auf Feature-Branch `feature-en-i18n-seo-20261017`.

**Technik/SEO:**
1. `astro.config.mjs` hat als `site` nun **https://ag0n1st.com** statt der GitHub-I/O-Subdomain; `src/lib/i18n/site.mjs` deklariert ausschließlich **tatsächliche** DE-EN-Routenpaare. Deutsch `/endfield/operatoren/{slug}/` bleibt für vorhandene Links und SEO bestehen; Englisch als `/en/endfield/operators/{slug}/`.
2. `src/components/i18n/SeoHead.astro` erzeugt pro Sprachroute **self-canonical, gegenseitiges hreflang de/en und x-default**, auf vollständige HTTPS-Customdomain-URLs. `<html lang>` pro Sprache. `src/components/i18n/LanguageSwitch.astro` zeigt DE/EN im Header und verlinkt nach Möglichkeit denselben Guide; ohne Sprachgegenstück führt EN zur klar bezeichneten englischen Homepage. Keine irreführenden Sprachalternativen zu nicht übersetzten Tools.
3. `src/pages/sitemap.xml.ts` erzeugt statische indexierbare DE/EN-Routen einschließlich publizierter Guide-Paare; `public/robots.txt` verweist auf `https://ag0n1st.com/sitemap.xml`. **Liino bleibt wie der deutsche Original-Guide Preview:** EN und DE als `noindex,follow`, keine Liino-Preview-URLs in Sitemap, keine Preview-hreflang für Google. Google-Rankings sind **nicht garantiert**; Google liest die wirkliche Inhaltssprache.
4. `src/layouts/EndfieldPlaceholder.astro` und `src/components/EndfieldNav.astro` zweisprachige Navigation, deutsche Bestands-Homes `index.astro`, `endfield.astro`, `about.astro`, `nte.astro` erhalten sichtbaren Schalter/SeoHead. Nicht übersetzte deutsche Endfield-Tools werden im EN-Nav bewusst mit **(DE)** gekennzeichnet statt scheinübersetzt. Alle bestehenden deutschen Funktionen unverändert.

**Sichtbare englische Inhalte:**
5. Neue reale SEO-fähige englische Routen `/en/`, `/en/endfield/`, `/en/about/`, `/en/nte/`, `/en/endfield/operators/` und `/en/endfield/operators/{si,typhoeus,liino}/`. `si` und `typhoeus` sind `published`, `liino` Preview.
6. Neue zentral editierbare Übersetzungsebene `src/data/i18n/en-guides.json`, zunächst drei englische **redaktionelle, sorgfältig kondensierte Guide-Fassungen** mit eigenständigen SEO-Descriptions, Überblick/Stärken/Schwächen, Build-Einordnungen, Mechaniktexten, Skillpriorität, Team- und Pull-Empfehlungen plus englischen FAQ. Freigegebene Build-IDs, Gear-IDs und Team-Listen bleiben **aus originalem deutschem Guide-Datensatz**, die tatsächlichen **offiziellen englischen Skill-Namen und Skill-Beschreibungen direkt aus importierten SKPORT-JSONs**. Dadurch keine erfundenen Skillnamen oder inkorrekt neu übersetzten Fachbegriffe. Deutsche YouTube-Videos ausdrücklich als German-language markiert.
7. **Bewusste Scope-Grenze für diese Phase:** Die gesamte 19–45 KB langen redaktionellen Guide-Rohdaten, 37 Si-Zusatzteams und der umfangreiche interaktive Build-Finder sind noch **nicht 1:1 auf Englisch** übertragen. Die EN-Seiten sind eigenständige inhaltlich nutzbare **kompakte Guide-Fassungen** (keine DE-Kopie mit EN-Flag), mit Links auf deutsche Vollversion. Die vollständige abschnittsweise Übersetzung und EN-Bedienelemente für alle neun Guide-Sektionen sind als nächste redaktionelle Phase explizit vorgemerkt; keinerlei Versprechen einer schon vollständigen Vollübersetzung. Auch andere Endfield-Tools haben noch kein freigegebenes EN-Content.
8. Geteiltes Styling `src/styles/i18n.css` ergänzt DE/EN Header und responsives EN-Guide-Layout. Tests `scripts/endfield/bilingual-seo.test.mjs` + erweiterte echte Chromium-Tests `scripts/endfield/browser-smoke.py` prüfen realen EN-Content, 1440/390, gegenseitige Redirect-freie URL-Paare, Canonical/Hreflang, SKPORT-Originaltexte, Build-/Team-IDs, noindex Preview und Sitemap.

**Ausführliche redaktionelle/Pflege-Dokumentation:** `docs/i18n-en-seo-20261017.md`. **Abnahme von PR #39 – finaler CI #176 vollständig bestanden:** [PR #39](https://github.com/Ag0n1st/ag0n1st.github.io/pull/39), [CI #176](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38983474775) **134/134 Tests (0 Fehler)**, Astro-Build erfolgreich, Endfield **22.103.774 / 100.000.000 Byte** (77.896.226 Byte frei), Pages-`dist/` **19.254.458 / 1.000.000.000 Byte** (980.745.542 Byte frei), echte Chromium-QA 1440/390 px für alte DE-Guides und neue EN-Routen, Sprachschalter, SKPORT-Originalnamen (u.a. Si Inksoul, Initial/Final Stroke, SP), 4 Si-Meta-Cards und 6 Teams, Liino Preview-`noindex`, Sitemap und Social-Share-Cover alle erfolgreich. English/German share URLs mit eigenem OG/Twitter-Image-Cover aus bestehender lokaler Asset-Bibliothek; keine neu generierten Bilder. Ältere grüne CI #169–#175 durchlaufen; **finaler Funktionsstand #176**. **Live veröffentlicht:** [PR #39](https://github.com/Ag0n1st/ag0n1st.github.io/pull/39) Squash-Commit `baebccd246ab32e8028ed0750fb214e6a499092d` auf `main`, [Pages #289](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38983640837) auf genau diesem Commit **build + deploy success**. Anschließender reiner Roadmap-Abschluss löst ggf. einen separaten Pages-Lauf aus.

### 14.3z Korrektur der globalen EN-Website – PARITÄT statt eigenem Mini-Guide (17.10.2026)

**Anforderung aus Nutzerreview:** PR #39 (erstes Englisch) war **nicht** in der gewünschten Form: eigene verkürzte EN-Guide-Seiten mit neuen Cards/Anordnungen statt komplett identischem DE-Guide-Template, EN-Navigation führte bei bislang DE-only Reitern zurück auf Deutsch; „(DE)“-Suffix unzulässig; Sprachschalter streckte sich auf die Höhe des Nav-Flexcontainers. **Neue bindende Zielsetzung:** Gleiche Website/Design/9-Section-OperatorGuide-Astro-Komponenten, gleicher vollständiger Build-Finder, identische Card-Layouts/Tabellen/Teams/Akkordeons/Interaktionen in beiden Sprachen; **nur sichtbare UI-Texte, redaktionelle Felder und SEO/Titel übersetzen**. Alle Seiten und Platzhalter besitzen je ein echtes EN-Gegenstück; Navigieren in der EN-Variante behält `/en/` bei, DE-URL unverändert. Kein Zugriff auf Bildgeneratoren, keine Assets neu erstellen. Branch `feature-global-en-parity-20261017`, PR [#40](https://github.com/Ag0n1st/ag0n1st.github.io/pull/40) zunächst *Draft* bis Browser-/Budget-Gates grün.

**Technische Umsetzung und Source-of-Truth:**
1. `src/lib/i18n/site.mjs` pflegt nun eine vollständige Paarung der bestehenden DE-Haupt- und Unterseiten (`/en/`, `/en/endfield/`, `/en/endfield/operators/`, `/en/about/`, `/en/nte/` plus EN-Versionen **factory, recruitment, refinement, essences, speedruns, checklist, countdown** und alle Operator-Slugs). `src/components/EndfieldNav.astro` nutzt für **alle neun Tabs** EN-Links, ohne „(DE)“-Label. Jede zunächst inhaltlich unfertige Kategorie hat den englischen Platzhalter `src/pages/en/endfield/<route>/index.astro` mit normalem gemeinsamem `EndfieldPlaceholder`-Layout; Navigation bleibt dabei EN.
2. `src/styles/i18n.css` erzwingt für `.language-switch` **34 px Desktop / 32 px Mobil**, `align-self:center`, keine Höhe des Eltern-Flexcontainers. Ziel: visuell exakt buttonähnlich, ohne Navbar-Höhenversatz oder Überlauf.
3. **Landing Page und Endfield-Hub sind jeweils *ein* wiederverwendetes Originaldesign, nicht zwei unabhängige EN-Recreations:** Vorheriges deutsches `src/pages/index.astro` wird zu `src/components/pages/HomePage.astro` mit `lang`-Prop; bestehendes Hero-Grid, Twitch-Embed/Live-Offline, letzter YouTube-Feed, Beiträge und JS bleiben exakt erhalten. Beide DE/EN-Seiten sind nur Wrapper. Vorherige `src/pages/endfield.astro` als `src/components/pages/EndfieldHome.astro`, alle acht Original-Teaser-Sections inklusive Card-Gestaltung und EN-Lang-Links; ebenfalls zwei Wrapper. Der Operatorenindex ist gemeinsames `src/components/pages/OperatorIndex.astro` mit exakt denselben Operatoren-Cards. `/en/about/` und `/en/nte/` wurden bewusst vom jeweiligen DE-Originallayout abgeleitet, nicht über anders gestaltete neue EN-Karten.
4. **Originales OperatorGuide-Template *identisch* für DE und EN:** `src/pages/en/endfield/operators/[slug].astro` ruft **dieselbe** `src/components/operator/OperatorGuide.astro`-Instanz mit `lang="en"` auf, die intern dieselben Komponenten `OperatorOverview`, `OperatorKit`, `OperatorSkills`, `OperatorWeapons`, `OperatorEquipment`, `OperatorPotentials`, `OperatorTeams`, `OperatorGameplay`, `OperatorConclusion` rendern. Kein paralleles Mini-Guide-HTML, keine separaten Layout-Container. Alle 9 Guide-Sektion-IDs bleiben gleich; native Build-Finder/Filter/Team-Role-Filter/Waffentabs/Potentialtabellen/Skill-Rank-Selektor/Gliederung und alle vorhandenen Karten bleiben in beiden Sprachen exakt gleich.
5. `src/lib/i18n/guideUi.ts` enthält ~198 übersetzte **UI-Labels/Erklärungen/Fehler-/Hinweise** als Sprachwörterbuch; diese werden durch `guideText(model.lang,...)` im *gleichen* Astro-Markup ersetzt, und `src/lib/endfield/operatorGuideModel.ts` wählt native englische Skill-Slot-Namen, Rollen, Rating-Beschreibungen u.ä. aus. Build-Finder-JS übersetzt seine dynamischen UI-Statusmeldungen im EN-Modus, ohne Presets, Algorithmus, gespeicherte lokale Fortschrittswerte oder Gear-IDs zu verändern.
6. **Alle redaktionellen Guide-Felder**, nicht bloß Overview und 3 Meta-Builds, wurden für Liino, Typhoeus und Si in einer einzigen editierbaren Datei `src/data/i18n/en-guide-content.json` als statischer vollständiger Übersetzungsstand abgelegt (ca. 133 KB). Die einmalige Offline-Batch-Übersetzung basierte auf den DE-`src/content/operator-guides/{slug}.md`, umgesetzt durch `scripts/endfield/translate-operator-guides.py` und GitHub Actions `.github/workflows/translate-guides-en.yml` (erster Lauf scheiterte an ungültigem Python-Regex, korrigierter [Lauf #2](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38985046264) erfolgreich, JSON ins Feature-Branch committed). Kein Live-Übersetzungsservice auf der Website. `src/lib/i18n/operatorGuide.ts` ersetzt die redaktionellen Strings beim Generieren der EN-Guide-Route, validiert Builds, Items und Team-ID-/Reihenfolgen gegen die originale deutsche Quelle und übernimmt englische Original-SKPORT-Fertigkeitsbeschreibungen (DE-Locale nur auf DE). Vollständige Si-Teamstruktur **6 Meta + 37 weitere**, alle 9 Equipment-Builds, Skill-/Waffen-/Potenzialtabellen erhalten. Vorhandene deutsche Redaktion und originaler SKPORT-Katalog bleiben unverändert. **Qualitätshinweis:** Maschinenübersetzung ist zunächst ein *redaktionell zu prüfender Rohstand*, kein von Menschen vollständig Korrektur gelesener englischer Guide. Si- und Liino-Spielmechanik-Kernabschnitte wurden manuell auf offizielle Begriffe korrigiert: SP, Inksoul, Initial Stroke, Final Stroke, Artful Intent, Fully Envisioned, Proxy's Patronage etc. Weitere Sprachglättung ohne Änderungen an Spielwerte-/Build-Logik ist nach QA möglich.
7. `src/pages/sitemap.xml.ts` und ursprüngliches SEO-Schema mit Customdomain `ag0n1st.com` bleiben erhalten; alle echten EN-Placeholderseiten indexierbar als korrekte Sprachversionen, Liino weiterhin Preview/`noindex` und aus Sitemap ausgeschlossen. Kein Wechsel zurück zu deutscher Guide-URL in der Navigation. Post-URLs erhalten EN-Helfer; aktuell nur ein unpubliziertes Posts-Template.

**Regression & Freigabe-Gates:** Alte Node-Testassertions, die wortwörtliches deutsches HTML erwarteten, wurden auf `{t(...)}` der gemeinsamen Komponenten umgestellt. Erweiterter Chromium-Check unter `scripts/endfield/browser-smoke.py` prüft alle EN-Pfade, jeder Endfield-Tab durchgehend EN, Sprachschalterhöhe, unverändertes Home Hero/Twitch/YouTube-Grid, Endfield alle 8 Teaser, deutsche Seiten identisch, EN-Si alle 9 Guide-Sektionen inkl. 4 Meta-Cards/9 Builds/6 Meta-Teams/37 zusätzliche Teams, native Build-Finder-Interaktionen, SKPORT Original English Skills, Typhoeus-/Liino-Parität, Preview-`noindex`, XML Sitemap und **1440/390px** ohne horizontales Overflow. Zu jeder Version gehört `npm run test:endfield`, `npm run build`, Endfield ≤100.000.000 B, Pages `dist/` ≤1.000.000.000 B, und kompletter Pages-Deploy. **PR #40 bleibt bis zu einer echten vollständig grünen CI als Draft**, keine vorschnelle Veröffentlichung. Endgültige Testzahlen/Budgets, PR/Commit/Deploy nachtragen.

**Spätere Pflege:** Wenn deutsche Guide-Redaktion angepasst wird, `en-guide-content.json` redaktionell synchronisieren und gleichbleibende strukturierte IDs/Team-Layouts garantieren; keine riskante automatische Live-Übersetzung. Bei neuen Seiten **immer gleichzeitig DE und EN Route/Placeholder** in `site.mjs` ergänzen. Originale DE-Sektionen bleiben alleinige Layoutquelle. Dieses korrigierte Modell ersetzt die abweichende Erstentscheidung aus §14.3y verbindlich.

### 14.3aa EN-Website komplett in der Originalstruktur – Release & Abschlussprüfung (17.10.2026)

**Veröffentlichung:** [PR #40](https://github.com/Ag0n1st/ag0n1st.github.io/pull/40) nach erfolgreichem Review der kompletten englischen Routen und Guides von Draft auf *Ready* gestellt und per **Squash Merge** in `main` übernommen: **Commit `cae871aa1cbb90d510cce68ae7168cb7f303e896`**. [GitHub-Actions-CI #38989193480](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38989193480) für PR-Head `72efccae0c0915c32121bef65f709492d5844dce` **success**: **134/134 Node-Tests**, Astro-Build, **alle DE/EN-Seiten in echtem Chromium bei 1440px und 390px**, weder seitlicher Overflow noch defekte Sprachrouten, technische Funktion von Skill-Rank-Selektionen, geschlossenen Accordions, nativen Filtern, lokalen Blueprint-Presets und Guide-Navigation. **Endfield-Budget `22.124.380 / 100.000.000 B` (22,12 %)**, gesamte generierte Website `20.299.164 / 1.000.000.000 B` (2,03 %). [GitHub-Pages-Deploy #38989332978](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38989332978) bei genau diesem Squash-Commit: **build success / deploy success**.

**Konkretes Ergebnis (verbindlicher neuer Standard):**
- **Eine Original-Template-Struktur für beide Sprachen:** `src/components/operator/OperatorGuide.astro` und sämtliche neun Sections, Cards, Tabellen, Rollover, Bildquellen, Waffen-/Potenzialwerte, 4 Si-Meta-Cards, 9 Si-Ausrüstungs-Builds, 6 Si-Meta-Teams sowie 37 zusätzliche Si-Teams in **identischer** Anordnung. Kein separates EN-Mini-Guide-Layout, keine neue EN-Designsprache. Das englische Vollguide-Snapshot `src/data/i18n/en-guide-content.json` liefert statische EN-Prosa. `src/lib/i18n/operatorGuide.ts` ersetzt ausschließlich klar definierte **Textfelder**; IDs, Teams, Ausrüstungs-Requirements, Ratings, offizielle SKPORT-Informationen, Links, Reihenfolgen, Zod-Defaults und Werte bleiben aus dem deutschen geprüften Guide. Offizielle englische SKPORT-Fertigkeitsnamen/-Beschreibungen bleiben Originaltext statt Maschinenrückübersetzung; Spracheinträge enthalten denselben Datenstandsvermerk.
- **Gemeinsame Layoutkomponenten auch außerhalb der Guides:** `HomePage.astro` ist die eine Quelle für beide Startseiten (inklusive Twitch, YouTube, Grid/Video), `EndfieldHome.astro` ist die eine Quelle für beide achtteiligen Übersichten und `OperatorIndex.astro` für dieselben Operator-Preview-Cards. `/en/about/` und `/en/nte/` übernehmen das Layout des DE-Platzhalters mit englischem Inhalt. `/en/endfield/factory/`, `recruitment/`, `refinement/`, `essences/`, `speedruns/`, `checklist/`, `countdown/` besitzen jeweils englische Platzhalter und echte Routen unter derselben Navbar.
- **Globale Sprache** `src/components/i18n/LanguageSwitch.astro`: Sprachauswahl für alle aktiven Haupt- und Endfield-Seiten (gespeichert im Browser unter `localStorage["ag0n1st:site-language"]`). Bei später aufgerufenen deutschen Adressen führt gewähltes EN automatisch zum korrespondierenden EN-Pfad; explizites Umschalten auf DE wird ebenso gespeichert. Alle neun EN-Endfield-Reiter bleiben in EN; `(DE)`-Labels entfallen. Verifiziert im echten Browser bei 1440/390px inkl. Klick zurück auf DE. Schalter-Höhe Desktop **34px** / Mobil **32px** statt Streckung auf die volle Flex-Containerhöhe.
- **Keine erfundenen Gegenstücke:** Der zusätzliche EN-Characters-Alias und die Abbildung auf die gar nicht existente DE-`/endfield/charaktere/`-Seite wurden entfernt. Die echte und einzige Charakter-/Operatorenübersicht ist `/endfield/operatoren/` ↔ `/en/endfield/operators/`. Alle Header-/SEO-`hreflang`-Referenzen bleiben paarweise existent. Liino bleibt in beiden Sprachen **Preview/noindex**, keine irreführende Veröffentlichung. `robots.txt`, kanonische Domain und die dynamische XML-Sitemap bleiben gültig.
- **Englische Texte:** Sämtliche eingebundenen Guide-Redaktionsfelder für Si, Typhoeus und Liino sind übersetzt; nach dem maschinellen Erststand wurden komplette statt verkürzter Fazittexte, Skills, Mechanikbegriffe und bisher DE-gebliebene Waffenvergleichs-/Ausrüstungsoptionen korrigiert. **Qualitätseinschränkung:** Große Teile der Prosa stammen weiterhin aus dem maschinellen englischen Erstübersetzungsstand und können bei redaktionellem Review auf terminologische Feinheiten hin geschliffen werden. Beim Review keinesfalls Inhalte kürzen, strukturell neu gruppieren oder ein zweites Layout erstellen.
- **Später neue Artikel:** Es gibt derzeit **keinen veröffentlichten Post** (nur `src/content/posts/_vorlage.md`); sobald ein solcher Artikel online gestellt wird, muss gleichzeitig ein tatsächlicher englischer Body in derselben Seitenstruktur vorgesehen und der Sprachumschalter mit zwei existierenden URLs validiert werden. Auf Dauer keine Englische Route auf eine fehlende Seite zeigen; niemals deutschen Fließtext auf einer EN-Seite als Ersatz ausgeben.
- **Lokaler Betrieb:** Alles bleibt GitHub Pages / Astro / Dateiedition im Repository ohne Backend oder Login. Ein neuer Operator erhält DE-Content + EN-Textübersetzung in derselben Schema- und UI-Struktur; alle neuen EN-Seiten bekommen gleichzeitig EN-Navigation/SEO/Browser-Test. Keine dauerhafte Übersetzungs-API oder vom User nicht gewollte Bildassets.

**Nächster fachlicher Schritt:** Nutzer kann die tatsächliche Live-Version über `https://ag0n1st.com/en/`, `https://ag0n1st.com/en/endfield/`, `https://ag0n1st.com/en/endfield/operators/si/`, `.../typhoeus/` sowie `.../liino/` gegen die DE-URLs prüfen. Weitere Arbeiten betreffen **sprachliche Feinredaktion anhand deutscher Originaldaten** und später den Aufbau zusätzlicher Guides oder neuer Seiten; die komplett gleiche Gestaltung/Features sind eine dauerhafte Vorgabe. Nicht selbständig eine neue Designvariante anlegen.

### 14.3ab Zweisprachige Guide-Feeds, Tierlist und redaktioneller Si-Gear-Cleanup (17.10.2026)

**Nutzerentscheidung / dauerhafte Regel:** Jede zukünftige Änderung der Website ist **gleichzeitig auf Deutsch und Englisch** umzusetzen, nicht nur bei neuen Guides. Gemeinsame Astro-Components bleiben Grundlage; falls eine neue Route entsteht, beide Sprachpfade, Navbar, SEO-Hreflang, Sitemap und 1440/390px Chromium-Checks gemeinsam erstellen. Layout darf nicht unbemerkt zwischen DE/EN abweichen. Implementierung auf Branch `feature-bilingual-guide-feed-tierlist-20261017`, [PR #41](https://github.com/Ag0n1st/ag0n1st.github.io/pull/41).

**Aktuelle Änderungen:**
1. **Si Ausrüstung / Gear:** Aus `src/content/operator-guides/si.md` sind `equipment.generalNotes` (interne Informationsstände zur noch fehlenden offiziellen Mapping-/Blueprint-/Item-Namenszuordnung) sowie sämtliche `craftingNotes` zu SKPORT-ID-Import, Community-Wiki-Namenskonvention und interner Recherche gestrichen. Das korrespondierende EN-Snapshot `src/data/i18n/en-guide-content.json` wurde äquivalent bereinigt; beide Sprachen bleiben inhaltlich parallel. Die bislang zusätzlich bei unverifiziertem Equipment eingeblendete technische `Neue Ausrüstung: Gegenstände und Bilder vorläufig ...`-Warnung entfällt im gemeinsamen `OperatorEquipment.astro`. **Wichtig:** Ehrliche mechanische Prüfungen, die tatsächliche Verfügbarkeit der Blaupausen und die `unverified`-Bewertung im Build-Finder bleiben erhalten; kein als sicher bestätigter Erwerb wird fingiert. Englisch verwendet für den Abschnitt und die TOC-Bezeichnung **`Gear`** anstelle `Equipment` (`guideUi.ts`, `OperatorGuide.astro`). Deutsch heißt weiterhin `Ausrüstung`.
2. **Release-Sortierung der Operatoren-Cards:** `OperatorIndex.astro` nutzt `getOperatorsByRelease()` statt der bisherigen alphabetischen Namenssortierung. Sortierschlüssel ist die tatsächliche **Release-Date** des Spielcharakters (separat vom Redaktionsupdate-Datum), absteigend. Vorhanden: **Si (15.10.2026) → Typhoeus (02.09.2026) → Liino (09.08.2026)**. Quellen: offizielle Gryphline-Version-1.6-Mitteilung, offizielle Endfield 1.5 Typhoeus-Rekruteröffnung, Archiv der Bannereröffnungen für Liino. Bei künftigen Guides Release-Datum aus zuverlässiger Quelle verifizieren, nicht schätzen. Gemeinsame Index-Komponente gewährleistet identische Reihenfolge in DE/EN.
3. **NEUE Sekundärseite Tierlist:** `src/pages/endfield/tierlist/index.astro` ↔ `src/pages/en/endfield/tierlist/index.astro`, jeweils Original-`EndfieldPlaceholder` mit lokalisierten Titeln; Sekundärnav enthält `Tierlist` / `Tier List` nun als eigenen Tab nach den Operatoren. Der Endfield-Hub enthält eine eigene zweisprachige Tierlist-Section; insgesamt neun statt acht Überblicksektionen und zehn statt neun Sub-Navbar-Tabs. `src/lib/i18n/site.mjs` mit echtem reziprokem `hreflang`-Paar, `sitemap.xml.ts` um die deutsche/englische Tierlist-Route ergänzt. Später hier ausschließlich gemeinsam im Stream erarbeitete Rankings aufnehmen, keine erfundene bestehende Tierlist.
4. **Automatische »Letzte Beiträge« auf DE-/EN-Startseite:** `src/lib/content/guideFeed.ts` liest `getCollection("operator-guides")` direkt aus den Guide-Dateien. Neue optionale Metadaten `listing` in `operatorGuideSchema.ts`: `releaseDate` (für Operatoren-Sortierung), `listedAt` (erstmalige Veröffentlichung in diesem Karten-Feed), `category`, `summaryDe`, `summaryEn`, `visible`. Die drei aktuellen Guides wurden mit `listedAt: 2026-10-17` und den offiziellen Release-Tagen registriert. Die Startseiten erhalten automatisch drei neueste Guides nach `listedAt` absteigend, bei gleichem Tag nach Charakter-Release absteigend, derzeit **Si, Typhoeus, Liino**; ein späteres redaktionelles `updatedAt` verändert die erstmalige Listing-Reihenfolge nicht. Liino als ausdrücklich gewünschte Preview bleibt mit vollständiger bestehender öffentlicher Detail-URL Teil der Auswahl, aber weiterhin `noindex`.
5. **Nur EINE bilinguale Card-/Datenquelle statt HTML-Kopien:** `src/components/GuideTeaserCard.astro` wird gleichzeitig in `HomePage.astro` (»Letzte Beiträge«; maximal drei übergreifend) und in `EndfieldHome.astro` (drei neue Endfield-Operatoren-/Guide-Verweise, statt des großen generischen Operatoren-Buttons) verwendet. Vollflächig klickbare Card; Kategorien-Label als **quadratische Kachel rechts**, lokalisiert **»Charakter« (DE) / »Character« (EN)**, kurze separat gepflegte Untertitel, der Klick führt **direkt** zur DE/EN-Guide-Detailseite. Responsives 3/2/1-Cards-Grid per `src/styles/global.css`; unter Endfield bleibt Link »Alle Charakter-Guides ansehen / View all character guides«.
6. **Erweiterbarkeit für andere Spiele/Guide-Kategorien:** `getGuideFeed` kombiniert künftig auch veröffentlichte `src/content/posts/*.md` mit optionalen `feed`-Metadaten `category` aus `character|gameplay|factory|systems|news`, `titleEn`, `summaryEn`, `hrefDe`, `hrefEn`, `listedAt`, `game`. Posts werden nur mit tatsächlichen freigegebenen Seiten in beiden Sprachen hinzugefügt. Für neue Operatoren genügt dagegen der `listing`-Block im eigenen Guide-Markdown plus die synchronisierte englische Redaktion; **kein zusätzlicher Post** mit redundanter Pflege erforderlich. Durch Aufnahme und nächstes Astro-Build erscheinen die neuen Cards auf beiden Seiten automatisch, wenn sie zu den neuesten drei gehören. `src/content/operator-guides/_template.md`, `src/content/posts/_vorlage.md` und `docs/operator-guide-workflow.md` ausführlich ergänzt. Bestehende Posts ohne freigegebene EN-Gegenstücke werden nicht irreführend unter EN gelistet.
7. **Regression-Absicherung:** `scripts/endfield/guide-feed.test.mjs` prüft Metadaten, Releasedates, echte DE/EN-Tierlist-Routen, Square-Category-Labels/Komponentenparität, Entfernen interner Si-Hinweise, Sprachbezeichnungen und Autoren-Workflow. `scripts/endfield/browser-smoke.py` prüft in echten Desktop-/Mobile-Chromium-Viewportgrößen: 10 Nav-Tabs, neun Endfield-Sections, beide Tierlist-Platzhalter, jeweils 3 neue Cards auf beiden Home- und Endfield-Seiten, Si/Typhoeus/Liino in der richtigen Reihenfolge, direkte Sprachlinks, rechte quadratische Character/Charakter-Kachel, Si-Gear ohne SKPORT-Item-ID-Provenienz und ohne Layout-Überlauf. Die bisherigen 134+ Tests und bestehenden SKPORT/Gear/Story-Budgets bleiben obligatorisch.

**Abnahme noch ausstehend:** nach vollständiger grüner CI inklusive `npm run test:endfield`, Astro Build, Endfield ≤100.000.000B, Pages `dist/` ≤1.000.000.000B, Browser 1440/390px PR #41 squash nach `main`, erfolgreichen Pages-Deploy prüfen, konkrete Zahlen/Run-IDs/Commits hier nachtragen.

## 15. WICHTIGE LINKS UND QUELLVERWEISE

**Repository & Auslieferung:**
- GitHub: https://github.com/Ag0n1st/ag0n1st.github.io
- GitHub Actions: https://github.com/Ag0n1st/ag0n1st.github.io/actions
- GitHub Pages: https://ag0n1st.github.io
- Eigene Domain: https://ag0n1st.com

**Fachdokumente im Repository:**
- [Liino P2 – Spielweise, Skills und Waffen (Rechercheentwurf, nicht freigegeben)](docs/liino-p2-kit-skills-weapons-draft-20261016.md)
- [Meta Builds: Autorenanleitung, Datenmodell und Layout](docs/operator-guide-workflow.md#meta-builds-im-gemeinsamen-operator-guide-framework)
- [Liino – vom Creator festgelegte Builds](docs/liino-approved-builds-20261016.md)
- [Liino – historische Build-Recherche (überholt)](docs/liino-build-proposals-20261016.md)
- [Vollständiger PDF-Konversationsabgleich](docs/website-conversation-audit.md)
- [Guide-Pflege](docs/operator-guide-workflow.md)
- [Endfield-Importer/Asset-Handbuch](scripts/endfield/README.md)
- [Offizielles Gebietsregister](docs/endfield-story-progression.md)
- [Aktuelle Filterlogik](docs/endfield-story-build-filter.md)
- [Kisten-/Community-Recherche](docs/endfield-blueprint-research.md)
- [Einzelteilgenauer Kisten-/Konfliktreport](docs/endfield-blueprint-piece-audit.md)

**Quellen für zukünftige Aktualisierungen:**
- Offizielle SKPORT-Wiki: https://wiki.skport.com/endfield
- Offizielle SKPORT Map Tools: https://game.skport.com/map/endfield
- Offizielle Publisher-Seite: https://endfield.gryphline.com/
- Konkrete Community-Kistenlisten: https://endfield.wiki.gg/wiki/Gear
- Individuelle Community-Ausrüstungsquellen: https://endfieldhub.org/database/gears
- Einzelne weitere Quellen inklusive URLs stehen mit Nachweiskategorie in `blueprint-community-claims.json`.

**Hinweis zur Beweiskraft:** Ein Link in diesem Kapitel garantiert keine Datenaktualität. Bei Versionen und neueren Spielinhalten immer Quellstand, Datum und konkrete Einzelteil-IDs erneut prüfen.

---

## 16. ENTSCHEIDUNGSLOG (FORTSCHREIBEN!)

| Datum | Entscheidung | Begründung / Folgewirkung |
| --- | --- | --- |
| Oktober 2026 | Astro + GitHub Pages, primär `main`, statische Daten statt Login-CMS | Günstig, kontrollierbar, Textdateien unabhängig pflegbar. |
| Oktober 2026 | Deutsch zuerst; Magenta/Cyan, Geist; keine automatischen Website-Bilder im Chat | Einheitliche CI und klare Autorisierung von Assets. |
| Oktober 2026 | „Operatoren“ statt „Charaktere“ | Einheitliche Endfield-Begrifflichkeit und URLs. |
| Oktober 2026 | Neun einzelne Guide-Abschnitte; Redaktion getrennt von SKPORT-Daten | Wiederverwendbarkeit und Schutz eigener Texte. |
| 15.10.2026 | Offizielle Gear-Daten vollständig anhand STANDARD-Rezepten auswerten | Gleicher wissenschaftlich überprüfbarer Datenstand für jeden Build. |
| 15.10.2026 | Sieben gestaffelte Herstellungs-Komponenten, Pyrrolit als Default | Level 70 allein ist für die Fabrik kein ausreichender Fortschrittsmaßstab. |
| 15.10.2026 | 100-MB-Endfield-Budget, kategorisierte WebP-Verzeichnisse | GitHub-Pages-Tauglichkeit und nachvollziehbare Dateiorganisation. |
| 15.10.2026 | Story-/Gebiets-/Blaupausenfortschritt getrennt speichern | Nebenmissionen, parallel zugängliche Gebiete und tatsächlicher Besitz sind verschiedene Dinge. |
| 15.10.2026 | Community-Kistenforschung zuerst auf **einzelne Gear-IDs** präzisieren | Setnamen allein verursachen falsche oder mehrdeutige Gebietszuordnungen. |
| 15.10.2026 | Autoritätslevel **maximal 60**, nicht 200 | Aktuell vom Nutzer bestätigte Spielobergrenze; Input/Validierung/Tests müssen übereinstimmen. |
| 15.10.2026 | `ROADMAP.md` als zentrale, regelmäßig gepflegte KI-Übergabedokumentation | Neues Chatfenster/andere KI soll ohne Verlust alter Anforderungen und Beschlüsse fortsetzen können. |
| 16.10.2026 | Alle Website-Chats **ausschließlich textbasiert**; 75-seitiges PDF-Archiv im eigenen [Konversationsaudit](docs/website-conversation-audit.md) ausgewertet | Höhere Genauigkeit bei historischer Entscheidungskette; spätere Beschlüsse gelten vor verworfenen Entwürfen, keine Bilder ohne gesonderte ausdrückliche Bitte; jeder Entwicklungsfortschritt inklusive PR/CI/Übergabe in ROADMAP fortschreiben. |

| 16.10.2026 | In jeder Build-/Ausrüstungsübersicht **offizielle Gear-Namen plus ID** gemeinsam aufführen | Creator kann eine Nummernfolge ohne Namen nicht sinnvoll bewerten. Liino-Freigabeübersicht in `docs/liino-build-proposals-20261016.md` entsprechend ergänzt; Guides weiterhin unverändert und nicht freigegeben. |

| 16.10.2026 | **Liino-Builds A–F konkret vom Creator festgelegt und für die redaktionelle Ausrüstung freigegeben** | A Ultimate `1134/1138/1236/365`; B Balanced `1134/1133/365/365`; C Will `1126/1129/365/365` (volle Anfangs-ULT, keine zweite); D Lv. 60 `1117/1123/1120/1120` (doppelter Ember statt Heal); E/F unverändert. Namen/IDs und Kontexte: `docs/liino-approved-builds-20261016.md`. Weitere Guide-Abschnitte bleiben Preview. |
| 16.10.2026 | Technische Build-Finder-Integration B1–B3 auf Feature-Branch umgesetzt, **QA/Deploy noch offen** | ID 1138 itemgenau als Gloves normalisiert; echte Builds innerhalb Preview zugelassen; 1/1/2-Slotprüfung, Unit-Tests und Blueprint-Doppelstückregeln. |

| 16.10.2026 | Liino A–F über **PR #16** nach grünem CI #76 auf `main` gemergt | Commit `3ace991ff18781207fe8970c0fdfc62e8e52e682`; 66/66 Node-Tests grün nach Legacy-Fixture-Korrektur, Budget/Build erfolgreich; Pages-Deploy und Browser-Smoke-Tests getrennt offen. |

| 16.10.2026 | **Meta Builds** als kompakte, redaktionell markierte Cards **vor dem Build-Finder** im gemeinsamen Operator-Guide-Framework | Build-Feld `meta` (Default `false`), `metaSummary` (Pflicht bei Meta, max. 280 Zeichen), dieselben offiziellen Item-IDs/Namen/Icons; Liino A/B/C Meta, D/E/F weiterhin ausschließlich im Finder; keine separate Datenhaltung. Implementierungs-/Abnahmestand §14.3d. |

| 16.10.2026 | **Meta Builds für alle Operatoren** über [PR #17](https://github.com/Ag0n1st/ag0n1st.github.io/pull/17) integriert und CI #77 bestanden | Merge `028463f6cca530d888510d4fa3969e29c962b557`; `meta: true` + kurze `metaSummary` nur bei Liino A/B/C, D/E/F im Finder; responsives Card-Raster mit 4 offiziellen Itemnamen/Icons, Card-Link selektiert bestehenden Finder-Build. Realer Pages-Deploy/Browser-Check weiterhin offen. |

| 16.10.2026 | **Build-Finder standardmäßig eingeklappt und alle Komponenten/Blaupausen/Gebiete als Maximal-Vorauswahl** | Creatorentscheidung nach eigener Layout-Prüfung: weniger Information Overload, fortgeschrittene Spieler sofort fertig ausgewählt; Anfänger können alle Parameter separat herabsetzen. HTML-`details`, Meta-Link klappt auf, keine Kontosynchronisierung. `localStorage v2` speichert Abwahlen und ausgewählte Level/Fabrik, bestehende v1-Anpassungen haben Vorrang; weitere Details §14.3e. |

| 16.10.2026 | **Build-Finder-Accordion + Maximal-Vorauswahl** nach grünem CI #80 über [PR #18](https://github.com/Ag0n1st/ag0n1st.github.io/pull/18) auf `main` gemergt | Squash-Commit `c63b4e93dfe9846c6a00fca0f4666ed29cf14122`. Native `details` zunächst geschlossen, Links öffnen; Max-Preset und `localStorage` v2 mit Abwahlmodell/Migration; Budget/Tests/Astro-Build `success`. Browser-/Pages-Abnahme noch offen. |

| 16.10.2026 | Optionaler **Minimal-Profil-Button direkt neben Maximal-Reset** im eingeklappten Build-Finder; Max bleibt Standard für neue Besucher | Level 10/Amethyst, Region/Authority/Stock leer und alle Gebiete/Blueprints abgewählt. `localStorage v2` speichert im Minimalmodus ausdrücklich ausgewählte IDs dauerhaft, auch über andere Operator-Guides; Max speichert weiter ausdrücklich abgewählte IDs. Details §14.3f. |

| 16.10.2026 | **Minimal-Vorauswahl** zusätzlich zum unveränderten Max-Default durch [PR #19](https://github.com/Ag0n1st/ag0n1st.github.io/pull/19) auf `main` gemergt | CI #82 vollständig `success` (Tests, Budget, Build), Squash-Commit `343c8a0d0a626dc423a534bc9004d1eda971e796`. Zwei Buttons nebeneinander/mobil gestapelt; Minimalprofil 10/Amethyst, Region/Gebiete/Authority/Stock/Blaupausen leer; `selectionMode: min` speichert nur manuelle Opt-ins guideübergreifend. Neue Nutzer weiterhin automatisch Maximalprofil. Live-Pages-Deploy und echter Browsertest offen. |

| 16.10.2026 | **Liino P2 – Spielweise/Skill-Priorität/Waffen aus offiziellen SKPORT-Daten analysiert und zur Freigabe vorbereitet** | Noch **keine redaktionelle Veröffentlichung**. `docs/liino-p2-kit-skills-weapons-draft-20261016.md` dokumentiert relevante Skill-/Talentmechaniken, abgestufte Quellen, 3+3 Stärken/Schwächen, vorläufige Priorität und Waffen inklusive offizieller IDs 1046/1044/97/93/75; falsche „Golden Age F2P“-Einordnung vermieden. Nach Creatorfreigabe nach `liino.md` übernehmen. |

| 16.10.2026 | **Liino P2 – offizieller Kit-/Skill-/Waffenentwurf via PR #20 auf `main` dokumentiert** | CI **#83** erfolgreich (Tests, Budget, Astro-Build), Squash-Commit `2ec1a504844defbe9a53bc7ac39872cf3906cd9e`. Forschungs- und Autorenentwurf `docs/liino-p2-kit-skills-weapons-draft-20261016.md`; **noch NICHT Creatorfreigegeben oder in `liino.md` übernommen**. Nächster Schritt Freigabe und dann publizierbare Guide-Texte. P1-Browser-Check bleibt offen. |

| 16.10.2026 | **Liino Skill-Priorität korrigiert und Datafield als verbindliche quantitative Referenz eingeführt** | ULT M3 > BS M3 ≥ CS M3 > BATK 1, inklusive BS-ANG 10 %, CS-CD 10→8 s, Ultimate-Skalierung und Talent-FP; ins Liino-YAML übernommen. Waffen-/Potenzial-Quellenname `Datafield` ohne Hyperlink, Bedingungen + Quelle bei Prozenten Pflicht. Liino-Datafield-Seite lieferte nur Loading-Status, daher keine Prozente geraten. CI/PR/Merge-Status nachtragen. |

| 16.10.2026 | **Skill-Priorität Liino + Datafield-Quellenkonvention** über [PR #21](https://github.com/Ag0n1st/ag0n1st.github.io/pull/21) nach erfolgreicher CI #84 auf `main` gemergt | Squash `c1d049ec517d20f8e2da6cf7070861ad68aa1c2a`; Quelle + Modellbedingungen bei Waffen-/Potenzialprozenten jetzt im Schema verpflichtend und in UI als nicht verlinkter Text sichtbar. Liino ULT M3 > BS M3 ≥ CS M3 > BATK 1, Skillwerte vom offiziellen SKPORT bestätigt. Datafield-Liino-Prozentwerte weiterhin nicht auslesbar, entsprechend **nicht** übernommen. Live-Deploy/Browser QA offen. |

| 16.10.2026 | **Datafield ist doch maschinell auslesbar: echter Chromium-DOM statt statischem HTML** | Playwright/GitHub-Actions-Proben **#87/#91** lesen Liino-Skill-/Waffenabschnitte samt **5 Potenzialwerten und zwei Waffen-Teamtabellen (7+6 Varianten)**, inklusive Berechnungs-Sheet-Verweis; ein Datafield-Preloader blockiert nur Maus-Clicks, per internem DOM-Click lösbar. Quantitative Werte & Referenzen im neuen Doc `docs/datafield-rendered-extraction-20261016.md`; Browser-Script und rein manuelles GitHub-Workflow im Feature-Branch vorbereitet. Öffentliches `liino.md` bleibt bis Prüfung der genauen Datafield-Vergleichsbedingungen unverändert. |

| 16.10.2026 | **Datafield-Chromium-Exporter nach PR #22 in `main`**, CI #95 vollständig grün | Squash `c30057ae86c88be79d151c02ecfe059d2335dba4`. Probe #87/#91 lieferte Liino 5 Potenzialwerte sowie Waffenvergleich in **zwei Team-Szenarien (7+6)**. Neues read-only Python-Playwright-Script und rein manueller GitHub Actions Datafield-Workflow; normales Astro/Pages/validate unverändert. Prozentintegration in Liino-Guide wartet weiterhin auf Prüfung des Original-Spreadsheets mit Modellbedingungen. |

| 16.10.2026 | **Datafield-Charakterprofil Liino: Waffen- und Potenzialvergleiche mit Creator-Kategorien und Disclaimer** | BiS Bedazzling Night Debut (1046), BP Golden Age (1044), Alternative JET (75), F2P Cohesive Traction (97); Übersicht ohne Ränge. Zwei getrennte Datafield-Teams (Zhuang 7 Reihen, Arcane 6 Reihen), jeweils BND R4 = 100 %, 5 Potenzial-Prozente relativ zu Vorstufe. Kein Team-Hub. Disclaimer macht ungeprüfte Modellparameter sichtbar. Framework-/Code-/CI-Stand §14.3h. |

| 16.10.2026 | **Liino Datafield-CHARAKTERSEITE statt Team-Hub, inkl. Waffen- und Potenzialzahlen**, nach grünem CI #98 über [PR #23](https://github.com/Ag0n1st/ag0n1st.github.io/pull/23) in `main` | Squash `2e1a0c1be1ccc413bbc317e9e59d2548212fab79`. BiS 1046, BP 1044, Alternative 75, F2P 97 ohne Ränge in Übersicht; getrennte Datafield-Teamtabellen 7+6 Einträge (BND R4 je 100 %) und Potenziale P1..P5 incremental 3,2/0,7/0,8/0,0/4,7 %. Disclaimer zu Modellunsicherheit sowie „Quelle: Datafield“ ohne Link; Framework/Tests/Template aktualisiert. Live-Pages-/Browserkontrolle weiterhin offen. |

| 16.10.2026 | **Profil: echte SKPORT-Icons/Namen + Zugänglichkeit automatisch aus Meta-Builds; Datafield-Fußnoten minimal; keine P0-Kumulativspalte/Pull-Sektion** | Creatorentscheid vom 16.10.2026, Details §14.3i. Liino Schwierigkeit 1/5, Flexibilität 4/5, Zugänglichkeit nach offiziell verifiziertem Pyrrolit-Meta automatisch 1/5. Build-Finder, Gear/Skills und Datafield-Zahlen selbst unverändert. Feature-Branch zunächst auf CI prüfen. |

| 16.10.2026 | **Operator-Profil-Icons + automatic Meta-Zugänglichkeit und Datafield-Minimaldesign** via [PR #24](https://github.com/Ag0n1st/ag0n1st.github.io/pull/24) auf `main` gemergt | **CI #101 vollständig `success`**, Squash `05e2e5b05af093eba109bd2586913f7799ffa840`. Liino Spielschwierigkeit 1/5, Flexibilität 4/5, auto Zugänglichkeit 1/5 (Lv70 Pyrrolit, nur A/B/C). Echte Item-Namen/Icons im Profil; Datafield-Quelle als kleine Fußnote nach Tabelle; keine Quellen zu Creator-Waffen-Card/Detail, keine P0-Spalte, kein Pull-Unterabschnitt bei Potenzialen. Pages-/Browser-End-to-End offen. |

| 16.10.2026 | **Liino Traits + 4 Stärken/2 Schwächen + 2 Meta- & 3 weitere Support-Teams + FOLGT für Gameplay + finales positives Fazit** | Explizite Creatorfreigabe; im Feature-Branch `feature-liino-profile-teams-conclusion-20261016` eingetragen. Neues Guide-Traits-Feld, echtes Teamnamen-Rendering, Gameplay pending ohne Fake-Clips, `✓ Empfehlung`-Badge im Fazit. Keine neuen Videos oder erfundenen Gear-/Teamzuweisungen; Kit-Text offen, `preview` bleibt. Merge/CI nachtragen. |

| 16.10.2026 | **Liino: Traits, Stärken/Schwächen, 2 Meta- und 3 zusätzliche Support-Teams, Gameplay-FOLGT, positive Pull-Empfehlung** durch [PR #25](https://github.com/Ag0n1st/ag0n1st.github.io/pull/25) nach erfolgreicher CI **#102** auf `main` | Squash `8a50a1cd4c41db61d0f0fe4f35953a73fd15a68a`; offizielle A–F-Gear- und Skill-Inhalte unverändert. Zwei Meta-Zusammenstellungen, drei weitere Teams, alle `support`, eindeutige Mitgliedsnamen im UI. Traits EN `HP Treatment`/`Amp`. Fazitbadge `✓ Empfehlung`, Gameplay bis zu echten Videodaten `pending:true`. Live-Pages-/Browser-Abnahme offen. |

| 16.10.2026 | **Operator-Guide erhält Guide-first Progressive Disclosure und Gameplay-TOC-Korrektur** | Sieben geschlossene native Details für Kit (2), Skills (1), Waffen (2), Potenziale (1), Team-Alternativen (1). Meta/Support-Badge getrennt, Fazit und Pull ohne doppelte Cards, Gameplay-Sprung gegen ScrollSpy-Übersteuerung abgesichert; bestehende Gear/Skill/Team/Datafield-Daten unverändert. Details §14.3k; CI/PR/Merge-Status nachtragen. |

| 16.10.2026 | **Guide-first Progressive Disclosure + Gameplay-Navi-Fix** nach erfolgreicher CI **#109** durch [PR #26](https://github.com/Ag0n1st/ag0n1st.github.io/pull/26) auf `main` gemergt | Squash `891a24b9d3d40c24709cdd7be3cf95b93cc1ab2a`. 7 unabhängig aufklappbare Bereiche (Kit2/Skills1/Waffen2/Potenziale1/Team-Alternativen1) schließen standardmäßig; Meta/Support neutral/farbig getrennt; Fazit hat jetzt nur eine redaktionelle Zusammenfassung mit Badge und zwei Audience-Cards; Gameplay-Anchor gegen ScrollSpy-Überschreiben geschützt. Build-Finder-Daten/Skills/Meta-Builds/Teams unverändert. Echte Pages-/Browser-/Mobile-Abnahme ausstehend. |

| 16.10.2026 | **Liino Texte in Guide-Eigenstimme, sechs Meta-Partner automatisch, Meta-/Support-Labels rechts gruppiert und YouTube-Guide integriert** | Bezieht die Partners-Kurzliste für alle künftigen Operatoren direkt aus `teams.meta` statt manueller doppelter Listen; sechs Liino-Partner ohne Liino selbst. Entfernt „vom Creator“-Fließtext und redundante Waffen-/Teamnotizen. Liino-Hauptvideo `F1sx8IuOIK4` im Operator-Profil; Gameplay-Einzelclips weiterhin `pending`. Details §14.3l; PR/CI/Merge nachtragen. |

| 16.10.2026 | **Liino Eigenstimme + automatische Meta-Partner + rechtsbündige Meta/Support-Chips + YouTube-Embed** durch [PR #27](https://github.com/Ag0n1st/ag0n1st.github.io/pull/27) in `main` | Erfolgreiche CI **#111**, Squash `a36f126ba24d2880b22e1eea8f9a209e52e118e3`. Sechs Meta-Partner: Zhuang Fangyi/Perlica/Arclight/Arcane/Tangtang/Xaihi; weitere Teamoptionen nur in Teams, mit Link-Fußnote. Keine öffentlich sichtbare Drittautor-Zuschreibung mehr in Liinos Empfehlungen. Hauptvideo `F1sx8IuOIK4` im Profil, Gameplay-Einzelclips weiter `pending`. Live-Browser-QA weiter offen. |

| 16.10.2026 | Chromium-Browser-Smoke-QA für Liino/Typhoeus auf eigenem Branch begonnen | Statische Node-Tests prüfen nicht die echte Bedienung; neue CI-Validierung der responsiven Build-Finder-, Partner-, Video-Embed- und Inhaltsverzeichnis-Funktionen. Exakte Tree-Budgets: Endfield 20.443.931 Byte von 100 MB, gesamter aktueller Arbeitsbaum 23.728.364 Byte. PR/CI/Pages-Abnahme siehe §14.3m. |

| 16.10.2026 | PR #28 – echte Chromium-Browser-QA und 1-GB-dist-Gate in main | CI #117 und nach Roadmap-Fortschreibung #118 grün: 109 Unit-Tests, Build, Endfield-100-MB-/Pages-1-GB-Prüfung, 1440/390-px-Chromium-Abnahme. Squash 81501f580a95cc3a86354982e1049ca468a3bc85. Externe Playback-/Live-Pages-Prüfung und Liino-Redaktion weiterhin getrennt offen. |

| 16.10.2026 | GitHub Pages nach PR #28 produktiv veröffentlicht | Pages #262 nach Merge erfolgreich; Pages #263 nach detailliertem main-ROADMAP-Commit 21f0502 vollständig success einschliesslich beider Budget-Gates und Deploy-Job. Browser-Playback externer YouTube-Videos weiterhin nicht unabhängig geprüft. |

| 16.10.2026 | **Liino-Operator-Kit-Redaktion als Freigabeentwurf auf GitHub vorbereitet** | Nur Quell-Audit + drei YAML-Vorschläge aus SKPORT 1041 (Sängerinnen-/Cosmovoice-Haltung, Kombo-/Talent-FP, Level- und Ausrüstungsfreischaltung). Keine Texte vor Freigabe in den sichtbaren Guide; interne Übernahmeregeln §14.3n. CI-/PR-/Merge-Status dort fortschreiben. |

| 16.10.2026 | Liino-Kit-Freigabeentwurf auf `main` dokumentiert, **nicht** im Guide veröffentlicht | PR #29, CI #119 vollständig grün (109 Tests, beide Budgets, Astro, Desktop-/Mobil-Chromium), Squash `48174a96eda620e7b28a84de225627cccc2f5d8c`. Drei YAML-Vorschläge in `docs/liino-operator-kit-review-20261016.md` warten auf Betreiberfreigabe; `liino.md` unverändert. |

| 16.10.2026 | Pages-Deploy des Liino-Kit-Freigabeentwurfs erfolgreich | PR #29 rein dokumentarisch; abgebrochener älterer Pages-Run #265 durch automatisch aufgehobenen Deploy ersetzt. Workflow #266 auf main 8a79d6d erfolgreich inklusive Build, Budget-Gates und Deploy. Liino-Website-Texte weiter unverändert bis zur Freigabe. |

| 16.10.2026 | **Liino F1 genehmigt, F2/F3 verworfen; kompaktes Operator-Profil/Quickbuild, positive Einsteigerfreundlichkeit und echte P1/P3/P5-WebPs** | Umsetzung auf Feature-Branch; drei lokale 960×540-WebPs mit insgesamt 195.706 Byte aus verifizierter Endfield-Talos-Wiki-Bildreferenz (einmalige GitHub Actions Image Import #1 erfolgreich). Offizielle SKPORT-Materialtabellen und Ausrüstungs-Build-Finder bleiben Datenquelle, kein doppelter Ressourcen-Text. PR-/CI-/Deploy-Abnahme siehe §14.3o. |

| 16.10.2026 | **PR #30 erfolgreich gemergt**: Liino-Spielweise freigegeben, doppelten Ressourcen-/Progressionstext gelöscht, Overview-Karten kompakt, Einsteigerfreundlichkeit invers und echte P1/3/5-WebPs | [PR #30](https://github.com/Ag0n1st/ag0n1st.github.io/pull/30) mit [CI #120](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38870980336) komplett grün (109 Tests, Astro, beide Budgets, Chromium Desktop+Mobil inkl. echtem Bildladen), Squash `b0f0e587cfe42a63f5a8553ccfbb0541a406e0e2`. Endfield 20.656.493 / 100M, gesamte Site 17.303.780 / 1.000M; abschließenden Deploy separat protokollieren. |

| 16.10.2026 | **Live-Pages-Deploy von PR #30 bestätigt** | [Pages #269](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38871176967) auf main 7bbf95e4 erfolgreich (beide Jobs build/deploy; Budget-Gates grün). Überholter paralleler älterer Run #268 nicht als Website-Fehler werten. |

| 16.10.2026 | **Waffenübersicht und Liino-Waffendetails fertigstellen** | Nutzer wünscht eine gemeinsame Quick-Waffen-Card (wie Partners) und vollständige formatierte SKPORT-Waffendetails mit Material-Icons. Offizieller lokaler Katalog enthält sechs Tuningabschnitte samt `row.costs` bei allen 4 Liino-Waffen; Feature-Branch `fix-operator-weapons-overview-details-20261016`, PR/CI/Pages-Status in §14.3p. Keine neuen oder umgewerteten Guide-Empfehlungen. |

| 16.10.2026 | **Liino-Waffendesign finalisiert und erfolgreich live** | PR #31 nach CI #121 (109 Tests, beide Budgets, Desktop-/Mobil-Chromium inkl. aller 4 Waffentabs und Material-Icons) squash-gemergt, Commit `07c69cfce91d5a7f666d53cfae91c5483b02219b`. Pages #271 erfolgreich ausgeliefert. Endfield 20.665.695 / 100M Byte, Seiten-Build 17.317.679 / 1.000M Byte. Auf visuelle Nutzerfreigabe warten, **dann erst** nächster Operator. |

| 16.10.2026 | **Typhoeus statt Liino als nächster vollwertiger Guide** | Vorab-Freigabe für vollständige eigene Redaktion erteilt. 16-Seiten-YouTube-Skript als Hauptquelle, persönliches Mobalytics-Profil HTTP 403 (nicht fälschlich als gelesen ausgeben); alle neun Guide-Sektionen mit SKPORT-1173-Werten, drei Waffen, sechs Build-Finder-Gear-Sets (Level 36/50/60/70), Team-Support-Gear, 5 Potenzialen, echten Videos und 6 kleinen WebPs (309.336 Byte). Dokumentationsaudit + QA/PR-Handoff §14.3q. |

| 16.10.2026 | **Typhoeus-Komplettguide vollständig gemergt und live** | PR #32 squash `262b2b86d6be1bc2f98cd7de3c66843a8328330f`; CI #125 grün 109/109, Astro, Endfield 21.024.790/100M, Pages `dist` 17.777.805/1.000M, Chromium Desktop/Mobil für beide Guides; Pages #273 erfolgreich; 6 WebP-Assets 309.336 Byte, alle 9 Rubriken, Teamausrüstung, echte Videos. 3 konkrete frühere CI-Fehler/Behebungen §14.3q. Mobalytics-Personalprofil HTTP 403 separat abzugleichen. |

| 16.10.2026 | **Typhoeus-Feedback nach PR #32 – Teilumsetzung / PDF ausstehend** | Neue 1/5 Einsteigerfreundlichkeit und Flexibilität, überall `Wille`, eigene direkte Datafield-Charakterprofilwerte in 2 Waffen- und 2 inkrementellen Potenzialszenarien (Audits #1/#2), Arcane in beiden Meta-Teams 2× Xiranite Bracing Slab, Nefarith P0 Featured, Quiz weg, Fazit-Cards zuletzt. Team-Waffen-Schema ergänzt, aber **persönliches Mobalytics-PDF nicht übermittelt**; echte restliche Team-Waffen/-Rüstungen nicht ohne Quelle ersetzen. Siehe §14.3r. |

| 16.10.2026 | **Draft-PR #33: Typhoeus-Feedback technisch grün, persönliches PDF steht aus** | CI #128 **113/113 Node**, Astro, beide Speicherhardgates, Chromium 1440/390 vollständig bestanden; Endfield 21.037.068/100M Byte, Pages-dist 17.779.095/1.000M Byte. Noch **nicht gemergt oder live**: Die Mobalytics-PDF-Vorlage für vollständige Team-Waffen und fremde Gear-Setups wurde noch nicht hochgeladen. Ohne Quelle keine erfundenen Mobalytics-Loadouts. |

| 16.10.2026 | **Eigenes Typhoeus-Mobalytics-PDF ist da; ausstehende Team-Waffen und Sets belegt** | Quelle: User-PDF `Typhoeus Build Guide - Ag0n1st (Mobalytics).pdf`, keine Kopie im Repo. Arcane Wraps (1137) statt Hands (1138), alle acht Arcane-Teams 1134/1137/1136/1136 und Type42-Waffe, Perlica/Ardelia/Liino/Gilberta mit exakten Haupt-/alternativen Waffen und konditionalen Gear-Vierer-Setups, zwei zusätzliche Gilberta-Teams, Typhi-UE-Build 1132/1238/1240/1240, Skill BS>CS>ULT=BA. 48 Vierer-Setups/20 Teammitglied-Waffeneinträge SKPORT-geprüft. Neues generisches Team-Loadout-UI und Quellenprotokoll §14.3s / Doc VII; laufenden PR #33 vollständig testen und live bringen. |

| 16.10.2026 | **Typhoeus-Mobalytics-PDF-Revision nach PR #33 erfolgreich live** | PR #33 squash `19b036c472201c53c0711a8793de527048852029`; [CI #143](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38890663573) 114/114 Tests, Astro, beide Budgetchecks, Desktop/Mobil-Chromium inkl. PDF-Waffen, Wraps statt Hands, bedingte Gear-Sets, Tied Skills, Fazit grün. [Pages #275](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38890844106) build+deploy success. Endfield 21.054.998/100M, gesamte Seite 17.851.843/1.000M. PDF privat, dokumentierte Eigenquellen VIII? **VII**, User-Abnahme ausstehend. |

| 16.10.2026 | **Si v1.6 komplett aufgebaut / CI grün / Merge ausstehend** | Persönlicher 8-Seiten-Mobalytics-Theorycraft-Guide privat ausgewertet, offizieller SKPORT Operator 1278/Skilltabellen/Potenziale importiert, 9 Rubriken, 6 Meta+37 Extra Teams, Datenfield Profile Waffen-/P-Modelle, 9 Operator-WebPs + 6 Gear-Piktogramme lokal, Haupt-Build Type 50 3pc + LYNX Slab. CI #155 **120/120 Tests**, Astro/100MB/1GB/Chromium 1440/390 grün. Endfield 21.979.256/100M, Pages-dist 18.906.777/1.000M Byte. Release-Gear numerische SKPORT-IDs fehlen ehrlich gekennzeichnet. [PR #34](https://github.com/Ag0n1st/ag0n1st.github.io/pull/34) noch ready/merge/deploy. |

| 16.10.2026 | **Si v1.6 vollständig auf main veröffentlicht** | [PR #34](https://github.com/Ag0n1st/ag0n1st.github.io/pull/34), Squash `a265af49d8cba1e68f2c79c50c15b344e2b6840c`, CI #156 120/120 + Astro + beide Budgets + Desktop/Mobil-Chromium grün, Pages #277 build und deploy `success`. Endfield 21.979.256/100M, Pages-dist 18.906.777/1.000M Byte. 6 Meta-/37 weitere Teams, echte SKPORT-Operator-1278-Daten, eigene deutsche Skilltexte, optimierte WebPs und Datafield-Prozente. Numerische v1.6-Gear-Blueprint-IDs/Recipes noch ehrlich offen, Si-Gameplay-Videos pending. |

| 16.10.2026 | **Si-Release-Nachkontrolle + automatische Eigenstimmen-Prüfung abgeschlossen und live** | [PR #35](https://github.com/Ag0n1st/ag0n1st.github.io/pull/35) squash `c5189e5`, [CI #157](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38933564698) **123/123** Tests + Chromium Desktop/Mobil + beide Budgets, [Pages #280](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38933850978) Build/Deploy `success`. Endfield 21.981.347/100M, Pages-dist 18.906.777/1.000M. Exakte community-interne v1.6-Gear-Namen nur recherchiert, nicht als SKPORT-IDs/Blueprints übernommen; Gauntlets weiter unklar. Regressionstest `scripts/endfield/editorial-voice.test.mjs`; Dokumentation `docs/si-v16-gear-followup-20261016.md`. |

| 16.10.2026 | **Si-Redaktionspass: Balanced Redeemer 349, Max-DMG-LYNX, situatives Max-Buffs-Xiranite, zwei Skill-Prioritäten, Lv36/50, Team-Cover und Direktstimme** | [PR #36](https://github.com/Ag0n1st/ag0n1st.github.io/pull/36); [CI #163](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38942624652) **125/125 grün**, Astro + 100MB/1GB + 1440/390px Chromium. Endfield 21.988.264/100M, `dist/` 18.969.697/1GB. Vorige CI-Fehler #158–#162 behoben; PR #36 Squash `9f200590` nach erfolgreichem CI #163 auf `main`, [Pages #282](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38943033551) Build/Deploy `success`. Umfang §14.3v. |

| 16.10.2026 | **Globale grün/rote Stärken-/Schwächen-Cards, Si Early Access und 2×2-Meta-Layout** | Auf Nutzerwunsch neuer Early-Access-Level-70-Build 796/411/342/342 aus offiziellem Bestandskatalog; alle vier Si-Meta-Cards zweispaltig, streng unveränderte bestehende Hauptempfehlung. Recherche zu neuen v1.6-Gear-Stats/Gloves-Namenskonflikt ergänzt; numerische offizielle Neu-IDs und Blaupausen bleiben ungeprüft. [PR #37](https://github.com/Ag0n1st/ag0n1st.github.io/pull/37) + [CI #165](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38946502828) **127/127**, Astro + 100MB/1GB + Browser 1440/390 grün. Endfield 21.993.992/100M, Pages-dist 18.989.307/1GB. [PR #37](https://github.com/Ag0n1st/ag0n1st.github.io/pull/37) Squash `130d1c17`, [Pages #284](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38946795050) **build/deploy success**. §14.3w. |

| 16.10.2026 | **Komplette v1.6-Ausrüstungsdaten im Preview-Katalog (18 Teile) / öffentlicher SKPORT-Live-Check** | Nutzer will **alle** v1.6-Gear-Stücke, 18 Namen in 5 Gruppen, 17 Community-Basiswertsätze plus 1 uneindeutige Handschuhvariante. [Live-SKPORT-Probe #1](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38948911401) erfolgreich: offizieller Stand 2026-10-16, 940 Items/258 Gear, **0/18 neue Teile**; keine offiziellen Item-IDs/Rezepte/Blueprints erfinden. `v16-gear.json` / `itemCatalog.ts` / Tests / Icons (5 bestehend, 6 neu, 7 Rate Limit) / ausführliches Doc. Entwicklungsbranch `feature-endfield-v16-all-gear-20261016`, Details §14.3x. [PR #38](https://github.com/Ag0n1st/ag0n1st.github.io/pull/38) + [CI #167](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38949955045) vollständig **131/131 Tests**, Astro/100MB/1GB/1440/390px grün; Endfield 22.096.502/100M, dist 19.066.039/1.000M. [PR #38](https://github.com/Ag0n1st/ag0n1st.github.io/pull/38) Squash `4c98d72` auf `main`, [Pages #286](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38950223371) `build/deploy success`. |

| 17.10.2026 | **EN-Multilingual-Basis mit originalen SKPORT-Begriffen & Google-SEO-Hreflang** | DE-URL bleibt unangetastet, EN unter `/en/`, Landing/Endfield/Operatoren/3 EN-Guide-Fassungen (Si + Typhoeus indexierbar, Liino Preview noindex), übersetzte Redaktion in `src/data/i18n/en-guides.json`, Original-Skillbeschreibungen aus SKPORT; Domain Canonical + hreflang reciprocal + Sitemap/robots. **Noch keine 1:1-Vollübersetzung** von 9 Sektionen/allen Zusatzausrüstungen/Tools. [PR #39](https://github.com/Ag0n1st/ag0n1st.github.io/pull/39) [CI #176](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38983474775) **134/134** Node/Astro/1440/390px grün; Endfield 22.103.774/100M, Pages 19.254.458/1.000M. [PR #39](https://github.com/Ag0n1st/ag0n1st.github.io/pull/39) Squash `baebccd2` auf `main`, [Pages #289](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38983640837) **build/deploy success**. §14.3y. |

| 17.10.2026 | **EN-Vollversion mit kompletter DE-Layoutparität veröffentlicht** | [PR #40](https://github.com/Ag0n1st/ag0n1st.github.io/pull/40) Squash-Merge **`cae871aa`** in `main`; [CI #38989193480](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38989193480) **134/134 + Astro + 1440/390px Chromium success**, Endfield **22.124.380/100M**, dist **20.299.164/1G**; [Pages #38989332978](https://github.com/Ag0n1st/ag0n1st.github.io/actions/runs/38989332978) **build & deploy success**. Original-9-Section-Guide inkl. kompletter Build-Finder + 6/37 Si-Teams und 9 Builds, dieselben Homepage/Card-Layouts, EN-Sprache global persistent in LocalStorage, alle neun EN-Reiter/Platzhalter, Mobile-Buttonhöhe 32px / Desktop 34px. §14.3aa. |

| 17.10.2026 | **DE/EN Guide-Karten, Release-Sortierung, Tierlist und Si Gear UI-Cleanup** | [PR #41](https://github.com/Ag0n1st/ag0n1st.github.io/pull/41) (in QA). Gleiche Änderungen für beide Sprachen: Release-Date-Sortierung Si→Typhoeus→Liino, 3 automatische Charakter/Character-Kurzverweise auf beiden Homepages + Endfield, Kategorien/Kachel-Erweiterung, neue Tierlist/Tier List als 10. Nav-Tab, entfernte Backend-Hinweise aus Si Gear, EN-»Gear«. Automatisches Metadaten-Framework / Redaktion-Workflow §14.3ab; CI/Merge/Pages nachtragen. |

**Ende der aktuellen Roadmap.**  
**Fortsetzungspunkt (17.10.2026; zweisprachiger Guide-Feed und Tierlist in Entwicklung):** [PR #41](https://github.com/Ag0n1st/ag0n1st.github.io/pull/41) Branch `feature-bilingual-guide-feed-tierlist-20261017`, §14.3ab. Nutzer-Vorgabe: **Jede künftige Änderung DE + EN gleichzeitig**. Umgesetzt: Operator-Cards reale Release-Dates Si 15.10.2026 > Typhoeus 02.09.2026 > Liino 09.08.2026; `guideFeed.ts` + Listing-Felder im Guide-Schema und `GuideTeaserCard.astro` (3 sprachrichtige Cards, Quadrat-Kategorie »Charakter/Character« rechts), eingebunden in beide Landing Pages/Endfield Overviews; Tierlist DE/EN mit eigenem Navbar-Tab, Overview-Teaser, hreflang/Sitemap; Si interne Gear-Notes aus DE/EN-Redaktion und gemeinsamer Meta-Card-Warnung entfernt, Abschnittsname EN »Gear«; neue Guide-Publikationsworkflows/Templates für künftige Kategorien in `docs/operator-guide-workflow.md`. **Nächster Schritt:** CI/Build/Budget/Browser 1440/390 abwarten und alle etwaigen Testfehler beheben, PR #41 mergen, Pages kontrollieren; abschließenden Roadmap-Status mit exakten Runs/SHA/Bytes aktualisieren. Das globale Sprach-Setup und alle alten Guide-Funktionen dürfen nicht regressieren. Text-only, keine neuen Bilder.\n