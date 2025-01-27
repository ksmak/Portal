from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """Service serializer."""

    class Meta:
        model = Service
        fields = ["id", "name_ru", "name_kk", "category", "image", "target"]
