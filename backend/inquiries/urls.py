from django.urls import path
from . import views

urlpatterns = [
    # ── Public ────────────────────────────────────────────────────────────────
    path("inquiries/",           views.InquiryCreateView.as_view(),       name="inquiry-create"),

    # ── Auth ──────────────────────────────────────────────────────────────────
    path("admin/login/",         views.AdminLoginView.as_view(),           name="admin-login"),
    path("admin/logout/",        views.AdminLogoutView.as_view(),          name="admin-logout"),
    path("admin/session/",       views.AdminSessionView.as_view(),         name="admin-session"),

    # ── Admin data ────────────────────────────────────────────────────────────
    path("admin/stats/",         views.AdminStatsView.as_view(),           name="admin-stats"),
    path("admin/inquiries/",     views.AdminInquiryListView.as_view(),     name="admin-inquiry-list"),
    path("admin/inquiries/<int:pk>/", views.AdminInquiryDetailView.as_view(), name="admin-inquiry-detail"),
]
