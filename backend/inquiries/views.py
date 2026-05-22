from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta

from django.core.mail import send_mail
from django.conf import settings
from .models import Inquiry, StatusChoice
from .serializers import InquiryCreateSerializer, InquiryAdminSerializer

# ── Public endpoint ────────────────────────────────────────────────────────────

class InquiryCreateView(APIView):
    """
    POST /api/inquiries/
    Public — accepts a new contact form submission.
    Rate-limited to 20 requests/hour per IP (see settings.py).
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = InquiryCreateSerializer(data=request.data)

        if serializer.is_valid():
            inquiry = serializer.save()

            # Send email notification
            try:
                send_mail(
                    subject=f"New Inquiry — 576.39 | {inquiry.division}",
                    message=f"""New inquiry received on 576.39

Name:         {inquiry.name}
Organisation: {inquiry.organisation or '—'}
Email:        {inquiry.email}
Division:     {inquiry.division}

Message:
{inquiry.message}

---
View in admin: http://localhost:3000/admin
""",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_RECIPIENT],
                    fail_silently=True,
                )
            except Exception:
                pass  # Never block the response if email fails

            return Response(
                {"message": "Inquiry received. We will be in touch."},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ── Admin endpoints ────────────────────────────────────────────────────────────

class AdminInquiryListView(APIView):
    """
    GET  /api/admin/inquiries/          — paginated list with filters
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        qs = Inquiry.objects.all()

        # Filter by status
        status_filter = request.query_params.get("status")
        if status_filter and status_filter != "all":
            qs = qs.filter(status=status_filter)

        # Filter by division
        division_filter = request.query_params.get("division")
        if division_filter and division_filter != "all":
            qs = qs.filter(division=division_filter)

        # Search by name / email / org
        search = request.query_params.get("search", "").strip()
        if search:
            from django.db.models import Q
            qs = qs.filter(
                Q(name__icontains=search)
                | Q(email__icontains=search)
                | Q(organisation__icontains=search)
            )

        # Simple pagination
        page      = int(request.query_params.get("page", 1))
        page_size = int(request.query_params.get("page_size", 20))
        total     = qs.count()
        start     = (page - 1) * page_size
        end       = start + page_size

        serializer = InquiryAdminSerializer(qs[start:end], many=True)
        return Response({
            "total":     total,
            "page":      page,
            "page_size": page_size,
            "results":   serializer.data,
        })


class AdminInquiryDetailView(APIView):
    """
    GET   /api/admin/inquiries/<pk>/    — retrieve single inquiry
    PATCH /api/admin/inquiries/<pk>/    — update status / admin_notes
    DELETE /api/admin/inquiries/<pk>/   — hard delete
    """
    permission_classes = [IsAdminUser]

    def _get_object(self, pk):
        try:
            return Inquiry.objects.get(pk=pk)
        except Inquiry.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self._get_object(pk)
        if not obj:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(InquiryAdminSerializer(obj).data)

    def patch(self, request, pk):
        obj = self._get_object(pk)
        if not obj:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = InquiryAdminSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        obj = self._get_object(pk)
        if not obj:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminStatsView(APIView):
    """
    GET /api/admin/stats/
    Returns aggregate counts for the dashboard header cards.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        total    = Inquiry.objects.count()
        by_status = (
            Inquiry.objects
            .values("status")
            .annotate(count=Count("id"))
        )
        by_division = (
            Inquiry.objects
            .values("division")
            .annotate(count=Count("id"))
        )
        # Last 7 days
        week_ago   = timezone.now() - timedelta(days=7)
        this_week  = Inquiry.objects.filter(created_at__gte=week_ago).count()

        return Response({
            "total":       total,
            "this_week":   this_week,
            "by_status":   list(by_status),
            "by_division": list(by_division),
        })


class AdminLoginView(APIView):
    """
    POST /api/admin/login/
    Accepts { username, password } and returns a session cookie.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        from django.contrib.auth import authenticate, login
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request, username=username, password=password)
        if user and user.is_staff:
            login(request, user)
            return Response({"message": "Authenticated", "username": user.username})
        return Response(
            {"error": "Invalid credentials or insufficient permissions."},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class AdminLogoutView(APIView):
    """POST /api/admin/logout/"""
    permission_classes = [IsAdminUser]

    def post(self, request):
        from django.contrib.auth import logout
        logout(request)
        return Response({"message": "Logged out."})


class AdminSessionView(APIView):
    """
    GET /api/admin/session/
    Returns current user info if authenticated; 401 otherwise.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({
            "username":   request.user.username,
            "is_staff":   request.user.is_staff,
        })
