import os
import shutil
import django
import sys

# Django 環境の設定
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # manage.py の親フォルダ
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")  # settings.py のモジュールパス
django.setup()

from django.conf import settings
from myuploader.models import Composite

def move_files_to_uploader():
    media_root = settings.MEDIA_ROOT
    target_dir = os.path.join(media_root, "uploader")
    os.makedirs(target_dir, exist_ok=True)

    for comp in Composite.objects.all():
        if not comp.src:
            continue  # ファイルが設定されていない場合はスキップ

        old_path = os.path.join(media_root, comp.src.name)
        if not os.path.exists(old_path):
            print(f"ファイルが存在しません: {old_path}")
            continue

        # 新しいファイルパス
        filename = os.path.basename(comp.src.name)
        new_path = os.path.join(target_dir, filename)

        # 衝突回避: 同名ファイルが存在する場合はスキップ
        if os.path.exists(new_path):
            print(f"既に存在するためスキップ: {new_path}")
            # DB 上は既存ファイルを参照
            comp.src.name = os.path.join("uploader", filename)
            comp.save()
            continue

        # 移動
        shutil.move(old_path, new_path)
        comp.src.name = os.path.join("uploader", filename)
        comp.save()
        print(f"移動: {old_path} → {new_path}")

    print("完了！")

if __name__ == "__main__":
    move_files_to_uploader()
