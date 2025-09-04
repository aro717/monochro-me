from django.urls import path
from . import views

app_name = 'mysitedetail'

urlpatterns = [
    path('api/', views.SiteDetailList.as_view(), name='site_detail'),
]
