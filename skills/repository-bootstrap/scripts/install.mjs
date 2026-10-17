#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');const here=path.dirname(fileURLToPath(import.meta.url));
const src=path.resolve(here,'../assets/scaffold');
const bundleRoot=path.resolve(here,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(bundleRoot,'manifest.json'),'utf8'));
if(manifest.id!=='repository-bootstrap'||!/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(manifest.version)||!manifest.files||typeof manifest.files!=='object')throw Error('Invalid bundle manifest');
function safeRelative(rel){return typeof rel==='string'&&rel.length>0&&!rel.includes('\\')&&!path.isAbsolute(rel)&&rel.split('/').every(p=>p&&p!=='.'&&p!=='..');}
function noSymlinks(base,rel){if(!safeRelative(rel))throw Error('Unsafe managed path '+rel);let current=base;for(const part of rel.split('/')){current=path.join(current,part);if(fs.existsSync(current)||fs.lstatSync(current,{throwIfNoEntry:false})){if(fs.lstatSync(current).isSymbolicLink())throw Error('Refusing symbolic link '+rel);}}}
for(const [rel,expected] of Object.entries(manifest.files)){
 noSymlinks(bundleRoot,rel);
 if(!/^[a-f0-9]{64}$/.test(expected)||!fs.existsSync(path.join(bundleRoot,rel))||hash(fs.readFileSync(path.join(bundleRoot,rel)))!==expected)throw Error('Bundle integrity mismatch '+rel);
}
function verifyPayload(dir,prefix='assets/scaffold'){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const rel=prefix+'/'+entry.name;
  noSymlinks(bundleRoot,rel);
  if(entry.isDirectory())verifyPayload(path.join(dir,entry.name),rel);
  else if(!manifest.files[rel])throw Error('Unlisted payload file '+rel);
 }
}
verifyPayload(src);

const args=process.argv.slice(2),target=args.includes('--target')?args[args.indexOf('--target')+1]:null,apply=args.includes('--apply');if(!target||!fs.existsSync(target))throw Error('Existing --target required');const root=path.resolve(target);
noSymlinks(root,'.agent/scaffold.lock.json');noSymlinks(root,'package.json');
const lockPath=path.join(root,'.agent/scaffold.lock.json');let prior={files:{}};if(fs.existsSync(lockPath))prior=JSON.parse(fs.readFileSync(lockPath,'utf8'));
function walk(dir,prefix=''){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const rel=prefix?prefix+'/'+e.name:e.name;return e.isDirectory()?walk(path.join(dir,e.name),rel):[rel]})}
const files=walk(src).filter(x=>!x.endsWith('/.gitkeep'));const changes=[],conflicts=[];const desired={};
for(const rel of files){noSymlinks(root,rel);const bytes=fs.readFileSync(path.join(src,rel));desired[rel]=hash(bytes);const dest=path.join(root,rel);if(!fs.existsSync(dest)){changes.push({path:rel,action:'create'});continue}const current=hash(fs.readFileSync(dest));if(current===desired[rel])continue;if(!prior.files?.[rel]||prior.files[rel]!==current)conflicts.push({path:rel,reason:'Unowned or locally modified'});else changes.push({path:rel,action:'upgrade'});}
const pkgFile=path.join(root,'package.json');if(!fs.existsSync(pkgFile))throw Error('Target requires package.json');let pkg=JSON.parse(fs.readFileSync(pkgFile,'utf8'));const scripts={'agent:index':'node tools/agent/build-index.mjs','agent:context':'node tools/agent/resolve-context.mjs','agent:check':'node tools/agent/validate-scaffolding.mjs','agent:adapters':'node tools/agent/generate-adapters.mjs'};pkg.scripts??={};for(const [k,v] of Object.entries(scripts)){if(pkg.scripts[k]&&pkg.scripts[k]!==v)conflicts.push({path:'package.json',reason:'Existing script '+k});else pkg.scripts[k]=v;}
const pkgBefore=JSON.parse(fs.readFileSync(pkgFile,'utf8'));if(JSON.stringify(pkgBefore)!==JSON.stringify(pkg))changes.push({path:'package.json',action:'merge scripts'});
// Existing lock file and generated adapter checks are managed through the same ownership protocol.
console.log(JSON.stringify({stage:2,mode:apply?'apply':'dry-run',changes,conflicts},null,2));if(conflicts.length)process.exit(3);
if(!apply)process.exit(0);
for(const rel of files){const dest=path.join(root,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});if(!fs.existsSync(dest)||hash(fs.readFileSync(dest))!==desired[rel])fs.copyFileSync(path.join(src,rel),dest)}
if(JSON.stringify(pkgBefore)!==JSON.stringify(pkg))fs.writeFileSync(pkgFile,JSON.stringify(pkg,null,2)+'\n');
const updated={version:manifest.version,files:desired,packageScripts:scripts};fs.mkdirSync(path.dirname(lockPath),{recursive:true});fs.writeFileSync(lockPath,JSON.stringify(updated,null,2)+'\n');
