from fastapi import APIRouter, Depends
from models.tutor import TutorChatRequest
from services.ai_client import tutor_chat
from utils.auth import verify_token

router = APIRouter()

@router.post("/chat")
def chat(request: TutorChatRequest, user: dict = Depends(verify_token)):
    return {"response": tutor_chat(request.question)}
