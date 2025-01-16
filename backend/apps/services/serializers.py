from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """Service serializer."""

    class Meta:
        model = Service
        fields = ["id", "name", "category", "image"]
