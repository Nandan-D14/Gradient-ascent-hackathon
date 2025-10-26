#!/usr/bin/env python3
"""
Simple test script to verify backend functionality
"""
import os
import sys
import requests
import json
import unittest
from unittest.mock import patch

class TestBackend(unittest.TestCase):
    def test_health_check(self):
        print("1. Testing backend connection...")
        try:
            response = requests.get("http://localhost:8000/health", timeout=5)
            self.assertEqual(response.status_code, 200)
            print("✅ Backend is running!")
        except requests.exceptions.ConnectionError:
            self.fail("❌ Cannot connect to backend. Is it running on port 8000?")

    def test_env_vars(self):
        print("\n2. Testing environment variables...")
        api_key = os.getenv("GEMINI_API_KEY")
        self.assertIsNotNone(api_key, "❌ Gemini API key not found in environment")
        print("✅ Gemini API key is set")

    def test_tutor_chat(self):
        print("\n3. Testing tutor chat endpoint...")
        chat_data = {"question": "What is Python?"}
        response = requests.post("http://localhost:8000/tutor/chat", json=chat_data, timeout=30)
        self.assertEqual(response.status_code, 200)
        print("✅ Chat endpoint working!")

    def test_quiz_generation(self):
        print("\n4. Testing quiz generation...")
        quiz_data = {"topic": "Python", "difficulty": "beginner"}
        response = requests.post("http://localhost:8000/tutor/quiz", json=quiz_data, timeout=30)
        self.assertEqual(response.status_code, 200)
        print("✅ Quiz endpoint working!")

    @patch('backend.services.ai_client.ask_gemini')
    def test_quiz_generation_invalid_json(self, mock_ask_gemini):
        print("\n5. Testing quiz generation with invalid JSON...")
        mock_ask_gemini.return_value = "invalid json"
        quiz_data = {"topic": "any topic", "difficulty": "beginner"}
        response = requests.post("http://localhost:8000/tutor/quiz", json=quiz_data, timeout=30)
        self.assertEqual(response.status_code, 200)

        result = response.json()
        response_payload_str = result.get('response')
        self.assertIsNotNone(response_payload_str, "❌ 'response' field missing from quiz endpoint!")

        try:
            response_payload = json.loads(response_payload_str)
            self.assertIn('questions', response_payload, "❌ Quiz endpoint 'response' field has incorrect structure!")
            print("✅ Quiz endpoint handled invalid JSON gracefully!")
        except json.JSONDecodeError:
            self.fail("❌ Quiz endpoint 'response' field is not valid JSON!")

if __name__ == "__main__":
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    if os.path.exists(backend_dir):
        os.chdir(backend_dir)

    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(TestBackend))
    runner = unittest.TextTestRunner()
    result = runner.run(suite)
    sys.exit(not result.wasSuccessful())
