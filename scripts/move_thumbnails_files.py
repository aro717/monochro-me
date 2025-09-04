import os
import re
import shutil
import sys
import django

# -----------------------------
# Django 環境をセットアップ
# -----------------------------
# manage.py のあるディレクトリをパスに追加
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()

from django.conf import settings
from myblog.models import Thumbnail, Post

# -----------------------------
# 設定
# -----------------------------
media_root = settings.MEDIA_ROOT
pattern = re.compile(r"^(?P<name>.+?)_[A-Za-z0-9]+(\.[a-zA-Z0-9]+)$")  # _XXX付きファイル用

# -----------------------------
# メイン処理
# -----------------------------
for thumb in Thumbnail.objects.all():
    filename = os.path.basename(thumb.image.name)
    match = pattern.match(filename)

    if match:
        # 元のファイル名 (chat.png)
        base_name = match.group("name") + match.group(2)
        new_rel_path = os.path.join("thumbnails", base_name)
        new_abs_path = os.path.join(media_root, new_rel_path)

        try:
            # 既存の base thumbnail を取得
            base_thumb = Thumbnail.objects.get(image=new_rel_path)
        except Thumbnail.DoesNotExist:
            # base がまだなければ _XXX ファイルを rename して base とする
            old_abs_path = os.path.join(media_root, thumb.image.name)
            os.makedirs(os.path.dirname(new_abs_path), exist_ok=True)
            shutil.move(old_abs_path, new_abs_path)
            thumb.image.name = new_rel_path
            thumb.save()
            print(f"rename: {filename} → {thumb.image.name}")
            continue

        # Post の参照を base に置き換え
        posts = Post.objects.filter(thumbnail=thumb)
        for post in posts:
            post.thumbnail = base_thumb
            post.save()
        print(f"置換: {filename} → {base_name}")

        # 古い Thumbnail を削除
        old_abs_path = os.path.join(media_root, thumb.image.name)
        if os.path.exists(old_abs_path):
            os.remove(old_abs_path)
        thumb.delete()

    else:
        # suffix なしファイルは thumbnails/ に統一
        if not thumb.image.name.startswith("thumbnails/"):
            old_abs_path = os.path.join(media_root, thumb.image.name)
            new_rel_path = os.path.join("thumbnails", filename)
            new_abs_path = os.path.join(media_root, new_rel_path)

            if os.path.exists(new_abs_path):
                # 既に thumbnails/chat.png がある場合はそれを base として参照
                try:
                    base_thumb = Thumbnail.objects.get(image=new_rel_path)
                    posts = Post.objects.filter(thumbnail=thumb)
                    for post in posts:
                        post.thumbnail = base_thumb
                        post.save()
                    print(f"既存の base を利用: {filename} → {new_rel_path}")
                except Thumbnail.DoesNotExist:
                    # 念のため存在しない場合は移動
                    shutil.move(old_abs_path, new_abs_path)
                    thumb.image.name = new_rel_path
                    thumb.save()
                    print(f"移動: {filename} → {thumb.image.name}")
            else:
                # 新規に thumbnails/ に移動
                os.makedirs(os.path.dirname(new_abs_path), exist_ok=True)
                shutil.move(old_abs_path, new_abs_path)
                thumb.image.name = new_rel_path
                thumb.save()
                print(f"移動: {filename} → {thumb.image.name}")

print("処理完了！")
