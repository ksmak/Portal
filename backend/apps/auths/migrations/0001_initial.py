# Generated by Django 5.1.5 on 2025-01-27 06:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
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
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=50, unique=True, verbose_name='логин')),
                ('first_name', models.CharField(max_length=50, verbose_name='имя')),
                ('last_name', models.CharField(max_length=50, verbose_name='фамилия')),
                ('middle_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='отчество')),
                ('rank', models.IntegerField(blank=True, choices=[(1, 'рядовой'), (2, 'младший сержант'), (3, 'сержант'), (4, 'старший сержант'), (5, 'старшина'), (6, 'младший лейтенант'), (7, 'лейтенант'), (8, 'старший лейтенант'), (9, 'капитан'), (10, 'майор'), (11, 'подполковник'), (12, 'полковник'), (13, 'генерал-майор'), (14, 'генерал-лейтенант'), (15, 'генерал-полковник')], null=True, verbose_name='звание')),
                ('job', models.CharField(max_length=250, verbose_name='должность')),
                ('date_of_birth', models.DateField(blank=True, null=True, verbose_name='дата рождения')),
                ('phone', models.CharField(blank=True, max_length=50, null=True, verbose_name='рабочий телефон')),
                ('is_active', models.BooleanField(default=True, verbose_name='активность')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='администратор')),
                ('is_staff', models.BooleanField(default=False, verbose_name='штатный сотрудник')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='создан')),
                ('changed_at', models.DateTimeField(auto_now=True, verbose_name='изменен')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='auths.department', verbose_name='подразделение')),
                ('division', models.ForeignKey(blank=True, max_length=200, null=True, on_delete=django.db.models.deletion.RESTRICT, to='auths.division', verbose_name='отдел/группа')),
                ('management', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='auths.management', verbose_name='служба')),
            ],
            options={
                'verbose_name': 'пользователь',
                'verbose_name_plural': 'пользователи',
                'ordering': ['last_name', 'first_name', 'last_name'],
            },
        ),
    ]
