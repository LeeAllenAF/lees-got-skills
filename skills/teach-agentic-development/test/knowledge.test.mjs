import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { CORPUS_ROOT, SKILL_ROOT, loadIndex, checkIndex, queryKnowledge, getDocument, relatedDocuments } from '../scripts/engine.mjs';
const index=loadIndex();

test('compiled index matches corpus and detects corruption',()=>{
 assert.equal(checkIndex(index).status,'valid');
 const broken=structuredClone(index);broken.sections[0].text+=' corrupted';
 assert.throws(()=>checkIndex(broken),/integrity/);
});
test('query is deterministic, grounded and source line ranges are accurate',()=>{
 const a=queryKnowledge('When should I use multiple agents?',index);
 assert.deepEqual(a,queryKnowledge('When should I use multiple agents?',index));
 assert.equal(a.status,'found');
 for(const p of a.passages){
  const lines=readFileSync(resolve(CORPUS_ROOT,p.path.replace(/^corpus\//,'')),'utf8').split('\n');
  assert.equal(lines.slice(p.lineStart-1,p.lineEnd).join('\n').trimEnd(),p.text);
  assert.ok(!p.text.includes('generated-context-navigation'));
 }
});
test('budget applies to serialized UTF-8 output including envelope',()=>{
 for(const maxBytes of [2048,3000,12000,24000])for(const method of [()=>queryKnowledge('context memory retrieval',index,{maxBytes}),()=>getDocument('AEP-CTX-001',index,{maxBytes})]){
  const result=method();assert.ok(Buffer.byteLength(JSON.stringify(result)+'\n')<=maxBytes);
  assert.ok(result.passages.length>0);
 }
 assert.throws(()=>queryKnowledge('context',index,{maxBytes:10}),/maxBytes/);
});
test('exact lookup is case-insensitive and pagination never skips returned sections',()=>{
 let offset=0,seen=[];
 for(let count=0;count<100;count++){
  const r=getDocument('aep-ctx-001',index,{offset,maxBytes:3000});
  seen.push(...r.passages.map(p=>p.lineStart));
  if(r.document.nextOffset===null)break;
  assert.equal(r.document.nextOffset,offset+r.passages.length);offset=r.document.nextOffset;
 }
 assert.deepEqual(seen,index.sections.filter(s=>s.documentId==='AEP-CTX-001').map(s=>s.lineStart));
 assert.throws(()=>getDocument('../../etc/passwd',index),/Unknown/);
 assert.throws(()=>getDocument('AEP-CTX-001',index,{offset:-1}),/offset/);
});
test('ambiguity and missing evidence are explicit',()=>{
 assert.equal(queryKnowledge('Explain agents',index).status,'ambiguous');
 const r=queryKnowledge('quantum entanglement',index);assert.equal(r.status,'insufficient');assert.equal(r.passages.length,0);
 assert.throws(()=>queryKnowledge('',index),/nonempty/);
 assert.throws(()=>queryKnowledge('a'.repeat(2001),index),/2000/);
});
test('related IDs are bounded and resolvable without traversal',()=>{
 const r=relatedDocuments('AEP-AGENT-004',index);assert.ok(r.relatedDocumentIds.length<=12);
 for(const id of r.relatedDocumentIds)assert.ok(index.documents.some(d=>d.id===id));
 assert.deepEqual(r.passages,[]);
});
test('CLI accepts literal stdin questions and rejects malformed requests',()=>{
 const run=input=>spawnSync(process.execPath,['scripts/cli.mjs','--stdin'],{cwd:SKILL_ROOT,input,encoding:'utf8'});
 const good=run(JSON.stringify({command:'query',query:'What is memory? $(echo INJECTED) `echo INJECTED`'}));
 assert.equal(good.status,0);assert.equal(JSON.parse(good.stdout).inferenceCalls,0);
 for(const input of ['{',JSON.stringify({command:'query',query:'memory',unexpected:true}),JSON.stringify({command:'execute',query:'memory'})]){
  const bad=run(input);assert.equal(bad.status,1);assert.equal(bad.stdout,'');assert.equal(JSON.parse(bad.stderr).status,'error');
 }
});
