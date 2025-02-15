# Generated by Django 5.1.5 on 2025-02-15 08:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_num', models.PositiveIntegerField(default=1, verbose_name='порядковый номер')),
                ('name_ru', models.CharField(max_length=250, verbose_name='наименование (на русском языке)')),
                ('name_kk', models.CharField(max_length=250, verbose_name='наименование (на казахском языке)')),
            ],
            options={
                'verbose_name': 'подразделение',
                'verbose_name_plural': 'подразделения',
                'ordering': ['order_num'],
            },
        ),
        migrations.CreateModel(
            name='Division',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_num', models.PositiveIntegerField(default=1, verbose_name='порядковый номер')),
                ('name_ru', models.CharField(max_length=250, verbose_name='наименование (на русском языке)')),
                ('name_kk', models.CharField(max_length=250, verbose_name='наименование (на казахском языке)')),
            ],
            options={
                'verbose_name': 'отдел(группа)',
                'verbose_name_plural': 'отделы(группы)',
                'ordering': ['order_num'],
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_num', models.PositiveIntegerField(default=1, verbose_name='порядковый номер')),
                ('name_ru', models.CharField(max_length=250, verbose_name='наименование (на русском языке)')),
                ('name_kk', models.CharField(max_length=250, verbose_name='наименование (на казахском языке)')),
            ],
            options={
                'verbose_name': 'должность',
                'verbose_name_plural': 'должности',
                'ordering': ['order_num'],
            },
        ),
        migrations.CreateModel(
            name='Management',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_num', models.PositiveIntegerField(default=1, verbose_name='порядковый номер')),
                ('name_ru', models.CharField(max_length=250, verbose_name='наименование (на русском языке)')),
                ('name_kk', models.CharField(max_length=250, verbose_name='наименование (на казахском языке)')),
            ],
            options={
                'verbose_name': 'служба',
                'verbose_name_plural': 'службы',
                'ordering': ['order_num'],
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_name', models.CharField(max_length=50, verbose_name='фамилия')),
                ('first_name', models.CharField(max_length=50, verbose_name='имя')),
                ('middle_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='отчество')),
                ('phone', models.CharField(blank=True, max_length=50, null=True, verbose_name='рабочий телефон')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='contacts.department', verbose_name='подразделение')),
                ('division', models.ForeignKey(blank=True, max_length=200, null=True, on_delete=django.db.models.deletion.RESTRICT, to='contacts.division', verbose_name='отдел/группа')),
                ('job', models.ForeignKey(blank=True, max_length=200, null=True, on_delete=django.db.models.deletion.RESTRICT, to='contacts.job', verbose_name='должность')),
                ('management', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='contacts.management', verbose_name='служба')),
            ],
            options={
                'verbose_name': 'контакт',
                'verbose_name_plural': 'контакты',
                'ordering': ['last_name', 'first_name', 'last_name'],
            },
        ),
    ]
