# Generated by Django 3.0.8 on 2020-08-01 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('balon_form', '0003_auto_20200731_2000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='balon',
            name='balon_state',
            field=models.CharField(choices=[('Наполнение', 'Наполнение'), ('Отбраковано', 'Отбраковано')], max_length=150),
        ),
        migrations.AlterField(
            model_name='balon',
            name='balon_status',
            field=models.CharField(choices=[('Склад', 'Склад'), ('Город', 'Город')], max_length=150),
        ),
    ]
