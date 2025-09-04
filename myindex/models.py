from django.db import models


class Link(models.Model):
    text = models.CharField('表示', max_length=30)
    url = models.CharField('URL', max_length=30)
    
    def __str__(self):
        return self.text
