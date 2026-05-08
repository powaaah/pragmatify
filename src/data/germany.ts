import type { CountryData } from './us'

export const deData: CountryData = {
  id: 'de',
  name: 'Deutschland',
  flag: '🇩🇪',
  lastUpdated: 'Mai 2026',
  cohorts: [
    {
      id: 'state',
      label: 'Staat',
      icon: '🏛️',
      score: 'yellow',
      metrics: [
        {
          id: 'gdp-growth',
          label: 'BIP-Wachstum',
          value: '0.8',
          unit: '% YoY',
          trend: 'down',
          status: 'yellow',
          detail: 'Stagnation — Strukturkrise in Industrie',
          trendValue: '−0.4pp'
        },
        {
          id: 'debt-gdp',
          label: 'Schuldenquote',
          value: '58',
          unit: '% GDP',
          trend: 'down',
          status: 'green',
          detail: 'Unter Maastricht-Kriterium (60%), aber steigender Druck',
          trendValue: '+1.2pp'
        },
        {
          id: 'deficit',
          label: 'Fiskalsaldo',
          value: '−1.8',
          unit: '% GDP',
          trend: 'down',
          status: 'red',
          detail: 'Verfassungsbremse zunehmend bindend',
          trendValue: '−0.6pp'
        },
        {
          id: 'inflation',
          label: 'Inflation (HVPI)',
          value: '2.1',
          unit: '%',
          trend: 'down',
          status: 'green',
          detail: 'EZB-Zielbereich erreicht',
          trendValue: '−0.8pp'
        },
        {
          id: 'current-account',
          label: 'Leistungsbilanz',
          value: '+1.4',
          unit: '% GDP',
          trend: 'down',
          status: 'green',
          detail: 'Dauerhafte Überschüsse, aber schrumpfend',
          trendValue: '−1.8pp'
        }
      ]
    },
    {
      id: 'labor',
      label: 'Arbeitsmarkt',
      icon: '👷',
      score: 'yellow',
      metrics: [
        {
          id: 'unemployment',
          label: 'Arbeitslosenquote',
          value: '5.8',
          unit: '%',
          trend: 'up',
          status: 'yellow',
          detail: 'Anstieg nach Jahren der Vollbeschäftigung',
          trendValue: '+0.8pp'
        },
        {
          id: 'labor-participation',
          label: 'Erwerbstätigenquote',
          value: '74.2',
          unit: '%',
          trend: 'down',
          status: 'yellow',
          detail: 'Fachkräftemangel trifft Industrie & Mittelstand',
          trendValue: '−0.3pp'
        },
        {
          id: 'wage-growth',
          label: 'Nominallohnwachstum',
          value: '4.3',
          unit: '%',
          trend: 'down',
          status: 'yellow',
          detail: 'Moderation nach Tarifabschlüssen 2024/25',
          trendValue: '−0.9pp'
        },
        {
          id: 'real-wages',
          label: 'Reallohnwachstum',
          value: '2.2',
          unit: '%',
          trend: 'up',
          status: 'green',
          detail: 'Kaufkraft erholt sich langsam',
          trendValue: '+0.4pp'
        }
      ]
    },
    {
      id: 'consumption',
      label: 'Konsum & Verbraucher',
      icon: '🛒',
      score: 'yellow',
      metrics: [
        {
          id: 'retail-sales',
          label: 'Einzelhandelsumsätze',
          value: '−1.2',
          unit: '% MoM',
          trend: 'down',
          status: 'yellow',
          detail: 'Unsicherheit wegen Energiepreise & Geopolitik',
          trendValue: '−2.1pp'
        },
        {
          id: 'consumer-confidence',
          label: 'Verbrauchervertrauen',
          value: '−8.5',
          unit: 'Index',
          trend: 'down',
          status: 'red',
          detail: 'Angst vor Jobverlust & hohe Immobilienpreise',
          trendValue: '−3.2pp'
        },
        {
          id: 'savings-rate',
          label: 'Sparquote',
          value: '11.3',
          unit: '%',
          trend: 'up',
          status: 'green',
          detail: 'Haushalt schaut, wo sie sparen können',
          trendValue: '+1.8pp'
        },
        {
          id: 'housing-prices',
          label: 'Immobilienpreise',
          value: '−3.8',
          unit: '% YoY',
          trend: 'down',
          status: 'yellow',
          detail: 'Korrektur nach Zinsanstieg; Kaufkraft geschwächt',
          trendValue: '−1.4pp'
        }
      ]
    },
    {
      id: 'industry',
      label: 'Industrie & Export',
      icon: '🏭',
      score: 'red',
      metrics: [
        {
          id: 'industrial-production',
          label: 'Industrieproduktion',
          value: '−2.1',
          unit: '% YoY',
          trend: 'down',
          status: 'red',
          detail: 'Autoindustrie & Maschinenbau schwach',
          trendValue: '−1.8pp'
        },
        {
          id: 'exports',
          label: 'Exporte',
          value: '−4.3',
          unit: '% YoY',
          trend: 'down',
          status: 'red',
          detail: 'China-Schwäche & hohe Energiekosten treffen Export',
          trendValue: '−2.6pp'
        },
        {
          id: 'manufacturing-pmi',
          label: 'Verarbeitendes Gewerbe (PMI)',
          value: '42.8',
          unit: 'Index',
          trend: 'down',
          status: 'red',
          detail: 'Unter 50 = Kontraktion; keine Besserung in Sicht',
          trendValue: '−2.3pp'
        },
        {
          id: 'energy-prices',
          label: 'Industriestrompreise',
          value: '0.18',
          unit: '€/kWh',
          trend: 'up',
          status: 'red',
          detail: '3x höher als 2019 — Wettbewerbsvorteil weg',
          trendValue: '+0.02€'
        }
      ]
    }
  ]
}
