from django.views import generic
from rest_framework import viewsets, permissions
from .models import Schedule, Category
from .filters import IsPublicOrSuperAll
from .permissions import IsPublicSchedule, IsSuperUser
from .serializers import CategorySerializer, ScheduleSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    filter_backends = [IsPublicOrSuperAll]
    permission_classes = [IsPublicSchedule|IsSuperUser]


class Top(generic.TemplateView):
    template_name = 'mylife/index.html'
