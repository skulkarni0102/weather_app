# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('weather/', views.weather_api_view, name='weather-api'),
]
