from datetime import date
from django.test import TestCase
from django.contrib.auth import get_user_model
from unittest.mock import ANY
from rest_framework import test
from rest_framework import status
from .models import Department, Management
from .serializers import CustomUserSerializer

User = get_user_model()


class ServiceSerializerTest(TestCase):
    """Service serializer test."""

    def test_user_serializer(self):
        department = Department.objects.create(
            name_ru="департамент", name_kk="департамент"
        )

        management = Management.objects.create(name_ru="служба", name_kk="қызмет")

        expected_data = {
            "email": "testuser1@mail.ru",
            "last_name": "Ахметов",
            "first_name": "Ахмет",
            "middle_name": "Ахметович",
            "department": department.id,
            "management": management.id,
            "rank": User.RANKS[0][0],
            "job": "техник ИАГ",
            "date_of_birth": "2000-01-01",
        }

        user = User.objects.create(email="testuser1@mail.ru", password="12345")
        user.last_name = "Ахметов"
        user.first_name = "Ахмет"
        user.middle_name = "Ахметович"
        user.department = department
        user.management = management
        user.rank = User.RANKS[0][0]
        user.job = "техник ИАГ"
        user.date_of_birth = date(2000, 1, 1)
        user.save()

        serializer = CustomUserSerializer(user)

        self.assertDictEqual(expected_data, serializer.data)


class UserViewTest(test.APITestCase):
    """User view test."""

    def setUp(self):
        self.department = Department.objects.create(
            name_ru="департамент", name_kk="департамент"
        )

        self.management = Management.objects.create(name_ru="служба", name_kk="қызмет")
        self.user1 = User.objects.create(email="testuser1@mail.ru", password="12345")
        self.user1.last_name = "Ахметов"
        self.user1.first_name = "Ахмет"
        self.user1.middle_name = "Ахметович"
        self.user1.department = self.department
        self.user1.management = self.management
        self.user1.rank = User.RANKS[0][0]
        self.user1.job = "техник ИАГ"
        self.user1.date_of_birth = date(2000, 1, 1)
        self.user1.save()

    def test_service_view_with_auth(self):
        self.client.force_authenticate(user=self.user1)

        expected_data = [
            {
                "email": "testuser1@mail.ru",
                "last_name": "Ахметов",
                "first_name": "Ахмет",
                "middle_name": "Ахметович",
                "department": self.department.id,
                "management": self.management.id,
                "rank": User.RANKS[0][0],
                "job": "техник ИАГ",
                "date_of_birth": "2000-01-01",
            }
        ]

        response = self.client.get("/api/users/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(expected_data, response.data)

    def test_service_view_without_auth(self):
        self.client.force_authenticate(user=None)

        response = self.client.get("/api/users/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
