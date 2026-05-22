import ResumeUploader from '../components/ResumeUploader'

const TIPS = [
  'Use a clean, single-column PDF for best text extraction',
  'Include your most recent 3–5 years of experience',
  'Make sure skills, tools and technologies are clearly listed',
  'Projects and achievements improve question quality',
]

export default function UploadPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      {/* Page header */}
      <div className="mb-10 text-center">
        <p className="section-label mb-2">Step 1</p>
        <h1 className="font-display font-800 text-4xl text-gray-50 mb-3">
          Upload Your Resume
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-balance">
          Share your PDF resume so our AI can analyse your experience and craft
          questions tailored to your profile.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Uploader */}
        <ResumeUploader />

        {/* Tips sidebar */}
        <aside className="card p-5 space-y-4">
          <h3 className="font-display font-600 text-gray-200 text-sm flex items-center gap-2">
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-brand-400">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Tips for better results
          </h3>
          <ul className="space-y-3">
            {TIPS.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm text-gray-400">
                <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-500">
                  <path d="M2 6.5l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {tip}
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-surface-border">
            <p className="text-xs text-gray-500 leading-relaxed">
              Your resume is processed server-side and used only to generate
              your interview session. No data is stored permanently.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
