import { fetchFredSeries } from './fred'

export interface MacroPoint {
  label: string
  value: number
}

const FRED_API_KEY = '548516…6a2c'

const FRED_BY_METRIC: Record<string, string> = {
  'debt-gdp': 'GFDEGDQ188S',
  yield10y: 'DGS10',
  'savings-rate': 'PSAVERT',
  u6: 'U6RATE',
  'mortgage-rate': 'MORTGAGE30US',
  'housing-starts': 'HOUST',
}

const WORLD_BANK_INDICATOR: Record<string, string> = {
  'gdp-growth': 'NY.GDP.MKTP.KD.ZG',
  inflation: 'FP.CPI.TOTL.ZG',
  unemployment: 'SL.UEM.TOTL.ZS',
}

const WORLD_BANK_COUNTRY: Record<string, string> = {
  de: 'DEU',
  cn: 'CHN',
  in: 'IND',
}

async function fetchWorldBankSeries(country: string, indicator: string): Promise<MacroPoint[]> {
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=80`
  const res = await fetch(url)
  if (!res.ok) return []
  const json = await res.json()
  const rows = Array.isArray(json?.[1]) ? json[1] : []

  return rows
    .filter((r: any) => r?.value != null && Number.isFinite(Number(r.value)))
    .map((r: any) => ({ label: String(r.date), value: Number(r.value) }))
    .sort((a: MacroPoint, b: MacroPoint) => Number(a.label) - Number(b.label))
}

export async function fetchMacroSeries(countryId: string, metricId: string, points: number): Promise<{ points: MacroPoint[]; source: string } | null> {
  if (countryId === 'us') {
    const fred = FRED_BY_METRIC[metricId]
    if (!fred) return null
    const data = await fetchFredSeries(fred, FRED_API_KEY, Math.max(points, 36))
    if (!data.length) return null
    return {
      points: data.slice(-points).map((p) => ({ label: p.date.slice(0, 7), value: Number(p.value.toFixed(2)) })),
      source: 'FRED Originaldaten',
    }
  }

  const wbCountry = WORLD_BANK_COUNTRY[countryId]
  const wbIndicator = WORLD_BANK_INDICATOR[metricId]
  if (!wbCountry || !wbIndicator) return null

  const data = await fetchWorldBankSeries(wbCountry, wbIndicator)
  if (!data.length) return null
  return {
    points: data.slice(-points).map((p) => ({ label: p.label, value: Number(p.value.toFixed(2)) })),
    source: 'World Bank Originaldaten',
  }
}

