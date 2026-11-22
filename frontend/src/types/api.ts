export type HealthResponse = {
  status: 'ok'
  service: string
}

export type BackendConnectionState = 'loading' | 'reachable' | 'unavailable'

export type BackendConnection = {
  state: BackendConnectionState
  message: string
}
