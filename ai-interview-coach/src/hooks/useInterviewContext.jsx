import { createContext, useContext, useState, useCallback } from 'react'

const InterviewContext = createContext(null)

export function InterviewProvider({ children }) {
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [resumeFileName, setResumeFileName] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [candidateLevel, setCandidateLevel] = useState(null)
  const [sessionHistory, setSessionHistory] = useState([]) // [{question, answer, evaluation}]
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [latestEvaluation, setLatestEvaluation] = useState(null)

  const addToHistory = useCallback((entry) => {
    setSessionHistory((prev) => [...prev, entry])
  }, [])

  const resetSession = useCallback(() => {
    setCurrentQuestion(null)
    setCandidateLevel(null)
    setSessionHistory([])
    setCurrentAnswer('')
    setLatestEvaluation(null)
  }, [])

  return (
    <InterviewContext.Provider
      value={{
        resumeUploaded, setResumeUploaded,
        resumeFileName, setResumeFileName,
        currentQuestion, setCurrentQuestion,
        candidateLevel, setCandidateLevel,
        sessionHistory, addToHistory,
        currentAnswer, setCurrentAnswer,
        latestEvaluation, setLatestEvaluation,
        resetSession,
      }}
    >
      {children}
    </InterviewContext.Provider>
  )
}

export function useInterview() {
  const ctx = useContext(InterviewContext)
  if (!ctx) throw new Error('useInterview must be used within InterviewProvider')
  return ctx
}
