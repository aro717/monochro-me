from django.db import models
from django.contrib.sites.models import Site
from django.conf import settings
from django.utils import timezone


class SiteDetail(models.Model):
    """Siteと1対1で紐づくサイト詳細情報"""
    site = models.OneToOneField(Site, verbose_name='Site', on_delete=models.PROTECT)
    title = models.CharField('タイトル', max_length=255, default='Webサイトのタイトル')
    titleimage = models.ImageField('タイトル画像', blank=True, null=True)
    subtitle = models.CharField('サブタイトル', max_length=255, default='Webサイトのサブタイトル')
    description = models.TextField('サイトの説明', max_length=255, default='Webサイトの説明')
    keywords = models.CharField('サイトのキーワード', max_length=255, default='Webサイトのキーワード')
    author = models.CharField('管理者', max_length=255, default='サイトの管理者')
    avatar = models.ImageField('アバター', blank=True, null=True)
    birthdate = models.DateTimeField('生年月日', default=timezone.now)
    job = models.CharField('職業', max_length=255, default='管理者の職業')
    email = models.EmailField('アドレス', max_length=255, default='your_mail@gmail.com')
    twitter = models.CharField('Twitterアカウント', max_length=255, blank=True)
    google_analytics_html = models.TextField('アナリティクスHTML', blank=True)

    def __str__(self):
        return self.author


def create_default_site_detail(sender, **kwargs):
    site = Site.objects.get(pk=settings.SITE_ID)
    SiteDetail.objects.get_or_create(site=site)
