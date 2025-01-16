from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from auths.views import MyTokenObtainPairView, CustomUserView
from services.views import ServiceView

router = routers.DefaultRouter()
router.register("users", CustomUserView, basename="users")
router.register("services", ServiceView, basename="services")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", MyTokenObtainPairView.as_view()),
    path("api/token/refresh/", jwt_views.TokenRefreshView.as_view()),
    path("api/", include(router.urls)),
]
