from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom token serializer."""

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        token["id"] = user.id
        token["email"] = user.email
        token["full_name"] = user.full_name

        return token


class CustomUserSerializer(serializers.ModelSerializer):
    """Custom user serializer."""

    class Meta:
        model = User
        fields = [
            "email",
            "last_name",
            "first_name",
            "middle_name",
            "department",
            "management",
            "rank",
            "job",
            "date_of_birth",
        ]
