from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


app_name = 'mylife'

router = DefaultRouter()
router.register(r'schedules', views.ScheduleViewSet, basename='schedules')
router.register(r'categories', views.CategoryViewSet, basename='categories')

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.Top.as_view(), name='top'),
    path('<path:path>', views.Top.as_view(), name='top_sub'),
]
