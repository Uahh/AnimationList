import os
import time
import requests
from bs4 import BeautifulSoup as BS

def mkdir(path):
    folder = os.path.exists(path)
    if not folder:
        os.makedirs(path)

proxies = {
    "http": "http://127.0.0.1:10809",
    "https": "http://127.0.0.1:10809",
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 Edg/103.0.1264.49'
}

r = requests.get('http://bangumi.tv/anime/browser/tv/airtime/2022', headers=headers, proxies=proxies)
r.encoding = 'utf-8' 
soup = BS(r.text, features="html.parser")
animation_list = soup.find('ul', id='browserItemList')

path_list = [os.getcwd(), '\\cover\\2022']
path = os.path.join(''.join(path_list))

for animation in animation_list:
    if animation.div.h3.a:
        title_cn = animation.div.h3.a.text
    if animation.div.h3.small:
        title_jp = animation.div.h3.small.text
    
    if animation.a.span:
        cover_pic = animation.a.span.img.get('src')
        if cover_pic != '/img/no_icon_subject.png':
            cover_pic = 'https:' + cover_pic
            large_pic = cover_pic.replace('/c/', '/l/')

            temp_path = path + '\\' + title_cn
            mkdir(temp_path)

            temp_path = path + '\\' + title_cn + '\\cover.jpg'
            with open(temp_path, 'wb') as jpg_file:
                pic = requests.get(cover_pic, headers=headers, proxies=proxies)
                jpg_file.write(pic.content)
            temp_path = path + '\\' + title_cn + '\\large.jpg'
            with open(temp_path, 'wb') as jpg_file:
                pic = requests.get(large_pic, headers=headers, proxies=proxies)
                jpg_file.write(pic.content)
    time.sleep(1)
a = 0
