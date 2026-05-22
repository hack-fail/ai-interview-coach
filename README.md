#  AI Interview Coach

An AI-powered mock interview platform that analyses your resume, generates tailored interview questions, and provides real-time feedback on your answers.

Built with **FastAPI + React + LLaMA 3 (via Groq)**

![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.8+-blue)
![React](https://img.shields.io/badge/react-18-61DAFB)

---

##  Features

- 📄 **Resume Analysis** — Upload your PDF resume and get instantly profiled as Fresher, Mid-Level, or Expert
- 🤖 **AI Interview Questions** — Dynamically generated questions tailored to your experience and skills
- 📝 **AI Answer Evaluation** — Instant scoring out of 10 with strengths, weaknesses, and improvement tips
- 📊 **Performance Dashboard** — Track your scores across all questions in a session
- 🔄 **Regenerate Questions** — Skip or regenerate any question you don't like

---

##  Tech Stack

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) — Python web framework
- [Groq](https://console.groq.com/) — Ultra-fast LLaMA 3 inference
- [PyPDF2](https://pypdf2.readthedocs.io/) — PDF text extraction

### Frontend
- [React 18](https://react.dev/) — UI library
- [Vite](https://vitejs.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [React Router v6](https://reactrouter.com/) — Routing
- [Axios](https://axios-http.com/) — HTTP client

---

## 🚀 Live Demo

- 🌐 Frontend: [https://ai-interview-coach.vercel.app](https://ai-interview-coach.vercel.app)
- 🔗 Backend API: [https://ai-interview-coach-api.onrender.com](https://ai-interview-coach-api.onrender.com)

---

## 📦 Local Setup

### Prerequisites
- Python 3.8+
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

---

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-interview-coach.git
cd ai-interview-coach
```

---

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Create your .env file
cp .env.example .env
```

Open `.env` and add your Groq API key:
```
GROQ_API_KEY=your_actual_groq_api_key_here
```

Start the backend:
```bash
uvicorn main:app --reload
```
Backend runs at → http://localhost:8000

---

### 3. Frontend Setup
```bash
# Go to frontend folder
cd ai-interview-coach

# Install dependencies
npm install

# Start dev server
npm run dev
```
Frontend runs at → http://localhost:5173

---

## 📁 Project Structure

```
ai-interview-coach/
│
├── main.py                  # FastAPI backend
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variable template
├── .gitignore
│
└── ai-interview-coach/      # React frontend
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/           # Route-level pages
    │   ├── services/        # Axios API service
    │   ├── hooks/           # Custom React hooks
    │   ├── layouts/         # Page layouts
    │   ├── routes/          # React Router setup
    │   └── utils/           # Helper functions
    ├── package.json
    └── vite.config.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload_resume` | Upload PDF resume |
| `GET` | `/ask_question` | Get next AI question |
| `GET` | `/regenerate_question` | Skip/regenerate question |
| `POST` | `/evaluate` | Evaluate your answer |

---

## 🌊 How It Works

```
1. Upload Resume (PDF)
        ↓
2. AI profiles your experience level
        ↓
3. AI generates tailored interview questions
        ↓
4. You answer each question
        ↓
5. AI evaluates and scores your answer
        ↓
6. View full performance dashboard
```

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com |
| `VITE_API_URL` | Backend URL (default: http://localhost:8000) |

---

## 🚢 Deployment

### Frontend — Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repo
3. Set root directory to `ai-interview-coach`
4. Deploy

### Backend — Render
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port 8000`
5. Add `GROQ_API_KEY` in environment variables
6. Deploy

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Made with ❤️ by **Panka**

[![GitHub](https://img.shields.io/badge/GitHub-YOUR_USERNAME-black?logo=github)](https://github.com/YOUR_USERNAME)
