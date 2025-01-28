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
            "name_ru": "тестовый сервис",
            "name_kk": "тестілік қызмет",
            "category": 1,
            "image": ANY,
            "target": "https://example.com",
        }

        service = Service.objects.create(
            order_num=1,
            name_ru="тестовый сервис",
            name_kk="тестілік қызмет",
            category=1,
            target="https://example.com",
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
            order_num=1,
            name_ru="тестовый сервис 1",
            name_kk="тестілік қызмет 1",
            category=1,
            target="https://example1.com",
        )

        with tempfile.TemporaryFile() as fp:
            self.service1.image = SimpleUploadedFile(
                name="test_image1.jpg",
                content=fp.read(),
                content_type="image/jpeg",
            )
            self.service1.save()

        self.service2 = Service.objects.create(
            order_num=1,
            name_ru="тестовый сервис 2",
            name_kk="тестілік қызмет 2",
            category=2,
            target="https://example2.com",
        )

        with tempfile.TemporaryFile() as fp:
            self.service1.image = SimpleUploadedFile(
                name="test_image2.jpg",
                content=fp.read(),
                content_type="image/jpeg",
            )
            self.service2.save()

    def test_service_view(self):
        expected_data = [
            {
                "id": ANY,
                "name_ru": "тестовый сервис 1",
                "name_kk": "тестілік қызмет 1",
                "category": 1,
                "image": ANY,
                "target": "https://example1.com",
            },
            {
                "id": ANY,
                "name_ru": "тестовый сервис 2",
                "name_kk": "тестілік қызмет 2",
                "category": 2,
                "image": ANY,
                "target": "https://example2.com",
            },
        ]

        response = self.client.get("/api/services/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(expected_data, response.data)

    def tearDown(self):
        shutil.rmtree("media/logotypes/")
