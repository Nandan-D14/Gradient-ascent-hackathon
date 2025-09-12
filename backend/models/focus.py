from pydantic import BaseModel

class FocusAnalyzeRequest(BaseModel):
    webcam_frame: str
