/**
 * Public runtime configuration.
 * Values prefixed with VITE_ are visible in the browser. Never put secrets here.
 * The Open-Meteo key is intentionally absent: that provider is called by the API, not the UI.
 */
function readUrl(value: string | undefined, fallback: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    return fallback
  }

  return value.trim().replace(/\/+$/, '')
}

export const env = {
  apiBaseUrl: readUrl(import.meta.env.VITE_API_BASE_URL, 'http://127.0.0.1:8000'),
  isDev: import.meta.env.DEV,
} as const
