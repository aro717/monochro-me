# Generated by Django 4.1.2 on 2022-10-13 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myindex', '0002_auto_20220424_2044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]