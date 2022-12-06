from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import Post, Category


class PostAdmin(MarkdownxModelAdmin):
    list_display = ('title', 'category', 'is_public', 'created_at',)
    ordering = ('-created_at',)
    list_filter = ('is_public',)


admin.site.register(Post, PostAdmin)
admin.site.register(Category)
