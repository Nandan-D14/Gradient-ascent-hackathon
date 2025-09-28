@echo off
echo Starting Concept Master Backend...
echo.

cd backend

echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo Checking dependencies...
python -c "import fastapi, uvicorn" >nul 2>&1
if errorlevel 1 (
    echo ERROR: Missing dependencies. Installing...
    pip install -r requirements.txt
)

echo Checking environment variables...
python -c "import os; exit(0 if os.getenv('GEMINI_API_KEY') else 1)" >nul 2>&1
if errorlevel 1 (
    echo WARNING: GEMINI_API_KEY not found in environment
    echo Make sure backend/.env file exists with your API key
)

echo.
echo Starting FastAPI server on http://localhost:8000
echo API documentation will be available at http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
pause