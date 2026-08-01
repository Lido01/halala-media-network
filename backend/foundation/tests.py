import tempfile
from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Event, FoundationProgram


def build_test_image(name="foundation.png"):
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
class FoundationApiTests(APITestCase):
    def setUp(self):
        self.user_model = get_user_model()
        self.author = self.user_model.objects.create_user(
            username="foundation-author",
            email="foundation@example.com",
            password="StrongPass123!",
        )
        self.active_program = FoundationProgram.objects.create(
            author=self.author,
            type="child",
            title="Active Program",
            description="Visible in the API list.",
            image=build_test_image(),
            is_active=True,
        )
        self.inactive_program = FoundationProgram.objects.create(
            author=self.author,
            type="charity",
            title="Inactive Program",
            description="Should be filtered out.",
            image=build_test_image("inactive.png"),
            is_active=False,
        )
        self.past_event = Event.objects.create(
            author=self.author,
            title="Past Event",
            date=timezone.now() - timedelta(days=1),
            location="Accra",
            description="Already happened.",
            thumbnail=build_test_image("past-event.png"),
        )
        self.future_event = Event.objects.create(
            author=self.author,
            title="Future Event",
            date=timezone.now() + timedelta(days=1),
            location="Kumasi",
            description="Will happen later.",
            thumbnail=build_test_image("future-event.png"),
        )

    def test_programs_list_only_returns_active_programs(self):
        response = self.client.get("/api/foundation/programs/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        titles = [item["title"] for item in response.data]
        self.assertIn("Active Program", titles)
        self.assertNotIn("Inactive Program", titles)

    def test_events_list_returns_newest_first(self):
        response = self.client.get("/api/foundation/events/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["title"], "Future Event")

    def test_authenticated_user_can_not_create_program_and_event(self):
        self.client.force_authenticate(user=self.author)

        program_response = self.client.post(
            "/api/foundation/programs/",
            {
                "type": "child",
                "title": "New Program",
                "description": "A new program.",
                "image": build_test_image("new-program.png"),
                "is_active": True,
            },
            format="multipart",
        )
        self.assertEqual(program_response.status_code, status.HTTP_403_FORBIDDEN)

        event_response = self.client.post(
            "/api/foundation/events/",
            {
                "title": "New Event",
                "date": (timezone.now() + timedelta(days=2)).isoformat(),
                "location": "Tamale",
                "description": "A new event.",
                "thumbnail": build_test_image("new-event.png"),
            },
            format="multipart",
        )
        self.assertEqual(event_response.status_code, status.HTTP_403_FORBIDDEN)
