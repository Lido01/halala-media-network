from .models import Post
from django.db.models import F

def get_posts_by_category(category_name=None, featured_only=False):
    """Logic to filter posts for the frontend."""
    queryset = Post.objects.filter(is_published=True)
    if category_name:
        queryset = queryset.filter(category=category_name)
    if featured_only:
        queryset = queryset.filter(is_featured=True)
    return queryset.order_by('-created_at')

def increment_post_view(post_id):
    """
    Increments the view count using F() expressions 
    to prevent database race conditions.
    """
    Post.objects.filter(id=post_id).update(views_count=F('views_count') + 1)

def get_trending_content():
    """Logic to fetch high-traffic content."""
    return Post.objects.filter(is_published=True).order_by('-views_count')[:5]
