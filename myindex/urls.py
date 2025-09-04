from django.urls import path
from . import views

app_name = 'myindex'

urlpatterns = [
    path('', views.LinkList.as_view(), name='index'),
]
