
type MetricCardProps = {
  label: string
  value: string | number | null
  unit: string
  status?: string
  description?: string
}

export function MetricCard({
  label,
  value,
  unit,
  status,
  description,
}: MetricCardProps) {
  return (
    <article className="metric-card">
      <div className="metric-card-header">
        <span className="metric-label">{label}</span>
        {status && (
          <span className="metric-status">{status}</span>
        )}
      </div>

      <div className="metric-reading">
        <strong>{value ?? '—'}</strong>
        <span>{value === null ? 'Unavailable' : unit}</span>
      </div>

      {description && (
        <p className="metric-description">{description}</p>
      )}
    </article>
  )
}
