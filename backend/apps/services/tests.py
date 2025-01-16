import tempfile
import shutil
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from unittest.mock import ANY
from rest_framework import test
from rest_framework import status
from .models import Service
from .serializers import ServiceSerializer

User = get_user_model()


class ServiceSerializerTest(TestCase):
    """Service serializer test."""

    def test_service_serializer(self):
        expected_data = {
            "id": ANY,
            "name": "тестовый сервис",
            "category": 1,
            "image": ANY,
        }

        service = Service.objects.create(
            name="тестовый сервис",
            category=1,
        )
        with tempfile.TemporaryFile() as fp:
            service.image = SimpleUploadedFile(
                name="test_image.jpg",
                content=fp.read(),
                content_type="image/jpeg",
            )
            service.save()

        serializer = ServiceSerializer(service)

        self.assertDictEqual(expected_data, serializer.data)


class ServiceViewTest(test.APITestCase):
    """Service view test."""

    def setUp(self):
        self.service1 = Service.objects.create(
            name="тестовый сервис 1",
            category=1,
        )

        with tempfile.TemporaryFile() as fp:
            self.service1.image = SimpleUploadedFile(
                name="test_image1.jpg",
                content=fp.read(),
                content_type="image/jpeg",
            )
            self.service1.save()

        self.service2 = Service.objects.create(
            name="тестовый сервис 2",
            category=2,
        )

        with tempfile.TemporaryFile() as fp:
            self.service1.image = SimpleUploadedFile(
                name="test_image2.jpg",
                content=fp.read(),
                content_type="image/jpeg",
            )
            self.service2.save()

        self.user = User.objects.create(email="testuser1@mail.ru", password="12345")

    def test_service_view_with_auth(self):
        self.client.force_authenticate(user=self.user)

        expected_data = [
            {
                "id": ANY,
                "name": "тестовый сервис 1",
                "category": 1,
                "image": ANY,
            },
            {
                "id": ANY,
                "name": "тестовый сервис 2",
                "category": 2,
                "image": ANY,
            },
        ]

        response = self.client.get("/api/services/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(expected_data, response.data)

    def test_service_view_without_auth(self):
        self.client.force_authenticate(user=None)

        response = self.client.get("/api/services/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self):
        shutil.rmtree("media/")
