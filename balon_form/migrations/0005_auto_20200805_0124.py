# Generated by Django 3.0.9 on 2020-08-04 20:24

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('balon_form', '0004_auto_20200801_1722'),
    ]

    operations = [
        migrations.AlterField(
            model_name='balon',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
