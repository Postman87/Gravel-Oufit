# Testbericht · Gravel Outfit 0.8.0

29. Oktober 2026. Fortgeführter Projektstand 0.7.1, keine Neuentwicklung.

## Ergebnis

69 automatisierte Tests bestanden, keine fehlgeschlagen. Ausführen mit `node --test tests/core.test.cjs`; keine Zusatzpakete erforderlich.

## Angeforderte Situationen

| Situation | Geprüftes Ergebnis |
|---|---|
| Start 11 °C, Ende 7 °C | Startkleidung anhand 11 °C; zusätzliche verfügbare Schutzschichten im Gepäck; konkrete Endkombination und nötige Ersatz-/Ablegehinweise. Keine Doppelnutzung derselben ID. |
| Start 7 °C, Ende 11 °C | Startkleidung für kühlen Beginn; geeignete Teile können am Ende entfallen; Restkombination bleibt strukturell tragbar. |
| Konstant 25 °C, kurze RevolutionRace vorhanden | Kurze statt vergleichbarer langer Variante. Gepolsterte Unterhose bleibt unter einer echten Außenhose. Keine unnötige Regenhose oder pauschal mitgenommene Windweste. |
| 25 °C mit ausschließlich warmen Ziener-Handschuhen | Keine automatische Handschuhempfehlung; Start und Ende ausdrücklich „Keine Handschuhe“. |
| Kaltes Wetter ohne verfügbare Thermokleidung | Verfügbare Basis-, Trikot- und äußere Windschutzschichten werden geprüft und kombiniert. Verbleibende Isolierungslücken werden erst danach benannt. |
| Kalt mit Basis, Trikot und Lupra | Alle drei funktional genutzt, Windschutz getrennt von Isolierung. Regenjacke wird nicht als Thermokleidung gewertet. |
| Ein Teil vorübergehend nicht verfügbar | Kein Auftauchen beim Start, im Gepäck oder in der Endkombination. |

Die Testbestände enthalten reale Testobjekte für erforderliche Grundkleidung. Falls der Bestand physisch kein vollständiges Outfit zulässt, wird das ausdrücklich als Grenze behandelt statt Kleidung zu erfinden.

## Weitere automatisierte Prüfungen

- Fallende Temperaturen sind zulässig; sie werden nicht sortiert oder automatisch angeglichen.
- Aus Startteilen minus Ablegehinweisen plus Gepäck ergibt sich exakt die diagnostizierte Endkombination.
- Jede Kleidungs-ID erscheint höchstens einmal in Anziehen und Mitnehmen zusammen.
- Schutzlücken am Ende werden konkret dem Tourende zugeordnet.
- Hände, Kopf, Hals, Arme und Füße dürfen bei Wärme ohne zusätzliche Teile bleiben.
- Ausdrückliche „Keine …“-Entscheidungen bleiben erhalten, mit Hinweis auf fehlenden Schutz bei Kälte.
- Alle verfügbaren Profile werden berücksichtigt, einschließlich später angelegter kurzer Hosen.
- Normale lange Hosen liefern begrenzten Windschutz, ohne dass ihr gespeichertes Merkmal „Winddicht“ verändert wird; bei mäßigem Wind keine unnötige zusätzliche Regenhose.
- „Ideale Zielausrüstung“ spiegelt dieselben temperaturabhängigen Wind-Modellziele wider wie die Kombinationsbewertung.
- Fahrt speichert Start, Gepäck, Endzustand und ursprüngliche Empfehlung getrennt.
- JSON-Rundlauf und Migration erhalten Einstellungen, Kleidungsstücke, Eigenschaften, Pflege, Archiv, historische und laufende Fahrten sowie manuelle Auswahl.
- Alte Dezimalwerte bleiben erhalten; ganze Grad sind die Anzeige und die neue Regler-Schrittweite.
- Fortgeführte Regressionstests: sinnvolle Längen, Schichtreihenfolge, getrennte Wasserabweisung/Wasserdichtigkeit, Wärme aus mehreren Schichten, Ausschluss von Wäsche und Archiv, keine erfundenen Artikel und kein automatischer Start nur mit Unterwäsche.

## Im Browser geprüft

Integrierter Browser auf dem Mac, lokale Testursprünge mit Unterpfad `/v08/`:

1. Testbestand aus 0.7.1 mit 21 Kleidungsstücken, bestehender Notiz, Pflegehistorie, manueller Auswahl, historischer Fahrt und zusätzlichem alten Settings-Store migriert. Unabhängiger Prüflauf bestätigte unveränderte bestehende Daten und Einstellungen sowie eine unveränderte Migrationskopie. Neue Start-/Endfelder wurden ergänzt.
2. Endregler von 13 auf 7 °C gesetzt, während der Start bei 11 °C blieb. Nach Speichern zeigte die App 11 → 7 und getrennte Listen für Anziehen und Mitnehmen.
3. Anschließend 7 → 11 eingestellt: Ablegehinweise erschienen. Beide Diagnosebereiche geöffnet; getrennte Start-/Endwerte einschließlich numerischer Ziele sichtbar.
4. Nach Verfeinerung der Hosenbewertung wurde die abkühlende Tour erneut mit der aktualisierten Fassung geladen: keine pauschale Regenhose bei mäßigem Wind.
5. Beide Temperaturen auf 25 °C gesetzt. Die andere kurze Außenhose und die leichten Handschuhe im Testbestand als nicht verfügbar markiert. Verfügbare warme Ziener-Handschuhe wurden trotzdem nicht ausgewählt; die kurze RevolutionRace-Hose wurde empfohlen. Optionale Körperzonen zeigten jeweils „Keine …“ für Start und Ende.
6. „Keine Handschuhe“ ausdrücklich eingestellt und neu geladen: Einstellung blieb gespeichert. Zwischen eigener und empfohlener Auswahl gewechselt.
7. JSON exportiert und inhaltlich validiert: alle 21 Kleidungsstücke einschließlich historischer Fahrt vorhanden, Start/Ende 25/25 und Handschuh-Einstellung gespeichert.
8. Lokalen Webserver beendet. App neu geladen: Service-Worker-Cache verfügbar, Status „Server nicht erreichbar · lokal nutzbar“.
9. Version-0.8-Sicherung ohne erreichbaren Server importiert. Wiederherstellung erfolgreich. Fahrt offline gestartet, neu geladen und beendet. Tatsächliche Startkleidung und ursprüngliche Empfehlung waren getrennt erhalten.
10. Mobile Ansicht mit beiden geöffneten Diagnosebereichen: bei 390 × 844 Pixeln exakt 390 Pixel Dokumentbreite, kein Seitenüberlauf. Mac-Ansicht bei 1280 × 900 ebenfalls ohne Seitenüberlauf.

## Reproduzierbarer Migrationstest

Auf einem neuen, isolierten lokalen Testport im entpackten Ordner starten, z. B. `python3 -m http.server 8099`.

1. `http://localhost:8099/tests/migration-fixture.html` öffnen.
2. „0.7.1-Testbestand anlegen“ wählen und auf „BEREIT“ warten.
3. „Version 0.8 öffnen“ wählen.
4. Vor weiteren Änderungen zur Testseite zurückkehren, „Datenerhalt prüfen“ wählen.
5. Erwartet: „BESTANDEN“ mit unveränderten vorhandenen Daten und Migrationskopie.

Der Test überschreibt keinen vorhandenen Datenstand. Auf dem produktiven GitHub-Pages-Profil ist er nicht erforderlich.

## Grenzen der Prüfung

Kein Upload und kein Deployment im bestehenden GitHub-Repository ausgeführt. Installation, Service-Worker-Wechsel und echter Flugmodus auf einem physischen iPhone stehen auf dem Zielgerät noch aus. Browserdaten beim Update nicht löschen; alte App-Fenster schließen und neu öffnen.

Die Schichtwerte bleiben ein regelbasiertes Modell. Die Suche berücksichtigt alle verfügbaren Profile, begrenzt aber bei großen Kombinationsräumen die Anzahl gleichzeitig verfolgter Kombinationen. Eine mathematisch globale Optimierung beliebig großer Bestände oder gemessene Materialleistung wird nicht zugesichert.
