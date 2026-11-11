from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlsplit,unquote
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[1]
errors=[]
files=list(ROOT.rglob('index.html'))
assert len(files)==17, 'Expected five main pages, three service subpages and nine articles'
assert len(list((ROOT/'post').glob('*/index.html')))==9
assert len(list((ROOT/'services').glob('*/index.html')))==3
for f in files:
 soup=BeautifulSoup(f.read_text(),'html.parser')
 if any(c in soup.get_text() for c in '↗↘↖↙'): errors.append(f'{f}: decorative diagonal arrow remains')
 if len(soup.select('h1'))!=1: errors.append(f'{f}: h1 count')
 for el in soup.select('[href],[src]'):
  value=el.get('href') or el.get('src'); u=urlsplit(value)
  if u.scheme or u.netloc or not u.path: continue
  dest=(f.parent/unquote(u.path)).resolve()
  if not dest.exists(): errors.append(f'{f}: missing {value}')
  elif el.has_attr('href') and u.fragment:
   html=dest/'index.html' if dest.is_dir() else dest
   if html.suffix=='.html' and not BeautifulSoup(html.read_text(),'html.parser').find(id=u.fragment): errors.append(f'{f}: missing anchor {value}')
with sync_playwright() as p:
 b=p.chromium.launch()
 page=b.new_page()
 page.on('pageerror',lambda e:errors.append(str(e)))
 for width in [1440,768,390]:
  page.set_viewport_size({'width':width,'height':1000})
  for f in files:
   rel=f.relative_to(ROOT).as_posix()
   response=page.goto('http://localhost:8766/'+rel,wait_until='networkidle')
   if response.status!=200: errors.append(f'{rel}: HTTP {response.status}')
   if page.evaluate('document.documentElement.scrollWidth>innerWidth'): errors.append(f'{rel}: overflow at {width}')
   if page.locator('img').evaluate_all('(imgs)=>imgs.some(i=>i.complete && i.naturalWidth===0)'): errors.append(f'{rel}: broken image')
   if rel=='index.html': page.screenshot(path=str(ROOT/'qa'/f'home-{width}.png'),full_page=True)
 page.goto('http://localhost:8766/')
 page.get_by_role('button',name='Menu +').click()
 assert page.locator('#navigation').is_visible()
 page.keyboard.press('Escape');assert not page.locator('#navigation').is_visible()
 page.goto('http://localhost:8766/post/')
 page.get_by_role('button',name='Flooring',exact=True).click()
 assert page.locator('[data-category]:visible').count()>0
 assert page.locator('[data-category]:visible').evaluate_all('(els)=>els.every(e=>e.dataset.category==="flooring")')
 page.goto('http://localhost:8766/')
 page.get_by_role('button',name='Menu +').click()
 page.get_by_role('button',name='Show service pages').click()
 assert page.locator('#service-menu a').count()==3
 page.get_by_role('link',name='Hardwood Flooring Installation',exact=True).click()
 assert '/services/hardwood-flooring-installation/' in page.url
 assert page.locator('.breadcrumbs').is_visible()
 page.goto('http://localhost:8766/contact/#inquiry')
 assert not page.locator('form[data-inquiry]').evaluate('(f)=>f.checkValidity()')
 page.locator('#contact-first').fill('Preview Test');page.locator('#contact-last').fill('Example');page.locator('#contact-phone').fill('4125550100');page.locator('#contact-email').fill('preview@example.com');page.locator('#contact-location').fill('Pittsburgh 15201');page.locator('#contact-service').select_option(label='Hardwood Flooring Installation')
 page.locator('.inquiry-form__submit').click()
 assert 'not been sent' in page.locator('.inquiry-form__status').inner_text()
 assert 'Preview Test' in page.locator('.inquiry-form__email-draft').input_value()
 b.close()
report={'pages':len(files),'widths':[1440,768,390],'errors':errors,'interactions':['mobile menu and Escape','journal category filter','services submenu and nested route','form validation and email fallback']}
(ROOT/'qa'/'verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
raise SystemExit(bool(errors))
