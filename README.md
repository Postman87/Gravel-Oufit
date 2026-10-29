# Gravel Outfit 0.9.0

Fortführung der bestehenden Version 0.8 aus `postman87/Gravel-Oufit`: HTML, CSS, Vanilla JavaScript, IndexedDB, offlinefähige PWA für GitHub Pages. Keine Frameworks, kein Build notwendig.

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
