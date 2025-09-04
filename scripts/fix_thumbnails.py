# ----------
# Post.thumbnail をImageFieldからForeignKey(Thumbnail)に変更する手順
# ----------
# migrasionsの__init__.py以外削除
# python manage.py makemigrations
# python manage.py migrate
# sqlite3 db.sqlite3
# .tables
# --- myblog_thumbnailがなければ ---
# CREATE TABLE myblog_thumbnail (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     image VARCHAR(100) NOT NULL
# );
# --- myblog_thumbnailがある状態で ---
# ALTER TABLE myblog_post DROP COLUMN thumbnail_id;
# ALTER TABLE myblog_post RENAME COLUMN old_thumbnail TO thumbnail;
# .exit
# python scripts/fix_thumbnails.py

import os
import sys
import django

# -----------------------------
# Django 環境をセットアップ
# -----------------------------
# manage.py のあるディレクトリをパスに追加
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()

from myblog.models import Post, Thumbnail

for post in Post.objects.all():
    if post.old_thumbnail:  # 旧カラムにパスが入っている場合
        file_name = post.old_thumbnail.name if hasattr(post.old_thumbnail, 'name') else post.old_thumbnail

        # Thumbnail テーブルに既存か確認して、なければ作成
        thumb, created = Thumbnail.objects.get_or_create(image=file_name)

        # Post の新しい外部キーを設定
        post.thumbnail = thumb
        post.save()
