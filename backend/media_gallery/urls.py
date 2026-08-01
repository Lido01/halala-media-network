from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GalleryAlbumViewSet, MediaAssetViewSet

router = DefaultRouter()
router.register(r'albums', GalleryAlbumViewSet, basename='galleryalbum')
router.register(r'assets', MediaAssetViewSet, basename='mediaasset')

urlpatterns = [
    path('', include(router.urls)),
]
