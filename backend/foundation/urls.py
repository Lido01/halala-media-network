from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FoundationProgramViewSet, EventViewSet

router = DefaultRouter()
router.register(r'programs', FoundationProgramViewSet, basename='foundationprogram')
router.register(r'events', EventViewSet, basename='event')

urlpatterns = [
	path('', include(router.urls)),
]
