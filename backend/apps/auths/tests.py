from datetime import date
from django.test import TestCase
from django.contrib.auth import get_user_model
from unittest.mock import ANY
from rest_framework import test
from rest_framework import status
from .models import Department, Management, Division
from .serializers import (
    DepartmentSerializer,
    ManagementSerializer,
    DivisionSerializer,
    CustomUserSerializer,
    BirthUserSerializer,
)


User = get_user_model()


class DictSerializerTest(TestCase):
    """Department serializer test."""

    def test_department_serializer(self):
        department = Department.objects.create(
            name_ru="департамент ru", name_kk="департамент kk"
        )

        expected_data = {
            "id": ANY,
            "name_ru": "департамент ru",
            "name_kk": "департамент kk",
        }

        serializer = DepartmentSerializer(department)

        self.assertDictEqual(expected_data, serializer.data)

    def test_management_serializer(self):
        management = Management.objects.create(name_ru="служба", name_kk="қызмет")

        expected_data = {
            "id": ANY,
            "name_ru": "служба",
            "name_kk": "қызмет",
        }

        serializer = ManagementSerializer(management)

        self.assertDictEqual(expected_data, serializer.data)

    def test_division_serializer(self):
        division = Division.objects.create(name_ru="отдел", name_kk="бөлім")

        expected_data = {
            "id": ANY,
            "name_ru": "отдел",
            "name_kk": "бөлім",
        }

        serializer = DivisionSerializer(division)

        self.assertDictEqual(expected_data, serializer.data)


class ServiceSerializerTest(TestCase):
    """Service serializer test."""

    def setUp(self):
        self.department = Department.objects.create(
            name_ru="департамент", name_kk="департамент"
        )

        self.management = Management.objects.create(name_ru="служба", name_kk="қызмет")

        self.division = Division.objects.create(name_ru="отдел", name_kk="бөлім")

        self.user = User.objects.create(email="testuser1@mail.ru", password="12345")
        self.user.last_name = "Ахметов"
        self.user.first_name = "Ахмет"
        self.user.middle_name = "Ахметович"
        self.user.department = self.department
        self.user.management = self.management
        self.user.division = self.division
        self.user.rank = User.RANKS[0][0]
        self.user.job = "техник ИАГ"
        self.user.date_of_birth = date(2000, 1, 1)
        self.user.phone = "11-11-11"
        self.user.save()

    def test_user_serializer(self):
        expected_data = {
            "email": "testuser1@mail.ru",
            "last_name": "Ахметов",
            "first_name": "Ахмет",
            "middle_name": "Ахметович",
            "department": self.department.id,
            "management": self.management.id,
            "division": self.division.id,
            "rank": User.RANKS[0][0],
            "job": "техник ИАГ",
            "date_of_birth": "2000-01-01",
            "phone": "11-11-11",
        }

        serializer = CustomUserSerializer(self.user)

        self.assertDictEqual(expected_data, serializer.data)

    def test_birth_user_serializer(self):
        expected_data = {
            "last_name": "Ахметов",
            "first_name": "Ахмет",
            "middle_name": "Ахметович",
            "date_of_birth": "2000-01-01",
        }

        serializer = BirthUserSerializer(self.user)

        self.assertDictEqual(expected_data, serializer.data)


class UserViewTest(test.APITestCase):
    """User view test."""

    def setUp(self):
        self.department = Department.objects.create(
            name_ru="департамент", name_kk="департамент"
        )

        self.management = Management.objects.create(name_ru="служба", name_kk="қызмет")

        self.division = Division.objects.create(name_ru="отдел", name_kk="бөлім")

        self.user1 = User.objects.create(email="testuser1@mail.ru", password="12345")
        self.user1.last_name = "Ахметов"
        self.user1.first_name = "Ахмет"
        self.user1.middle_name = "Ахметович"
        self.user1.department = self.department
        self.user1.management = self.management
        self.user1.division = self.division
        self.user1.rank = User.RANKS[0][0]
        self.user1.job = "техник ИАГ"
        self.user1.date_of_birth = date(2000, 1, 1)
        self.user1.phone = "11-11-11"
        self.user1.save()

    def test_user_view_with_auth(self):
        self.client.force_authenticate(user=self.user1)

        expected_data = [
            {
                "email": "testuser1@mail.ru",
                "last_name": "Ахметов",
                "first_name": "Ахмет",
                "middle_name": "Ахметович",
                "department": self.department.id,
                "management": self.management.id,
                "division": self.division.id,
                "rank": User.RANKS[0][0],
                "job": "техник ИАГ",
                "date_of_birth": "2000-01-01",
                "phone": "11-11-11",
            }
        ]

        response = self.client.get("/api/users/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(expected_data, response.data)

    def test_user_view_without_auth(self):
        self.client.force_authenticate(user=None)

        response = self.client.get("/api/users/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_today_birth_user_view(self):
        expected_data = [
            {
                "last_name": "Ахметов",
                "first_name": "Ахмет",
                "middle_name": "Ахметович",
                "date_of_birth": "2000-01-01",
            }
        ]

        response = self.client.get("api/birth_users/?q=today")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(expected_data, response.data)

    def test_month_birth_user_view(self):
        expected_data = [
            {
                "last_name": "Ахметов",
                "first_name": "Ахмет",
                "middle_name": "Ахметович",
                "date_of_birth": "2000-01-01",
            }
        ]

        response = self.client.get("api/birth_users/?q=january")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(expected_data, response.data)
