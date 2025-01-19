from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)


class Department(models.Model):
    """Department model."""

    order_num = models.PositiveIntegerField(verbose_name="порядковый номер", default=1)
    name_ru = models.CharField(
        verbose_name="наименование (на русском языке)", max_length=250
    )
    name_kk = models.CharField(
        verbose_name="наименование (на казахском языке)", max_length=250
    )

    def __str__(self):
        return self.name_ru

    class Meta:
        ordering = ["order_num"]
        verbose_name = "подразделение"
        verbose_name_plural = "подразделения"


class Management(models.Model):
    """Management model."""

    order_num = models.PositiveIntegerField(verbose_name="порядковый номер", default=1)
    name_ru = models.CharField(
        verbose_name="наименование (на русском языке)", max_length=250
    )
    name_kk = models.CharField(
        verbose_name="наименование (на казахском языке)", max_length=250
    )

    def __str__(self):
        return self.name_ru

    class Meta:
        ordering = ["order_num"]
        verbose_name = "служба"
        verbose_name_plural = "службы"


class Division(models.Model):
    """Division model."""

    order_num = models.PositiveIntegerField(verbose_name="порядковый номер", default=1)
    name_ru = models.CharField(
        verbose_name="наименование (на русском языке)", max_length=250
    )
    name_kk = models.CharField(
        verbose_name="наименование (на казахском языке)", max_length=250
    )

    def __str__(self):
        return self.name_ru

    class Meta:
        ordering = ["order_num"]
        verbose_name = "отдел(группа)"
        verbose_name_plural = "отделы(группы)"


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

    RANKS = (
        (1, "рядовой"),
        (2, "младший сержант"),
        (3, "сержант"),
        (4, "старший сержант"),
        (5, "старшина"),
        (6, "младший лейтенант"),
        (7, "лейтенант"),
        (8, "старший лейтенант"),
        (9, "капитан"),
        (10, "майор"),
        (11, "подполковник"),
        (12, "полковник"),
        (13, "генерал-майор"),
        (14, "генерал-лейтенант"),
        (15, "генерал-полковник"),
    )
    email = models.EmailField(verbose_name="логин", max_length=50, unique=True)
    first_name = models.CharField(verbose_name="имя", max_length=50)
    last_name = models.CharField(verbose_name="фамилия", max_length=50)
    middle_name = models.CharField(
        verbose_name="отчество", max_length=50, blank=True, null=True
    )
    department = models.ForeignKey(
        verbose_name="подразделение",
        to=Department,
        on_delete=models.RESTRICT,
        blank=True,
        null=True,
    )
    management = models.ForeignKey(
        verbose_name="служба",
        to=Management,
        on_delete=models.RESTRICT,
        blank=True,
        null=True,
    )
    division = models.ForeignKey(
        verbose_name="отдел/группа",
        to=Division,
        on_delete=models.RESTRICT,
        max_length=200,
        blank=True,
        null=True,
    )
    rank = models.IntegerField(
        verbose_name="звание", choices=RANKS, blank=True, null=True
    )
    job = models.CharField(verbose_name="должность", max_length=250)
    date_of_birth = models.DateField(
        verbose_name="дата рождения", blank=True, null=True
    )
    phone = models.CharField(
        verbose_name="рабочий телефон", max_length=50, blank=True, null=True
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
