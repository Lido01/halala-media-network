from django.db import models
from django.utils.text import slugify
from accounts.models import User

class Post(models.Model):
    CATEGORY_CHOICES = [
        ('news', 'News'),
        ('interview', 'Interview'),
        ('documentary', 'Documentary'),
        ('announcement', 'Announcement'),
        ('project', 'Projects'),
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    thumbnail = models.ImageField(upload_to='content/thumbs/')
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    views_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.category}] {self.title}"