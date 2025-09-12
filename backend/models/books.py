from pydantic import BaseModel

class BookRecommendationsRequest(BaseModel):
    subject: str
    level: str
