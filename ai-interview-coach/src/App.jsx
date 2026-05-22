import { InterviewProvider } from './hooks/useInterviewContext'
import { ToastProvider } from './components/Toast'
import AppRouter from './routes/AppRouter'

export default function App() {
  return (
    <InterviewProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </InterviewProvider>
  )
}
