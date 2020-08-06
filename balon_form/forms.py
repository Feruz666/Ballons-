from django import forms
from .models import Balon
import datetime


STATUSES = (
    ('Склад', 'Склад'),
    ('Город', 'Город'),
)

STATES = (
    ('Без действий', 'Без действий'),
    ('Наполнение','Наполнение'),
    ('Отбраковано', 'Отбраковано'),
)


class BalonForm(forms.Form):
    balon_num = forms.CharField(max_length=100)
    balon_status = forms.ChoiceField(choices = STATUSES,required=False)
    balon_state = forms.ChoiceField(choices=STATES,required=False)
    
