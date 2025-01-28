from rest_framework import serializers
from .models import StatReport


class StatReportSerializer(serializers.ModelSerializer):
    """StatReport serializer."""

    class Meta:
        model = StatReport
        fields = ["title", "date_of_create", "file"]
