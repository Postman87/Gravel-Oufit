# 0.21.6 – Nebel temperaturgerecht bewerten

Luftfeuchtigkeit aus Abruf und Anzeige entfernt. Bereits gespeicherte Wetterwerte bleiben unangetastet. Nebel weiterhin ausschließlich aus gemeldeten Wettercodes 45/48 oder manueller Angabe.

Nebel allein fordert nur bei bis zu 15 °C einen wasserabweisenden Schutz. Oberhalb der vorläufigen Grenze entsteht ein Hinweis, kein zusätzlicher Nässeschutzbedarf. Regen und notwendiger Wind-/Wärmeschutz bleiben unabhängig davon erhalten. Sichtbarkeitsweste bleibt bei Nebel berücksichtigt.

Zeitreihen prüfen Nebel und Temperatur am selben Messzeitpunkt: warmer Nebel plus spätere kühle, klare Stunde wird nicht als kalter Nebel bewertet. Frühere Prognosen ohne vollständige Nebelzeitreihe bleiben kompatibel.

300 automatisierte Tests erfolgreich. Keine Datenbankmigration; keine bestehenden Daten zurückgesetzt.
