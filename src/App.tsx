import { useEffect, useMemo, useState } from 'react'
import { usData } from './data/us'
import { getUSLiveData } from './data/usLive'
import type { CountryData, Metric, Cohort } from './data/us'
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, X, Sun, Moon } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'

type ThemeMode = 'dark' | 'light'
type RangeMode = '6M' | '1Y' | '3Y'

const countries = [
  { id: 'us', name: 'USA', flag: '🇺🇸', available: true },
  { id: 'de', name: 'Deutschland', flag: '🇩🇪', available: false },
  { id: 'cn', name: 'China', flag: '🇨🇳', available: false },
  { id: 'in', name: 'Indien', flag: '🇮🇳', available: false },
]

const metricMeta: Record<string, { title: string; explanation: string; breakdown: { label: string; value: string }[] }> = {
  inflation: {
    title: 'Inflation (CPI)',
    explanation:
      'Die Inflation zeigt, wie stark die Verbraucherpreise steigen. Für den Median-Haushalt ist wichtig, ob Lohnwachstum nach Inflation noch positiv ist.',
    breakdown: [
      { label: 'Wohnkosten', value: '2.0%' },
      { label: 'Spritpreise', value: '5.0%' },
      { label: 'Lebensmittel', value: '3.2%' },
      { label: 'Gesundheit', value: '2.7%' },
    ],
  },
  'debt-gdp': {
    title: 'Staatsverschuldung (% GDP)',
    explanation:
      'Die Schuldenquote misst die Tragfähigkeit der Staatsfinanzen. Kritisch wird es, wenn gleichzeitig die Zinslast und Refinanzierungskosten steigen.',
    breakdown: [
      { label: '2-jährige Anleihen', value: '30%' },
      { label: '10-jährige Anleihen', value: '60%' },
      { label: '30-jährige Anleihen', value: '10%' },
    ],
  },
  'mortgage-rate': {
    title: '30Y Hypothekenrate',
    explanation:
      'Die 30-jährige Hypothekenrate beeinflusst direkt die monatliche Belastung von Käufern und damit Nachfrage, Bauaktivität und Konsum.',
    breakdown: [
      { label: '2021 Monatsrate', value: '~1.500 USD' },
      { label: 'Heute', value: '~2.400 USD' },
      { label: 'Anstieg', value: '+60%' },
    ],
  },
}

const defaultMeta = {
  title: 'KPI-Details',
  explanation:
    'Diese Kennzahl zeigt Richtung und Stärke der wirtschaftlichen Entwicklung. Für Entscheidungen ist der Trend meist wichtiger als der Einzelwert.',
  breakdown: [
    { label: 'Signalqualität', value: 'Mittel–Hoch' },
    { label: 'Aktualisierungsrhythmus', value: 'Monatlich/Quartalsweise' },
  ],
}

function makeSeries(metric: Metric, range: RangeMode) {
  const seed = Number(metric.value.replace(',', '.').replace(/[^0-9.-]/g, '')) || 1
  const points = range === '6M' ? 6 : range === '1Y' ? 12 : 36
  const result = [] as { label: string; value: number }[]
  for (let i = points - 1; i >= 0; i--) {
    const drift = (Math.sin(i / 2.5) + Math.cos(i / 3.7)) * 0.8
    const v = Math.max(0, seed + drift - i * 0.03)
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

function ScoreBadge({ score }: { score: 'green' | 'yellow' | 'red' }) {
  const styles = {
    green: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30',
    yellow: 'bg-amber-500/10 text-amber-600 border border-amber-500/30',
    red: 'bg-red-500/10 text-red-600 border border-red-500/30',
  }
  const labels = { green: 'Gesund', yellow: 'Angespannt', red: 'Kritisch' }
  return <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${styles[score]}`}>{labels[score]}</span>
}

function MetricModal({ metric, onClose }: { metric: Metric; onClose: () => void }) {
  const [range, setRange] = useState<RangeMode>('1Y')
  const meta = metricMeta[metric.id] ?? defaultMeta
  const series = useMemo(() => makeSeries(metric, range), [metric, range])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/55">
      <div className="w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-2xl text-[var(--text-primary)]">{meta.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{meta.explanation}</p>
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
              <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {meta.breakdown.map((b) => (
            <div key={b.label} className="rounded-lg border border-[var(--border)] p-3">
              <p className="text-xs text-[var(--text-secondary)]">{b.label}</p>
              <p className="text-sm font-mono text-[var(--text-primary)] mt-1">{b.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MetricCard({ metric, onOpen }: { metric: Metric; onOpen: (m: Metric) => void }) {
  const statusColors = { green: 'border-l-emerald-500', yellow: 'border-l-amber-500', red: 'border-l-red-500' }
  return (
    <button className={`metric-card border-l-2 ${statusColors[metric.status]} p-3 text-left`} onClick={() => onOpen(metric)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--text-secondary)] font-body mb-1 truncate">{metric.label}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-display font-bold text-[var(--text-primary)]">{metric.value}</span>
            {metric.unit && <span className="text-xs text-[var(--text-muted)] font-mono">{metric.unit}</span>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <TrendIcon trend={metric.trend} status={metric.status} />
          {metric.trendValue && <span className="text-xs font-mono text-[var(--text-muted)]">{metric.trendValue}</span>}
        </div>
      </div>
    </button>
  )
}

function CohortSection({ cohort, onOpenMetric }: { cohort: Cohort; onOpenMetric: (m: Metric) => void }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="flex flex-col">
      <button className="cohort-head" onClick={() => setCollapsed(!collapsed)}>
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{cohort.icon}</span>
          <span className="font-display font-semibold text-[var(--text-primary)] text-sm">{cohort.label}</span>
          <ScoreBadge score={cohort.score} />
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

function OverallScore({ data }: { data: CountryData }) {
  const scores = data.cohorts.map((c) => c.score)
  const reds = scores.filter((s) => s === 'red').length
  const yellows = scores.filter((s) => s === 'yellow').length
  const overall = reds >= 2 ? 'red' : yellows >= 2 ? 'yellow' : 'green'
  const labels = { green: 'Stabil', yellow: 'Unter Druck', red: 'Kritisch' }
  const colors = { green: 'text-emerald-600', yellow: 'text-amber-600', red: 'text-red-600' }
  return (
    <div className="flex items-center gap-3">
      <div className={`font-display font-bold text-2xl ${colors[overall]}`}>{labels[overall]}</div>
      <div className="flex gap-1">{scores.map((s, i) => <StatusDot key={i} status={s} />)}</div>
    </div>
  )
}

export default function App() {
  const [activeCountry] = useState('us')
  const [data, setData] = useState(usData)
  const [liveMode, setLiveMode] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    let mounted = true
    getUSLiveData().then((liveData) => {
      if (!mounted) return
      setData(liveData)
      setLiveMode(liveData.lastUpdated !== usData.lastUpdated)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen app-shell">
      <header className="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="theme-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Theme wechseln"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="font-display font-bold text-lg tracking-tight text-cyan-500">PRAGMATIFY</span>
            <span className="text-[var(--text-muted)] text-xs font-mono hidden sm:block">Economic Pulse</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs text-[var(--text-muted)] font-mono">{liveMode ? `Live ${data.lastUpdated}` : data.lastUpdated}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {countries.map((c) => (
            <button
              key={c.id}
              disabled={!c.available}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-body transition-all whitespace-nowrap ${
                c.id === activeCountry
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-500'
                  : c.available
                    ? 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] cursor-not-allowed'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
              {!c.available && <span className="text-xs text-[var(--text-muted)]">bald</span>}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-1">
              {data.flag} {data.name}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm font-mono">Wirtschaftlicher Gesamtzustand</p>
          </div>
          <OverallScore data={data} />
        </div>

        <div className="flex gap-4 mb-6 text-xs font-mono text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Gesund</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>Angespannt</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Kritisch</span>
          <span className="ml-2 text-[var(--text-muted)]">· Klick auf Kachel für Erklärung + Graph</span>
        </div>

        <div className="flex flex-col gap-6">
          {data.cohorts.map((cohort) => (
            <CohortSection key={cohort.id} cohort={cohort} onOpenMetric={(m) => setSelectedMetric(m)} />
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono flex flex-col sm:flex-row gap-2 justify-between">
          <span>Daten: FRED, World Bank, BLS, Census Bureau, MBA · {liveMode ? `Live-Update ${data.lastUpdated}` : `Mock-Stand ${data.lastUpdated}`}</span>
          <span>KPI-Klick = Erklärung, Zeitreihe, Treiber</span>
        </div>
      </main>

      {selectedMetric && <MetricModal metric={selectedMetric} onClose={() => setSelectedMetric(null)} />}
    </div>
  )
}
