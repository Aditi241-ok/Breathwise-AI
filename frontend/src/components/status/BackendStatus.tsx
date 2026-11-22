import { useBackendStatus } from '@/hooks/useBackendStatus.ts'

export function BackendStatus() {
  const connection = useBackendStatus()

  return (
    <p className={`status status-${connection.state}`} role="status">
      <span className="status-label">API</span>
      {connection.message}
    </p>
  )
}
