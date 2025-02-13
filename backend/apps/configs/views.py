from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny
from .models import Config
from .serializers import ConfigSerializer


class ConfigView(ReadOnlyModelViewSet):
    """Config viewset."""

    queryset = Config.objects.all()
    serializer_class = ConfigSerializer
    permission_classes = [AllowAny]
