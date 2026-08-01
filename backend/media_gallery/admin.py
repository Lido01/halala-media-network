from django.contrib import admin
from .models import GalleryAlbum, MediaAsset
@admin.register(GalleryAlbum)
class GalleryAlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title',)
@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ('title', 'media_type', 'album', 'created_at')
    search_fields = ('title',)
    list_filter = ('media_type', 'album')
    
