from rest_framework import viewsets
from rest_framework import permissions
from .models import Service
from .serializers import ServiceSerializer


class ServiceView(viewsets.ReadOnlyModelViewSet):
    """Service view."""

    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]
