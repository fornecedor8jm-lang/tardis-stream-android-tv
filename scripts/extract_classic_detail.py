import json
from bs4 import BeautifulSoup

path = '/home/ubuntu/browser_html/tardisstream_blogspot_com_page_1786903902932.html'
soup = BeautifulSoup(open(path, encoding='utf-8').read(), 'html.parser')
images = []
for img in soup.find_all('img'):
    images.append({'alt': img.get('alt',''), 'src': img.get('src','')})
links = []
for a in soup.find_all('a'):
    text = ' '.join(a.get_text(' ', strip=True).split())
    href = a.get('href','')
    if text or href:
        links.append({'text': text, 'href': href})
headings = []
for h in soup.find_all(['h2','h3','h4']):
    text = ' '.join(h.get_text(' ', strip=True).split())
    if text:
        headings.append(text)
open('/home/ubuntu/novelas-tv/tardis-classic-7-detail.json','w',encoding='utf-8').write(json.dumps({'images':images,'links':links,'headings':headings},ensure_ascii=False,indent=2))
print(json.dumps({'images':len(images),'links':len(links),'headings':len(headings)},indent=2))
