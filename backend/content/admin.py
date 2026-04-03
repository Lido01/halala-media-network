from django.contrib import admin
from .models import Post
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'author', 'views_count', 'created_at')
    list_filter = ('category', 'is_featured', 'is_published')
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)}
