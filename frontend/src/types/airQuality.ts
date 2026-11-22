/** Internal pollutant identifiers used by BreatheWise AI. */
export type PollutantCode =
  | 'pm2_5'
  | 'pm10'
  | 'nitrogen_dioxide'
  | 'sulphur_dioxide'
  | 'ozone'
  | 'carbon_monoxide'
  | 'ammonia'
  | 'lead'
/**
 * Where a number came from.
 * The UI must keep these origins visible. Demonstration values are never live readings.
 */
export type DataOrigin = 'measured' | 'predicted' | 'estimated' | 'demonstration'

export type GeoPoint = {
  latitude: number
  longitude: number
  label: string
}

export type PollutantReading = {
  code: PollutantCode
  /** Null means the provider did not return this pollutant. Do not fill the gap. */
  value: number | null
  unit: string
  origin: DataOrigin
  observedAt: string | null
}

/**
 * One location at one moment.
 * `aqi` and `aqiScale` travel together so the interface never assumes US AQI or European AQI.
 */
export type AirQualitySnapshot = {
  location: GeoPoint
  aqi: number | null
  aqiScale: 'indian' | 'european' | 'us' | null
  readings: PollutantReading[]
  source: string
  retrievedAt: string
}

export type PollutantDefinition = {
  code: PollutantCode
  label: string
  unit: string
}

export const POLLUTANTS = [
  { code: 'pm2_5', label: 'PM2.5', unit: 'µg/m³' },
  { code: 'pm10', label: 'PM10', unit: 'µg/m³' },
  { code: 'nitrogen_dioxide', label: 'NO2', unit: 'µg/m³' },
  { code: 'sulphur_dioxide', label: 'SO2', unit: 'µg/m³' },
  { code: 'ozone', label: 'O3', unit: 'µg/m³' },
  { code: 'carbon_monoxide', label: 'CO', unit: 'µg/m³' },
  { code: 'ammonia', label: 'NH3', unit: 'µg/m³' },
  { code: 'lead', label: 'Pb', unit: 'µg/m³' },
] as const satisfies readonly PollutantDefinition[]
