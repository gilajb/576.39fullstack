# build_files.wsgi.py
import os
from django.core.wsgi import get_wsgi_application

# Replace 'myproject' with the actual folder name where your settings.py is located
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

app = get_wsgi_application()