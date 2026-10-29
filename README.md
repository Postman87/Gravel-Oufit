# Gravel Outfit · Version 0.7.0

Weiterentwicklung der Version 0.6, weiterhin HTML, CSS, Vanilla JavaScript, IndexedDB und Service Worker. Kein Framework, kein Build, kein Cloud-Backend. Die drei Bereiche Outfit, Kleiderschrank und Einstellungen bleiben bestehen.

## Update im bestehenden Repository

1. ZIP entpacken und seinen Inhalt direkt ins Hauptverzeichnis von `postman87/Gravel-Oufit` hochladen. Die vorhandenen Dateien gleichen Namens ersetzen; keinen zusätzlichen übergeordneten Ordner anlegen.
2. GitHub Pages weiter über `main` und `/ (root)` bereitstellen. Alte Ordner `js/`, `css/` und `assets/` dürfen bestehen bleiben; die Version 0.7 lädt die Dateien im Hauptverzeichnis.
3. Nach dem Deployment alle geöffneten Gravel-Outfit-Tabs und installierten App-Fenster schließen, dann die App erneut öffnen. Gegebenenfalls einmal online öffnen, erneut schließen und starten, damit der neue Service Worker aktiviert wird. Angezeigt werden muss „Testversion 0.7“.
4. Die App läuft unter https://postman87.github.io/Gravel-Oufit/ . Unter Einstellungen wird die Einrichtung des Offline-Speichers angezeigt.

Browserdaten und IndexedDB für dieses Update **nicht löschen**. Die vorhandenen Daten werden migriert, nicht zurückgesetzt. Die `.nojekyll`-Datei gehört mit ins Hauptverzeichnis; im Finder lassen sich versteckte Dateien über Cmd + Shift + Punkt anzeigen. Dokumentation und Tests dürfen mit hochgeladen werden.

## Änderungen in 0.7

### Kleidungseigenschaften

- „Wasserabweisend“ und „Wasserdicht“ sind getrennte Angaben. Wasserabweisend zählt als begrenzter Schauerschutz und erfüllt keinen vollständigen Dauerregenschutz.
- Ärmel- bzw. Beinlänge: lang, kurz, bei Oberbekleidung auch ärmellos. Pro Teil wird genau eine Länge gespeichert; bei Zubehör ist die Angabe nicht anwendbar. „Nicht angegeben“ ist möglich.
- Die Länge beeinflusst die Wärmebewertung und die Bedeckung. Bei kalten Bedingungen wird bei vergleichbaren Teilen eine langärmelige Basis vor einer kurzen oder ärmellosen bevorzugt.
- Alle Eigenschaften sind beim Anlegen und Bearbeiten verfügbar. Vorhandene Namen werden nicht verändert, auch wenn die zugehörige Funktionsbezeichnung jetzt allgemeiner formuliert ist.

### Temperatur-Schieberegler

Sowohl das Tourwetter als auch die Temperaturbereiche der Kleidung werden mit Schiebereglern eingestellt: −25 bis 50 °C in 0,5-°C-Schritten. Der aktuelle Wert steht direkt darüber. Beim Überschneiden wird der andere Grenzwert angeglichen. Auf dem Mac funktionieren außerdem die Pfeiltasten; Home und End springen an die Grenzen. Wetteränderungen werden mit „Empfehlung aktualisieren“ gespeichert, Kleidungsänderungen mit „Speichern“.

### Schichtkombinationen und funktionaler Ersatz

Die Berechnung erfolgt in zwei Schritten:

1. Eine ideale Zielkombination wird mit einem virtuellen vollständigen Kleiderschrank berechnet, unabhängig vom eigenen Bestand.
2. Anschließend wird mit denselben Anforderungen die bestmögliche verfügbare Kombination aus dem tatsächlichen Kleiderschrank gesucht. Wäsche, nicht verfügbare und archivierte Teile sind ausgeschlossen.

Für Oberkörper und Beine werden legale Kombinationen aus Funktionsschichten bewertet. Die Kosten berücksichtigen fehlende Wärme, Wind- und Nässeschutz, Bedeckung, Grundbekleidung, Sitzpolster, übermäßige Isolierung, Atmungsaktivität und die Anzahl der Teile. Geeignete Kombinationen mit weniger Kleidungsstücken werden bevorzugt. Körperzonen werden getrennt behandelt.

Eine winddichte Regenjacke kann die äußere Windschutzfunktion ersetzen, hat aber nur einen geringen Isolierungswert. Sie wird auch mit einem sehr niedrigen hinterlegten Temperaturminimum nicht zu einer Thermojacke. Mehrere isolierende Schichten können gemeinsam eine Lücke schließen. Reicht das Modell trotz Ersatz nicht aus, erscheinen verständliche Hinweise zum verbleibenden Wärme-, Wind- oder Nässeschutz.

Die Bewertung ist eine **Heuristik**, keine Messung der Textilien oder Garantie für ausreichenden Schutz: Isolierung und Atmung werden aus Funktion und Schnitt abgeleitet, Wind- und Nässeschutz aus den gespeicherten Angaben. Temperaturminimum und Länge beeinflussen die Isolierung; individuelle Temperaturbereiche sind keine harten Ausschlussgrenzen für einzelne Schichten. Für große Bestände werden identische Funktionsprofile zusammengefasst und pro Schichtfunktion höchstens fünf Kandidaten näher kombiniert. Das begrenzt die Rechenlast auf dem iPhone; eine mathematisch globale Optimierung über beliebig große Kleiderschränke wird nicht zugesichert.

Bei Schauern wird gewählte äußere Regenkleidung als „Mitnehmen“ markiert. Die Schutzbewertung gilt dann für den Zustand mit angelegter Regenkleidung. Zubehör wird ebenfalls bestmöglich aus verfügbarem Bestand gewählt; fehlendes Zubehör wird benannt.

### Anziehreihenfolge

Die Reihenfolge folgt der Funktion, nicht dem Namen: Baselayer und gepolsterte Unterhose, Armlinge, Trikot, Hose, isolierende Jacke, Windweste, Regenjacke, Regenhose. Zubehör wird nach seiner eigenen Funktion eingeordnet. Es werden keine zwei Baselayer oder Trikots übereinander empfohlen, keine redundante Weste unter einer äußeren Regenjacke und kein zweites Sitzpolster unter einer gepolsterten Thermo-Radhose. Die Funktionsart „Thermo-Radhose“ gilt im Modell als gepolsterte eigenständige Radhose.

### Empfohlen und Eigene Auswahl

- Beim ersten Wechsel wird die eigene Auswahl aus der Empfehlung vorbelegt.
- Danach ist die eigene Auswahl unabhängig. Auch eine bewusst geleerte Auswahl bleibt erhalten.
- Umschalten verändert die Auswahlen nicht. Die Planung wird in IndexedDB gespeichert und übersteht auch Neuladen und Offline-Neustart.
- Eigene Teile werden unmittelbar nach Speicherung in der tatsächlichen Anziehreihenfolge angezeigt. Manuell dürfen auch andere Schichtkombinationen zusammengestellt werden; Überschneidungen werden kommentiert.
- Wird ein gewähltes Teil nachträglich nicht verfügbar, bleibt die Auswahl erkennbar. Der Fahrtstart verlangt eine Korrektur, statt das Teil stillschweigend wegzulassen.
- „Auswahl leeren“ setzt ausschließlich die manuelle Auswahl zurück und löscht keine Kleidung.
- Fahrtstart speichert Auswahlmodus, tatsächliche Teile einschließlich Eigenschaften und Wetter. Daneben bleibt eine unabhängige Kopie der automatischen Empfehlung für den späteren Vergleich erhalten. Eigene Auswahl wird als angezogene Kleidung gespeichert; automatisch mitgeführte Teile behalten ihre Kennzeichnung.
- Die laufende Fahrt und die letzten 20 abgeschlossenen Fahrten zeigen die tatsächliche Auswahl und die ursprüngliche Empfehlung getrennt. Alle Fahrten bleiben im Export enthalten.

## Datenerhalt und Sicherungen

IndexedDB behält den Namen `gravel-outfit` und wird von Version 2 auf **Version 3** erweitert. Der bisherige Store `state` und sämtliche älteren Stores bleiben erhalten. Beim Datenbankupdate wird zusätzlich eine unveränderte Kopie des bisherigen Zustands unter `migrationBackups` / `before-0.7` angelegt. Kopie und Datenmigration erfolgen in derselben Upgrade-Transaktion; bei Fehlern wird diese abgebrochen.

Das Datenformat steigt von `schemaVersion: 3` auf `schemaVersion: 4`. Kleidung erhält nur die neuen Felder `waterRepellent: false` und eine aus der bisherigen Funktionsart abgeleitete Länge. Bestehende IDs, Namen, Temperaturen, Verfügbarkeit, Archivstatus, Notizen, Pflegehistorie, Fahrten und aktive Fahrt werden nicht zurückgesetzt. Die neue Länge kann anschließend bearbeitet werden. Frühere Fahrten erhalten keine erfundene Vergleichsempfehlung; die Oberfläche kennzeichnet die fehlende historische Information.

Sicherungen der Version 0.6 (Datenformat 3) und der älteren App (`version: 2` mit `clothes`) bleiben importierbar. Aktuelle Sicherungen enthalten zusätzlich neue Eigenschaften, manuelle Planung und Vergleichsempfehlungen. Ein Import wird vor Änderungen geprüft und ersetzt erst nach Bestätigung den Datenstand. Der zusätzliche interne Migrations-Snapshot ist kein Bestandteil des normalen Exports; alle aktuellen Nutzerdaten sind enthalten.

Bestehende Kleiderschrankbearbeitung, Archivierung, Pflegehistorie, Fahrt-Rückmeldung, Wäscheoption und JSON-Sicherung bleiben verfügbar. Schreibvorgänge innerhalb eines Tabs werden nacheinander ausgeführt, damit schnelle Auswahländerungen nicht verloren gehen. Web Locks koordinieren zusätzlich mehrere Tabs, sofern vom Browser unterstützt. Ohne Web Locks bitte in einem App-Fenster bearbeiten.

## Mac und iPhone testen

Auf dem Mac im entpackten Ordner: `python3 -m http.server 8080`, danach `http://localhost:8080/` öffnen. Direktes Öffnen der HTML-Datei im Finder ist kein verlässlicher PWA-Test.

Auf dem iPhone die bereitgestellte HTTPS-Adresse in Safari öffnen und einmal vollständig laden. Über Teilen → Zum Home-Bildschirm installieren. Nach dem Update die bestehenden App-Fenster schließen und erneut starten. Anschließend im Flugmodus öffnen und Temperaturregler, eigene Auswahl sowie Fahrtstart und Fahrtende ausprobieren. Die Installation auf einem echten iPhone wurde hier nicht ausgeführt.

Offline nutzt die App nur lokal gespeicherte Dateien. Der Online-Status prüft `version.json` außerhalb des Offline-Caches. Erreichbares WLAN ohne erreichbaren Server wird als „Server nicht erreichbar · lokal nutzbar“ angezeigt. Es gibt keine automatische Wetterabfrage, GPS-Aufzeichnung, Cloud-Synchronisierung oder lernende Anpassung. Rückmeldungen werden gespeichert, aber ändern die Regeln nicht automatisch.

Regelmäßig eine JSON-Sicherung exportieren, da Browser lokalen Speicher entfernen können. Die Anfrage für dauerhafte Speicherung bleibt unter Einstellungen verfügbar.

## Tests

Mit Node.js 20 oder neuer: `node --test tests/core.test.cjs`.

Es werden keine Node-Pakete benötigt; Node ist nur für die Tests erforderlich, nicht für die PWA. `TESTBERICHT.md` dokumentiert die 38 automatisierten Testfälle und die Browserprüfungen. `tests/migration-fixture.html` erlaubt einen reproduzierbaren Migrationstest auf einem **neuen, isolierten lokalen Testport**, ohne einen vorhandenen Bestand zu überschreiben.
