# Generated by Django 3.0.9 on 2020-08-05 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('balon_form', '0005_auto_20200805_0124'),
    ]

    operations = [
        migrations.AlterField(
            model_name='balon',
            name='balon_state',
            field=models.CharField(blank=True, choices=[('Наполнение', 'Наполнение'), ('Отбраковано', 'Отбраковано')], max_length=150),
        ),
        migrations.AlterField(
            model_name='balon',
            name='balon_status',
            field=models.CharField(blank=True, choices=[('Склад', 'Склад'), ('Город', 'Город')], max_length=150),
        ),
    ]
