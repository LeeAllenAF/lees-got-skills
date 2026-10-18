import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

export const SKILL_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packagedCorpusRoot = resolve(SKILL_ROOT, 'corpus');
const repositoryCorpusRoot = resolve(SKILL_ROOT, '../../corpus');
export const CORPUS_ROOT = existsSync(packagedCorpusRoot)
  ? packagedCorpusRoot
  : repositoryCorpusRoot;
const INDEX = resolve(SKILL_ROOT, 'references/search-index.json');
const VERSION = 1;
const MAX_BYTES = 24000;
const STOP = new Set('a an the and or but to of in on for with from by as at is are was were be being been it its this that these those i me my we our you your they their what which who when where why how do does did can could should would will shall about explain describe give tell please use using need want versus vs than then into also difference different between make happens happen handle'.split(' '));
const GENERIC = new Set(['agent','agentic','development','system','concept','learn','learning','example','help','thing']);
const EXPANSIONS = [
  [/\bevaluat(?:e|ing|ion)\b/i, 'evaluation'],
  [/\b(choose|select|choosing|selecting) (?:a |an |the )?model\b/i, 'model selection'],
  [/\b(retries|retry|duplicate side effects)\b/i, 'idempotency retries'],
  [/\b(multiple|several|many) agents?\b/i, 'multi-agent delegation'],
  [/\b(subagents?|delegate|delegating)\b/i, 'multi-agent delegation'],
  [/\bremember(?:ing)?\b/i, 'memory persistent'],
  [/\b(forget|forgetting|running out of context)\b/i, 'context compaction memory'],
  [/\b(cheaper|cheap|expensive|spending)\b/i, 'cost optimization'],
  [/\b(vector|vectors)\b/i, 'embeddings semantic retrieval'],
  [/\bkeyword\b/i, 'lexical search'],
  [/\b(check correctness|know it worked)\b/i, 'verification success criteria'],
  [/\b(restart|resume|crash(?:es|ed)?)\b/i, 'recovery durable state'],
];
export const sha = value => createHash('sha256').update(value).digest('hex');
const readJSON = path => JSON.parse(readFileSync(path, 'utf8'));
export function tokens(text) {
  return (text.toLowerCase().normalize('NFKC').match(/[a-z0-9]+/g) || [])
    .map(t => ({evaluate:'evaluation',evaluating:'evaluation',evaluations:'evaluation'}[t] || t))
    .filter(t => !STOP.has(t) && t.length > 1)
    .map(t => t.length > 4 && t.endsWith('ies') ? t.slice(0,-3)+'y' : t.length > 3 && t.endsWith('s') && !t.endsWith('ss') ? t.slice(0,-1) : t);
}
function safePath(root, path) {
  const p = resolve(root, path), rel = relative(root,p);
  if (rel.startsWith('..') || isAbsolute(rel)) throw new Error('Path escapes its data root: '+path);
  return p;
}
function sourcePath(path) {
  return path.startsWith('corpus/')
    ? safePath(CORPUS_ROOT, path.slice('corpus/'.length))
    : safePath(SKILL_ROOT, path);
}
function splitSections(text, title) {
  const lines=text.split('\n'); let start=0;
  if(lines[0]==='---') { const end=lines.indexOf('---',1); if(end<0) throw new Error('Unclosed YAML front matter'); start=end+1; }
  let heading=title, fence=null, buffer=[], first=start+1, skipLevel=null; const out=[];
  const flush=()=> { const body=buffer.join('\n').trimEnd(); if(body.trim() && !/^(references|sources|package context links)$/i.test(heading)) out.push({heading,text:body,lineStart:first,lineEnd:first+buffer.length-1}); buffer=[]; };
  for(let n=start;n<lines.length;n++) {
    const line=lines[n]; if(line.includes('<!-- generated-context-navigation -->')) break;
    const fm=line.match(/^\s*(`{3,}|~{3,})/);
    if(fm) { if(!fence) fence=fm[1][0]; else if(fence===fm[1][0]) fence=null; }
    const h=!fence && line.match(/^(#{1,6})\s+(.+)$/);
    if(h) {
      flush();heading=h[2];first=n+2;
      if(skipLevel!==null && h[1].length<=skipLevel)skipLevel=null;
      if(/^(?:[0-9]+[.)]\s*)?(references|sources|source catalog)(?:\s|$)/i.test(heading))skipLevel=h[1].length;
      continue;
    }
    if(skipLevel!==null)continue;
    if(buffer.length && buffer.join('\n').length+line.length>2100 && !fence) { flush();first=n+1; }
    buffer.push(line);
  }
  flush();
  // Bound unusually large code blocks or tables without executing or interpreting them.
  return out.flatMap(s=> {
    if(s.text.length<=3000) return [s];
    const chunks=[];let buf=[],length=0,line=s.lineStart;
    for(const l of s.text.split('\n')) {
      if(length+l.length>2500 && buf.length) { chunks.push({...s,text:buf.join('\n'),lineStart:line,lineEnd:line+buf.length-1});line+=buf.length;buf=[];length=0; }
      buf.push(l);length+=l.length+1;
    }
    if(buf.length) chunks.push({...s,text:buf.join('\n'),lineStart:line,lineEnd:line+buf.length-1});
    return chunks;
  });
}
export function buildIndex() {
  const catalog=readJSON(resolve(CORPUS_ROOT,'catalog.json'));
  const taxonomy=readJSON(resolve(CORPUS_ROOT,'metadata/taxonomy.json'));
  const documents=[], sections=[], sourceHashes={};
  for(const d of catalog.documents) {
    if(!['handbook','harness'].includes(d.collection) || /\/(AGENTS|INDEX|README)\.md$/.test(d.path)) continue;
    const path='corpus/'+d.path, bytes=readFileSync(sourcePath(path));
    if(sha(bytes)!==d.sha256) throw new Error('Corpus catalog hash mismatch: '+path+'. Update the corpus catalog before building.');
    const doc={id:d.id,path,title:d.title,tags:d.metadata.tags,domains:d.metadata.domains,sourceReviewDate:d.metadata.review.technical_last_reviewed,sourceStatus:d.metadata.status,scope:d.metadata.scope,related:[],collection:d.collection};
    doc.related=(d.context_links||[]).map(p=>catalog.documents.find(x=>x.path===p)?.id).filter(Boolean);
    sourceHashes[path]=sha(bytes);documents.push(doc);
    for(const section of splitSections(bytes.toString('utf8'),d.title)) {
      const fields=[tokens(d.title),tokens(d.metadata.tags.join(' ')),tokens(section.heading),tokens(section.text)];
      const counts={}; fields.forEach((ts,i)=>ts.forEach(t=> {counts[t]??=[0,0,0,0];counts[t][i]++;}));
      sections.push({id:d.id+':'+section.lineStart,documentId:d.id,...section,counts,length:fields[3].length});
    }
  }
  const df={};for(const s of sections)for(const t of Object.keys(s.counts)) df[t]=(df[t]||0)+1;
  for(const path of ['corpus/catalog.json','corpus/metadata/taxonomy.json','scripts/engine.mjs'])sourceHashes[path]=sha(readFileSync(sourcePath(path)));
  const payload={version:VERSION,sourceHashes,aliases:taxonomy.aliases,documents,sections,df,averageLength:sections.reduce((n,s)=>n+s.length,0)/sections.length};
  const index={...payload,fingerprint:sha(JSON.stringify(payload))};mkdirSync(dirname(INDEX),{recursive:true});writeFileSync(INDEX,JSON.stringify(index)+'\n');
  return {status:'built',documents:documents.length,sections:sections.length,indexFingerprint:index.fingerprint,inferenceCalls:0};
}
export function loadIndex() {
  let index;try{index=readJSON(INDEX);}catch(e){throw new Error('Cannot load compiled index. Run node scripts/cli.mjs build. '+e.message);}
  if(index.version!==VERSION)throw new Error('Unsupported index version. Rebuild the index.');
  return index;
}
export function checkIndex(index=loadIndex()) {
  const {fingerprint,...payload}=index;
  if(sha(JSON.stringify(payload))!==fingerprint)throw new Error('Compiled index integrity check failed. Rebuild the index.');
  const changed=Object.entries(index.sourceHashes).filter(([p,h])=> {try{return sha(readFileSync(sourcePath(p)))!==h;}catch{return true;}}).map(([p])=>p);
  if(changed.length)throw new Error('Stale index; changed sources: '+changed.join(', '));
  return {status:'valid',documents:index.documents.length,sections:index.sections.length,indexFingerprint:index.fingerprint,inferenceCalls:0};
}
function expand(query,index) {
  let expanded=query;
  for(const [pattern,addition] of EXPANSIONS)if(pattern.test(query)) expanded+=' '+addition;
  const normalized=' '+query.toLowerCase().replace(/[^a-z0-9]+/g,' ')+' ';
  for(const [alias,canonical] of Object.entries(index.aliases))if(normalized.includes(' '+alias.replaceAll('-',' ')+' '))expanded+=' '+canonical;
  return [...new Set(tokens(expanded))];
}
function outputBase(index) {
  return {status:'found',indexFingerprint:index.fingerprint,passages:[],relatedDocumentIds:[],notes:['Source guidance is a dated reference snapshot; metadata review did not revalidate technical claims.'],inferenceCalls:0};
}
function passage(s,index,reason) {
  const d=index.documents.find(d=>d.id===s.documentId);
  return {documentId:d.id,path:d.path,title:d.title,heading:s.heading,lineStart:s.lineStart,lineEnd:s.lineEnd,text:s.text,matchReason:reason,sourceReviewDate:d.sourceReviewDate,sourceStatus:d.sourceStatus,scope:d.scope,truncated:false};
}
export function limitOutput(result,maxBytes=12000) {
  if(!Number.isInteger(maxBytes)||maxBytes<2048||maxBytes>MAX_BYTES)throw new Error('maxBytes must be an integer between 2048 and 24000');
  const size=()=>Buffer.byteLength(JSON.stringify(result)+'\n');
  while(size()>maxBytes && result.passages.length>1)result.passages.pop();
  while(size()>maxBytes && result.passages.length) {
    const p=result.passages[0];
    if(p.text.length<120){result.passages=[];result.status='insufficient';result.reason='Evidence cannot fit the requested output budget.';break;}
    p.text=p.text.slice(0,Math.max(80,Math.floor(p.text.length*.75)));p.truncated=true;
    p.lineEnd=p.lineStart+p.text.split('\n').length-1;
  }
  while(size()>maxBytes && result.relatedDocumentIds.length)result.relatedDocumentIds.pop();
  if(size()>maxBytes)throw new Error('Response metadata exceeds output budget. Narrow the request.');
  return result;
}
export function queryKnowledge(query,index=loadIndex(),options={}) {
  if(typeof query!=='string'||!query.trim()||query.length>2000)throw new Error('query must be a nonempty string of at most 2000 characters');
  const result=outputBase(index), terms=expand(query,index);
  const exact=index.documents.find(d=>query.trim().toUpperCase()===d.id);
  if(exact)return getDocument(exact.id,index,options);
  const meaningful=terms.filter(t=>!GENERIC.has(t));
  if(!meaningful.length) {result.status='ambiguous';result.reason='The question names a broad subject without a specific learning goal.';result.clarificationOptions=['Agent loops and orchestration','Context, retrieval, and memory','Skills, tools, and MCP','Evaluation and security'];return limitOutput(result,options.maxBytes);}
  const recognized=meaningful.filter(t=>index.df[t]);
  if(!recognized.length){result.status='insufficient';result.reason='No substantive query terms matched the corpus.';return limitOutput(result,options.maxBytes);}
  const ranked=[];
  for(const s of index.sections) {
    let score=0;const matches=[];
    for(const term of recognized){const c=s.counts[term];if(!c)continue;matches.push(term);const idf=Math.log(1+(index.sections.length-index.df[term]+.5)/(index.df[term]+.5));const tf=c[3],norm=1.2*(.25+.75*s.length/index.averageLength);score+=idf*(c[0]*3+c[1]*2+c[2]*2.5+(tf?tf*2.2/(tf+norm):0));}
    if(score>0){
      const doc=index.documents.find(d=>d.id===s.documentId);
      if(recognized.length<=2 && /fundamentals|concepts/i.test(doc.title))score*=1.8;
      score*=.4+.6*matches.length/recognized.length;ranked.push({s,score,matches});}
  }
  ranked.sort((a,b)=>b.score-a.score||a.s.id.localeCompare(b.s.id,'en'));
  const best=ranked[0];
  if(!best || best.matches.length/meaningful.length<.25){result.status='insufficient';result.reason='Too little of the requested subject is covered by matching passages.';return limitOutput(result,options.maxBytes);}
  const counts={};const chosen=[];
  // First pass favors distinct sources; second may add another section of a selected document.
  for(const maxPerDoc of [1,2])for(const r of ranked){if(chosen.length>=4)break;if(r.score<best.score*.32||chosen.includes(r)||(counts[r.s.documentId]||0)>=maxPerDoc)continue;chosen.push(r);counts[r.s.documentId]=(counts[r.s.documentId]||0)+1;}
  result.passages=chosen.map(r=>passage(r.s,index,'Lexical match: '+r.matches.join(', ')));
  const chosenIds=new Set(result.passages.map(p=>p.documentId));
  result.relatedDocumentIds=[...new Set([...chosenIds].flatMap(id=>index.documents.find(d=>d.id===id).related))].filter(id=>!chosenIds.has(id)&&index.documents.some(d=>d.id===id)).slice(0,6);
  result.coverage={matchedTerms:recognized,unmatchedTerms:meaningful.filter(t=>!index.df[t]),interpretation:'Lexical coverage only; not a calibrated confidence score.'};
  return limitOutput(result,options.maxBytes);
}
export function getDocument(id,index=loadIndex(),options={}) {
  if(typeof id!=='string')throw new Error('id must be a string');
  const d=index.documents.find(d=>d.id===id.toUpperCase());if(!d)throw new Error('Unknown indexed document ID: '+id);
  const result=outputBase(index);const offset=options.offset??0;
  if(!Number.isInteger(offset)||offset<0)throw new Error('offset must be a nonnegative section offset');
  const sections=index.sections.filter(s=>s.documentId===d.id);
  if(offset>=sections.length)throw new Error('offset is outside the document section range');
  result.passages=sections.slice(offset,offset+4).map(s=>passage(s,index,'Exact document ID'));
  result.relatedDocumentIds=d.related.filter(id=>index.documents.some(d=>d.id===id)).slice(0,6);
  result.document={id:d.id,totalSections:sections.length,offset,nextOffset:offset+result.passages.length<sections.length?offset+result.passages.length:null};
  limitOutput(result,options.maxBytes);
  result.document.nextOffset=offset+result.passages.length<sections.length?offset+result.passages.length:null;
  return result;
}
export function relatedDocuments(id,index=loadIndex(),options={}) {
  const d=index.documents.find(d=>d.id===String(id).toUpperCase());if(!d)throw new Error('Unknown indexed document ID: '+id);
  const result=outputBase(index);result.relatedDocumentIds=d.related.filter(id=>index.documents.some(d=>d.id===id)).slice(0,12);
  result.notes.push('Explicit source and curated context links; no graph expansion or inference performed.');
  return limitOutput(result,options.maxBytes);
}
