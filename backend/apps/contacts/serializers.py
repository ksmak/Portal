from rest_framework import serializers
from .models import (
    Department,
    Management,
    Division,
    Job,
    Contact,
)


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = "__all__"


class ManagementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Management
        fields = "__all__"


class DivisionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Division
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    """Contact serializer."""

    class Meta:
        model = Contact
        fields = "__all__"
