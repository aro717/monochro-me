from django.views import generic
from .models import Link


class LinkList(generic.ListView):
    model = Link
