import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useInterview } from '../hooks/useInterviewContext'
import EvaluationCard from '../components/EvaluationCard'
import { parseEvaluation, scoreColor, levelLabel, clamp } from '../utils/helpers'

function StatCard({ value, label, sub, color = 'text-brand-400' }) {
  return (
    <div className="card p-5 text-center">
      <div className={`font-display font-800 text-4xl ${color} mb-1`}>{value}</div>
      <div className="text-sm text-gray-300 font-body">{label}</div>
      {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
    </div>
  )
}

function ScoreBar({ question, score, index }) {
  const pct = clamp((score / 10) * 100, 0, 100)
  const color = score >= 8 ? 'from-brand-500 to-teal-400'
              : score >= 5 ? 'from-yellow-500 to-amber-400'
              : 'from-red-500 to-rose-400'
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-gray-400 truncate flex-1">
          <span className="font-mono text-brand-500 mr-2">Q{index}</span>
          {question.slice(0, 70)}{question.length > 70 ? '…' : ''}
        </span>
        <span className={`font-mono font-600 shrink-0 ${scoreColor(score)}`}>{score}/10</span>
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

export default function EvaluationPage() {
  const { sessionHistory, candidateLevel, resetSession } = useInterview()

  const stats = useMemo(() => {
    if (!sessionHistory.length) return null
    const scores = sessionHistory
      .map((e) => parseEvaluation(e.evaluation).score)
      .filter((s) => s !== null)
    const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null
    const best = scores.length ? Math.max(...scores) : null
    const worst = scores.length ? Math.min(...scores) : null
    return { avg, best, worst, count: sessionHistory.length, scored: scores.length }
  }, [sessionHistory])

  if (!sessionHistory.length) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-surface-border
                        mx-auto flex items-center justify-center text-gray-500">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="font-display font-700 text-2xl text-gray-100">No results yet</h2>
        <p className="text-gray-400">Complete at least one interview question to see your performance here.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/upload" className="btn-primary">Upload Resume</Link>
          <Link to="/interview" className="btn-secondary">Go to Interview</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="section-label mb-1">Step 4 · Results</p>
          <h1 className="font-display font-800 text-3xl text-gray-50">
            Session Performance
          </h1>
          {candidateLevel && (
            <p className="text-sm text-gray-400 mt-1">
              Level: <span className="text-brand-400">{levelLabel(candidateLevel)}</span>
              {' · '}{stats.count} question{stats.count !== 1 ? 's' : ''} answered
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Link to="/interview" className="btn-secondary text-sm">
            Continue Session
          </Link>
          <button
            onClick={resetSession}
            className="btn-ghost text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Stats grid */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger-children">
          <StatCard
            value={stats.avg !== null ? stats.avg.toFixed(1) : '—'}
            label="Average Score"
            sub="out of 10"
            color={scoreColor(stats.avg)}
          />
          <StatCard
            value={stats.best !== null ? stats.best : '—'}
            label="Best Score"
            color="text-brand-400"
          />
          <StatCard
            value={stats.worst !== null ? stats.worst : '—'}
            label="Lowest Score"
            color={scoreColor(stats.worst)}
          />
          <StatCard
            value={stats.count}
            label="Questions"
            sub={`${stats.scored} scored`}
            color="text-blue-400"
          />
        </div>
      )}

      {/* Score bars */}
      <div className="card p-5 space-y-4">
        <h2 className="font-display font-600 text-gray-100 text-sm flex items-center gap-2">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-brand-400">
            <path d="M2 12V8M6 12V4M10 12V6M14 12V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Score Breakdown
        </h2>
        <div className="space-y-4">
          {sessionHistory.map((entry, i) => {
            const { score } = parseEvaluation(entry.evaluation)
            return (
              <ScoreBar
                key={i}
                question={entry.question}
                score={score ?? 0}
                index={i + 1}
              />
            )
          })}
        </div>
      </div>

      {/* Detailed evaluations */}
      <div className="space-y-4">
        <h2 className="font-display font-600 text-gray-100 text-sm">Detailed Feedback</h2>
        {sessionHistory.map((entry, i) => (
          <EvaluationCard
            key={i}
            evaluation={entry.evaluation}
            questionPreview={`Q${i + 1}: ${entry.question}`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="card p-6 text-center border-brand-500/20 space-y-3">
        <h3 className="font-display font-700 text-lg text-gray-100">Ready to improve further?</h3>
        <p className="text-sm text-gray-400">
          Upload a fresh resume or continue your session with more questions.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link to="/upload" className="btn-primary">New Session</Link>
          <Link to="/interview" className="btn-secondary">More Questions</Link>
        </div>
      </div>
    </div>
  )
}
