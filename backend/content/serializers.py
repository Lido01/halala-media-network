from rest_framework import serializers
from .models import Post

class PostListSerializer(serializers.ModelSerializer):
    """Short version for cards and lists."""
    class Meta:
        model = Post
        fields = ['id', 'category', 'title', 'slug', 'thumbnail', 'views_count', 'created_at', 'body']

class PostDetailSerializer(serializers.ModelSerializer):
    """Full version for the article page."""
    class Meta:
        model = Post
        fields = '__all__'
        
class PostCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating posts."""
    class Meta:
        model = Post
        fields = ['category', 'title', 'thumbnail', 'body', 'is_featured', 'is_published']
        