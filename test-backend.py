#!/usr/bin/env python3
"""
Simple test script to verify backend functionality
"""
import os
import sys
import requests
import json

def test_backend():
    print("🧪 Testing Concept Master Backend...")
    print("=" * 50)
    
    # Test 1: Check if backend is running
    print("1. Testing backend connection...")
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend is running!")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Backend returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Is it running on port 8000?")
        print("   Run: python -m uvicorn main:app --reload --port 8000")
        return False
    except Exception as e:
        print(f"❌ Error connecting to backend: {e}")
        return False
    
    # Test 2: Check environment variables
    print("\n2. Testing environment variables...")
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        print("✅ Gemini API key is set")
        print(f"   Key starts with: {api_key[:10]}...")
    else:
        print("❌ Gemini API key not found in environment")
        return False
    
    # Test 3: Test tutor chat endpoint
    print("\n3. Testing tutor chat endpoint...")
    try:
        chat_data = {"question": "What is Python?"}
        response = requests.post(
            "http://localhost:8000/tutor/chat",
            json=chat_data,
            timeout=30
        )
        if response.status_code == 200:
            result = response.json()
            print("✅ Chat endpoint working!")
            print(f"   Response length: {len(result.get('response', ''))} characters")
        else:
            print(f"❌ Chat endpoint returned status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error testing chat endpoint: {e}")
        return False
    
    # Test 4: Test quiz generation
    print("\n4. Testing quiz generation...")
    try:
        quiz_data = {"topic": "Python", "difficulty": "beginner"}
        response = requests.post(
            "http://localhost:8000/tutor/quiz",
            json=quiz_data,
            timeout=30
        )
        if response.status_code == 200:
            result = response.json()
            print("✅ Quiz endpoint working!")
            print(f"   Response length: {len(result.get('response', ''))} characters")
        else:
            print(f"❌ Quiz endpoint returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error testing quiz endpoint: {e}")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 All tests passed! Backend is working correctly.")
    print("\nNext steps:")
    print("1. Start the frontend: cd edu_ai && npm run dev")
    print("2. Open http://localhost:3000 in your browser")
    print("3. Navigate to AI Tutor and start chatting!")
    return True

if __name__ == "__main__":
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    if os.path.exists(backend_dir):
        os.chdir(backend_dir)
    
    success = test_backend()
    sys.exit(0 if success else 1)