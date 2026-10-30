# Prüfung · Gravel Outfit 0.11.0

30. Oktober 2026. **148 automatisierte Tests erfolgreich, 0 fehlgeschlagen** (132 bisherige plus 16 Wettertests). Zusätzlich echte Live-Anfragen an Open-Meteo mit öffentlichen Testkoordinaten in Berlin.

## Automatisierte Fälle

Jetzt / Zukunft, genaue Minuten und lokale Eingabe; ungültige, vergangene und zu weit entfernte Termine; aktuelle Modellwerte gegenüber geplanter Prognose; Rundung auf ganze Grad; Spitzenwind und Böen unterwegs; zeitanteiliger Niederschlag; Wahrscheinlichkeit und Dauerregen-Abgrenzung; aktueller Niederschlag trotz trockener Stundenprognose; zwischenzeitlicher Kälteeinbruch mit unveränderter echter Endtemperatur; reduzierbare Kombination bei steigenden Temperaturen; erst späterer Wind/Regen; lückenhafte, unplausible oder nicht abgedeckte Daten; Temperatur außerhalb Regler-/Modellbereich; gerundete Koordinaten; Standortablehnung, Zeitüberschreitung, fehlende Geolocation und Abbruch; HTTP-/Netzwerk-/JSON-Fehler; Quelle und Prognose im JSON-Rundlauf ohne Koordinaten; manipulierte Importe; unveränderte alte Daten.

## Live- und Browserprüfung

- Zuerst echter Jetzt-Abruf über das produktive Wettermodul für Berlin, 90 Minuten. Aktueller Modellwert und vollständiger Tourzeitraum erfolgreich verarbeitet.
- Danach echter Abruf für den folgenden Tag, 120 Minuten. Kein fälschlich verwendeter aktueller Temperaturwert für den geplanten Start.
- Dieselben beiden Fälle über `tests/weather-browser.html` im Browser live abgerufen: API-Antwort einschließlich Quellenangabe und Abrufzeit erfolgreich; damit auch browserübergreifender HTTPS-Abruf vom lokalen App-Ursprung bestätigt.
- Synthetischen Prognose-Testbestand über die normale JSON-Importoberfläche in einem getrennten lokalen Testspeicher übernommen. Die App zeigt geplantes Datum, 120 Minuten, Start-/Endtemperatur, Wind/Böen, Niederschlag, Wahrscheinlichkeit, Temperaturverlauf und Quellen-/Lizenzlink korrekt an.
- Dauer auf 90 Minuten geändert: Fahrtstart mit veralteter Prognose abgefangen und verständlich auf erforderliche Aktualisierung hingewiesen.
- Eine Temperatur manuell verändert und Empfehlung aktualisiert: automatische Prognosezuordnung entfernt, manuelle Werte bleiben bedienbar. Anschließend Testprognose wiederhergestellt.
- Mobile Ansicht 390 × 844 Pixel visuell geprüft. Danach Startauswahl und Datum für schmale Displays untereinander angeordnet. Auf Wunsch des Nutzers wurden anschließend keine weiteren Bildschirmaufnahmen erstellt; diese letzte Anordnung wurde nicht erneut visuell aufgenommen.
- Alle zwölf zu ladenden Offline-Dateien einschließlich des Wettermoduls vorhanden. Kein erneuter vollständiger Offline-/Server-Ausfalltest dieser Version. API-Antworten werden nicht vom Service Worker gespeichert; die letzte übernommene Prognose liegt in IndexedDB.

## Verbleibende Prüfung

Echte Gerätestandort-Freigabe und GPS auf dem iPhone sowie physische iOS-PWA-/Offline-Prüfung stehen aus. Für Live-Tests wurde ausschließlich ein bewusst eingesetzter öffentlicher Teststandort verwendet; kein privater Gerätestandort abgefragt. Der produktive Standortpfad und seine Fehlerfälle sind automatisiert mit kontrollierter Geolocation geprüft. Kein Routenwetter und keine automatische Hintergrundaktualisierung. Keine Veröffentlichung auf GitHub Pages durch diese Arbeit.

---

# Prüfung · Gravel Outfit 0.10.0

30. Oktober 2026. **132 automatisierte Tests erfolgreich, 0 fehlgeschlagen**; bisherige 108 einschließlich 1497 Lupra-Matrixfällen und 24 neue Zonentests. Ausführen: `node --test tests/*.test.cjs`.

Neue Tests prüfen alle acht Zonen, pauschal Genau richtig, gemischte Bewertungen, nicht bewertete Bereiche, fehlende/ungültige Angaben, entgegengesetzte und begrenzte Lernwerte, Abschalten, Intensitäts-/Temperaturfilter sowie die Beeinflussung jeder Zone ohne Lernänderungen anderer Zonen. Beispiele: kalte Hände ergänzen Handschutz, ohne die Beine wärmer zu bewerten; warmer Oberkörper senkt sein Wärmeziel; kalte Arme ändern die Bedeckungsanforderung unabhängig vom Wärmeziel des Rumpfs; Gesichtsschutz wird ausschließlich aus vorhandenem Bestand genommen. Alte Historien, JSON-Rundlauf, tatsächliche Kleidung, Empfehlung und Wäsche bleiben erhalten. Rote Excel-Ersatzlösungen bleiben rot.

## Browserprüfung dieser Version

- Neue Oberfläche auf getrenntem lokalen Testspeicher geöffnet, reale IndexedDB-Speicherung verwendet.
- Fahrt gestartet: Genau richtig vorausgewählt, Zonenbereich geschlossen. Zu kalt/Zu warm öffnet alle acht Bereiche.
- Kalt ohne betroffene Zone: Speichern abgewiesen, Fahrt bleibt aktiv und Formular bedienbar.
- Hände kalt, Oberkörper warm, Beine passend: jede Zone unabhängig eingestellt. Wechsel der Gesamtbewertung zu Genau richtig und zurück erhält die vorherige Auswahl.
- 390 × 844 Pixel: acht Auswahlfelder, 51 Pixel hohe Zeilen; Dokumentbreite 390 Pixel, kein seitlicher Überlauf. Hell- und Dunkelmodus visuell geprüft und dokumentiert.
- Gemischte Fahrt gespeichert und neu geladen. Historie zeigt Gemischt sowie die drei gespeicherten Einzelbewertungen und die Notiz.
- Lerndiagnose nach Neuladen: Hände ein passender Beitrag / mehr Wärmeschutz, Oberkörper ein Beitrag / weniger Wärmeschutz, Beine ein Beitrag / neutral; nicht bewertete Zonen null Beiträge / neutral.
- Zweite Fahrt mit Genau richtig abgeschlossen, ohne Zonen auswählen zu müssen. JSON-Export aus dem Browser enthält beide Fahrten mit korrekten Einzelwerten; Export mit der tatsächlichen Importvalidierung geprüft. Alle zwölf Kleidungsstücke erhalten.
- Keine JavaScript-Konsolenfehler. Alle elf vorzuladenden Offline-Dateien vorhanden; neue Cache-Version 0.10.0. Kein erneuter Server-Ausfalltest; die bestehende Offline-Speicherarchitektur bleibt erhalten.

Kein physisches iPhone verfügbar; mobile Prüfung im Browser mit iPhone-Abmessungen. Keine Änderung der veröffentlichten Pages-Version durch diese Arbeit. Die folgenden Berichte dokumentieren frühere Versionen.

---

# Nachprüfung · Gravel Outfit 0.9.3

30. Oktober 2026. 108 automatisierte Tests bestanden, 0 fehlgeschlagen. Darunter eine vollständige Matrix mit 1497 Einzelfällen: 1377 konstante Wetterlagen (−10 bis +40 °C in ganzen Schritten × drei Windstufen × drei Regenstufen × drei Intensitäten), 108 Start-/Endverläufe und zwölf Varianten der hinterlegten Winddichtigkeit. Die Matrix wird in `tests/lupra-matrix.test.cjs` dauerhaft ausgeführt. Ein zusätzlicher gezielter Regressionstest prüft alle Temperaturen 6–10 °C mit „Sportlich“.

Vor der Korrektur reproduziert: Bei 6–10 °C, trocken, schwachem Wind und Sportlich wird Lupra trotz fehlendem Bein-Windschutz ausgelassen. Ursache: Komfortvorteil der Atmungsaktivität überwiegt die Bewertung der Windschutzlücke. Nach Korrektur: Mit dem Excel-Testbestand wird RR plus verfügbare winddichte Lupra bei 6–10 °C in allen Intensitätsstufen kombiniert. Rot bewerteter thermischer Ersatz bleibt rot; Schutzwirkung und Atmung bleiben getrennt. Die Excel-Intensitätstabelle wurde nicht verändert.

Weitere Beobachtung: Ist RR bereits als winddicht gespeichert, entfällt der zusätzliche Windschutzbedarf und Lupra kann bei trockenem Wetter bewusst fehlen. Ist Lupra nicht als winddicht gespeichert, trägt sie entsprechend nicht zum bestätigten Windschutz bei. Eigenschaften wurden in keinem Fall automatisch verändert. Das erklärt mögliche Unterschiede zum iPhone-Bestand, ist aber kein Nachweis für die dort tatsächlich gespeicherten Werte.

Kein erneuter Browser-/Hardwaretest für die einzelne Bewertungsänderung durchgeführt; die Darstellung bleibt unverändert. Die Browserprüfungen der vorherigen Versionen sind unten dokumentiert. Hauptbranch/Pages unverändert; Update als separater Änderungsvorschlag und vollständiges ZIP.

---

# Korrekturprüfung · Gravel Outfit 0.9.2

106 automatisierte Tests bestanden, 0 fehlgeschlagen. Acht zusätzliche Regressionstests sichern die getrennte Windanforderung in der Thermostufe, RR/Lupra bei 3 °C und Frost, expliziten Ersatz bei 7 °C trotz roter Quellenabweichung, Ausschluss unverfügbarer/archivierter Lupra, Bevorzugung passender winddichter Thermohosen, warmen Start mit kaltem Ende sowie korrekte eigene Auswahl ab. Fahrtsicherung und JSON bleiben kompatibel.

Im Browser tatsächlich geprüft: Start/Ende 3 °C, schwacher Wind, trocken. RevolutionRace und Lupra werden zusammen gewählt; der sichtbare Bereich „Ersatzkombination für die Beine“ nennt beide Teile als Ersatz für eine winddichte Thermohose. Windschutz ist als im Modell erfüllt ausgewiesen, Wärme als unzureichend. Die rote Excel-Bewertung bleibt sichtbar. Bei 390 × 844 Pixeln kein horizontaler Überlauf (Dokumentbreite 390 Pixel), vollständige Karte bedienbar, Screenshot erstellt. Keine JavaScript-Konsolenfehler. Ein physischer iPhone-Test wurde nicht durchgeführt. Keine Veröffentlichung durch diese Prüfung.

---

# Ergänzungsprüfung · Gravel Outfit 0.9.1

98 automatisierte Tests bestanden (93 bisherige und 5 zusätzliche), 0 fehlgeschlagen. Neue Fälle: eigener Hosenbein-Gepäckeintrag mit Eltern-ID, keine Mitnahme bei konstanten Temperaturen oder langem Start, Ausschluss nicht verfügbarer Hosen, unveränderlicher Fahrt-/JSON-Snapshot sowie Trennung von eigener Auswahl und ursprünglicher Empfehlung.

Browserprüfung 0.9.1: Bei 25 → 7 °C steht „Zip-off-Hosenbeine · RevolutionRace-Hose“ mit gelber „Mitnehmen“-Kennzeichnung in derselben Liste wie Handschuhe. Antippen öffnet die Eigenschaften derselben Hose mit Variante Lang. 390 × 844 Pixel: Dokumentbreite 390 Pixel, kein horizontaler Überlauf. Fahrtstart speichert die Beine separat als zugehörigen Bestandteil; Fahrtabschluss und Neuladen erfolgreich. Keine JavaScript-Konsolenfehler. Screenshots erstellt. Kein physischer iPhone-Test durchgeführt. Datenbankversion und Sicherungsformat unverändert (6 / 7); nur optionale Fahrtfelder ergänzt. Die folgenden Ergebnisse der Version 0.9 bleiben als bisherige Prüfung dokumentiert.

---

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
