# Testbericht · Gravel Outfit 0.7.1

29. Oktober 2026. Weiterentwicklung des bestehenden Standes 0.7.

## Ergebnis

51 automatisierte Tests bestanden, keine fehlgeschlagen. Ausführbar ohne Zusatzpakete mit `node --test tests/core.test.cjs`.

## Die sechs angeforderten Fälle

Die Tests prüfen reale IDs, Verfügbarkeit, eindeutige Verwendung und legale Schichten. Wo ein tragbares Gesamtoutfit erwartet wird, enthält der Testbestand auch eine reale Beinkleidung; diese wird nicht erfunden.

| Fall | Bestand / Situation | Geprüftes Ergebnis |
|---|---|---|
| 1 | Kalt, kein Thermo-Baselayer; Langarm-Baselayer, Regenjacke, reale Hose | Langarm-Basis und Regenjacke werden kombiniert. Regenjacke liefert Windschutz, kaum Isolierung. Verbleibende Wärme fehlt ausdrücklich als Funktion. |
| 2 | Kalt, ausschließlich ärmelloser Baselayer | Nur unvollständige Grundlage, kein fahrbereites Outfit; automatischer Fahrtstart wird verhindert. Keine virtuelle Ersatzkleidung. |
| 3 | Lange und kurze RevolutionRace-Hose gleicher Art | Kalt wird die lange, warm die kurze Variante gewählt. Art bleibt identisch, Länge separat. |
| 4 | Mehrere passende Oberkörperschichten | Langarm-Basis, Trikotschicht und äußere Windschicht werden kombiniert; gemeinsame Isolierung erreicht das Modellziel, obwohl kein Einzelteil genügt. |
| 5 | Passende Thermokleidung vorhanden und verfügbar | Thermo-Basis und Thermojacke werden genutzt; keine Oberkörper-Wärmelücke im Modell. |
| 6 | Thermo-Basis in Wäsche und Thermojacke nicht verfügbar | Beide werden ausgeschlossen. Verfügbare lange Basis, Trikot und Regenjacke bilden den Ersatz; Restbedarf wird benannt. |

Fall 2 kann mit dem genannten Bestand physisch kein vollständiges Outfit ergeben. Der Test verlangt deshalb die ehrliche Kennzeichnung dieser Grenze und das Unterbinden eines automatischen Starts, statt einen tragbaren Ersatz vorzutäuschen.

## Weitere automatisierte Prüfungen

Fortgeführte Regressionstests prüfen Migration aus früheren Versionen, Datenunveränderlichkeit, alle Kleidungsarten, getrennten Regen- und Windschutz, Atmungsaktivität, Längeneinfluss, Wärme aus mehreren Schichten, sinnvolle Mindestanzahl, Anziehreihenfolge, keine Doppelnutzung, Ausschluss von Archiv und Wäsche, eigene Auswahl und wiederholtes Umschalten, Fahrt-Snapshots, JSON-Rundlauf und ungültige Sicherungen.

Neue Prüfungen betreffen außerdem:

- Funktionale Anforderungen enthalten keine virtuellen Artikel, Kleidungsarten oder Längen.
- Keine generisch erzeugten ärmellosen Thermotrikots.
- Sinnvolle unterschiedliche Längenbezeichnungen für Hosen und Oberbekleidung.
- Alte unpassende Längen werden erhalten, markiert und nicht automatisch eingeplant.
- Alte Dezimaltemperaturen bleiben bei Migration exakt erhalten.
- Anzeige rundet nur optisch; unveränderte Reglerwerte werden nicht zurückgeschrieben.
- Neue Temperaturwerte werden ganzzahlig übernommen.
- Zusätzliche mitgenommene Windschicht bei großer Temperaturspanne wird nicht doppelt verwendet.
- Armlinge werden nicht mit einem ärmellosen Trikot als Ersatz für fehlende Schulterbedeckung empfohlen.

## Durchgeführte Browserprüfungen

Integrierter Browser auf dem Mac, lokale Testursprünge unter dem Unterpfad `/v071/`:

1. Vorbereiteten Bestand aus 0.7 mit Dezimaltemperaturen, archivierter Hose, Pflege, alter Fahrt und einer früher möglichen ärmellosen Thermotrikot-Angabe geöffnet.
2. Unabhängiger Prüflauf bestätigte nach Migration Datenbankversion 4, Datenformat 5, unveränderte Temperaturwerte, sämtliche alten Kleidungsfelder, Archiv, Pflege, alte Fahrt und alten Settings-Store. Unveränderte Migrationskopie war vorhanden.
3. Wetter ohne Bewegung der Regler erneut gespeichert und nur eine Kleidungsnotiz bearbeitet. Der heruntergeladene JSON-Export bestätigte exakt erhaltene alte Wetter- und Kleidungstemperaturen; kein stilles Runden beim Speichern.
4. Die sichtbaren Anzeigen verwendeten ganze Grad. Ein Tastenschritt am Regler änderte die Temperatur um 1 °C; der Wert blieb nach Neuladen erhalten.
5. Der Hoseneditor bot „Lang“ / „Kurz“, der Oberbekleidungseditor „Langarm“ / „Kurzarm“ / „Ärmellos“ für passende Arten.
6. Mit nur nutzbarem ärmellosem Baselayer war „Fahrt starten“ deaktiviert; die Übersicht meldete ausdrücklich ein unvollständiges Outfit. Eine alte unpassende Thermo-Angabe wurde als zu prüfen markiert und nicht als Ersatz verwendet.
7. Reale RevolutionRace-Hose und reales Kurzarmtrikot angelegt. Danach erkannte die App die vorhandene Kombination aus Baselayer, Trikot und Hose als tragbare Grundbekleidung, mit weiterhin erklärten Wärmebeschränkungen.
8. Webserver beendet. App neu geladen: aus dem Service-Worker-Cache verfügbar, Anzeige „Server nicht erreichbar · lokal nutzbar“, ganzzahliger Wetterwert erhalten.
9. Fahrt offline gestartet und neu geladen. Tatsächlich gespeicherte Kleidungsstücke waren ausschließlich die vorhandene Basis, das reale Trikot und die reale Hose; ursprüngliche Empfehlung separat vorhanden.
10. Mobile Ansicht bei 390 × 844 Pixeln und geöffneten funktionalen Anforderungen geprüft: Dokumentbreite 390 Pixel, kein horizontaler Seitenüberlauf.

## Reproduzierbarer Datenerhalt-Test

Im entpackten Ordner auf einem neuen Testport starten, beispielsweise `python3 -m http.server 8098`. Dann `http://localhost:8098/tests/migration-fixture.html` öffnen, „0.7-Testdaten anlegen“ ausführen und auf „BEREIT“ warten. Über den Link Version 0.7.1 öffnen. Vor Änderungen zur Testseite zurückkehren und „Datenerhalt prüfen“ anklicken. Erwartet wird „BESTANDEN“.

Der Test schreibt nur auf einen leeren Testursprung und überschreibt keine vorhandenen Daten. Er ist für das produktive Profil nicht erforderlich.

## Noch auf dem Zielgerät prüfen

Kein GitHub-Deployment oder Upload ausgeführt. Die Installation und der Flugmodus auf einem echten iPhone sowie das produktive Service-Worker-Update bleiben auf dem Zielgerät zu prüfen. Keine Browserdaten für das Update löschen; alte App-Fenster schließen und erneut öffnen.
