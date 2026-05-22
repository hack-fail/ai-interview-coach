import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadResume } from '../services/api'
import { useInterview } from '../hooks/useInterviewContext'
import { useToast } from './Toast'
import { formatFileSize } from '../utils/helpers'

export default function ResumeUploader() {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { setResumeUploaded, setResumeFileName } = useInterview()
  const addToast = useToast()

  const handleFile = (f) => {
    if (!f) return
    if (f.type !== 'application/pdf') {
      addToast({ message: 'Only PDF files are supported.', type: 'error' })
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      addToast({ message: 'File too large. Max 10 MB.', type: 'error' })
      return
    }
    setFile(f)
    setProgress(0)
  }

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }, [])

  const onDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const onDragLeave = () => setDragging(false)

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    try {
      await uploadResume(file, (e) => {
        if (e.total) setProgress(Math.round((e.loaded / e.total) * 100))
      })
      setResumeUploaded(true)
      setResumeFileName(file.name)
      addToast({ message: 'Resume uploaded successfully!', type: 'success' })
      setTimeout(() => navigate('/interview'), 800)
    } catch (err) {
      addToast({ message: err.message || 'Upload failed.', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer
                    ${dragging
                      ? 'border-brand-400 bg-brand-500/10 scale-[1.01]'
                      : file
                      ? 'border-brand-500/40 bg-brand-500/5 cursor-default'
                      : 'border-surface-border bg-surface-1 hover:border-brand-500/50 hover:bg-surface-2'
                    }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <div className="flex flex-col items-center justify-center px-8 py-12 text-center gap-4">
          {file ? (
            <>
              {/* PDF icon */}
              <div className="w-14 h-14 rounded-xl bg-brand-500/15 border border-brand-500/30
                              flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-brand-400">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-display font-600 text-gray-100">{file.name}</p>
                <p className="text-sm text-gray-400 mt-0.5">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); setProgress(0) }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Remove file
              </button>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-xl bg-surface-3 border border-surface-border
                              flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-gray-400">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-display font-600 text-gray-100 text-base">
                  Drop your resume here
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  or <span className="text-brand-400 underline underline-offset-2">browse files</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">PDF only · max 10 MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {uploading && (
        <div className="space-y-1.5 animate-fade-in">
          <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>Uploading…</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-teal-400 rounded-full
                         transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full btn-primary justify-center py-3 text-sm disabled:opacity-40
                   disabled:cursor-not-allowed"
      >
        {uploading ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2"/>
              <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Uploading…
          </>
        ) : (
          <>
            Upload & Analyse
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>
    </div>
  )
}
