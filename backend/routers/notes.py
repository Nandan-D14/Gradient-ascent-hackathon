from fastapi import APIRouter, Depends
from models.notes import GenerateNotesRequest
from services.drive_client import download_file, upload_file
from services.ai_client import generate_notes
from utils.auth import verify_token
import PyPDF2
import io

router = APIRouter()

@router.post("/generate")
def generate(request: GenerateNotesRequest, user: dict = Depends(verify_token)):
    uid = user["uid"]
    file_bytes = download_file(request.fileId)
    
    # Extract text from PDF
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()

    # Generate notes using AI
    notes = generate_notes(text)

    # Upload notes to Drive
    user_folder = f"ConceptMaster/{uid}"
    notes_file_id = upload_file("notes.txt", notes.encode("utf-8"), "text/plain", user_folder)

    return {"notes_file_id": notes_file_id}
