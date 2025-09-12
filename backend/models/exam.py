from pydantic import BaseModel

class ExamPredictRequest(BaseModel):
    past_papers_text: str
