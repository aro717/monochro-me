from rest_framework import generics
from .models import SiteDetail
from .serializers import SiteDetailSerializer


class SiteDetailList(generics.ListAPIView):
    queryset = SiteDetail.objects.all()
    serializer_class = SiteDetailSerializer
