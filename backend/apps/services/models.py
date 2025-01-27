from django.db import models


class Service(models.Model):
    """Custom service model."""

    CATEGORIES = (
        (1, "Основные сервисы МВД и ГП РК"),
        (2, "Сервисы ДП Карагандинской области"),
        (3, "Сервисы других государственных органов"),
    )
    order_num = models.PositiveIntegerField(verbose_name="порядковый номер")
    name_ru = models.CharField(
        verbose_name="наименование (на русском языке)", max_length=200
    )
    name_kk = models.CharField(
        verbose_name="наименование (на казахском языке)", max_length=200
    )
    category = models.IntegerField(verbose_name="категория", choices=CATEGORIES)
    image = models.ImageField(verbose_name="логотип", upload_to="logotypes/")
    target = models.URLField(verbose_name="ссылка")

    def __str__(self):
        return f"{self.CATEGORIES[self.category - 1][1]}: {self.name_ru}"

    class Meta:
        ordering = ["category", "order_num"]
        verbose_name = "сервис"
        verbose_name_plural = "сервисы"
