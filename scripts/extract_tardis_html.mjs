import fs from 'node:fs';
import { load } from 'cheerio';

const input = process.argv[2];
const html = fs.readFileSync(input, 'utf8');
const $ = load(html);
const links = [];
$('a').each((_, el) => {
  const text = $(el).text().replace(/\s+/g, ' ').trim();
  const href = $(el).attr('href') || '';
  if (text || href) links.push({ text, href });
});
const images = [];
$('img').each((_, el) => {
  images.push({ alt: $(el).attr('alt') || '', src: $(el).attr('src') || '' });
});
const cards = [];
$('[class*="card"], article').each((_, el) => {
  const text = $(el).text().replace(/\s+/g, ' ').trim();
  if (text) cards.push({ text, html: $(el).html()?.slice(0, 2000) || '' });
});
fs.writeFileSync('/home/ubuntu/novelas-tv/tardis-home-links.json', JSON.stringify({ links, images, cards }, null, 2));
console.log(JSON.stringify({ linkCount: links.length, imageCount: images.length, cardCount: cards.length }, null, 2));
