from pydantic import BaseModel

class GenerateNotesRequest(BaseModel):
    fileId: str
