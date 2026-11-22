
import { apiGet } from '@/api/client.ts'
import type { AirQualitySnapshot } from '@/types/airQuality.ts'

/**
 * Fetches air-quality information for a location.
 */
export async function getAirQuality(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<AirQualitySnapshot> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
  })

  const response = await apiGet(
    `/air-quality?${params.toString()}`,
    signal,
  )

  return response as AirQualitySnapshot
}
