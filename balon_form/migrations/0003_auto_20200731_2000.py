# Generated by Django 3.0.8 on 2020-07-31 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('balon_form', '0002_auto_20200731_0241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='balon',
            name='balon_num',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='balon',
            name='balon_state',
            field=models.CharField(choices=[('N', 'Наполнение'), ('O', 'Отбраковано')], max_length=150),
        ),
    ]
