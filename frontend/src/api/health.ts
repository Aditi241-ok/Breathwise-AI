import { apiGet, ApiError } from '@/api/client.ts'
import type { BackendConnection, HealthResponse } from '@/types/api.ts'

function isHealthResponse(value: unknown): value is HealthResponse {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const record = value as Record<string, unknown>
  return record.status === 'ok' && typeof record.service === 'string'
}

/** Confirms the API process is up. It does not imply air-quality data is available. */
export async function checkBackendHealth(signal: AbortSignal): Promise<BackendConnection> {
  try {
    const payload = await apiGet('/health', signal)

    if (!isHealthResponse(payload)) {
      return {
        state: 'unavailable',
        message: 'The API responded, but not with a health check this app understands.',
      }
    }

    return {
      state: 'reachable',
      message: `${payload.service} is reachable. Live air-quality data is not loaded in this phase.`,
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        state: 'unavailable',
        message: 'The API did not respond before the check timed out.',
      }
    }

    if (error instanceof ApiError) {
      return { state: 'unavailable', message: error.message }
    }

    return {
      state: 'unavailable',
      message: 'The API could not be reached. No live readings are shown.',
    }
  }
}
