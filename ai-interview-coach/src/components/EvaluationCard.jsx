import { parseEvaluation, scoreColor, clamp } from '../utils/helpers'

function ScoreRing({ score }) {
  const pct = clamp((score ?? 0) / 10, 0, 1)
  const r = 28
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - pct)

  const color = score >= 8 ? '#10b98a' : score >= 5 ? '#eab308' : '#ef4444'

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg viewBox="0 0 70 70" className="w-20 h-20 -rotate-90">
        <circle cx="35" cy="35" r={r} fill="none" stroke="#30363d" strokeWidth="6"/>
        <circle
          cx="35" cy="35" r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-display font-800 text-xl leading-none ${scoreColor(score)}`}>
          {score?.toFixed(1) ?? '—'}
        </span>
        <span className="text-xs text-gray-500 font-mono">/10</span>
      </div>
    </div>
  )
}

function ProgressBar({ label, value, max = 10 }) {
  const pct = clamp((value / max) * 100, 0, 100)
  const color = value >= 8 ? 'from-brand-500 to-teal-400'
              : value >= 5 ? 'from-yellow-500 to-amber-400'
              : 'from-red-500 to-rose-400'
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-gray-300 font-body">{label}</span>
        <span className="font-mono text-gray-400">{value}/{max}</span>
      </div>
      <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function EvaluationCard({ evaluation, questionPreview }) {
  const { score, strengths, weaknesses, raw } = parseEvaluation(evaluation)

  return (
    <div className="card p-5 space-y-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start gap-4">
        <ScoreRing score={score} />
        <div className="flex-1 min-w-0">
          <div className="section-label mb-1">AI Evaluation</div>
          {questionPreview && (
            <p className="text-sm text-gray-400 line-clamp-2 leading-snug">
              {questionPreview}
            </p>
          )}
          {score !== null && (
            <ProgressBar label="Overall Score" value={score} />
          )}
        </div>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-xs font-mono font-500 text-brand-400 uppercase tracking-wider">
            <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
              <path d="M2 6.5l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Strengths
          </h4>
          <ul className="space-y-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-brand-500 shrink-0"/>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 text-xs font-mono font-500 text-yellow-400 uppercase tracking-wider">
            <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
              <path d="M6 4v3M6 9v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            Areas to Improve
          </h4>
          <ul className="space-y-1.5">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-yellow-500 shrink-0"/>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Raw fallback */}
      {strengths.length === 0 && weaknesses.length === 0 && raw && (
        <div className="bg-surface-2 rounded-lg p-4 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap border border-surface-border">
          {raw}
        </div>
      )}
    </div>
  )
}
