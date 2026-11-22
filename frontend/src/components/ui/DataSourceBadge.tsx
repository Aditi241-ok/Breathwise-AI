
type DataSource = 'measured' | 'predicted' | 'estimated' | 'demonstration'

type DataSourceBadgeProps = {
  source: DataSource
}

export function DataSourceBadge({ source }: DataSourceBadgeProps) {
  const labels: Record<DataSource, string> = {
    measured: 'Measured',
    predicted: 'Predicted',
    estimated: 'Estimated',
    demonstration: 'Demo data',
  }

  return (
    <span className={`data-badge data-badge-${source}`}>
      <span className="data-badge-dot" aria-hidden="true" />
      {labels[source]}
    </span>
  )
}
