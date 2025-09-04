from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import Post, Category, Thumbnail
# from .models import Post, Category


class PostAdmin(MarkdownxModelAdmin):
    list_display = ('title', 'category', 'thumbnail', 'is_public', 'created_at',)
    ordering = ('-created_at',)
    list_filter = ('is_public',)


class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ('id', 'image')
    search_fields = ('image',)


admin.site.register(Post, PostAdmin)
admin.site.register(Category)
admin.site.register(Thumbnail, ThumbnailAdmin)
