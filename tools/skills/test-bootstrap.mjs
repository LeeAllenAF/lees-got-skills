import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const base=fs.mkdtempSync(path.join(os.tmpdir(),'agent-bootstrap-test-'));
const root=process.cwd();
const runNode=(args,cwd=root)=>spawnSync(process.execPath,args,{cwd,encoding:'utf8'});
const success=r=>assert.equal(r.status,0,r.stderr+'\n'+r.stdout);
try {
 success(runNode(['tools/skills/package-skill.mjs']));
 const bundle=path.join(root,'dist/skills/repository-bootstrap/repository-bootstrap');
 const installer=path.join(bundle,'scripts/install.mjs');
 const run=(extra=[])=>runNode([installer,'--target',base,...extra]);
 fs.writeFileSync(path.join(base,'package.json'),'{"scripts":{"keep":"echo keep"}}\n');
 fs.writeFileSync(path.join(base,'unrelated.txt'),'keep me\n');
 let r=run();success(r);assert.ok(JSON.parse(r.stdout).changes.length>0);
 assert.ok(!fs.existsSync(path.join(base,'.agent')),'Dry run must not write');
 success(run(['--apply']));
 assert.equal(fs.readFileSync(path.join(base,'unrelated.txt'),'utf8'),'keep me\n');
 assert.equal(JSON.parse(fs.readFileSync(path.join(base,'package.json'))).scripts.keep,'echo keep');
 const check=()=>runNode(['tools/agent/validate-scaffolding.mjs','--all'],base);
 success(check());
 const lock=fs.readFileSync(path.join(base,'.agent/scaffold.lock.json'),'utf8');
 for (const flags of [[],['--apply']]) {r=run(flags);success(r);assert.deepEqual(JSON.parse(r.stdout).changes,[]);}
 assert.equal(fs.readFileSync(path.join(base,'.agent/scaffold.lock.json'),'utf8'),lock);
 const agent=path.join(base,'AGENTS.md'),original=fs.readFileSync(agent,'utf8');
 fs.appendFileSync(agent,'LOCAL CHANGE\n');
 r=run(['--apply']);assert.equal(r.status,3);assert.match(r.stdout,/Unowned or locally modified/);
 assert.equal(fs.readFileSync(agent,'utf8'),original+'LOCAL CHANGE\n');
 assert.notEqual(check().status,0,'Stale adapters must fail validation');
 fs.writeFileSync(agent,original);
 // Same ownership protocol upgrades a previously managed, unchanged file.
 fs.writeFileSync(agent,'old managed adapter\n');
 const prior=JSON.parse(lock);
 const {createHash}=await import('node:crypto');
 prior.files['AGENTS.md']=createHash('sha256').update('old managed adapter\n').digest('hex');
 fs.writeFileSync(path.join(base,'.agent/scaffold.lock.json'),JSON.stringify(prior));
 r=run();success(r);assert.ok(JSON.parse(r.stdout).changes.some(x=>x.path==='AGENTS.md'&&x.action==='upgrade'));
 success(run(['--apply']));assert.equal(fs.readFileSync(agent,'utf8'),original);
 // Schema, duplicate IDs, relationships, and registries are mandatory gates.
 const cases=[
  ['.agent/instructions/safety.md',s=>s.replace('status: active','status: invalid')],
  ['.agent/instructions/safety.md',s=>s.replace('instruction.safety','instruction.validation')],
  ['.agent/instructions/safety.md',s=>s.replace('status: active','requires: ["missing.id"]\nstatus: active')],
  ['.agent/registry/tags.json',()=>'{"tags":["NOT-NORMALIZED"]}'],
  ['.agent/registry/tools.json',s=>s.replace('"readOnly": true','"readOnly": "yes"')]
 ];
 for(const [rel,mutate] of cases){const f=path.join(base,rel),before=fs.readFileSync(f,'utf8');try{fs.writeFileSync(f,mutate(before));assert.notEqual(check().status,0,'Corrupt metadata must fail: '+rel);}finally{fs.writeFileSync(f,before);}}
 success(check());
 // Bundle hashes must be verified before any destination is changed.
 const payload=path.join(bundle,'assets/scaffold/AGENTS.md'),bytes=fs.readFileSync(payload);
 try{fs.appendFileSync(payload,'TAMPER\n');r=run(['--apply']);assert.notEqual(r.status,0);assert.match(r.stderr,/Bundle integrity mismatch/);}finally{fs.writeFileSync(payload,bytes);}
 if(process.platform!=='win32'){
  fs.rmSync(agent);fs.symlinkSync(path.join(base,'unrelated.txt'),agent);
  r=run(['--apply']);assert.notEqual(r.status,0);assert.match(r.stderr,/symbolic link/);
  assert.equal(fs.readFileSync(path.join(base,'unrelated.txt'),'utf8'),'keep me\n');
 }
 console.log('Fixture preflight/apply, integrity, preservation, idempotency, upgrade, conflict, manifest, and symlink checks passed');
} finally {fs.rmSync(base,{recursive:true,force:true});}
