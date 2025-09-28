from fastapi import APIRouter, Depends
from models.tutor import TutorChatRequest, QuizRequest, SummaryRequest, ExamplesRequest
from services.ai_client import tutor_chat, generate_quiz, generate_topic_summary, generate_examples
from utils.auth import verify_token

router = APIRouter()

@router.post("/chat")
def chat(request: TutorChatRequest):
    return {"response": tutor_chat(request.question)}

@router.post("/quiz")
def quiz(request: QuizRequest):
    return {"response": generate_quiz(request.topic, request.difficulty)}

@router.post("/summary")
def summary(request: SummaryRequest):
    return {"response": generate_topic_summary(request.topic, request.level)}

@router.post("/examples")
def examples(request: ExamplesRequest):
    return {"response": generate_examples(request.topic, request.level)}
