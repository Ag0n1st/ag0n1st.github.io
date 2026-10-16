# Liino P2 – Entwurf für Spielweise, Fertigkeiten und Waffen (Creator-Freigabe erforderlich)

**Stand:** 16.10.2026  
**Status:** **[RECHERCHE / REDAKTIONELLER ENTWURF – NOCH NICHT VOM CREATOR FREIGEGEBEN]**  
**Ziel:** Nach Abschluss der sechs bestätigten Gear-Builds und des gemeinsamen Build-Finder-Frameworks die nächsten offenen Abschnitte in `src/content/operator-guides/liino.md` mit **quellengestützten, ausführlichen deutschen Erklärungen** vorbereiten. **Kein** automatisches Veröffentlichen als Ag0n1st-Empfehlung. Die bestehende Guide-Datei bleibt hier absichtlich unverändert.

## 1. Quellenhierarchie und bekannte Grenzen

**Offizielle Daten, hoher Beleggrad – lokal bereits importierter SKPORT-Stand 15.10.2026:**
- [`liino.json`](../src/data/endfield/operators/liino.json), Operator-ID **1041**, mit allen vier Skilltexten und Rank-Metriken.
- [`liino.extra.json`](../src/data/endfield/operators/liino.extra.json), Haupt-/Nebenattribut, Combat Talents, Promotions.
- [`liino.json` (DE-Locale)](../src/data/endfield/locales/de/liino.json), redaktionelle deutsche Begriffsebene.
- [`equipment-details.json`](../src/data/endfield/catalog/equipment-details.json), Waffen-IDs und deren **Rank-gebundene Effekte**. Achtung: Das originale Roh-JSON darf nicht aus einer Drittseite überschrieben werden. Waffenrang != Operator-Potenzial.
- [`operatorGuideSchema.ts`](../src/content/operatorGuideSchema.ts): `skills.priority` mit **genau vier** Slots und drei Zwischenzeichen `>` oder `>=`; Waffen-Kategorien `bis`/`bp`/`f2p`/`alternative`.

**Fremde redaktionelle Builds – Vergleich, kein offizieller oder bereits vom Creator bestätigter Wert:**
- [Prydwen – Liino](https://www.prydwen.gg/arknights-endfield/characters/liino) – Support-Einordnung, Best-in-Slot `Bedazzling Night Debut`, `Golden Age` als Alternative; unterschiedliche Energie-/Teamkontexte.
- [Mobalytics – Liino](https://mobalytics.gg/arknights-endfield/characters/liino-build-guide) – aktualisiert 12.08.2026: `Ultimate > Battle > Combo >= Basic`; Bedazzling Night Debut, Golden Age als Battle-Pass-Alternative, Chimeric Justice nur als schwache UGE-Notlösung; Mechaniken und Talentkontext.
- [gacha.gg – Liino Aggregat](https://www.gacha.gg/arknights-endfield/characters/liino) – aggregiert Community-Listen, **keine zusätzliche unabhängige Simulation**.
- [Icy Veins – Liino](https://www.icy-veins.com/arknights-endfield/liino-guide-best-builds) – einige offizielle Werte, aber explizite Vorab-Aussage „Best Weapons will be added soon“, daher **nicht** als aktueller, ausgetesteter Ranking-Beleg behandeln.
- [Endfield.gg – Liino](https://endfield.gg/liino/) – alternative Gear-/Waffenideen; Beschaffung insbesondere einer kostenlosen Waffe separat prüfen.

**Abgrenzung:** Wo unten **„Vorschlag“** steht, ist es **eine vom Assistenten formulierte Empfehlung zur Prüfung**, nicht der von Ag0n1st bereits akzeptierte Wortlaut. Wo **„SKPORT“** steht, liegen Einzelwerte im lokalen Snapshot. Prozentuale DPS-/Amp-Vergleiche zwischen Waffen **nicht** ohne gleiche Rotation, Rang, Potenzial, Skills, Gegner und Teamkontext behaupten.

## 2. Offiziell gesicherte Liino-Grundlagen

| Merkmal | Wert |
| --- | --- |
| Operator | Liino (**SKPORT 1041**), 6★ Supporter |
| Element / Waffe | **Elektro** / **Stangenwaffe (Polearm)** |
| Hauptattribut | **Willenskraft (Will)** |
| Sekundärattribut | **Beweglichkeit (Agility)** |
| Kampffertigkeit | **Dazzling Focus** – verbraucht **25 SP**, eröffnet die **Vocalist Stance** für bis zu **60 Sek.**, gibt dem Team einen ANG-Bonus; heilt in Reichweite regelmäßig, ermöglicht zusätzliche Elektroangriffe. Erneuter Einsatz in der Haltung **beendet sie vorzeitig**, ohne SP-Kosten, mit kurzer Cooldownphase. |
| Kombofertigkeit | **Delightful Harmonics** – während Vocalist Stance, wenn eine **Arts Reaction aufgetragen oder verbraucht** wird; verursacht Elektro-Schaden, heilt kontrollierten Operator, gibt **20 Ultimate-Energie** bei **allen im Snapshot aufgeführten Rängen**. Unterbricht Vocalist Stance **nicht**. |
| Ultimate | **Dawnstar Concerto** – **160 Ultimate-Energie**; teambasierte Behandlung + verstärkte **Cosmovoice Stance** für **15 Sek.** mit **Elektro-Amp und Natur-Amp, ANG-Bonus**, regelmäßiger Behandlung, Elektro-Schaden, **erzwungener Electrification**. Bei regulärem Ende zusätzlicher Schlussimpuls (dreifacher Beat-Damage und -Heal); **nicht** bei vorzeitigem Ende. Erneute Kampffertigkeit beendet Cosmovoice Stance vorzeitig. |
| Willensskalierung der Ultimate | Die Amplifikation pro Willenskraft steigt gemäß 12 Skillrängen von **0,018 %** (Rank 1) auf **0,04 %** (Mastery III); im Snapshot steht bei Mastery III `MAX Amp from Will: 60 %`. Das ist **keine Garantie**, dass man ohne weiteres 60 % praktischen Amp erreicht; tatsächlichen Willenswert und Effektformel prüfen. |
| Heilskalierung | Mehrere Heilungswerte aus Dazzling Focus, Delightful Harmonics und Dawnstar Concerto skalieren mit **Beweglichkeit**. Diesen Wert nicht als alleinigen Hauptfokus überbewerten, wenn Team-Damage-Buffs das eigentliche Ziel sind. |
| Combat Talent „Idol Zone“ | Auf höchster Talentstufe **+20 % erhaltene Behandlung** und **−20 % erlittenen Schaden** innerhalb der Haltung-AoE; hält **3 Sek.** nach Verlassen des Bereichs. |
| Combat Talent „Starry Boost of 1st Magnitude“ | Nach Liinos Kombo (30-Sek.-Fenster) erstattet die **nächste eingesetzte Elektro- oder Natur-Kampffertigkeit** auf höchster Talentstufe **10 SP**; **nicht stapelbar**, endet bei Auslösung. |
| Attribute Level 90 (Basis) | Will **177**, Beweglichkeit **121**, Stärke **89**, Intellekt **91**; *Basiswerte aus SKPORT ohne Ausrüstung*. |

**Fachlicher Stolperstein:** Das Talent mit SP-Rückerstattung beeinflusst die Team-Ressourcen, aber eine **reale zweite Ultimate** kann trotzdem an den nur **20** Energie pro Kombo, der Zahl der tatsächlich ausgelösten Combos oder an zu wenig UGE scheitern. In Aussagen zu „SP-positiv“ stets Team-/Timingbedingungen nennen. Weitere Beschränkungen (exakte Cooldowns/Interaktionen) nur aus überprüfbaren Daten oder Ingame-Belegen ergänzen.

## 3. Vorgeschlagener deutscher Guide-Text – „Operator Kit“

> **Spielweise – Vorschlag zur Freigabe:**  
> Liino ist eine Elektro-Supporterin, die ihre Stärke aus dauerhaftem Team-Support und einem gezielt eingesetzten Ultimate-Bufffenster zieht. Ihre Kampffertigkeit `Dazzling Focus` aktiviert für bis zu 60 Sekunden die `Vocalist Stance`: Während sie aktiv ist, verstärkt Liino den ANG-Wert ihres Teams, heilt Verbündete in Reichweite und kann Elektro-Schaden über zusätzliche Treffer verursachen.  
>
> Der nächste Schlüssel sind **Arts-Reaktionen**. Wird während der Vocalist Stance eine Arts-Reaktion auf einen Gegner angewendet oder verbraucht, kann Liino ihre Kombofertigkeit `Delightful Harmonics` auslösen. Diese heilt den kontrollierten Operator und liefert **20 Ultimate-Energie**, ohne die Vocalist Stance zu beenden. Mit ihrem zweiten Kampftalent erhält die nächste Elektro- oder Natur-Kampffertigkeit nach der Kombo zusätzlich bis zu **10 SP** zurück.  
>
> Sobald ihr Ultimate `Dawnstar Concerto` bereitsteht, wechselt Liino für **15 Sekunden** in die stärkere `Cosmovoice Stance`: Sie heilt das gesamte Team, verstärkt **Elektro- und Natur-Schaden** abhängig von ihrer **Willenskraft** und gibt zusätzlich einen ANG-Bonus. Ziel ist, den wichtigsten Schadensabschnitt des Teams in dieses Zeitfenster zu legen. Ihre Ultimate erzwingt außerdem Electrification an Gegnern im großen Wirkungsbereich.  
>
> **Wichtig:** Die Haltung wird bei erneutem Einsatz ihrer Kampffertigkeit vorzeitig beendet. Das unterbindet in der Ultimate-Haltung auch den Schlussimpuls, der sonst beim normalen Ablauf erfolgt. Liinos Build-Entscheidung richtet sich deshalb wesentlich danach, ob das Team nur ein kurzes Ultimate-Burstfenster benötigt oder innerhalb einer längeren Rotation eine **zweite Ultimate** erreichen muss.

**Vorgeschlagene kompakte Stärken:**
- Mehrere nützliche Teamfunktionen in einem Slot: **Elektro-/Natur-Amp**, ANG-Buff, kontinuierliche Behandlung und bis zu 20 % Schadensreduktion durch Talent.
- **Aktive Ultimate-Energie-Rückgewinnung** durch artsreaktionsgebundene Kombos sowie **SP-Rückerstattung** für Elektro-/Natur-Kampffertigkeiten.
- **Situativ variabler Gear-Bau:** vom Ultimate-Fokus (A) über Balanced/Heilung (B) bis zu Will-Fokus bei bereits voller Anfangs-Ultimate (C) – **diese drei Gear-Builds sind bereits vom Creator bestätigt**.

**Vorgeschlagene kompakte Schwächen:**
- Viel Teamnutzen hängt von **passenden Arts-Reaktionen** und Team-/Rotationsabläufen ab; ohne Kombos verlangsamt sich das erneute Aufladen ihrer Ultimate.
- Ultimate ist mit **160 Energie** aufwändig; Builds mit mehr Willenskraft und wenig UGE sind nur in dafür passenden Burst-Szenarien ratsam.
- Das **15-Sekunden-Ultimate-Bufffenster** verlangt gutes Timing; ein manuell vorzeitiges Ende verschenkt den regulären Schlussimpuls.

**Offene redaktionelle Entscheidungen:** Die drei Ratings (Schwierigkeit, Flexibilität, Zugänglichkeit; je 1–5) **nicht** aus einer fremden Tierliste ableiten. Kein pauschales „Pflicht für jedes Team“; genaue Stärke vom jeweiligen Elektro-/Natur-Team abhängig.

## 4. Vorgeschlagene Skill-Priorität

**Vorläufig, noch nicht vom Creator bestätigt:**

```yaml
skills:
  priority:
    order: [ultimate, battle, combo, basic]
    comparisons: [">", ">", ">="]
    targetLevels:
      ultimate: "M3"
      battle: "M3"
      combo: "9 / später M3"
      basic: "nachrangig"
```

**Lesbar:** **Ultimate > Kampffertigkeit > Kombofertigkeit ≥ Basisangriff**. Diese Richtung entspricht der Mobalytics-Guide-Priorisierung. Das ist ein **Freigabevorschlag**, keine selbst simulierte optimale Ressourcenkurve.

**Warum diese Reihenfolge?**
- **Ultimate zuerst:** Dort steigt der **Willenskraft-abhängige Amp** mit dem Fertigkeitsrang und ist zentral für Liinos Supportrolle; dazu Heilung/Schaden. Die größte geplante Team-Wertschöpfung steckt im richtigen Ultimate-Fenster.
- **Kampffertigkeit danach:** Öffnet die unterstützende Haltung und verbessert ANG-Buff und Behandlung; 25-SP-Kosten und 60-Sekunden-Haltungsdauer bleiben laut Snapshot konstant.
- **Kombo danach:** Wertvoll für Heilung und Elektro-Schaden; **der Extra-Energiegewinn bleibt im SKPORT-Snapshot über alle Fertigkeitsränge konstant bei 20**. Deshalb bedeutet zusätzliches Kombo-Leveln **nicht** automatisch „mehr Ultimate-Energie pro Kombo“.
- **Basisangriff nachrangig:** Für Liinos typischen Supporteinsatz hauptsächlich persönlicher Schaden; die offiziellen normalen Angriffs-Multiplikatoren steigen, liefern aber keine aus dem Kit belegte Verstärkung von Will-Amp oder Kombo-Energie.

**Abnahmefrage:** Auf M3 beider Core-Skills `ultimate` und `battle` bestehen, oder zunächst das Ressourcenbudget strikter auf Ultimate konzentrieren? Zielränge sind **Empfehlungen**, keine aus der Wiki zwingend ableitbare Pflicht.

## 5. Waffen – offizieller Katalog und redaktioneller Vorschlag

**Wichtig:** Waffen-IDs hier vollständig und mit Namen. Die Werte der einzelnen Waffen hängen vom Waffen-Rang ab. **Rank 1** und **Rank 4/9** unten nicht mit dem Operator-Potenzial verwechseln.

| Vorschlag | Offizielle Waffe / ID | Offizielle Werte, besonders relevante Mechanik | Vorläufige Einordnung |
| --- | --- | --- | --- |
| **BiS** | **Bedazzling Night Debut (`1046`)**, 6★ Polearm | Will, Treatment Efficiency. Nach Behandlung eines anderen Teammitglieds pro Stack **ANG-Bonus für das behandelte Mitglied**; bis **4 Stacks**, 20 Sek., für jede Figur individuell. Effekt bei **Waffen-Rank 4**: +25,6 % Hauptattribut und +5,6 % ANG je Stack (**bis 22,4 %**); bei Rank 9 andere Werte. | **Starker Favorit**, weil Will Liinos Ultimate-Amp erhöht und Behandlung den zusätzlichen Team-ANG-Buff bedient; Prydwen und Mobalytics stimmen in dieser Rangfolge überein. |
| **Battle Pass** | **Golden Age (`1044`)**, 6★ Polearm | Will, Treatment Efficiency. Wenn die Kombo andere heilt, erhält **das Team** einen **Arts-Damage-Bonus für 20 Sek.**; bei Waffen-Rank 4 +8,0 % Arts-Damage, Rank 9 +14,0 %. Persönlicher Elektro-Schaden und Treatment-Buff sind zusätzliche Effekte. | **Alternative**, wenn Signature-Waffe fehlt und der Erwerb via Battle Pass überhaupt geplant/möglich ist; **nicht F2P** nennen. |
| **Niedrige Budgetstufe – Prüfung offen** | **Cohesive Traction (`97`)**, **5★** Polearm | **Will +16** auf Rank 1, **+124** auf Rank 9; passiver Effekt stärkt vor allem eigene **Kombo-/Elektro-Schadenswerte**, nicht direkt den Team-Amp. | **Theoretisch sinnvoller als reine Fehlattribut-Waffe**, weil Will passt; die Beschaffung muss erst offiziell als zugänglich belegbar sein, bevor `f2p` oder „beste kostenlose Waffe“ in den Guide kommt. |
| **Nur UGE-Notlösung – Ranking offen** | **Chimeric Justice (`93`)**, **5★** Polearm | **Stärke** statt Will, aber Ultimate Gain Efficiency **+4,8 % Rank 1 bis +37,1 % Rank 9**; restlicher Effekt persönlicher Crit/ATK nach Vulnerable, **keine direkte Liino-Teamverstärkung**. | Kann **situativ** bei Energieproblemen helfen; verliert Will-Skalierung und viel Synergie. Mobalytics kennzeichnet die Waffe ausdrücklich als schwache F2P-Notlösung. Offizielle Erwerbsart gesondert klären. |
| **Weitere nicht genehmigte Option** | **JET (`75`)**, 6★ Polearm | Hauptattribut (typabhängig), ATK und persönlicher Arts-Schadenseffekt nach eigener Battle-/Combo-Fertigkeit. | Für Will grundsätzlich brauchbares Hauptattribut, **aber keine belegte eigenständige Team-Buff-Synergie** wie bei den beiden Kandidaten oben. Aufnahme als Alternative ohne konkreten Vergleich nicht empfehlen. |

**Besonders wichtig:** In verschiedenen Community-Listen wird `Chimeric Justice` teilweise irrtümlich als 6★ bezeichnet; der lokal importierte, offizielle SKPORT-Snapshot führt sie als **5★**. `Golden Age` wird in manchen Seitenübersichten neben „F2P“ gelistet, während ihre tatsächliche Waffenliste und Erwerbswege **Battle Pass** sagen. Für den Website-Guide deshalb **korrekt als BP** kategorisieren, nicht als Gratis-Waffe.

**Vorgeschlagene Einträge nach Creator-Freigabe:**

```yaml
weapons:
  recommendations:
    - weaponId: "1046"
      category: bis
      evaluation: >-
        Liinos Signature-Stangenwaffe: Willenskraft für höhere Elektro-/Natur-
        Verstärkung des Ultimate sowie zusätzlich ein stapelbarer ANG-Bonus
        für von Liino behandelte Teammitglieder.
    - weaponId: "1044"
      category: bp
      evaluation: >-
        Battle-Pass-Alternative mit Willenskraft und Behandlung. Ihre
        Kombofertigkeit kann einen Arts-Schadensbonus für das Team auslösen;
        den Rang und die zeitliche Buff-Abdeckung berücksichtigen.
    - weaponId: "97"
      category: alternative
      evaluation: >-
        Vorläufige 5-Sterne-Alternative mit passender Willenskraft, aber
        ohne vergleichbar starken direkten Team-Buff. Verfügbarkeit und
        Verhältnis zu Chimeric Justice sind noch zu prüfen.
```

**Nicht abschließend empfohlen:** `Chimeric Justice` und `JET` bewusst **noch nicht** als feste Ag0n1st-Empfehlung einkategorisieren; ihre Aufnahme soll von einem konkreten Zweck (z. B. UGE-Notlösung) und einer belegten Beschaffung abhängen. **F2P**-Kategorie ist bis zur Prüfung offen.

## 6. Freigabegrenzen, Prüfstrategie und Weiterarbeit

1. **Creator-Freigabe offen:** `src/content/operator-guides/liino.md` bleibt mit leeren Feldern für `overview.strengths`, `weaknesses`, `operatorKit.playstyle`, `skills.priority`, `skills.active`, `weapons.recommendations` unverändert. Freigegebene sechs Gear-Builds und Meta-Flags nicht verändern.
2. **Offizielle Stat-Prüfung erledigt:** vier Liino-Fertigkeiten, zwei Combat Talents und Waffendatensätze (`1046`, `1044`, `97`, `93`, `75`) aus lokalem SKPORT-Snapshot gelesen; Rangabhängigkeit festgehalten. Nicht alle Daten aus Drittseiten sind Patch-1.5/1.6-sicher.
3. **Keine „erfundene“ Bewertungsmatrix:** Schwierigkeit/Flexibilität/Zugänglichkeit 1–5 erst durch Creatorentscheidung. Exakte DPS- oder Amp-Prozentvergleiche verschiedener Waffen ohne reproduzierbaren Test und gleiche Bedingungen ausdrücklich nicht angeben.
4. **Empfohlene nächstkleinste Freigabe:** Operator-Kit-Erklärung und drei Stärken/Schwächen-Kandidaten **inhaltlich bestätigen oder korrigieren**; anschließend Skill-Priorität prüfen, zuletzt BiS/BP/Alternative und echten F2P-Erwerbsweg.
5. **Danach Implementierung:** Nur bestätigte Inhalte in `liino.md` eintragen, YAML-Schema beachten, `npm run test:endfield`, Budgetprüfung und `npm run build`, PR/CI/Merge dokumentieren. Anschließend Potenziale/Teams/Gameplay/Fazit und passende Guide-Video-URL aus Creatorquellen.
6. **P1 bleibt separat unvollständig:** Reale Browser-End-to-End-Prüfung von Max-/Min-Fortschritt und Meta→Finder ist weiterhin offen, obwohl CI aus PR #19 grün war. Das blockiert **nicht** die Vorbereitung der redaktionellen P2-Freigabe.

**Status:** Recherche zur **Freigabe**, **keine veröffentlichte Charakterguide-Änderung** und **kein Creator-Test** behauptet. Auch bei diesem Dokument gilt: Alle technischen und redaktionellen Entscheidungen in `ROADMAP.md` protokollieren.
