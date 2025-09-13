#!/usr/bin/env python3
"""
Flask Web Application for RAG PDF Analysis System
Provides a web interface for document summarization and Q&A
"""

from flask import Flask, render_template, request, jsonify, send_from_directory

from flask_cors import CORS
import os
import json
from pathlib import Path

# Import RAG components
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

app = Flask(__name__)
# Allow all origins for dev, or restrict to your frontend domain
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "*"]}})

# Global variables for RAG components
qa_chain = None
vectorstore = None
embedding_model = None

def initialize_rag_system():
    """Initialize the RAG system components"""
    global qa_chain, vectorstore, embedding_model
    
    try:
        # Load embedding model
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        
        # Load FAISS vectorstore from disk
        vectorstore = FAISS.load_local("pdf_index", embedding_model, allow_dangerous_deserialization=True)
        
        # Load Gemini LLM
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key="AIzaSyDo3dxn5yjUwpRR_qw2ev0_nnjH-y0J_Hk"
        )
        
        # Setup retriever
        retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
        
        # Build QA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            chain_type="stuff"
        )
        
        return True
    except Exception as e:
        print(f"Error initializing RAG system: {e}")
        return False

@app.route('/')
def index():
    """Main page"""
    return render_template('index.html')

@app.route('/api/status')
def status():
    """Check system status"""
    global qa_chain, vectorstore
    
    if qa_chain is None or vectorstore is None:
        return jsonify({
            'status': 'error',
            'message': 'RAG system not initialized'
        }), 500
    
    return jsonify({
        'status': 'success',
        'message': 'RAG system ready'
    })

@app.route('/api/summary', methods=['POST'])
def get_summary():
    """Generate document summary"""
    global qa_chain
    
    if qa_chain is None:
        return jsonify({
            'status': 'error',
            'message': 'RAG system not initialized'
        }), 500
    
    try:
        # Generate summary
        result = qa_chain.invoke({"query": "Summarize this entire document in detail"})
        summary = result['result']
        
        return jsonify({
            'status': 'success',
            'summary': summary
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error generating summary: {str(e)}'
        }), 500

@app.route('/api/ask', methods=['POST'])
def ask_question():
    """Ask a question about the document"""
    global qa_chain
    
    if qa_chain is None:
        return jsonify({
            'status': 'error',
            'message': 'RAG system not initialized'
        }), 500
    
    try:
        data = request.get_json()
        question = data.get('question', '').strip()
        
        if not question:
            return jsonify({
                'status': 'error',
                'message': 'Question cannot be empty'
            }), 400
        
        # Get answer
        result = qa_chain.invoke({"query": question})
        answer = result['result']
        
        return jsonify({
            'status': 'success',
            'question': question,
            'answer': answer
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Error processing question: {str(e)}'
        }), 500

@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    """Upload and process a new PDF file"""
    global qa_chain, vectorstore, embedding_model
    
    if 'file' not in request.files:
        return jsonify({
            'status': 'error',
            'message': 'No file uploaded'
        }), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({
            'status': 'error',
            'message': 'No file selected'
        }), 400
    
    if file and file.filename.lower().endswith('.pdf'):
        try:
            # Save uploaded file
            filename = 'uploaded_document.pdf'
            filepath = os.path.join(app.root_path, filename)
            file.save(filepath)
            
            # Process the new PDF
            from langchain_community.document_loaders import PyPDFLoader
            from langchain.text_splitter import RecursiveCharacterTextSplitter
            
            # Load PDF
            loader = PyPDFLoader(filepath)
            docs = loader.load()
            
            # Split into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200
            )
            splits = text_splitter.split_documents(docs)
            
            # Create new vector store
            if embedding_model is None:
                embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
            
            vectorstore = FAISS.from_documents(splits, embedding_model)
            vectorstore.save_local("pdf_index")
            
            # Reinitialize QA chain
            llm = ChatGoogleGenerativeAI(
                model="gemini-1.5-flash",
                google_api_key="AIzaSyDo3dxn5yjUwpRR_qw2ev0_nnjH-y0J_Hk"
            )
            retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
            qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                retriever=retriever,
                chain_type="stuff"
            )
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify({
                'status': 'success',
                'message': 'PDF processed successfully'
            })
            
        except Exception as e:
            return jsonify({
                'status': 'error',
                'message': f'Error processing PDF: {str(e)}'
            }), 500
    else:
        return jsonify({
            'status': 'error',
            'message': 'Please upload a PDF file'
        }), 400

if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    print(" Starting Flask server...")
    print("📱 Open your browser and go to: http://localhost:5000")
    # Do NOT initialize RAG system at startup; let upload endpoint handle it
    app.run(debug=True, host='0.0.0.0', port=5000)
