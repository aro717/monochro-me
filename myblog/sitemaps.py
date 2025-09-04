from django.contrib.sitemaps import Sitemap
from django.shortcuts import resolve_url
from .models import Post


class PostSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return Post.objects.all()

    def location(self, obj):
        return resolve_url('myblog:post_detail', pk=obj.pk).replace('api/posts', 'detail')

    def lastmod(self, obj):
        return obj.created_at


class StaticSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return ['myblog:post_list']

    def location(self, obj):
        return resolve_url(obj)  # objには'blog:list' が渡される
