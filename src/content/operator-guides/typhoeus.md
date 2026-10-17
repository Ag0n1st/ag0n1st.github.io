---
# Typhoeus: eigene redaktionelle Grundlage = Typhi-YouTube-Skript (16 Seiten);
# objektive Zahlen = official SKPORT. Ergänzende externe Team-/Gear-Checks
# in docs/typhoeus-source-audit-20261016.md dokumentiert.
operator: typhoeus
displayName: Typhoeus
status: published
updatedAt: 2026-10-16
listing:
  releaseDate: 2026-09-02
  listedAt: 2026-10-17
  category: character
  summaryDe: "Typhoeus richtig spielen: Natur-Explosionen, Jagdpfeile, Ausrüstung und Teams."
  summaryEn: "Master Typhoeus: Nature Bursts, Hunting Arrows, gear and team compositions."
  visible: true

guideVideo:
  title: "Typhoeus Guide (Deutsch) – Builds, Teams & Gameplay"
  url: "https://www.youtube.com/watch?v=wNVJkGzkfMg"

overview:
  summary: >-
    Typhoeus – kurz Typhi – ist eine 6★-Natur-Strikerin mit Arts Unit und
    spielt als aktiver Main DPS. Ihre stärksten Angriffe sind die Energieschüsse
    im Schwebeflug, die Natur-Explosionen erzwingen. Natur-Stacks ihrer
    Teammitglieder verstärken diese Explosionen zusätzlich und liefern
    Zeichen für weitere Jagdpfeile. Besonders gegen zwei gleichzeitig
    getroffene Gegner ist ihr Schadenspotenzial hoch; die genaue Rotation,
    Ressourcenverwaltung und Positionierung sind anspruchsvoller als bei
    vielen anderen Main-DPS-Operatoren.
  traits: ["Damage Dealer", "Arts Burst"]
  strengths:
    - "Hoher Natur-Explosionsschaden durch Energieschüsse – mit zuverlässigen Natur-Stacks besonders wirkungsvoll."
    - "Bis zu zwei Ziele gleichzeitig im Schwebeflug; stark in Kämpfen gegen mehrere Gegner."
    - "Kombofertigkeit und Ultimate können die fünf Luftangriffe zurücksetzen und den Schwebeflug verlängern."
    - "Starke, gezielte Synergie mit Arcane oder Fluorite als zuverlässiger Natur-Stack-Quelle und wenigen passenden Support-Kombinationen."
  weaknesses:
    - "Sehr eingeschränkte Teamflexibilität: Verlässliche Natur-Stacks erfordern nach meiner Einordnung zwingend Arcane oder Fluorite; viele andere Team-Slots fallen dadurch weg."
    - "100 FP pro Battle Skill und bis zu 200 Ultimate-Energie; FP-Management und Final Strikes sind entscheidend."
    - "Unterbrechungen im Schwebeflug kosten wichtige Energieschüsse; die Schutzbarriere kann brechen und hat eine lange Reaktivierungszeit."
    - "Die Signature-Waffe liegt deutlich vor den Alternativen; für andere Waffen und unvollständige Teams sinkt ihr Potenzial."
  ratings:
    difficulty: 5
    flexibility: 1
  featuredBuildId: deep-rampart-lynx
  partners: []

operatorKit:
  playstyle: >-
    Typhis gesamte Spielweise dreht sich um zwei Ressourcen: Zeichen und
    Jagdpfeile. Die Jagdpfeile sind ihre Munition für Energieschüsse
    (Power Shots), während Zeichen im Verhältnis 2:1 über ihre Combo
    Skill in neue Jagdpfeile umgewandelt werden. Maximal sind acht
    Zeichen und vier Jagdpfeile möglich. Auf höchster Stufe ihres
    Kampftalents Beute-Checkliste beginnt sie mit vier Zeichen;
    außerhalb des Kampfes füllen sich ihre Jagdpfeile wieder auf.
    Starte einen Kampf nach Möglichkeit mit vier Jagdpfeilen.

    Mit ihrem Battle Skill (100 FP) geht Typhi in den Schwebeflug und
    kann fünf Luftangriffe ausführen. Verbraucht ein Angriff einen
    Jagdpfeil, wird er zum Energieschuss und erzwingt beim Treffer
    eine Natur-Explosion – auch ohne vorherigen Natur-Stack. Trifft
    ein Luftangriff einen Gegner mit Natur-Anhaftung, verbraucht er
    einen Stack und gibt ein Zeichen sowie zwölf Ultimate-Energie.
    Die so erzeugte Natur-Explosion gibt über Beute-Checkliste ein
    weiteres Zeichen; ein Energieschuss auf einen Gegner mit
    vorhandenem Natur-Stack kann dadurch zwei Zeichen liefern.
    Die Natur-Explosion dieses Treffers erhält zusätzlich den
    Bonus für einen verbrauchten Stack. Der fünfte Luftangriff
    zählt bei aktiver Steuerung stets als Final Strike und als
    Energieschuss, verbraucht dafür aber keinen Jagdpfeil.

    Beim Erreichen von acht Zeichen lässt sich die Combo Skill
    aktivieren: Sie tauscht die Zeichen gegen vier Jagdpfeile,
    setzt Typhis Luftangriffssequenz zurück und erzeugt eine
    Sperrfeuerreihe, in der Gegner verlangsamt werden, fortlaufend
    Naturschaden erleiden und erhöhten Natur-Explosionsschaden
    erhalten. Die maximale Combo-Cooldown-Verbesserung liegt
    bei 19 Sekunden; sie ist also kein beliebig oft wiederholbarer
    Reset innerhalb einer einzelnen kurzen Sequenz.

    Ihre Ultimate verbraucht 200 Energie, gibt sofort zwei
    Jagdpfeile, versetzt sie erneut in den Schwebeflug, setzt
    die Luftangriffe zurück und ergänzt sie um einen
    Pfeilhagel pro Treffer; der fünfte Pfeilhagel ist verstärkt.
    Das ist ein starkes Zusatzfenster, der Kern ihres Schadens
    bleibt aber das wiederholte Auslösen und Verstärken von
    Natur-Explosionen durch gut vorbereitete Energieschüsse.
    Deshalb Natur-Stacks vor dem Schadensfenster vorbereiten,
    Battle Skill und Combo nicht zu früh verschwenden und die
    FP-Generierung zwischen den Schwebeflugphasen einplanen.

    Im Schwebeflug erhält Typhi durch ihr zweites Kampftalent eine
    Schutzbarriere mit bis zu 30 % Schadensreduktion. Ein Treffer
    kann sie zerbrechen; auf höchster Talentstufe lässt sie
    sich erst nach 18 Sekunden wieder aktivieren. Achte daher
    auf gegnerische Angriffe und nutze Dodge Cancels nach dem
    normalen Final Strike sowie nach der Landung, um die
    Angriffsfolge schneller fortzusetzen.

skills:
  priority:
    order: [battle, combo, ultimate, basic]
    comparisons: [">", ">", "="]
    targetLevels:
      battle: "M3"
      combo: "M3"
  active:
    basic: >-
      Der normale Basisangriff umfasst fünf Natur-Treffer.
      Der Final Strike gibt 17 Taumelpunkte und ist außerhalb
      des Schwebeflugs besonders für FP-Regeneration wichtig.
      Setze nach dem Final Strike bei Bedarf einen Dodge Cancel,
      um seine lange Abschlussanimation zu verkürzen. Die
      Hauptschadensquelle ist nicht das Hochleveln normaler
      Basisangriffe; investiere hier zuletzt.
    battle: >-
      Höchste Priorität und langfristig M3. Der Battle Skill
      startet für 100 FP den Schwebeflug mit bis zu fünf
      Luftangriffen gegen maximal zwei Ziele. Jagdpfeile
      verstärken Luftangriffe zu Energieschüssen und lösen
      Natur-Explosionen aus. Trifft der Energieschuss auf
      vorhandene Natur-Stacks, werden diese verbraucht und
      der Explosionsschaden steigt. Jede so verbrauchte
      Natur-Anhaftung liefert zudem ein Zeichen und
      zwölf Ultimate-Energie. Die letzte Luftattacke
      zählt ohne Munitionseinsatz als Power Shot und
      Final Strike. Gerade die Werte der Nature-Burst-
      Multiplikatoren steigen mit den Skillstufen.
    combo: >-
      Zweite Priorität und ebenfalls M3 als Langzeitziel.
      Acht Zeichen lösen Rampant Thorns aus: Sie ergeben
      vier Jagdpfeile, setzen die Luftangriffssequenz
      zurück und schaffen eine Sperrfeuerreihe.
      Dieses Feld verlangsamt die Gegner und erhöht
      ihren erlittenen Natur-Explosionsschaden. Auf
      M3 sinkt der Cooldown auf 19 Sekunden. In der
      Rotation das erneute Luftangriffsfenster mit
      bereits vorbereiteten Natur-Stacks kombinieren;
      der Combo-Reset allein erzeugt sie nicht.
    ultimate: >-
      Hinter Battle und Combo priorisieren. Mit
      200 Ultimate-Energie aktiviert Call of Ice Mountain
      einen starken Auftakttreffer, zwei zusätzliche
      Jagdpfeile, den Schwebeflug-Reset und fünf
      anschließende Pfeilhagel. Der fünfte
      Pfeilhagel ist besonders stark. Für einen
      optimierten Schadensburst kann der Battle Skill
      direkt davor sinnvoll sein, um den Effekt der
      Signature-Waffe rechtzeitig zu aktivieren.
      Die Ultimate ist eine Erweiterung der
      Energieschuss-Rotation, aber nicht der Grund,
      warum Typhi ihre höchsten Natur-Explosionen
      erreicht.
  combatTalents:
    - talentId: prey-checklist
      evaluation: >-
        Das wichtigste Grundtalent für die komplette Rotation:
        Natur-Explosionen liefern Zeichen, die in Jagdpfeile
        umgewandelt werden. Bei der dritten Talentstufe
        startet Typhi mit vier statt nur einem Zeichen,
        und der von Jagdpfeilen verstärkte Angriff
        erhält den Faktor 1,6. Bei gleichzeitig
        explodierenden Gegnern zählt der Natur-Burst-
        Auslöser laut offiziellem Text nur einmal
        für die Zeichengenerierung.
    - talentId: huntress-s-focus
      evaluation: >-
        Die Schutzbarriere hilft, den Schwebeflug
        vollständig auszuspielen. Auf der
        höchsten Talentstufe: 30 % weniger Schaden
        solange die Barriere hält und 18 Sekunden
        Reaktivierungszeit nach ihrem Zerbrechen.
        Sie ist kein dauerhafter Unterbrechungsschutz.
  shipTalents:
    - talentId: lithic-murmurs
      evaluation: >-
        Wachstumsrate seltener Mineralien in der
        Wachstumskammer. Für die Kampfrotation
        irrelevant; die tatsächlichen Werte und
        Freischaltstufen stammen aus der
        offiziellen Talente-Tabelle.
    - talentId: life-in-the-spores
      evaluation: >-
        Erhöht in der Wachstumskammer das
        Wachstum von Pilzmaterial. Ein
        Wirtschafts-/Basisbonus, kein Grund
        für eine bestimmte Teamzusammenstellung.

weapons:
  recommendations:
    - weaponId: "1175"
      category: bis
      evaluation: >-
        Umbra of Frigid Eventide ist ihre mit Abstand
        passendste Waffe. Neben Beweglichkeit und
        ANG erhält Typhi beim Einsatz des Battle Skill
        15 Sekunden Arts-Intensität und vier Windform-
        Stacks. Die anschließenden Natur-Explosionen
        durch Energieschüsse verbrauchen diese Stacks
        und erhöhen ihre weiteren Arts-Schadenswerte.
        Deshalb besonders für Boss-Rotationen den
        Battle Skill unmittelbar vor den geplanten
        Schwebeflug- und Ultimate-Burst legen.
    - weaponId: "1177"
      category: bp
      evaluation: >-
        Suffering's End ist die sinnvolle Battle-Pass-
        Alternative. Die Eigenschaften passen deutlich
        besser zu einem auf Beweglichkeit skalierenden
        Natur-DPS als viele ältere Arts Units. Ihr fehlen
        jedoch die maßgeschneiderten Windform-Buffs
        der Signature-Waffe; sie ist eine Alternative,
        keine gleichwertige BiS-Option.
    - weaponId: "47"
      category: alternative
      evaluation: >-
        Detonation Unit ist als Notlösung theoretisch
        spielbar. Ihr Effekt ist jedoch nicht so präzise
        auf Jagdpfeile und Nature Bursts abgestimmt
        wie bei der Signature-Waffe oder Suffering's
        End. Nur erwägen, wenn die beiden besseren
        Waffen nicht verfügbar sind.
  comparisons:
    - id: ardelia-arcane-liino
      title: "Ardelia Arcane Liino Team"
      sourcePageType: character-profile
      sourceNote: "Datafield"
      snapshotDate: "2026-10-16"
      referenceWeaponId: "1175"
      referenceRank: 4
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, Reiter "Ardelia Arcane Liino",
        erfasst am 16.10.2026. 100 % entsprechen Umbra of Frigid
        Eventide R4 in genau diesem Szenario. Rotation, Waffen-/Team-
        Ränge, Potenziale und andere Modellparameter wurden nicht
        unabhängig mit dem verlinkten Original-Spreadsheet abgeglichen.
      entries:
        - { weaponId: "1175", rank: 9, performancePercent: 124.7 }
        - { weaponId: "1175", rank: 4, performancePercent: 100.0 }
        - { weaponId: "1177", rank: 9, performancePercent: 84.3 }
        - { weaponId: "47", rank: 9, performancePercent: 78.1 }
        - { weaponId: "1177", rank: 4, performancePercent: 77.0 }
        - { weaponId: "47", rank: 4, performancePercent: 72.2 }
        - { weaponId: "65", rank: 9, performancePercent: 69.0 }
        - { weaponId: "65", rank: 4, performancePercent: 66.3 }
    - id: no-liino-less-atk
      title: "Ohne Liino · weniger ANG-Buffs"
      sourcePageType: character-profile
      sourceNote: "Datafield"
      snapshotDate: "2026-10-16"
      referenceWeaponId: "1175"
      referenceRank: 4
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, Reiter
        "Non Liino Teams - LESS ATK -", erfasst am
        16.10.2026. 100 % entsprechen Umbra of Frigid
        Eventide R4 in genau diesem abweichenden Teammodell.
        Nicht mit den Prozenten des Liino-Szenarios vermischen.
      entries:
        - { weaponId: "1175", rank: 9, performancePercent: 123.3 }
        - { weaponId: "1175", rank: 4, performancePercent: 100.0 }
        - { weaponId: "1177", rank: 9, performancePercent: 79.3 }
        - { weaponId: "47", rank: 9, performancePercent: 77.5 }
        - { weaponId: "1177", rank: 4, performancePercent: 73.7 }
  generalNotes: >-
    Für Typhi ist die richtige Waffe besonders
    relevant, weil ein großer Teil ihres Schadens
    unmittelbar über die Natur-Explosionen der
    Energieschüsse entsteht. Die allgemeinen
    Empfehlungen sind unabhängig vom Waffenrang;
    die vollständigen, lokal importierten Werte
    und Tuning-Materialkosten jeder Waffe stehen
    in den aufklappbaren Waffendetails.
    Die relativen Prozente im Waffenvergleich
    stammen aus zwei separat geprüften Tabs
    des Datafield-Charakterprofils; sie gelten nur
    für deren Team- und Rotationsannahmen und
    sind keine universellen DPS-Abstände.

equipment:
  builds:
    - id: deep-rampart-lynx
      title: "Build A – Deep Rampart + LYNX Slab"
      role: main-dps
      meta: true
      metaSummary: "Standard-Endgame: drei Teile Deep Rampart für Arts-Schaden und Intensität, dazu LYNX Slab für mehr Beweglichkeit und allgemeinen Schaden."
      items: ["1239", "1238", "1240", "365"]
      availableFromLevel: 70
      teamContext: >-
        Der allgemeine Standard für die meisten Boss-
        und Mehrzielkämpfe; auch in den gezeigten
        Nefarith- und Echo-Rotationen eine robuste Wahl.
      evaluation: >-
        Tiefer Wall (Deep Rampart) ist für Typhis
        Natur-Explosionen maßgeschneidert: drei
        Set-Teile liefern Arts-Intensität und passende
        Schadensverstärkungen. Die LYNX Slab als
        viertes Teil bringt einen breiteren Wert für
        ihre gesamte Schadensrotation. Basis-Angriffe,
        Luftangriffe, Combo, Ultimate und Natur-Bursts
        profitieren damit in unterschiedlichen Anteilen.
        Genau dieses Setup ist die Standardempfehlung,
        nicht bloß eine theoretische DPS-Spitze.
      setBonusNotes: >-
        3× Deep Rampart für den Setbonus; 1× LYNX
        Slab als Off-Piece. Keine zweite Setwirkung
        durch ein einzelnes LYNX-Teil.
      craftingNotes: >-
        Rüstung, Handschuhe, ein Comms und eine
        LYNX Slab benötigen vier gefertigte Teile.
        Das Erreichen von Level 70 bestätigt
        nicht automatisch den Besitz der Vorlagen;
        der Build-Finder prüft Blaupausen, Region,
        Komponenten und Level gesondert.
    - id: deep-rampart-double-comms
      title: "Build B – Deep Rampart mit zweitem Comms"
      role: main-dps
      meta: true
      metaSummary: "Für besonders große Nature-Burst-Zahlen: zweites Deep Rampart Comms statt LYNX Slab, mit engerem Fokus auf Arts-Explosionen."
      items: ["1239", "1238", "1240", "1240"]
      availableFromLevel: 70
      teamContext: >-
        Für Showcases, in denen maximale einzelne
        Natur-Explosionswerte wichtiger sind als
        universell leicht höherer Gesamtschaden.
      evaluation: >-
        Anstelle der LYNX Slab kann ein zweites
        Deep Rampart Comms verwendet werden.
        Dieser Vergleich ist kein pauschaler
        Performance-Sprung: Die Natur-Explosionen
        können stärker ausfallen, während
        die LYNX-Variante außerhalb dieser
        Explosionen (normale Hits, Luftangriffe,
        Combo und Ultimate) meist besser
        abschneidet. In der ursprünglichen
        1:1-Gegenüberstellung waren die
        Gesamtabstände klein. Entscheide,
        ob du größere Burst-Zahlen oder den
        ausbalancierteren Standardschaden willst.
      setBonusNotes: >-
        Weiterhin nur der 3er-Setbonus von Deep
        Rampart; das vierte Teil löst keinen
        zweiten Setbonus aus.
      craftingNotes: >-
        Zwei gefertigte Comms brauchen zwei
        Gegenstände, aber dieselbe freigeschaltete
        Blaupause; der Finder zählt Besitz
        und Herstellung entsprechend.
    - id: deep-rampart-ultimate
      title: "Build C – Mehr Ultimate-Energie mit LYNX Cuirass"
      role: main-dps
      meta: false
      items: ["1132", "1238", "1240", "1240"]
      availableFromLevel: 70
      teamContext: >-
        Spezielle Rotation mit erhöhtem Bedarf
        an Ultimate-Energie. Nur einsetzen,
        wenn sie ein wichtiges Ultimate-Fenster
        tatsächlich früher ermöglicht.
      evaluation: >-
        Die bedingte Ultimate-Energie-Variante aus
        meinem Mobalytics-Guide setzt auf LYNX
        Cuirass T1, Deep Rampart Gauntlets
        und zweimal Deep Rampart Comms.
        Sie verzichtet bewusst auf das Deep-
        Rampart-Armor-Teil des allgemeinen
        Standard-Builds und ist keine pauschale
        Empfehlung für jeden Kampf.
        Maßgeblich ist, ob die konkrete
        Rotation zusätzliche Ultimate-Energie
        benötigt. Die Alternative nicht
        allein wegen der 200 Energie
        automatisch über den Standard stellen.
      setBonusNotes: >-
        Zwei Deep Rampart Comms und Deep Rampart
        Gauntlets aktivieren die drei Teile des
        Sets. LYNX Cuirass T1 ist das Off-Piece.
      craftingNotes: >-
        Beide Comms müssen als zwei einzelne Teile
        gefertigt werden. Bauplanbesitz,
        Materialien und tatsächliche
        Story-Verfügbarkeit getrennt prüfen.
    - id: level-60
      title: "Build D – Level 60 · AIC Fieldwork Assault"
      role: main-dps
      items: ["1244", "1243", "1242", "1120"]
      availableFromLevel: 60
      teamContext: >-
        Übergang nach Wuling, sobald die
        dazugehörigen konkreten Vorlagen
        tatsächlich freigeschaltet sind.
      evaluation: >-
        AIC Fieldwork Assault Armor,
        Assault Gloves und Assault Push
        Knife kombinieren Hauptattribut
        mit Arts-Intensität. Der
        AIC Fieldwork Ember ergänzt
        Ultimate-Energiegewinn.
        Damit unterstützt das Set
        die Kombination aus
        Beweglichkeit, Nature Bursts
        und wiederholten Luftphasen,
        bis Deep Rampart erreichbar ist.
      craftingNotes: >-
        Item-IDs und Level 60 stammen aus
        dem offiziellen Ausrüstungskatalog.
        Story- und Bauplanbesitz
        nicht aus dem Level ableiten.
    - id: level-50
      title: "Build E – Level 50 · Roving MSGR"
      role: main-dps
      items: ["316", "317", "319", "320"]
      availableFromLevel: 50
      teamContext: >-
        Mittlerer Fortschritt mit
        Fokus auf Beweglichkeit.
      evaluation: >-
        Die Roving-MSGR-Kombination
        aus Jacket, Fists,
        Flashlight und Gyro
        stellt Beweglichkeit
        in den Vordergrund.
        Das passt direkt zu
        Typhis Hauptattribut
        und ist eine saubere
        Zwischenstufe vor der
        Arts-Intensität von
        späterem Gear.
      craftingNotes: >-
        Alle vier Teile und
        ihre Levelgrenze sind
        aus dem offiziellen
        Item-Katalog verifiziert.
    - id: level-36
      title: "Build F – Level 36 · Roving MSGR"
      role: main-dps
      items: ["247", "248", "249", "251"]
      availableFromLevel: 36
      teamContext: >-
        Frühe Ferrium-Progression,
        solange spätere Sets
        noch nicht gebaut
        werden können.
      evaluation: >-
        Vier Teile Roving MSGR
        mit direktem Fokus auf
        Beweglichkeit: Jacket,
        Fists, Flashlight und
        Gyro. Damit verbesserst
        du Typhis Hauptattribut,
        ohne einen Endgame-
        Bauplan vorauszusetzen.
        Dies ist ein
        nachvollziehbarer
        Übergangs-Build,
        keine Behauptung
        über höchste
        Endgame-DPS.
      craftingNotes: >-
        Die tatsächlichen vier
        Blaupausen müssen
        im Build-Finder manuell
        als verfügbar markiert
        werden.
  progression:
    - stage: early
      note: >-
        Level 36: Roving MSGR mit
        Ferrium als früher
        Beweglichkeits-Build.
        Die Story-/Autoritäts-
        Freischaltungen der
        vier Vorlagen einzeln
        prüfen.
    - stage: mid
      note: >-
        Level 50: Roving MSGR
        der höheren Stufe für
        mehr Beweglichkeit.
        Bis dahin lieber
        vorhandene, passende
        Rüstung weiterverwenden
        als blind Materialien
        zu verschwenden.
    - stage: late
      note: >-
        Level 60: AIC Fieldwork
        Assault für Hauptattribut
        und Arts-Intensität;
        Ember für zusätzliches
        Ultimate-Energiepotenzial.
    - stage: endgame
      note: >-
        Level 70: Deep Rampart +
        LYNX Slab standardmäßig;
        Deep Rampart Comms ×2
        für Explosion-Zahlen,
        Energy-Off-Piece nur
        bei nachgewiesenem
        Rotationsbedarf.
  generalNotes: >-
    Die Gegenüberstellung zwischen LYNX Slab
    und dem zweiten Deep Rampart Comms
    beschreibt unterschiedliche Schadens-
    Schwerpunkte, keine garantierten
    Gesamt-DPS-Abstände. Ausrüstung
    der Teammitglieder wird im
    Teams-Abschnitt getrennt als
    aufklappbares Beispiel gezeigt.
    Die Verfügbarkeit aller Vorlagen
    ist stets abhängig von deinem
    Storyfortschritt und ihrem
    tatsächlichen Besitz.

potentials:
  entries:
    - level: 1
      evaluation: >-
        Ein besonders starkes erstes
        Potenzial: 18 % mehr ANG im
        Schwebeflug und 20 % mehr
        Luftangriffsschaden.
        Die Schutzbarriere
        reagiert außerdem drei
        Sekunden früher wieder.
        Attraktiv, weil der
        ANG-Bonus auch Typhis
        Nature Bursts unterstützt.
        Trotzdem kein Muss.
      increaseOverPreviousPercent: 8.8
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, Szenario
        "Teams with energy needs", abgerufen 16.10.2026;
        nur inkrementeller Gewinn gegenüber P0
        (nicht kumulativ gegenüber P0).
        Teamrotation und Spreadsheet-Modellparameter
        wurden nicht unabhängig nachgerechnet.
      sourceNote: "Datafield"
    - level: 2
      evaluation: >-
        Solider direkter Zuwachs
        an Beweglichkeit und
        Arts-Intensität. Für
        den Hauptschaden nützlich,
        aber weniger auffällig
        als P1 und P5.
      increaseOverPreviousPercent: 4.5
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, Szenario
        "Teams with energy needs", abgerufen 16.10.2026;
        nur inkrementeller Gewinn gegenüber P1
        (nicht kumulativ gegenüber P0).
        Teamrotation und Spreadsheet-Modellparameter
        wurden nicht unabhängig nachgerechnet.
      sourceNote: "Datafield"
    - level: 3
      evaluation: >-
        Die Combo Skill kühlt
        zwei Sekunden schneller
        ab und Gegner im
        Sperrfeuerfeld
        erleiden weitere
        sechs Prozent Nature-
        Burst-Schaden.
        Der Nutzen hängt
        vom Timing und davon
        ab, ob der kürzere
        Cooldown in der
        konkreten Rotation
        überhaupt relevant wird.
      increaseOverPreviousPercent: 0.8
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, Szenario
        "Teams with energy needs", abgerufen 16.10.2026;
        nur inkrementeller Gewinn gegenüber P2
        (nicht kumulativ gegenüber P0).
        Teamrotation und Spreadsheet-Modellparameter
        wurden nicht unabhängig nachgerechnet.
      sourceNote: "Datafield"
    - level: 4
      evaluation: >-
        Senkt die hohen 200
        Ultimate-Energiekosten
        um 15 Prozent. Besonders
        interessant für Teams,
        die sonst knapp an einem
        weiteren Ultimate-Fenster
        scheitern. Kein
        pauschal garantierter
        zweiter Ultimate-Einsatz.
      increaseOverPreviousPercent: 8.3
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, Szenario
        "Teams with energy needs", abgerufen 16.10.2026;
        nur inkrementeller Gewinn gegenüber P3
        (nicht kumulativ gegenüber P0).
        Teamrotation und Spreadsheet-Modellparameter
        wurden nicht unabhängig nachgerechnet.
      sourceNote: "Datafield"
    - level: 5
      evaluation: >-
        Neben P1 der größte
        auffällige Powerspike:
        Die Ultimate gibt einen
        Jagdpfeil zusätzlich,
        ihr eigener Schaden
        steigt um 20 Prozent
        und Natur-Explosionen
        durch Energieschüsse
        erhalten den Faktor 1,1.
        Das verbessert den
        gesamten zentralen
        Energieschuss-Loop.
        Zusätzliche Kopien
        bleiben optional.
      increaseOverPreviousPercent: 6.5
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, Szenario
        "Teams with energy needs", abgerufen 16.10.2026;
        nur inkrementeller Gewinn gegenüber P4
        (nicht kumulativ gegenüber P0).
        Teamrotation und Spreadsheet-Modellparameter
        wurden nicht unabhängig nachgerechnet.
      sourceNote: "Datafield"
  comparisons:
    - id: no-extra-ultimate-energy
      title: "Teams ohne zusätzlichen Ultimate-Energiebedarf"
      sourceNote: "Datafield"
      snapshotDate: "2026-10-16"
      comparisonConditions: >-
        Datafield-Charakterprofil Typhoeus, alternativer Reiter
        "Teams without energy needs", Stand 16.10.2026.
        Jede Angabe ist der Zuwachs zum unmittelbar vorherigen
        Potenzial, keine kumulative P0-Steigerung.
      entries:
        - { level: 1, increaseOverPreviousPercent: 6.6 }
        - { level: 2, increaseOverPreviousPercent: 4.3 }
        - { level: 3, increaseOverPreviousPercent: 1.0 }
        - { level: 4, increaseOverPreviousPercent: 0.0 }
        - { level: 5, increaseOverPreviousPercent: 5.2 }

teams:
  introduction: >-
    Typhi sollte immer mit mindestens einem Teammitglied
    gespielt werden, das zuverlässig Natur-Stacks
    aufbauen kann. Arcane in der Wille-Variante
    ist die stärkste und flexibelste Partnerin:
    Natur-Anhaftungen, Gruppierung und passende Buffs
    verbinden sich zu einer sinnvollen Burst-Rotation.
    Im Wille-Build sollte Arcane nach dem
    ursprünglichen Spielbeispiel mindestens 640 Wille
    erreichen, um ihre relevanten Buffs auszureizen.
    Fluorite ist die besonders gute Alternative,
    wenn Arcane fehlt oder zusätzliche Natur-Stacks
    benötigt werden. Die verbleibenden zwei Slots
    sollten möglichst viel buffen, heilen oder
    Reaktionen ermöglichen, ohne Typhis knappes
    FP-Budget zu blockieren. Ardelia und Perlica
    können passende Reaktionen für Liinos Combo
    auslösen; Gilberta ist eine Alternative mit
    Gruppierungsunterstützung, Xaihi verstärkt
    Naturteams. Antal und Purrchena bringen
    situative Möglichkeiten. Bei allen Teams
    Natur-Stacks vor Power Shots vorbereiten
    und die 100 FP für den Battle Skill
    aktiv mit Final Strikes zurückgewinnen.
  roles: [main-dps]
  meta:
    - id: arcane-ardelia-liino
      title: "Arcane · Ardelia · Liino"
      role: main-dps
      members: [typhoeus, arcane, ardelia, liino]
      buildId: deep-rampart-lynx
      evaluation: >-
        Der zentrale Premium-Support-Kern:
        Arcane liefert Natur-Stacks und
        Buffs, Ardelia kann per Combo
        Korrosion ohne zusätzliche FP
        anwenden und unterstützt die
        Technik-Reaktion für Liino.
        Liino bringt Team-ANG,
        Nature Amp und Heilung.
        Gegnerstapel und
        Combo-Fenster so timen,
        dass Typhis Energieschüsse
        davon profitieren.
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
        - member: ardelia
          weaponId: "49"
          items: ["881", "1131", "876", "876"]
          note: "Mit Arcane als Xiranit-Träger und Liino: Qingbo Light Armor, Hot Work Hands PPE und zweimal Qingbo Cask. Signature Dreams of the Starry Beach bevorzugen."
          alternatives:
            - title: "Nur ohne anderen Xiranit-Nutzer"
              items: ["1134", "332", "337", "337"]
              note: "Vier Teile für den Fall, dass kein anderer Operator den Xiranit-Bonus übernimmt."
            - title: "Mit Xiranit-Nutzer, aber ohne Liino"
              items: ["328", "775", "286", "286"]
              note: "Hot-Work-Fokus in alternativen Teams ohne Liino."
        - member: liino
          weaponId: "1046"
          weaponAlternatives: ["1044"]
          items: ["1134", "1138", "365", "365"]
          note: "Mit Arcane als Xiranit-Nutzer und zusätzlichem Ultimate-Energiebedarf: Light Armor, Hands, zwei LYNX Slabs. Bedazzling Night Debut bevorzugen, Golden Age ist die Battle-Pass-Alternative."
          alternatives:
            - title: "Mit Xiranit-Nutzer, ohne zusätzlichen Ultimate-Energiebedarf"
              items: ["1126", "1129", "365", "365"]
              note: "Rift Trekker Light Armor und Hands plus zwei LYNX Slabs für möglichst viel Wille und Ultimate-Verstärkung."
            - title: "Nur ohne anderen Xiranit-Nutzer"
              items: ["1134", "1138", "337", "365"]
              note: "Light Armor, Hands, Auxiliary Arm und LYNX Slab – nur wenn Arcane im Team tatsächlich kein Xiranit spielt."
    - id: arcane-perlica-liino
      title: "Arcane · Perlica · Liino"
      role: main-dps
      members: [typhoeus, arcane, perlica, liino]
      buildId: deep-rampart-lynx
      evaluation: >-
        Alternative Premium-Rotation
        für klare Technik-Reaktions-
        Trigger. Perlicas Combo löst
        Elektrifikation an einem
        Ziel aus und ermöglicht
        Liinos Combo; Arcane
        stellt parallel
        Natur-Stacks bereit.
        Die Teammitglieder
        sollen Typhis FP-Budget
        möglichst wenig
        belasten.
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
        - member: perlica
          weaponId: "94"
          items: ["881", "775", "876", "876"]
          note: "Stanza of Memorials für den größtmöglichen Typhoeus-Buff. Qingbo Light Armor, Hot Work Gloves und zwei Qingbo Casks für Combo-Abklingzeit und Elektrifikation."
          alternatives:
            - title: "Mehr eigener Schaden bei vollem Elektrifikation-Effekt"
              items: ["353", "775", "338", "338"]
              note: "Pulser Labs Disruptor Suit, Hot Work Gloves, zweimal Pulser Labs Calibrator."
        - member: liino
          weaponId: "1046"
          weaponAlternatives: ["1044"]
          items: ["1134", "1138", "365", "365"]
          note: "Mit Arcane als Xiranit-Nutzer und zusätzlichem Ultimate-Energiebedarf: Light Armor, Hands, zwei LYNX Slabs. Bedazzling Night Debut bevorzugen, Golden Age ist die Battle-Pass-Alternative."
          alternatives:
            - title: "Mit Xiranit-Nutzer, ohne zusätzlichen Ultimate-Energiebedarf"
              items: ["1126", "1129", "365", "365"]
              note: "Rift Trekker Light Armor und Hands plus zwei LYNX Slabs für möglichst viel Wille und Ultimate-Verstärkung."
            - title: "Nur ohne anderen Xiranit-Nutzer"
              items: ["1134", "1138", "337", "365"]
              note: "Light Armor, Hands, Auxiliary Arm und LYNX Slab – nur wenn Arcane im Team tatsächlich kein Xiranit spielt."
  more:

    - id: arcane-xaihi-liino
      title: "Arcane · Xaihi · Liino"
      role: main-dps
      members: [typhoeus, arcane, xaihi, liino]
      buildId: deep-rampart-lynx
      note: >-
        Nefarith-Showcase-Kern:
        Arcane für Natur-Stacks,
        Xaihi für das vorbereitete
        Buff-Fenster und
        Liino für ANG/Amp.
        Besonders stark mit
        einer präzise
        geplanten Rotation.
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
        - member: liino
          weaponId: "1046"
          weaponAlternatives: ["1044"]
          items: ["1134", "1138", "365", "365"]
          note: "Mit Arcane als Xiranit-Nutzer und zusätzlichem Ultimate-Energiebedarf: Light Armor, Hands, zwei LYNX Slabs. Bedazzling Night Debut bevorzugen, Golden Age ist die Battle-Pass-Alternative."
          alternatives:
            - title: "Mit Xiranit-Nutzer, ohne zusätzlichen Ultimate-Energiebedarf"
              items: ["1126", "1129", "365", "365"]
              note: "Rift Trekker Light Armor und Hands plus zwei LYNX Slabs für möglichst viel Wille und Ultimate-Verstärkung."
            - title: "Nur ohne anderen Xiranit-Nutzer"
              items: ["1134", "1138", "337", "365"]
              note: "Light Armor, Hands, Auxiliary Arm und LYNX Slab – nur wenn Arcane im Team tatsächlich kein Xiranit spielt."
    - id: arcane-gilberta-liino
      title: "Arcane · Gilberta · Liino"
      role: main-dps
      members: [typhoeus, arcane, gilberta, liino]
      buildId: deep-rampart-lynx
      note: >-
        Rhodagn-Nuke-Aufbau aus meinem Mobalytics-Guide: Zunächst Liinos Ultimate
        (ANG + Natur-Verstärkung), dann Arcanes Battle Skill so verzögert treffen lassen,
        dass Gilbertas Combo auf Elektrifikation ausgelöst werden kann. Arcanes Combo
        zunächst nicht verwenden. Nach Typhis Final Strike folgen Typhis Ultimate,
        Gilbertas Ultimate und anschließend abgestimmte Natur-Explosionen und
        Jagdpfeile; Arcanes Combo dient dem notwendigen Taumel- und Zeichen-Timing.
        Gilbertas Swordmancer-Taumelausrüstung ist dafür die dokumentierte Variante.
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
        - member: gilberta
          weaponId: "79"
          weaponAlternatives: ["47"]
          items: ["328", "874", "793", "793"]
          note: "Taumel-Fokus aus meinem Rhodagn-Nuke-Showcase: Eternal Xiranite Armor, Swordmancer TAC Gauntlets T1 und zwei NAV Beacons. Delivery Guaranteed bevorzugen."
          alternatives:
            - title: "Technik-Intensität"
              items: ["328", "775", "286", "286"]
              note: "Hot Work Gloves und zwei Power Cartridges."
            - title: "Nur ohne weiteren Xiranit-Nutzer"
              items: ["328", "332", "337", "337"]
              note: "Eternal Xiranite Armor, Gloves T1 und zweimal Auxiliary Arm."
        - member: liino
          weaponId: "1046"
          weaponAlternatives: ["1044"]
          items: ["1134", "1138", "365", "365"]
          note: "Mit Arcane als Xiranit-Nutzer und zusätzlichem Ultimate-Energiebedarf: Light Armor, Hands, zwei LYNX Slabs. Bedazzling Night Debut bevorzugen, Golden Age ist die Battle-Pass-Alternative."
          alternatives:
            - title: "Mit Xiranit-Nutzer, ohne zusätzlichen Ultimate-Energiebedarf"
              items: ["1126", "1129", "365", "365"]
              note: "Rift Trekker Light Armor und Hands plus zwei LYNX Slabs für möglichst viel Wille und Ultimate-Verstärkung."
            - title: "Nur ohne anderen Xiranit-Nutzer"
              items: ["1134", "1138", "337", "365"]
              note: "Light Armor, Hands, Auxiliary Arm und LYNX Slab – nur wenn Arcane im Team tatsächlich kein Xiranit spielt."
    - id: trial-nature-stacks
      title: "Arcane · Fluorite · Antal"
      role: main-dps
      members: [typhoeus, arcane, fluorite, antal]
      buildId: deep-rampart-lynx
      note: >-
        Kampfübungs-Team aus dem
        Videoguide: Arcane und
        Fluorite stellen viele
        Natur-Stacks bereit.
        Antal markiert ein Ziel;
        sein Set-/Ultimate-
        Timing kann Buff-Fenster
        für Typhis Energieschüsse
        vorbereiten. Im
        Demo-Run verwendete
        Antal Xiranit-Ausrüstung.
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
    - id: fluorite-gilberta-xaihi
      title: "Fluorite · Gilberta · Xaihi"
      role: main-dps
      members: [typhoeus, fluorite, gilberta, xaihi]
      buildId: deep-rampart-lynx
      note: >-
        Gut spielbare Alternative
        ohne Arcane. Fluorite
        liefert Natur-Stacks,
        Gilberta unterstützt
        Gruppierung und
        Reaktionen, Xaihi
        steuert weitere
        Natur-Buffs bei.
        Die FP-Bilanz muss
        zu deiner Rotation passen.
      memberGear:
        - member: gilberta
          weaponId: "79"
          weaponAlternatives: ["47"]
          items: ["328", "332", "337", "337"]
          note: "Xiranit-Variante, falls sonst niemand dieses Set trägt; Delivery Guaranteed bevorzugen."
          alternatives:
            - title: "Taumel-Fokus (Rhodagn-Nuke)"
              items: ["328", "874", "793", "793"]
              note: "Taumelpunkte und Timing des Nuke-Fensters."
            - title: "Technik-Intensität"
              items: ["328", "775", "286", "286"]
              note: "Hot Work Gloves und zwei Power Cartridges."
    - id: arcane-fluorite-purrchena
      title: "Arcane · Fluorite · Purrchena"
      role: main-dps
      members: [typhoeus, arcane, fluorite, purrchena]
      buildId: deep-rampart-double-comms
      note: >-
        Natur-Stack-Fokus mit
        zusätzlicher Defensive.
        Purrchena kann
        feindliche Angriffe
        blocken, damit Typhi
        ihren Schwebeflug
        möglichst vollständig
        ausspielen kann.
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
    - id: arcane-ardelia-gilberta
      title: "Arcane · Ardelia · Gilberta"
      role: main-dps
      members: [typhoeus, arcane, ardelia, gilberta]
      buildId: deep-rampart-lynx
      note: "Alternative aus meinem Mobalytics-Guide: Ardelias Korrosion aktiviert Gilbertas Combo, die zusätzliche Technik-Empfänglichkeit bringt. Ohne Liino entfällt ihr FP-Rückgewinn; die Rotation muss entsprechend geplant werden."
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
        - member: ardelia
          weaponId: "49"
          items: ["328", "775", "286", "286"]
          note: "Mit Arcane als Xiranit-Träger, aber ohne Liino: Eternal Xiranite Armor plus Hot Work für Technik-Intensität."
          alternatives:
            - title: "Nur ohne weiteren Xiranit-Nutzer"
              items: ["1134", "332", "337", "337"]
              note: "Eternal Xiranite Light Armor, Gloves T1 und zwei Auxiliary Arms; nur bei entsprechend anderem Teamaufbau."
            - title: "Mit Xiranit-Nutzer und Liino"
              items: ["881", "1131", "876", "876"]
              note: "Qingbo/Hot Work in der Variante mit Liino."
        - member: gilberta
          weaponId: "79"
          weaponAlternatives: ["47"]
          items: ["328", "775", "286", "286"]
          note: "Technik-Intensität im Team mit Arcane: Eternal Xiranite Armor, Hot Work Gloves, zwei Hot Work Power Cartridges."
          alternatives:
            - title: "Taumel-Fokus (Rhodagn-Nuke)"
              items: ["328", "874", "793", "793"]
              note: "Taumelpunkte und Timing des Nuke-Fensters."
            - title: "Nur ohne weiteren Xiranit-Nutzer"
              items: ["328", "332", "337", "337"]
              note: "Eternal Xiranite Armor, Gloves T1 und zweimal Auxiliary Arm."
    - id: arcane-perlica-gilberta
      title: "Arcane · Perlica · Gilberta"
      role: main-dps
      members: [typhoeus, arcane, perlica, gilberta]
      buildId: deep-rampart-lynx
      note: "Alternative ohne Liino: Perlicas Elektrifikation triggert Gilbertas Combo. Arcane liefert Natur-Kumulierungen und den Wille-Buff. Ohne Liinos Combo den FP-Haushalt besonders genau beachten."
      memberGear:
        - member: arcane
          weaponId: "1045"
          weaponAlternatives: ["47", "1043"]
          items: ["1134", "1137", "1136", "1136"]
          note: "Wille-Form, mindestens 640 Wille. Type 42: Solemn Phalanx ist die Hauptempfehlung; Detonation Unit lässt sich durch wiederholte Natur-Kumulierungen auslösen. Das PDF bevorzugt für dieses Team ausdrücklich beide Bracing Slabs."
        - member: perlica
          weaponId: "94"
          items: ["881", "775", "876", "876"]
          note: "Stanza of Memorials für den größtmöglichen Typhoeus-Buff. Qingbo Light Armor, Hot Work Gloves und zwei Qingbo Casks für Combo-Abklingzeit und Elektrifikation."
          alternatives:
            - title: "Mehr eigener Schaden bei vollem Elektrifikation-Effekt"
              items: ["353", "775", "338", "338"]
              note: "Pulser Labs Disruptor Suit, Hot Work Gloves, zweimal Pulser Labs Calibrator."
        - member: gilberta
          weaponId: "79"
          weaponAlternatives: ["47"]
          items: ["328", "775", "286", "286"]
          note: "Technik-Intensität im Team mit Arcane: Eternal Xiranite Armor, Hot Work Gloves, zwei Hot Work Power Cartridges."
          alternatives:
            - title: "Taumel-Fokus (Rhodagn-Nuke)"
              items: ["328", "874", "793", "793"]
              note: "Taumelpunkte und Timing des Nuke-Fensters."
            - title: "Nur ohne weiteren Xiranit-Nutzer"
              items: ["328", "332", "337", "337"]
              note: "Eternal Xiranite Armor, Gloves T1 und zweimal Auxiliary Arm."

gameplay:
  pending: false
  showcases:
    - id: trial-erlaeutert
      title: "Trial – Natur-Stacks und FP-Rotation"
      type: trial
      url: "https://www.youtube.com/watch?v=wNVJkGzkfMg&t=974s"
      description: >-
        Kampfübungs-Team mit Typhi, Arcane,
        Fluorite und Antal. Hier lässt
        sich der Kern aus
        Energieschüssen, Zeichen,
        Kombo-Reset und
        Final-Strike-FP besonders
        anschaulich verfolgen.
      rotationAndTips: >-
        Positioniere dich hinter dem
        robustesten Gegner und markiere
        ihn mit Antal. Beginne mit
        den vorbereiteten Jagdpfeilen
        im Battle Skill, bis acht
        Zeichen bereitstehen.
        Timings der Teamfähigkeiten
        auf Typhis Combo abstimmen,
        damit ihre neuen Energieschüsse
        unmittelbar Natur-Stacks
        verbrauchen können. Danach
        FP über Final Strikes
        zurückgewinnen; Dodge Cancels
        nach Final Strike und Landung
        verkürzen die Leerlaufzeiten.
        Für den zweiten Burst zuerst
        Team-Buffs auslösen,
        dann Typhis Battle Skill
        wegen des Signature-
        Waffenbuffs unmittelbar
        vor ihre Ultimate setzen.
        Mit neu gesammelten
        Zeichen die Combo starten
        und das verlängerte
        Luftangriffsfenster nutzen.
    - id: echos-zwei-gegner
      title: "Echos des Krieges – zwei Ziele"
      type: other
      url: "https://www.youtube.com/watch?v=wNVJkGzkfMg&t=1218s"
      description: >-
        Zwei-Gegner-Szenario mit
        Arcane, Ardelia und Liino.
        Besonders gut geeignet,
        Typhis Mehrzielangriffe
        und Korrosion vor
        Natur-Bursts zu verstehen.
      rotationAndTips: >-
        Starte mit Liinos Battle
        Skill für den Team-Buff,
        gruppiere die ersten
        Ziele mit Arcane und
        nutze Typhis vorhandene
        Jagdpfeile. Vor den
        nächsten Energieschüssen
        Ardelias Combo auf die
        Gegner timen, um
        Korrosion anzubringen.
        Liinos Combo hilft,
        die notwendigen FP
        für den nächsten
        Battle Skill
        zurückzuerhalten.
        Arcane stellt im
        Schwebeflug weitere
        Natur-Stacks bereit.
        Dodge Cancels nach
        Luftlandung und
        Final Strike sparen
        Zeit zwischen den
        beiden Wellen.
    - id: nefarith-guide
      title: "Nefarith – kommentierte Rotation"
      type: boss
      url: "https://www.youtube.com/watch?v=wNVJkGzkfMg&t=1338s"
      description: >-
        Vollständige Erklärung
        des Nefarith-Speedruns
        mit Team-, Buff- und
        Interrupt-Timing.
        Die separat
        veröffentlichte
        Laufzeit ist im
        nächsten Showcase
        abrufbar.
      rotationAndTips: >-
        Buff-Fenster mit
        Xaihis Ultimate,
        Arcane und Liinos
        Battle Skill vorbereiten.
        Typhi aktiviert danach
        den Battle Skill,
        um den Waffenbuff
        mitzunehmen, und
        nutzt Energieschüsse
        sowie den Combo-Reset.
        In Phase zwei
        den Drachenschrei
        richtig ausweichen
        und Final Strikes
        mit Dodge Cancels
        für FP einsetzen.
        Arcanes Battle Skill
        zum kritischen
        Interrupt-Fenster
        timen; anschließend
        Buffs, Nature-Stacks,
        Typhis Battle Skill,
        Arcane-Combo und
        Ultimate in enger
        Reihenfolge nutzen.
        Der gezeigte
        Speedrun hängt
        situativ von
        kritischen Treffern ab.
    - id: nefarith-p0
      title: "Nefarith – P0 No Food Speedrun"
      type: speedrun
      featured: true
      url: "https://www.youtube.com/watch?v=Zw8B2F2nJP8"
      description: >-
        Eigenständiger 0:39-Run
        gegen Nefarith mit
        Typhoeus P0 und
        ohne Buff-Food.
        Für die genaue
        Ausführung und
        die benötigten
        kritischen
        Treffer den
        kommentierten
        Videoguide
        heranziehen.
    - id: rhodagn-p0
      title: "Rhodagn – P0 Showcase"
      type: boss
      url: "https://www.youtube.com/watch?v=uixHyNlbwAQ"
      description: >-
        Separater Rhodagn-
        Speedrun mit Typhi
        P0. Anders als
        der Nefarith-
        Run ist das
        Video ausdrücklich
        als GMS-Food-Run
        ausgewiesen;
        Laufzeiten daher
        nicht ohne dieselben
        Bedingungen vergleichen.
conclusion:
  verdict: >-
    Typhoeus ist eine starke,
    ungewöhnlich spaßige
    Natur-Main-DPS mit
    beeindruckenden
    Energieschuss-Spitzen
    und besonders gutem
    Zwei-Ziele-Schaden.
    Sie fordert allerdings
    eine sauber vorbereitete
    Rotation, zuverlässige
    Natur-Stacks und genug
    FP. Wenn der Account
    schon mehrere
    ausgebaute Main DPS
    besitzt, ist Typhi
    eher Luxus als Pflicht.
  recommendation: optional
  pullAdvice: >-
    Falls du bereits gut
    mit Main-DPS-Operatoren
    aufgestellt bist und
    Pull-Ressourcen
    knapp sind,
    kannst du Typhi
    guten Gewissens
    auslassen und für
    fehlende Rollen
    oder künftige
    Operatoren sparen.
    Ihre Signature-Waffe
    ist ein besonders
    großer Teil der
    möglichen
    Investition.
    Wer aber ihren
    Schwebeflug und
    die komplexe
    Nature-Burst-
    Rotation mag,
    bekommt einen
    eigenständigen,
    sehr befriedigenden
    Schadensverursacher.
  recommendedFor:
    - "Spieler, die gezielt einen Natur-Main-DPS benötigen und Natur-Stacks zuverlässig vorbereiten können."
    - "Accounts mit Arcane oder Fluorite und passenden Unterstützern wie Liino, Ardelia, Perlica oder Xaihi."
    - "Spieler, denen anspruchsvolle Luftangriffs-Rotationen, präzise Buff-Fenster und Animation Cancels Spaß machen."
    - "Mehrzielkämpfe mit zwei Gegnern, gegen die ihre Luftangriffe besonders gut funktionieren."
  skipIf:
    - "Dein Account besitzt bereits mehrere ausgebauten Main-DPS-Operatoren und benötigt dringender neue Support- oder Teamoptionen."
    - "Du möchtest lieber eine unkomplizierte Rotation ohne Jagdpfeil-/Zeichen-Verwaltung und FP-Timing."
    - "Du kannst weder verlässliche Natur-Stacks noch passende Buff-Fenster bereitstellen und willst keine weiteren Ressourcen investieren."
  closingNote: >-
    Potenziale sind nice to have, aber
    niemals Voraussetzung für eine
    funktionierende P0-Rotation.
    Besonders P1 und P5 sind starke
    Zusätze; ein neuer vielseitig
    einsetzbarer Operator kann
    deinem Account langfristig
    trotzdem mehr bringen.
    Die ursprüngliche
    September-2026-Einschätzung
    zum Sparen für Si war
    ausdrücklich eine
    zeitgebundene
    Banner-Empfehlung und
    ist nicht als aktuelle
    Release-Prognose
    zu verstehen.
---

Für sämtliche Kämpfe gilt: Natur-Stacks, Jagdpfeile und FP-Budget bestimmen den Wert der Rotation deutlich stärker als die bloße Anzahl gedrückter Fertigkeiten. Wer diese drei Ressourcen beherrscht, kann Typhis Potenzial auch ohne zusätzliche Potenziale entfalten.
