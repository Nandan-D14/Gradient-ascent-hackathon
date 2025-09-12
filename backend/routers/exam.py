from fastapi import APIRouter, Depends
from models.exam import ExamPredictRequest
from services.ai_client import predict_exam
from utils.auth import verify_token

router = APIRouter()

@router.post("/predict")
def predict(request: ExamPredictRequest, user: dict = Depends(verify_token)):
    return {"predictions": predict_exam(request.past_papers_text)}
