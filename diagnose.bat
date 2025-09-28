@echo off
echo ========================================
echo    Concept Master Diagnostic Tool
echo ========================================
echo.

echo Checking system requirements...
echo.

echo 1. Python Installation:
python --version 2>nul && echo ✓ Python is installed || echo ✗ Python not found - install from https://python.org

echo.
echo 2. Node.js Installation:
node --version 2>nul && echo ✓ Node.js is installed || echo ✗ Node.js not found - install from https://nodejs.org

echo.
echo 3. Backend Dependencies:
cd backend 2>nul && (
    python -c "import fastapi" 2>nul && echo ✓ FastAPI installed || echo ✗ FastAPI missing - run install-dependencies.bat
    python -c "import uvicorn" 2>nul && echo ✓ Uvicorn installed || echo ✗ Uvicorn missing - run install-dependencies.bat
) || echo ✗ Backend directory not found

echo.
echo 4. Frontend Dependencies:
cd ../edu_ai 2>nul && (
    if exist "node_modules" (echo ✓ Node modules installed) else (echo ✗ Node modules missing - run install-dependencies.bat)
) || echo ✗ Frontend directory not found

echo.
echo 5. Environment Files:
if exist "backend\.env" (echo ✓ Backend .env exists) else (echo ✗ Backend .env missing - run setup-and-test.bat)
if exist "edu_ai\.env.local" (echo ✓ Frontend .env.local exists) else (echo ✗ Frontend .env.local missing - run setup-and-test.bat)

echo.
echo 6. API Key Configuration:
cd backend 2>nul && (
    python -c "import os; print('✓ Gemini API key configured' if os.getenv('GEMINI_API_KEY') else '✗ Gemini API key missing')" 2>nul
) || echo ✗ Cannot check API key

echo.
echo 7. Port Availability:
netstat -an | findstr ":8000" >nul && echo ⚠ Port 8000 is in use || echo ✓ Port 8000 is available
netstat -an | findstr ":3000" >nul && echo ⚠ Port 3000 is in use || echo ✓ Port 3000 is available

echo.
echo 8. Backend Server Status:
curl -s http://localhost:8000/health >nul 2>&1 && echo ✓ Backend server is running || echo ✗ Backend server not responding

echo.
echo ========================================
echo Diagnosis complete!
echo.
echo If you see any ✗ marks, run the suggested commands.
echo For a complete setup, run: setup-and-test.bat
echo ========================================
pause