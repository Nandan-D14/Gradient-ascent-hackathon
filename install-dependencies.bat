@echo off
echo Installing Backend Dependencies...
cd backend
pip install -r requirements.txt

echo.
echo Installing Frontend Dependencies...
cd ../edu_ai
npm install

echo.
echo All dependencies installed successfully!
pause