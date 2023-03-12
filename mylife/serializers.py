from rest_framework import serializers
from .models import Schedule, Record, Category
from typing import Dict, Any


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('pk', 'name')


class ScheduleSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_pk = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True)

    class Meta:
        model = Schedule
        fields = ('pk', 'date', 'summary', 'description', 'start_time', 'end_time', 'category', 'category_pk')

    def create(self, validated_data: Dict[str, Any]) -> Schedule:
        category_pk = validated_data.get('category_pk', None)

        if category_pk is not None:
            validated_data['category'] = category_pk
            del validated_data['category_pk']

        return super().create(validated_data)


class RecordSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Record
        fields = '__all__'
