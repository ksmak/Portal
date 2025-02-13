from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from auths.views import LogoutView
from services.views import ServiceView
from stats.views import StatReportView
from configs.views import ConfigView
from contacts.views import (
    DepartmentView,
    ManagementView,
    DivisionView,
    JobView,
    ContactView,
)

router = routers.DefaultRouter()
router.register("services", ServiceView, basename="services")
router.register("statreports", StatReportView, basename="statreports")
router.register("departments", DepartmentView, basename="deparments")
router.register("managements", ManagementView, basename="managements")
router.register("divisions", DivisionView, basename="divisions")
router.register("jobs", JobView, basename="jobs")
router.register("contacts", ContactView, basename="contacts")
router.register("configs", ConfigView, basename="configs")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/logout/", LogoutView.as_view()),
    path("api/", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
