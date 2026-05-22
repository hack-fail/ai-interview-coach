import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center gap-5">
      <div className="font-display font-800 text-8xl text-surface-border select-none">404</div>
      <div>
        <h1 className="font-display font-700 text-2xl text-gray-100 mb-2">Page not found</h1>
        <p className="text-gray-400 text-sm">This page doesn't exist or was moved.</p>
      </div>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )
}
