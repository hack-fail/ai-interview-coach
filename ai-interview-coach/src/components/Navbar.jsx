import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useInterview } from '../hooks/useInterviewContext'

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/upload',     label: 'Upload CV' },
  { to: '/interview',  label: 'Interview' },
  { to: '/evaluation', label: 'Results' },
]

export default function Navbar() {
  const { toggle, isDark } = useTheme()
  const { resumeUploaded, resumeFileName } = useInterview()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center
                          group-hover:bg-brand-400 transition-colors">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white">
              <path d="M10 2L3 7v6l7 5 7-5V7L10 2z" stroke="currentColor" strokeWidth="1.5"
                    strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
              <circle cx="10" cy="10" r="2.5" fill="currentColor"/>
            </svg>
          </div>
          <span className="font-display font-700 text-base text-gray-100 tracking-tight">
            Interview<span className="text-brand-400">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-body transition-all duration-150 ${
                  isActive
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-surface-3'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          {/* Resume status chip */}
          {resumeUploaded && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full
                            bg-brand-500/10 border border-brand-500/25 text-xs font-mono text-brand-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow"/>
              <span className="max-w-[120px] truncate">{resumeFileName || 'CV loaded'}</span>
            </div>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       text-gray-400 hover:text-gray-100 hover:bg-surface-3 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                <path fillRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd"/>
                <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.22 3.22l1.42 1.42M15.36 15.36l1.42 1.42M3.22 16.78l1.42-1.42M15.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
              </svg>
            )}
          </button>

          {/* Start Interview CTA */}
          <Link to="/upload" className="hidden sm:inline-flex btn-primary text-xs px-4 py-2">
            Get Started
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg
                       text-gray-400 hover:bg-surface-3 transition-all"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface-1 px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm ${
                  isActive
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-gray-400 hover:text-gray-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
