# Windows PostgreSQL Setup Guide

## Option A — pgAdmin (Easiest, no command line needed)

1. Download & install PostgreSQL for Windows:
   https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2. During install, note your **postgres password** — you'll need it.

3. After install, open **pgAdmin 4** (installed automatically).

4. In pgAdmin: right-click **Databases** → **Create** → **Database**
   - Name: `db_576`
   - Click **Save**

5. That's it — skip to "Configure .env" below.

---

## Option B — Add psql to PATH (then use normal commands)

1. Find your PostgreSQL bin folder, typically:
   `C:\Program Files\PostgreSQL\16\bin`

2. Add it to PATH:
   - Search "Environment Variables" in Start Menu
   - Edit "Path" under System Variables
   - Add the bin folder path
   - Click OK, restart your terminal

3. Now run:
   ```
   psql -U postgres -c "CREATE DATABASE db_576;"
   ```

---

## Option C — Use the SQL Shell (psql) shortcut

PostgreSQL installs a **SQL Shell (psql)** shortcut in your Start Menu.

1. Open **SQL Shell (psql)** from Start Menu
2. Press Enter to accept defaults for host/port/dbname/username
3. Enter your postgres password
4. Run:
   ```sql
   CREATE DATABASE db_576;
   \q
   ```

---

## Configure .env (after creating the database)

Edit `backend/.env`:

```
DJANGO_SECRET_KEY=any-long-random-string-here
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1

DB_NAME=db_576
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000 http://127.0.0.1:3000
```

---

## Run the backend (Windows)

Open a Command Prompt or PowerShell in the `backend/` folder:

```bat
:: Create virtual environment
python -m venv venv

:: Activate it
venv\Scripts\activate

:: Install dependencies
pip install -r requirements.txt

:: Copy and edit .env
copy .env.example .env
:: (edit .env with your DB password)

:: Run migrations
python manage.py migrate

:: Create admin user
python manage.py createsuperuser

:: Start server
python manage.py runserver
```

---

## Run the frontend (Windows)

Open a second Command Prompt in the `frontend/` folder:

```bat
npm install
npm run dev
```

Then visit:
- **Website** → http://localhost:3000
- **Admin** → http://localhost:3000/admin

