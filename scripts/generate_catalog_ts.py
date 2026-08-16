import json
from pathlib import Path

src = json.loads(Path('/home/ubuntu/novelas-tv/tardis-classic-catalog-source.json').read_text(encoding='utf-8'))
out = '''/* TARDIS STREAM TV — dados auditados na fonte.\n * Regra: poster é o artwork da temporada; episode.thumb é o artwork do arco; episode.url é o vídeo.\n */\nexport type Episode = { num: string; name: string; thumb: string; url: string; available: boolean };\nexport type AuditedClassic = { season: string; title: string; year: string; poster: string; sourcePage: string; episodes: Episode[] };\n\nexport const classicSourcePage = "https://tardisstream.blogspot.com/?m=1#cards-grid";\n\nexport const auditedClassics: AuditedClassic[] = [\n'''
for item in src:
    out += '  {\n'
    out += f'    season: {json.dumps(item["season"], ensure_ascii=False)},\n'
    out += f'    title: {json.dumps(item["title"].replace(" (Série Clássica)", ""), ensure_ascii=False)},\n'
    out += f'    year: {json.dumps(item["year"], ensure_ascii=False)},\n'
    out += f'    poster: {json.dumps(item["poster"], ensure_ascii=False)},\n'
    out += '    sourcePage: classicSourcePage,\n    episodes: [\n'
    for ep in item['episodes']:
        out += '      { '
        out += f'num: {json.dumps(ep["num"], ensure_ascii=False)}, name: {json.dumps(ep["name"], ensure_ascii=False)}, '
        out += f'thumb: {json.dumps(ep["thumb"], ensure_ascii=False)}, url: {json.dumps(ep["url"], ensure_ascii=False)}, available: {str(ep["url"] != "#").lower()} '
        out += '},\n'
    out += '    ],\n  },\n'
out += '];\n'
Path('/home/ubuntu/novelas-tv/client/src/data').mkdir(parents=True, exist_ok=True)
Path('/home/ubuntu/novelas-tv/client/src/data/tardisCatalog.ts').write_text(out, encoding='utf-8')
print(f'generated {len(src)} seasons')
