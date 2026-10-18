import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { SKILL_ROOT, loadIndex, queryKnowledge } from './engine.mjs';
const cases=JSON.parse(readFileSync(resolve(SKILL_ROOT,'references/evals/retrieval-cases.json'),'utf8'));
const index=loadIndex();
const results=cases.map(c=> {
  const begin=performance.now(),r=queryKnowledge(c.query,index);
  const ids=r.passages.map(p=>p.documentId);
  const hit=!c.anyOf||c.anyOf.some(id=>ids.includes(id));
  return {id:c.id,passed:r.status===c.status&&hit,status:r.status,expectedStatus:c.status,documentIds:ids,expectedAnyOf:c.anyOf||[],responseBytes:Buffer.byteLength(JSON.stringify(r)+'\n'),milliseconds:Number((performance.now()-begin).toFixed(2))};
});
const passed=results.filter(r=>r.passed).length;
console.log(JSON.stringify({kind:'retrieval-smoke-evaluation',cases:results.length,passed,failed:results.length-passed,inferenceCalls:0,limitations:'Small authored fixture set. Does not measure generated answer accuracy, teaching effectiveness, or general retrieval recall.',results},null,2));
if(passed!==results.length)process.exitCode=1;
