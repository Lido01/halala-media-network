import tempfile

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from .models import GalleryAlbum, MediaAsset


def build_test_image(name="gallery.png"):
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
class MediaGalleryApiTests(APITestCase):
    def setUp(self):
        self.user_model = get_user_model()
        self.user = self.user_model.objects.create_user(
            username="gallery-user",
            email="gallery@example.com",
            password="StrongPass123!",
        )
        self.album = GalleryAlbum.objects.create(
            title="Test Album",
            description="Album used for API tests.",
            cover_image=build_test_image("cover.png"),
        )
        self.other_album = GalleryAlbum.objects.create(
            title="Other Album",
            description="Another album.",
            cover_image=build_test_image("other-cover.png"),
        )
        self.asset = MediaAsset.objects.create(
            album=self.album,
            title="Featured Image",
            description="An image asset.",
            media_type="image",
            image_file=build_test_image("asset.png"),
            is_featured=True,
        )

    def test_albums_and_assets_list_endpoints_work(self):
        album_response = self.client.get("/api/media/albums/")
        self.assertEqual(album_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(album_response.data), 2)

        asset_response = self.client.get("/api/media/assets/")
        self.assertEqual(asset_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(asset_response.data), 1)

    def test_asset_album_filter_works(self):
        response = self.client.get(f"/api/media/assets/?album={self.album.pk}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Featured Image")

    def test_regular_authenticated_user_cannot_modify_gallery(self):
        """Ensure a non-staff user is blocked from POST, PATCH, and DELETE."""
        self.client.force_authenticate(user=self.user)

        # 1. Test Create Attempt (POST) -> Should be Forbidden
        create_response = self.client.post(
            "/api/media/albums/",
            {"title": "Unauthorized Album"},
            format="json",
        )
        self.assertEqual(create_response.status_code, status.HTTP_403_FORBIDDEN)

        # 2. Test Edit Attempt (PATCH) -> Should be Forbidden
        edit_response = self.client.patch(
            f"/api/media/albums/{self.album.pk}/",
            {"title": "Hacked Title"},
            format="json",
        )
        self.assertEqual(edit_response.status_code, status.HTTP_403_FORBIDDEN)

        # 3. Test Delete Attempt (DELETE) -> Should be Forbidden
        delete_response = self.client.delete(f"/api/media/assets/{self.asset.pk}/")
        self.assertEqual(delete_response.status_code, status.HTTP_403_FORBIDDEN)
