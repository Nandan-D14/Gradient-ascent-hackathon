from fastapi import APIRouter, Depends
from models.books import BookRecommendationsRequest
from services.ai_client import book_recommendations
from utils.auth import verify_token

router = APIRouter()

@router.get("/recommend")
def recommend(request: BookRecommendationsRequest, user: dict = Depends(verify_token)):
    return {"recommendations": book_recommendations(f"Subject: {request.subject}, Level: {request.level}")}
