export function Loader({ size = 'md', label = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg
        className={`${sizes[size]} animate-spin text-brand-400`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2"/>
        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      {label && <p className="text-sm text-gray-400 font-body">{label}</p>}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <span className="typing-dot bg-brand-400"/>
      <span className="typing-dot bg-brand-400"/>
      <span className="typing-dot bg-brand-400"/>
    </div>
  )
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card p-5 space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 rounded-full shimmer-bg ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  )
}
