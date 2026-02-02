import os
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def ask_gemini(prompt: str, model="gemini-1.5-flash"):
    if not GEMINI_API_KEY:
        return "Error: Gemini API key not configured. Please check your environment variables."
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    
    try:
        res = requests.post(url, json=payload, timeout=30)
        res.raise_for_status()
        
        response_data = res.json()
        if "candidates" in response_data and len(response_data["candidates"]) > 0:
            return response_data["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return "Sorry, I couldn't generate a response. Please try again."
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return "Sorry, I'm having trouble connecting to the AI service. Please try again later."
    except (KeyError, IndexError) as e:
        print(f"Response parsing failed: {e}")
        return "Sorry, I received an unexpected response. Please try again."
    except Exception as e:
        print(f"Unexpected error: {e}")
        return "Sorry, something went wrong. Please try again."

def generate_notes(content: str) -> str:
    prompt = f"Summarize the following text into structured notes:\n\n{content}"
    return ask_gemini(prompt)

def tutor_chat(question: str) -> str:
    # Enhanced prompt for better educational responses
    enhanced_prompt = f"""
    You are an expert AI tutor. Please provide a comprehensive, educational response to this question: {question}
    
    Guidelines:
    - Explain concepts clearly and step-by-step
    - Use examples when helpful
    - Break down complex topics into digestible parts
    - Be encouraging and supportive
    - If it's a coding question, provide code examples
    - If it's a theoretical question, provide practical applications
    
    Question: {question}
    """
    return ask_gemini(enhanced_prompt)

def predict_exam(content: str) -> str:
    prompt = f"Based on the following past papers, predict the likely exam questions and topics:\n\n{content}"
    return ask_gemini(prompt)

def book_recommendations(interests: str) -> str:
    prompt = f"Recommend 5 study books for the following interests, with reasons: {interests}"
    return ask_gemini(prompt)

import json

def generate_quiz(topic: str, difficulty: str = "intermediate", num_questions: int = 5) -> str:
    prompt = f"""
    Create a {difficulty} level quiz about {topic} with {num_questions} multiple choice questions.
    
    Format the response as JSON with this exact structure:
    {{
        "questions": [
            {{
                "question": "Question text here?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct": 0,
                "explanation": "Detailed explanation of why this is correct"
            }}
        ]
    }}
    
    Make sure:
    - Questions are educational and test understanding
    - Options are plausible but only one is correct
    - Explanations are detailed and helpful
    - Difficulty matches the {difficulty} level
    """
    response = ask_gemini(prompt)
    try:
        json.loads(response)
        return response
    except json.JSONDecodeError:
        return json.dumps({
            "questions": [
                {
                    "question": "Sorry, I couldn't generate a quiz for this topic. Please try again.",
                    "options": [],
                    "correct": 0,
                    "explanation": ""
                }
            ]
        })

def generate_topic_summary(topic: str, level: str = "intermediate") -> str:
    prompt = f"""
    Create a comprehensive summary of {topic} for {level} level students.
    
    Include:
    - Key concepts and definitions
    - Important principles and rules
    - Common applications and use cases
    - Tips for understanding and remembering
    - Connection to other related topics
    
    Format with clear headings and bullet points for easy reading.
    """
    return ask_gemini(prompt)

def generate_examples(topic: str, level: str = "intermediate") -> str:
    prompt = f"""
    Provide practical, real-world examples and applications of {topic} for {level} level students.
    
    Include:
    - 2-3 concrete real-world examples
    - Code examples if applicable
    - Step-by-step explanations
    - How it's used in industry
    - Why it's important to learn
    
    Make examples relatable and easy to understand.
    """
    return ask_gemini(prompt)

