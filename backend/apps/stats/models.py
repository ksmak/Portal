from django.db import models


class StatReport(models.Model):
    """StatRepost model."""

    title = models.CharField(verbose_name="Наименование", max_length=200)
    date_of_create = models.DateField(verbose_name="дата создания")
    file = models.FileField(verbose_name="файл", upload_to="statfiles/")

    def __str__(self):
        return f"{self.date_of_create} - {self.title}"

    class Meta:
        ordering = ["title"]
        verbose_name = "стат.отчет"
        verbose_name_plural = "стат.отчеты"
