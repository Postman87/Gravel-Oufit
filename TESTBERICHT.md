# Testbericht · Gravel Outfit 0.9.0

29. Oktober 2026. Fortgeführt auf dem tatsächlichen Repository-Stand 0.8.0 (`9a673490c5c3d6b46fc94d659954eccd9f0da232`). Keine Neuentwicklung, keine Veröffentlichung auf dem Hauptbranch.

## Automatisierte Prüfung

**93 Tests bestanden, 0 fehlgeschlagen.** `node --test tests/*.test.cjs`, ohne zusätzliche Pakete. Enthalten sind 69 fortgeführte Funktionstests und 24 Excel-/Varianten-/Datenprüfungen. Erwartungen wurden dort angepasst, wo die neuen Excel-Ausgangsregeln das bisherige Verhalten ausdrücklich ändern.

| Fall | Ergebnis |
|---|---|
| 25 °C, einzelne RevolutionRace Zip-off | Kurze Tragevariante, dieselbe physische ID; keine doppelte Hose. |
| 3 °C | Lange Variante; fehlende Thermoisolierung wird trotz vorhandener Ersatzkleidung gemeldet. |
| 25 → 7 °C | Start kurz, Ende lang; zusätzliche verfügbare Schichten im Gepäck und Hinweis auf mitzunehmende Zip-off-Beine. |
| 11 → 7 und 7 → 11 °C | Unabhängige Tourzeitpunkte, passende Mitnahme-/Ablegemöglichkeiten. |
| Wera plus Armlinge bei 7 °C | Qualifizierter gelber Midlayer-Ersatz statt fälschlich grüner Einzelbewertung. |
| Roter Hosenersatz | Bleibt unzureichend, auch bei künstlich sehr hoher numerischer Modellwärme. |
| Frost ohne geeignete Thermokleidung | Pro-Function/Wera/Lupra-Ersatz bleibt rot; verfügbare Kombination wird mit verständlichen Defiziten gezeigt. |
| Baselayer/Trikot/Lupra bei Kälte | Schichten kombinierbar; Windschutz zählt nicht automatisch als Thermoisolierung. |
| Geeignete Thermoteile vorhanden / vorübergehend nicht verfügbar | Verfügbare geeignete Teile bevorzugt; nicht verfügbare/archivierte Teile ausgeschlossen. |
| 25 °C, nur warme Ziener-Handschuhe | Kein pauschaler Handschuhzwang; optionale Zonen können leer bleiben. |
| Normale lange/kurze Radhosen | Körperzone, Beinlänge und Funktion bestimmen die Auswahl. Unterziehhosen ersetzen keine Außenhose. |
| Locker/Normal/Sportlich | Excel-Intensitätsregeln wirksam; alle 15 Originalzellen unverändert verglichen. |
| −10 und +40 °C sowie sämtliche Bandgrenzen | Ohne erfundene Kleidungsstücke berechnet; überlappender Nullpunkt konservativ aufgelöst. |
| Lernen | Begrenzte schrittweise Anpassung; alte Fahrten nicht automatisch verwendet; rote Quellenbewertung unverändert. |
| Migration/Import | Alte IDs, Felder, Temperaturen, Pflege und Fahrten erhalten; Ergänzungsimport ohne Duplikate; ungültige Sicherung abgewiesen. |
| Eigene Auswahl / Fahrtsnapshot | Auswahl und Tragevariante bleiben beim Ansichtswechsel erhalten; tatsächliche Auswahl separat von automatischer Empfehlung gespeichert. |
| Aktionsfarben | WCAG-AA-Kontrast für die festgelegten hellen/dunklen Text-/Hintergrundkombinationen. |

## Browserprüfung

Im lokalen In-App-Browser tatsächlich ausgeführt:

- Frische Installation: Excel-Bestand geladen; 25 °C empfiehlt RR kurz, keine warmen Handschuhe.
- 25 → 7 °C: Anziehen/Mitnehmen getrennt, zusätzliche Schichten und Variantenwechsel sichtbar; roter Hosenersatz verständlich gewarnt.
- Antippen der RR-Empfehlung: Eigenschaftendialog mit Hersteller RevolutionRace, Variante Kurz und ausdrücklich fehlenden Modell-/Materialangaben. Keine erfundenen Kennwerte.
- Eigene Auswahl: Variante Lang gesetzt; Wechsel zu Empfohlen und zurück erhält Lang.
- 390 × 844 Pixel: Dokumentbreite genau 390 Pixel, kein horizontales Überlaufen. Temperaturregler übereinander; beide min −10, max 40, step 1. Navigation und Eigenschaftendialog bedienbar.
- Heller und dunkler Farbmodus: Aktionsfelder grün/gelb; tatsächliche berechnete CSS-Ausrichtung horizontal und vertikal mittig. Screenshots erstellt.
- Isolierter IndexedDB-Migrationstest 0.8 → 0.9 auf neuem Testport: 21 alte Kleidungsstücke, Pflege, Notizen, Verfügbarkeit, Auswahl, historische Fahrt, eigener alter Objekt-Store und Einstellungen verglichen. Originalkopie `before-0.9` exakt identisch. 11,5 °C und −12,5 °C intern unverändert erhalten.
- JSON-Export des migrierten Bestands: Format 7, 21 Teile, 1 Fahrt und ursprüngliche Temperaturwerte erhalten; Import derselben Datei über die normale Bestätigung ausgeführt.
- Server danach vollständig gestoppt, App neu geladen: weiter nutzbar, gespeicherter Kleiderschrank mit Pflegeeintrag vorhanden. Anzeige korrekt „Server nicht erreichbar · lokal nutzbar“ statt Online. Dies prüft fehlende Serververbindung; keine Abschaltung des gesamten Betriebssystem-Netzes erforderlich.
- Keine JavaScript-Konsolenfehler im abschließend geprüften App-Stand. Ein beim ersten Browserlauf gefundener fehlender Export wurde korrigiert und mit zusätzlichem Regressionstest abgesichert.

## Grenzen

Kein physisches iPhone vorhanden: tatsächliche iOS-Safari-/Home-Bildschirm-Installation und Hardware-Offlinetest stehen noch aus. Die mobile Prüfung erfolgte in einer Browseransicht mit iPhone-Abmessungen. Keine automatische Wetteranbindung, keine wissenschaftliche Kalibrierung der Material-Modellwerte. Widersprüchliche Excel-Zuordnungen werden dokumentiert und vorsichtig behandelt. Die veröffentlichte GitHub-Pages-Version bleibt bis zur ausdrücklichen Übernahme des Änderungsvorschlags unverändert.
