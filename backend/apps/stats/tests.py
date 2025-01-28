import tempfile
import shutil
from datetime import date
from django.core.files.uploadedfile import SimpleUploadedFile
from unittest.mock import ANY
from .models import StatReport
from .serializers import StatReportSerializer
from rest_framework import test
from rest_framework import status


class StatReportTest(test.APITestCase):
    """StatReport test"""

    def setUp(self):
        self.statreport1 = StatReport.objects.create(
            title="test stat report1",
            date_of_create=date.today(),
        )
        with tempfile.TemporaryFile() as fp:
            self.statreport1.file = SimpleUploadedFile(
                name="test_file1.jpg",
                content=fp.read(),
                content_type="image/jpeg",
            )
        self.statreport1.save()

        self.statreport2 = StatReport.objects.create(
            title="test stat report2",
            date_of_create=date.today(),
        )
        with tempfile.TemporaryFile() as fp:
            self.statreport1.file = SimpleUploadedFile(
                name="test_file2.jpg",
                content=fp.read(),
                content_type="image/jpeg",
            )
        self.statreport1.save()

    def test_statreport_serializer(self):
        expected_data = {
            "title": "test stat report1",
            "date_of_create": ANY,
            "file": ANY,
        }

        serializer = StatReportSerializer(self.statreport1)

        self.assertDictEqual(expected_data, serializer.data)

    def test_statreport_view(self):
        expected_data = [
            {
                "title": "test stat report1",
                "date_of_create": ANY,
                "file": ANY,
            },
            {
                "title": "test stat report2",
                "date_of_create": ANY,
                "file": ANY,
            },
        ]

        response = self.client.get("/api/statreports/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(expected_data, response.data)

    def tearDown(self):
        shutil.rmtree("media/statfiles/")
