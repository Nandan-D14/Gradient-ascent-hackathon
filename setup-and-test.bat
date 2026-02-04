@echo off
echo ========================================
echo    Concept Master Setup and Test
echo ========================================
echo.

echo Step 1: Installing Dependencies...
call install-dependencies.bat

echo.
echo Step 2: Setting up Environment Files...

if not exist "backend\.env" (
    echo Creating backend/.env...
    echo GEMINI_API_KEY=your_gemini_api_key > backend\.env
    echo GOOGLE_CLIENT_ID=your_google_client_id >> backend\.env
    echo GOOGLE_CLIENT_SECRET=your_google_client_secret >> backend\.env
    echo GOOGLE_REFRESH_TOKEN=your_refresh_token >> backend\.env
    echo GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback >> backend\.env
    echo FIREBASE_PROJECT_ID=your_firebase_project_id >> backend\.env
)

if not exist "edu_ai\.env.local" (
    echo Creating edu_ai/.env.local...
    echo GEMINI_API_KEY=your_gemini_api_key > edu_ai\.env.local
    echo NEXT_PUBLIC_API_URL=http://localhost:8000 >> edu_ai\.env.local
)

echo.
echo Step 3: Testing Backend...
python test-backend.py

echo.
echo Step 4: Setup Complete!
echo.
echo To start the application:
echo 1. Run start-backend.bat in one terminal
echo 2. Run start-frontend.bat in another terminal
echo 3. Open http://localhost:3000 in your browser
echo.
echo The AI Tutor should now work properly!
pause
