from fastapi import FastAPI
from routers import tutor, notes, sources, exam, focus, books

app = FastAPI()

app.include_router(tutor.router, prefix="/tutor", tags=["tutor"])
app.include_router(notes.router, prefix="/notes", tags=["notes"])
app.include_router(sources.router, prefix="/sources", tags=["sources"])
app.include_router(exam.router, prefix="/exam", tags=["exam"])
app.include_router(focus.router, prefix="/focus", tags=["focus"])
app.include_router(books.router, prefix="/books", tags=["books"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Concept-Master API"}
