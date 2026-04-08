from rest_framework import viewsets, permissions
from .models import FoundationProgram, Event
from .serializers import FoundationProgramSerializer, EventSerializer
from .services import get_active_foundation_programs, get_upcoming_events

class FoundationProgramViewSet(viewsets.ModelViewSet):
	queryset = FoundationProgram.objects.all().order_by('-created_at')
	serializer_class = FoundationProgramSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		return get_active_foundation_programs()

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

class EventViewSet(viewsets.ModelViewSet):
	queryset = Event.objects.all().order_by('-date')
	serializer_class = EventSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def get_queryset(self):
		return get_upcoming_events()

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)
