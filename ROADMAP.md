# AG0N1ST.COM – PROJEKT-ROADMAP, ENTWICKLUNGSSTAND & KI-ÜBERGABE

> **Zentrale Projektdokumentation / Single Point of Entry.**  
> **Stand:** 15. Oktober 2026 (Europe/Berlin).  
> **Projekt:** Ag0n1st – deutschsprachiges Gaming-/Guide-Portal.  
> **Repository:** https://github.com/Ag0n1st/ag0n1st.github.io  
> **Produktionswebsite:** https://ag0n1st.com (eigene Domain), alternativ https://ag0n1st.github.io  
> **Hauptbranch:** `main`. Die zuletzt vor dieser Roadmap integrierte Funktion ist der Story-/Gebietsfilter aus **PR #12**, Merge-Commit `631980a`.  
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
| Was ist aktuell als Nächstes sinnvoll? | **Erste redaktionelle, vom Creator bestätigte Liino-Builds** und deren Funktionsprüfung im neuen Finder; danach Story-/Blaupausen-Feinheiten und weitere Operator-Guides. |
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
- Im Chat zur Websiteentwicklung **Text, Code und Links**, keine automatisch erstellten Bilder oder Assets. Neue Bilder nur auf ausdrücklichen Auftrag; bis dahin Platzhalter nutzen.
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
npm run preview
~~~

`npm run test:endfield` führt alle `scripts/endfield/*.test.mjs` per Node-Test-Runner aus. Änderungen an der Datenstruktur, an Importern, am Build-Finder und an der Quelle-zu-ID-Zuordnung benötigen Regressionstests.

### 2.3 Grenzen und Speicherberechnung

- **Verbindliches eigenes Endfield-Budget:** **100 MB dezimal = 100.000.000 Byte**.
- Prüfung in `scripts/endfield/check-budget.mjs` zählt definierte Endfield-Verzeichnisse plus einzelne Style-/Nav-Dateien.
- **Nicht dasselbe wie:** Größe der gesamten Repository-Git-Historie, Gesamtgröße von GitHub Pages, Git-LFS-Quota oder eine angebliche feste Dateianzahlbegrenzung.
- Ein Datei-Umzug ohne Duplikation vergrößert den **aktuellen Arbeitsbaum** nicht wesentlich, kann aber zusätzliche Git-History-Objekte erzeugen. Alte Commits sind nicht in der 100-MB-Anzeige des Prüfscripts enthalten.
- Snapshot vor dieser Roadmap: Bilddateien unter `public/images/endfield/` insgesamt **950 Dateien**, rund **16,54 MB** reine Bilder. Der zuletzt vor diesem Task geprüfte vollständige Endfield-Bereich lag bei etwa **20,29 MB/100 MB**; bei jedem Build die **neue exakte Messung** heranziehen.
- Große Bilder weiterhin komprimieren und nicht unnötig erneut committen. Cache-/Import-Actions dürfen keine undokumentierten Massen-Downloads ins Repo schreiben.

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
- [ ] Laufende Überprüfung von Website-Header, Mobile-Layout, Tastaturnavigation, Formularen und Links.
- [ ] Unmerged Forschungs-PR #3 auf Obsoleszenz prüfen und ggf. schließen (nicht blind zusammenführen).
- [ ] GitHub Pages / Canonical-Domain / SSL und `astro.config.mjs` konsistent prüfen, insbesondere `ag0n1st.com` vs. konfigurierte `ag0n1st.github.io`.
- [ ] Asset- und Import-Actions kontrollieren, ob alte, einmalige Debug-Workflows später aufgeräumt werden müssen.
- [ ] Bei späteren Patch-/Datenupdates Snapshots und Übersetzungen auf übereinstimmende Versionen prüfen.

**Abnahme:** CI grün, kein Datenbudget-Überlauf, keine funktionale Regression, dokumentierte Quelle/Entscheidung, Pages deployed.

### Phase P1 – Erste **echte** Operator-Ausrüstungsbuilds und End-to-End-Kontrolle

**Status:** [GEPLANT]; **empfohlener nächster Entwicklungsschritt**.

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

**Status:** [GEPLANT], abhängig von P1.

- [ ] Operatorprofil sowie vorhandene Haupt-/Nebenattribute prüfen; unstrukturierte Traits nur bei glaubwürdiger Quelle.
- [ ] Stärken und Schwächen nach eigener Analyse ausformulieren.
- [ ] Schwierigkeit, Flexibilität, Zugänglichkeit (1–5) redaktionell festlegen.
- [ ] Skill-Priorität mit vier Slots, `>`/`>=`, Ziel-Rängen und Begründung eintragen.
- [ ] Mechaniken/Rotation/Anwendungsfälle anhand eigener Screens/Video und Wiki abgleichen.
- [ ] Waffen-BiS/BP/F2P-Alternativen nur nach Vergleich; tatsächliche Effektbedingungen angeben.
- [ ] Potenziale P1–P5 bewerten; ohne Vergleichstest keine Performance-Prozentwerte erfinden.
- [ ] Meta- und alternative Teams inklusive Rollen und `buildId`-Zuordnung pflegen.
- [ ] Eigenes YouTube-Guidevideo sinnvoll mit Zeitmarken/Abschnittslinks referenzieren.
- [ ] Fazit, Pull-/Ressourcenberatung und geeignet/nicht geeignet ergänzen.
- [ ] Sprachstil, SEO, Semantik, Mobile-/Desktop-A11y prüfen.
- [ ] Sobald vollständig: `status: published` und echte Freigabe.

**Abnahme:** Nutzer kann die gesamte Spielweise **ohne das Video vollständig anschauen zu müssen** verstehen, und alle Daten sind quellengerecht sowie von eigenen Empfehlungen unterscheidbar.

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

## 14. AKTUELLER ÜBERGABEPUNKT: 15. OKTOBER 2026

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

### 14.3 Sofortleseliste für die nächste KI

1. **`ROADMAP.md`** – dieses Dokument vollständig für Kontext und Projektprioritäten.
2. **`README.md`** – minimaler Installations-/Startprozess.
3. **`scripts/endfield/README.md`** – SKPORT-Importer, Daten-/Bild-Budget, offizielle Datenstruktur.
4. **`docs/operator-guide-workflow.md`** – Guide-Template und redaktioneller Workflow.
5. **`src/content/operator-guides/_template.md`** – tatsächliche YAML-Felder, nicht aus Erinnerung ableiten.
6. **`src/content/operator-guides/liino.md`** – nächste redaktionelle Datei.
7. **`src/lib/endfield/buildFinder.mjs`**, **`buildStoryProgress.mjs`**, **`gearBlueprintResearch.ts`** – Build-/Progressionsregeln.
8. **`docs/endfield-blueprint-piece-audit.md`** und **`docs/endfield-story-progression.md`** – Fundort-/Story-Fachbelege und offene Konflikte.
9. **GitHub Pull Requests/Actions auf `main`** – letzter tatsächlicher Code-/Deploy-Stand.

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

## 15. WICHTIGE LINKS UND QUELLVERWEISE

**Repository & Auslieferung:**
- GitHub: https://github.com/Ag0n1st/ag0n1st.github.io
- GitHub Actions: https://github.com/Ag0n1st/ag0n1st.github.io/actions
- GitHub Pages: https://ag0n1st.github.io
- Eigene Domain: https://ag0n1st.com

**Fachdokumente im Repository:**
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

**Ende der aktuellen Roadmap.**  
**Fortsetzungspunkt:** Abschnitt 14 und die aktuell offenen/erledigten PRs prüfen, bevor neue Änderungen beginnen.
