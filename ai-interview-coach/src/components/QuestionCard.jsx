import { levelLabel } from '../utils/helpers'
import { TypingIndicator } from './Loader'

export default function QuestionCard({ question, level, index, loading }) {
  return (
    <div className="card p-5 space-y-3 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-brand-500/20 border border-brand-500/30
                           flex items-center justify-center text-xs font-mono text-brand-400">
            {index}
          </span>
          <span className="section-label">Question</span>
        </div>
        {level && (
          <span className={`badge text-xs ${
            level === 'expert' ? 'badge-red' :
            level === 'intermediate' ? 'badge-yellow' : 'badge-green'
          }`}>
            {levelLabel(level)}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative">
        {loading ? (
          <div className="flex items-center gap-3 py-2">
            <TypingIndicator />
            <span className="text-sm text-gray-400">Generating question…</span>
          </div>
        ) : (
          <p className="text-gray-100 font-body leading-relaxed text-base">
            {question}
          </p>
        )}
      </div>

      {/* Decorative corner */}
      <div className="absolute top-3 right-3 opacity-10">
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-brand-400">
          <path d="M9 9h6M9 13h4M7 4h10a2 2 0 012 2v10a2 2 0 01-2 2l-4 2-4-2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  )
}
