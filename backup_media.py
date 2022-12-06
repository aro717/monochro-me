import datetime
from pathlib import Path
import dropbox

dbx = dropbox.Dropbox('')  # Generated access token
now = datetime.datetime.now()
dropbox_path = f'/mydjango/{now.year}/{now.month}/{now.day}'


def upload_all_files(path):
    if path.is_dir():
        for p in path.iterdir():
            upload_all_files(p)
    elif path.is_file():
        dbx.files_upload(path.read_bytes(), dropbox_path + str(path), mode=dropbox.files.WriteMode('overwrite'))


print(now, 'backup start')
upload_all_files(Path('./media'))
print(datetime.datetime.now(), 'backup end')
