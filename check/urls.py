from django.urls import path
from . import views

urlpatterns = [
    path("", views.check),
    path("check/process", views.process)
]