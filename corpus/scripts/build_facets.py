"""Rebuild human-readable taxonomy and tag browsing from explicit metadata."""
from normalize_metadata import ROOT,vocabulary,split

def build_facets():
 v=vocabulary()
 t='# Controlled tag vocabulary\n\n[Metadata contract](METADATA.md) · [Tag index](TAG-INDEX.md)\n\nTags classify primary subjects, not every mentioned concept. Broad routing categories are separate `domains`. All terms are lowercase kebab-case; aliases are query aids in [taxonomy.json](metadata/taxonomy.json).\n\n| Tag | Definition |\n| --- | --- |\n'
 for tag,definition in sorted(v.items()):t+=f'| `{tag}` | {definition} |\n'
 (ROOT/'TAXONOMY.md').write_text(t)
 t='# Browse source documents by tag\n\n[Topic index](INDEX.md) · [Tag definitions](TAXONOMY.md)\n\nThis index lists imported source documents. Assembly navigation is also classified in the machine catalog.\n'
 docs=[]
 for coll in ['handbook','harness']:
  for p in sorted((ROOT/coll).rglob('*.md')):
   meta,_=split(p.read_text());docs.append((p.relative_to(ROOT).as_posix(),meta))
 for tag in sorted(v):
  matches=[(p,m) for p,m in docs if tag in m['tags']]
  if not matches:continue
  t+='\n## '+tag+'\n\n'+v[tag]+'\n\n'
  for path,m in matches:t+=f'- [{m["id"]} — {m["title"]}]({path})\n'
 (ROOT/'TAG-INDEX.md').write_text(t)
