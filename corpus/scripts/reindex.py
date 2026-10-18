#!/usr/bin/env python3
"""Rebuild portable indexes and validate local Markdown file links. Requires PyYAML."""
import sys
sys.dont_write_bytecode = True
import hashlib, json, os, re
from pathlib import Path
from urllib.parse import unquote
import yaml
from normalize_metadata import normalize_all, split
from validate_metadata import validate_all
from build_facets import build_facets
ROOT=Path(__file__).resolve().parents[1]
MARK='\n<!-- generated-context-navigation -->\n'
def write(path,text):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
def dump(path,obj): write(path,json.dumps(obj,indent=2,ensure_ascii=False,default=str)+'\n')
def relative(src,dst): return os.path.relpath(dst,Path(src).parent).replace(os.sep,'/')
def sha(b): return hashlib.sha256(b).hexdigest()
bridges={
 'foundations/01-harness-concepts.md':['AEP-AGENT-001','AEP-AGENT-002','AEP-HBK-000'],
 'foundations/02-orchestration-patterns.md':['AEP-AGENT-004','AEP-AGENT-005','AEP-AGENT-006','AEP-AGENT-009'],
 'foundations/03-context-and-state.md':['AEP-CTX-001','AEP-CTX-003','AEP-CTX-007','AEP-CTX-009','AEP-KNOW-004'],
 'foundations/04-reliability-and-evals.md':['AEP-EVAL-001','AEP-EVAL-011','AEP-SEC-001','AEP-TOOL-005'],
 'codex-plugin/01-plugin-foundations.md':['AEP-SKILL-001','AEP-SKILL-006'],
 'codex-plugin/02-skills.md':['AEP-SKILL-002','AEP-SKILL-003','AEP-SKILL-009'],
 'codex-plugin/03-mcp-and-hooks.md':['AEP-TOOL-007','AEP-SKILL-005','AEP-TOOL-006'],
 'codex-sdk/01-sdk-foundations.md':['AEP-AGENT-003','AEP-MODEL-001','AEP-SEC-004'],
 'codex-sdk/02-configuration-and-capabilities.md':['AEP-MODEL-004','AEP-TOOL-002','AEP-SEC-006'],
 'codex-sdk/03-orchestration-pattern.md':['AEP-AGENT-006','AEP-AGENT-009','AEP-TOOL-005'],
 'app-server/01-app-server-foundations.md':['AEP-TOOL-008','AEP-AGENT-008'],
 'app-server/02-lifecycle-and-integration.md':['AEP-AGENT-009','AEP-SEC-007','AEP-OPS-002'],
 'architecture/01-integration-boundaries.md':['AEP-SKILL-005','AEP-TOOL-007','AEP-KNOW-008'],
 'architecture/02-reference-design.md':['AEP-KNOW-001','AEP-PERM-004','AEP-AUDIT-005'],
 'architecture/03-decisions-and-questions.md':['AEP-QUESTIONS-001','AEP-AUDIT-002'],
 'reference/GLOSSARY.md':['AEP-GLOSS-001'],
 'reference/SOURCES.md':['AEP-SRC-001','AEP-KNOW-006']}
normalize_all()
build_facets()
normalize_all()
docs=[]
for collection in ['handbook','harness']:
 for p in sorted((ROOT/collection).rglob('*.md')):
  body=p.read_text().split(MARK)[0]; p.write_text(body)
  meta={}
  if body.startswith('---\n'): meta=yaml.safe_load(body.split('---',2)[1]) or {}
  path=p.relative_to(ROOT).as_posix()
  heads=re.findall(r'^#{1,6} (.+)$',body,re.M)
  title=str(meta.get('title') or (heads[0] if heads else p.stem))
  ident=str(meta.get('id') or 'HARNESS-'+p.relative_to(ROOT/'harness').with_suffix('').as_posix().upper().replace('/','-'))
  docs.append({'id':ident,'path':path,'title':title,'collection':collection,'topic':p.parent.name if p.parent!=ROOT/collection else 'overview','metadata':meta,'headings':heads,'content_before_navigation_sha256':sha(body.encode()),'context_links':[]})
byid={d['id'].upper():d for d in docs};bypath={d['path']:d for d in docs}
assert len(byid)==len(docs),'Duplicate document IDs'
charter=byid['AEP-HBK-000']; principles={m:charter['path'] for m in re.findall(r'### (AEP-P-\d+)',(ROOT/charter['path']).read_text())}
edges=[];unresolved=[]
def link(a,b,kind):
 if not any(x['source']==a['id'] and x['target']==b['id'] and x['type']==kind for x in edges): edges.append({'source':a['id'],'target':b['id'],'type':kind})
 if b['path']!=a['path'] and b['path'] not in a['context_links']: a['context_links'].append(b['path'])
for d in docs:
 for ident in d['metadata'].get('related',[]):
  key=str(ident).upper()
  if key in byid:link(d,byid[key],'source-related')
  elif key in principles:
   edges.append({'source':d['id'],'target':key,'type':'source-principle'})
   if charter['path']!=d['path'] and charter['path'] not in d['context_links']:d['context_links'].append(charter['path'])
  else:unresolved.append({'source':d['id'],'target':ident})
for path,ids in bridges.items():
 a=bypath['harness/'+path]
 for ident in ids:
  b=byid[ident];link(a,b,'curated-bridge');link(b,a,'curated-bridge')
groups={}
for d in docs: groups.setdefault(d['collection']+'-'+d['topic'],[]).append(d)
for group,items in sorted(groups.items()):
 ip='indexes/'+group+'.md'
 write(ip,'# '+group.replace('-',' ').title()+'\n\n[All topics](../INDEX.md) · [Reading paths](../READING-PATHS.md)\n\n'+'\n'.join('- ['+d['id']+' — '+d['title']+'](../'+d['path']+')' for d in items)+'\n')
 for d in items:
  links=['[Topic index]('+relative(d['path'],ip)+')','[All topics]('+relative(d['path'],'INDEX.md')+')','[Reading paths]('+relative(d['path'],'READING-PATHS.md')+')']
  extra='\n'.join('- ['+bypath[p]['id']+' — '+bypath[p]['title']+']('+relative(d['path'],p)+')' for p in d['context_links'])
  p=ROOT/d['path'];p.write_text(p.read_text()+MARK+'\n## Package context links\n\n'+' · '.join(links)+'\n\n'+(extra+'\n' if extra else 'Use the topic index for adjacent documents.\n'))
  d['sha256']=sha(p.read_bytes());d['bytes']=p.stat().st_size
  d['topic_index']=ip
write('INDEX.md','# Unified topic index\n\n[Agent entrypoint](AGENTS.md) · [Task reading paths](READING-PATHS.md) · [Machine catalog](catalog.json) · [Tag index](TAG-INDEX.md) · [Metadata contract](METADATA.md)\n\nRead a topic index, then selected documents. Counts include source navigation documents.\n\n'+'\n'.join('- ['+k.replace('-',' ').title()+'](indexes/'+k+'.md) — '+str(len(v))+' documents' for k,v in sorted(groups.items()))+'\n')
routes=[
 ('Design a harness','foundations/01-harness-concepts.md',['AEP-AGENT-002','AEP-AGENT-006','AEP-AGENT-009']),
 ('Build a context engine or knowledge index','foundations/03-context-and-state.md',['AEP-CTX-003','AEP-CTX-005','AEP-KNOW-002','AEP-KNOW-003','AEP-KNOW-004','AEP-PERM-004']),
 ('Choose SDK, App Server, or plugin integration','architecture/01-integration-boundaries.md',['AEP-TOOL-007','AEP-SKILL-005']),
 ('Author skills and tools','codex-plugin/02-skills.md',['AEP-SKILL-003','AEP-TOOL-002','AEP-TOOL-005','AEP-TOOL-006']),
 ('Make work durable and recoverable','codex-sdk/03-orchestration-pattern.md',['AEP-AGENT-009','AEP-OPS-004','AEP-AUDIT-005']),
 ('Establish evaluation and release gates','foundations/04-reliability-and-evals.md',['AEP-EVAL-002','AEP-EVAL-004','AEP-EVAL-008','AEP-EVAL-011']),
 ('Review permissions and security','architecture/02-reference-design.md',['AEP-SEC-002','AEP-SEC-003','AEP-PERM-004','AEP-ASSURE-001']),
 ('Optimize model, context, and inference cost','codex-sdk/02-configuration-and-capabilities.md',['AEP-MODEL-005','AEP-MODEL-006','AEP-COST-003','AEP-COST-009']),
 ('Apply guidance to software delivery','architecture/02-reference-design.md',['AEP-CODE-002','AEP-CODE-005','AEP-CODE-008','AEP-CODE-011'])]
rtext='# Task-oriented reading paths\n\n[All topics](INDEX.md). Read each path in order, stopping when you have sufficient evidence. These are navigation suggestions, not mandatory workflows.\n'
for title,path,ids in routes:
 rtext+='\n## '+title+'\n\n'
 for n,d in enumerate([bypath['harness/'+path]]+[byid[i] for i in ids],1):rtext+=str(n)+'. ['+d['title']+']('+d['path']+') — `'+d['id']+'`\n'
write('READING-PATHS.md',rtext)
# Standardize all newly generated indexes and refresh catalog metadata/hashes.
normalize_all()
for p in sorted(ROOT.rglob('*.md')):
 path=p.relative_to(ROOT).as_posix()
 meta, body=split(p.read_text())
 if path in bypath:
  d=bypath[path]
  d['metadata']=meta
 else:
  d={'id':meta['id'],'path':path,'title':meta['title'],'collection':'assembly','topic':'navigation','metadata':meta,'headings':re.findall(r'^#{1,6} (.+)$',body,re.M),'context_links':[]}
  docs.append(d);bypath[path]=d;byid[d['id']]=d
 d['sha256']=sha(p.read_bytes());d['bytes']=p.stat().st_size
 d['content_before_navigation_sha256']=sha(p.read_text().split(MARK)[0].encode())
# Preserve explicit local Markdown relationships as graph edges.
broken=[]
for p in sorted(ROOT.rglob('*.md')):
 text=re.sub(r'```.*?```','',p.read_text(),flags=re.S)
 for target in re.findall(r'\]\(([^)]+)\)',text):
  if re.match(r'[a-zA-Z][\w+.-]*:',target) or target.startswith('#'):continue
  target=unquote(target.split('#')[0])
  resolved=(p.parent/target).resolve()
  if not resolved.exists():broken.append({'source':p.relative_to(ROOT).as_posix(),'target':target})
  try: dst=resolved.relative_to(ROOT).as_posix()
  except ValueError: broken.append({'source':str(p),'target':target,'error':'outside package'});continue
  src=p.relative_to(ROOT).as_posix()
  if src in bypath and dst in bypath:link(bypath[src],bypath[dst],'markdown-link')
for d in docs:d['context_links']=sorted(set(d['context_links']))

dump('graph.json',{'schema_version':'1.0','nodes':[{'id':d['id'],'path':d['path'],'type':'document'} for d in docs]+[{'id':i,'path':p,'type':'principle'} for i,p in principles.items()],'edges':sorted(edges,key=lambda e:(e['source'],e['type'],e['target'])),'unresolved_source_references':unresolved})
write('VALIDATION.md',f'# Validation report\n\n- Markdown documents indexed: {len(docs)}.\n- Handbook documents: {sum(d["collection"]=="handbook" for d in docs)}.\n- Harness documents: {sum(d["collection"]=="harness" for d in docs)}.\n- Topic indexes: {len(groups)}.\n- Duplicate document IDs: 0.\n- Broken local Markdown file targets: {len(broken)}.\n- Unresolved source metadata IDs: {len(unresolved)} (see graph.json).\n\nAll source-related IDs that resolve to documents or charter principles are represented in the graph. Unresolved IDs are preserved as source evidence gaps. Remote URLs, Markdown fragment anchors, and technical currency were not validated.\n')
normalize_all()
for d in docs:
 p=ROOT/d['path'];d['metadata']=split(p.read_text())[0];d['sha256']=sha(p.read_bytes());d['bytes']=p.stat().st_size;d['content_before_navigation_sha256']=sha(p.read_text().split(MARK)[0].encode())
dump('catalog.json',{'schema_version':'1.0','path_base':'package-root','documents':docs})
dump('validation.json',{'broken_local_links':broken,'unresolved_source_references':unresolved})
# Generated JSON targets exist by validation time on subsequent runs; required on first run too.
assert not broken,broken
dump('manifest.json',{'name':'agentic-engineering-knowledge','version':'1.1.0','assembled':'2026-10-16','entrypoint':'AGENTS.md','index':'INDEX.md','catalog':'catalog.json','graph':'graph.json','document_count':len(docs),'metadata_schema':'metadata/front-matter.schema.json','taxonomy':'metadata/taxonomy.json','files':[p.relative_to(ROOT).as_posix() for p in sorted(ROOT.rglob('*')) if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts]})
print(json.dumps({'documents':len(docs),'topics':len(groups),'edges':len(edges),'unresolved_ids':len(unresolved),'broken_links':len(broken)}))

validate_all()
