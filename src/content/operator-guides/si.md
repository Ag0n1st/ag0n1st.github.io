---
operator: "si"
displayName: "Si"
status: "published"
updatedAt: "2026-10-16"
listing:
  releaseDate: 2026-10-15
  listedAt: 2026-10-17
  category: character
  summaryDe: "Si liefert Kryo- und Hitze-Verstärkung, flexible Teamrollen und starken Combo-Schaden."
  summaryEn: "Si offers Cryo and Heat amplification, flexible team roles and powerful Combo Skill damage."
  visible: true
guideVideo:
  title: "Si – ausführlicher Videoguide in Vorbereitung"
overview:
  summary: "Si ist eine 6★-Kryo-Unterstützerin mit Großschwert, Intellekt als Haupt- und Stärke als Sekundärattribut. Ihr flexibles Kit erlaubt sie sowohl als Main DPS mit Fokus auf Kombofertigkeit und aufgezeichneten Schaden als auch als Sub DPS beziehungsweise Support für Kryo- und Hitze-Teams. Künstlerische Absicht erfasst Schaden am Ziel, ihre Tintenseele überträgt Treffer und Effekte auf den ursprünglichen Gegner, während die Ultimate das gesamte Team mit Kryo- und Hitze-Verstärkung unterstützt. Entscheidend sind Position 1, der Zeitpunkt der Combo-Auslösung und sorgfältiges FP-Management."
  traits: ["Amp", "Damage Dealer", "Cryo Infliction"]
  strengths:
    - "Ungewöhnlich vielfältig: hoher eigener Kryo-Combo-SDN, Bewegungsunfähigkeit, Schadenserfassung und teamweite Kryo-/Hitze-Verstärkung."
    - "Unterstützt zahlreiche Teams für Kryo- und Hitze-Angreifer und ihre eigene Main-DPS-Rotation."
    - "Tintenseele überträgt eingehende Treffer und Effekte auf das Ursprungsziel. Besonders interessant gegen bewegliche Gegner, die ihre Position oft wechseln."
    - "Talent zur Abklingzeitverkürzung der Kombofertigkeit des Operators auf Teamposition 1 nach der Ultimate eröffnet zusätzliche Rotationsfenster."
    - "Kann abhängig vom Element auf Position 1 Kryo- oder Hitze-Kumulierung anbringen."
  weaknesses:
    - "Die Basismechanik ist zugänglich, aber optimale Battle-Skill-Abfolge, Tintenseelen-Timing und die gespeicherte Schadensmenge brauchen Übung."
    - "Die aktuell besten Ausrüstungsteile sind erst sehr spät im Spiel verfügbar, hohe Abhängigkeit vom Spielfortschritt."
    - "Sehr abhängig von limitierten Charakteren, um ihr volles Potenzial auszuschöpfen."
  ratings:
    difficulty: 3
    flexibility: 5
    accessibility: 1
  accessibilityNote: "Die optimalen Type-50-Ausrüstungsteile sind erst mit der neuen Story und dem neuen Gebiet verfügbar."
  featuredBuildId: "si-balanced"
  partners: []
operatorKit:
  playstyle: "Si spielt um die Zustände Künstlerische Absicht und Tintenseele. Mit der ersten Kampffertigkeit belegst du einen Gegner mit Kryo-Schaden, Bewegungsunfähigkeit und einer Kumulierung; steht ein Hitze-Operator an Teamposition 1, wird daraus Hitze statt Kryo. Während Künstlerische Absicht aktiv ist, wird ein Anteil des erlittenen Schadens gespeichert. Nach Ablauf explodiert der Effekt und verursacht festen Schaden in Höhe des aufgezeichneten Wertes. Mit dem anschließenden Ersten Pinselstrich (15 FP) ziehst du eine Tintenseele aus dem Ziel: Angriffe und Effekte gegen diese Seele werden auf den ursprünglichen Gegner übertragen. Der Letzte Pinselstrich kostet keine FP und löst die Endexplosion vorzeitig aus. Der praktische Vorteil ist die Bündelung des Schadens auch dann, wenn sich der Gegner bewegt; das Timing entscheidet jedoch darüber, wie viel Schaden vorher aufgezeichnet wurde. Sis Kombofertigkeit Vision vor Auge wird ausgelöst, wenn ein Ziel Kryo- oder Hitze-Kumulierung verliert beziehungsweise diese absorbiert. Der beschworene Tinten-Lung verursacht Kryo-Schaden und profitiert davon, wie viele Kumulierungen von EINEM Ziel entfernt wurden. Das spricht für bewusst aufgebaute Reaktionsfenster statt ungeplanter Kombo-Aktivierung. Ihre Ultimate Spielverderber verboten verursacht Kryo-Schaden und stärkt gleichzeitig Kryo und Hitze für das ganze Team. Zusätzlich senkt Gönnerschaft der Proxy vorübergehend die Combo-Abklingzeit von Teamposition 1. Das macht sie vor allem in ihrer Support-Rolle flexibel. Als Main DPS steht die möglichst häufige und verstärkte Combo im Vordergrund; als Support möchte sie ihre Ultimate vor einem wichtigen Schadensfenster setzen. Bei der Rotation immer klären: Wer besetzt Position 1, welches Element wird aufgetragen, wie viele FP stehen für Initialer Pinselstrich zur Verfügung und wann wird die Tintenseele zurückgeschickt?"
skills:
  priority:
    order: ["combo", "battle", "basic", "ultimate"]
    comparisons: [">", ">", ">="]
    targetLevels: {basic: "M3", battle: "M3", combo: "M3", ultimate: "M3"}
  supportPriority:
    order: ["battle", "ultimate", "combo", "basic"]
    comparisons: [">", ">", ">"]
    targetLevels: {basic: "Lv 1–9 (optional)", battle: "M3", combo: "M3", ultimate: "M3"}

  active:
    basic: "Schaffensdrang ist Sis fünfteiliger Kryo-Basisangriff mit 18 Taumelpunkten auf dem Abschlussangriff, wenn sie aktiv gesteuert wird. Er ist im Main-DPS-Build für Feldzeit und FP-Gewinn nützlich. Die Level-Priorität hängt aber davon ab, wie häufig du sie selbst steuerst: Für die Kernrotation sind Combo und Battle Skill zuerst entscheidend."
    battle: "Dimension der Pinselkunst ist das Kontroll- und Speicherwerkzeug ihres Kits. Es bringt Künstlerische Absicht und Kryo- bzw. bei einem Hitze-Operator auf Position 1 Hitze-Kumulierung an. Erster Pinselstrich kostet 15 FP und extrahiert die Tintenseele; Letzter Pinselstrich ist gratis und kann die Endexplosion vorzeitig auslösen. Lass dem Team genug Zeit, Schaden und Effekte auf Ziel und Seele zu übertragen, bevor du abschließt. Als Support zuerst auf M3 bringen."
    combo: "Vision vor Auge ist bei einer DPS-Spielweise die wichtigste Schadensquelle. Die Combo triggert beim Verbrauch oder Absorbieren von Kryo-/Hitze-Kumulierungen. Je mehr Stacks von EINEM Gegner entfernt werden, desto stärker trifft der Tinten-Lung. Die seit Release bekannten Daten bestätigen den Kern des Combo-Fokus. Für Main DPS ist dies meine erste Upgrade-Priorität; gleichzeitig Battle Skills anderer Teammitglieder auf den 3er-Type-50-Setbonus timen."
    ultimate: "Spielverderber verboten ruft den riesigen Tinten-Lung, verursacht Kryo-Schaden und gewährt dem Team gleichzeitig Kryo- und Hitze-Verstärkung. Gönnerschaft der Proxy reduziert danach die Cooldown-Dauer der Combo von Teamposition 1. Als Support gilt Kampffertigkeit M3 > Ultimate M3 > Combo M3 > Basisangriff Level 1–9 (optional). Als DPS gilt Combo M3 > Kampffertigkeit M3 > Basisangriff M3 ≥ Ultimate M3. Die Zahl der sinnvollen Ultimate-Nutzungen hängt von der eigenen Energieeffizienz und Kampfzeit ab."
  combatTalents:
    - talentId: "proxy-s-patronage"
      evaluation: "Zentrales Support-Talent: Nach Sis Ultimate verkürzt sich der Cooldown der Kombofertigkeit des Operators auf Teamposition 1 um 10 beziehungsweise 20 Sekunden. Entscheidend sind Teamreihenfolge und Einsatzzeitpunkt; kann auch Si selbst betreffen, wenn sie Position 1 besetzt."
    - talentId: "unsoiled-brush"
      evaluation: "Verschwindet eine Tintenseele, erhalten alle verbündeten Operatoren 15 beziehungsweise 30 % Hast für fünf Sekunden. Der kostenlose Letzte Pinselstrich ist damit nicht nur der Endburst, sondern zugleich ein wichtiges Team-Buff-Timing."
  shipTalents:
    - talentId: "ware-is-the-geist"
      evaluation: "Verbessert die Hinweisbeschaffung im Empfangsraum; hat keine direkte Bedeutung für Sis Kampfrotation. Spätere Stufen erhöhen die Effektivität weiter."
    - talentId: "ink-spirit-aide"
      evaluation: "Verlangsamt die Stimmungsabnahme von Operatoren im Empfangsraum. Es handelt sich um einen Basiseffekt, nicht um einen Kampf-Buff."
weapons:
  recommendations:
    - weaponId: "1280"
      category: "bis"
      evaluation: "Jadegefäß (Jade Vessel) ist als Signature-Waffe sowohl für Sis persönliche Kryo-/Combo-Schadensfenster als auch für die Kontrolle wertvoll. Nach Bewegungsunfähigkeit erhöht sie erlittenen Schaden am Ziel und stärkt anschließend die nächste Kombofertigkeit; dadurch passt sie direkt zum Pinselstrich-/Tintenseelen-Kit."
    - weaponId: "1281"
      category: "bp"
      evaluation: "Long Heritage ist eine kostengünstigere Alternative mit passenden Intellekt-/Kryo-Werten. Seit Release ist sie als Protocol-Pass-Waffe eingeordnet, daher nicht pauschal als bedingungslos kostenlos ausgeben. Für konkrete Leistungsabstände zählt die Datafield-Modellreferenz."
    - weaponId: "70"
      category: "alternative"
      evaluation: "Khravengger ist eine von der offiziellen Wiki als passende Großschwertoption geführte Alternative und wird von Datafield in Si-Main-DPS-Simulationen ausgewiesen. Für die Ultimate-Verstärkung und die genaue Teamrolle ist Jadegefäß dennoch die spezifischere Empfehlung."
  comparisons:
    - id: "si-main-dps"
      title: "Main DPS · Datafield-Charakterprofil"
      sourcePageType: "character-profile"
      sourceNote: "Datafield"
      snapshotDate: "2026-10-16"
      referenceWeaponId: "1280"
      referenceRank: 4
      comparisonConditions: "Öffentlich gerendertes Datafield-Charakterprofil Si, Reiter Main DPS, Stand 16.10.2026. Jade Vessel R4 = 100 % innerhalb dieses konkreten Modells. Es handelt sich nicht um universelle Spiel-DPS und das Original-Spreadsheet wurde nicht unabhängig nachgerechnet."
      entries:
        - weaponId: "1280"
          rank: 9
          performancePercent: 114.5
        - weaponId: "1280"
          rank: 4
          performancePercent: 100
        - weaponId: "70"
          rank: 9
          performancePercent: 96.1
        - weaponId: "70"
          rank: 4
          performancePercent: 91
        - weaponId: "1281"
          rank: 9
          performancePercent: 90.5
        - weaponId: "1281"
          rank: 4
          performancePercent: 86.8
  generalNotes: "Für Si ist die richtige Waffe besonders relevant und sie profitiert als Main DPS auch wieder sehr von ihrer Signature-Waffe. Die allgemeinen Empfehlungen sind unabhängig vom Waffenrang; die vollständigen, lokal importierten Werte und Tuning-Materialkosten jeder Waffe stehen in den aufklappbaren Waffendetails. Datafield-Prozente gelten nur für das benannte Main-DPS-Szenario."
equipment:
  matrix:
    enabled: true
    metrics: []
    rows: []
  builds:
    - id: "si-balanced"
      title: "Type 50 Yinglung · Balanced"
      role: "main-dps"
      meta: true
      metaTag: "balanced"
      metaSummary: "Drei neue Type-50-Teile mit Redeemer Seal: Combo-Schaden und Intellekt bleiben erhalten, während zusätzliche Ultimate-Effizienz regelmäßigere Buff-Fenster ermöglicht."
      items: ["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "349"]
      availableFromLevel: 70
      teamContext: "Standardempfehlung für Main DPS und flexible DPS-/Support-Rotationen, wenn die Ultimate zuverlässig in wichtige Schadensfenster passen soll."
      evaluation: "Drei Type-50-Yinglung-Teile liefern den starken Combo-Setbonus. Das Redeemer Seal ergänzt als unabhängiges Off-Piece Intellekt und Ultimate-Effizienz. Dadurch bleibt der persönliche Combo-Schaden stark, während die Ultimate leichter in die Teamrotation eingebunden werden kann. Ideal, wenn ihre Ultimate ohne diese zusätzliche Energieeffizienz nicht rechtzeitig verfügbar wäre."
      setBonusNotes: "3× Type 50 Yinglung: ANG +15 % und bis zu drei Yinglung's-Edge-Stapel durch Battle Skills beliebiger Teammitglieder. Off-Piece: Redeemer Seal (Intellekt und Ultimate-Effizienz)."
    - id: "si-main"
      title: "Type 50 Yinglung · Max. DMG"
      role: "main-dps"
      meta: true
      metaTag: "max-dmg"
      metaSummary: "Drei neue Type-50-Teile und LYNX Slab für maximalen eigenen Combo-Schaden, wenn die Ultimate auch ohne zusätzliches Energie-Off-Piece zuverlässig einsatzbereit ist."
      items: ["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "365"]
      availableFromLevel: 70
      teamContext: "Main DPS und Sub DPS, besonders wenn andere Teammitglieder die nötigen Battle Skills für Yinglung's Edge einsetzen."
      evaluation: "Für maximalen eigenen Combo-Schaden werden drei neue Type-50-Yinglung-Teile mit LYNX Slab kombiniert. Der Dreierbonus liefert ANG +15 % und stapelweise bis zu 60 % Bonus auf die nächste Kombofertigkeit, nachdem Teammitglieder ihre Battle Skills verwendet haben. Besonders stark, wenn die Ultimate auch ohne zusätzliche Energieeffizienz rechtzeitig bereitsteht."
      setBonusNotes: "3× Type 50 Yinglung: ANG +15 %, je Battle Skill eines Teammitglieds ein Stapel Yinglung's Edge bis maximal drei; je Stapel +20 % Schaden auf Sis nächste Kombofertigkeit. LYNX Slab als Off-Piece."
    - id: "si-energy"
      title: "Type 50 · Alternative mit Ultimate-Energie"
      role: "sub-dps"
      meta: false
      items: ["type-50-yinglung-soft-armor", "type-50-yinglung-gauntlets", "type-50-yinglung-beacon", "334"]
      availableFromLevel: 70
      teamContext: "Wenn die Ultimate in deiner tatsächlichen Rotation sonst nicht rechtzeitig für den Team-Buff zurückkehrt."
      evaluation: "Die drei Type-50-Teile bleiben für Combo-Schaden erhalten, ein Xiranit Power Core ersetzt das LYNX-Off-Piece als situationsabhängige Option. Nur nutzen, wenn dadurch ein relevanter Ultimate-Einsatz rechtzeitig möglich wird; sonst bleibt das LYNX-Standardsetup. Das ist keine Behauptung, diese Variante sei allgemein stärker."
      setBonusNotes: "3× Type 50 Yinglung bleibt aktiv; Eternal-Xiranite-Teil im Off-Slot aktiviert ohne weitere Teile keinen eigenen zweiten Setbonus."
    - id: "si-maximum-combo"
      title: "Combo-Fokus · zwei Type-50-Beacons"
      role: "main-dps"
      meta: false
      items: ["type-50-yinglung-soft-armor", "eternal-xiranite-channeling-gloves", "type-50-yinglung-beacon", "type-50-yinglung-beacon"]
      availableFromLevel: 70
      teamContext: "Experimentelle Maximierung des eigenen Tinten-Lung-Schadens nach bekannten Release-Werten; nicht das voreingestellte eigene Meta-Setup."
      evaluation: "Unabhängige frühe Berechnungen vergleichen den Combo-Bonus von zwei Type-50-Beacons mit einem Eternal-Xiranite-Channeling-Gloves-Off-Piece. Diese Kombination ist vor allem für Main-DPS-Szenarien interessant, wenn alle drei Yinglung's-Edge-Stapel vor der Combo verlässlich entstehen. Sie bleibt eine experimentelle Alternative zu den beiden Meta-Builds."
      setBonusNotes: "Soft Armor + zwei Beacons = drei Type-50-Teile. Channeling Gloves bleiben ein einzelnes Off-Piece."
    - id: "si-support-xiranite"
      title: "Support · Eternal Xiranite 1.6"
      role: "support"
      meta: true
      metaTag: "max-buffs"
      metaSummary: "Situativer Support-Build für maximale Team-Buffs, wenn sonst niemand den Eternal-Xiranite-Setbonus übernimmt. Type 50 dürfte in den meisten Situationen stärker sein."
      items: ["eternal-xiranite-overalls", "eternal-xiranite-channeling-gloves", "eternal-xiranite-rangefinder", "334"]
      availableFromLevel: 70
      teamContext: "Nur wenn kein anderer Operator bereits den relevanten Eternal-Xiranite-Setbonus bereitstellt."
      evaluation: "Das neue Eternal-Xiranite-Set ist eine Nischenalternative für Teams, in denen kein anderer Operator den relevanten Setbonus bereitstellt und die Buff-Rolle im Vordergrund steht. Das Type-50-Yinglung-Set wird in den meisten Situationen voraussichtlich mehr leisten; die Xiranit-Variante lohnt sich daher nur bei einem passenden Teamaufbau und klaren Buff-Vorteilen."
      setBonusNotes: "Der Xiranit-3er-Bonus kann in einem Team normalerweise nicht mehrfach sinnvoll gestapelt werden; zuerst die vorhandenen Support-Ausrüstungen prüfen."
    - id: "si-early-access"
      title: "Type 50 Yinglung · Early Access"
      role: "main-dps"
      meta: true
      metaTag: "early-access"
      metaSummary: "Früher erreichbarer Type-50-Dreierbonus ohne die neuen v1.6-Teile: Redeemer Armor, ältere Yinglung Gloves und zweimal Yinglung Knife T1. Ideal als Übergang bis zum vollständigen 1.6-Set."
      items: ["796", "411", "342", "342"]
      availableFromLevel: 70
      teamContext: "Level-70-Übergang, solange die neuen Type-50-Ausrüstungsteile aus Version 1.6 noch nicht freigeschaltet sind."
      evaluation: "Redeemer Armor liefert viel Intellekt und Ultimate-Effizienz. Die älteren Type 50 Yinglung Gloves steuern Kombofertigkeitsschaden und etwas Intellekt bei, besitzen aber Beweglichkeit statt Stärke als Hauptattribut. Beide Type 50 Yinglung Knife T1 ergänzen Intellekt, Stärke und allgemeinen Fertigkeitsschaden. Mit insgesamt drei Type-50-Teilen bleibt der volle Yinglung's-Edge-Dreierbonus erhalten. Dieses Setup ist eine Übergangslösung und kein Ersatz für die besseren neuen v1.6-Teile."
      setBonusNotes: "3× Type 50 Yinglung: ANG +15 %; Battle Skills aus dem Team erzeugen bis zu drei Yinglung's-Edge-Stapel für die nächste Kombofertigkeit. Redeemer Armor als Off-Piece mit Intellekt und Ultimate-Effizienz."
    - id: "si-level60"
      title: "Level 60 · AIC Fieldwork"
      role: "main-dps"
      meta: false
      items: ["1116", "1122", "1120", "1120"]
      availableFromLevel: 60
      teamContext: "Vorläufige Progressionskonfiguration, solange neue Level-70-Teile noch nicht vorhanden sind."
      evaluation: "Das AIC-Fieldwork-Set stellt frühzeitig Haupt- und Sekundärattribute sowie nutzbare allgemeine Werte bereit. Für Si stehen dabei Intellekt und Stärke im Vordergrund. Die beiden Ember-Kits unterstützen ein vorläufiges Setup; konkrete Skill- und Ultimate-Energie-Nutzung hängt von der verfügbaren Ausrüstung und der Combo-Rotation ab."
      setBonusNotes: "Übergang bis Type-50- beziehungsweise Xiranit-Ausrüstung; kein behaupteter Endgame-DPS-Vergleich."
    - id: "si-level50"
      title: "Level 50 · Mordvolt Insulation"
      role: "main-dps"
      meta: false
      items: ["322", "323", "327", "291"]
      availableFromLevel: 50
      teamContext: "Übergangs-Build für Kryo-Schaden und eigene Combo-Fenster vor den Level-60-/70-Sets."
      evaluation: "Drei Mordvolt-Insulation-Teile verbessern Intellekt und verstärken den Künste-Schaden, solange Si über 80 % LP bleibt. Das Aburrey Flashlight ergänzt Intellekt, Stärke und Ultimate-Effizienz. Die Variante nutzt reale Level-50-Ausrüstung, ohne bereits Zugang zur neuen 1.6-Story-Ausrüstung vorauszusetzen."
      setBonusNotes: "3× Mordvolt Insulation: +50 Intellekt; über 80 % LP erhöhter Künste-Schaden. Off-Piece: Aburrey Flashlight für Intellekt, Stärke und Ultimate-Effizienz."
    - id: "si-level36"
      title: "Level 36 · Mordvolt Insulation"
      role: "main-dps"
      meta: false
      items: ["256", "259", "266", "262"]
      availableFromLevel: 36
      teamContext: "Frühe Kryo-/Combo-Progression, bevor Level-50-Ausrüstung zugänglich ist."
      evaluation: "Die Mordvolt-Insulation-Weste vereint Intellekt und Stärke, die Handschuhe ergänzen weiteren Intellekt. Wrench und Wrench T1 stärken Angriff beziehungsweise Kryo-Schaden. Bereits mit drei Teilen ist der Mordvolt-Setbonus aktiv. Achte im Kampf auf genügend LP für den zusätzlichen Künste-Schadensbonus."
      setBonusNotes: "3× Mordvolt Insulation: +50 Intellekt und zusätzlicher Künste-Schaden oberhalb von 80 % LP."
  progression:
    - stage: "early"
      note: "Ab Level 36 kann Si mit Mordvolt Insulation in den Kryo- und Combo-Fokus einsteigen. Stärke und Intellekt auf den verfügbaren Teilen priorisieren; Blaupausen vorher im Finder prüfen."
    - stage: "mid"
      note: "Level 50: mit Mordvolt Insulation und Aburrey Flashlight weiter ausbauen. Ab Level 60 ist AIC Fieldwork eine weitere Übergangslösung."
    - stage: "late"
      note: "Level 70: Vor dem Freischalten der neuen v1.6-Ausrüstung ist Early Access mit Redeemer Armor und drei älteren Yinglung-Teilen ein vollständiger Übergangsbuild. Sobald das neue Gebiet und die entsprechenden Story-Freischaltungen erreicht sind, drei neue Type-50-Teile anstreben. Redeemer Seal für Balanced-Rotationen, LYNX Slab für maximalen eigenen Schaden."
    - stage: "endgame"
      note: "Das mit Version 1.6 neu erschienene Type-50-Yinglung-Set ist Sis Go-to-Set. Mit Redeemer Seal ist es ausgewogen, mit LYNX Slab auf maximalen eigenen Combo-Schaden ausgerichtet. Eternal Xiranite bleibt eine stark situationsabhängige Nischenalternative, wenn der Setbonus im Team noch fehlt."
potentials:
  entries:
    - level: 1
      evaluation: "Die verlängerte Bewegungsunfähigkeit und der höhere Schadensspeicherwert vergrößern Sis Kontroll- und Burstfenster. Bei beweglichen Zielen besonders nützlich, aber nicht nötig, damit die Tintenseele funktioniert."
      increaseOverPreviousPercent: 5.6
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 2
      evaluation: "Ein zusätzlicher ANG-Buff für Si nach der Kombo; die Höhe wächst mit verbrauchten oder absorbierten Kumulierungen eines einzelnen Ziels. Gerade für ihre eigene DPS-Rolle attraktiv."
      increaseOverPreviousPercent: 6.2
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 3
      evaluation: "Verstärkt Schaden UND Kryo-/Hitze-Verstärkung ihrer Ultimate auf das 1,2-Fache. Auch für Teamsupport relevant, nicht nur für persönliche DPS."
      increaseOverPreviousPercent: 3.6
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 4
      evaluation: "Die Ultimate kostet 15 % weniger Energie. Der Nutzen hängt entscheidend davon ab, ob du dadurch innerhalb der tatsächlichen Rotation einen früheren oder zusätzlichen Einsatz erreichst."
      increaseOverPreviousPercent: 2.8
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
    - level: 5
      evaluation: "Die Combo erhält 15 % mehr Schaden, zwei Sekunden weniger Abklingzeit und zählt ein weiteres Infliction-Stack beim Auslösen. Dadurch verstärkt P5 auch den Bonus von P2; für Haupt-DPS besonders interessant."
      increaseOverPreviousPercent: 9.3
      comparisonConditions: "Datafield-Charakterprofil Si, Reiter DPS Potentials, 16.10.2026. Jeder Wert ist nur der relative Zugewinn zur unmittelbar vorherigen Stufe und gilt ausschließlich für das modellierte DPS-Szenario."
      sourceNote: "Datafield"
teams:
  introduction: "Si lässt sich flexibel in Kryo- und Hitze-Teams einsetzen oder selbst als Main DPS spielen. Ein Hitze-Operator auf Teamposition 1 verändert ihre aufgetragene Kumulierung zu Hitze. Entscheidend sind der Verbrauch dieser Kumulierung für die Combo, das Timing der Tintenseele und die Ultimate-Verstärkung. Die übrigen Teammitglieder beeinflussen dabei FP-Wirtschaft und Reaktionsketten."
  roles: ["support", "sub-dps", "main-dps"]
  meta:
    - id: "yvonne-1"
      title: "Yvonne Main DPS"
      role: "support"
      members: ["yvonne", "tangtang", "xaihi", "si"]
      buildId: "si-main"
      evaluation: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Tangtang ergänzt die Kryo-Rotation. Abfolge und Buff-Fenster an die eigene Rotation anpassen."
    - id: "last-rite-10"
      title: "Last Rite Main DPS"
      role: "support"
      members: ["last-rite", "tangtang", "xaihi", "si"]
      buildId: "si-main"
      evaluation: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Tangtang ergänzt die Kryo-Rotation. Abfolge und Buff-Fenster an die eigene Rotation anpassen."
    - id: "laevatain-16"
      title: "Laevatain Main DPS"
      role: "support"
      members: ["laevatain", "wulfgard", "camille", "si"]
      buildId: "si-support-xiranite"
      evaluation: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Abfolge und Buff-Fenster an die eigene Rotation anpassen."
    - id: "rossi-25"
      title: "Rossi Main DPS"
      role: "support"
      members: ["rossi", "mi-fu", "gilberta", "si"]
      buildId: "si-main"
      evaluation: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Gilbertas Timing und die Reihenfolge der Kombofertigkeiten sind zu beachten. Abfolge und Buff-Fenster an die eigene Rotation anpassen."
    - id: "si-34"
      title: "Si Main DPS"
      role: "main-dps"
      members: ["si", "tangtang", "arcane", "xaihi"]
      buildId: "si-main"
      evaluation: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Abfolge und Buff-Fenster an die eigene Rotation anpassen."
    - id: "si-35"
      title: "Si Main DPS (2)"
      role: "main-dps"
      members: ["si", "tangtang", "arcane", "gilberta"]
      buildId: "si-main"
      evaluation: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Abfolge und Buff-Fenster an die eigene Rotation anpassen."
  more:
    - id: "yvonne-2"
      title: "Yvonne · Arcane · Xaihi"
      role: "support"
      members: ["yvonne", "arcane", "xaihi", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "yvonne-3"
      title: "Yvonne · Tangtang · Arcane"
      role: "support"
      members: ["yvonne", "tangtang", "arcane", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "yvonne-4"
      title: "Yvonne · Snowshine · Alesh"
      role: "support"
      members: ["yvonne", "snowshine", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "yvonne-5"
      title: "Yvonne · Perlica · Alesh"
      role: "support"
      members: ["yvonne", "perlica", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "yvonne-6"
      title: "Yvonne · Snowshine · Perlica"
      role: "support"
      members: ["yvonne", "snowshine", "perlica", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "yvonne-7"
      title: "Yvonne · Arcane · Fluorite"
      role: "support"
      members: ["yvonne", "arcane", "fluorite", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "yvonne-8"
      title: "Yvonne · Arcane · Gilberta"
      role: "support"
      members: ["yvonne", "arcane", "gilberta", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "yvonne-9"
      title: "Yvonne · Arcane · Purrchena"
      role: "support"
      members: ["yvonne", "arcane", "purrchena", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "last-rite-11"
      title: "Last Rite · Arcane · Xaihi"
      role: "support"
      members: ["last-rite", "arcane", "xaihi", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "last-rite-12"
      title: "Last Rite · Tangtang · Arcane"
      role: "support"
      members: ["last-rite", "tangtang", "arcane", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "last-rite-13"
      title: "Last Rite · Snowshine · Alesh"
      role: "support"
      members: ["last-rite", "snowshine", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "last-rite-14"
      title: "Last Rite · Perlica · Alesh"
      role: "support"
      members: ["last-rite", "perlica", "alesh", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "last-rite-15"
      title: "Last Rite · Snowshine · Perlica"
      role: "support"
      members: ["last-rite", "snowshine", "perlica", "si"]
      buildId: "si-main"
      note: "Kryo-Team: Si belegt das Ziel mit Künstlerischer Absicht, bereitet Kryo-Kumulierung vor und kann die Teamrotation mit Kryo-Verstärkung unterstützen. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-17"
      title: "Laevatain · Akekuri · Camille"
      role: "support"
      members: ["laevatain", "akekuri", "camille", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-18"
      title: "Laevatain · Ardelia · Camille"
      role: "support"
      members: ["laevatain", "ardelia", "camille", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-19"
      title: "Laevatain · Antal · Camille"
      role: "support"
      members: ["laevatain", "antal", "camille", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-20"
      title: "Laevatain · Wulfgard · Akekuri"
      role: "support"
      members: ["laevatain", "wulfgard", "akekuri", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-21"
      title: "Laevatain · Antal · Akekuri"
      role: "support"
      members: ["laevatain", "antal", "akekuri", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-22"
      title: "Laevatain · Antal · Ardelia"
      role: "support"
      members: ["laevatain", "antal", "ardelia", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-23"
      title: "Laevatain · Wulfgard · Ardelia"
      role: "support"
      members: ["laevatain", "wulfgard", "ardelia", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "laevatain-24"
      title: "Laevatain · Wulfgard · Perlica"
      role: "support"
      members: ["laevatain", "wulfgard", "perlica", "si"]
      buildId: "si-support-xiranite"
      note: "Hitze-Aufstellung: Laevatain an Position 1 aktiviert Sis Hitze-Kumulierung; die Ultimative Fertigkeit unterstützt mit Hitze-Verstärkung. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-26"
      title: "Rossi · Mi Fu · Camille"
      role: "support"
      members: ["rossi", "mi-fu", "camille", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-27"
      title: "Rossi · Mi Fu · Pogranichnik"
      role: "support"
      members: ["rossi", "mi-fu", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-28"
      title: "Rossi · Endministrator · Gilberta"
      role: "support"
      members: ["rossi", "endministrator", "gilberta", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Gilbertas Timing und die Reihenfolge der Kombofertigkeiten sind zu beachten. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-29"
      title: "Rossi · Endministrator · Camille"
      role: "support"
      members: ["rossi", "endministrator", "camille", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-30"
      title: "Rossi · Endministrator · Pogranichnik"
      role: "support"
      members: ["rossi", "endministrator", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-31"
      title: "Rossi · Chen Qianyu · Pogranichnik"
      role: "support"
      members: ["rossi", "chen-qianyu", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-32"
      title: "Rossi · Lifeng · Pogranichnik"
      role: "support"
      members: ["rossi", "lifeng", "pogranichnik", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "rossi-33"
      title: "Rossi · Chen Qianyu · Lifeng"
      role: "support"
      members: ["rossi", "chen-qianyu", "lifeng", "si"]
      buildId: "si-main"
      note: "Rossi-Zusammenstellung: Si dient als flexible Zusatzschadensquelle und ermöglicht mithilfe der Tintenseele zusätzliche Trefferfenster. Die tatsächliche FP-Bilanz und Skillabfolge müssen an deinen Spielstand angepasst werden. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-36"
      title: "Tangtang · Alesh · Xaihi"
      role: "main-dps"
      members: ["si", "tangtang", "alesh", "xaihi"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-37"
      title: "Tangtang · Perlica · Xaihi"
      role: "main-dps"
      members: ["si", "tangtang", "perlica", "xaihi"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-38"
      title: "Arcane · Alesh · Xaihi"
      role: "main-dps"
      members: ["si", "arcane", "alesh", "xaihi"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-39"
      title: "Arcane · Alesh · Gilberta"
      role: "main-dps"
      members: ["si", "arcane", "alesh", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-40"
      title: "Arcane · Perlica · Gilberta"
      role: "main-dps"
      members: ["si", "arcane", "perlica", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Arcane bietet zusätzliche Reaktions- und Bufffenster. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-41"
      title: "Tangtang · Alesh · Gilberta"
      role: "main-dps"
      members: ["si", "tangtang", "alesh", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-42"
      title: "Tangtang · Perlica · Gilberta"
      role: "main-dps"
      members: ["si", "tangtang", "perlica", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Tangtang ergänzt die Kryo-Rotation. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
    - id: "si-43"
      title: "Snowshine · Perlica · Gilberta"
      role: "main-dps"
      members: ["si", "snowshine", "perlica", "gilberta"]
      buildId: "si-main"
      note: "Si selbst führt das Team an: Kryo-Kumulierungen, Tintenseele und eigene Combo-Schadensfenster stehen im Mittelpunkt. Gilbertas Timing und die Reihenfolge der Kombofertigkeiten sind zu beachten. Weitere mögliche Teamkombination, deren FP- und Combo-Timing vom Einsatz abhängt."
gameplay:
  pending: true
  showcases: []
conclusion:
  verdict: "Si ist nach dem Release eine außergewöhnlich vielseitige Kryo-Unterstützerin mit dem Potenzial, selbst Main DPS oder Sub DPS zu spielen. Die von mir markierten Teams decken Yvonne, Last Rite, Laevatain, Rossi sowie Si-als-DPS ab. Ihre Stärke ist nicht nur persönlicher Kombofertigkeitsschaden, sondern die Kontrolle über Tintenseele und Künstlerische Absicht sowie der Buff für Kryo und Hitze. Die Mechaniken sind grundsätzlich gut zugänglich; erst FP-Timing, Reaktionsfenster und exakte Teamreihenfolge machen sie anspruchsvoller."
  recommendation: "recommended"
  pullAdvice: "Für Accounts mit Kryo- oder Hitze-Schwerpunkt ist Si eine besonders interessante Ergänzung. Dank hoher Flexibilität kann sie verschiedene Teamrollen füllen und auch eine eigene DPS-Aufstellung ermöglichen. Jadegefäß und Type-50-Set sind meine bevorzugte Investitionsrichtung, die neuen Item-IDs und die ersten unabhängigen Rotationsvergleiche sind aber kurz nach dem Release noch nicht vollständig bestätigt. Wer ausschließlich maximale eigene Burst-Zahlen verfolgt, sollte das finale Feintuning mit etablierten Rechnungen und der eigenen FP-Rotation vergleichen."
  recommendedFor:
    - "Yvonne- und Last-Rite-Teams, die zusätzliche Kryo-Kumulierung, Kontrolle und Kryo-Verstärkung nutzen."
    - "Laevatain-Teams, in denen Si bei einem Hitze-Operator auf Teamposition 1 Hitze statt Kryo auftragen kann."
    - "Spieler, die Si als Main DPS mit Combo-Fokus und passender Teamunterstützung ausbauen möchten."
  skipIf:
    - "Du hast keine Nutzung für Kryo-/Hitze-Verstärkung und keine Möglichkeit, an das neue Ausrüstungs-Set zu kommen."
---

Si verbindet hohen eigenen Kryo-Combo-Schaden mit flexibler Unterstützung für Kryo- und Hitze-Teams.
