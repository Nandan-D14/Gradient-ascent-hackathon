@echo off
echo Testing Concept Master Project...
echo.

echo 1. Checking Backend Dependencies...
cd backend
python -c "import fastapi, uvicorn; print('✓ FastAPI and Uvicorn installed')" 2>nul || echo "✗ Missing backend dependencies"

echo 2. Checking Frontend Dependencies...
cd ../edu_ai
npm list next react 2>nul | findstr "next@" >nul && echo "✓ Next.js installed" || echo "✗ Missing frontend dependencies"

echo 3. Checking Environment Files...
if exist ".env.local" (echo "✓ Frontend .env.local exists") else (echo "✗ Missing frontend .env.local")
if exist "../backend/.env" (echo "✓ Backend .env exists") else (echo "✗ Missing backend .env")

echo 4. Testing API Key...
cd ../backend
python -c "import os; print('✓ Gemini API key configured' if os.getenv('GEMINI_API_KEY') else '✗ Missing Gemini API key')" 2>nul

echo.
echo Test complete! Check the results above.
echo If you see any ✗ marks, run install-dependencies.bat first.
pause