import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M9 12h6M9 16h4M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
              stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Resume Analysis',
    description:
      'Upload your PDF resume and our AI instantly profiles your experience level — fresher, mid-level, or expert — to tailor every question.',
    tag: 'Step 1',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M9 9h6M9 13h4M7 4h10a2 2 0 012 2v10a2 2 0 01-2 2l-4 2-4-2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
              stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'AI Interview Questions',
    description:
      'Receive dynamically generated, context-aware questions based on your resume, role, and skill level — never the same session twice.',
    tag: 'Step 2',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M9 12l2 2 4-4M12 3a9 9 0 100 18A9 9 0 0012 3z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI Answer Evaluation',
    description:
      'Get instant scoring out of 10 with detailed strengths, weaknesses, and actionable improvement suggestions after every answer.',
    tag: 'Step 3',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Performance Analytics',
    description:
      'Track your session scores, spot improvement patterns across Q&A rounds, and monitor your progress toward interview readiness.',
    tag: 'Step 4',
  },
]

const STATS = [
  { value: '10×', label: 'Faster prep than solo practice' },
  { value: '3',   label: 'Candidate levels supported' },
  { value: '∞',   label: 'Unique questions per session' },
]

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.35] pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                      bg-gradient-radial from-brand-500/15 via-brand-500/5 to-transparent
                      pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                        bg-brand-500/10 border border-brand-500/25 text-xs font-mono text-brand-400
                        mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-slow"/>
          Powered by LLaMA 3 · Groq Ultra-Fast Inference
        </div>

        <h1 className="font-display font-800 text-5xl sm:text-6xl md:text-7xl text-balance leading-[1.05]
                       tracking-tight text-gray-50 animate-fade-up mb-6">
          Ace every interview
          <br />
          <span className="gradient-text">with AI coaching</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed
                      animate-fade-up [animation-delay:0.1s] opacity-0 text-balance mb-10">
          Upload your resume, get tailored interview questions matched to your experience,
          and receive real-time AI feedback on every answer — all in one seamless session.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3
                        animate-fade-up [animation-delay:0.2s] opacity-0">
          <Link to="/upload" className="btn-primary text-base px-7 py-3 glow-brand">
            Start Interview Session
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/interview" className="btn-secondary text-base px-6 py-3">
            Demo Session
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16
                        pt-8 border-t border-surface-border
                        animate-fade-up [animation-delay:0.3s] opacity-0">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-800 text-3xl gradient-text">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-12">
          <p className="section-label mb-3">How it works</p>
          <h2 className="font-display font-700 text-3xl sm:text-4xl text-gray-100 text-balance">
            From resume to offer letter
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          {FEATURES.map(({ icon, title, description, tag }) => (
            <div key={title} className="card-hover p-5 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20
                                flex items-center justify-center text-brand-400
                                group-hover:bg-brand-500/25 transition-colors">
                  {icon}
                </div>
                <span className="section-label text-[10px]">{tag}</span>
              </div>
              <h3 className="font-display font-600 text-gray-100 mb-2">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative max-w-4xl mx-auto px-6 pb-24">
        <div className="card border-brand-500/20 p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Glow inside card */}
          <div className="absolute inset-0 bg-gradient-radial from-brand-500/10 via-transparent to-transparent"/>
          <p className="section-label mb-4">Ready to practise?</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-gray-50 mb-4 text-balance">
            Your next interview starts here
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto text-balance">
            Upload your resume in seconds and begin a personalised AI-powered mock interview.
          </p>
          <Link to="/upload" className="btn-primary text-base px-8 py-3 glow-brand">
            Upload Resume & Begin
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
