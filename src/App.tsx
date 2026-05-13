import { useEffect, useMemo, useState } from 'react'
import { usData } from './data/us'
import { deData } from './data/germany'
import { cnData } from './data/china'
import { inData } from './data/india'
import { getUSLiveData } from './data/usLive'
import type { CountryData, Metric, Cohort } from './data/us'
import { fetchMacroSeries } from './lib/macroSeries'
import type { DataSourceLink } from './lib/macroSeries'
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, X, Sun, Moon } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceDot } from 'recharts'
import CookieBanner from './components/CookieBanner'

type ThemeMode = 'dark' | 'light'
type RangeMode = '6M' | '1Y' | '3Y' | '10Y' | '30Y'
type ScaleMode = 'auto' | 'padded'

type SeriesPoint = { label: string; value: number }
type MetricMeta = { title: string; explanation: string; calculation: string; breakdown: { label: string; value: string }[] }

const countries = [
  { id: 'us', name: 'USA', flag: '🇺🇸', available: true },
  { id: 'de', name: 'Deutschland', flag: '🇩🇪', available: true },
  { id: 'cn', name: 'China', flag: '🇨🇳', available: true },
  { id: 'in', name: 'Indien', flag: '🇮🇳', available: true },
]

const countryDataMap: Record<string, CountryData> = {
  us: usData,
  de: deData,
  cn: cnData,
  in: inData,
}

const countryDataQuality: Record<string, { mode: 'live' | 'snapshot'; note: string }> = {
  us: { mode: 'live', note: 'Teilweise live via FRED (mit Fallback)' },
  de: { mode: 'snapshot', note: 'Aktuell Snapshot-Werte (kein Live-Feed)' },
  cn: { mode: 'snapshot', note: 'Aktuell Snapshot-Werte (kein Live-Feed)' },
  in: { mode: 'snapshot', note: 'Aktuell Snapshot-Werte (kein Live-Feed)' },
}

const metricMeta: Record<string, MetricMeta> = {
  inflation: {
    title: 'Inflation (CPI)',
    explanation:
      'Die Inflation zeigt, wie stark die Verbraucherpreise steigen. Für den Median-Haushalt ist wichtig, ob Lohnwachstum nach Inflation noch positiv ist.',
    calculation:
      'Gemessen als jährliche Veränderung des Consumer Price Index (CPI): (CPI aktuell / CPI vor 12 Monaten - 1) × 100.',
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
    calculation: 'Berechnet als Staatsschulden / nominales BIP × 100. Höhere Quoten erhöhen mittelfristig Zins- und Refinanzierungsrisiken.',
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
    calculation:
      'Wochendurchschnitt für 30-jährige Festhypotheken (z. B. Freddie Mac PMMS). Monatsrate abgeleitet über Standard-Annuitätenformel.',
    breakdown: [
      { label: '2021 Monatsrate', value: '~1.500 USD' },
      { label: 'Heute', value: '~2.400 USD' },
      { label: 'Anstieg', value: '+60%' },
    ],
  },
  u6: {
    title: 'Arbeitsmarkt (U6 + NFP)',
    explanation:
      'U6 misst den breiten Arbeitsmarktdruck: Arbeitslose + Unterbeschäftigte + entmutigte Arbeitskräfte im Verhältnis zur erweiterten Erwerbsbevölkerung. Non-Farm Payrolls (NFP) zeigen monatlich, wie viele Jobs außerhalb der Landwirtschaft netto entstanden oder verloren gingen.',
    calculation:
      'U6 = (Arbeitslose + marginal gebundene Personen + Teilzeit aus wirtschaftlichen Gründen) / (Erwerbspersonen + marginal gebundene Personen) × 100. NFP = monatliche Nettoveränderung der Beschäftigten außerhalb der Landwirtschaft laut BLS Establishment Survey.',
    breakdown: [
      { label: 'U6 aktuell', value: '7.4%' },
      { label: 'NFP letzter Monat', value: '+175k' },
      { label: '3M NFP-Schnitt', value: '+210k' },
      { label: 'Interpretation', value: 'Abkühlung, aber kein Einbruch' },
    ],
  },
}

const defaultMeta: MetricMeta = {
  title: 'KPI-Details',
  explanation:
    'Dieser Indikator beschreibt einen konkreten Teil der Wirtschaft (z. B. Preise, Jobs, Schulden, Nachfrage). Entscheidend ist der Trend über Zeit statt nur ein Einzelwert.',
  calculation: 'Berechnet nach offizieller Quellenmethodik (z. B. Veränderungsrate YoY/MoM, Quote = Zähler/Nenner × 100 oder Indexstand mit Basisjahr).',
  breakdown: [
    { label: 'Signalqualität', value: 'Mittel–Hoch' },
    { label: 'Aktualisierungsrhythmus', value: 'Monatlich/Quartalsweise' },
  ],
}

const rangePoints: Record<RangeMode, number> = {
  '6M': 6,
  '1Y': 12,
  '3Y': 36,
  '10Y': 120,
  '30Y': 360,
}

function makeSeries(metric: Metric, range: RangeMode) {
  const seed = Number(metric.value.replace(',', '.').replace(/[^0-9.-]/g, '')) || 1
  const points = rangePoints[range]
  const result = [] as SeriesPoint[]
  const now = new Date()
  for (let i = points - 1; i >= 0; i--) {
    const drift = (Math.sin(i / 2.5) + Math.cos(i / 3.7)) * 0.8
    const v = Math.max(0, seed + drift - i * 0.03)
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    result.push({ label, value: Number(v.toFixed(2)) })
  }
  return result
}

function getYAxisDomain(series: SeriesPoint[], scaleMode: ScaleMode): [number, number] | ['auto', 'auto'] {
  if (!series.length || scaleMode === 'auto') return ['auto', 'auto']
  const values = series.map((p) => p.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const spread = max - min
  if (spread === 0) {
    const pad = Math.max(Math.abs(max) * 0.05, 1)
    return [Number((min - pad).toFixed(2)), Number((max + pad).toFixed(2))]
  }
  const pad = spread * 0.08
  return [Number((min - pad).toFixed(2)), Number((max + pad).toFixed(2))]
}

function getTickFormatter() {
  return (value: string) => {
    const [year, month] = String(value).split('-')
    if (!year || !month) return value
    return `${month}/${year.slice(-2)}`
  }
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

function deltaBasis(metric: Metric) {
  if (metric.unit?.includes('YoY')) return 'ggü. Vorjahr'
  if (metric.unit?.includes('MoM')) return 'ggü. Vormonat'
  return 'ggü. Vorperiode'
}

function cohortAction(score: 'green' | 'yellow' | 'red') {
  if (score === 'green') return 'Beobachten, selektiv Chancen nutzen.'
  if (score === 'yellow') return 'Neutral bleiben, Risiko aktiv managen.'
  return 'Defensiv agieren, Exposure reduzieren.'
}

function RiskTag({ status }: { status: 'green' | 'yellow' | 'red' }) {
  const labels = { green: 'Risiko niedrig', yellow: 'Risiko mittel', red: 'Risiko hoch' }
  const styles = {
    green: 'text-emerald-600 bg-emerald-500/10 border border-emerald-500/30',
    yellow: 'text-amber-600 bg-amber-500/10 border border-amber-500/30',
    red: 'text-red-600 bg-red-500/10 border border-red-500/30',
  }
  return <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${styles[status]}`}>{labels[status]}</span>
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

function MetricModal({ metric, onClose, activeCountry }: { metric: Metric; onClose: () => void; activeCountry: string }) {
  const [range, setRange] = useState<RangeMode>('1Y')
  const [scaleMode, setScaleMode] = useState<ScaleMode>('auto')
  const [realSeries, setRealSeries] = useState<Array<SeriesPoint> | null>(null)
  const [seriesSource, setSeriesSource] = useState<string>('Modellierte Zeitreihe (Fallback)')
  const [markers, setMarkers] = useState<number[]>([])
  const [sourceLinks, setSourceLinks] = useState<DataSourceLink[]>([])
  const meta = metricMeta[metric.id] ?? {
    ...defaultMeta,
    title: metric.label,
    breakdown: [
      { label: 'Aktueller Wert', value: `${metric.value}${metric.unit ? ` ${metric.unit}` : ''}` },
      { label: 'Trend', value: metric.trend === 'up' ? 'Steigend' : metric.trend === 'down' ? 'Fallend' : 'Seitwärts' },
      { label: 'Delta', value: metric.trendValue ?? 'k. A.' },
      { label: 'Frequenz', value: 'Monatlich/Quartalsweise (je nach Quelle)' },
    ],
  }
  const syntheticSeries = useMemo(() => makeSeries(metric, range), [metric, range])
  const series = realSeries ?? syntheticSeries

  useEffect(() => {
    let mounted = true
    const limit = rangePoints[range]

    fetchMacroSeries(activeCountry, metric.id, limit)
      .then((result) => {
        if (!mounted || !result?.points?.length) {
          setRealSeries(null)
          setSeriesSource('Modellierte Zeitreihe (Fallback)')
          setSourceLinks([])
          return
        }
        setRealSeries(result.points)
        setSeriesSource(result.source)
        setSourceLinks(result.links ?? [])
      })
      .catch(() => {
        if (!mounted) return
        setRealSeries(null)
        setSeriesSource('Modellierte Zeitreihe (Fallback)')
        setSourceLinks([])
      })

    return () => {
      mounted = false
    }
  }, [metric.id, range, activeCountry])

  useEffect(() => {
    setMarkers([])
  }, [metric.id, range, activeCountry])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [])

  const yDomain = useMemo(() => getYAxisDomain(series, scaleMode), [series, scaleMode])
  const tickFormatter = useMemo(() => getTickFormatter(), [])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 bg-slate-950/55" onClick={onClose}>
      <div className="mx-auto my-4 sm:my-8 w-full max-w-3xl max-h-[92dvh] overflow-y-auto overscroll-contain rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:p-5" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 -mx-4 sm:-mx-5 px-4 sm:px-5 py-2 mb-2 bg-[var(--bg-card)] border-b border-[var(--border)]">
          <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl text-[var(--text-primary)]">{meta.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{meta.explanation}</p>
            <p className="text-xs text-[var(--text-muted)] mt-2"><span className="font-semibold">Berechnung:</span> {meta.calculation}</p>
          </div>
            <button onClick={onClose} className="p-2 rounded-lg border border-[var(--border)] hover:bg-slate-100/20">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {(['6M', '1Y', '3Y', '10Y', '30Y'] as RangeMode[]).map((r) => (
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
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setScaleMode('auto')}
              className={`px-2.5 py-1 rounded-md border ${scaleMode === 'auto' ? 'border-cyan-500 text-cyan-500' : 'border-[var(--border)] text-[var(--text-secondary)]'}`}
            >
              Auto-Fit
            </button>
            <button
              onClick={() => setScaleMode('padded')}
              className={`px-2.5 py-1 rounded-md border ${scaleMode === 'padded' ? 'border-cyan-500 text-cyan-500' : 'border-[var(--border)] text-[var(--text-secondary)]'}`}
            >
              Gepolstert
            </button>
          </div>
        </div>

        <div className="h-64 rounded-xl border border-[var(--border)] p-3 bg-[var(--bg-surface)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={series}
              onClick={(state) => {
                if (typeof state?.activeTooltipIndex !== 'number') return
                const idx = state.activeTooltipIndex
                setMarkers((prev) => (prev.includes(idx) ? prev.filter((m) => m !== idx) : [...prev, idx]))
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
              <XAxis dataKey="label" tickFormatter={tickFormatter} stroke="var(--text-muted)" fontSize={12} minTickGap={20} />
              <YAxis domain={yDomain} stroke="var(--text-muted)" fontSize={12} />
              <Tooltip labelFormatter={(value) => tickFormatter(String(value))} />
              <Line type="linear" dataKey="value" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
              {markers.map((idx) => {
                const point = series[idx]
                if (!point) return null
                return (
                  <ReferenceDot
                    key={`marker-${idx}`}
                    x={point.label}
                    y={point.value}
                    r={5}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth={1}
                    ifOverflow="visible"
                    onClick={() => setMarkers((prev) => prev.filter((m) => m !== idx))}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 text-xs text-[var(--text-muted)] font-mono">
          Quelle: {seriesSource} · Aktualisierung: {range} · Marker: Klick in den Chart zum Setzen/Entfernen
        </div>
        {sourceLinks.length > 0 && (
          <div className="mt-2 text-xs">
            <p className="text-[var(--text-secondary)] mb-1">Originalquelle:</p>
            <div className="flex flex-col gap-1">
              {sourceLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-500 hover:text-cyan-400 underline break-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

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
          <div className="mt-2">
            <RiskTag status={metric.status} />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <TrendIcon trend={metric.trend} status={metric.status} />
          {metric.trendValue && (
            <span className="text-xs font-mono text-[var(--text-muted)]" title="Veränderung gegenüber der Vorperiode">
              Δ {metric.trendValue} ({deltaBasis(metric)})
            </span>
          )}
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
      {!collapsed && <div className="text-xs font-mono text-[var(--text-secondary)] mb-2">Priorität: {cohortAction(cohort.score)}</div>}
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
  const decision = {
    green: 'Nächste Handlung: Opportunistisch (kontrolliert Risiko aufbauen)',
    yellow: 'Nächste Handlung: Neutral (Cash-Quote halten, selektiv investieren)',
    red: 'Nächste Handlung: Defensiv (Risiko reduzieren, Qualität bevorzugen)',
  }
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-3">
        <div className={`font-display font-bold text-2xl ${colors[overall]}`}>{labels[overall]}</div>
        <div className="flex gap-1">{scores.map((s, i) => <StatusDot key={i} status={s} />)}</div>
      </div>
      <div className="text-xs font-mono text-[var(--text-secondary)]">{decision[overall]}</div>
    </div>
  )
}

export default function App() {
  const [activeCountry, setActiveCountry] = useState('us')
  const [data, setData] = useState<CountryData>(countryDataMap[activeCountry])
  const [liveMode, setLiveMode] = useState(false)
  const [isLoadingCountry, setIsLoadingCountry] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null)
  const quality = countryDataQuality[activeCountry]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    setIsLoadingCountry(true)
    setData(countryDataMap[activeCountry])
    if (activeCountry === 'us') {
      let mounted = true
      getUSLiveData().then((liveData) => {
        if (!mounted) return
        setData(liveData)
        setLiveMode(liveData.lastUpdated !== usData.lastUpdated)
        setIsLoadingCountry(false)
      })
      return () => {
        mounted = false
      }
    } else {
      setLiveMode(false)
      setIsLoadingCountry(false)
    }
  }, [activeCountry])

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
            <span className={`live-dot w-1.5 h-1.5 rounded-full inline-block ${liveMode ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
            <span className="text-xs text-[var(--text-muted)] font-mono">{liveMode ? `Live ${data.lastUpdated}` : `Snapshot ${data.lastUpdated}`}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => c.available && setActiveCountry(c.id)}
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
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text-primary)] mb-1">
              {data.flag} {data.name}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm font-mono">Wirtschaftlicher Gesamtzustand · <a href="#methodik" className="underline hover:text-cyan-500">Methodik</a></p>
            <p className="text-[var(--text-muted)] text-xs font-mono mt-1">
              Datenmodus: {quality.mode === 'live' ? 'Live/Hybrid' : 'Snapshot'} · {quality.note}
            </p>
          </div>
          <OverallScore data={data} />
        </div>

        <div className="mb-6 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
          <p className="text-xs font-mono text-cyan-500">Top-Action jetzt</p>
          <p className="text-sm text-[var(--text-primary)] mt-1">
            {data.cohorts.filter((c) => c.score === 'red').length >= 2
              ? 'Defensiv: Risiko runter, Cash-Quote hoch, nur Qualitätspositionen.'
              : data.cohorts.filter((c) => c.score === 'yellow').length >= 2
                ? 'Neutral: kein blindes Risk-on, selektiv auf starke Segmente fokussieren.'
                : 'Opportunistisch: kontrolliert Risiko aufbauen und Timing diszipliniert halten.'}
          </p>
        </div>

        {isLoadingCountry && (
          <div className="mb-4 text-xs font-mono text-cyan-500">Daten werden aktualisiert…</div>
        )}

        <div className="flex gap-4 mb-6 text-xs font-mono text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Gesund</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>Angespannt</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Kritisch</span>
          <span className="ml-2 text-[var(--text-muted)]">· Klick auf Kachel für Erklärung + Graph</span>
          <span className="ml-2 text-[var(--text-muted)]">· Δ zeigt die jeweilige Basis (Vorjahr/Vormonat/Vorperiode)</span>
        </div>

        <div className="flex flex-col gap-6">
          {data.cohorts.map((cohort) => (
            <CohortSection key={cohort.id} cohort={cohort} onOpenMetric={(m) => setSelectedMetric(m)} />
          ))}
        </div>

        <div id="methodik" className="mt-12 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono flex flex-col sm:flex-row gap-2 justify-between">
          <span>Daten: FRED, World Bank, BLS, Census Bureau, MBA · {liveMode ? `Live-Update ${data.lastUpdated}` : `Mock-Stand ${data.lastUpdated}`}</span>
          <span>KPI-Klick = Erklärung, Zeitreihe, Treiber</span>
        </div>
      </main>

      {selectedMetric && <MetricModal metric={selectedMetric} onClose={() => setSelectedMetric(null)} activeCountry={activeCountry} />}
      <CookieBanner />
    </div>
  )
}
