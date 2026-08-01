import tempfile

from django.contrib.auth import get_user_model
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase


@override_settings(MEDIA_ROOT=tempfile.mkdtemp()) # Override MEDIA_ROOT to a temporary directory for tests
class AccountsApiTests(APITestCase):
	def setUp(self):
		self.user_model = get_user_model()
		self.user = self.user_model.objects.create_user(
			username="user",
			email="user@example.com",
			password="StrongPass123!",
			phone="1234567890",
		)
		self.admin = self.user_model.objects.create_user(
			username="admin",
			email="admin@example.com",
			password="StrongPass123!",
			phone="5555555555",
			role="admin",
		)

	def test_register_login_refresh_and_profile(self):
		register_response = self.client.post(
			"/api/accounts/register/",
			{
				"username": "new_user",
				"password": "StrongPass123!",
				"email": "new@example.com",
				"phone": "1111111111",
			},
			format="json",
		)
		self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)
		self.assertTrue(self.user_model.objects.filter(username="new_user").exists())

		login_response = self.client.post(
			"/api/accounts/login/",
			{"username": "user", "password": "StrongPass123!"},
			format="json",
		)
		self.assertEqual(login_response.status_code, status.HTTP_200_OK)
		self.assertIn("access", login_response.data)
		self.assertIn("refresh", login_response.data)

		refresh_response = self.client.post(
			"/api/accounts/token/refresh/",
			{"refresh": login_response.data["refresh"]},
			format="json",
		)
		self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
		self.assertIn("access", refresh_response.data)

		self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {login_response.data['access']}")
		profile_response = self.client.get("/api/accounts/profile/")
		self.assertEqual(profile_response.status_code, status.HTTP_200_OK)
		self.assertEqual(profile_response.data["username"], "user")

	def test_admin_can_list_users_and_regular_user_cannot(self):
		admin_login = self.client.post(
			"/api/accounts/login/",
			{"username": "admin", "password": "StrongPass123!"},
			format="json",
		)
		self.assertEqual(admin_login.status_code, status.HTTP_200_OK)

		self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {admin_login.data['access']}")
		list_response = self.client.get("/api/accounts/users/")
		self.assertEqual(list_response.status_code, status.HTTP_200_OK)
		self.assertGreaterEqual(len(list_response.data), 2)

		self.client.force_authenticate(user=self.user)
		forbidden_response = self.client.get("/api/accounts/users/")
		self.assertEqual(forbidden_response.status_code, status.HTTP_403_FORBIDDEN)
