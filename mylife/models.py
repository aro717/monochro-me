import datetime
from django.db import models
from django.utils import timezone


class Category(models.Model):
    name = models.CharField('カテゴリ名', max_length=100)
    color = models.CharField('色(16進数)', max_length=7, default='#000000')

    def __str__(self):
        return self.name


class Schedule(models.Model):
    """スケジュール"""
    summary = models.CharField('概要', max_length=50)
    description = models.TextField('詳細な説明', blank=True)
    start_time = models.TimeField('開始時間', default=datetime.time(0, 0, 0))
    end_time = models.TimeField('終了時間', default=datetime.time(1, 0, 0))
    date = models.DateField('日付', default=datetime.date.today)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='カテゴリ')
    created_at = models.DateTimeField('作成日', default=timezone.now)

    def __str__(self):
        return self.summary


class Record(Schedule):
    """記録"""
    title = models.CharField('タイトル', max_length=40)
    persons = models.CharField('誰と', max_length=100)
    place = models.CharField('場所', max_length=50)
    is_public = models.BooleanField('公開可能か', default=True)
    relation_records = models.ManyToManyField('self', verbose_name='関連記録', blank=True)
