import { useState, useEffect, createContext, useContext, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, type = 'info', duration = 4000 }) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
  }, [])

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onRemove={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function Toast({ toast, onRemove }) {
  const icons = {
    success: (
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
        <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    error: (
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
        <path d="M8 3v5M8 11v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    info: (
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  }

  const styles = {
    success: 'bg-brand-500/15 border-brand-500/30 text-brand-300',
    error:   'bg-red-500/15 border-red-500/30 text-red-300',
    info:    'bg-blue-500/15 border-blue-500/30 text-blue-300',
  }

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl
                  border backdrop-blur-sm min-w-[280px] max-w-sm shadow-xl
                  animate-slide-in ${styles[toast.type]}`}
    >
      {icons[toast.type]}
      <p className="text-sm font-body flex-1">{toast.message}</p>
      <button
        onClick={onRemove}
        className="opacity-60 hover:opacity-100 transition-opacity ml-1 mt-0.5"
      >
        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx.addToast
}
