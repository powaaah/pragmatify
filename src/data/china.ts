import type { CountryData } from './us'

export const cnData: CountryData = {
  id: 'cn',
  name: 'China',
  flag: '🇨🇳',
  lastUpdated: 'Mai 2026',
  cohorts: [
    {
      id: 'state',
      label: 'Staat & Wirtschaft',
      icon: '🏛️',
      score: 'yellow',
      metrics: [
        {
          id: 'gdp-growth',
          label: 'BIP-Wachstum',
          value: '4.2',
          unit: '% YoY',
          trend: 'down',
          status: 'yellow',
          detail: 'Unter Zielwert 5%; Strukturumbruch zum Konsum',
          trendValue: '−2.1pp'
        },
        {
          id: 'debt-gdp',
          label: 'Schuldenquote (breit)',
          value: '280',
          unit: '% GDP',
          trend: 'up',
          status: 'red',
          detail: 'Höchste Staatsschulden; lokale Regierungen in Krise',
          trendValue: '+12pp'
        },
        {
          id: 'local-govt-debt',
          label: 'Lokale Regierungen Schulden',
          value: '~8.5T',
          unit: 'CNY',
          trend: 'up',
          status: 'red',
          detail: 'Versteckte Schulden durch quasi-state entities',
          trendValue: '+15%'
        },
        {
          id: 'cpi',
          label: 'Inflation (CPI)',
          value: '0.8',
          unit: '%',
          trend: 'flat',
          status: 'green',
          detail: 'Nahe Deflation; Demand-Problem, kein Supply-Problem',
          trendValue: '±0.1pp'
        },
        {
          id: 'ppi',
          label: 'Producer Price Index',
          value: '−2.3',
          unit: '%',
          trend: 'down',
          status: 'red',
          detail: 'Deflation in Produktion — Überkapazität überall',
          trendValue: '−0.8pp'
        }
      ]
    },
    {
      id: 'real-estate',
      label: 'Immobilien & Verschuldung',
      icon: '🏢',
      score: 'red',
      metrics: [
        {
          id: 'property-sales',
          label: 'Immobilienverkäufe',
          value: '−28',
          unit: '% YoY',
          trend: 'down',
          status: 'red',
          detail: 'Crash nach Evergrande-Krise; Vertrauen weg',
          trendValue: '−12pp'
        },
        {
          id: 'property-prices',
          label: 'Häuserpreise (neu)',
          value: '−15.2',
          unit: '% YoY',
          trend: 'down',
          status: 'red',
          detail: 'Freier Fall in 2. Tier Cities; keine Boden in Sicht',
          trendValue: '−6.8pp'
        },
        {
          id: 'property-starts',
          label: 'Neubaustarts',
          value: '−42',
          unit: '% YoY',
          trend: 'down',
          status: 'red',
          detail: 'Entwickler insolvent; Banken stoppen Finanzierung',
          trendValue: '−18pp'
        },
        {
          id: 'vacancy-rate',
          label: 'Leerstandsquote (Wohnungen)',
          value: '~21',
          unit: '%',
          trend: 'up',
          status: 'red',
          detail: 'Massenhafte Wohnungen unbewohnt; Asset-Bubble platzt',
          trendValue: '+8pp'
        }
      ]
    },
    {
      id: 'external',
      label: 'Außenwirtschaft & Währung',
      icon: '🌍',
      score: 'yellow',
      metrics: [
        {
          id: 'exports',
          label: 'Exporte',
          value: '+2.8',
          unit: '% YoY',
          trend: 'down',
          status: 'yellow',
          detail: 'Schwäche in globaler Demand; Marktanteile-Verlust',
          trendValue: '−3.4pp'
        },
        {
          id: 'imports',
          label: 'Importe',
          value: '−8.4',
          unit: '% YoY',
          trend: 'down',
          status: 'red',
          detail: 'Schwache Inlandsnachfrage; Investment sinkt',
          trendValue: '−4.6pp'
        },
        {
          id: 'forex-reserves',
          label: 'Devisenreserven',
          value: '3.18T',
          unit: 'USD',
          trend: 'down',
          status: 'yellow',
          detail: 'PBOC stützt Yuan; Reserven sinken',
          trendValue: '−$45B'
        },
        {
          id: 'cny-rate',
          label: 'CNY/USD Rate',
          value: '7.48',
          unit: 'Wechselkurs',
          trend: 'down',
          status: 'yellow',
          detail: 'Yuan schwach; PBOC interveniert',
          trendValue: '+0.12'
        }
      ]
    },
    {
      id: 'labor-demographics',
      label: 'Arbeitsmarkt & Demografie',
      icon: '👶',
      score: 'red',
      metrics: [
        {
          id: 'unemployment',
          label: 'Arbeitslosenquote (offiziell)',
          value: '5.2',
          unit: '%',
          trend: 'up',
          status: 'yellow',
          detail: 'Offiziell; tatsächlich viel höher (Graumarkt)',
          trendValue: '+0.6pp'
        },
        {
          id: 'youth-unemployment',
          label: 'Jugendarbeitslosigkeit',
          value: '21.3',
          unit: '%',
          trend: 'up',
          status: 'red',
          detail: 'Massive Überkapazität von Uni-Absolventen',
          trendValue: '+8.1pp'
        },
        {
          id: 'population-growth',
          label: 'Bevölkerungswachstum',
          value: '−0.48',
          unit: '% YoY',
          trend: 'down',
          status: 'red',
          detail: 'Rückgang 2. Jahr hintereinander; Alternation setzt ein',
          trendValue: '−0.15pp'
        },
        {
          id: 'dependency-ratio',
          label: 'Altenquotient',
          value: '21.8',
          unit: '%',
          trend: 'up',
          status: 'red',
          detail: 'Rentnerboom; weniger Arbeiter/Rentner',
          trendValue: '+1.2pp'
        }
      ]
    }
  ]
}
