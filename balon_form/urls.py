from django.urls import path
from .views import MainView, Api

urlpatterns = [
    path('', MainView.as_view() , name='main'),
    path('balons/', Api.as_view(), name='get'),
    path('balons/<int:pk>', Api.as_view()),
    path('create/', Api.as_view(), name='post')
]