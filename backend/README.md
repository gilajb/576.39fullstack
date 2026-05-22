# 576.39 — Django Backend

REST API + PostgreSQL backend for the 576.39 contact form and admin dashboard.

## Stack
- **Django 4.2** + **Django REST Framework**
- **PostgreSQL** (via psycopg2)
- **django-cors-headers** for cross-origin requests from the Vite frontend

## Quick Start

```bash
# 1. Create & activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env with your DB credentials

# 4. Create the PostgreSQL database
psql -U postgres -c "CREATE DATABASE db_576;"

# 5. Run migrations
python manage.py migrate

# 6. Create admin superuser
python manage.py createsuperuser

# 7. Start the server (runs on port 8000)
python manage.py runserver
```

## API Endpoints

### Public
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/inquiries/` | Submit a contact form inquiry |

### Admin (requires staff session)
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/admin/login/` | Authenticate with username + password |
| POST | `/api/admin/logout/` | End session |
| GET | `/api/admin/session/` | Check current auth status |
| GET | `/api/admin/stats/` | Aggregate stats for dashboard |
| GET | `/api/admin/inquiries/` | List all inquiries (filterable, paginated) |
| PATCH | `/api/admin/inquiries/<id>/` | Update status or notes |
| DELETE | `/api/admin/inquiries/<id>/` | Delete an inquiry |

### Query Parameters for `GET /api/admin/inquiries/`
| Param | Values | Description |
|-------|--------|-------------|
| `status` | `all`, `new`, `reviewed`, `replied`, `archived` | Filter by status |
| `division` | `all`, `Strategy Lab`, `Cultural Engine`, `Research & Intelligence`, `Other` | Filter by division |
| `search` | any string | Search name, email, organisation |
| `page` | integer | Page number (default: 1) |
| `page_size` | integer | Results per page (default: 20) |

## Inquiry Model Fields
| Field | Type | Description |
|-------|------|-------------|
| `name` | CharField | Submitter's name |
| `organisation` | CharField | Optional organisation |
| `email` | EmailField | Contact email |
| `division` | CharField | Division of interest |
| `message` | TextField | Inquiry body |
| `status` | CharField | `new` / `reviewed` / `replied` / `archived` |
| `admin_notes` | TextField | Internal notes (admin only) |
| `created_at` | DateTimeField | Submission timestamp |
| `updated_at` | DateTimeField | Last update timestamp |

## Django Admin
The built-in Django admin is also available at `/django-admin/` with full search, filtering, and inline editing.

## Environment Variables
See `.env.example` for all configurable values.
