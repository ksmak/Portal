from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from auths.views import (
    MyTokenObtainPairView,
    CustomUserView,
    LogoutView,
    DepartmentView,
    ManagementView,
    DivisionView,
    BirthUserView,
)
from services.views import ServiceView
from stats.views import StatReportView

router = routers.DefaultRouter()
router.register("users", CustomUserView, basename="users")
router.register("services", ServiceView, basename="services")
router.register("statreports", StatReportView, basename="statreports")
router.register("departments", DepartmentView, basename="deparments")
router.register("managements", ManagementView, basename="managements")
router.register("divisions", DivisionView, basename="divisions")
router.register("birth_users", BirthUserView, basename="birth_users")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/logout/", LogoutView.as_view()),
    # path("api/token/", MyTokenObtainPairView.as_view()),
    # path("api/token/refresh/", jwt_views.TokenRefreshView.as_view()),
    path("api/", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
