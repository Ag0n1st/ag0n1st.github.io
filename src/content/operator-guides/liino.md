---
# Öffentliche Vorschau: Sechs Ausrüstungs-Builds und die Skill-Priorität
# wurden vom Creator festgelegt. Weitere redaktionelle Bereiche bleiben unfertig.
# Eigene Texte und Builds beim Spieldatenimport niemals überschreiben.
operator: liino
displayName: Liino
status: preview
updatedAt: 2026-10-16

overview:
  summary: >-
    Liino ist eine 6★-Electric-Supporterin mit Polearm. Ihre Fertigkeiten
    kombinieren Gruppenheilung, ANG-Verstärkung und Elektro-/Natur-Amps.
  featuredBuildId: ultimate-fokus
  strengths: []
  weaknesses: []
  partners: []

operatorKit:
  playstyle: ""
  progressionNotes: ""
  resourceNotes: ""

skills:
  priority:
    order: [ultimate, battle, combo, basic]
    comparisons: [">", ">=", ">"]
    targetLevels:
      ultimate: "M3"
      battle: "M3"
      combo: "M3"
      basic: "1"
  active:
    basic: >-
      Auf Stufe 1 belassen. Liino übernimmt hier die Rolle einer Supporterin;
      zusätzliche Level im Basisangriff bringen ihrer Teamverstärkung,
      FP-Rückerstattung und Ultimate-Rotation keinen wesentlichen Nutzen.
    battle: >-
      M3 ist das Ziel, denn die Kampffertigkeit gewährt damit 10 % ANG-Bonus
      für das Team. Ihre Verstärkungswerte steigen mit den Skillstufen.
      Zwischen dieser Fertigkeit und der Kombofertigkeit ist die
      Investitionsreihenfolge flexibel, da beide auf M3 angestrebt werden.
    combo: >-
      Ebenfalls auf M3 bringen. Der Cooldown sinkt laut offiziellen
      Fertigkeitsdaten von 10 auf 8 Sekunden. Je häufiger Liino ihre
      Kombofertigkeit durch passende Arts-Reaktionen auslösen kann, desto
      öfter erhält sie die konstanten 20 Ultimate-Energie und desto
      häufiger kann ihr Kampftalent nach der Kombo eine folgende
      Elektro- oder Natur-Kampffertigkeit mit bis zu 10 FP erstatten.
      Die FP stammen aus dem Talent, nicht unmittelbar aus der Kombo selbst.
    ultimate: >-
      Höchste Priorität, M3. Liinos stärkster Teamnutzen ist die
      Willenskraft-skalierende Elektro-/Natur-Verstärkung des Ultimate.
      Auf M3 erreicht der zusätzliche Amp laut offiziellen Skilldaten
      0,04 % pro Willenskraftpunkt, mit einem ausgewiesenen Maximalbeitrag
      von 60 % aus Willenskraft. Die tatsächlich erreichte Verstärkung
      hängt vom Willenskraftwert ab.
  combatTalents: []
  shipTalents: []

weapons:
  recommendations:
    - weaponId: "1046"
      category: bis
      evaluation: >-
        Liinos Best-in-Slot-Stangenwaffe. Bedazzling Night Debut kombiniert
        Willenskraft für ihren Ultimate-Amp mit einer zusätzlichen
        ANG-Verstärkung für von Liino behandelte Teammitglieder.
      sourceNote: "Datafield"
    - weaponId: "1044"
      category: bp
      evaluation: >-
        Golden Age ist die Battle-Pass-Option. Sie liefert Willenskraft
        sowie eine Arts-Schadensverstärkung durch Liinos heilende
        Kombofertigkeit. Ihre modellierte Leistung hängt vom Team ab.
      sourceNote: "Datafield"
    - weaponId: "75"
      category: alternative
      evaluation: >-
        JET ist die alternative Stangenwaffe für Liino. Sie liefert
        eigene Schadens- und Attributseffekte, statt den spezifischen
        Team-ANG-Effekt ihrer BiS-Waffe zu ersetzen.
      sourceNote: "Datafield"
    - weaponId: "97"
      category: f2p
      evaluation: >-
        Cohesive Traction ist die vom Creator eingeordnete F2P-Option.
        Sie besitzt passende Willenskraftwerte, ihr Waffeneffekt ist
        jedoch eher auf eigene Elektro-/Kombofertigkeitsschäden
        als auf zusätzliche direkte Teamverstärkung ausgerichtet.
      sourceNote: "Datafield"
  comparisons:
    - id: zhuang-perlica-arclight
      title: "Zhuang Perlica Arclight Team"
      sourcePageType: character-profile
      sourceNote: "Datafield"
      snapshotDate: "2026-10-16"
      referenceWeaponId: "1046"
      referenceRank: 4
      comparisonConditions: >-
        Datafield-Charakterprofil Liino, Team-Szenario
        Zhuang Perlica Arclight Team, erfasst am 16.10.2026.
        100 % entsprechen Bedazzling Night Debut R4 im selben Szenario.
        Teamrotation, Ausrüstung, Potenziale und weitere Modellparameter
        wurden nicht unabhängig mit dem Berechnungssheet abgeglichen.
      entries:
        - { weaponId: "1046", rank: 9, performancePercent: 112.1 }
        - { weaponId: "1046", rank: 4, performancePercent: 100.0 }
        - { weaponId: "1044", rank: 9, performancePercent: 85.0 }
        - { weaponId: "75", rank: 9, performancePercent: 84.7 }
        - { weaponId: "75", rank: 4, performancePercent: 83.5 }
        - { weaponId: "1044", rank: 4, performancePercent: 83.4 }
        - { weaponId: "97", rank: 9, performancePercent: 81.3 }
    - id: arcane-tt-xaihi
      title: "Arcane TT Xaihi Team"
      sourcePageType: character-profile
      sourceNote: "Datafield"
      snapshotDate: "2026-10-16"
      referenceWeaponId: "1046"
      referenceRank: 4
      comparisonConditions: >-
        Datafield-Charakterprofil Liino, Team-Szenario
        Arcane TT Xaihi Team, erfasst am 16.10.2026.
        100 % entsprechen Bedazzling Night Debut R4 im selben Szenario.
        Teamrotation, Ausrüstung, Potenziale und weitere Modellparameter
        wurden nicht unabhängig mit dem Berechnungssheet abgeglichen.
      entries:
        - { weaponId: "1046", rank: 9, performancePercent: 110.3 }
        - { weaponId: "1046", rank: 4, performancePercent: 100.0 }
        - { weaponId: "1044", rank: 9, performancePercent: 91.6 }
        - { weaponId: "1044", rank: 4, performancePercent: 89.5 }
        - { weaponId: "75", rank: 9, performancePercent: 89.0 }
        - { weaponId: "97", rank: 9, performancePercent: 81.3 }
  disclaimer: >-
    Die modellierten Waffen-Prozentwerte stammen ausschließlich aus dem
    Datafield-Charakterprofil von Liino, nicht aus dem Team-Hub.
    Jedes dort angebotene Team-Szenario hat seinen eigenen Vergleich;
    die Werte sind nicht untereinander austauschbar. Die 100-%-Referenz
    ist jeweils Bedazzling Night Debut R4. Waffenränge stehen nur in den
    Vergleichen, nicht in den allgemeinen Empfehlungen. Die zugrunde
    liegenden Teamrotationen, Ausrüstung und Potenzialannahmen wurden
    nicht unabhängig mit dem Original-Spreadsheets abgeglichen.
    Die Werte sind eine Orientierung für die angegebenen Modelle,
    keine allgemeingültige Garantie für jeden Spielstand.
  generalNotes: >-
    Die Einordnung der vier empfohlenen Waffen stammt vom Creator.
    Ihre Kategorien bleiben unabhängig davon, welcher Waffenrang in
    den Datafield-Berechnungen als Vergleich verwendet wurde.

equipment:
  builds:
    - id: ultimate-fokus
      meta: true
      metaSummary: "Hoher Ultimate-Energiegewinn mit Eternal-Xiranite-Teamverstärkung für regelmäßige Ultimate-Rotationen."
      title: "Build A – Ultimate-Fokus"
      role: support
      items: ["1134", "1138", "1236", "365"]
      availableFromLevel: 70
      teamContext: "Für Rotationen, in denen Liino ihre Ultimate zuverlässig aufbauen und zur Teamverstärkung einsetzen soll."
      evaluation: >-
        Fokus auf Ultimate-Energiegewinn und Willenskraft mit drei Teilen Eternal Xiranite
        und einer LYNX Slab. Der Eternal-Xiranite-Bonus verstärkt den Schaden der
        anderen Teammitglieder, sobald Liino über ihre Ultimate eine Verstärkung
        (Amp) gewährt. Die tatsächliche Energieverfügbarkeit hängt von der Anzahl
        ausgelöster Kombofertigkeiten und der Teamrotation ab.
      setBonusNotes: >-
        3x Eternal Xiranite: Nach Anwendung eines Amp/Schutz-/Anfälligkeits-/
        Schwächungseffekts +16 % verursachter Schaden für andere Teammitglieder
        (15 Sek., nicht stapelbar). 1x LYNX: kein LYNX-Setbonus.
    - id: balanced
      meta: true
      metaSummary: "Ausgewogene Variante mit LYNX-Heilung und Schadensreduktion sowie zusätzlichen Hauptattributwerten."
      title: "Build B – Balanced"
      role: support
      items: ["1134", "1133", "365", "365"]
      availableFromLevel: 70
      teamContext: "Ausgewogene Teamunterstützung mit Schwerpunkt auf Heilung, Stabilität und Willenskraft."
      evaluation: >-
        Vom Creator als Balanced-Variante festgelegt: drei Teile LYNX und als
        Off-Piece Eternal Xiranite Light Armor. Der LYNX-Setbonus verbessert
        die Heilungsleistung und reduziert nach Behandlung den erlittenen Schaden
        des behandelten Teammitglieds. Zwei LYNX Slabs liefern zusätzliche
        Hauptattributwerte; der Ultimate-Energiegewinn ist geringer als bei
        Build A und muss zur tatsächlichen Rotation passen.
      setBonusNotes: >-
        3x LYNX: +20 % Behandlungseffizienz; nach Heilung erhält das Ziel
        Schadensreduktion für 10 Sekunden (15 %, bei Überheilung 30 %;
        nicht stapelbar). 1x Eternal Xiranite: kein Eternal-Xiranite-Setbonus.
    - id: will-fokus
      meta: true
      metaSummary: "Maximiert Willenskraft für Liinos Ultimate-Amp; ideal mit bereits geladener Ultimate und ohne zweiten Ultimate-Einsatz."
      title: "Build C – Will-Fokus"
      role: support
      items: ["1126", "1129", "365", "365"]
      availableFromLevel: 70
      teamContext: >-
        Situativ, wenn Liino mit bereits aufgeladener Ultimate in den Kampf
        startet und innerhalb der vorgesehenen Rotation keine zweite Ultimate
        benötigt.
      evaluation: >-
        Vom Creator für die Maximierung von Liinos Willenskraft gewählt, damit
        ihre willenskraftabhängige Elektro-/Natur-Verstärkung der Ultimate möglichst
        stark ausfällt. Rift Trekker Light Armor und Rift Trekker Hands liefern
        hohe direkte Willenskraftwerte; die beiden LYNX Slabs ergänzen Hauptattribut.
        Auf Ultimate-Energiegewinn und einen 3er-Setbonus wird bewusst verzichtet.
        Außerhalb des beschriebenen Einsatzfalls nicht als universell beste
        Rotation oder als zweiter-Ultimate-Build präsentieren.
      setBonusNotes: >-
        2x LYNX und zwei setfreie Rift-Trekker-Teile: kein 3er-Setbonus aktiv.
        Die individuellen Willenskraft- und Hauptattributswerte stehen im Fokus.
    - id: level-60
      title: "Build D – Level 60"
      role: support
      items: ["1117", "1123", "1120", "1120"]
      availableFromLevel: 60
      teamContext: "Wuling-Progression mit möglichst viel Ultimate-Energiegewinn statt zusätzlichem Heilungs-Kit."
      storyUnlock: "Die AIC-Fieldwork-Vorlagen werden laut offiziellen Angaben mit dem Wuling-Storyfortschritt verfügbar; der Besitz jedes Teils muss separat bestätigt werden."
      evaluation: >-
        Vier Teile AIC Fieldwork, darunter zweimal AIC Fieldwork Ember.
        Gegenüber der Heiler-Variante wurde auf Wunsch des Creators das
        AIC Fieldwork Power Bank gegen einen zweiten Ember getauscht, da
        zusätzlicher Ultimate-Energiegewinn hier wichtiger als Heilungsbonus ist.
        Beide Embers können aus derselben Vorlage hergestellt werden.
      setBonusNotes: >-
        3x AIC Fieldwork: +20 % eigener verursachter Schaden, 10 %
        Schadensreduktion und +10 % Ultimate-Energiegewinn. Das vierte
        Set-Teil löst keinen zweiten 3er-Bonus aus.
    - id: level-50
      title: "Build E – Level 50"
      role: support
      items: ["279", "331", "335", "335"]
      availableFromLevel: 50
      teamContext: "Cryston-Progression mit Willenskraft und Unterstützung."
      storyUnlock: "Die vier verwendeten Teile stammen aus Autoritätsbelohnungen (benötigte Belohnungsstufen 28, 33 und 38); die Vorlagen müssen tatsächlich abgeholt worden sein."
      evaluation: >-
        Eine Aburrey Light Armor T1 und drei Mordvolt-Resistant-Teile,
        darunter zweimal Mordvolt Resistant Battery T1. Der 3er-Bonus
        erhöht Willenskraft; der zusätzliche Behandlungseffekt ist an
        weniger als 50 % eigene LP gebunden und nicht dauerhaft aktiv.
      setBonusNotes: >-
        3x Mordvolt Resistant: +50 Willenskraft. Unter 50 % eigener LP:
        +30 % Behandlungseffekt. Kein Aburrey-Setbonus.
    - id: level-36
      title: "Build F – Level 36"
      role: support
      items: ["274", "278", "284", "284"]
      availableFromLevel: 36
      teamContext: "Frühe Ferrium-Progression mit Willenskraft und Behandlung."
      storyUnlock: "Die verwendeten Vorlagen stammen aus Autoritätsbelohnungen (benötigte Belohnungsstufen 17, 19 und 23); die Vorlagen müssen tatsächlich abgeholt worden sein."
      evaluation: >-
        Mordvolt Resistant Vest und Gloves, dazu zwei Mordvolt Resistant
        Batteries. Die doppelte Battery nutzt denselben Bauplan, benötigt
        aber zwei gefertigte Exemplare. Der bedingte Heileffekt des Sets
        greift nur bei weniger als 50 % eigener LP.
      setBonusNotes: >-
        3x Mordvolt Resistant: +50 Willenskraft. Unter 50 % eigener LP:
        +30 % Behandlungseffekt. Das vierte Set-Teil verdoppelt den Bonus nicht.
  progression:
    - stage: early
      note: "Level 36: Mordvolt Resistant mit Ferrium und Autoritätsbelohnungen bis Stufe 23."
    - stage: mid
      note: "Level 50: Cryston-Build mit drei Mordvolt-Resistant-Teilen und Aburrey als Off-Piece."
    - stage: late
      note: "Level 60: AIC Fieldwork mit Xiranit und zwei Embers für höheren Ultimate-Energiegewinn."
    - stage: endgame
      note: "Level 70: Ultimate-Fokus, Balanced oder situativer Will-Fokus abhängig von Team und Rotation."
  generalNotes: >-
    Doppelte Kit-IDs bedeuten zwei hergestellte Exemplare, aber nur
    eine freizuschaltende Blaupause. Level, Fabrikkomponente, Region,
    Gebiet und der tatsächlich bestätigte Vorlagenbesitz werden im
    Build-Finder unabhängig voneinander geprüft.

potentials:
  entries:
    - level: 1
      evaluation: >-
        Datafield meldet für P1 einen modellierten Mehrwert von 3,2 %
        gegenüber P0. Eine persönliche Pull-Empfehlung folgt separat.
      increaseOverPreviousPercent: 3.2
      comparisonConditions: >-
        Datafield-Charakterprofil Liino, Potentials (DPS Increase),
        zusätzlicher berechneter Gewinn gegenüber P0 (vorherige Stufe
        für P1). Detaillierte Team- und Rotationsannahmen nicht
        unabhängig mit dem Original-Spreadsheet abgeglichen.
      sourceNote: "Datafield"
    - level: 2
      evaluation: >-
        Datafield meldet für P2 einen zusätzlichen modellierten Mehrwert
        von 0,7 % gegenüber P1; nicht als Gesamtgewinn gegenüber P0 lesen.
      increaseOverPreviousPercent: 0.7
      comparisonConditions: >-
        Datafield-Charakterprofil Liino, Potentials (DPS Increase);
        zusätzlicher berechneter Gewinn gegenüber P1, nicht kumulativ
        gegenüber P0. Modellparameter nicht unabhängig abgeglichen.
      sourceNote: "Datafield"
    - level: 3
      evaluation: >-
        Datafield meldet für P3 einen zusätzlichen modellierten Mehrwert
        von 0,8 % gegenüber P2; keine eigenständige Pull-Empfehlung.
      increaseOverPreviousPercent: 0.8
      comparisonConditions: >-
        Datafield-Charakterprofil Liino, Potentials (DPS Increase);
        zusätzlicher berechneter Gewinn gegenüber P2, nicht kumulativ
        gegenüber P0. Modellparameter nicht unabhängig abgeglichen.
      sourceNote: "Datafield"
    - level: 4
      evaluation: >-
        Datafield beziffert den zusätzlichen modellierten DPS-Gewinn für
        P4 gegenüber P3 in diesem Berechnungsmodell mit 0,0 %.
        Das ist keine universelle Aussage über sonstigen Nutzen.
      increaseOverPreviousPercent: 0.0
      comparisonConditions: >-
        Datafield-Charakterprofil Liino, Potentials (DPS Increase);
        zusätzlicher berechneter Gewinn gegenüber P3, nicht kumulativ
        gegenüber P0. Modellparameter nicht unabhängig abgeglichen.
      sourceNote: "Datafield"
    - level: 5
      evaluation: >-
        Datafield meldet für P5 einen zusätzlichen modellierten Mehrwert
        von 4,7 % gegenüber P4, nicht gegenüber P0.
      increaseOverPreviousPercent: 4.7
      comparisonConditions: >-
        Datafield-Charakterprofil Liino, Potentials (DPS Increase);
        zusätzlicher berechneter Gewinn gegenüber P4, nicht kumulativ
        gegenüber P0. Modellparameter nicht unabhängig abgeglichen.
      sourceNote: "Datafield"
  disclaimer: >-
    Alle hier angegebenen Potenzial-Prozentwerte stammen aus dem
    Datafield-Charakterprofil von Liino (Stand 16.10.2026), nicht aus
    dem Team-Hub. Jeder Prozentwert beschreibt laut Datafield den
    zusätzlichen modellierten DPS-Gewinn gegenüber dem jeweils
    vorherigen Potenzial (P1 gegenüber P0 bis P5 gegenüber P4).
    Es handelt sich ausdrücklich NICHT um kumulative Werte gegenüber
    P0. Die zugrunde liegenden Rotation-, Team- und
    Ausrüstungsannahmen wurden nicht unabhängig überprüft; diese
    Zahlen sind keine Pull-Empfehlung oder Garantie im eigenen Spiel.

teams:
  meta: []
  more: []

gameplay:
  showcases: []

conclusion:
  verdict: ""
  recommendedFor: []
  skipIf: []
---

<!-- Liino: Sechs Ausrüstungs-Builds wurden vom Creator am 16.10.2026 festgelegt.\nDie anderen redaktionellen Sektionen, Waffen, Teams und das Fazit sind noch\nunvollständig. status: preview bleibt deshalb bewusst erhalten. -->
