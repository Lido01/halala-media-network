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
    description = models.TextField()
    image = models.ImageField(upload_to='foundation/')
    report_file = models.FileField(upload_to='reports/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Event(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='events/')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title