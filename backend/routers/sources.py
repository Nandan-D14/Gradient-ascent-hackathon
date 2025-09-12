from fastapi import APIRouter, Depends
from utils.auth import verify_token
from services.drive_client import list_files

router = APIRouter()

@router.get("/")
def get_sources(user: dict = Depends(verify_token)):
    uid = user["uid"]
    user_folder = f"ConceptMaster/{uid}"
    files = list_files(user_folder)
    return {"files": files}
