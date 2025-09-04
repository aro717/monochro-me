import datetime
import subprocess
import dropbox

dbx = dropbox.Dropbox('')  # Generated access token
now = datetime.datetime.now()
db_file_name = f'{now.hour}-{now.minute}-{now.second}.sqlite3'
dropbox_path = f'/mydjango/{now.year}/{now.month}/{now.day}/{db_file_name}'

print(now, 'backup start')
dbx.files_upload(open('./db.sqlite3', 'rb').read(), dropbox_path, mode=dropbox.files.WriteMode('overwrite'))
print(datetime.datetime.now(), 'backup end')
