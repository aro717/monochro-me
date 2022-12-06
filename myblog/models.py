from django.db import models
from django.utils import timezone
from markdownx.models import MarkdownxField


class CategoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().annotate(
            post_count=models.Count('post')
        ).order_by('-post_count')


class Category(models.Model):
    name = models.CharField('カテゴリ名', max_length=100)
    color = models.CharField('色(16進数)', max_length=7, default='#75715e')

    objects = CategoryManager()

    def __str__(self):
        if hasattr(self, 'post_count'):
            return f'{self.name}({self.post_count})'
        else:
            return self.name


class PostQuerySet(models.QuerySet):
    def published(self):
        return self.filter(created_at__lte=timezone.now())


class Post(models.Model):
    title = models.CharField('タイトル', max_length=40)
    thumbnail = models.ImageField('サムネイル', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name='カテゴリ')
    lead_text = models.TextField('紹介文')
    main_text = MarkdownxField('本文', help_text='Markdown形式で記入')
    is_public = models.BooleanField('公開可能か', default=True)
    created_at = models.DateTimeField('作成日', default=timezone.now)
    relation_posts = models.ManyToManyField('self', verbose_name='関連記事', blank=True)

    objects = PostQuerySet.as_manager()

    class Meta:
        ordering = ('-created_at',)

    # def __str__(self):
    #     if self.is_public:
    #         return self.title
    #     else:
    #         return f'(非公開){self.title}'

    def __str__(self):
        return self.title
