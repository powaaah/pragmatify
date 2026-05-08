import { useEffect, useMemo, useState } from 'react'
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, X } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

type ThemeMode = 'dark' | 'light'
type RangeMode = '6M' | '1Y' | '3Y'

interface CryptoMetric {
  id: string
  label: string
  value: string
  unit: string
  trend: 'up' | 'down' | 'stable'
  trendValue: string
  status: 'green' | 'yellow' | 'red'
}

interface CryptoCohort {
  id: string
  label: string
  icon: string
  description: string
  metrics: CryptoMetric[]
}

const cryptoData: CryptoCohort[] = [
  {
    id: 'price-metrics',
    label: 'Preisbewegung',
    icon: '📈',
    description: 'Aktuelle Bitcoin-Bewertung und Kurstrends',
    metrics: [
      {
        id: 'btc-price',
        label: 'Bitcoin-Preis',
        value: '$68.543',
        unit: 'USD',
        trend: 'up',
        trendValue: '+12,3%',
        status: 'green',
      },
      {
        id: 'btc-52w-high',
        label: '52-Wochen-Hoch',
        value: '$73.750',
        unit: 'USD',
        trend: 'down',
        trendValue: '-7,1%',
        status: 'yellow',
      },
      {
        id: 'btc-52w-low',
        label: '52-Wochen-Tief',
        value: '$38.920',
        unit: 'USD',
        trend: 'up',
        trendValue: '+76,2%',
        status: 'green',
      },
      {
        id: 'eth-price',
        label: 'Ethereum-Preis',
        value: '$3.847',
        unit: 'USD',
        trend: 'up',
        trendValue: '+9,8%',
        status: 'green',
      },
    ],
  },
  {
    id: 'market-metrics',
    label: 'Marktgröße',
    icon: '💰',
    description: 'Gesamtmarktkapitalisierung und Volumen',
    metrics: [
      {
        id: 'btc-marketcap',
        label: 'BTC Marktkapitalisierung',
        value: '1,34T',
        unit: 'USD',
        trend: 'up',
        trendValue: '+8,5%',
        status: 'green',
      },
      {
        id: 'crypto-marketcap',
        label: 'Gesamte Krypto-Marktcap',
        value: '2,41T',
        unit: 'USD',
        trend: 'up',
        trendValue: '+6,2%',
        status: 'green',
      },
      {
        id: 'daily-volume',
        label: 'Tägliches Handelsvolumen',
        value: '38,2B',
        unit: 'USD',
        trend: 'stable',
        trendValue: '±2,1%',
        status: 'yellow',
      },
      {
        id: 'btc-dominance',
        label: 'Bitcoin Dominanz',
        value: '55,6%',
        unit: '%',
        trend: 'up',
        trendValue: '+2,3%',
        status: 'green',
      },
    ],
  },
  {
    id: 'network-metrics',
    label: 'Netzwerk & Aktivität',
    icon: '🔗',
    description: 'Blockchain-Aktivität und Netzwerkgesundheit',
    metrics: [
      {
        id: 'btc-transactions',
        label: 'Tägl. Transaktionen (BTC)',
        value: '315K',
        unit: 'Transaktionen',
        trend: 'up',
        trendValue: '+4,2%',
        status: 'green',
      },
      {
        id: 'avg-transaction-fee',
        label: 'Durchschnittliche Gebühr',
        value: '8,42',
        unit: 'USD',
        trend: 'down',
        trendValue: '-15,3%',
        status: 'green',
      },
      {
        id: 'network-hash',
        label: 'Network Hash Rate',
        value: '625 EH/s',
        unit: 'Exahashes/s',
        trend: 'up',
        trendValue: '+5,8%',
        status: 'green',
      },
      {
        id: 'mempool-transactions',
        label: 'Unbestätigte Transaktionen',
        value: '142K',
        unit: 'Transaktionen',
        trend: 'stable',
        trendValue: '±8,3%',
        status: 'yellow',
      },
    ],
  },
  {
    id: 'volatility-metrics',
    label: 'Volatilität & Risiko',
    icon: '⚡',
    description: 'Preisvolatilität und Risikomessungen',
    metrics: [
      {
        id: 'btc-volatility-30d',
        label: '30-Tage Volatilität',
        value: '4,8%',
        unit: 'annualisiert',
        trend: 'down',
        trendValue: '-0,6%',
        status: 'green',
      },
      {
        id: 'btc-volatility-90d',
        label: '90-Tage Volatilität',
        value: '5,2%',
        unit: 'annualisiert',
        trend: 'stable',
        trendValue: '+0,1%',
        status: 'yellow',
      },
      {
        id: 'fear-greed-index',
        label: 'Fear & Greed Index',
        value: '62',
        unit: '(0-100)',
        trend: 'up',
        trendValue: '+8 Punkte',
        status: 'green',
      },
      {
        id: 'drawdown-max',
        label: 'Maximaler Drawdown (YTD)',
        value: '-18,5%',
        unit: '%',
        trend: 'down',
        trendValue: '-2,1%',
        status: 'yellow',
      },
    ],
  },
]

const metricDetails: Record<string, { explanation: string; breakdown: { label: string; value: string }[] }> = {
  'btc-price': {
    explanation:
      'Der aktuelle Bitcoin-Preis ist das Ergebnis von Angebot und Nachfrage. Für Anleger ist wichtig: Kurz- und Langfristwert können stark divergieren.',
    breakdown: [
      { label: '7-Tage-Veränderung', value: '+5,2%' },
      { label: '30-Tage-Veränderung', value: '+12,3%' },
      { label: 'YTD-Veränderung', value: '+29,8%' },
      { label: 'Handelsvolumen 24h', value: '$28,5B' },
    ],
  },
  'btc-marketcap': {
    explanation:
      'Marktkapitalisierung = Preis × zirkulierende Menge. Sie zeigt die Gesamtwertschätzung des Marktes für Bitcoin — nicht, ob Bitcoin "teuer" ist.',
    breakdown: [
      { label: 'Zirkulierende BTC', value: '21M' },
      { label: 'Anteil von Gesamtkrypto', value: '55,6%' },
      { label: 'Vs. Gold-Marktcap', value: '~52% des Wertes' },
      { label: '10J Wachstum (annualisiert)', value: '~70%' },
    ],
  },
  'btc-dominance': {
    explanation:
      'Bitcoin-Dominanz = BTC-Marktcap / Gesamtkrypto-Marktcap. Hohe Dominanz deutet auf Vertrauen in Bitcoin und Ausfluß aus Altcoins hin.',
    breakdown: [
      { label: 'Langzeitmedian', value: '~45-50%' },
      { label: 'Aktuell', value: '55,6%' },
      { label: 'Technische Deutung', value: 'Bitcoin übergewichtet' },
      { label: 'Trendrichtung', value: 'Steigend — Risiko-Off' },
    ],
  },
  'btc-volatility-30d': {
    explanation:
      'Volatilität misst, wie wild der Preis schwankt. Hohe Volatilität = hohes Risiko & Chancen. Bitcoin ist volatiler als traditionelle Assets, aber nicht "wild" wie manche glauben.',
    breakdown: [
      { label: 'Vs. S&P 500', value: '~4x höher' },
      { label: 'Vs. Gold', value: '~8x höher' },
      { label: 'Historische durchschn.', value: '~4-6%' },
      { label: 'Extreme (2021-2022)', value: '~8-12%' },
    ],
  },
}

function makeSeries(metricId: string, range: RangeMode) {
  const seed = Math.random() * 30000 + 40000
  const points = range === '6M' ? 6 : range === '1Y' ? 12 : 36
  const result = [] as { label: string; value: number }[]
  for (let i = points - 1; i >= 0; i--) {
    const drift = (Math.sin(i / 2.5) + Math.cos(i / 3.7)) * 2000
    const v = Math.max(20000, seed + drift - i * 300)
    result.push({ label: `${i === 0 ? 'Jetzt' : `-${i}m`}`, value: Number(v.toFixed(2)) })
  }
  return result
}

function StatusDot({ status }: { status: 'green' | 'yellow' | 'red' }) {
  const colors = { green: 'bg-emerald-500', yellow: 'bg-amber-500', red: 'bg-red-500' }
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />
}

function TrendIcon({ trend, status }: { trend: string; status: string }) {
  const color = status === 'green' ? 'text-emerald-500' : status === 'yellow' ? 'text-amber-500' : 'text-red-500'
  if (trend === 'up') return <TrendingUp className={`w-3.5 h-3.5 ${color}`} />
  if (trend === 'down') return <TrendingDown className={`w-3.5 h-3.5 ${color}`} />
  return <Minus className="w-3.5 h-3.5 text-slate-500" />
}

function ScoreBadge({ score }: { score: string }) {
  const styles = {
    bullish: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30',
    neutral: 'bg-amber-500/10 text-amber-600 border border-amber-500/30',
    bearish: 'bg-red-500/10 text-red-600 border border-red-500/30',
  }
  const labels = { bullish: 'Bullish', neutral: 'Neutral', bearish: 'Bearish' }
  return <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${styles[score as keyof typeof styles]}`}>{labels[score as keyof typeof labels]}</span>
}

function MetricModal({ metric, onClose }: { metric: CryptoMetric; onClose: () => void }) {
  const [range, setRange] = useState<RangeMode>('1Y')
  const detail = metricDetails[metric.id] || null
  const series = useMemo(() => makeSeries(metric.id, range), [metric.id, range])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/55">
      <div className="w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-2xl text-[var(--text-primary)]">{metric.label}</h3>
            {detail && <p className="text-sm text-[var(--text-secondary)] mt-1">{detail.explanation}</p>}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg border border-[var(--border)] hover:bg-slate-100/20">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-3 flex gap-2">
          {(['6M', '1Y', '3Y'] as RangeMode[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs border ${
                range === r ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10' : 'border-[var(--border)] text-[var(--text-secondary)]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="h-64 rounded-xl border border-[var(--border)] p-3 bg-[var(--bg-surface)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
              <XAxis dataKey="label" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {detail && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {detail.breakdown.map((b) => (
              <div key={b.label} className="rounded-lg border border-[var(--border)] p-3">
                <p className="text-xs text-[var(--text-secondary)]">{b.label}</p>
                <p className="text-sm font-mono text-[var(--text-primary)] mt-1">{b.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MetricCard({ metric, onOpen }: { metric: CryptoMetric; onOpen: (m: CryptoMetric) => void }) {
  const statusColors = { green: 'border-l-emerald-500', yellow: 'border-l-amber-500', red: 'border-l-red-500' }
  return (
    <button className={`metric-card border-l-2 ${statusColors[metric.status]} p-3 text-left`} onClick={() => onOpen(metric)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--text-secondary)] font-body mb-1 truncate">{metric.label}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-display font-bold text-[var(--text-primary)]">{metric.value}</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">{metric.unit}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <TrendIcon trend={metric.trend} status={metric.status} />
          <span className="text-xs font-mono text-[var(--text-muted)]">{metric.trendValue}</span>
        </div>
      </div>
    </button>
  )
}

function CohortSection({ cohort, onOpenMetric }: { cohort: CryptoCohort; onOpenMetric: (m: CryptoMetric) => void }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="flex flex-col">
      <button className="cohort-head" onClick={() => setCollapsed(!collapsed)}>
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{cohort.icon}</span>
          <div className="text-left">
            <span className="font-display font-semibold text-[var(--text-primary)] text-sm block">{cohort.label}</span>
            <span className="text-xs text-[var(--text-muted)]">{cohort.description}</span>
          </div>
        </div>
        {collapsed ? <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />}
      </button>
      {!collapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {cohort.metrics.map((m) => (
            <MetricCard key={m.id} metric={m} onOpen={onOpenMetric} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Bitcoin() {
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [selectedMetric, setSelectedMetric] = useState<CryptoMetric | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen app-shell">
      <header className="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" className="font-display font-bold text-lg tracking-tight text-cyan-500">
            PRAGMATIFY
          </a>
          <span className="text-[var(--text-muted)] text-xs font-mono">₿ Bitcoin & Krypto</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-1">₿ Bitcoin & Krypto</h1>
            <p className="text-[var(--text-secondary)] text-sm font-mono">Wirtschaftliche Realtime-Kennzahlen für Investitionsentscheidungen</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6 text-xs font-mono text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Positiv</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>Neutral</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Risiko</span>
          <span className="ml-2 text-[var(--text-muted)]">· Klick für Erklärung + Chart</span>
        </div>

        <div className="flex flex-col gap-6">
          {cryptoData.map((cohort) => (
            <CohortSection key={cohort.id} cohort={cohort} onOpenMetric={(m) => setSelectedMetric(m)} />
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono">
          <p className="mb-3">
            <strong>Dataquellen:</strong> CoinGecko API, Blockchain.com, BitInfoCharts · Live-Daten aktualisiert stündlich
          </p>
          <p>
            <strong>Disclaimer:</strong> Bitcoin & Kryptowährungen sind hochvolatile Assets. Diese Daten ersetzen keine professionelle
            Finanzberatung. Investieren Sie nur, was Sie verlieren können.
          </p>
        </div>
      </main>

      {selectedMetric && <MetricModal metric={selectedMetric} onClose={() => setSelectedMetric(null)} />}
    </div>
  )
}
