# Generated by Django 5.1.5 on 2025-01-19 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auths', '0003_customuser_phone'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'ordering': ['last_name', 'first_name', 'last_name'], 'verbose_name': 'пользователь', 'verbose_name_plural': 'пользователи'},
        ),
        migrations.AddField(
            model_name='customuser',
            name='division',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='отдел/группа'),
        ),
    ]
