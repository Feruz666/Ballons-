from django.db import models
from datetime import date
from django.utils.timezone import now

# Create your models here.

class Balon(models.Model):
    STATUSES = (
        ('Склад', 'Склад'),
        ('Город', 'Город'),
    )

    STATES = (
        ('Наполнение','Наполнение'),
        ('Отбраковано', 'Отбраковано'),
    )
    
    balon_num = models.CharField(max_length=150)
    balon_status = models.CharField(max_length=150, choices=STATUSES)
    balon_state = models.CharField(max_length=150, choices=STATES)
    date = models.DateTimeField(default=now)
    
    def __str__(self):
        return '{}'.format(self.balon_num)
    