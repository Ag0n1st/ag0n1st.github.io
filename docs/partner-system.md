# Partner-System (02.11.2026)

**Zentrale Quelle:** `src/data/partners.json`. Alle vier Partner besitzen dieselbe DE-/EN-Datenstruktur. `active=false` entfernt einen Partner aus Startseiten-Karten und Footer. Logos liegen als neun lossless WebP-Dateien unter `public/images/partners/`; die Originalgrafiken stammen vom Betreiber. Das Lootbar-Farb-Icon ist nur Referenz für den gelben Akzent `#ffcb2e`. Keine externen Werbeskripte oder Trackingpixel.

**Platzierungen:** nach den letzten Videos auf der Startseite (DE+EN) und dezenter Footer in HomePage, EndfieldPlaceholder, About/NTE beider Sprachen. Keine Inhalte zwischen Guides, Speedruns oder Cheat Sheets, kein Twitch-/YouTube-Sponsoring. Jeder Link ist unmittelbar als Werbung gekennzeichnet, besitzt einen erläuternden Affiliate-Provisionshinweis und verwendet `rel="sponsored noopener noreferrer"`.

**Datenherkunft und Fact-Check:** Affiliate-URLs, die Partnerschaften und 10%-Code `AGON` sind Angaben des Betreibers aus Discord-Ankündigungen, **nicht** öffentlich bestätigte individuelle Vertrags-/Rabattbedingungen. Für GamerSupps sind Waifu Cups, GG, koffeinfreie Varianten und zeitweise kostenlose Samples im eigenen Shop dokumentiert; Versand und Verfügbarkeit sind nicht garantiert, ohne Gesundheitsaussagen. Razer führt Gaming-Hardware (Mäuse, Headsets, Blade-Laptops). Instant Gaming verkauft digitale Games/Keys. Bei Lootbar keine pauschale Aussage zur Zulässigkeit von Drittanbieter-Top-ups in bestimmten Spielen; Spielregeln und UID vorher prüfen. Der Site-Footer ist ein allgemeines Partnerverzeichnis, keine gezielte Endfield-Top-up-Empfehlung. Rabattbedingungen und Partnerstatus nur nach Bestätigung aktualisieren.

**Primäre Referenzen (abgerufen 02.11.2026):**
- `https://gamersupps.gg/`
- `https://gamersupps.gg/products/free-trial-sample-packs`
- `https://www.razer.com/de-de/about-razer`
- `https://www.instant-gaming.com/de/`
- `https://www.die-medienanstalten.de/service/merkblaetter-und-leitfaeden/leitfaden-werbekennzeichnung-bei-online-medien/`

**Pflege:** Links/Code/Verfügbarkeit vor neuen Marketingaussagen gegen die Partnerportale prüfen. Keine automatischen Preis-, Rabatt- oder Health-Claims. Dateien statisch ausliefern; keine dynamische externe Ads-Infrastruktur.


## Footer-Refactoring und Lootbar-Korrektur (02.11.2026)
- `src/components/SiteFooter.astro` ist die **einzige Footer-Quelle** für Homepage, Endfield-Startseite, Endfield-Unterseiten, About, NTE und Posts. Die alte, separat gepflegte Endfield-Startseiten-Version wurde entfernt.
- Footer nun einzeilig: sechs Social-Icons links, **Ag0n1st-Logo exakt im geometrischen Zentrum** und Copyright `© 2026` direkt rechts davon; vier Affiliate-Partner-Icons in denselben 34-px-Kacheln rechts. Werbekennzeichnung als dezenter kleiner Zusatz direkt unter dem rechten Icon-Cluster und als `aria-label` pro Link. Auf schmalen Viewports gestapelt, ohne horizontale Überläufe. Keine zusätzliche Footer-Trennlinie.
- Zwei neue **vom Betreiber farbkorrigierte** Lootbar-WebPs ersetzen die zuvor teilweise monochromen Varianten unter denselben Original-Dateipfaden; die restlichen sieben Logo-Assets bleiben unverändert.
- Auf Homepage-Sektionen überall Button `Zum Partner*` / `Visit partner*` sowie `*Affiliate-Links` / `*Affiliate links`.
- Lootbar-Text reduziert auf `Guthaben und Top-Ups für verschiedene Spiele.`. Die frühere pauschale Warnung entfällt zugunsten eines optisch zu GamerSupps passenden Label-Disclaimers. Der gewünschte globale Satz „sind nicht verboten“ ist angesichts offizieller Verbote bei bestimmten Spielen nicht verlässlich; statt dessen unterstrichene und explizit qualifizierte Aussage „sind nicht pauschal verboten“ plus Hinweis auf explizite Verbote einzelner Spiele. Beispiel offizielles Wuthering-Waves-Fair-Play-Regelwerk: `https://wutheringwaves.kurogames.com/en/main/news/detail/742`; ebenso Genshin Impact `https://genshin.hoyoverse.com/en/news/detail/103714`.
