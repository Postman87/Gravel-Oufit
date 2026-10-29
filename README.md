# Gravel Outfit · Version 0.8.0

Weiterentwicklung des bestehenden Standes 0.7.1. HTML, CSS, Vanilla JavaScript, IndexedDB und Service Worker; kein Framework, kein Build und kein Cloud-Backend. Outfit, Kleiderschrank und Einstellungen bleiben erhalten.

## Ins bestehende Repository hochladen

1. ZIP entpacken. Den Inhalt direkt ins Hauptverzeichnis von `postman87/Gravel-Oufit` hochladen und Dateien gleichen Namens ersetzen. Keinen zusätzlichen übergeordneten Ordner anlegen. `.nojekyll` ebenfalls übernehmen.
2. GitHub Pages auf Branch `main` und Ordner `/ (root)` belassen. Alte Ordner `js/`, `css/` und `assets/` dürfen bestehen bleiben; diese Version lädt ihre Dateien aus dem Hauptverzeichnis.
3. Nach dem Deployment alle bisherigen Gravel-Outfit-Tabs und installierten App-Fenster schließen und erneut öffnen. Falls noch ein alter Stand erscheint: einmal online öffnen, wieder sämtliche App-Fenster schließen und neu starten. Angezeigt werden muss „Testversion 0.8.0“.
4. Unter Einstellungen prüfen, dass der Offline-Speicher vorbereitet ist. Danach offline testen.

Die bestehende Adresse lautet nach dem Deployment https://postman87.github.io/Gravel-Oufit/ . Das Paket wurde noch nicht in GitHub hochgeladen. Browserdaten und IndexedDB für dieses Update nicht löschen.

## Start und Ende der Tour

Die erste Temperatur bezeichnet ausschließlich die Außentemperatur beim Tourstart. Die zweite bezeichnet die erwartete Außentemperatur am Tourende. Ein Start mit 11 °C und ein Ende mit 7 °C sind ausdrücklich zulässig. Die Regler sind unabhängig und werden weder sortiert noch aufeinander begrenzt.

Beide Regler verwenden 1-°C-Schritte von −25 bis 50 °C. Die Kleidung behält dagegen ihre eigenen Felder „Geeignet ab“ / „Geeignet bis“ als Kleidungs-Temperaturbereich. Dort werden die beiden Grenzen weiterhin aufeinander abgestimmt.

Alte gespeicherte Dezimalwerte bleiben intern und in JSON-Sicherungen exakt erhalten. Die Oberfläche zeigt nur gerundete ganze Grad. Erst das Bewegen eines bestimmten Reglers übernimmt bewusst einen neuen ganzzahligen Wert. Das Speichern anderer Angaben oder eine Bestätigung ohne Reglerbewegung verändert einen alten Zwischenwert nicht.

Wind, Niederschlag, Intensität, Dauer und Kälteempfinden werden für beide Tourzeitpunkte verwendet. Es gibt noch keine automatische Wetterabfrage und keine Vorhersage für weitere Zwischenpunkte.

## Anziehen, Mitnehmen und Ablegen

„Anziehen“ orientiert sich an den Bedingungen zum Tourstart. Aus dem tatsächlichen Bestand werden passende Funktionsschichten kombiniert. Für jedes Startoutfit wird geprüft, wie es mit zusätzlichen oder ablegbaren äußeren Schichten am Tourende funktionieren kann.

„Mitnehmen“ enthält ausschließlich zusätzliche verfügbare Kleidungsstücke, die für die geplante Endkombination benötigt werden. Ein bereits angezogenes Teil wird dort nicht erneut aufgeführt. Bei Abkühlung können beispielsweise eine zusätzliche Jacke, Mütze oder wärmere Handschuhe erforderlich werden. Sind unterschiedliche Handschuhe für beide Zeitpunkte erforderlich, wird ein echter Ersatzwechsel benannt; sie werden nicht übereinander als doppelte Schicht bewertet.

Bei Erwärmung erscheinen passende Ablegehinweise. Unter „Am Tourende tragen“ ist die resultierende konkrete Kombination sichtbar. Die Diagnose bewertet genau diesen Endzustand, also Startkleidung abzüglich der abzulegenden Teile zuzüglich des Gepäcks.

Baselayer, Trikot, normale Hose und Polster-Unterwäsche werden als Grundkombination über die Tour beibehalten. Die Planung setzt keinen Wechsel dieser inneren oder grundlegenden Schichten am Wegesrand stillschweigend voraus. Bei abkühlender Tour darf eine etwas wärmere Beinkleidung bereits am Start sinnvoll sein, weil normale Hosen nicht als zusätzliche zweite Außenhose übereinander eingeplant werden. Bleibt damit eine Schutzlücke, wird sie für den jeweiligen Tourzeitpunkt benannt.

Startkleidung, Gepäck, Ablegehinweise und Endkombination werden getrennt berechnet. Im Fahrt-Snapshot bleiben tatsächliche Kleidung und ursprüngliche automatische Empfehlung weiterhin getrennt gespeichert; die Empfehlung enthält zusätzlich den geplanten Endzustand und dessen Diagnose.

## Hosen und optionale Körperzonen

RevolutionRace-Hosen werden über die Funktion Außenhose und eine davon unabhängige Länge „Lang“ oder „Kurz“ erfasst. Bei Wärme werden vergleichbar geeignete kurze Varianten bevorzugt. Lange Hosen können bei Kälte, stärkerem Wind, Nässe oder einem abkühlenden Tourende sinnvoll sein. Eine gepolsterte Unterziehhose allein zählt nicht als äußere Hose.

Normale lange Hosen besitzen im Modell einen begrenzten passiven Windschutz; dadurch wird bei mäßigem Wind nicht pauschal eine Regenhose benötigt. Das setzt das gespeicherte Kennzeichen „Winddicht“ nicht auf wahr. Eine ausdrücklich winddichte Hose bietet weiterhin den stärkeren Schutz. Regenkleidung ohne zusätzlichen Nutzen wird vermieden.

Unter „Optionale Schutzkleidung“ sind Handschuhe, Mütze, Halstuch, Armlinge und Überschuhe jeweils auf „Automatisch“ oder ausdrücklich „Keine …“ einstellbar. Automatisch dürfen Zonen bei Wärme frei bleiben. Bei konstant 25 °C werden warme oder winddichte Winterhandschuhe nicht allein deshalb vorgeschlagen, weil sie vorhanden sind. Entsprechend können Mütze, Halstuch, Armlinge und Überschuhe entfallen.

Bei Kälte, Wind oder Regen prüft die automatische Auswahl den Schutz erneut. Eine ausdrückliche „Keine …“-Entscheidung bleibt erhalten; falls dadurch notwendiger Schutz fehlt, wird darauf hingewiesen. „Optionale Körperzonen“ zeigt die tatsächlichen Entscheidungen für Start und Ende.

## Modulare Bewertung

Die Suche berücksichtigt aktive, verfügbare und hinsichtlich ihrer Länge nutzbare Kleidungsstücke. Wäsche und archivierte oder vorübergehend nicht verfügbare Teile werden weder zum Start noch als Gepäck verwendet.

Wärmeisolierung, Windschutz, Nässeschutz und Atmungsaktivität werden getrennt bewertet. Mehrere kompatible Schichten können gemeinsam isolieren. Beispiel ohne verfügbare Thermokleidung: langärmelige Basis + Trikot + GOREWEAR Lupra als äußere Windschutzschicht. Die Lupra liefert Wind- und gegebenenfalls Nässeschutz, wird aber nicht zur Thermojacke. Wasserabweisend bleibt von wasserdicht unterschieden.

Es gibt keine erfundenen Kleidungsstücke im tatsächlichen Outfit. Fehlender Schutz wird erst nach der Suche nach kompatiblen Alternativen benannt. Eine unvollständige Ausstattung wird nicht als fahrbereites Outfit dargestellt; ein alleiniger ärmelloser Baselayer bleibt beispielsweise eine Grundlage. Der automatische Start ist ohne vollständige Grundbekleidung gesperrt.

Schichten und Anziehreihenfolge folgen der Funktion. Keine doppelten Baselayer oder Trikots, keine redundante Windweste und äußere Regenjacke, keine zwei Sitzpolster und keine unvereinbaren Hosenkombinationen. Geeignete Kombinationen mit weniger Teilen werden bevorzugt. Bei vergleichbaren Eigenschaften sind bei Kälte längere Ärmel und Beine günstiger.

Alle verfügbaren Funktionsprofile gehen in die Suche ein. Identische Profile werden zusammengefasst. Bei sehr großen Kombinationsräumen wird eine begrenzte Beam-Suche verwendet, damit die App auf Mobilgeräten nutzbar bleibt. Das Modell garantiert keine mathematisch globale Optimierung beliebig großer Kleiderschränke.

## Diagnosebereiche

Die aufklappbaren Bereiche „Schutz der gesamten Kombination“ und „Ideale Zielausrüstung“ bleiben vorhanden.

„Schutz der gesamten Kombination“ zeigt für Start und Ende jeweils Wärmeisolierung, Windschutz, Regenschutz und Atmungsaktivität samt numerischen Modellzielen. Die Werte der Wärmebewertung sind relative Einheiten, keine Celsiusgrade. „Ideale Zielausrüstung“ beschreibt die benötigten Funktionen, ohne virtuelle Artikel zu erzeugen, und berücksichtigt dieselben temperaturabhängigen Ziele wie die Berechnung.

Die Werte sind aus Kleidungsfunktion, Schnitt und gespeicherten Eigenschaften abgeleitete Richtwerte, keine gemessenen Materialdaten. Eigenes Empfinden, Helm, Schuhe, Pausen und Beweglichkeit bleiben selbst zu prüfen.

## Daten erhalten

IndexedDB behält den Namen `gravel-outfit` und wird auf Datenbankversion 5 erweitert. Das Datenformat wird `schemaVersion: 6`. Vor der Migration wird eine unveränderte Kopie unter `migrationBackups` / `before-0.8` gespeichert; vorhandene ältere Stores und Migrationskopien bleiben bestehen. Kopie und Migration laufen in derselben Upgrade-Transaktion.

Alle Kleidungsstücke, IDs, Namen, Längen, Eigenschaften, Notizen, Archiv- und Verfügbarkeitszustände, Pflegeeinträge, Fahrten und manuellen Auswahlen bleiben erhalten. Aus dem früheren ersten Wetterwert wird `startTemp`, aus dem früheren zweiten `endTemp`. Die alten Felder `min` und `max` bleiben zusätzlich unverändert gespeichert; sie werden in der neuen Planung nicht mehr als Bereich verwendet. Vorhandene weitere Einstellungen bleiben erhalten.

Historische Fahrten behalten ihre damaligen Wetterdaten und Snapshots. Alte Temperaturbereiche werden in der Historie ausdrücklich als frühere Bereiche bezeichnet und nicht nachträglich als tatsächlicher Verlauf umgedeutet. Eine laufende alte Fahrt kann weiter beendet werden.

Sicherungen früherer Versionen bleiben importierbar. Neue JSON-Dateien enthalten zusätzlich Start-/Endtemperaturen, Optionen und Endplanung. Ein Import prüft die Datei und ersetzt Daten erst nach Bestätigung. Die internen Migrationskopien gehören nicht zum normalen Export.

Kleiderschrankbearbeitung, Pflegehistorie, Archivierung, manuelle Outfit-Auswahl, Fahrt-Rückmeldung und Wäscheoption sind weiterhin verfügbar. Die manuelle Auswahl bleibt unabhängig; sie wird als selbst gewählte Startkombination gespeichert. Ihre Diagnose bewertet dieselbe eigene Kombination an beiden Tourzeitpunkten und fügt nicht heimlich automatische Gepäckstücke hinzu.

## Offline, Mac und iPhone

Einmal online vollständig öffnen. Danach bleiben Planung, Bestand, Fahrten und JSON-Sicherung offline verfügbar. Der Verbindungsstatus prüft den Server außerhalb des Offline-Caches. WLAN ohne erreichbaren Server wird als „Server nicht erreichbar · lokal nutzbar“ angezeigt.

Mac: im entpackten Ordner `python3 -m http.server 8080`, anschließend `http://localhost:8080/` öffnen. Ein direkter Doppelklick auf die HTML-Datei ist kein verlässlicher PWA-Test.

iPhone: die GitHub-Pages-HTTPS-Adresse in Safari öffnen; optional Teilen → Zum Home-Bildschirm. Nach dem Update bisherige App-Fenster schließen und neu starten. Installation und echter Flugmodus auf einem physischen iPhone sind noch auf dem Zielgerät zu prüfen. Die mobile Browseransicht wurde bei 390 Pixeln Breite geprüft.

Regelmäßig eine JSON-Sicherung exportieren. Browser können lokalen Speicher entfernen. Keine Cloud-Synchronisierung, GPS-Aufzeichnung oder automatische lernende Regeländerung.

## Tests

`node --test tests/core.test.cjs` mit Node.js 20 oder neuer, ohne zusätzliche Pakete. Node wird nur für die Tests benötigt. Alle 69 Tests bestehen. Konkrete Ergebnisse und Browserprüfungen stehen in `TESTBERICHT.md`.

`tests/migration-fixture.html` erlaubt einen reproduzierbaren Migrationstest auf einem neuen isolierten lokalen Testport. Es werden nur erfundene Testdaten angelegt, kein vorhandener Bestand überschrieben. Vor Änderungen zur Testseite zurückkehren und den Datenerhalt prüfen.
