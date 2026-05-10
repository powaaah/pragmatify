# Pragmatify KPI- & UX-Review (2026-05-10)

## Ergebnis in 30 Sekunden
- **KPI-Logik:** Gute Struktur mit 4 Kohorten pro Land, aber aktuell teils inkonsistente Semantik (Trend vs. Status) und uneinheitliche Beschriftung.
- **Haupt-Risiko:** Im Modal werden **synthetische Zeitreihen** gezeigt; das kann als echte Historie fehlinterpretiert werden.
- **UX:** Grundsätzlich klar und schnell erfassbar. Größte Hebel: bessere Transparenz bei Datenqualität, mobile Lesbarkeit, und klare Handlungs-Priorisierung pro Kohorte.

---

## KPI-Review (Data-Analyst-Sicht VWL/BWL)

### 1) Kritischer Punkt: synthetische Zeitreihe im KPI-Modal
- Aktueller Zustand: `makeSeries()` modelliert Daten künstlich.
- Risiko: Vertrauensverlust, falls Nutzer „echte Historie“ erwartet.
- Empfehlung:
  1. Kurzfristig: klarer Badge „**Demo/Modellierte Serie**“ direkt über dem Chart.
  2. Mittelfristig: echte Historie pro KPI hinterlegen (mind. 24 Monatswerte).

### 2) Status-/Trend-Konsistenz schärfen
- Beobachtung: einzelne KPIs zeigen `trend: down` bei gleichzeitig „gutem“ Status, was ohne Kontext irritiert.
- Empfehlung: je KPI klar definieren:
  - „**Wunschrichtung**“ (up/down neutral)
  - Schwellenwerte für grün/gelb/rot

### 3) KPI-Beschriftungen vereinheitlichen
- Gemischt `%`, `% YoY`, `% MoM`, `Index`, Währungsangaben.
- Empfehlung: einheitliche Notation + Legende pro Land.

### 4) Entscheidungslogik robuster machen
- Aktuell: Overall-Score über einfache Zählung rot/gelb.
- Empfehlung: gewichtete Kohorten (z. B. Staat 25%, Arbeitsmarkt 25%, Konsum 25%, Industrie 25% oder länderspezifisch).

---

## UX-Review + direkte Verbesserungen

### Positiv
- Gute visuelle Hierarchie (Land > Gesamtstatus > Kohorten > KPI-Karten)
- Schnelle Interaktion durch modales Drilldown
- Saubere Dark/Light-Führung

### Priorisierte UX-Fixes
1. **Datenqualität sichtbar machen** (Live/Snapshot/Demo klar trennen)
2. **Kohorten-Handlung pro Sektion** (1 Zeile „Was jetzt tun?“)
3. **Mobile Lesbarkeit**: KPI-Value und Trend-Delta etwas größer/kontrastreicher
4. **Methodik-Link prominenter** (nicht nur Footer)
5. **Leere/Fehlerzustände** bei Live-Daten verständlicher formulieren

---

## Nächste Umsetzung (empfohlen, in Reihenfolge)
1. Echte Zeitreihen statt synthetischer Kurven
2. KPI-Metadaten-Modell erweitern (`preferredDirection`, `thresholds`, `confidence`)
3. Overall-Score auf gewichtetes Modell umstellen
4. Pro Kohorte „Action Card“ ergänzen

---

## Sofort-Fazit
Pragmatify ist als Produktgerüst gut. Für Glaubwürdigkeit und Investor-/Entscheider-Tauglichkeit ist der größte Hebel jetzt: **echte Zeitreihen + klare Bewertungslogik**.