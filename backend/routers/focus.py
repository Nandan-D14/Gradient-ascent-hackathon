from fastapi import APIRouter, Depends
from models.focus import FocusAnalyzeRequest
from utils.auth import verify_token

router = APIRouter()

@router.post("/analyze")
def analyze(request: FocusAnalyzeRequest, user: dict = Depends(verify_token)):
    # Dummy implementation
    return {"status": "focused"}
