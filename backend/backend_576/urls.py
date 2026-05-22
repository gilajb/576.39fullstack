"""
576.39 — Root URL Configuration
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("django-admin/", admin.site.urls),          # Django built-in admin
    path("api/", include("inquiries.urls")),          # REST API
]
