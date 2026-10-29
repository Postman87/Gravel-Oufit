# Testbericht · Gravel Outfit 0.7.0

Datum: 29. Oktober 2026. Grundlage: vorhandener lokaler Stand der ausgelieferten Version 0.6; Anwendung fortgeführt, keine Neuentwicklung.

## Automatisierte Prüfungen

38 Tests unter `tests/core.test.cjs`, alle bestanden. Ausführen mit `node --test tests/core.test.cjs`.

Geprüfte Fälle:

1. Migration erhält sämtliche alten Kleidungsfelder, IDs, Status, Archiv, Notizen, Pflege und Fahrten.
2. Wiederholte Migration ist idempotent und bewahrt neue Eigenschaften und Planung.
3. Alle 19 Funktionen besitzen gültige Standardwerte.
4. Längen sind artabhängig; ärmellose Hosen werden abgewiesen.
5. Wasserabweisend und wasserdicht werden getrennt bewertet.
6. Dauerregen bevorzugt wasserdichte vor nur wasserabweisender Jacke.
7. Nur wasserabweisender Schutz erzeugt einen verständlichen Resthinweis.
8. Langer dünner Baselayer wird bei Kälte vor vergleichbaren kurzen oder ärmellosen Modellen gewählt.
9. Länge beeinflusst die Wärme unabhängig vom Namen.
10. Lange Beine werden bei Kälte bevorzugt.
11. Regenjacke ersetzt fehlenden äußeren Windschutz.
12. Auch ein sehr kaltes Temperaturminimum macht die Regenjacke nicht zur Thermojacke.
13. Mehrere einzeln nicht ausreichende Schichten decken zusammen den Wärmebedarf.
14. Geeignete Kombinationen mit weniger Teilen werden bevorzugt.
15. Windweste wird nicht redundant mit Regenjacke kombiniert.
16. Nur eine Basis und ein Trikot; keine Armlinge zusätzlich zu langen darunterliegenden Ärmeln.
17. Kein doppeltes Sitzpolster bzw. zusätzliche Außenhose über gepolsterter Thermohose.
18. Ausschließlich vorhandene verfügbare nicht archivierte Teile werden empfohlen.
19. Wärme, Windschutz, Regenschutz und Atmung sind getrennte Werte.
20. Kurzärmeliger Regenschutz ist bei Dauerregen unvollständig.
21. Anziehreihenfolge folgt Funktion statt Name.
22. Die automatische Empfehlung ist korrekt sortiert.
23. Erstmalige eigene Auswahl wird aus der Empfehlung vorbelegt.
24. Mehrfaches Umschalten erhält Änderungen einschließlich bewusst leerer Auswahl.
25. Mehrere aufeinanderfolgende Auswahländerungen bleiben erhalten.
26. Eigene Auswahl übersteht Wetteränderung und JSON-Rundlauf.
27. Nicht verfügbare Teile können nicht neu ausgewählt werden.
28. Nachträglich nicht verfügbare Teile verhindern stillschweigend abweichenden Fahrtstart.
29. Fahrt speichert tatsächliche manuelle Auswahl und unabhängige Empfehlung getrennt.
30. Empfohlener Fahrtstart nutzt keine alten manuellen IDs.
31. Leerer oder doppelter Fahrtstart wird abgefangen.
32. Aktive Fahrt aus älterem Datenformat kann ohne erfundene Snapshots fortgeführt werden.
33. Datenformat 4 erhält neue Eigenschaften, Planung und Fahrtdaten beim JSON-Rundlauf.
34. Älteres Version-2-Backup bleibt importierbar.
35. Ungültige Version, Temperaturen, IDs, Eigenschaften und Planungsdaten werden abgewiesen.
36. Schichtkombinationen können einzelne Temperaturbereiche unterschreiten, ohne einzeln ausgeschlossen zu werden.
37. Baselayer allein wird als unvollständige äußere Bekleidung gekennzeichnet.
38. Ideale Zielkombination ist unabhängig vom eigenen Bestand und funktional sortiert.

## Im Browser durchgeführt

Lokaler HTTP-Server, Unterpfad `/v07/`, integrierter Browser auf dem Mac:

- Vorhandenen 0.6-Testbestand geöffnet: Kleidungsstück, Pflegehistorie und alte Fahrt übernommen.
- Separaten Datenbankbestand in Version 2 mit zwei Teilen, Archiv, Pflege, abgeschlossener und laufender Fahrt sowie altem `settings`-Store vorbereitet. Version 0.7 geöffnet und Upgrade auf Datenbankversion 3 ausgeführt. Ein unabhängiger Prüflauf bestätigte unveränderte alte Felder, den erhaltenen alten Store und die vollständige unveränderte Migrationskopie.
- Kleidung ergänzt und bearbeitet: lange, kurze und ärmellose Schnitte sowie Wasserabweisung unabhängig von Wasserdichtigkeit.
- Eigene Auswahl bewusst geleert, mehrere Teile ausgewählt, zwischen Ansichten gewechselt und neu geladen. Auswahl blieb erhalten.
- Fahrt aus eigener Auswahl gestartet und neu geladen: tatsächlich gewähltes Baselayer und ursprüngliche automatische Trikot-Empfehlung wurden getrennt angezeigt. Fahrt abgeschlossen und Export inhaltlich validiert; alte Fahrt und Pflegehistorie blieben unverändert.
- Finale Oberfläche mit Temperaturreglern geladen. Bei Wetter und Kleidung mit Home/End beide Extremwerte geprüft: Anzeigen und Gegengrenze passen sich unmittelbar an. Ein Kleidungstemperaturbereich wurde gespeichert und in der Übersicht bestätigt.
- Bei 390 × 844 Pixeln die Oberfläche und Temperaturregler visuell geprüft. Geöffnete Schichttabelle hatte zunächst Seitenüberlauf; nach Korrektur nachgemessen: Seitenbreite 390 Pixel bei 390 Pixel Viewport. Die Tabelle scrollt innerhalb ihres Bereichs.
- Webserver beendet. Finale App konnte aus dem Service-Worker-Cache neu geladen werden. Eigene Auswahl und aktive Fahrt einschließlich getrennter Empfehlung blieben erhalten.
- Temperatur offline von 6 auf 6,5 °C geändert, gespeichert und neu geladen: 6,5 °C weiterhin vorhanden.
- Vollständiges 0.7-JSON offline exportiert, Datenformat validiert und eigene Auswahl, Eigenschaften, Temperaturwert und getrennte Fahrtsnapshots geprüft. Die Sicherung anschließend offline wiederhergestellt und die Planung samt Temperatur bestätigt.

## Reproduzierbarer Migrationstest

Nur in einem neuen lokalen Testursprung verwenden, zum Beispiel nach Start mit `python3 -m http.server 8097` im entpackten Ordner:

1. `http://localhost:8097/tests/migration-fixture.html` öffnen.
2. „0.6-Testdaten anlegen“ anklicken. Auf Bestätigung warten. Die Seite überschreibt keinen vorhandenen Bestand.
3. „Version 0.7 öffnen“ anklicken. Die laufende alte Fahrt und der Bestand müssen erhalten bleiben.
4. Ohne Änderungen zur Testseite zurückkehren und „Migration und Datenerhalt prüfen“ anklicken.
5. Erwartet: Meldung „BESTANDEN“ mit unverändertem Originalzustand und erhaltenem alten Store.

Der Test legt ausschließlich erfundene Daten auf dem separaten Testursprung an. Er ist für das produktive GitHub-Pages-Profil nicht erforderlich.

## Noch auf den Zielgeräten prüfen

Kein Upload oder Deployment im GitHub-Repository ausgeführt. Installation, Service-Worker-Wechsel und echter Flugmodus auf einem physischen iPhone sind noch auf dem Zielgerät zu prüfen. Die mobile Browseransicht ersetzt keinen echten iPhone-Test. Für das Update keine Browserdaten löschen; alte App-Fenster schließen und erneut öffnen.
