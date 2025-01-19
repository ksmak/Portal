from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import views
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .models import Department, Management, Division
from .serializers import (
    MyTokenObtainPairSerializer,
    CustomUserSerializer,
    DepartmentSerializer,
    ManagementSerializer,
    DivisionSerializer,
)

User = get_user_model()


class LogoutView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except (ObjectDoesNotExist, TokenError):
            return Response(status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    """Custom token view."""

    permission_classes = [permissions.AllowAny]
    serializer_class = MyTokenObtainPairSerializer


class CustomUserView(viewsets.ReadOnlyModelViewSet):
    """Custom user view."""

    queryset = User.objects.filter(is_active=True, is_superuser=False)
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserSerializer


class DepartmentView(viewsets.ReadOnlyModelViewSet):
    """Department view."""

    queryset = Department.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DepartmentSerializer


class ManagementView(viewsets.ReadOnlyModelViewSet):
    """Management view."""

    queryset = Management.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ManagementSerializer


class DivisionView(viewsets.ReadOnlyModelViewSet):
    """Management view."""

    queryset = Division.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DivisionSerializer
