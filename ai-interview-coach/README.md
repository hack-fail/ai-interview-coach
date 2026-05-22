# InterviewAI — Frontend

A modern React + Vite frontend for the AI Interview Coach platform.

## Tech Stack
- **React 18** — UI library
- **Vite** — build tool & dev server
- **Tailwind CSS** — utility-first styling
- **React Router v6** — client-side routing
- **Axios** — HTTP client

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure API URL
cp .env.example .env
# Edit VITE_API_URL to point to your FastAPI backend

# 3. Start dev server
npm run dev
```

Visit http://localhost:5173

## Backend
Ensure the FastAPI backend (`main.py`) is running on port 8000:
```bash
uvicorn main:app --reload
```

## Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── ResumeUploader.jsx
│   ├── QuestionCard.jsx
│   ├── AnswerInput.jsx
│   ├── EvaluationCard.jsx
│   ├── Loader.jsx
│   └── Toast.jsx
├── pages/            # Route-level pages
│   ├── LandingPage.jsx
│   ├── UploadPage.jsx
│   ├── InterviewPage.jsx
│   ├── EvaluationPage.jsx
│   └── NotFoundPage.jsx
├── services/
│   └── api.js        # Axios API service
├── hooks/
│   ├── useInterviewContext.jsx   # Global state
│   └── useTheme.js
├── layouts/
│   └── MainLayout.jsx
├── routes/
│   └── AppRouter.jsx
└── utils/
    └── helpers.js
```

## Routes
| Path | Page |
|------|------|
| `/` | Landing |
| `/upload` | Resume Upload |
| `/interview` | Interview Session |
| `/evaluation` | Results Dashboard |

## API Endpoints Used
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload_resume` | Upload PDF resume |
| GET | `/ask_question` | Fetch next AI question |
| GET | `/regenerate_question` | Skip/regenerate question |
| POST | `/evaluate` | Evaluate user answer |
