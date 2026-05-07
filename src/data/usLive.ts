import { usData, type CountryData } from './us'
import { fetchFredLatest } from '../lib/fred'

const FRED_API_KEY = '548516967661e1619952c7570dfc6a2c'

const SERIES = {
  debtToGdp: 'GFDEGDQ188S',
  tenYearYield: 'DGS10',
  savingsRate: 'PSAVERT',
  u6: 'U6RATE',
  mortgage30y: 'MORTGAGE30US',
  housingStarts: 'HOUST',
  jobOpenings: 'JTSJOL',
  unemployed: 'UNEMPLOY',
} as const

function cloneData(): CountryData {
  return JSON.parse(JSON.stringify(usData))
}

function format(value: number, digits = 1): string {
  return value.toFixed(digits)
}

function setMetric(data: CountryData, id: string, patch: Partial<{ value: string; trendValue: string; trend: 'up' | 'down' | 'flat' }>) {
  for (const cohort of data.cohorts) {
    const metric = cohort.metrics.find((m) => m.id === id)
    if (metric) {
      if (patch.value !== undefined) metric.value = patch.value
      if (patch.trendValue !== undefined) metric.trendValue = patch.trendValue
      if (patch.trend !== undefined) metric.trend = patch.trend
      return
    }
  }
}

export async function getUSLiveData(): Promise<CountryData> {
  const data = cloneData()

  try {
    const [debtToGdp, tenYearYield, savingsRate, u6, mortgage30y, housingStarts, jobOpenings, unemployed] = await Promise.all([
      fetchFredLatest(SERIES.debtToGdp, FRED_API_KEY),
      fetchFredLatest(SERIES.tenYearYield, FRED_API_KEY),
      fetchFredLatest(SERIES.savingsRate, FRED_API_KEY),
      fetchFredLatest(SERIES.u6, FRED_API_KEY),
      fetchFredLatest(SERIES.mortgage30y, FRED_API_KEY),
      fetchFredLatest(SERIES.housingStarts, FRED_API_KEY),
      fetchFredLatest(SERIES.jobOpenings, FRED_API_KEY),
      fetchFredLatest(SERIES.unemployed, FRED_API_KEY),
    ])

    if (debtToGdp) {
      setMetric(data, 'debt-gdp', {
        value: format(debtToGdp.latest, 1),
        trendValue: debtToGdp.previous == null ? undefined : `${debtToGdp.latest - debtToGdp.previous >= 0 ? '+' : ''}${(debtToGdp.latest - debtToGdp.previous).toFixed(1)}pp`,
        trend: debtToGdp.previous == null ? 'flat' : debtToGdp.latest >= debtToGdp.previous ? 'up' : 'down',
      })
      data.lastUpdated = debtToGdp.date
    }

    if (tenYearYield) {
      setMetric(data, 'yield10y', {
        value: format(tenYearYield.latest, 2),
        trendValue: tenYearYield.previous == null ? undefined : `${tenYearYield.latest - tenYearYield.previous >= 0 ? '+' : ''}${(tenYearYield.latest - tenYearYield.previous).toFixed(2)}pp`,
        trend: tenYearYield.previous == null ? 'flat' : tenYearYield.latest >= tenYearYield.previous ? 'up' : 'down',
      })
    }

    if (savingsRate) {
      setMetric(data, 'savings-rate', {
        value: format(savingsRate.latest, 1),
        trendValue: savingsRate.previous == null ? undefined : `${savingsRate.latest - savingsRate.previous >= 0 ? '+' : ''}${(savingsRate.latest - savingsRate.previous).toFixed(1)}pp`,
        trend: savingsRate.previous == null ? 'flat' : savingsRate.latest >= savingsRate.previous ? 'up' : 'down',
      })
    }

    if (u6) {
      setMetric(data, 'u6', {
        value: format(u6.latest, 1),
        trendValue: u6.previous == null ? undefined : `${u6.latest - u6.previous >= 0 ? '+' : ''}${(u6.latest - u6.previous).toFixed(1)}pp`,
        trend: u6.previous == null ? 'flat' : u6.latest >= u6.previous ? 'up' : 'down',
      })
    }

    if (mortgage30y) {
      setMetric(data, 'mortgage-rate', {
        value: format(mortgage30y.latest, 2),
        trendValue: mortgage30y.previous == null ? undefined : `${mortgage30y.latest - mortgage30y.previous >= 0 ? '+' : ''}${(mortgage30y.latest - mortgage30y.previous).toFixed(2)}pp`,
        trend: mortgage30y.previous == null ? 'flat' : mortgage30y.latest >= mortgage30y.previous ? 'up' : 'down',
      })
    }

    if (housingStarts) {
      setMetric(data, 'housing-starts', {
        value: format(housingStarts.latest / 1000, 2),
        trendValue:
          housingStarts.previous == null
            ? undefined
            : `${housingStarts.latest - housingStarts.previous >= 0 ? '+' : ''}${(((housingStarts.latest - housingStarts.previous) / housingStarts.previous) * 100).toFixed(1)}%`,
        trend: housingStarts.previous == null ? 'flat' : housingStarts.latest >= housingStarts.previous ? 'up' : 'down',
      })
    }

    if (jobOpenings && unemployed && unemployed.latest > 0) {
      const ratio = (jobOpenings.latest * 1000) / unemployed.latest
      setMetric(data, 'jolts-ratio', {
        value: format(ratio, 2),
        trendValue: 'live',
        trend: 'flat',
      })
    }
  } catch {
    // fallback to static values
  }

  return data
}
