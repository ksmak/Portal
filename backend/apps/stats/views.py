from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny
from .models import StatReport
from .serializers import StatReportSerializer


class StatReportView(ReadOnlyModelViewSet):
    """StatReport viewset."""

    queryset = StatReport.objects.all()
    serializer_class = StatReportSerializer
    permission_classes = [AllowAny]
