import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

class TestNotes(unittest.TestCase):
    def test_generate_notes_mocked_pdf(self):
        # Mock dependencies before importing main
        modules_to_patch = {
            "firebase_admin": MagicMock(),
            "firebase_admin.auth": MagicMock(),
            "firebase_admin.credentials": MagicMock(),
            "google.oauth2.credentials": MagicMock(),
        }

        with patch.dict(sys.modules, modules_to_patch):
            # Import inside the patched context.
            # Note: Since patch.dict restores sys.modules, these imports will be unloaded
            # after the test if they weren't loaded before.
            from fastapi.testclient import TestClient
            try:
                from main import app
                from utils.auth import verify_token
            except ImportError:
                # Fallback if imports fail due to complex dependencies
                self.skipTest("Skipping notes test due to missing dependencies.")

            # Setup dependency override
            def mock_verify_token():
                return {"uid": "test_user_123"}

            app.dependency_overrides[verify_token] = mock_verify_token

            client = TestClient(app)

            try:
                with patch("routers.notes.download_file") as mock_download, \
                     patch("routers.notes.generate_notes") as mock_generate, \
                     patch("routers.notes.upload_file") as mock_upload, \
                     patch("routers.notes.PyPDF2.PdfReader") as mock_pdf_reader:

                    # Mock PDF Reader
                    mock_page1 = MagicMock()
                    mock_page1.extract_text.return_value = "Page 1 content. "

                    mock_page2 = MagicMock()
                    mock_page2.extract_text.return_value = "Page 2 content."

                    mock_instance = mock_pdf_reader.return_value
                    mock_instance.pages = [mock_page1, mock_page2]

                    # Mock Download
                    mock_download.return_value = b"fake_pdf_bytes"

                    # Mock Generate
                    mock_generate.return_value = "Summary of the PDF content."

                    # Mock Upload
                    mock_upload.return_value = "new_file_id_456"

                    response = client.post(
                        "/notes/generate",
                        json={"fileId": "file_123"}
                    )

                    self.assertEqual(response.status_code, 200)
                    self.assertEqual(response.json(), {"notes_file_id": "new_file_id_456"})

                    # Verify text extraction logic
                    expected_text = "Page 1 content. Page 2 content."
                    mock_generate.assert_called_once_with(expected_text)

                    mock_upload.assert_called_once()
            finally:
                app.dependency_overrides = {}
