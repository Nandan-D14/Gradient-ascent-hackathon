#!/usr/bin/env python3
"""
Python Client for RAG PDF Analysis System
This client can be used to interact with the RAG server from any device
"""

import requests
import json
import os
import sys
from pathlib import Path

class RAGClient:
    def __init__(self, server_url="http://10.7.19.144:5000"):
        self.server_url = server_url
        self.session = requests.Session()
    
    def test_connection(self):
        """Test connection to the RAG server"""
        try:
            response = self.session.get(f"{self.server_url}/api/status")
            response.raise_for_status()
            data = response.json()
            
            if data['status'] == 'success':
                print("✅ Successfully connected to RAG server!")
                return True
            else:
                print(f"❌ Server error: {data['message']}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"❌ Connection failed: {e}")
            return False
    
    def upload_pdf(self, file_path):
        """Upload a PDF file to the server"""
        if not os.path.exists(file_path):
            print(f"❌ File not found: {file_path}")
            return False
        
        if not file_path.lower().endswith('.pdf'):
            print("❌ Please provide a PDF file")
            return False
        
        try:
            with open(file_path, 'rb') as file:
                files = {'file': file}
                response = self.session.post(f"{self.server_url}/api/upload", files=files)
                response.raise_for_status()
                data = response.json()
                
                if data['status'] == 'success':
                    print("✅ PDF uploaded and processed successfully!")
                    return True
                else:
                    print(f"❌ Upload error: {data['message']}")
                    return False
        except requests.exceptions.RequestException as e:
            print(f"❌ Upload failed: {e}")
            return False
    
    def get_summary(self):
        """Get document summary from the server"""
        try:
            response = self.session.post(f"{self.server_url}/api/summary")
            response.raise_for_status()
            data = response.json()
            
            if data['status'] == 'success':
                print("📝 Document Summary:")
                print("-" * 50)
                print(data['summary'])
                print("-" * 50)
                return data['summary']
            else:
                print(f"❌ Summary error: {data['message']}")
                return None
        except requests.exceptions.RequestException as e:
            print(f"❌ Summary request failed: {e}")
            return None
    
    def ask_question(self, question):
        """Ask a question about the document"""
        try:
            payload = {"question": question}
            response = self.session.post(
                f"{self.server_url}/api/ask", 
                json=payload,
                headers={'Content-Type': 'application/json'}
            )
            response.raise_for_status()
            data = response.json()
            
            if data['status'] == 'success':
                print(f"❓ Question: {data['question']}")
                print(f"💡 Answer: {data['answer']}")
                return data['answer']
            else:
                print(f"❌ Question error: {data['message']}")
                return None
        except requests.exceptions.RequestException as e:
            print(f"❌ Question request failed: {e}")
            return None

def main():
    """Interactive client interface"""
    print("🤖 RAG PDF Analysis Client")
    print("=" * 50)
    
    # Get server URL from user
    server_url = input("Enter server URL (default: http://10.7.19.144:5000): ").strip()
    if not server_url:
        server_url = "http://10.7.19.144:5000"
    
    client = RAGClient(server_url)
    
    # Test connection
    if not client.test_connection():
        print("Cannot connect to server. Please check the server URL and make sure the server is running.")
        return
    
    while True:
        print("\n📋 Choose an option:")
        print("1. Upload PDF file")
        print("2. Generate summary")
        print("3. Ask a question")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == "1":
            file_path = input("Enter path to PDF file: ").strip()
            client.upload_pdf(file_path)
        
        elif choice == "2":
            client.get_summary()
        
        elif choice == "3":
            question = input("Enter your question: ").strip()
            if question:
                client.ask_question(question)
            else:
                print("Please enter a question.")
        
        elif choice == "4":
            print("👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid choice. Please enter 1, 2, 3, or 4.")

if __name__ == "__main__":
    main()
