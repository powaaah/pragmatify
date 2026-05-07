const FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations'

export interface FredPoint {
  latest: number
  previous: number | null
  date: string
}

export async function fetchFredLatest(seriesId: string, apiKey: string): Promise<FredPoint | null> {
  const url = new URL(FRED_BASE_URL)
  url.searchParams.set('series_id', seriesId)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('file_type', 'json')
  url.searchParams.set('sort_order', 'desc')
  url.searchParams.set('limit', '6')

  const res = await fetch(url.toString())
  if (!res.ok) return null

  const json = await res.json()
  const observations = (json?.observations ?? []) as Array<{ date: string; value: string }>
  const valid = observations
    .filter((o) => o.value !== '.')
    .map((o) => ({ date: o.date, value: Number(o.value) }))
    .filter((o) => Number.isFinite(o.value))

  if (!valid.length) return null

  return {
    latest: valid[0].value,
    previous: valid[1]?.value ?? null,
    date: valid[0].date,
  }
}
