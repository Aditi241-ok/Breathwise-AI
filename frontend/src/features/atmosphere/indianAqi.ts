
import type {
  DataOrigin,
  PollutantCode,
} from '@/types/airQuality.ts'

/**
 * Indian CPCB AQI calculation module.
 *
 * Accepts validated pollutant averages, not raw hourly readings.
 * Concentrations must use the correct units and averaging periods.
 */

export type IndianAqiCategory =
  | 'Good'
  | 'Satisfactory'
  | 'Moderate'
  | 'Poor'
  | 'Very Poor'
  | 'Severe'

export type IndianAqiAverage = {
  code: PollutantCode
  value: number | null
  unit: string
  averagingPeriodHours: number
  hoursCovered: number
  origin: DataOrigin
}

type ConcentrationBand = {
  concentrationLow: number
  concentrationHigh: number
  aqiLow: number
  aqiHigh: number
}

type PollutantStandard = {
  label: string
  unit: string
  averagingPeriodHours: number
  precision: number
  bands: ConcentrationBand[]
  severeAbove: number
}

export type PollutantSubIndex = {
  code: PollutantCode
  label: string
  concentration: number
  unit: string
  value: number
  category: IndianAqiCategory
}

export type IndianAqiResult = {
  status: 'available' | 'insufficient'
  aqi: number | null
  category: IndianAqiCategory | null
  dominantPollutant: PollutantCode | null
  subIndices: PollutantSubIndex[]
  validPollutantCount: number
  message: string
}

const createBands = (
  ranges: Array<[number, number]>,
): ConcentrationBand[] => {
  const aqiRanges: Array<[number, number]> = [
    [0, 50],
    [51, 100],
    [101, 200],
    [201, 300],
    [301, 400],
  ]

  return ranges.map(([low, high], index) => ({
    concentrationLow: low,
    concentrationHigh: high,
    aqiLow: aqiRanges[index][0],
    aqiHigh: aqiRanges[index][1],
  }))
}

/**
 * CPCB concentration breakpoints.
 *
 * PM10, PM2.5, NO2, SO2, NH3 and Pb use 24-hour averages.
 * CO and O3 use 8-hour averages.
 *
 * CO is measured in mg/m³.
 * All other pollutants are measured in µg/m³.
 */
const STANDARDS: Record<PollutantCode, PollutantStandard> = {
  pm10: {
    label: 'PM10',
    unit: 'µg/m³',
    averagingPeriodHours: 24,
    precision: 0,
    bands: createBands([
      [0, 50],
      [51, 100],
      [101, 250],
      [251, 350],
      [351, 430],
    ]),
    severeAbove: 430,
  },

  pm2_5: {
    label: 'PM2.5',
    unit: 'µg/m³',
    averagingPeriodHours: 24,
    precision: 0,
    bands: createBands([
      [0, 30],
      [31, 60],
      [61, 90],
      [91, 120],
      [121, 250],
    ]),
    severeAbove: 250,
  },

  nitrogen_dioxide: {
    label: 'NO2',
    unit: 'µg/m³',
    averagingPeriodHours: 24,
    precision: 0,
    bands: createBands([
      [0, 40],
      [41, 80],
      [81, 180],
      [181, 280],
      [281, 400],
    ]),
    severeAbove: 400,
  },

  sulphur_dioxide: {
    label: 'SO2',
    unit: 'µg/m³',
    averagingPeriodHours: 24,
    precision: 0,
    bands: createBands([
      [0, 40],
      [41, 80],
      [81, 380],
      [381, 800],
      [801, 1600],
    ]),
    severeAbove: 1600,
  },

  ozone: {
    label: 'O3',
    unit: 'µg/m³',
    averagingPeriodHours: 8,
    precision: 0,
    bands: createBands([
      [0, 50],
      [51, 100],
      [101, 168],
      [169, 208],
      [209, 748],
    ]),
    severeAbove: 748,
  },

  carbon_monoxide: {
    label: 'CO',
    unit: 'mg/m³',
    averagingPeriodHours: 8,
    precision: 1,
    bands: createBands([
      [0, 1.0],
      [1.1, 2.0],
      [2.1, 10.0],
      [10.1, 17.0],
      [17.1, 34.0],
    ]),
    severeAbove: 34.0,
  },

  ammonia: {
    label: 'NH3',
    unit: 'µg/m³',
    averagingPeriodHours: 24,
    precision: 0,
    bands: createBands([
      [0, 200],
      [201, 400],
      [401, 800],
      [801, 1200],
      [1201, 1800],
    ]),
    severeAbove: 1800,
  },

  lead: {
    label: 'Pb',
    unit: 'µg/m³',
    averagingPeriodHours: 24,
    precision: 1,
    bands: createBands([
      [0, 0.5],
      [0.6, 1.0],
      [1.1, 2.0],
      [2.1, 3.0],
      [3.1, 3.5],
    ]),
    severeAbove: 3.5,
  },
}

const PARTICULATE_POLLUTANTS: PollutantCode[] = [
  'pm2_5',
  'pm10',
]

const CATEGORY_RANGES: Array<{
  minimum: number
  maximum: number
  category: IndianAqiCategory
}> = [
  { minimum: 0, maximum: 50, category: 'Good' },
  { minimum: 51, maximum: 100, category: 'Satisfactory' },
  { minimum: 101, maximum: 200, category: 'Moderate' },
  { minimum: 201, maximum: 300, category: 'Poor' },
  { minimum: 301, maximum: 400, category: 'Very Poor' },
  { minimum: 401, maximum: 500, category: 'Severe' },
]

function roundConcentration(
  value: number,
  precision: number,
): number {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

export function getIndianAqiCategory(
  aqi: number,
): IndianAqiCategory | null {
  if (!Number.isFinite(aqi) || aqi < 0 || aqi > 500) {
    return null
  }

  return (
    CATEGORY_RANGES.find(
      (range) => aqi >= range.minimum && aqi <= range.maximum,
    )?.category ?? null
  )
}

/**
 * Calculates an individual pollutant sub-index.
 *
 * Returns null if the concentration is invalid or unavailable.
 */
export function calculatePollutantSubIndex(
  code: PollutantCode,
  concentration: number,
): number | null {
  const standard = STANDARDS[code]

  if (
    !Number.isFinite(concentration) ||
    concentration < 0
  ) {
    return null
  }

  const value = roundConcentration(
    concentration,
    standard.precision,
  )

  if (value > standard.severeAbove) {
    return 500
  }

  const band = standard.bands.find(
    (item) =>
      value >= item.concentrationLow &&
      value <= item.concentrationHigh,
  )

  if (!band) {
    return null
  }

  const interpolated =
    ((band.aqiHigh - band.aqiLow) /
      (band.concentrationHigh - band.concentrationLow)) *
      (value - band.concentrationLow) +
    band.aqiLow

  return Math.min(
    500,
    Math.max(0, Math.round(interpolated)),
  )
}

function validateAverage(
  reading: IndianAqiAverage,
): boolean {
  const standard = STANDARDS[reading.code]

  if (reading.value === null) return false

  if (
    !Number.isFinite(reading.value) ||
    reading.value < 0
  ) {
    return false
  }

  if (reading.origin !== 'measured') return false

  if (reading.unit !== standard.unit) return false

  if (
    reading.averagingPeriodHours !==
    standard.averagingPeriodHours
  ) {
    return false
  }

  if (
    !Number.isFinite(reading.hoursCovered) ||
    reading.hoursCovered < 16
  ) {
    return false
  }

  return true
}

/**
 * Calculates the overall Indian CPCB AQI.
 *
 * Requirements:
 * - At least three valid pollutant sub-indices.
 * - At least one particulate pollutant (PM2.5 or PM10).
 * - Only measured, validated pollutant averages.
 *
 * The highest valid pollutant sub-index determines the AQI.
 */
export function calculateIndianAqi(
  readings: IndianAqiAverage[],
): IndianAqiResult {
  const subIndices: PollutantSubIndex[] = []
  const seen = new Set<PollutantCode>()

  for (const reading of readings) {
    if (seen.has(reading.code)) continue

    seen.add(reading.code)

    if (!validateAverage(reading)) continue

    const standard = STANDARDS[reading.code]

    const subIndex = calculatePollutantSubIndex(
      reading.code,
      reading.value!,
    )

    if (subIndex === null) continue

    const category = getIndianAqiCategory(subIndex)

    if (!category) continue

    subIndices.push({
      code: reading.code,
      label: standard.label,
      concentration: roundConcentration(
        reading.value!,
        standard.precision,
      ),
      unit: standard.unit,
      value: subIndex,
      category,
    })
  }

  const hasParticulateData = subIndices.some(
    (item) =>
      PARTICULATE_POLLUTANTS.includes(item.code),
  )

  if (subIndices.length < 3 || !hasParticulateData) {
    return {
      status: 'insufficient',
      aqi: null,
      category: null,
      dominantPollutant: null,
      subIndices,
      validPollutantCount: subIndices.length,
      message:
        'Insufficient data for calculating Indian AQI. At least three valid pollutants, including PM2.5 or PM10, are required.',
    }
  }

  const dominant = subIndices.reduce((highest, current) =>
    current.value > highest.value ? current : highest,
  )

  return {
    status: 'available',
    aqi: dominant.value,
    category: dominant.category,
    dominantPollutant: dominant.code,
    subIndices,
    validPollutantCount: subIndices.length,
    message: `Indian AQI is ${dominant.value} (${dominant.category}). Dominant pollutant: ${dominant.label}.`,
  }
}
