from pydantic import BaseModel

class TutorChatRequest(BaseModel):
    question: str

class QuizRequest(BaseModel):
    topic: str
    difficulty: str = "intermediate"

class SummaryRequest(BaseModel):
    topic: str
    level: str = "intermediate"

class ExamplesRequest(BaseModel):
    topic: str
    level: str = "intermediate"
