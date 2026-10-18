"""Schema, taxonomy, catalog consistency and source-body integrity gate."""
import hashlib,json,re
from pathlib import Path
from normalize_metadata import split,ROOT,MARK,vocabulary

def validate_schema(value, rule, path='$'):
 """Validate every keyword used by the bundled schema; reject unsupported keywords."""
 allowed={'$schema','title','type','required','additionalProperties','properties','const','enum','pattern','minLength','minItems','maxItems','uniqueItems','items'}
 assert set(rule)<=allowed,('unsupported schema keyword',set(rule)-allowed)
 if 'const' in rule:assert value==rule['const'],(path,'const')
 if 'enum' in rule:assert value in rule['enum'],(path,'enum',value)
 kinds=rule.get('type',[]);kinds=[kinds] if isinstance(kinds,str) else kinds
 checks={'object':lambda:isinstance(value,dict),'array':lambda:isinstance(value,list),'string':lambda:isinstance(value,str),'null':lambda:value is None}
 if kinds:assert any(checks[k]() for k in kinds),(path,'type',value)
 if isinstance(value,dict):
  assert set(rule.get('required',[]))<=set(value),(path,'missing fields')
  if rule.get('additionalProperties') is False:assert set(value)<=set(rule['properties']),(path,'extra fields')
  for k,v in value.items():
   if k in rule.get('properties',{}):validate_schema(v,rule['properties'][k],path+'.'+k)
 if isinstance(value,list):
  assert len(value)>=rule.get('minItems',0),(path,'minItems')
  assert len(value)<=rule.get('maxItems',len(value)),(path,'maxItems')
  if rule.get('uniqueItems'):assert len({json.dumps(v,sort_keys=True) for v in value})==len(value),(path,'duplicates')
  for i,v in enumerate(value):validate_schema(v,rule.get('items',{}),path+'['+str(i)+']')
 if isinstance(value,str):
  assert len(value)>=rule.get('minLength',0),(path,'minLength')
  if 'pattern' in rule:assert re.search(rule['pattern'],value),(path,'pattern',value)

def validate_all():
 schema=json.loads((ROOT/'metadata/front-matter.schema.json').read_text())
 tax=json.loads((ROOT/'metadata/taxonomy.json').read_text())
 assert tax['tags']==vocabulary(),'Taxonomy definitions differ from source'
 catalog=json.loads((ROOT/'catalog.json').read_text())['documents']
 bypath={d['path']:d for d in catalog};ids=set();count=0
 for p in sorted(ROOT.rglob('*.md')):
  path=p.relative_to(ROOT).as_posix();meta,body=split(p.read_text())
  validate_schema(meta,schema)
  assert meta['id'] not in ids,('duplicate id',meta['id']);ids.add(meta['id'])
  assert meta['tags']==sorted(set(meta['tags'])),('unsorted or duplicate tags',path)
  assert set(meta['tags'])<=set(tax['tags']),('unknown tag',path)
  assert set(meta['domains'])<=set(tax['domains']),('unknown domain',path)
  assert path in bypath,('unindexed document',path)
  assert bypath[path]['metadata']==meta,('catalog metadata mismatch',path)
  assert bypath[path]['sha256']==hashlib.sha256(p.read_bytes()).hexdigest(),('catalog hash mismatch',path)
  count+=1
 assert count==len(catalog)
 review=json.loads((ROOT/'metadata/classification-review.json').read_text())['documents']
 for d in review:assert d['current_body_sha256']==d['original_body_sha256'],('source body changed',d['path'])
 assert len(review)==190
 print(json.dumps({'metadata_schema_validated':count,'reviewed_source_documents':len(review),'source_bodies_preserved':True,'catalog_consistent':True}))
if __name__=='__main__':validate_all()
