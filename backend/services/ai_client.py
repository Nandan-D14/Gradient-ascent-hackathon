import os
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def ask_gemini(prompt: str, model="gemini-1.5-flash"):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    res = requests.post(url, json=payload)
    return res.json()["candidates"][0]["content"]["parts"][0]["text"]

def generate_notes(content: str) -> str:
    prompt = f"Summarize the following text into structured notes:\n\n{content}"
    return ask_gemini(prompt)

def tutor_chat(question: str) -> str:
    return ask_gemini(question)

def predict_exam(content: str) -> str:
    prompt = f"Based on the following past papers, predict the likely exam questions and topics:\n\n{content}"
    return ask_gemini(prompt)

def book_recommendations(interests: str) -> str:
    prompt = f"Recommend 5 study books for the following interests, with reasons: {interests}"
    return ask_gemini(prompt)

