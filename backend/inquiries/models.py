from django.db import models


class DivisionChoice(models.TextChoices):
    STRATEGY_LAB  = "Strategy Lab",      "Strategy Lab"
    CULTURAL      = "Cultural Engine",   "Cultural Engine"
    RESEARCH      = "Research & Intelligence", "Research & Intelligence"
    OTHER         = "Other",             "Other"


class StatusChoice(models.TextChoices):
    NEW       = "new",       "New"
    REVIEWED  = "reviewed",  "Reviewed"
    REPLIED   = "replied",   "Replied"
    ARCHIVED  = "archived",  "Archived"


class Inquiry(models.Model):
    # ── Submitted fields ──────────────────────────────────────────────────────
    name         = models.CharField(max_length=200)
    organisation = models.CharField(max_length=200, blank=True)
    email        = models.EmailField()
    division     = models.CharField(
        max_length=50,
        choices=DivisionChoice.choices,
        default=DivisionChoice.OTHER,
    )
    message      = models.TextField()

    # ── Admin-managed fields ──────────────────────────────────────────────────
    status       = models.CharField(
        max_length=20,
        choices=StatusChoice.choices,
        default=StatusChoice.NEW,
    )
    admin_notes  = models.TextField(blank=True)

    # ── Timestamps ────────────────────────────────────────────────────────────
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name        = "Inquiry"
        verbose_name_plural = "Inquiries"

    def __str__(self):
        return f"{self.name} — {self.division} ({self.created_at:%Y-%m-%d})"
