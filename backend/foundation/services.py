# foundation/services.py
from .models import FoundationProgram, Event
from django.db.models import QuerySet

def get_active_foundation_programs() -> QuerySet:
    return FoundationProgram.objects.filter(is_active=True).order_by('-created_at')

def get_upcoming_events() -> QuerySet:
    from django.utils import timezone
    return Event.objects.filter(date__gte=timezone.now()).order_by('date')
