@echo off
REM ── 576.39 Backend — Windows Setup Script ─────────────────────────────────
echo.
echo  576.39 Backend Setup
echo  ---------------------
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found. Install from https://python.org
    pause
    exit /b 1
)

REM Only create venv if not already inside one
if "%VIRTUAL_ENV%"=="" (
    if not exist venv\Scripts\activate.bat (
        echo [1/5] Creating virtual environment...
        python -m venv venv
    ) else (
        echo [1/5] Virtual environment already exists, skipping creation.
    )
    echo      Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo [1/5] Virtual environment already active: %VIRTUAL_ENV%
)

REM Install dependencies
echo [2/5] Installing dependencies...
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo [ERROR] pip install failed.
    pause
    exit /b 1
)
echo       Done.

REM Create .env if it doesn't exist
if not exist .env (
    echo [3/5] Creating .env from template...
    copy .env.example .env >nul
    echo       .env created. Please open it now and set DB_PASSWORD.
    echo.
    echo  ----------------------------------------------------------
    echo   Open backend\.env in Notepad and change this line:
    echo     DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
    echo   to your actual PostgreSQL password, then press any key.
    echo  ----------------------------------------------------------
    echo.
    pause
) else (
    echo [3/5] .env already exists, skipping.
)

REM Run migrations
echo [4/5] Running database migrations...
python manage.py migrate
if errorlevel 1 (
    echo.
    echo  [ERROR] Migration failed. Common causes:
    echo    - PostgreSQL is not running
    echo    - Database 'db_576' does not exist yet
    echo    - Wrong DB_PASSWORD in .env
    echo.
    echo  See setup_windows.md for how to create the database,
    echo  then run this script again.
    echo.
    pause
    exit /b 1
)
echo       Done.

REM Create superuser
echo [5/5] Creating admin superuser...
echo       (Choose any username and password - you will use these to log in)
echo.
python manage.py createsuperuser
if errorlevel 1 (
    echo  Superuser may already exist, or was cancelled. Continuing...
)

echo.
echo  ============================================================
echo   Setup complete!
echo.
echo   To start the backend server, run:
echo     python manage.py runserver
echo.
echo   Then start the frontend in a second terminal:
echo     cd ..\frontend
echo     npm install
echo     npm run dev
echo.
echo   Admin dashboard: http://localhost:3000/admin
echo  ============================================================
echo.
pause
