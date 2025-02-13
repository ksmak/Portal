from django.db import models


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


class Job(models.Model):
    """Job model."""

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
        verbose_name = "должность"
        verbose_name_plural = "должности"


class Contact(models.Model):
    """Contact model."""

    last_name = models.CharField(verbose_name="фамилия", max_length=50)
    first_name = models.CharField(verbose_name="имя", max_length=50)
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
    job = models.ForeignKey(
        verbose_name="должность",
        to=Job,
        on_delete=models.RESTRICT,
        max_length=200,
        blank=True,
        null=True,
    )
    phone = models.CharField(
        verbose_name="рабочий телефон", max_length=50, blank=True, null=True
    )

    @property
    def full_name(self):
        return f"{self.last_name} {self.first_name} {self.middle_name}".strip()

    def __str__(self):
        return self.full_name

    class Meta:
        ordering = ["last_name", "first_name", "last_name"]
        verbose_name = "контакт"
        verbose_name_plural = "контакты"
