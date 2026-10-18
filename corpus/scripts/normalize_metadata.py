"""Apply reviewed, explicit classifications; no keyword-inferred tag assignment."""
import hashlib,json,re
from pathlib import Path
import yaml
ROOT=Path(__file__).resolve().parents[1]
DATE='2026-10-16'
MARK='\n<!-- generated-context-navigation -->\n'
def split(text):
 m=re.match(r'^---\n(.*?)\n---\n',text,re.S)
 return (yaml.safe_load(m[1]) or {},text[m.end():]) if m else ({},text)
def read_json(name):return json.loads((ROOT/name).read_text())
def dump(name,obj): (ROOT/name).write_text(json.dumps(obj,indent=2,ensure_ascii=False,default=str)+'\n')
def classifications():
 result={};family=None;n=0
 for line in (ROOT/'metadata/classifications.txt').read_text().splitlines():
  if not line or line.startswith('#'):continue
  if line.startswith('['):family=line[1:-1];n=0;continue
  n+=1;result[f'AEP-{family}-{n:03}']=line.split(',')
 special={
 'AEP-BASE-001':'knowledge-management,index-navigation',
 'AEP-GLOSS-001':'glossary,knowledge-management',
 'AEP-HBK-000':'governance,deterministic-control,knowledge-management',
 'AEP-PLAN-001':'planning,knowledge-management',
 'AEP-QUESTIONS-001':'knowledge-management,experimentation',
 'HARNESS-AGENTS':'index-navigation,harness-design',
 'HARNESS-INDEX':'index-navigation,harness-design',
 'HARNESS-README':'index-navigation,harness-design',
 'HARNESS-APP-SERVER-01-APP-SERVER-FOUNDATIONS':'codex-app-server,architecture',
 'HARNESS-APP-SERVER-02-LIFECYCLE-AND-INTEGRATION':'codex-app-server,state-management,human-approval',
 'HARNESS-ARCHITECTURE-01-INTEGRATION-BOUNDARIES':'architecture,codex-sdk,codex-app-server,codex-plugins',
 'HARNESS-ARCHITECTURE-02-REFERENCE-DESIGN':'harness-design,architecture,state-management',
 'HARNESS-ARCHITECTURE-03-DECISIONS-AND-QUESTIONS':'architecture,decision-records',
 'HARNESS-CODEX-PLUGIN-01-PLUGIN-FOUNDATIONS':'codex-plugins,packaging',
 'HARNESS-CODEX-PLUGIN-02-SKILLS':'skill-authoring,progressive-disclosure',
 'HARNESS-CODEX-PLUGIN-03-MCP-AND-HOOKS':'mcp,lifecycle-hooks,authorization',
 'HARNESS-CODEX-SDK-01-SDK-FOUNDATIONS':'codex-sdk,authentication',
 'HARNESS-CODEX-SDK-02-CONFIGURATION-AND-CAPABILITIES':'codex-sdk,reasoning-effort,structured-output',
 'HARNESS-CODEX-SDK-03-ORCHESTRATION-PATTERN':'codex-sdk,orchestration,state-management',
 'HARNESS-FOUNDATIONS-01-HARNESS-CONCEPTS':'harness-design,orchestration',
 'HARNESS-FOUNDATIONS-02-ORCHESTRATION-PATTERNS':'orchestration,multi-agent,deterministic-control',
 'HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE':'context-engineering,memory,state-management,retrieval',
 'HARNESS-FOUNDATIONS-04-RELIABILITY-AND-EVALS':'reliability,evaluation,observability,security-controls',
 'HARNESS-REFERENCE-GLOSSARY':'glossary,harness-design',
 'HARNESS-REFERENCE-SOURCES':'provenance,source-authority'}
 result.update({k:v.split(',') for k,v in special.items()});return result
DOMAIN={'tools':'tool-engineering',
'agents':'agent-architecture','assurance':'security-assurance','audit':'auditability','coding':'software-engineering','context':'context-engineering','cost':'cost-performance','evals':'evaluation','foundations':'engineering-foundations','innovation':'research-innovation','knowledge':'knowledge-systems','models':'model-engineering','operations':'operations','permissions':'access-control','security':'security','skills':'skill-engineering','sources':'source-intelligence','app-server':'codex-integration','architecture':'harness-architecture','codex-plugin':'codex-integration','codex-sdk':'codex-integration','reference':'reference'}
ASSEMBLY={
'README.md':('reference',['index-navigation','knowledge-management']),
'AGENTS.md':('instruction',['index-navigation','metadata']),
'INDEX.md':('index',['index-navigation','knowledge-management']),
'READING-PATHS.md':('index',['index-navigation','harness-design']),
'PROVENANCE.md':('reference',['provenance','change-history']),
'VALIDATION.md':('report',['verification','index-navigation']),
'METADATA.md':('reference',['metadata','schemas']),
'TAXONOMY.md':('reference',['metadata','index-navigation']),
'METADATA-REVIEW.md':('report',['metadata','verification']),
'TAG-INDEX.md':('index',['index-navigation','metadata'])}
def vocabulary():
 return {l.split('|',1)[0]:l.split('|',1)[1] for l in (ROOT/'metadata/tag-definitions.txt').read_text().splitlines() if l}
def normalize_all():
 originals=read_json('metadata/original-metadata.json');assign=classifications();vocab=vocabulary()
 sources={x['path']:x for x in read_json('provenance.json')['files']}
 audit=[]
 for p in sorted(ROOT.rglob('*.md')):
  path=p.relative_to(ROOT).as_posix();current,body=split(p.read_text());old=originals.get(path,{}).get('front_matter',{})
  original_body=body.split(MARK)[0]
  h=re.search(r'^# (.+)$',body,re.M);title=old.get('title') or (h[1] if h else p.stem)
  collection=path.split('/')[0] if path.startswith(('handbook/','harness/')) else 'assembly'
  if collection=='handbook': ident=old['id'];domain=DOMAIN[p.parent.name]
  elif collection=='harness':ident='HARNESS-'+p.relative_to(ROOT/'harness').with_suffix('').as_posix().upper().replace('/','-');domain=DOMAIN.get(p.parent.name,'harness-architecture')
  else: ident='PACK-'+re.sub(r'[^A-Z0-9]+','-',path[:-3].upper());domain='package-navigation'
  tags=assign.get(ident)
  kind=old.get('type','guidance')
  if kind not in ['standard','guidance','reference','index','plan','instruction','report','pattern','playbook','evaluation']:kind='reference'
  if collection=='assembly':
   kind,tags=ASSEMBLY.get(path,('index',['index-navigation','metadata']))
  elif collection=='harness':
   if p.name=='AGENTS.md':kind='instruction'
   elif p.name=='INDEX.md':kind='index'
   elif p.name in ['README.md','GLOSSARY.md','SOURCES.md']:kind='reference'
  if ident=='AEP-PLAN-001':kind='plan'
  if ident in ['AEP-GLOSS-001','AEP-QUESTIONS-001','AEP-BASE-001']:kind='reference'
  assert tags is not None,('unreviewed document',path)
  assert all(t in vocab for t in tags),(path,tags)
  tags=sorted(set(tags))
  # Evidence is from original content, excluding generated navigation and metadata.
  lines=[l.strip() for l in original_body.splitlines() if l.strip() and not l.startswith(('#','[','```','---','> Portable'))]
  evidence=' '.join(lines)[:600]
  summary=f'{title.rstrip(".")}. Focus: '+', '.join(t.replace('-',' ') for t in tags)+'.'
  review=old.get('review',{}) or {}
  technical_date=review.get('last_reviewed') or ('2026-10-14' if collection=='harness' else None)
  origin=sources.get(path)
  meta={'schema_version':'1.0','id':ident,'title':str(title),'summary':summary,'type':kind,
   'status':old.get('status','informational'),'version':str(old.get('version','1.0.0')),
   'collection':collection,'domains':[domain],'tags':tags,'scope':old.get('scope',['portable-reference']),
   'related':old.get('related',[]),
   'review':{'metadata_reviewed_on':DATE,'method':'assistant-content-classification','technical_review_performed':False,'technical_last_reviewed':str(technical_date) if technical_date else None,'technical_review_interval':str(review['review_interval']) if review.get('review_interval') else None,'owner':review.get('owner')},
   'provenance':{'source_archive':origin['archive'] if origin else None,'original_path':origin['original_path'] if origin else None,'original_sha256':origin['sha256'] if origin else None,'original_metadata_record':path if path in originals else None,'authority':'inherited-source-context' if collection=='handbook' else 'reference-only'}}
  p.write_text('---\n'+yaml.safe_dump(meta,sort_keys=False,allow_unicode=True,width=110)+'---\n'+body)
  if collection!='assembly':audit.append({'id':ident,'path':path,'title':title,'review_method':'assistant-selected focused tags after inspecting purpose, headings, and relevant content','tags_before':old.get('tags',[]),'tags_after':tags,'domains_before':old.get('domains',[]),'domains_after':[domain],'evidence_excerpt':evidence,'rationale':'Classified by the document’s primary subject; incidental boilerplate and reference-list mentions are excluded.','original_body_sha256':originals[path]['body_sha256'],'current_body_sha256':hashlib.sha256(original_body.encode()).hexdigest()})
 dump('metadata/classification-review.json',{'reviewed_on':DATE,'technical_claims_revalidated':False,'documents':audit})
 return audit
if __name__=='__main__':normalize_all()
