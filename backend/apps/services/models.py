from django.db import models


class Service(models.Model):
    """Custom service model."""

    CATEGORIES = (
        (1, "сервисы ДП Карагандинской области"),
        (2, "сервисы государственных органов"),
    )
    name = models.CharField(verbose_name="наименование", max_length=200)
    category = models.IntegerField(verbose_name="категория", choices=CATEGORIES)
    image = models.ImageField(verbose_name="логотип", upload_to="logotypes/")

    class Meta:
        ordering = ["name"]
        verbose_name = "сервис"
        verbose_name_plural = "сервисы"
