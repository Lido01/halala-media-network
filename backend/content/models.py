import uuid
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
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    thumbnail = models.ImageField(upload_to='content/thumbs/')
    body = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    views_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # 1. Handle slug generation if empty or not provided
        if not self.slug:
            generated_slug = slugify(self.title)
            
            # AMHARIC/NON-LATIN FIX: If slugify returns empty, create a clean random slug identifier
            if not generated_slug:
                self.slug = f"post-{uuid.uuid4().hex[:8]}"
            else:
                self.slug = generated_slug
        
        # 2. Loop to guarantee strict uniqueness before saving to the database
        base_slug = self.slug
        counter = 1
        
        # Exclude the current instance ID so updating an existing post doesn't loop infinitely
        while Post.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            unique_suffix = uuid.uuid4().hex[:4]
            self.slug = f"{base_slug}-{unique_suffix}"
            counter += 1
            
            # Absolute safety safety valve to avoid infinite system loops
            if counter > 10:
                self.slug = f"{base_slug}-{uuid.uuid4().hex[:8]}"
                break

        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.category}] {self.title}"
