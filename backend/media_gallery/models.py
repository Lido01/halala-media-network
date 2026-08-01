from django.db import models

class GalleryAlbum(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='gallery/covers/')
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class MediaAsset(models.Model):
    MEDIA_TYPES = (
        ('image', 'Image'),
        ('video', 'Full Video'),
        ('reel', 'Reel/Short'),
    )
    
    album = models.ForeignKey(GalleryAlbum, on_delete=models.CASCADE, related_name='assets', null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES, default='image')
    
    # For Images
    image_file = models.ImageField(upload_to='gallery/items/', null=True, blank=True)
    story = models.TextField(blank=True, null=True)
    
    
    # For Videos/Reels (supports YouTube links or direct uploads)
    video_url = models.URLField(blank=True, help_text="Paste YouTube/Vimeo link here")
    video_file = models.FileField(upload_to='videos/', null=True, blank=True)
    
    is_featured = models.BooleanField(default=False) # Flag to mark as featured content
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Media Assets"