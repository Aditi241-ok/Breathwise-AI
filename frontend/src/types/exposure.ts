import type { PollutantCode } from '@/types/airQuality.ts'

export type ExposureSetting = 'indoor' | 'outdoor'

/**
 * A block of the user's day.
 * Times are minutes from local midnight, in the range 0–1440, with end after start.
 * The exposure engine is Phase 4. This type only fixes the contract.
 */
export type ScheduleInterval = {
  id: string
  label: string
  locationLabel: string
  setting: ExposureSetting
  startMinutes: number
  endMinutes: number
}

/**
 * Concentration-time for one pollutant: E = Σ(Cᵢ × Tᵢ).
 * This is an indicator of time spent near a concentration, not an inhaled dose
 * and not a medical result. Pollutants stay in separate series.
 */
export type PollutantExposure = {
  code: PollutantCode
  /** Sum of concentration × hours for intervals that had a concentration. */
  concentrationTime: number | null
  unit: string
  intervalsCovered: number
  intervalsMissingConcentration: number
}
