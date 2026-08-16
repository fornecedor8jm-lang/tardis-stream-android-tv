import json
import re
from bs4 import BeautifulSoup

path = '/home/ubuntu/browser_html/tardisstream_blogspot_com_page_1786903902932.html'
html = open(path, encoding='utf-8').read()
# The source stores the catalog in a JavaScript object. Capture each classic object by id.
items = []
for match in re.finditer(r'\{\s*id:\s*"c-s(\d+)"\s*,(.*?)(?=\n\s*\},\s*\n\s*\{\s*id:|\n\s*\}\s*\];)', html, re.S):
    number, body = match.groups()
    title = re.search(r'title:\s*"([^"]+)"', body)
    year = re.search(r'year:\s*"([^"]+)"', body)
    image = re.search(r'image:\s*"([^"]+)"', body)
    episodes = []
    ep_start = body.find('episodes:')
    if ep_start >= 0:
        ep_body = body[ep_start:]
        for ep in re.finditer(r'\{\s*num:\s*"([^"]+)"\s*,\s*name:\s*"([^"]+)".*?thumb:\s*"([^"]*)"\s*,\s*url:\s*"([^"]*)"\s*\}', ep_body, re.S):
            episodes.append({'num': ep.group(1), 'name': ep.group(2), 'thumb': ep.group(3), 'url': ep.group(4)})
    items.append({'season': number, 'title': title.group(1) if title else '', 'year': year.group(1) if year else '', 'poster': image.group(1) if image else '', 'episodes': episodes})
open('/home/ubuntu/novelas-tv/tardis-classic-catalog-source.json','w',encoding='utf-8').write(json.dumps(items,ensure_ascii=False,indent=2))
print(json.dumps({'seasons': len(items), 'episodes': sum(len(x['episodes']) for x in items)}, indent=2))
