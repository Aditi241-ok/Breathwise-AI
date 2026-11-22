import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'The page failed to render.'

  return (
    <main className="route-error">
      <p className="eyebrow">Something went wrong</p>
      <h1>{message}</h1>
      <p>
        <Link to="/">Return to Atmosphere</Link>
      </p>
    </main>
  )
}
