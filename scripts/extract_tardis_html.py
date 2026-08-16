import json
import sys
from bs4 import BeautifulSoup

html = open(sys.argv[1], encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')
links = []
for el in soup.find_all('a'):
    links.append({'text': ' '.join(el.get_text(' ', strip=True).split()), 'href': el.get('href', '')})
images = [{'alt': img.get('alt', ''), 'src': img.get('src', '')} for img in soup.find_all('img')]
cards = []
for el in soup.find_all(['article', 'div']):
    classes = ' '.join(el.get('class', []))
    text = ' '.join(el.get_text(' ', strip=True).split())
    if text and ('card' in classes.lower() or el.name == 'article'):
        cards.append({'text': text, 'html': str(el)[:2000]})
out = {'links': links, 'images': images, 'cards': cards}
open('/home/ubuntu/novelas-tv/tardis-home-links.json', 'w', encoding='utf-8').write(json.dumps(out, ensure_ascii=False, indent=2))
print(json.dumps({'linkCount': len(links), 'imageCount': len(images), 'cardCount': len(cards)}, indent=2))
