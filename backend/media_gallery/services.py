from .models import GalleryAlbum, MediaAsset
from django.db.models import QuerySet

def get_featured_albums() -> QuerySet:
    return GalleryAlbum.objects.all().order_by('-created_at')[:5]

def get_featured_media() -> QuerySet:
    return MediaAsset.objects.filter(is_featured=True).order_by('-created_at')

def get_album_media(album_id) -> QuerySet:
    return MediaAsset.objects.filter(album_id=album_id)
