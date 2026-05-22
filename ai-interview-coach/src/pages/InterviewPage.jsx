import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { askQuestion, regenerateQuestion, evaluateAnswer } from '../services/api'
import { useInterview } from '../hooks/useInterviewContext'
import { useToast } from '../components/Toast'
import QuestionCard from '../components/QuestionCard'
import AnswerInput from '../components/AnswerInput'
import EvaluationCard from '../components/EvaluationCard'
import { Loader } from '../components/Loader'
import { levelLabel } from '../utils/helpers'

export default function InterviewPage() {
  const {
    resumeUploaded,
    currentQuestion, setCurrentQuestion,
    candidateLevel, setCandidateLevel,
    sessionHistory, addToHistory,
    currentAnswer, setCurrentAnswer,
    setLatestEvaluation,
  } = useInterview()

  const [loadingQ, setLoadingQ]     = useState(false)
  const [evaluating, setEvaluating] = useState(false)
  const [questionIdx, setQuestionIdx] = useState(0)

  const addToast  = useToast()
  const navigate  = useNavigate()
  const bottomRef = useRef(null)

  // Load first question on mount
  useEffect(() => {
    if (!currentQuestion) fetchQuestion()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [sessionHistory, currentQuestion])

  const fetchQuestion = async (regen = false) => {
    setLoadingQ(true)
    try {
      const data = regen ? await regenerateQuestion() : await askQuestion()
      if (data.error) {
        addToast({ message: data.error, type: 'error' })
        return
      }
      setCurrentQuestion(data.question)
      setCandidateLevel(data.level)
      setCurrentAnswer('')
      setQuestionIdx((n) => n + 1)
    } catch (err) {
      addToast({ message: err.message, type: 'error' })
    } finally {
      setLoadingQ(false)
    }
  }

  const handleSubmit = async () => {
    if (!currentAnswer.trim()) return
    setEvaluating(true)
    try {
      const data = await evaluateAnswer(currentAnswer)
      const evalText = data.evaluation
      addToHistory({ question: currentQuestion, answer: currentAnswer, evaluation: evalText })
      setLatestEvaluation(evalText)
      addToast({ message: 'Answer evaluated!', type: 'success' })
      // Auto-fetch next question
      await fetchQuestion()
    } catch (err) {
      addToast({ message: err.message, type: 'error' })
    } finally {
      setEvaluating(false)
    }
  }

  const handleViewResults = () => navigate('/evaluation')

  if (!resumeUploaded && sessionHistory.length === 0 && !currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-surface-border
                        mx-auto flex items-center justify-center text-gray-500">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                  stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <h2 className="font-display font-700 text-2xl text-gray-100">No resume uploaded yet</h2>
        <p className="text-gray-400">Upload your resume first to start a personalised session.</p>
        <Link to="/upload" className="btn-primary inline-flex">Upload Resume</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Session header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="section-label mb-1">Step 2 · Interview Session</p>
          <h1 className="font-display font-700 text-2xl text-gray-100">
            AI Interview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {candidateLevel && (
            <span className={`badge ${
              candidateLevel === 'expert' ? 'badge-red' :
              candidateLevel === 'intermediate' ? 'badge-yellow' : 'badge-green'
            }`}>
              {levelLabel(candidateLevel)}
            </span>
          )}
          {sessionHistory.length > 0 && (
            <button onClick={handleViewResults} className="btn-secondary text-xs px-3 py-1.5">
              View Results ({sessionHistory.length})
            </button>
          )}
        </div>
      </div>

      {/* History */}
      {sessionHistory.map((entry, i) => (
        <div key={i} className="space-y-3 animate-fade-in">
          <QuestionCard
            question={entry.question}
            level={candidateLevel}
            index={i + 1}
            loading={false}
          />
          {/* User answer bubble */}
          <div className="flex justify-end">
            <div className="max-w-[85%] bg-surface-2 border border-surface-border rounded-xl
                            px-4 py-3 text-sm text-gray-300 leading-relaxed">
              <p className="section-label text-[10px] mb-1.5 text-right">Your Answer</p>
              {entry.answer}
            </div>
          </div>
          {/* Evaluation */}
          <EvaluationCard evaluation={entry.evaluation} questionPreview={entry.question} />
        </div>
      ))}

      {/* Current question */}
      {(currentQuestion || loadingQ) && (
        <QuestionCard
          question={currentQuestion}
          level={candidateLevel}
          index={sessionHistory.length + 1}
          loading={loadingQ}
        />
      )}

      {/* Input */}
      {!loadingQ && currentQuestion && !evaluating && (
        <AnswerInput
          value={currentAnswer}
          onChange={setCurrentAnswer}
          onSubmit={handleSubmit}
          onSkip={() => fetchQuestion(true)}
          disabled={loadingQ}
          submitting={evaluating}
        />
      )}

      {/* Evaluating state */}
      {evaluating && (
        <div className="card p-8 flex items-center justify-center gap-4 animate-fade-in">
          <Loader size="md" label="Evaluating your answer…" />
        </div>
      )}

      {/* Floating action – next question after eval */}
      {!loadingQ && !evaluating && sessionHistory.length > 0 && (
        <div className="flex gap-3 pt-2" ref={bottomRef}>
          <button
            onClick={() => fetchQuestion()}
            className="btn-primary flex-1 justify-center"
          >
            Next Question
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={handleViewResults} className="btn-secondary px-4">
            View Results
          </button>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
