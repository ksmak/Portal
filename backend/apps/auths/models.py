from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)


class CustomUserManager(BaseUserManager):
    """Custom user manager."""

    def create_user(self, email, password=None):
        if not email:
            raise ValidationError("Логин не должен быть пустым.")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email=email, password=password)
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Custom user model."""

    email = models.EmailField(verbose_name="логин", max_length=50, unique=True)
    first_name = models.CharField(verbose_name="имя", max_length=50)
    last_name = models.CharField(verbose_name="фамилия", max_length=50)
    middle_name = models.CharField(
        verbose_name="отчество", max_length=50, blank=True, null=True
    )
    is_active = models.BooleanField(verbose_name="активность", default=True)
    is_superuser = models.BooleanField(verbose_name="администратор", default=False)
    is_staff = models.BooleanField(verbose_name="штатный сотрудник", default=False)
    created_at = models.DateTimeField(verbose_name="создан", auto_now_add=True)
    changed_at = models.DateTimeField(verbose_name="изменен", auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.last_name} {self.first_name} {self.middle_name}".strip().lower()

    class Meta:
        ordering = ["last_name", "first_name", "last_name"]
        verbose_name = "пользователь"
        verbose_name_plural = "пользователи"
