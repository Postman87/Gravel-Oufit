# Prüfung Gravel Outfit 0.17.0

## Aktueller Stand 0.17.0

235 automatisierte Tests erfolgreich (231 bestehende plus vier Viertelstunden-/Kalenderfälle). Geprüft: 96 neue Uhrzeitoptionen, unveränderte frühere Uhrzeit, Viertelstundenvorschlag über Mitternacht und vollständige Datums-/Uhrzeitangaben. PWA-Versions-/Offline-Test um das neue UI-Hilfsmodul erweitert.

Neuer DOM-Integrationstest mit tatsächlichen App-Dateien: kein Wetterquellenauswahlfeld mehr auf der Startseite; Tour planen mit genau zwei Einstiegen; Standort als frischer Standard; Datum, 15-Minuten-Zeitwahl und Dauer; Speichern lädt Wetter und schließt; Route (GPX) samt Namen erscheint; manuelle Übernahme ohne Prognosezuordnung; stille Intensitäts-/Kälte-Dropdowns; Kleidungs-/Einordnungs-/Eigenauswahl-Reihenfolge; eigene Auswahl bleibt beim Umschalten erhalten; alte Uhrzeit ohne Rundung; JSON gültig.

Der vollständige bisherige DOM-Test für persönliche Bereiche, Retro-Touren, Ortsauswahl, Hintergrundwetter, Offline/Online, laufende Bewertung und sichere Tourlöschung besteht ebenfalls mit dem neuen Aufbau. Keine Änderung an der Empfehlungslogik außer der Versionskennung.

Sichtbarer Browser im festen 402×874-iPhone-Vorschaurahmen: kompakte Startseite und Tourplanung mit Kalender, Viertelstunden und Dauer geprüft. Interne Dokumentbreite 402 Pixel, Inhaltsbreite 402 Pixel. Vorhandene lokale Daten einschließlich früherer geplanter Uhrzeit bleiben erhalten. Kein physischer iPhone-Test. Vollständiges ZIP und Offline-Dateiliste geprüft. Kein automatisches Veröffentlichen.

## Bisheriger Stand 0.16.1

231 automatisierte Tests erfolgreich (227 bestehende plus vier Löschfälle). Geprüft: genau eine Tour samt eigener Wetterdaten/Bewertung entfernen, übrige Daten unverändert, Learning danach neu berechnet, laufende und unbekannte Tour geschützt, JSON-Rundlauf und unveränderte frühere Sicherung.

Zusätzlicher DOM-Integrationstest mit tatsächlichen App-Dateien: Bestätigung abgelehnt erhält Tour; Bestätigung angenommen entfernt Tour ohne Kleidungsänderungen; laufender Wetterabruf wird abgebrochen; absichtlich dennoch spät aufgelöste Antwort stellt die Tour nicht wieder her. Bisherige Bereichs-, Retro-, Offline-/Online- und Feedbacktests weiterhin erfolgreich. Kein physischer iPhone-Test.

## Bisheriger Stand 0.16.0

- **227 automatisierte Tests erfolgreich.** Die bisherigen 204 Regressionstests behalten bewusst den früheren Modellpfad für vorhandene Datensätze ohne aktiviertes persönliches Modell. 23 neue Fälle prüfen den neuen produktiven persönlichen Modellpfad und nachträgliches Wetter. Die App aktiviert den neuen Pfad beim Öffnen und nach dem Import.
- Persönliche Bereiche wirken sofort, auch außerhalb früherer Excel-Schwellen. Halstuch 15→14 nach wiederholtem Zu warm; manuelle neue Grundlage erhält alle Erfahrungen; Sonne/Wind-Kontexte; nur tatsächlich getragene Kleidung; geteilte Evidenz bei mehreren Schichten; Learning deaktivierbar; kurze Hose im Warmen; persönliche Handschuhgrenze; Verfügbarkeit und tragbare Schichten.
- Historischer Abruf: gerundete Koordinaten, vergangene Zeiten, jüngste Modelle/ältere Reanalyse, Strahlung/Bewölkung, GPX mit Hin-/Rückfahrt und Aufenthalt, fehlende Daten/ungültige Zukunft, eindeutige Ortsauswahl, getrennte Prognose, JSON-Rundlauf und zeitgewichtete Bewertung.
- DOM-Integration mit tatsächlichen HTML-/JS-Dateien und simuliertem IndexedDB: Bereich im Editor ändern und Empfehlung prüfen; Retro-Tour mit Ortssuche, Kleidung und Zonenbewertung offline speichern; Online-Ereignis startet Abgleich; Prognose/Originaldaten bleiben erhalten; laufendes Feedbackformular wird nicht zurückgesetzt; Bestätigung tatsächlicher Kleidung und Ortsnachtrag; JSON-Validierung.
- Live-API-Test mit öffentlichen Berliner Koordinaten erfolgreich: jüngste Tour und 14 Tage zurückliegende Tour, unterschiedliche APIs/Datenarten und Sonnen-/Wolkendaten. Keine persönlichen Orts-/GPX-Daten verwendet.
- Sichtbarer In-App-Browser: komplette nachträgliche Testtour (Berlin, 29.10.2026, 120 Minuten) mit Kleidung und Hals Zu warm/Gesamte Tour gespeichert; Ortssuche mit Auswahl, automatischer Wetterabgleich und sichtbare Quelldaten erfolgreich. Als TESTTOUR gekennzeichnet, nur lokale Vorschau.
- Responsive Browserprüfung bei 390 × 844 Pixeln: Seitenbreite 390, keine horizontale Überbreite, feste Startleiste und Wetter-/Bewertungsanzeige bedienbar. Browser-Vorschaubild gespeichert. Kein physisches iPhone getestet.
- Neue Module personal.js, history-weather.js, history-ui.js liegen in der Offline-Dateiliste. Keine Frameworks. ZIP wird byteweise mit vollständigen Quellen abgeglichen. IndexedDB 6 / Schema 7 bleiben bestehen; Kleidungswerte, Pflegehistorie und alte Bewertungen werden nicht zurückgesetzt.

Offene Grenzen: Kein Aufwachen einer vollständig geschlossenen iPhone-PWA garantiert. GPX-Durchfahrtszeiten bleiben ohne Trackaufzeichnung geschätzt. Wetter ist modelliert, keine persönliche Messung; lokale Beschattung und tatsächlicher Fahrtwind nicht vollständig erfasst. Modellgewichte müssen mit weiterer Nutzung geprüft werden. Keine automatische Veröffentlichung.

## Frühere Prüfprotokolle

- 174 automatisierte Tests erfolgreich: bestehende Bekleidungs-, Lern-, Daten- und Wettertests sowie 26 neue GPX-/Planungstests.
- Zusätzlicher DOM-Integrationstest mit der tatsächlichen HTML-/JS-Anwendung und simuliertem IndexedDB: geplantes Datum bleibt nach Darstellungswechsel erhalten; Abruf verwendet den gewählten Zeitpunkt; Standortanzeige; GPX-Import ohne automatischen Upload; Hin-/Rückfahrt mit Aufenthalt; unterschiedliche Fahrtdauern; veraltete Prognose nach Planänderung.
- Live-Abruf bei Open-Meteo mit öffentlichen Berliner Testkoordinaten erfolgreich: mehrere Orte, 60 Minuten Hinfahrt, 45 Minuten Aufenthalt, 90 Minuten Rückfahrt; 150 Minuten Fahrzeit / 195 Minuten Gesamtzeit. Keine persönlichen Standort- oder Routendaten verwendet.
- Dauern: 30 bis 360 Minuten in 30-Minuten-Schritten, getrennt für Hin-/Rückfahrt. Ungültige Werte werden abgewiesen; alte Werte nicht umgeschrieben.
- GPX: Namespaces, Tracks/Routen, XML-Entities und CDATA, doppelte Punkte, Datumsgrenze, große Dateien, unverbundene Segmente und unzulässige XML-Strukturen geprüft.
- Datenerhalt: JSON-Rundlauf einschließlich Route, Planung und Prognose; bestehende Bekleidung und Lernhistorie durch Regressionstests abgedeckt. IndexedDB bleibt Version 6, Datenschema 7.
- Fehlerfälle: fehlende Wetterpunkte, Netzwerkfehler, veränderte Planung und fehlende Standortangabe alter Prognosen. Keine Teilprognose wird übernommen.
- Service-Worker-Dateiliste einschließlich route.js und planning.js auf vorhandene Dateien geprüft; bestehender Offlinebetrieb erhalten. Neue Wetterdaten benötigen Internet.

Grenzen: Kein Test auf einem physischen iPhone und kein neuer visueller Bildschirmtest. DOM-Tests ersetzen keinen Safari-Gerätetest. Keine Bildschirmaufnahme verwendet. Die veröffentlichte Hauptversion wird nicht automatisch geändert.

0.12.1: DOM-Test bestätigt Dropdown mit 25 Optionen: kein Aufenthalt und 30-Minuten-Schritte bis 12 Stunden. Hin-/Rückfahrt mit einer Stunde Aufenthalt erfolgreich berechnet. 174 Regressionstests weiterhin erfolgreich. Alte abweichende Aufenthaltswerte bleiben als zusätzliche gespeicherte Option erhalten.

## Kompakte Startseite 0.13.0

174 Regressionstests erfolgreich. DOM-Integration mit tatsächlichen App-Dateien: Planung beim Start verborgen, Outfit sichtbar, Startknopf in fester Leiste, Öffnen/Schließen der eigenen Planungsansicht, Datum über Darstellungswechsel erhalten, Standort- und GPX-Wetterabruf, Hin-/Rückfahrt mit Aufenthalt, veraltete Prognose auch in der Tourübersicht sichtbar. Keine neue IndexedDB-Version oder Datenmigration. Mobil-CSS berücksichtigt Sicherheitsabstand und Bedienflächen; kein physischer iPhone-/Safari-Test und kein Bildschirmfoto.

Zusätzlich geprüft: Tourstart über die feste Leiste, Umschalten zur laufenden Tour, Fokus auf Rückmeldung bei „Tour beenden“, Öffnen der Körperzonenbewertung und Ausblenden der Leiste in Kleiderschrank/Einstellungen.

## Zeitbezogene Rückmeldung 0.13.1

181 Tests erfolgreich: sieben neue Fälle für zeitliche Lerntrennung, Zonen, Genau richtig, Datenerhalt/JSON, ungültige Zeiträume, zeitgewichtete Prognose mit Zwischenkälte sowie Lernvergleich nach Abschnittstemperatur. DOM-Integration: Zeitraum bei Kritik sichtbar und verpflichtend, Zonenbewertung, Tourabschluss, Speicherung und Historienanzeige. Bisherige 174 Tests bleiben erfolgreich. Keine Datenbankmigration. Kein physischer iPhone-Test.

## Durchgehende Kombination 0.14.0

188 Tests erfolgreich. Sieben neue Tests: 12→10 ohne Gepäck/Variantenwechsel, 12→9 ohne starre Drei-Grad-Auslösung, 18/25→7 mit Ergänzung, Verfügbarkeit und explizite Keine-Auswahl, späterer Regen, warmes Zwischenmaximum, zeitbezogenes Start-Learning. Zwei alte Erwartungen angepasst: 11→7 muss keinen Wechsel mehr erzwingen; die Lupra-Matrix prüft unverändert notwendige Schutzabdeckung, erlaubt jetzt sinnvolles Durchtragen über Temperaturgrenzen. Alle 1497 Matrixszenarien werden weiter geprüft.

DOM-Integration der tatsächlichen App-Dateien mit simuliertem IndexedDB erfolgreich: Planung, Wetter/GPX, feste Leiste, Tourstart, Rückmeldung mit Zeitraum und Zonen, Historie und Navigation. Kein physischer iPhone-Test. Datenbank-/Schema-Versionen unverändert. ZIP byteweise mit Quelldateien abgeglichen und Offline-Dateien vorhanden.

## Manuelles Wetter 0.14.1

188 Regressionstests erfolgreich. Erweiterter DOM-Integrationstest mit den tatsächlichen App-Dateien: fehlgeschlagener GPX-Wetterabruf erhält die vorherige Prognose; manueller Einstieg öffnet und fokussiert Temperaturfelder; explizite Übernahme auch unveränderter Werte entfernt die automatische Quellenzuordnung; Rückkehr zur Outfitübersicht; offline 12→10 °C mit manuellem Wind/Regen gespeichert; GPX und Kleidungsdaten unverändert. Bisherige DOM-Fälle einschließlich Tourstart und zeitbezogener Bewertung bleiben erfolgreich. Keine Datenmigration; kein physischer iPhone-Test. Vollständiges ZIP und Offline-Dateiliste geprüft.

## Baselayer-Minimum 0.14.2

195 Tests erfolgreich: sieben zusätzliche Fälle für 11→9, 9→11, exakte 10-Grad-Grenze, Zwischenminimum, nicht verfügbare Kurzarm-Basis/Langarmersatz, fehlende Längenangaben mit Warnung, Thermobasis beim Kälteminimum und warme Tour samt unverändertem Zustand. Bestehende 188 Tests einschließlich Lernfunktion und Outfit-Wechselpräferenz bleiben erfolgreich. DOM-Integration mit tatsächlichen App-Dateien erfolgreich. Kein physischer iPhone-Test und keine Änderung gespeicherter Bekleidung oder IndexedDB-Version.

## Explizite Wetterquellen 0.15.0

200 Tests erfolgreich (195 bestehende plus fünf neue Quellenfälle). Geprüft: Quelle mit JSON erhalten, unveränderte GPX, unabhängige Zeitplanung, Routenanforderung ohne Datei, passende Prognosequelle, alte Planung ohne Quellenfeld und ungültige Auswahl. Bestehender Planungstest berücksichtigt die zusätzliche abgeleitete Quellenangabe.

Erweiterter DOM-Test mit tatsächlichen App-Dateien: Route→Standort mit vorhandenem GPX; zusätzlicher Geolocation-Aufruf und Standortprognose; vollständige 270-Minuten-Tour inklusive 60 Minuten Aufenthalt bei 210 Minuten Fahrzeit; JSON-Rundlauf der optionalen Zeitplanmetadaten; Route zurück ohne neuen Dateiimport und ohne Geolocation; Manuell öffnet Eingabe, übernimmt Werte und lässt GPX unverändert. Bestehende Fehler-/Offline-, Bewertungs-, Navigations- und Planungsfälle bleiben erfolgreich. Kein physischer iPhone-Test. ZIP und Offline-Dateien geprüft.

## Updatekonsistenz und konkreter Baselayer-Fall 0.15.1

204 Tests erfolgreich. Vier zusätzliche Tests: feste HTML-/Offline-Asset-URLs, zusammengehöriger Cache für Navigation und Logik, reproduzierbares Risiko des alten Netzwerk-HTML/Cache-Skript-Verhaltens und exakter Screenshot-Datensatz. Letzterer prüft Pro-Function Kurzarm 0–10 °C bei 11→8 über alle drei Intensitäten und Kälteempfindlichkeiten. Kein alleiniger Schluss aus dem Kleidungstitel.

Erweiterte DOM-Integration speichert den originalen Pro-Function-Eintrag über den tatsächlichen Editor mit Kurzarm und 0–10 °C, prüft die Auswahl, sichtbaren Berechnungsstand und JSON-Rundlauf. Bisherige Quellen-/Offline-/Tour-/Bewertungsfälle erfolgreich. Die Datei-Konsistenz wurde in einer simulierten Service-Worker-Umgebung geprüft; kein physischer iPhone-/Safari-Test. Die konkrete Ursache auf dem Nutzergerät bleibt ohne dessen vollständige Laufzeitdaten unbestätigt. Vollständiges ZIP und Offline-Dateiliste geprüft.
