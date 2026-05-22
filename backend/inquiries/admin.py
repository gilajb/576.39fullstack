from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display  = ("name", "email", "organisation", "division", "status", "created_at")
    list_filter   = ("status", "division", "created_at")
    search_fields = ("name", "email", "organisation", "message")
    ordering      = ("-created_at",)
    readonly_fields = ("name", "email", "organisation", "division", "message", "created_at", "updated_at")

    fieldsets = (
        ("Submitted Information", {
            "fields": ("name", "organisation", "email", "division", "message")
        }),
        ("Admin", {
            "fields": ("status", "admin_notes", "created_at", "updated_at")
        }),
    )
