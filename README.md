# Concept Master - AI-Powered Study Platform

An intelligent study companion that helps students learn smarter with AI-powered features including tutoring, note generation, exam prediction, and more.

## Features ✨

- **AI Tutor** - Get personalized guidance and support 24/7
- **Dark Mode** - Toggle between light and dark themes
- **Focus Mode** - Minimize distractions and maximize productivity
- **3D Learning** - Interactive 3D models for complex concepts
- **Exam Predictor** - Predict performance and identify improvement areas
- **Notes Generation** - AI-powered note creation from PDFs
- **Book Recommendations** - Personalized study material suggestions

## Quick Start 🚀

### 1. Install Dependencies
```bash
# Run the installation script
install-dependencies.bat

# Or manually:
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd edu_ai
npm install
```

### 2. Start the Application
```bash
# Start Backend (Terminal 1)
start-backend.bat
# Or: cd backend && python -m uvicorn main:app --reload --port 8000

# Start Frontend (Terminal 2)
start-frontend.bat
# Or: cd edu_ai && npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Environment Setup 🔧

Set `GEMINI_API_KEY` in your environment (for example in `backend/.env` and `edu_ai/.env.local`). For additional features, you may need:

- Google OAuth credentials (for file uploads)
- Firebase project ID (for authentication)

## Project Structure 📁

```
├── backend/                 # FastAPI backend
│   ├── routers/            # API route handlers
│   ├── models/             # Pydantic models
│   ├── services/           # Business logic
│   └── utils/              # Utilities (auth, etc.)
├── edu_ai/                 # Next.js frontend
│   ├── app/                # App router pages
│   ├── component/          # Reusable components
│   ├── contexts/           # React contexts (theme)
│   └── lib/                # Utilities and API client
└── *.bat                   # Windows startup scripts
```

## API Endpoints 🔗

- `POST /tutor/chat` - AI tutor chat
- `POST /notes/generate` - Generate notes from PDFs
- `GET /books/` - Get book recommendations
- `POST /exam/predict` - Exam prediction
- `GET /focus/session` - Focus mode session
- `GET /sources/` - Learning sources

## Dark Mode 🌙

Toggle dark mode in Settings page. The theme preference is saved locally and applies across the entire application.

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Tech Stack 💻

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

**Backend:**
- FastAPI
- Python
- Google Gemini AI
- Firebase Auth

## License 📄

MIT License - see LICENSE file for details.
