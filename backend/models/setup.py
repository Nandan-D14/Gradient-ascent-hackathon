#!/usr/bin/env python3
"""
Setup script for the RAG PDF Analysis System
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages from requirements.txt"""
    print("🔄 Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ All packages installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing packages: {e}")
        return False

def check_pdf_file():
    """Check if the PDF file exists"""
    pdf_path = "LCAT_Certificate_Retesh_G_S.pdf"
    if os.path.exists(pdf_path):
        print(f"✅ PDF file found: {pdf_path}")
        return True
    else:
        print(f"❌ PDF file not found: {pdf_path}")
        print("Please make sure the PDF file is in the current directory.")
        return False

def main():
    """Main setup function"""
    print("🚀 Setting up RAG PDF Analysis System")
    print("=" * 50)
    
    # Check PDF file
    if not check_pdf_file():
        return
    
    # Install requirements
    if not install_requirements():
        return
    
    print("\n✅ Setup complete!")
    print("\nTo run the system:")
    print("  python main.py")
    print("\nOr run individual components:")
    print("  python storevp.py    # Create vector store")
    print("  python rag_summary.py # Generate summary")

if __name__ == "__main__":
    main()
