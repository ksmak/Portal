# Generated by Django 5.1.5 on 2025-01-17 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='service',
            options={'ordering': ['category', 'order_num'], 'verbose_name': 'сервис', 'verbose_name_plural': 'сервисы'},
        ),
        migrations.AlterField(
            model_name='service',
            name='category',
            field=models.IntegerField(choices=[(1, 'Основные сервисы МВД и ГП РК'), (2, 'Сервисы ДП Карагандинской области'), (3, 'Сервисы других государственных органов')], verbose_name='категория'),
        ),
    ]
