# 576.39 — Full Stack Project

> Systems Architecture & Cultural Intelligence Institution
> **Frontend:** React + Vite · **Backend:** Django + PostgreSQL

---

## Project Structure

```
576-39-project/
├── frontend/               ← React/Vite public website + /admin dashboard UI
│   ├── src/
│   │   ├── components/     ← All public-facing sections
│   │   ├── pages/          ← AdminDashboard.jsx
│   │   ├── constants/      ← palette.js (colour tokens)
│   │   ├── hooks/          ← useIntersection, useParallax
│   │   └── styles/         ← global.css
│   ├── .env.example
│   └── package.json
│
└── backend/                ← Django REST API + PostgreSQL
    ├── inquiries/          ← App: model, views, serializers, urls, admin
    ├── backend_576/        ← Django project settings + root urls
    ├── requirements.txt
    ├── .env.example
    ├── setup.bat           ← Windows one-click setup
    └── setup_windows.md    ← Windows PostgreSQL guide
```

---

## Prerequisites

| Tool | Min Version | Download |
|------|-------------|----------|
| Node.js | 18+ | https://nodejs.org |
| Python | 3.10+ | https://python.org |
| PostgreSQL | 13+ | https://www.enterprisedb.com/downloads/postgres-postgresql-downloads |

---

## Step 1 — Create the PostgreSQL Database

### Windows (choose one method)

**Method A — pgAdmin (no command line needed)**
1. Install PostgreSQL from the link above — pgAdmin installs automatically
2. Open **pgAdmin 4** from the Start Menu
3. Right-click **Databases** → **Create** → **Database**
4. Set Name: `db_576` → click **Save**

**Method B — SQL Shell shortcut**
1. Open **SQL Shell (psql)** from the Start Menu
2. Press Enter at every prompt, then enter your postgres password
3. Type and press Enter:
   ```sql
   CREATE DATABASE db_576;
   \q
   ```

**Method C — Add psql to PATH first**
1. Find `C:\Program Files\PostgreSQL\16\bin` (adjust version number)
2. Add it to your System PATH (search "Environment Variables" in Start Menu)
3. Restart terminal, then:
   ```
   psql -U postgres -c "CREATE DATABASE db_576;"
   ```

### macOS / Linux
```bash
psql -U postgres -c "CREATE DATABASE db_576;"
```

---

## Step 2 — Backend Setup

### Windows

```bat
cd backend

REM Option A: Double-click setup.bat in File Explorer
REM Option B: Run from Command Prompt:
setup.bat
```

The script will:
- Create a Python virtual environment
- Install all dependencies
- Prompt you to fill in `.env` (set your DB password)
- Run migrations
- Create your admin superuser

### macOS / Linux

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # then edit .env with your DB password
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

## Step 3 — Configure .env

Open `backend/.env` (copied from `.env.example`) and set:

```env
DJANGO_SECRET_KEY=any-long-random-string-at-least-50-chars
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1

DB_NAME=db_576
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE   ← change this
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000 http://127.0.0.1:3000
```

---

## Step 4 — Start the Backend

```bat
REM Windows — make sure venv is active:
venv\Scripts\activate
python manage.py runserver
```
```bash
# macOS / Linux
source venv/bin/activate
python manage.py runserver
```

API now running at **http://localhost:8000**

---

## Step 5 — Frontend Setup

Open a **second** terminal window:

```bat
cd frontend
npm install
npm run dev
```

Site now running at **http://localhost:3000**

---

## Accessing the Admin Dashboard

1. Both servers must be running (Steps 4 & 5)
2. Open **http://localhost:3000/admin**
3. Log in with the superuser credentials you created in Step 2

---

## How the Contact Form Works

```
User fills contact form on the website
            ↓
    POST /api/inquiries/
    (public endpoint, rate-limited 20/hr)
            ↓
    Django validates + saves to PostgreSQL
            ↓
    Admin visits /admin, logs in
            ↓
    GET /api/admin/inquiries/   (staff-only)
            ↓
    Dashboard — filter, search, update status, add notes
```

---

## Admin Dashboard Features

| Feature | Description |
|---------|-------------|
| Stats cards | Total / this week / awaiting review / replied |
| Status filter | New · Reviewed · Replied · Archived — with counts |
| Division filter | Strategy Lab · Cultural Engine · Research & Intel |
| Live search | Debounced search across name, email, organisation |
| Pagination | 15 per page with smart ellipsis |
| Detail drawer | Click any row — full message, status selector, notes |
| Save changes | PATCH status + admin notes instantly |
| Delete | Hard delete with confirmation |

---

## API Reference

### Public
```
POST /api/inquiries/
Body: { name, organisation, email, division, message }
```

### Admin (requires staff session cookie)
```
POST   /api/admin/login/              { username, password }
POST   /api/admin/logout/
GET    /api/admin/session/
GET    /api/admin/stats/
GET    /api/admin/inquiries/          ?status= &division= &search= &page=
PATCH  /api/admin/inquiries/<id>/     { status, admin_notes }
DELETE /api/admin/inquiries/<id>/
```

---

## Django Built-in Admin (bonus)

Also available at **http://localhost:8000/django-admin/** — full database browser with search, filters, and bulk actions.

---

## Production Checklist

### Backend
- [ ] Set `DJANGO_DEBUG=False`
- [ ] Use a strong 50+ char `DJANGO_SECRET_KEY`
- [ ] Set `DJANGO_ALLOWED_HOSTS` to your domain
- [ ] Set `CORS_ALLOWED_ORIGINS` to your frontend URL
- [ ] Use Gunicorn: `gunicorn backend_576.wsgi`
- [ ] Run `python manage.py collectstatic`

### Frontend
- [ ] Set `VITE_API_URL` in `.env` to your live API URL
- [ ] `npm run build` → deploy the `dist/` folder
- [ ] Configure server to return `index.html` for all routes

