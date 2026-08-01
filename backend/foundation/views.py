from rest_framework import viewsets, permissions
from .models import FoundationProgram, Event
from .serializers import FoundationProgramSerializer, EventSerializer
from .services import get_active_foundation_programs

class FoundationProgramViewSet(viewsets.ModelViewSet):
    queryset = FoundationProgram.objects.all().order_by('-created_at')
    serializer_class = FoundationProgramSerializer

    def get_permissions(self):
        # Only allow staff/admin users to create, update, or delete
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        # Allow anyone (even unauthenticated users) to read/view lists
        return [permissions.IsAuthenticatedOrReadOnly()]

    def get_queryset(self):
        return get_active_foundation_programs()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-date')
    serializer_class = EventSerializer

    def get_permissions(self):
        # Only allow staff/admin users to create, update, or delete
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        # Allow anyone to read/view lists
        return [permissions.IsAuthenticatedOrReadOnly()]

    def get_queryset(self):
        return Event.objects.all().order_by('-date')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
