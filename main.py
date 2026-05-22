from fastapi import FastAPI, UploadFile, File
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import os
from dotenv import load_dotenv
load_dotenv()
from pydantic import BaseModel
current_level = None
previous_questions = []
class AnswerRequest(BaseModel):
    answer: str

app = FastAPI()

# -----------------------------
# CLIENT (LLaMA via Groq)
# -----------------------------
def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))
# -----------------------------
# GLOBAL STORAGE (resume text)
# -----------------------------
resume_text = ""


# -----------------------------
# ROOT TEST
# -----------------------------
@app.get("/")
def home():
    return {"message": "AI Interview API is running"}


# -----------------------------
# UPLOAD RESUME
# -----------------------------
@app.post("/upload_resume")
async def upload_resume(file: UploadFile = File(...)):
    global resume_text

    pdf = PyPDF2.PdfReader(file.file)

    text = ""
    for page in pdf.pages:
        page_text = page.extract_text()
        print("PAGE TEXT:", repr(page_text))  # 🔥 DEBUG LINE
        text += page_text or ""

    resume_text = text

    print("FINAL RESUME LENGTH:", len(resume_text))
    print("RESUME PREVIEW:", resume_text[:300])

    return {"message": "Resume uploaded successfully"}

def get_experience_level(resume_text):
    client = get_client()

    prompt = f"""
Analyze the following resume and classify the candidate into ONE category:

- fresher (0-1 years, mostly students/projects)
- intermediate (1-4 years experience)
- expert (5+ years, senior roles)

Resume:
{resume_text}

Return ONLY one word: fresher / intermediate / expert
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    return response.choices[0].message.content.strip().lower()
# -----------------------------
# ASK INTERVIEW QUESTION
# -----------------------------
@app.get("/ask_question")
def ask_question():
    global resume_text, current_level, previous_questions

    if not resume_text:
        return {"error": "Upload resume first"}

    client = get_client()

    if not current_level:
        current_level = get_experience_level(resume_text)

    level = current_level

    if "fresher" in level:
        instruction = """Ask a beginner-level question on OOP, OS, DBMS or projects."""
    elif "intermediate" in level:
        instruction = """Ask a question about job role, real-world work, and challenges."""
    else:
        instruction = """Ask an advanced system design or architecture question."""

    prompt = f"""
You are a professional interviewer.

Level: {level}

{instruction}

Avoid repeating these questions:
{previous_questions}

Resume:
{resume_text}

Ask ONE new question.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
    )

    question = response.choices[0].message.content
    previous_questions.append(question)

    return {"level": level, "question": question}
@app.post("/evaluate")
def evaluate(req: AnswerRequest):
    client = get_client()

    prompt = f"""
Evaluate this interview answer:

{req.answer}

Return:
Score out of 10
Strengths
Weaknesses
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"evaluation": response.choices[0].message.content}

@app.get("/regenerate_question")
def regenerate_question():
    global resume_text, current_level, previous_questions

    if not resume_text or not current_level:
        return {"error": "Start interview first"}

    client = get_client()

    prompt = f"""
You are a professional interviewer.

Candidate level: {current_level}

Generate a DIFFERENT question than before.

Avoid these questions:
{previous_questions}

Resume:
{resume_text}

Ask ONE new question.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
    )

    question = response.choices[0].message.content
    previous_questions.append(question)

    return {"level": current_level, "question": question}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)