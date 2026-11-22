import { useEffect, useState } from 'react'
import { checkBackendHealth } from '@/api/health.ts'
import type { BackendConnection } from '@/types/api.ts'

const HEALTH_TIMEOUT_MS = 4000

const loading: BackendConnection = {
  state: 'loading',
  message: 'Checking the BreatheWise API.',
}

export function useBackendStatus(): BackendConnection {
  const [connection, setConnection] = useState<BackendConnection>(loading)

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS)

    void checkBackendHealth(controller.signal).then((next) => {
      if (active) {
        setConnection(next)
      }
    })

    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  return connection
}
