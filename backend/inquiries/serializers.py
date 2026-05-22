from rest_framework import serializers
from .models import Inquiry


class InquiryCreateSerializer(serializers.ModelSerializer):
    """Used for public POST — only writable fields exposed."""

    class Meta:
        model  = Inquiry
        fields = ["name", "organisation", "email", "division", "message"]

    def validate_email(self, value):
        return value.lower().strip()

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        return value.strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters.")
        return value.strip()


class InquiryAdminSerializer(serializers.ModelSerializer):
    """Used for the admin dashboard — all fields including status."""

    class Meta:
        model  = Inquiry
        fields = [
            "id", "name", "organisation", "email",
            "division", "message", "status", "admin_notes",
            "created_at", "updated_at",
        ]
        read_only_fields = [
            "id", "name", "organisation", "email",
            "division", "message", "created_at", "updated_at",
        ]
