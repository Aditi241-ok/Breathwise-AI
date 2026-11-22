import { NavLink, Outlet } from 'react-router-dom'
import { BackendStatus } from '@/components/status/BackendStatus.tsx'
import { sections } from '@/app/sections.ts'
import '@/styles/shell.css'

export function AppShell() {
  return (
    <div className="shell">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="topbar">
        <div>
          <p className="mark">BreatheWise AI</p>
          <p className="tagline">See what you breathe. Understand what surrounds you.</p>
        </div>
        <BackendStatus />
      </header>
      <div className="frame">
        <nav className="nav" aria-label="Primary">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <NavLink to={section.path} end={section.path === '/'}>
                  {section.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <main id="content" className="content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
