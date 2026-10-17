import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
export const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
export function docs(root){const out=[];for(const dir of ['.agent/instructions']){const full=path.join(root,dir);if(!fs.existsSync(full))continue;for(const file of fs.readdirSync(full).filter(x=>x.endsWith('.md'))){const rel=dir+'/'+file,text=fs.readFileSync(path.join(root,rel),'utf8');const m=text.match(/^---\n([\s\S]*?)\n---\n/);if(!m)throw Error('Missing frontmatter: '+rel);const meta={};for(const line of m[1].split('\n')){const z=line.match(/^([a-z_]+):\s*(.*)$/);if(!z)throw Error('Invalid frontmatter line '+rel+': '+line);let v=z[2];if(v.startsWith('[')||v.startsWith('{')||v.startsWith('"'))v=JSON.parse(v);meta[z[1]]=v;}out.push({rel,meta,body:text.slice(m[0].length)});}}return out;}

// Dependency-free validation of the schema vocabulary used by document.schema.json.
// Reject unsupported keywords rather than silently accepting an unenforced schema.
export function schemaErrors(schema, value, label = 'metadata') {
 const errors = [];
 const supported = new Set(['$schema', 'title', 'description', 'type', 'required', 'properties', 'items', 'enum', 'additionalProperties']);
 if (!schema || typeof schema !== 'object' || Array.isArray(schema)) return [label + ': invalid schema'];
 for (const key of Object.keys(schema)) if (!supported.has(key)) errors.push(label + ': unsupported schema keyword ' + key);
 const kind = Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value;
 if (schema.type && kind !== schema.type) return [...errors, label + ': expected ' + schema.type];
 if (schema.enum && !schema.enum.includes(value)) errors.push(label + ': invalid enum value');
 if (kind === 'object') {
  for (const key of schema.required || []) if (!(key in value)) errors.push(label + ': missing ' + key);
  for (const [key, item] of Object.entries(value)) {
   if (schema.properties?.[key]) errors.push(...schemaErrors(schema.properties[key], item, label + '.' + key));
   else if (schema.additionalProperties === false) errors.push(label + ': unknown property ' + key);
  }
 }
 if (kind === 'array' && schema.items) value.forEach((item, i) => errors.push(...schemaErrors(schema.items, item, label + '[' + i + ']')));
 return errors;
}
function uniqueStrings(items, pattern) {
 return Array.isArray(items) && items.every(x => typeof x === 'string' && pattern.test(x)) && new Set(items).size === items.length;
}
function metadataIntegrity(root, documents) {
 const errors = [];
 try {
  const schema = JSON.parse(fs.readFileSync(path.join(root, '.agent/schemas/document.schema.json'), 'utf8'));
  if (schema.type !== 'object' || !['id','title','type'].every(x => schema.required?.includes(x))) errors.push('Invalid document schema contract');
  for (const d of documents) {
   errors.push(...schemaErrors(schema, d.meta, d.rel));
   if (typeof d.meta.id !== 'string' || !/^[a-z][a-z0-9.-]*$/.test(d.meta.id)) errors.push('Invalid document ID ' + d.rel);
   if (typeof d.meta.title !== 'string' || !d.meta.title.trim()) errors.push('Empty document title ' + d.rel);
   if (d.meta.tags && !uniqueStrings(d.meta.tags, /^[a-z][a-z0-9-]*$/)) errors.push('Invalid or duplicate document tags ' + d.rel);
   for (const key of ['related','requires']) if (d.meta[key] && !uniqueStrings(d.meta[key], /^[a-z][a-z0-9.-]*$/)) errors.push('Invalid relationships ' + d.rel);
  }
  const tags = JSON.parse(fs.readFileSync(path.join(root,'.agent/registry/tags.json'),'utf8')).tags;
  if (!uniqueStrings(tags, /^[a-z][a-z0-9-]*$/)) errors.push('Tags registry must contain unique normalized tags');
  const tools = JSON.parse(fs.readFileSync(path.join(root,'.agent/registry/tools.json'),'utf8')).tools;
  if (!Array.isArray(tools)) throw Error('tools must be an array');
  for (const tool of tools) {
   if (!/^tool\.[a-z0-9.-]+$/.test(tool.id) || typeof tool.readOnly !== 'boolean' || tool.output !== 'json' || !/^node tools\/agent\/[a-z0-9-]+\.mjs$/.test(tool.command)) errors.push('Invalid tool registration ' + tool.id);
  }
  for (const slug of ['inspect-workspace','resolve-context','validate-change']) {
   const text = fs.readFileSync(path.join(root,'.agent/skills',slug,'SKILL.md'),'utf8');
   if (!text.startsWith('---\nname: '+slug+'\n') || !/^description: .+$/m.test(text) || !/\n---\n/.test(text)) errors.push('Invalid portable skill metadata ' + slug);
  }
 } catch (e) { errors.push('Metadata integrity: ' + e.message); }
 return errors;
}

export function validate(root){let errors=[];let ds=[];try{ds=docs(root)}catch(e){errors.push(e.message)};const ids=new Set();let tags=[];try{tags=JSON.parse(fs.readFileSync(path.join(root,'.agent/registry/tags.json'))).tags}catch(e){errors.push('Invalid tags registry: '+e.message)};for(const d of ds){if(!d.meta.id||!d.meta.title||!d.meta.type)errors.push('Required metadata missing '+d.rel);if(ids.has(d.meta.id))errors.push('Duplicate ID '+d.meta.id);ids.add(d.meta.id);for(const t of d.meta.tags||[])if(!tags.includes(t))errors.push('Unknown tag '+t+' in '+d.rel);}for(const d of ds)for(const ref of [...(d.meta.related||[]),...(d.meta.requires||[])])if(!ids.has(ref))errors.push('Broken reference '+ref+' in '+d.rel);let visiting=new Set(),seen=new Set();const map=new Map(ds.map(d=>[d.meta.id,d.meta.requires||[]]));const dfs=id=>{if(visiting.has(id)){errors.push('Requires cycle '+id);return}if(seen.has(id))return;visiting.add(id);for(const next of map.get(id)||[])if(map.has(next))dfs(next);visiting.delete(id);seen.add(id)};for(const id of map.keys())dfs(id);
for(const rel of ['AGENTS.md','CLAUDE.md']){const expected=adapter(root,rel),p=path.join(root,rel);if(!fs.existsSync(p)||fs.readFileSync(p,'utf8')!==expected)errors.push('Missing or stale generated adapter '+rel)}
try{const reg=JSON.parse(fs.readFileSync(path.join(root,'.agent/registry/tools.json')));let tid=new Set();for(const t of reg.tools){if(tid.has(t.id))errors.push('Duplicate tool '+t.id);tid.add(t.id);if(!t.command.startsWith('node tools/agent/'))errors.push('Unexpected tool command '+t.id);else if(!fs.existsSync(path.join(root,t.command.split(' ')[1])))errors.push('Missing executable '+t.id)}}catch(e){errors.push('Tool registry invalid '+e.message)}
for(const slug of ['inspect-workspace','resolve-context','validate-change'])if(!fs.existsSync(path.join(root,'.agent/skills',slug,'SKILL.md')))errors.push('Missing skill '+slug);
errors.push(...metadataIntegrity(root,ds));return {valid:errors.length===0,errors,documents:ds.length}}
export function adapter(root,name){const raw=fs.readFileSync(path.join(root,'.agent/instructions/bootstrap.md'),'utf8').replace(/^---\n[\s\S]*?\n---\n/,'').trim();return '<!-- GENERATED FROM .agent/instructions/bootstrap.md; DO NOT EDIT -->\n# '+(name==='AGENTS.md'?'Repository agent instructions':'Claude Code repository instructions')+'\n\n'+raw+'\n'}
