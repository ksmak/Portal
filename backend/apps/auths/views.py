from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer

User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    """Custom token view."""

    permission_classes = [permissions.AllowAny]
    serializer_class = MyTokenObtainPairSerializer


class CustomUserView(viewsets.ReadOnlyModelViewSet):
    """Custom user view."""

    queryset = User.objects.filter(is_active=True, is_superuser=False)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserSerializer
