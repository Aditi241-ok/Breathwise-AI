import { env } from '@/config/env.ts'

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/**
 * All browser requests go through the BreatheWise API.
 * Feature modules call typed functions in this folder. Components do not call fetch.
 */
export async function apiGet(path: string, signal?: AbortSignal): Promise<unknown> {
  const url = `${env.apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
  let response: Response

  try {
    response = await fetch(url, {
      method: 'GET',
      signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }

    throw new ApiError('The BreatheWise API could not be reached.', 0)
  }

  if (!response.ok) {
    throw new ApiError(`The BreatheWise API returned status ${response.status}.`, response.status)
  }

  try {
    return await response.json()
  } catch {
    throw new ApiError('The BreatheWise API returned a response that was not JSON.', response.status)
  }
}
