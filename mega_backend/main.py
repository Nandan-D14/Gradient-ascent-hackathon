"""
FastAPI service that integrates Mega cloud storage using the mega.py library.

Features
--------
* Authenticates with Mega using credentials supplied through environment variables.
* Provides four REST endpoints:
    - POST /upload        : streams an incoming file upload into Mega and responds with a public link.
    - POST /download      : downloads a file from Mega (by link or ID) and stores it locally.
    - GET  /list          : lists files available in the authenticated Mega account.
    - DELETE /files/{id}  : permanently deletes a file from Mega by node handle.
* Uses chunked reads/writes to handle large files efficiently.
* Returns JSON responses only and never exposes Mega credentials.

Usage
-----
1. Install dependencies (preferably inside a virtual environment):
       pip install fastapi uvicorn[standard] mega.py python-multipart python-dotenv

2. Export your Mega credentials securely before running the API:
       export MEGA_EMAIL="gamesuggetion@gmail.com"
       export MEGA_PASSWORD="N@nDAnd@14!@0>"

   On Windows PowerShell:
       $Env:MEGA_EMAIL = "gamesuggetion@gmail.com"
       $Env:MEGA_PASSWORD = "N@nDAnd@14!@0>"

   ⚠️  Avoid hard-coding secrets in source control or sharing them publicly.

3. Launch the FastAPI server:
       uvicorn main:app --reload

4. Interact with endpoints via cURL, HTTPie, or an API client such as Postman.

"""

import os
import tempfile
from functools import lru_cache
from pathlib import Path
from typing import Dict, List, Optional, Any

import asyncio
import types

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, HttpUrl, model_validator
from dotenv import load_dotenv


# Load environment variables from a .env file when present.
load_dotenv()


# ---------------------------------------------------------------------------
# Compatibility shims
# ---------------------------------------------------------------------------

# tenacity<=8.x expects asyncio.coroutine, which was removed in Python 3.11+.
if not hasattr(asyncio, "coroutine"):
    asyncio.coroutine = types.coroutine  # type: ignore[attr-defined]

from mega import Mega


# ---------------------------------------------------------------------------
# Mega service wrapper
# ---------------------------------------------------------------------------

class MegaService:
    """Wrapper around mega.py that exposes convenience helpers."""

    def __init__(self) -> None:
        email = os.getenv("MEGA_EMAIL")
        password = os.getenv("MEGA_PASSWORD")

        if not email or not password:
            raise RuntimeError(
                "Mega credentials missing. Please set MEGA_EMAIL and MEGA_PASSWORD environment variables."
            )

        mega_client = Mega()
        # mega.py manages its own session; store the authenticated client for reuse.
        self._client = mega_client.login(email, password)

    # ------------------------------------------------------------------ upload
    def upload(self, local_path: Path, display_name: str) -> str:
        """
        Upload a local file to Mega and return a public shareable link.
        """
        node = self._client.upload(str(local_path), dest_filename=display_name)
        return self._client.get_upload_link(node)

    # ---------------------------------------------------------------- download
    def download(
        self,
        *,
        destination_dir: Path,
        file_link: Optional[str] = None,
        file_id: Optional[str] = None,
    ) -> Path:
        """
        Download a Mega file either via public link or by node handle (ID).
        """
        destination_dir.mkdir(parents=True, exist_ok=True)

        if file_link:
            local_path = self._client.download_url(file_link, str(destination_dir))
            return Path(local_path).resolve()

        files = self._client.get_files()
        node = files.get(file_id)
        if not node:
            raise ValueError("File ID not found in Mega account.")

        local_path = self._client.download(node, dest_path=str(destination_dir))
        return Path(local_path).resolve()

    # -------------------------------------------------------------------- list
    # ------------------------------------------------------------------- delete
    def delete(self, file_id: str) -> None:
        """Permanently delete a file from Mega given its node handle."""
        files = self._client.get_files()
        node = files.get(file_id)
        if not node:
            raise ValueError("File ID not found in Mega account.")

        # Remove from trash as well to ensure it disappears from listings.
        self._client.delete(node)
        self._client.destroy(node)

    # -------------------------------------------------------------------- list
    def list_files(self) -> List[Dict[str, Any]]:
        """Return basic metadata for each file in the Mega account."""
        files = self._client.get_files()
        listing: List[Dict[str, Any]] = []

        for handle, meta in files.items():
            attrs = meta.get("a", {})
            listing.append(
                {
                    "id": handle,
                    "name": attrs.get("n"),
                    "size_bytes": meta.get("s"),
                }
            )

        return listing


@lru_cache(maxsize=1)
def get_mega_service() -> MegaService:
    """FastAPI dependency returning a cached MegaService instance."""
    return MegaService()


# ---------------------------------------------------------------------------
# Request models
# ---------------------------------------------------------------------------

class DownloadPayload(BaseModel):
    """Schema for /download requests."""

    file_link: Optional[HttpUrl] = Field(
        None,
        description="Public Mega link (https://mega.nz/...).",
    )
    file_id: Optional[str] = Field(
        None,
        description="Mega node handle returned by /list.",
    )
    destination_dir: Path = Field(
        default=Path("./downloads"),
        description="Local directory to store the downloaded file.",
    )

    @model_validator(mode="before")
    def require_single_identifier(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        link = values.get("file_link")
        node_id = values.get("file_id")
        if not link and not node_id:
            raise ValueError("Provide either file_link or file_id.")
        if link and node_id:
            raise ValueError("Provide only one of file_link or file_id, not both.")
        return values


# ---------------------------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Mega Cloud Backend",
    description="REST API that connects FastAPI with Mega cloud storage via mega.py",
    version="1.0.0",
)

# Allow frontend clients (Next.js dev server, localhost) to access the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:50618", "http://127.0.0.1:50618", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_endpoint(
    file: UploadFile = File(..., description="Binary file to upload to Mega."),
    mega: MegaService = Depends(get_mega_service),
) -> JSONResponse:
    """Accept a file upload, stream it into Mega, and return the shareable link."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required.")

    # Persist the incoming file to disk in chunks to avoid memory spikes.
    suffix = Path(file.filename).suffix
    chunk_size = 1024 * 1024  # 1 MB chunks
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        temp_path = Path(tmp.name)
        while True:
            chunk = await file.read(chunk_size)
            if not chunk:
                break
            tmp.write(chunk)

    try:
        public_link = mega.upload(temp_path, display_name=file.filename)
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Upload failed: {exc}") from exc
    finally:
        temp_path.unlink(missing_ok=True)
        await file.close()

    return JSONResponse(
        {
            "filename": file.filename,
            "public_link": public_link,
            "message": "Upload successful.",
        }
    )


@app.post("/download")
def download_endpoint(
    payload: DownloadPayload,
    mega: MegaService = Depends(get_mega_service),
) -> JSONResponse:
    """Download a Mega file by link or ID and save it locally."""
    try:
        saved_path = mega.download(
            destination_dir=payload.destination_dir,
            file_link=str(payload.file_link) if payload.file_link else None,
            file_id=payload.file_id,
        )
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err)) from err
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Download failed: {exc}") from exc

    return JSONResponse(
        {
            "message": "Download completed.",
            "saved_path": str(saved_path),
        }
    )


@app.get("/list")
def list_endpoint(mega: MegaService = Depends(get_mega_service)) -> JSONResponse:
    """Return the files stored in the authenticated Mega account."""
    try:
        files = mega.list_files()
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Listing failed: {exc}") from exc

    return JSONResponse({"files": files})


@app.delete("/files/{file_id}")
def delete_endpoint(file_id: str, mega: MegaService = Depends(get_mega_service)) -> JSONResponse:
    """Permanently remove a file from Mega using its node handle."""
    try:
        mega.delete(file_id)
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err)) from err
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=f"Deletion failed: {exc}") from exc

    return JSONResponse({"message": "File deleted.", "file_id": file_id})

@app.get("/health")
def health_check() -> JSONResponse:
    """Simple health check endpoint."""
    return JSONResponse({"status": "ok"})
    
# ---------------------------------------------------------------------------
# Local development entry-point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
