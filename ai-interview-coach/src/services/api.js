import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

// Response interceptor for error normalization
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// ─── Resume ───────────────────────────────────────────────
export const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post('/upload_resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  })
  return response.data
}

// ─── Interview ────────────────────────────────────────────
export const askQuestion = async () => {
  const response = await api.get('/ask_question')
  return response.data
}

export const regenerateQuestion = async () => {
  const response = await api.get('/regenerate_question')
  return response.data
}

// ─── Evaluation ───────────────────────────────────────────
export const evaluateAnswer = async (answer) => {
  const response = await api.post('/evaluate', { answer })
  return response.data
}

export default api
