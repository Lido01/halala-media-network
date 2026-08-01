import tempfile

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Post


def build_test_image(name="thumb.png"): # Helper function to create a simple in-memory image file for testing
    return SimpleUploadedFile(
        name,
        (
            b"\x89PNG\r\n\x1a\n"
            b"\x00\x00\x00\rIHDR"
            b"\x00\x00\x00\x01"
            b"\x00\x00\x00\x01"
            b"\x08\x02\x00\x00\x00"
            b"\x90wS\xde"
            b"\x00\x00\x00\nIDATx\x9cc``\x00\x00\x00\x02\x00\x01"
            b"\xe2!\xbc3"
            b"\x00\x00\x00\x00IEND\xaeB`\x82"
        ),
        content_type="image/png",
    )


@override_settings(MEDIA_ROOT=tempfile.mkdtemp())
class ContentApiTests(APITestCase):
    def setUp(self):
        self.user_model = get_user_model()
        self.author = self.user_model.objects.create_user(
            username="content-author",
            email="author@example.com",
            password="StrongPass123!",
        )
        self.post = Post.objects.create(
            category="news",
            title="Content Test Post",
            thumbnail=build_test_image(),
            body="A short body for the content test.",
            author=self.author,
            is_featured=True,
            is_published=True,
        )

    def test_posts_list_and_category_filter(self):
        response = self.client.get("/api/content/posts/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Content Test Post")

        filtered_response = self.client.get("/api/content/posts/?category=news")
        self.assertEqual(filtered_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(filtered_response.data), 1)

    def test_post_detail_increments_views(self):
        response = self.client.get(f"/api/content/posts/{self.post.pk}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.post.refresh_from_db()
        self.assertEqual(self.post.views_count, 1)
  
    def test_authenticated_user_can_not_create_post(self):
        self.client.force_authenticate(user=self.author)
        
        response = self.client.post(
            "/api/content/posts/",
            {
                "category": "news",
                "title": "New Post",
                "thumbnail": build_test_image("new.png"),
                "body": "Body of the new post.",
                "is_featured": False,
                "is_published": True,
            },
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

