import type { CountryData } from './us'

export const inData: CountryData = {
  id: 'in',
  name: 'Indien',
  flag: '🇮🇳',
  lastUpdated: 'Mai 2026',
  cohorts: [
    {
      id: 'state',
      label: 'Staat & Wirtschaft',
      icon: '🏛️',
      score: 'green',
      metrics: [
        {
          id: 'gdp-growth',
          label: 'BIP-Wachstum',
          value: '6.4',
          unit: '% YoY',
          trend: 'down',
          status: 'green',
          detail: 'Weltweit schnellstes großes Wirtschaftswachstum',
          trendValue: '−0.8pp'
        },
        {
          id: 'debt-gdp',
          label: 'Schuldenquote',
          value: '83',
          unit: '% GDP',
          trend: 'down',
          status: 'yellow',
          detail: 'Moderates Deficit; jedoch Steuerquote niedrig',
          trendValue: '−2.1pp'
        },
        {
          id: 'deficit',
          label: 'Fiskalsaldo',
          value: '−5.1',
          unit: '% GDP',
          trend: 'down',
          status: 'yellow',
          detail: 'Modi beschränkt Defizit; Infrastrukturausgaben steigen',
          trendValue: '−1.2pp'
        },
        {
          id: 'inflation',
          label: 'Inflation (CPI)',
          value: '4.6',
          unit: '%',
          trend: 'down',
          status: 'yellow',
          detail: 'Oberhalb RBI-Ziel (2-6%); Monsunrisiken',
          trendValue: '−0.8pp'
        },
        {
          id: 'forex-reserves',
          label: 'Devisenreserven',
          value: '632B',
          unit: 'USD',
          trend: 'up',
          status: 'green',
          detail: '10+ Monate Import-Abdeckung; robust',
          trendValue: '+$48B'
        }
      ]
    },
    {
      id: 'labor',
      label: 'Arbeitsmarkt',
      icon: '👷',
      score: 'green',
      metrics: [
        {
          id: 'unemployment',
          label: 'Arbeitslosenquote (PLFS)',
          value: '3.8',
          unit: '%',
          trend: 'down',
          status: 'green',
          detail: 'Vollbeschäftigung faktisch erreicht',
          trendValue: '−0.3pp'
        },
        {
          id: 'job-creation',
          label: 'Formale Jobschaffung',
          value: '8.2M',
          unit: '2024-2025',
          trend: 'up',
          status: 'green',
          detail: 'EPFO/NPS-Registrierungen; formale Sektor wächst',
          trendValue: '+1.8M'
        },
        {
          id: 'wage-growth',
          label: 'Reallohnwachstum',
          value: '4.8',
          unit: '%',
          trend: 'up',
          status: 'green',
          detail: 'Kaufkraft steigt; Kluft Stadt-Land schließt sich',
          trendValue: '+0.9pp'
        },
        {
          id: 'labor-participation',
          label: 'Frauenerwerbstätigenquote',
          value: '28.6',
          unit: '%',
          trend: 'up',
          status: 'yellow',
          detail: 'Langsame Verbesserung; strukturelle Hindernisse bleiben',
          trendValue: '+1.2pp'
        }
      ]
    },
    {
      id: 'consumption',
      label: 'Konsum & Investitionen',
      icon: '🛒',
      score: 'green',
      metrics: [
        {
          id: 'retail-sales',
          label: 'Einzelhandelswachstum',
          value: '8.4',
          unit: '% YoY',
          trend: 'up',
          status: 'green',
          detail: 'Ländliches Wachstum + städtische Mittelschicht-Expansion',
          trendValue: '+1.1pp'
        },
        {
          id: 'capex',
          label: 'Investitionsquote',
          value: '32.1',
          unit: '% GDP',
          trend: 'up',
          status: 'green',
          detail: 'Regierung + Private führen Infrastruktur-Boom an',
          trendValue: '+2.3pp'
        },
        {
          id: 'consumer-sentiment',
          label: 'Verbraucherstimmung',
          value: '+42',
          unit: 'Index',
          trend: 'up',
          status: 'green',
          detail: 'Optimismus höher als BRICS-Durchschnitt',
          trendValue: '+8pp'
        },
        {
          id: 'credit-growth',
          label: 'Kreditwachstum (Banken)',
          value: '14.2',
          unit: '% YoY',
          trend: 'stable',
          status: 'green',
          detail: 'Gesund; Private Credit auch wachsend',
          trendValue: '±0.3pp'
        }
      ]
    },
    {
      id: 'external',
      label: 'Außenwirtschaft & Demografie',
      icon: '🌍',
      score: 'green',
      metrics: [
        {
          id: 'exports',
          label: 'Exporte',
          value: '+7.3',
          unit: '% YoY',
          trend: 'up',
          status: 'green',
          detail: 'Apparel, Pharma, IT Services; diversifiziert',
          trendValue: '+2.1pp'
        },
        {
          id: 'current-account',
          label: 'Leistungsbilanz',
          value: '−1.2',
          unit: '% GDP',
          trend: 'down',
          status: 'green',
          detail: 'Kleines Defizit; nachhaltig',
          trendValue: '−0.4pp'
        },
        {
          id: 'population-growth',
          label: 'Bevölkerungswachstum',
          value: '1.02',
          unit: '% YoY',
          trend: 'down',
          status: 'green',
          detail: 'Geburtsrate sinkt; aber noch 200+ Mio Wachstum bis 2050',
          trendValue: '−0.12pp'
        },
        {
          id: 'median-age',
          label: 'Medianalter',
          value: '28.2',
          unit: 'Jahre',
          trend: 'up',
          status: 'green',
          detail: 'Längster "Demographic Dividend" der Welt; bis 2050 relevant',
          trendValue: '+0.8a'
        }
      ]
    }
  ]
}
