import { useRef, useEffect } from 'react'

export default function AnswerInput({ value, onChange, onSubmit, onSkip, disabled, submitting }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && !disabled) ref.current.focus()
  }, [disabled])

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      onSubmit?.()
    }
  }

  const charCount = value?.length || 0
  const isGood = charCount >= 80

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="section-label">Your Answer</span>
        <span className={`text-xs font-mono transition-colors ${
          isGood ? 'text-brand-400' : 'text-gray-500'
        }`}>
          {charCount} chars {charCount > 0 && !isGood && '· keep going'}
        </span>
      </div>

      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
        placeholder="Type your answer here… (Ctrl+Enter to submit)"
        rows={6}
        className="textarea-field disabled:opacity-50"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={onSubmit}
          disabled={disabled || !value?.trim() || submitting}
          className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2"/>
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Evaluating…
            </>
          ) : (
            <>
              Submit Answer
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>

        <button
          onClick={onSkip}
          disabled={disabled || submitting}
          className="btn-secondary px-4 disabled:opacity-40"
          title="Skip to next question"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M4 4l6 4-6 4V4zM12 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Skip
        </button>
      </div>

      <p className="text-xs text-gray-500">Ctrl + Enter to submit quickly</p>
    </div>
  )
}
