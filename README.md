# Gravel Outfit 0.13.0

Fortführung der bestehenden Version 0.8 aus `postman87/Gravel-Oufit`: HTML, CSS, Vanilla JavaScript, IndexedDB, offlinefähige PWA für GitHub Pages. Keine Frameworks, kein Build notwendig.

## Kompakte Startseite · 0.13.0

Outfit öffnet mit einer kurzen Tourübersicht: Start, Fahrzeit, Strecke/Standort und Wetter. Die Bekleidung folgt direkt darunter. „Planung ändern“ öffnet eine eigene Ansicht innerhalb von Outfit; „Zurück zum Outfit“ kehrt zur Übersicht zurück. Die drei Hauptbereiche bleiben erhalten. Manuelle Temperatur-, Wind- und Regenwerte sind unter „Wetter selbst einstellen“ zunächst geschlossen. Intensität, Dauer, Kälteempfinden und optionale Schutzwahl bleiben verfügbar. Nach „Empfehlung aktualisieren“ erscheint wieder das Outfit.

„Wetter aktualisieren“ ist direkt in der Übersicht erreichbar. Quelle, Standort und Wetterverlauf stehen in aufklappbaren Details; Warnungen zu veralteten oder nicht passenden Prognosen bleiben sichtbar. Letzte Fahrten sind eingeklappt. Eine feste Leiste hält den Fahrtstart erreichbar; bei laufender Tour führt „Tour beenden“ zur Rückmeldung mit Körperzonen. Der Seiteninhalt hat zusätzlichen Abstand zur Leiste einschließlich iPhone-Sicherheitsbereich. Kein Datenmodellwechsel.

## GPX, Hin-/Rückfahrt und zuverlässige Planung · 0.12.0

Komoot-Tour als GPX exportieren und unter Outfit auswählen. Die Datei wird lokal eingelesen (bis 5 MB), auf höchstens 2000 Punkte reduziert und mit der JSON-Sicherung gespeichert. Ohne Wetterabruf wird nichts übertragen. Für Streckenwetter werden bis zu zwölf auf zwei Dezimalstellen gerundete Stützpunkte an Open-Meteo gesendet; die GPX-Datei selbst wird nicht hochgeladen. Der Gerätestandort wird dabei nicht abgefragt.

Eine GPX kann die gesamte Tour oder nur die Hinfahrt beschreiben. Bei „Hinfahrt laut GPX + identischer Rückweg“ werden Hin- und Rückfahrtdauer getrennt in 30-Minuten-Schritten bis jeweils sechs Stunden gewählt. Ein Aufenthalt über ein Dropdown von „Kein Aufenthalt“ bis zwölf Stunden (30-Minuten-Schritte) verschiebt den Rückweg. Start, Ankunft, Rückfahrtbeginn und Ende werden angezeigt. Wetter während des Aufenthalts wird berücksichtigt; individuelle Auskühlung in der Pause wird nicht modelliert.

Die Durchfahrtszeiten beruhen auf gleichmäßigem Tempo entlang der Entfernung, nicht auf Steigungen oder GPX-Zeitstempeln. Die Prognose ist eine Stichprobe, keine lückenlose Wettergarantie. Start-/Endtemperatur beziehen sich auf die passenden Orte und Zeiten; kältere und windigere/nassere Abschnitte beeinflussen die Mitnahme.

Datum, Uhrzeit und Dauer werden sofort als Planung gespeichert und überleben Ansichtswechsel. Eine geänderte Planung kennzeichnet die bisherige Prognose als veraltet und erfordert einen neuen Abruf oder bewusste manuelle Übernahme. Gerätezeitzone, gewählter Start und erwartetes Ende sind sichtbar. Der Standort der geladenen Prognose wird mit gerundeten Koordinaten und einem optionalen OpenStreetMap-Link angezeigt; es erfolgt keine zusätzliche Ortsnamenabfrage.

Vorhandene Kleidungsstücke, Einstellungen und Fahrthistorien bleiben erhalten. Keine Änderung der IndexedDB-Version; neue Felder sind optional. Alte gespeicherte Dauern bleiben erhalten, bis eine neue Dauer gewählt wird. Kein automatisches Veröffentlichen auf GitHub Pages.

## Automatisches Wetter und Zeitplanung · 0.11.0

Unter Outfit zuerst die **Fahrtdauer** einstellen (30 Minuten bis 6 Stunden, Schritte von 30 Minuten), Tourstart **Jetzt** oder **Datum und Uhrzeit planen** wählen und **Standort verwenden & Wetter laden** antippen. Standortfreigabe im Browser erlauben. Der Abruf aktualisiert Temperaturen und Empfehlung; Intensität, Kälteempfinden und optionale Schutzwahl bleiben erhalten. Es gibt keine automatische Standortabfrage beim Öffnen der App.

Für Jetzt wird ein aktueller Modellwert für den Tourstart verwendet, soweit frisch verfügbar. Endtemperatur und geplante Starts stammen aus der Stundenprognose; Zwischenzeiten werden interpoliert, alle Temperaturen in ganzen Celsiusgraden angezeigt. Exakte Start-/Endzeit, Abrufzeit, Quelle, Wind/Böen, zeitanteiliger Niederschlag, Wahrscheinlichkeit und Temperaturverlauf stehen in der Wetterkarte. Planung ist bis sechs Tage im Voraus möglich, sofern die gesamte Tour durch die Prognose abgedeckt ist. Zeitangaben und Datumsfeld verwenden ausdrücklich die Gerätezeitzone; API-Zeitpunkte werden als absolute UTC-Zeitpunkte verarbeitet.

Die Empfehlung betrachtet Startbedingungen getrennt vom späteren Schutzbedarf. Wind und Niederschlag während der Tour können zusätzliche Mitnahme auslösen. Ein versehentlicher Fahrtstart jetzt mit einer deutlich später geplanten Prognose wird abgefangen; die Planung muss dafür aktualisiert oder bewusst auf manuelle Werte umgestellt werden. Ein Kälteeinbruch zwischen Start und Ende wird für die spätere Schutzkombination berücksichtigt und ausdrücklich erklärt; die tatsächliche erwartete Endtemperatur wird nicht durch einen Minimalwert überschrieben. Bei einer einfach wärmer werdenden Tour bleibt die Endkombination reduzierbar.

### Quelle und Standort

**[Open-Meteo Forecast API](https://open-meteo.com/en/docs), automatische Best-Match-Modellwahl**, Daten unter [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Es handelt sich um Modellwerte am aktuellen Standort, keine Messung einer Wetterstation ; bei ausgewählter GPX werden mehrere Punkte entlang der Route abgefragt. Die freie API ist für diese private, nicht kommerzielle Anwendung vorgesehen; [Nutzungsbedingungen und Datenschutz](https://open-meteo.com/en/terms). Die Attribution in der App bleibt auch bei gespeicherten Prognosen sichtbar.

Nur beim bewusst ausgelösten Abruf werden auf zwei Nachkommastellen gerundete Koordinaten (etwa Kilometerauflösung) an Open-Meteo übertragen. Keine Cookies oder Zugangsdaten. Die App speichert die gerundeten Abfragekoordinaten zur sichtbaren Standortanzeige, außerdem Wetterwerte, Zeitraum, Quellenangabe und Abrufzeit. Ältere Prognosen ohne Standortangabe müssen einmal neu geladen werden. Browser-/Standortfreigabe erfordert HTTPS oder localhost. Bildschirmaufnahme ist keine Funktion oder Voraussetzung von Gravel Outfit.

### Grenzen und Offlinebetrieb

Neue Wetterdaten benötigen Internet. Bei abgelehntem Standortzugriff, Netzwerkfehlern, Zeitüberschreitung, unvollständigen Daten oder nicht abgedeckter Planung bleiben bisherige Werte erhalten. Letzte Prognose und manuelle Bedienung stehen weiter zur Verfügung; ältere oder offline verwendete Prognosen werden gekennzeichnet. Eine manuelle Änderung an Temperatur, Wind oder Niederschlag löst die automatische Quellenzuordnung ab. Änderungen der Dauer bzw. Startplanung verlangen erneuten Abruf oder bewusste Übernahme manueller Werte vor dem Fahrtstart. Überholte parallele Abfragen dürfen neuere Eingaben nicht überschreiben.

Windklassen entsprechen der bisherigen Auswahl: bis 15, über 15 bis 30 und über 30 km/h, stärkster erwarteter Mittelwind der Tour. Böen werden zusätzlich angezeigt. Niederschlag: trocken ohne relevante Menge/Wahrscheinlichkeit; Schauer bei mindestens 0,1 mm in einer betroffenen Prognosestunde oder mindestens 40 % Wahrscheinlichkeit; Dauerregen als grobe Modellableitung nur bei mindestens einer Stunde Tourdauer und mindestens zwei durchgehend nassen Prognosestunden. Niederschlagsmengen werden für angebrochene Stunden zeitanteilig summiert. Dies sind transparente Eingangsregeln für die Kleiderwahl, keine garantierte Wetterklassifikation.

Bestehende Kleidungsstücke, Zonenfeedback, Lernen und JSON-Sicherungen bleiben erhalten. Datenbankversion 6 / Format 7 bleiben bestehen; Wetter-/Planungsmetadaten sind optional und werden bei Import geprüft. Alte unberührte Zwischenwerte werden nicht automatisch gerundet oder zurückgesetzt. Automatisch geladene Werte außerhalb der neuen Reglerspanne werden sichtbar mit ihrem tatsächlichen Ganzzahlwert erhalten; extremere Werte außerhalb des vom Datenmodell unterstützten Bereichs werden nicht übernommen.

### Prüfung

148 automatisierte Tests: `node --test tests/*.test.cjs`. Manueller Live-Integrationstest mit öffentlichen Berliner Koordinaten: `tests/weather-browser.html`. Dieser Test fragt absichtlich nicht den Gerätestandort ab und kann einen klar bezeichneten synthetischen Testbestand herunterladen. Nur in einem getrennten Testspeicher importieren.

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

Laufzeit: `index.html`, `style.css`, `app.js`, `core.js`, `excel-rules.js`, `data/excel-source.json`, Manifest, Icons, `sw.js`, `version.json`. Bestehende ältere Verzeichnisse bleiben im vollständigen Paket erhalten. Die ursprüngliche Excel-Datei wurde nicht geändert und wird nicht zusätzlich veröffentlicht. Optionaler Wetterabruf von Open-Meteo; keine Cloud-Synchronisierung und keine externen JavaScript-Abhängigkeiten.

Version 0.12.1: Aufenthaltsauswahl als Dropdown. Abweichende frühere Werte werden als „bisher gespeichert“ zusätzlich angezeigt und unverändert weiterverwendet, bis eine neue Auswahl erfolgt.
