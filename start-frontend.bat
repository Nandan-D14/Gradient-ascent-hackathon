@echo off
echo Starting Concept Master Frontend...
echo.

cd edu_ai

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

echo Checking environment file...
if not exist ".env.local" (
    echo WARNING: .env.local not found
    echo Creating default environment file...
    echo GEMINI_API_KEY=AIzaSyBeJBFjl0nhSkgZ6aI5DqzYWt2QKZu7cDU > .env.local
    echo NEXT_PUBLIC_API_URL=http://localhost:8000 >> .env.local
)

echo.
echo Starting Next.js development server...
echo Frontend will be available at http://localhost:3000
echo.
echo Make sure the backend is running on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

npm run dev
pause