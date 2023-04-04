from django.db.models import Q
from rest_framework import filters


class IsPublicOrSuperAll(filters.BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        if request.user.is_superuser:
            return queryset
        else:
            return queryset.filter(is_public=True)
