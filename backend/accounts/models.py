from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    is_editor = models.BooleanField(default=False, help_text="Can add news but not delete others' posts")
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return self.email if self.email else self.username