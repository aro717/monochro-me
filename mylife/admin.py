from django.contrib import admin
from .models import Schedule, Record, Category

class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('summary', 'date', 'category',)
    ordering = ('-date', '-start_time',)
#     list_filter = ('is_public',)

admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Record)
admin.site.register(Category)
