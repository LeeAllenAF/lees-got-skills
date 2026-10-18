#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { buildIndex, checkIndex, queryKnowledge, getDocument, relatedDocuments } from './engine.mjs';

try {
  const args=process.argv.slice(2);let request;
  if(args[0]==='--stdin') {
    const input=readFileSync(0,'utf8');if(Buffer.byteLength(input)>8192)throw new Error('stdin request exceeds 8192 bytes');
    request=JSON.parse(input);
  } else {
    const [command,value,...flags]=args;request={command};
    if(command==='query')request.query=value;
    else if(['get','related'].includes(command))request.id=value;
    else if(value!==undefined)throw new Error('Unexpected positional argument');
    for(let i=0;i<flags.length;i+=2){const name={'--max-bytes':'maxBytes','--offset':'offset'}[flags[i]];if(!name||flags[i+1]===undefined)throw new Error('Unknown or incomplete option: '+flags[i]);request[name]=Number(flags[i+1]);}
  }
  if(!request||typeof request!=='object'||Array.isArray(request))throw new Error('Request must be a JSON object');
  const allowed={build:['command'],check:['command'],query:['command','query','maxBytes'],get:['command','id','maxBytes','offset'],related:['command','id','maxBytes']}[request.command];
  if(!allowed)throw new Error('Usage: node scripts/cli.mjs query "QUESTION" | get ID | related ID | build | check | --stdin');
  for(const k of Object.keys(request))if(!allowed.includes(k))throw new Error('Unexpected request field: '+k);
  let result;
  if(request.command==='build')result=buildIndex();
  else if(request.command==='check')result=checkIndex();
  else if(request.command==='query')result=queryKnowledge(request.query,undefined,request);
  else if(request.command==='get')result=getDocument(request.id,undefined,request);
  else result=relatedDocuments(request.id,undefined,request);
  process.stdout.write(JSON.stringify(result)+'\n');
} catch(e) {
  process.stderr.write(JSON.stringify({status:'error',message:e.message})+'\n');process.exitCode=1;
}
