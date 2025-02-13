from django.db import models


class Config(models.Model):
    """Config model."""

    quote_text_ru = models.CharField(
        verbose_name="текст цитаты (на русском языке)",
        max_length=500,
        null=True,
        blank=True,
    )
    quote_text_kk = models.CharField(
        verbose_name="текст цитаты (на казахском языке)",
        max_length=500,
        null=True,
        blank=True,
    )
    quote_author_ru = models.CharField(
        verbose_name="автор цитаты (на русском языке)",
        max_length=200,
        null=True,
        blank=True,
    )
    quote_author_kk = models.CharField(
        verbose_name="автор цитаты (на казахском языке)",
        max_length=200,
        null=True,
        blank=True,
    )
    weather = models.JSONField(
        verbose_name="Данные о погоде (json формат)", null=True, blank=True
    )

    class Meta:
        verbose_name = "Настройки веб-сайта"
        verbose_name_plural = "Настройки веб-сайта"
