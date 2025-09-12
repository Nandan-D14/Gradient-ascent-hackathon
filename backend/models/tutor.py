from pydantic import BaseModel

class TutorChatRequest(BaseModel):
    question: str
