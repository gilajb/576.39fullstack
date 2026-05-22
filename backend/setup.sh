#!/usr/bin/env bash
# ── 576.39 Backend — First-time setup ──────────────────────────────────────
set -e

echo "→ Installing Python dependencies..."
pip install -r requirements.txt

echo "→ Creating PostgreSQL database..."
psql -U postgres -c "CREATE DATABASE db_576;" 2>/dev/null || echo "  (database may already exist)"

echo "→ Running migrations..."
python manage.py migrate

echo "→ Creating superuser..."
python manage.py createsuperuser --username admin --email admin@576.39.co

echo ""
echo "✓ Setup complete. Run: python manage.py runserver"
