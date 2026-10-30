# Gravel Outfit 0.10.0

Fortführung der bestehenden Version 0.8 aus `postman87/Gravel-Oufit`: HTML, CSS, Vanilla JavaScript, IndexedDB, offlinefähige PWA für GitHub Pages. Keine Frameworks, kein Build notwendig.

## Bewertung und Lernen nach Körperzonen · 0.10.0

Nach dem Fahrtstart öffnet „Zu kalt“ oder „Zu warm“ beim Fahrtabschluss eine Auswahl für **Kopf, Gesicht, Hals, Oberkörper, Arme, Hände, Beine und Füße**. Betroffene Zonen markieren und für jede „Genau richtig“, „Zu kalt“ oder „Zu warm“ wählen. Gegensätzliche Bewertungen sind möglich, etwa Hände kalt und Oberkörper warm. Nicht gewählte Zonen bleiben unbewertet. Insgesamt „Genau richtig“ speichert alle acht Zonen als passend. Eine Kalt-/Warm-Bewertung ohne tatsächlich bewertete betroffene Zone wird mit verständlichem Hinweis abgefangen; die Fahrt bleibt aktiv.

Die Historie zeigt die einzelnen Zonen; gegensätzliche Empfindungen erscheinen als „Gemischt“. Die optionale JSON-Eigenschaft `zoneFeedback` speichert nur tatsächlich bewertete Zonen. Alte Fahrten werden nicht umgeschrieben, Kleidungs-IDs und Einstellungen bleiben erhalten. Datenbankversion 6 und Sicherungsformat 7 sind unverändert.

Das Lernen wird pro Zone berechnet: Nur passende Fahrten derselben Intensität und mit höchstens 5 °C Abstand zur mittleren Tourtemperatur, letzte zwölf Bewertungen **dieser Zone**, je Kalt-/Warm-Rückmeldung ±0,25 °C, begrenzt auf ±2 °C. Unbewertete Zonen erzeugen keine Lernbeiträge und verdrängen keine vorhandenen Zonenbewertungen. Genau richtig ist ein neutraler Lernbeitrag. Die gespeicherten Wetterwerte werden nicht verändert. Bisherige lernfähige pauschale Bewertungen gelten weiterhin für alle Zonen; Fahrten, die bisher nicht lernfähig waren, werden nicht nachträglich aktiviert.

Beine und Oberkörper erhalten getrennte Anforderungen, Arme eine getrennte Bedeckungsanforderung. Kopf, Hals, Hände, Füße und Gesicht beeinflussen jeweils den zugehörigen Extraschutz. Verbundene Kleidungsstücke können mehrere Bereiche abdecken, die Lernwerte bleiben dennoch unabhängig. Unter „Persönliches Lernen nach Körperzonen“ stehen Anzahl passender Rückmeldungen und Richtung der Anpassung. Die Lernfunktion lässt sich weiterhin ausschalten. Rote Excel-Bewertungen und fehlende Schutzwirkung werden nicht durch Lernen aufgehoben.

Für Gesichtsschutz gibt es eine passende Funktion unter Extras. Ein solcher Gegenstand muss tatsächlich im aktiven, verfügbaren Kleiderschrank vorhanden sein. Es wird kein Gesichtsschutz aus der Excel-Datei erfunden oder automatisch angelegt. Fehlt erforderlicher Schutz, zeigt die App eine Lücke.

## Korrektur 0.9.3

Bei „Sportlich“ konnte die Atmungsaktivität einer einzelnen normalen Hose den erforderlichen Windschutz bei 6–10 °C verdrängen. Fehlender Windschutz an den Beinen wird jetzt stärker gegenüber Komfortnachteilen gewichtet. Die Original-Intensitätstabelle bleibt unverändert. Eine tatsächlich bereits winddichte Grundhose benötigt bei trockenem Wetter nicht automatisch eine zusätzliche Regenhose. Gespeicherte Eigenschaften werden nicht überschrieben; die RR-Hose darf nur dann als winddicht erfasst sein, wenn dies für das konkrete Modell zutrifft.

## Korrektur 0.9.2

Für kalte Temperaturstufen wird der Windschutz der Beine als eigene Anforderung berücksichtigt. Dadurch kann die verfügbare Lupra-Regenhose über einer normalen langen Hose als zusätzliche Schutzschicht gewählt werden. Unter „Ersatzkombination für die Beine“ werden die tatsächlich gewählten Teile und getrennte Aussagen zu Windschutz und Wärme angezeigt, jeweils für Start und Ende sowie die eigene Auswahl. Rot bewertete oder thermisch unzureichende Kombinationen bleiben als unzureichend erkennbar; Lupra wird nicht als Thermohose umgedeutet. Im Fall von 3 °C: RevolutionRace plus Lupra erfüllt im Modell den Windschutz, aber nicht die Wärmeisolierung einer Thermohose. Bei vorhandener passender winddichter Thermohose wird diese bevorzugt. Keine Änderung vorhandener Kleidungsstücke oder der Datenbankschemaversion.

## Ergänzung 0.9.1

Abnehmbare Zip-off-Hosenbeine erscheinen beim Wechsel von Kurz am Start zu Lang am Ende als eigener gelber Eintrag unter „Mitnehmen“. Antippen öffnet die Eigenschaften der zugehörigen Hose. Sie werden als Bestandteil mit Verweis auf die Hose gespeichert, ohne zweite Kleidungs-ID und ohne zusätzliche Wärme-Doppelzählung. Tatsächliches Gepäck und ursprüngliche Empfehlung bleiben getrennt; alte Fahrten benötigen dieses neue optionale Feld nicht. Die vorhandene Hose muss als Zip-off mit beiden Varianten markiert sein.

## Änderungen

- Excel-Ausgangsregeln aus allen vier Tabellenblättern; nachvollziehbare grüne/gelbe/rote Bestands- und Ersatzbewertungen. Details und Konfliktentscheidungen: [EXCEL_AUSWERTUNG.md](EXCEL_AUSWERTUNG.md).
- Fünf funktionale Kategorien: Baselayer, Midlayer, Toplayer, Hose, Extras. Zusätzliche konkrete Kleidungsfunktionen bestimmen sinnvolle Schichtung und Anziehreihenfolge. Armlinge werden vor dem Trikot, Regenhosen über normalen Hosen angezeigt.
- Verfügbare Kombinationen mit getrennten Wärme-, Wind-, Regen- und Atmungswerten. Fehlender Schutz bleibt auch bei einer bestmöglichen Ersatzkombination sichtbar. Regenkleidung wird nicht automatisch Thermokleidung.
- Start-/Endtemperatur untereinander, −10 bis +40 °C, Schritt 1. Vorhandene Zwischenwerte und alte Werte außerhalb des neuen Bedienbereichs bleiben intern erhalten, bis der jeweilige Regler bewusst bewegt wird.
- Zip-off als ein physisches Kleidungsstück mit Lang-/Kurz-Varianten. Automatische und eigene Auswahl berücksichtigen die Variante; Fahrten speichern tatsächliche Auswahl und ursprüngliche Empfehlung getrennt.
- Eigenschaften durch Antippen im Outfit öffnen. Fehlende Hersteller-, Modell- oder Materialangaben werden nicht erfunden. Modellannahmen stehen ausdrücklich getrennt von hinterlegten Angaben.
- Anziehen grün, Mitnehmen gelb; Beschriftung mittig, Hell-/Dunkelmodus einschließlich Geräteautomatik.
- Behutsame persönliche Anpassung durch neue Fahrtrückmeldungen, abschaltbar. Die Original-Intensitätstabelle bleibt erhalten.

## Daten erhalten

IndexedDB weiterhin `gravel-outfit`; Datenbankversion 6, Sicherungsformat `schemaVersion: 7`. Bestehende Objekt-Stores bleiben erhalten. Vor der Versionsmigration wird der ursprüngliche Zustand atomar unter `migrationBackups/before-0.9` gesichert. Neue Metadaten werden ergänzt; vorhandene Kleidungsstücke, IDs, Eigenschaften, Archivierungen, Pflege, Fahrten, Einstellungen und manuelle Auswahl werden nicht gelöscht oder zurückgesetzt. Bei ungültiger Migration wird die Transaktion abgebrochen.

Auf einer frischen Installation wird der aus Excel bekannte Bestand angelegt. In einem bereits vorhandenen Kleiderschrank erfolgt **kein automatischer Bestandsimport**. Einstellungen → „Excel-Bestand ergänzen“ ergänzt nur fehlende bekannte Einträge; vorhandene Einträge bleiben unverändert. Eine bestehende RevolutionRace-Hose lässt sich bearbeiten und als Zip-off mit beiden Varianten markieren. Alte separate Lang-/Kurz-Datensätze werden nicht automatisch verschmolzen.

JSON-Export/-Import, Verfügbarkeit, Wäsche, Archiv und Pflegehistorie bleiben erhalten. Import ersetzt den aktuellen Zustand erst nach Validierung und Bestätigung. Browserdaten sind geräte- und ursprungsgebunden: dieselbe veröffentlichte HTTPS-Adresse weiterverwenden und regelmäßig JSON sichern. Ein lokaler Test unter einer anderen Adresse erhält einen separaten Speicher.

## Lokal testen

`python3 -m http.server 8790`, dann `http://localhost:8790/`. Keine Ausführung direkt über `file://`. Automatisierte Tests: `node --test tests/*.test.cjs`. Separater Browser-Migrationstest: auf einem **neuen Testport** `tests/migration-fixture.html` öffnen, Testbestand anlegen, App öffnen, anschließend Datenerhalt prüfen. Der Test überschreibt keinen vorhandenen Zustand.

## GitHub Pages / iPhone

Den vollständigen Paketinhalt in die Wurzel des vorhandenen Repositorys übernehmen, nicht als zusätzlichen Unterordner. Die bestehende Pages-Konfiguration beibehalten. Erst nach Prüfung des Änderungsvorschlags veröffentlichen. Alle Pfade sind relativ und funktionieren unter `/Gravel-Oufit/`.

Nach einem Update alle alten App-Tabs bzw. die installierte PWA vollständig schließen und erneut öffnen, damit der vorbereitete Service Worker übernehmen kann. Einmal online vollständig laden; danach offline nutzbar. Auf dem iPhone: Safari → Teilen → Zum Home-Bildschirm. Ein physischer iPhone-/Safari-Test steht noch aus; mobile Browserprüfung siehe [TESTBERICHT.md](TESTBERICHT.md).

## Projektdateien

Laufzeit: `index.html`, `style.css`, `app.js`, `core.js`, `excel-rules.js`, `data/excel-source.json`, Manifest, Icons, `sw.js`, `version.json`. Bestehende ältere Verzeichnisse bleiben im vollständigen Paket erhalten. Die ursprüngliche Excel-Datei wurde nicht geändert und wird nicht zusätzlich veröffentlicht. Kein Wetterdienst, keine Cloud und keine externen Laufzeitabhängigkeiten.
