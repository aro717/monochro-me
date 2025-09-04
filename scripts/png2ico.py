from PIL import Image

# 元画像
img = Image.open("logo.png")
img.save("favicon.ico", sizes=[(16,16), (32,32), (48,48)])
