# Generated by Django 4.1.2 on 2022-10-13 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mysitedetail', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sitedetail',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]