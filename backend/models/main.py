#!/usr/bin/env python3
"""
RAG (Retrieval-Augmented Generation) System for PDF Document Analysis
This script provides a complete pipeline for processing PDF documents and answering questions.
"""

import os
import sys
from pathlib import Path

def get_gemini_api_key():
    """Fetch Gemini API key from the environment."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY environment variable is required.")
    return api_key

def check_dependencies():
    """Check if all required dependencies are installed."""
    try:
        import langchain
        import langchain_community
        import langchain_google_genai
        import langchain_huggingface
        import google.generativeai
        import faiss
        import sentence_transformers
        import PyPDF2
        print("✅ All dependencies are installed!")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please run: pip install -r requirements.txt")
        return False

def setup_vectorstore():
    """Set up the vector store from the PDF document."""
    print("🔄 Setting up vector store from PDF...")
    
    # Check if vector store already exists
    if os.path.exists("pdf_index") and os.path.exists("pdf_index/index.faiss"):
        print("✅ Vector store already exists!")
        return True
    
    # Check if PDF exists
    pdf_path = "LCAT_Certificate_Retesh_G_S.pdf"
    if not os.path.exists(pdf_path):
        print(f"❌ PDF file not found: {pdf_path}")
        return False
    
    try:
        # Import and run the storevp.py script
        import storevp
        print("✅ Vector store created successfully!")
        return True
    except Exception as e:
        print(f"❌ Error creating vector store: {e}")
        return False

def run_rag_summary():
    """Run the RAG summary generation."""
    print("🔄 Generating document summary...")
    
    try:
        import rag_summary
        print("✅ Summary generated successfully!")
        return True
    except Exception as e:
        print(f"❌ Error generating summary: {e}")
        return False

def interactive_qa():
    """Interactive question-answering session."""
    print("\n🤖 Interactive Q&A Session")
    print("Ask questions about the document (type 'quit' to exit)")
    print("-" * 50)
    
    try:
        from langchain.chains import RetrievalQA
        from langchain_google_genai import ChatGoogleGenerativeAI
        from langchain_community.vectorstores import FAISS
        from langchain_huggingface import HuggingFaceEmbeddings

        api_key = get_gemini_api_key()
        
        # Load components
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vectorstore = FAISS.load_local("pdf_index", embedding_model, allow_dangerous_deserialization=True)
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key=api_key
        )
        retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            chain_type="stuff"
        )
        
        while True:
            question = input("\n❓ Your question: ").strip()
            if question.lower() in ['quit', 'exit', 'q']:
                print("👋 Goodbye!")
                break
            
            if not question:
                continue
                
            try:
                print("🔄 Processing your question...")
                answer = qa_chain.invoke({"query": question})
                print(f"\n💡 Answer: {answer['result']}")
            except Exception as e:
                print(f"❌ Error processing question: {e}")
                
    except Exception as e:
        print(f"❌ Error setting up interactive Q&A: {e}")

def main():
    """Main function to run the RAG system."""
    print("🚀 RAG System for PDF Document Analysis")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Setup vector store
    if not setup_vectorstore():
        return
    
    # Show menu
    while True:
        print("\n📋 Choose an option:")
        print("1. Generate document summary")
        print("2. Interactive Q&A session")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == "1":
            run_rag_summary()
        elif choice == "2":
            interactive_qa()
        elif choice == "3":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
