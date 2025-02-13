from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny
from .models import (
    Department,
    Management,
    Division,
    Job,
    Contact,
)
from .serializers import (
    DepartmentSerializer,
    ManagementSerializer,
    DivisionSerializer,
    JobSerializer,
    ContactSerializer,
)


class DepartmentView(ReadOnlyModelViewSet):
    """Department view."""

    queryset = Department.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DepartmentSerializer


class ManagementView(ReadOnlyModelViewSet):
    """Management view."""

    queryset = Management.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ManagementSerializer


class DivisionView(ReadOnlyModelViewSet):
    """Division view."""

    queryset = Division.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DivisionSerializer


class JobView(ReadOnlyModelViewSet):
    """Job view."""

    queryset = Job.objects.all()
    permission_classes = [AllowAny]
    serializer_class = JobSerializer


class ContactView(ReadOnlyModelViewSet):
    """Contact view."""

    queryset = Contact.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ContactSerializer
