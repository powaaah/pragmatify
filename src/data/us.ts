export interface Metric {
  id: string
  label: string
  value: string
  unit?: string
  trend: 'up' | 'down' | 'flat'
  status: 'green' | 'yellow' | 'red'
  detail: string
  trendValue?: string
}

export interface Cohort {
  id: string
  label: string
  icon: string
  score: 'green' | 'yellow' | 'red'
  metrics: Metric[]
}

export interface CountryData {
  id: string
  name: string
  flag: string
  lastUpdated: string
  cohorts: Cohort[]
}

export const usData: CountryData = {
  id: 'us',
  name: 'United States',
  flag: '🇺🇸',
  lastUpdated: 'May 2026',
  cohorts: [
    {
      id: 'state',
      label: 'Staat',
      icon: '🏛️',
      score: 'red',
      metrics: [
        {
          id: 'gdp-growth',
          label: 'BIP-Wachstum',
          value: '1.6',
          unit: '% YoY',
          trend: 'down',
          status: 'yellow',
          detail: 'Verlangsamung ggü. 3.4% im Vorjahr',
          trendValue: '−1.8pp'
        },
        {
          id: 'debt-gdp',
          label: 'Schuldenquote',
          value: '123',
          unit: '% GDP',
          trend: 'up',
          status: 'red',
          detail: 'Historisches Hoch — Zinslast wächst',
          trendValue: '+4pp'
        },
        {
          id: 'deficit',
          label: 'Fiskaldezit',
          value: '−6.4',
          unit: '% GDP',
          trend: 'down',
          status: 'red',
          detail: 'Strukturelles Defizit ohne Aussicht auf Konsolidierung',
          trendValue: '−1.1pp'
        },
        {
          id: 'inflation',
          label: 'Inflation (CPI)',
          value: '3.4',
          unit: '%',
          trend: 'down',
          status: 'yellow',
          detail: 'Rückgang von 9.1% Peak, aber über 2%-Ziel',
          trendValue: '−0.3pp'
        },
        {
          id: 'yield10y',
          label: '10Y Anleiherendite',
          value: '4.48',
          unit: '%',
          trend: 'up',
          status: 'red',
          detail: 'Höchster Stand seit 2007 — Zinsbelastung steigt',
          trendValue: '+0.3pp'
        },
        {
          id: 'interest-budget',
          label: 'Zinsausgaben',
          value: '12.4',
          unit: '% Budget',
          trend: 'up',
          status: 'red',
          detail: 'Größter Einzelposten — überholt Verteidigung',
          trendValue: '+2.1pp'
        },
        {
          id: 'fdi',
          label: 'Auslandsinvestitionen',
          value: '+312',
          unit: 'Mrd. USD',
          trend: 'down',
          status: 'yellow',
          detail: 'Rückgang bei Tech-FDI, stark in Energie',
          trendValue: '−8%'
        },
      ]
    },
    {
      id: 'business',
      label: 'Unternehmen',
      icon: '🏢',
      score: 'yellow',
      metrics: [
        {
          id: 'median-margin',
          label: 'Median Gewinnmarge',
          value: '8.2',
          unit: '%',
          trend: 'down',
          status: 'yellow',
          detail: 'Kostendruck drückt Margen; Median exkl. Tech',
          trendValue: '−0.9pp'
        },
        {
          id: 'insolvencies',
          label: 'Insolvenzen',
          value: '+18',
          unit: '% YoY',
          trend: 'up',
          status: 'red',
          detail: 'Höchststand seit 2010 — Zinsanstieg trifft KMU',
          trendValue: '+18%'
        },
        {
          id: 'credit-default',
          label: 'Kreditausfallquote',
          value: '3.1',
          unit: '%',
          trend: 'up',
          status: 'yellow',
          detail: 'Noch unter krit. Niveau, Trend besorgniserregend',
          trendValue: '+0.8pp'
        },
        {
          id: 'truck-sales',
          label: 'LKW-Neuzulassungen',
          value: '−4.2',
          unit: '% YoY',
          trend: 'down',
          status: 'yellow',
          detail: 'Schwache Transportnachfrage = wirtschaftliche Abkühlung',
          trendValue: '−4.2%'
        },
        {
          id: 'job-openings-biz',
          label: 'Offene Stellen (B2B)',
          value: '8.1',
          unit: 'Mio.',
          trend: 'down',
          status: 'yellow',
          detail: 'Einstellungsbereitschaft sinkt — vorsichtige Haltung',
          trendValue: '−0.6M'
        },
        {
          id: 'roe',
          label: 'Median ROE',
          value: '11.4',
          unit: '%',
          trend: 'down',
          status: 'green',
          detail: 'Noch solide, aber sinkt bei steigenden Kapitalkosten',
          trendValue: '−1.2pp'
        },
      ]
    },
    {
      id: 'consumer',
      label: 'Konsument',
      icon: '👤',
      score: 'yellow',
      metrics: [
        {
          id: 'median-real-income',
          label: 'Median Real-Einkommen',
          value: '56.4',
          unit: 'k USD',
          trend: 'flat',
          status: 'yellow',
          detail: 'Real stagnierende Kaufkraft nach Inflation',
          trendValue: '+0.2%'
        },
        {
          id: 'consumer-credit-default',
          label: 'Konsument Kreditausfälle',
          value: '3.8',
          unit: '%',
          trend: 'up',
          status: 'red',
          detail: 'Kreditkarten-Delinquencies auf 12-Jahres-Hoch',
          trendValue: '+1.2pp'
        },
        {
          id: 'debt-wealth-ratio',
          label: 'Schulden/Vermögen Median',
          value: '1.4',
          unit: 'x',
          trend: 'up',
          status: 'red',
          detail: 'Median-Haushalt schuldet 1.4x sein Nettovermögen',
          trendValue: '+0.2x'
        },
        {
          id: 'savings-rate',
          label: 'Sparquote',
          value: '3.2',
          unit: '%',
          trend: 'down',
          status: 'red',
          detail: 'Historisch niedrig — Paycheck-to-Paycheck Kultur',
          trendValue: '−1.4pp'
        },
        {
          id: 'u6',
          label: 'Arbeitslosigkeit (U6)',
          value: '7.4',
          unit: '%',
          trend: 'up',
          status: 'yellow',
          detail: 'Reale Arbeitslosigkeit inkl. Unterbeschäftigung',
          trendValue: '+0.5pp'
        },
        {
          id: 'jolts-ratio',
          label: 'Offene Stellen / Arbeitsl.',
          value: '1.2',
          unit: 'x',
          trend: 'down',
          status: 'yellow',
          detail: 'Entspannt sich von Peak 2.0x — Markt kühlt ab',
          trendValue: '−0.3x'
        },
      ]
    },
    {
      id: 'housing',
      label: 'Immobilien',
      icon: '🏠',
      score: 'red',
      metrics: [
        {
          id: 'affordability',
          label: 'Housing Affordability',
          value: '98',
          unit: 'Index',
          trend: 'down',
          status: 'red',
          detail: 'Unter 100 = median Familie kann Haus nicht kaufen',
          trendValue: '−24pts'
        },
        {
          id: 'case-shiller',
          label: 'Case-Shiller Index',
          value: '+5.5',
          unit: '% YoY',
          trend: 'up',
          status: 'yellow',
          detail: 'Preise steigen trotz hoher Zinsen — Angebotsmangel',
          trendValue: '+5.5%'
        },
        {
          id: 'mortgage-rate',
          label: '30Y Hypothekenrate',
          value: '6.87',
          unit: '%',
          trend: 'up',
          status: 'red',
          detail: 'Höchst seit 2001 — monatliche Rate +60% ggü. 2021',
          trendValue: '+0.4pp'
        },
        {
          id: 'mortgage-delinquency',
          label: 'Hypotheken-Ausfälle',
          value: '3.6',
          unit: '%',
          trend: 'up',
          status: 'yellow',
          detail: 'Steigend aber noch unter 2009 Niveau (8.9%)',
          trendValue: '+0.6pp'
        },
        {
          id: 'housing-starts',
          label: 'Housing Starts',
          value: '1.36',
          unit: 'Mio.',
          trend: 'flat',
          status: 'yellow',
          detail: 'Stabil aber weit unter Bedarf (1.5M+)',
          trendValue: '+1.2%'
        },
      ]
    }
  ]
}
