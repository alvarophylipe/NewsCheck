from django.urls import path
from . import views

urlpatterns = [
    path("", views.check),
    path("check/process", views.process),
    path("check/load_model", views.load_model)
]