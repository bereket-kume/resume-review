# 🧠 Resume Review AI

A full-stack AI-powered platform that helps users upload their **resumes**, extract key information, and receive a smart **AI-generated review** — built with **NestJS**, **Supabase**, and **Gemini API**, and paired with a **React frontend**.

![banner](https://user-images.githubusercontent.com/your-banner.png) <!-- optional banner -->

---

## 🔥 Features

- 📤 Upload resumes (PDF)
- 🔎 Extract text using `pdf-parse`
- 🧠 Analyze with Gemini AI
- 💾 Store files + metadata in Supabase
- 🔐 Firebase authentication
- ⚛️ React frontend

---

## 🛠️ Tech Stack

**Backend:**
- NestJS
- Supabase (Storage + DB)
- Gemini API
- Firebase Auth
- Multer + pdf-parse

**Frontend:**
- React + Vite
- Axios
- Firebase SDK
- TailwindCSS

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/bereket-kume/resume-review-ai.git
cd resume-review-ai
📡 Backend Setup
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
🖥️ Frontend Setup
cd frontend
npm install
cp .env.example .env
# Fill in .env with your VITE_ environment variables
npm run dev

