import uuid
from django.db import models
from django.utils.text import slugify
from accounts.models import User

class FoundationProgram(models.Model):
    PROG_TYPES = [
        ('child', 'One Child One Package'),
        ('charity', 'Charity'),
        ('community', 'Community Outreach'),
    ]
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    type = models.CharField(max_length=20, choices=PROG_TYPES)
    title = models.CharField(max_length=200)
    
    # 1. ADDED UNIQUE SLUG SYSTEM: Prevents empty frontend list/details route errors
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    
    headline = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='foundation/')
    report_file = models.FileField(upload_to='reports/', null=True, blank=True)
    budget = models.CharField(max_length=100, blank=True, null=True)
    impact = models.CharField(max_length=255, blank=True, null=True)
    year = models.CharField(max_length=20, blank=True, null=True)
    quote = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    legacy = models.CharField(max_length=255, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def save(self, *args, **kwargs):
        # 2. BULLETPROOF AUTOMATED SLUG INITIALIZATION
        if not self.slug:
            generated_slug = slugify(self.title)
            # Amharic/Non-Latin title fallback logic
            if not generated_slug:
                self.slug = f"program-{uuid.uuid4().hex[:8]}"
            else:
                self.slug = generated_slug
                
        base_slug = self.slug
        counter = 1
        while FoundationProgram.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            self.slug = f"{base_slug}-{uuid.uuid4().hex[:4]}"
            counter += 1
            if counter > 10:
                self.slug = f"{base_slug}-{uuid.uuid4().hex[:8]}"
                break
                
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.get_type_display()}] {self.title}"


class Event(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    
    # 3. ADDED UNIQUE SLUG SYSTEM: Allows dynamic routing for front-end Event schedules
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='events/')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            generated_slug = slugify(self.title)
            if not generated_slug:
                self.slug = f"event-{uuid.uuid4().hex[:8]}"
            else:
                self.slug = generated_slug
                
        base_slug = self.slug
        counter = 1
        while Event.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            self.slug = f"{base_slug}-{uuid.uuid4().hex[:4]}"
            counter += 1
            if counter > 10:
                self.slug = f"{base_slug}-{uuid.uuid4().hex[:8]}"
                break
                
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
