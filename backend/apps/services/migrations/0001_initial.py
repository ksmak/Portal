# Generated by Django 5.1.5 on 2025-02-15 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_num', models.PositiveIntegerField(verbose_name='порядковый номер')),
                ('name_ru', models.CharField(max_length=200, verbose_name='наименование (на русском языке)')),
                ('name_kk', models.CharField(max_length=200, verbose_name='наименование (на казахском языке)')),
                ('category', models.IntegerField(choices=[(1, 'Cервисы МВД и ГП РК'), (2, 'Сервисы государственных органов'), (3, 'Мои ссылки')], verbose_name='категория')),
                ('image', models.ImageField(upload_to='logotypes/', verbose_name='логотип')),
                ('target', models.URLField(verbose_name='ссылка')),
            ],
            options={
                'verbose_name': 'сервис',
                'verbose_name_plural': 'сервисы',
                'ordering': ['category', 'order_num'],
            },
        ),
    ]
