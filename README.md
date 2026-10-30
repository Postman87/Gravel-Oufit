# Gravel Outfit 0.17.5

Fortführung der bestehenden Version 0.8 aus `postman87/Gravel-Oufit`: HTML, CSS, Vanilla JavaScript, IndexedDB, offlinefähige PWA für GitHub Pages. Keine Frameworks, kein Build notwendig.

## Kleiderschrankliste und aktueller Standort · 0.17.5

Im Kleiderschrank erscheinen zunächst nur kompakte Zeilen mit Kleidungsname und Verfügbarkeit. Antippen öffnet die Details nach unten. Eigener Temperaturbereich, Schutzeigenschaften, Notizen, Bearbeiten, vollständige Eigenschaften, Archivierung und Pflegehistorie bleiben dort erreichbar. Geöffnete Zeilen bleiben bei Bearbeitung und Pflegeeinträgen offen; Suche und Filter bleiben erhalten. Kleidungsdaten werden durch die neue Darstellung nicht umgeschrieben.

Wetter aktualisieren auf der Startseite bedeutet jetzt ausdrücklich: den aktuellen Gerätestandort erneut bestimmen und dafür Wetter laden, auch nach GPX- oder manueller Planung. Der Standortcache wird für diesen expliziten Abruf nicht verwendet (maximumAge 0). Die gespeicherte GPX bleibt erhalten; Startzeit, Dauer und gegebenenfalls die Hin-/Rückfahrt-/Aufenthaltsplanung bleiben bestehen. Die Quelle wechselt auf Standort. Für Streckenwetter weiterhin Tour planen → GPX-Planung → Speichern verwenden. Bei verweigerter Standortfreigabe oder Netzwerkfehlern bleiben die letzten Wetterwerte erhalten und werden nicht als neuer Abruf ausgegeben.

Der Rückwechsel in der Planung heißt Aktueller Standort. Der zusätzliche untere Manuelles Wetter verwenden-Knopf ist vollständig entfernt; manuelle Eingabe erfolgt über den oberen Einstieg. Der lange Hinweis beim bloßen Öffnen der GPX-Planung entfällt. Erst beim Speichern ohne erforderliche Datei erscheint eine kurze Aufforderung, damit keine ungültige Planung angewendet wird. Die Dateiauswahl erhält einheitlichen Abstand zum davorliegenden Standortknopf und zu weiteren Elementen.

Die folgenden Abschnitte dokumentieren frühere Stände; bei Standortaktualisierung und Kleiderschrank gilt die Beschreibung oben.

## Kompakte Tourplanung und Startseite · 0.17.0

Die Startseite zeigt die Wetterquelle nur noch als Information: Standort, Route (GPX) mit Routenname oder Manuell. Ohne abweichende gespeicherte Planung ist Standort der Ausgangswert; vorhandene Planungen und Quellen werden nicht zurückgesetzt. Wetterdaten und der benutzte gerundete Standort bleiben in aufklappbaren Details prüfbar. Start-/Endtemperatur, ein gegebenenfalls kälterer Zwischenabschnitt, Regen/Wind sowie Startzeit und Dauer stehen kompakt oben. Veraltete oder noch nicht geladene Daten bleiben gekennzeichnet; vorhandene Werte werden nicht als neuer Abruf ausgegeben.

Tour planen öffnet zwei Einstiege: GPX-Planung und Manuelles Wetter. Bei GPX wird eine Datei ausgewählt; Speichern lädt die passende Prognose und führt zur Startseite mit Route (GPX) zurück. Bei Manuell werden die eigenen Werte übernommen. Ein kleiner Wieder Standort verwenden-Knopf ermöglicht den Rückwechsel, ohne die gespeicherte GPX zu löschen. Die Planung fragt nach dem Speichern nicht nach weiteren Angaben.

Startzeit bietet Jetzt / Planen. Bei Planen stehen ein natives Datumsfeld und eine Uhrzeitauswahl in 15-Minuten-Schritten zur Verfügung. Auf unterstützten Browsern wird die Datumswahl direkt geöffnet, sonst durch Antippen des Datums. Unter dem Kalender steht Dauer mit 30 Minuten bis sechs Stunden in 30-Minuten-Schritten. Bestehende Uhrzeiten außerhalb des neuen Rasters werden als bisher gespeichert zusätzlich angeboten, nicht stillschweigend gerundet. Der Tourstart wird weiterhin in Gerätezeit interpretiert. Die GPX ersetzt die ausdrücklich gewählte Dauer nicht; Hin-/Rückfahrt und Aufenthalt bleiben als zusätzliche Planung verfügbar.

Intensität und Kälteempfinden sind kleine, unaufdringliche Dropdowns in der Tourübersicht. Änderungen wirken sofort auf die Empfehlung und lösen keine zusätzliche Abfrage oder automatische Standortabfrage aus.

Reihenfolge auf der Startseite: Tour/Wetter → Anziehen → Mitführen → Einordnung mit verbleibenden Schutzlücken bzw. Ersatzkombinationen → Details → Eigene Auswahl. Lange technische Texte, persönliche Lernwerte, Excel-Orientierung und Diagnosen sind aufklappbar. Kleidungsstücke bleiben antippbar. Ein erkannter Modellrestbedarf wird nicht pauschal als zwingender Neukauf ausgegeben: gespeicherte Eigenschaften und vorhandene Kombinationen sind zuerst zu prüfen. Die eigene Auswahl bleibt beim Umschalten erhalten; der Fahrtstart speichert weiterhin tatsächliche Auswahl und ursprüngliche Empfehlung getrennt.

Speichern schließt die Planung nach dem Wetterabruf bzw. der manuellen Übernahme. Bei einem fehlgeschlagenen automatischen Abruf bleibt die Planung gespeichert, die Übersicht nennt den Fehler und gibt alte Werte nicht als aktuelle Prognose aus. Ohne GPX, gültige Startzeit oder zulässige Dauer wird eine passende Korrektur angefordert. Keine IndexedDB-Migration, kein Zurücksetzen persönlicher Werte oder Erfahrungen.

Die folgenden Abschnitte dokumentieren frühere Entwicklungsstände. Für Anordnung und Bedienung gilt dieser Abschnitt.

## Einzelne Tour löschen · 0.16.1

Unter Outfit → Letzte Fahrten die betreffende abgeschlossene Tour öffnen und Tour löschen wählen. Eine Bestätigung nennt Datum sowie die Entfernung von Bewertung, Wetterdaten und offenem Wetterauftrag. Abbrechen ändert nichts. Nach Bestätigung wird die Tour vollständig aus der lokalen Historie entfernt; das Learning wird ohne diese Erfahrung neu berechnet. Laufende Touren werden nicht gelöscht. Kleidungsstücke, Pflegeeinträge, Verfügbarkeit, Einstellungen und andere Fahrten bleiben erhalten. Eine Löschung setzt auch keine Kleidungsstücke automatisch auf Verfügbar zurück.

Ein laufender Wetterabruf für die Tour wird abgebrochen. Falls dennoch eine verspätete Antwort eintrifft, kann sie die gelöschte Tour nicht wieder anlegen. Die Löschung wird lokal gespeichert und ist auch im nächsten JSON-Export wirksam. Eine vorher erstellte Sicherungsdatei wird nicht verändert; eine Wiederherstellung ist nur über einen entsprechenden Import möglich. Keine Datenbankmigration.

## Aktuelles Verhalten · 0.16.0

### Deine Bereiche und das Learning

Die im Kleiderschrank gespeicherten Unter-/Obergrenzen sind die persönliche Referenz und wirken unmittelbar. Excel bleibt als anfängliche Grobeinteilung und aufklappbare Orientierung erhalten; seine Kategorien bestimmen nicht mehr zwingend ein Kleidungsstück oder eine Temperaturschwelle. Die App aktiviert das neue Modell beim Öffnen, ebenso nach Import alter Sicherungen, ohne Kleidungswerte umzuschreiben. Verfügbarkeit, echte Schichtenfunktionen, Wind-/Nässeschutz und kombinierte Wärme werden getrennt berücksichtigt. Eine Regenjacke wird weiterhin nicht zur Thermojacke. Bei Wärme wird bei vergleichbaren Eigenschaften die kurze Hosenvariante bevorzugt. Die Präferenz für möglichst wenige Kleidungswechsel bleibt bestehen.

Im Editor und unter den Outfitdetails stehen dein Startbereich und die aktuell gelernte Empfehlung getrennt. Das Learning verändert deine eingestellten Werte nicht heimlich. Es berechnet die Anpassung jeweils aus den gespeicherten Erfahrungen neu. Wenn du den Startbereich änderst, bleiben sämtliche Fahrten und Bewertungen erhalten. Der bisherige Korrekturwert wird nicht einfach blind auf die neue Grundlage addiert.

Zusätzlich bleibt der zeitbezogene Körperzonenkomfort für die Wärme-/Bedeckungsbewertung aktiv, auch wenn eine Einzelgrenze noch nicht angepasst werden kann.

Die letzten bis zu 30 zum Kleidungsstück passenden Erfahrungen werden herangezogen: tatsächlich getragen, passende Körperzone, bewerteter Abschnitt, gleiche Intensität sowie vergleichbare Wind-/Regenklassen. Verfügbare Sonneneinstrahlung und Bewölkung trennen unterschiedliche Wettersituationen. Mehrere Kleidungsstücke derselben Zone teilen die Evidenz; ein einziges Teil wird nicht automatisch allein verantwortlich gemacht. Mitgenommene, nicht bestätigte Kleidung wird ausgeschlossen.

Nachträglich ergänzte Wetterdaten zählen mit Gewicht 1, die ursprüngliche Prognose mit 0,5, manuelle Angaben mit 0,25. Ab 1,5 gewichteten übereinstimmenden Erfahrungen kann eine Grenze einen ganzen Grad wandern; maximal drei Grad von deiner aktuellen Grundlage. Wiederholt zu warm nahe der oberen Grenze kann diese beispielsweise von 15 auf 14 °C senken. Wiederholt zu kalt nahe der unteren Grenze kann sie anheben: Das Teil reicht dort offenbar nicht aus und soll nicht einfach für noch kältere Bedingungen als ausreichend gelten. Neuere passende Genau-richtig-Bewertungen begrenzen widersprechende Anpassungen. Die Zahlen sind konservative Modellwerte, keine physiologischen Messwerte. Deaktivieren des Learnings verwendet deine Grundlage unverändert, ohne Historie zu löschen.

### Touren nachtragen und Wetter automatisch ergänzen

Unter Outfit → Letzte Fahrten → Tour nachtragen: Ort suchen und eindeutigen Treffer auswählen oder GPX verwenden, vergangene Startzeit, tatsächliche Dauer, Intensität, wirklich getragene Kleidung/Tragevarianten und Bewertung eingeben. Start/Ende/Gesamte Tour und unabhängige Körperzonen bleiben verfügbar. Der tatsächliche Kleidungsbestand darf auch heute in Wäsche, nicht verfügbar oder archiviert sein. Die Tour wird sofort lokal gespeichert; bis zum Wetterabruf werden keine erfundenen Temperaturen zum Lernen verwendet.

Die nachträgliche Dauer kann minutengenau bis 36 Stunden angegeben werden; die bisherige Vorabplanung bleibt bei 30 Minuten bis sechs Stunden je Fahrt. Für nachgetragene Hin-/Rückfahrten wird die verbleibende Fahrzeit nach Abzug des gewählten Aufenthalts gleich auf Hin- und Rückweg verteilt. Bei vorab geplanten Touren werden die geplanten Zeitverhältnisse auf den tatsächlichen Zeitraum abgebildet. GPX und gleichmäßiges Tempo sind Annahmen, keine aufgezeichnete tatsächliche Bewegung. Für eine genaue Wiedergabe ungeplanter Stopps oder Umwege fehlt weiterhin ein aufgezeichneter Track.

Auch nach regulärem Tourende wird ein Wetterauftrag angelegt. Beim Beenden bestätigst du die getragenen Teile und gegebenenfalls Start/Ende/Gesamte Tour je Teil. Fehlt ein Ort, fragt die App danach; sie verwendet nicht stillschweigend deinen jetzigen Standort. Frühere Touren mit eindeutig gespeichertem Gerätestandort erhalten einen Auftrag. Bei alten Routentouren ohne gespeicherte Geometrie wird ein Ort benötigt; die heute geladene GPX wird nicht ungefragt einer alten Tour zugeordnet.

Wetteraufträge starten automatisch beim Öffnen, nach dem Speichern, bei Rückkehr zur App und wiederhergestellter Verbindung. Fehlgeschlagene Abfragen werden gespeichert und mit Wartezeiten erneut versucht. Kleine Pakete von höchstens fünf Touren und Wartezeit zwischen Paketen begrenzen die Abrufe; in unterstützten Browsern verhindert eine gemeinsame Sperre parallele Abgleiche. Die App muss dafür geöffnet und online sein. Eine vollständig geschlossene iPhone-PWA kann nicht zuverlässig selbst aufwachen. Die Erfassung und bisherige Daten bleiben offline nutzbar; eine neue Ortssuche benötigt Internet. Bekannte GPX-Strecken können offline erfasst werden.

### Quelle, Datenschutz und Genauigkeit

Open-Meteo liefert Temperatur, Wind, Regen, Bewölkung und kurzwellige Sonneneinstrahlung. Für die letzten Tage wird die Forecast API mit vergangenen Tagen verwendet (archiviertes Modellwetter), ab sieben Tagen die Historical Weather API mit ERA5-Reanalyse. Das sind Modellwerte bzw. Reanalysen, keine exakten Messungen am Fahrrad oder Gewissheit über Schatten auf der Strecke. Die App behauptet daher keine sichere Ursache für dein Wärmeempfinden. Quelle, Datenart und Abrufzeit werden angezeigt. Die ursprüngliche Prognose bleibt getrennt von der nachträglichen Ergänzung erhalten.

Es werden ausgewählte Ortsnamen zur Open-Meteo-Ortssuche und auf zwei Dezimalstellen gerundete Koordinaten zur Wetterabfrage übertragen. GPX-Dateien, Kleidungsstücke, Notizen und Bewertungen werden nicht an den Wetteranbieter gesendet. Bei GPX werden bis zu acht räumliche Stützpunkte verwendet; Rückweg und Aufenthalt werden zeitlich zusätzlich abgebildet. Touren und Wetteraufträge bleiben lokal und sind in der JSON-Sicherung enthalten. Die IndexedDB-Version bleibt 6, das bisherige Datenschema 7; neue Felder sind optional und validiert.

Quellen: [Forecast API](https://open-meteo.com/en/docs), [Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api), [Ortssuche](https://open-meteo.com/en/docs/geocoding-api), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [beschränkte Hintergrundsynchronisierung](https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API).

## Frühere Versionsnotizen

Die folgenden Abschnitte beschreiben frühere Entwicklungsstände. Für Temperaturprioritäten und Learning gilt der aktuelle Abschnitt oben.

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

## Bewertung nach Zeitraum · 0.13.1

Bei Zu warm / Zu kalt ist der Zeitraum verpflichtend: Am Start, Am Ende oder Gesamte Tour. Start/Ende bedeuten erste/letzte bis zu 30 Minuten, bei kurzen Touren höchstens eine Hälfte. Der Zeitraum gilt für die ausgewählten Körperzonen. Genau richtig bestätigt die gesamte Tour. Zeitpunkt, Temperaturspanne und Datenbasis erscheinen in der Historie.

Für das Learning wird aus dem gespeicherten Prognoseverlauf die zeitgewichtete Durchschnittstemperatur des bewerteten Abschnitts berechnet; Zwischenkälte fließt somit nur bei zeitlicher Überlappung ein. Startbewertungen beeinflussen nur Start-, Endbewertungen nur Endempfehlungen, Gesamtbewertungen beide. Neue Bewertungen werden außerdem nach vergleichbarer Wind-/Regenklasse gefiltert. GPX-Verlauf liefert punktbezogene Wind-/Regenwerte; bei reinen Standortprognosen stehen nur Start- und Gesamtwerte zur Verfügung, die spätere Einordnung bleibt entsprechend konservativ. Ohne Prognose gelten manuelle Start-/Endwerte; für die gesamte Tour deren Mittelwert und Spannweite. Es sind Prognosen, keine gemessenen Bedingungen. Die tatsächliche Pause und das tatsächliche Tempo können abweichen.

Alle neuen Felder sind optional. Alte Bewertungen werden weder umgeschrieben noch gelöscht und behalten ihre bisherige Lernwirkung. Die Optimierung auf möglichst durchgehend getragene Kleidung ist ab Version 0.14.0 umgesetzt.

## Möglichst ohne Kleidungswechsel · 0.14.0

Nach der bisherigen Start-/Später-Planung prüft die App für Oberkörper und Beine durchgehend tragbare Alternativen. Sie bevorzugt eine gemeinsame Kombination, wenn deren Schutzlücken weder am Start noch später größer sind, sie legal geschichtet ist und am wärmsten prognostizierten Abschnitt nur mäßige zusätzliche Wärme verursacht. Kleidungswechsel, Mitnahme und Zip-off-Umstellungen erhalten ein zusätzliches Modellgewicht. Die Excel-Kategorien bleiben fachliche Ausgangswerte und Diagnose; ihre Stufensprünge erzwingen bei dieser Komfortentscheidung keinen Wechsel. Rote Ersatzbewertungen werden nicht aufgewertet.

Modellgrenzen: maximal 0,9 zusätzliche Wärme-Modellpunkte und sechs zusätzliche physische Kostenpunkte gegenüber dem bisherigen Outfit am wärmsten Abschnitt. Übergangskosten betragen fünf Punkte je zusätzlichem/abgelegtem Teil oder Variantenwechsel. Neue Schutzhosen/-jacken werden bei zunehmendem Regen/Wind oder gefühlten Temperaturen über 14 °C nicht allein zur Wechselvermeidung vorgezogen. Das sind abstimmbare Modellwerte, keine physiologischen Messgrößen.

Extras werden je Körperzone geprüft. Später nötige Teile können sofort getragen werden, wenn die gefühlte Höchsttemperatur höchstens drei Grad über der jeweiligen Modell-Komfortgrenze liegt, die Wärmedifferenz begrenzt ist und kein erst später einsetzender Wind/Regen die Ursache ist. Diese Komfortgrenze bezieht sich auf die jeweilige Zone, nicht auf einen pauschalen Unterschied zwischen Start und Ende. Explizite Keine-Auswahl bleibt erhalten.

Beispiel mit unverändertem Excel-Bestand, trocken und wenig Wind: 12 → 10 °C ergibt eine gemeinsame Kombination ohne zusätzliche Mitnahme oder Zip-off-Umstellung; 12 → 9 °C löst ebenfalls nicht pauschal Gepäck aus. Bei 18 → 7 °C bzw. 25 → 7 °C bleiben Ergänzungen vorgesehen. Wind-/Regenschutz und fehlende Ausstattung bleiben separat sichtbar. Die endgültige Auswahl hängt vom eigenen aktiven Bestand und dem persönlichen Learning ab.

Lernen bleibt aktiv: zeitbezogene Rückmeldungen ändern weiterhin Wärmebedarf und Komfort je Körperzone. Eine Startbewertung Zu warm kann eine zuvor akzeptierte Zusatzwärme künftig weniger passend machen. Die Präferenz, Wechsel zu vermeiden, bleibt dabei bestehen. Prognoseminimum und -maximum werden berücksichtigt; individuelle Auskühlung während eines Aufenthalts ist weiterhin nicht modelliert. Eigene Auswahl wird nicht automatisch umgestellt.

## Wetter selbst eingeben · 0.14.1

In der Tourübersicht öffnet „Wetter selbst eingeben“ direkt die Planungsansicht mit den manuellen Wetterfeldern. Start-/Endtemperaturen über die vorhandenen Ganzgradregler, Wind und Niederschlag selbst wählen und „Manuelle Wetterwerte übernehmen“ antippen. Für Wind/Regen die stärksten erwarteten Bedingungen wählen. Die Empfehlung wird aktualisiert und die Outfitübersicht wieder geöffnet. Funktioniert auch offline, ohne Standortfreigabe und mit gespeicherter GPX-Strecke.

Nach einem fehlgeschlagenen automatischen Abruf erscheint zusätzlich „Wetter stattdessen selbst eingeben“. Bis zur bewussten Übernahme bleiben die gespeicherten Wetterwerte erhalten. Beim Übernehmen wird eine bisherige automatische Prognose ausdrücklich abgelöst, selbst wenn dieselben Temperaturen gewählt werden. Die Wetterquelle lautet danach Eigene Eingabe. Kein erfundener Zwischenverlauf oder Standortbezug. Zeitbezogenes Learning verwendet dann die gespeicherten manuellen Werte.

Die Tourplanung muss weiterhin eine gültige Zeit und Fahrtdauer enthalten; GPX, Kleidung, Intensität und Einstellungen bleiben erhalten. Zurück zum Outfit ohne Übernahme speichert keine manuellen Änderungen. Ein späterer erfolgreicher Wetterabruf kann wieder auf automatische Daten umstellen.

## Baselayer nach niedrigster Tourtemperatur · 0.14.2

Der Baselayer wird einmal für die gesamte Tour ausgewählt und von Anfang an getragen. Grundlage ist das Minimum aus Start-, End- und gespeicherter Prognose-Minimaltemperatur. Die Excel-Kategorie 6–10 °C verlangt mindestens Kurzarm; vorhandener Kurzarm wird vor Langarm gewählt, ärmellos nicht als gleichwertig gerechnet. Im Kältebereich wird eine verfügbare Thermo-Langarm-Basis bevorzugt. Wärmere Bereiche behalten ihre leichte bzw. ärmellose Basis. Intensität und persönliches Learning beeinflussen weiterhin Wärme und Schichten; sie stufen die vorgegebene Mindestbedeckung nicht auf ärmellos zurück.

Vorhandene Alternativen bleiben erlaubt: Langarm als Ersatz für Kurzarm; bei fehlender Thermobasis lange nichtthermische Basis; unbekannte Ärmel oder ärmellos nur als gekennzeichnet eingeschränkter Ersatz. Die Daten werden nicht automatisch ergänzt. Ist die Länge nicht hinterlegt, muss sie im Kleiderschrank geprüft werden. Ein Midlayer oder eine Weste ersetzt diese Mindestanforderung an die Basis nicht. Keine zweite Basis zum späteren Wechseln im Gepäck, keine Änderung der eigenen manuellen Auswahl.

## Wetterquelle ausdrücklich wählen · 0.15.0

In der kompakten Tourübersicht und in der Planung steht eine gespeicherte Auswahl Standort / Route / Manuell. Standort verwendet Geolocation auch bei geladener GPX. Route verwendet die vorhandene GPX und fragt keinen Gerätestandort ab. Manuell öffnet die eigenen Wetterwerte ohne Wetter-/Standortabfrage. Bei fehlender Route wird zur GPX-Auswahl aufgefordert. Nach einem Import wird Route ausgewählt; die anderen Quellen lassen die GPX und deren Eigenschaften unverändert gespeichert.

Der Quellenwechsel allein startet keinen Abruf und überschreibt keine Wetterwerte. Bisherige Prognosen werden als nicht passend markiert und dürfen bis zur Aktualisierung bzw. bewussten manuellen Übernahme nicht als passende Wetterdaten für einen Fahrtstart verwendet werden. Nach manueller Übernahme lautet die Quelle Eigene Eingabe. Standort und Route werden erst über Wetter aktualisieren geladen. Die Auswahl überlebt Neuladen, Darstellungswechsel und JSON-Export/Import. Alte Planungen werden anhand ihrer bisherigen Prognose bzw. gespeicherten Route vorbelegt, ohne Umschreibung.

Die Tourplanung ist unabhängig von der Wetterquelle: Eine gespeicherte GPX mit Hin-/Rückfahrt und Aufenthalt liefert weiter die vollständige Zeitspanne. Bei Standortwetter wird diese ganze Zeitspanne ausschließlich am Gerätestandort abgefragt, die Route liefert keine anderen Wetterorte. Hierzu dient ein optionales journey-Feld in der Prognose; die Fahrzeit bleibt ohne Aufenthalt gespeichert. Bei Route dagegen werden weiterhin Wetterstützpunkte entlang der Strecke abgefragt. Beim Wechsel auf Manuell bleibt die Zeitplanung ebenfalls erhalten; es gibt keine automatische Prognose.

Die IndexedDB-Version bleibt unverändert. Neue optionale Felder werden validiert; alte Sicherungen bleiben lesbar. Keine neuen Frameworks, kein automatisches Veröffentlichen.

## Konsistenter Update-Stand und Baselayer-Prüfung · 0.15.1

Der gemeldete Fall Pro-Function / Dünnes Baselayer / Kurzarm / verfügbar / 0–10 °C wird mit Tourstart 11 °C und Tourende 8 °C reproduziert. Die aktuelle Berechnung wählt Pro-Function. Die tatsächliche Abweichung auf dem iPhone ließ sich ohne dessen gespeicherten Gesamtzustand und Laufzeitdateien nicht nachweisen. Eine mögliche Ursache ist jedoch im bisherigen Updateverfahren nachweisbar: Navigation lud neue HTML aus dem Netzwerk, während Skripte noch aus einem älteren Offline-Cache stammen konnten. Die HTML-Versionsanzeige allein garantierte deshalb keinen aktuellen Berechnungsstand.

Ab jetzt tragen Skripte und Styles eine feste Versionskennung in der URL; dieselben URLs werden offline vorgeladen. Der Service Worker lädt Navigation aus seinem installierten Cache und Dateien aus genau diesem Versionscache. App und Bekleidungslogik prüfen zusätzlich ihre Versionskennung; bei Abweichung erscheint ein konkreter Updatehinweis statt normal weiterzurechnen. Alte Daten oder IndexedDB-Speicher werden nicht gelöscht.

Nach dem Übernehmen der Dateien alle Gravel-Outfit-Tabs und die installierte App schließen und einmal mit Internetverbindung erneut öffnen, damit ein wartender Service Worker aktiviert wird. Nicht Browserdaten oder Website-Speicher löschen. Eine neue Version wird bei geöffneten älteren Fenstern gegebenenfalls erst nach deren Schließen aktiv.

Unter der Empfehlung ist Baselayer-Auswahl prüfen aufklappbar: tatsächlicher Berechnungsstand, Temperaturminimum, Anforderung, automatisch gewähltes Teil und gespeicherte Längen/Verfügbarkeit aller Basisschichten. Dies unterscheidet gespeicherte Daten, Ersatzlösung und Eigene Auswahl. Die automatische Auswahl überschreibt keine manuell zusammengestellte Kombination. Die Regel des Baselayer-Minimums selbst wird nicht abgeschwächt oder durch Namenserkennung ersetzt.

## Zip-off-Prüfung 0.17.5
Ärmel und Hosenbeine werden anhand der Art unterschieden. Bei warmem Start wird die kurze Variante nicht allein zur Vermeidung eines späteren Zip-off-Wechsels durch die lange verdrängt. Versionswechsel aktualisiert den Offline-Stand. Keine Änderung am Datenbankschema.

## Bezeichnung
Das Modell ersetzt das separate Namensfeld und ist beim Anlegen erforderlich. Alte Bezeichnungen ohne Modell werden automatisch übernommen.

## Surfblue und Schwarz (0.17.5)
Farbgebung visuell angelehnt an https://www.cube.eu/de-en/cube-nuroad-c-62-ex-surfblue-n-black/1136300 . Annäherung, keine offizielle CUBE-Farbdefinition: Surfblue #82adbb, Anthrazit #111719. Angepasste Hell-/Dunkelansichten, Regler, Schaltflächen und App-Icons. Semantische Grün-/Gelb-/Rotanzeigen bleiben getrennt.

## Alltagstest 0.17.5
Ausgewähltes helles Icon B integriert: schwarzes Gravelrad auf Surfblue. Apple-Touch-Icon 180 px, PWA-Icons 192 und 512 px; alle offline enthalten. Hinweise in ALLTAGSTEST.md.
