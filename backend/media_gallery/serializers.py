from rest_framework import serializers
from .models import GalleryAlbum, MediaAsset

class GalleryAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryAlbum
        fields = '__all__'

class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = '__all__'
