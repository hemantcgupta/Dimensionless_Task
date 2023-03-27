from unicodedata import name
from django.urls import path
from . import views


urlpatterns = [
    path('', views.upload_csv, name='upload_csv'),
    path('results/', views.results_db, name='results_db'),
]
