from rest_framework import viewsets, permissions
from .models import GalleryAlbum, MediaAsset
from .serializers import GalleryAlbumSerializer, MediaAssetSerializer
from .services import get_featured_albums, get_featured_media, get_album_media

class GalleryAlbumViewSet(viewsets.ModelViewSet):
    queryset = GalleryAlbum.objects.all().order_by('-created_at')
    serializer_class = GalleryAlbumSerializer

    def get_permissions(self):
        # Block regular users from creating, updating, or deleting
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        # Allow anyone to view lists and detail endpoints
        return [permissions.IsAuthenticatedOrReadOnly()]

class MediaAssetViewSet(viewsets.ModelViewSet):
    queryset = MediaAsset.objects.all().order_by('-created_at')
    serializer_class = MediaAssetSerializer

    def get_permissions(self):
        # Block regular users from creating, updating, or deleting
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        # Allow anyone to view lists and detail endpoints
        return [permissions.IsAuthenticatedOrReadOnly()]

    def get_queryset(self):
        album_id = self.request.query_params.get('album')
        if album_id:
            return get_album_media(album_id)
        return MediaAsset.objects.all().order_by('-created_at')
