# Generated by Django 3.1.5 on 2022-04-24 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myindex', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='url',
            field=models.CharField(max_length=30, verbose_name='URL'),
        ),
    ]
