import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found · BreatheWise AI'
  }, [])

  return (
    <article className="section">
      <p className="eyebrow">404</p>
      <h1>This page is not part of BreatheWise</h1>
      <p className="purpose">The address does not match a section of the lab.</p>
      <p>
        <Link to="/">Return to Atmosphere</Link>
      </p>
    </article>
  )
}
