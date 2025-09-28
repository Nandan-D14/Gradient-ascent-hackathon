from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import tutor, notes, sources, exam, focus, books

app = FastAPI(title="Concept Master API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tutor.router, prefix="/tutor", tags=["tutor"])
app.include_router(notes.router, prefix="/notes", tags=["notes"])
app.include_router(sources.router, prefix="/sources", tags=["sources"])
app.include_router(exam.router, prefix="/exam", tags=["exam"])
app.include_router(focus.router, prefix="/focus", tags=["focus"])
app.include_router(books.router, prefix="/books", tags=["books"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Concept-Master API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}
