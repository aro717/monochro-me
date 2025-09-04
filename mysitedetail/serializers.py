from rest_framework import serializers
from .models import SiteDetail


class SiteDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteDetail
        fields = '__all__'
