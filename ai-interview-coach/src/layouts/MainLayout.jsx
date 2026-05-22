import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-surface-border py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display font-700 text-sm text-gray-500">
            Interview<span className="text-brand-500">AI</span>
          </span>
          <p className="text-xs text-gray-600">
            Powered by LLaMA 3 via Groq · Built for serious candidates
          </p>
        </div>
      </footer>
    </div>
  )
}
