import { useState } from 'react'
import { usData } from './data/us'
import type { CountryData, Metric, Cohort } from './data/us'
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react'

const countries = [
  { id: 'us', name: 'USA', flag: '🇺🇸', available: true },
  { id: 'de', name: 'Deutschland', flag: '🇩🇪', available: false },
  { id: 'cn', name: 'China', flag: '🇨🇳', available: false },
  { id: 'in', name: 'Indien', flag: '🇮🇳', available: false },
]

function StatusDot({ status }: { status: 'green' | 'yellow' | 'red' }) {
  const colors = {
    green: 'bg-emerald-500',
    yellow: 'bg-amber-500',
    red: 'bg-red-500',
  }
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />
  )
}

function TrendIcon({ trend, status }: { trend: string; status: string }) {
  const color = status === 'green' ? 'text-emerald-400' : status === 'yellow' ? 'text-amber-400' : 'text-red-400'
  if (trend === 'up') return <TrendingUp className={`w-3.5 h-3.5 ${color}`} />
  if (trend === 'down') return <TrendingDown className={`w-3.5 h-3.5 ${color}`} />
  return <Minus className={`w-3.5 h-3.5 text-slate-500`} />
}

function ScoreBadge({ score, label }: { score: 'green' | 'yellow' | 'red'; label: string }) {
  const styles = {
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    yellow: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    red: 'bg-red-500/10 text-red-400 border border-red-500/30',
  }
  const labels = { green: 'Gesund', yellow: 'Angespannt', red: 'Kritisch' }
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${styles[score]}`}>
      {labels[score]}
    </span>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  const [open, setOpen] = useState(false)
  const statusColors = {
    green: 'border-l-emerald-500',
    yellow: 'border-l-amber-500',
    red: 'border-l-red-500',
  }

  return (
    <div
      className={`metric-card border-l-2 ${statusColors[metric.status]} p-3 cursor-pointer select-none`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 font-body mb-1 truncate">{metric.label}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-display font-bold text-slate-100">{metric.value}</span>
            {metric.unit && <span className="text-xs text-slate-500 font-mono">{metric.unit}</span>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <TrendIcon trend={metric.trend} status={metric.status} />
          {metric.trendValue && (
            <span className={`text-xs font-mono ${
              metric.status === 'green' ? 'text-emerald-400' :
              metric.status === 'red' ? 'text-red-400' : 'text-amber-400'
            }`}>
              {metric.trendValue}
            </span>
          )}
        </div>
      </div>
      {open && (
        <p className="mt-2 pt-2 border-t border-slate-700/50 text-xs text-slate-400 leading-relaxed">
          {metric.detail}
        </p>
      )}
    </div>
  )
}

function CohortSection({ cohort }: { cohort: Cohort }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/50 transition-colors mb-3"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-lg">{cohort.icon}</span>
          <span className="font-display font-semibold text-slate-200 text-sm">{cohort.label}</span>
          <ScoreBadge score={cohort.score} label={cohort.label} />
        </div>
        {collapsed
          ? <ChevronDown className="w-4 h-4 text-slate-500" />
          : <ChevronUp className="w-4 h-4 text-slate-500" />
        }
      </button>
      {!collapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {cohort.metrics.map(m => (
            <MetricCard key={m.id} metric={m} />
          ))}
        </div>
      )}
    </div>
  )
}

function OverallScore({ data }: { data: CountryData }) {
  const scores = data.cohorts.map(c => c.score)
  const reds = scores.filter(s => s === 'red').length
  const yellows = scores.filter(s => s === 'yellow').length
  const overall = reds >= 2 ? 'red' : yellows >= 2 ? 'yellow' : 'green'
  const labels = { green: 'Stabil', yellow: 'Unter Druck', red: 'Kritisch' }
  const colors = {
    green: 'text-emerald-400',
    yellow: 'text-amber-400',
    red: 'text-red-400',
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`font-display font-bold text-2xl ${colors[overall]}`}>
        {labels[overall]}
      </div>
      <div className="flex gap-1">
        {scores.map((s, i) => (
          <StatusDot key={i} status={s} />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeCountry] = useState('us')
  const data = activeCountry === 'us' ? usData : usData

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <header className="border-b border-slate-800/80 sticky top-0 z-10 backdrop-blur-sm" style={{ background: 'rgba(8,12,20,0.92)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg tracking-tight" style={{ color: 'var(--accent-cyan)' }}>
              PRAGMATIFY
            </span>
            <span className="text-slate-600 text-xs font-mono hidden sm:block">Economic Pulse</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs text-slate-500 font-mono">{data.lastUpdated}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Country Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {countries.map(c => (
            <button
              key={c.id}
              disabled={!c.available}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-body transition-all whitespace-nowrap ${
                c.id === activeCountry
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                  : c.available
                  ? 'border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                  : 'border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
              {!c.available && <span className="text-xs text-slate-600">bald</span>}
            </button>
          ))}
        </div>

        {/* Country Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-100 mb-1">
              {data.flag} {data.name}
            </h1>
            <p className="text-slate-500 text-sm font-mono">Wirtschaftlicher Gesamtzustand</p>
          </div>
          <OverallScore data={data} />
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-6 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Gesund</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>Angespannt</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>Kritisch</span>
          <span className="ml-2 text-slate-600">· Klick auf Metric für Details</span>
        </div>

        {/* Cohorts */}
        <div className="flex flex-col gap-6">
          {data.cohorts.map(cohort => (
            <CohortSection key={cohort.id} cohort={cohort} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-600 font-mono flex flex-col sm:flex-row gap-2 justify-between">
          <span>Daten: FRED, World Bank, BLS, Census Bureau, MBA · Mock-Stand {data.lastUpdated}</span>
          <span>Klick auf Metrik = Erklärung</span>
        </div>
      </main>
    </div>
  )
}
