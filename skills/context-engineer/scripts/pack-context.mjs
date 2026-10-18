import { constants } from 'node:fs';
import { open, realpath, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ceilings = { maxSelections: 256, maxInputBytes: 16_777_216, maxOutputBytes: 1_048_576 };
const defaults = { maxSelections: 32, maxInputBytes: 1_048_576, maxOutputBytes: 65_536 };
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const fail = (message) => { throw new Error(message); };

function object(value, label, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${label} must be an object`);
  for (const key of Object.keys(value)) if (!keys.includes(key)) fail(`${label}: unknown field ${key}`);
}

function text(value, label) {
  if (typeof value !== 'string' || !value.trim()) fail(`${label} must be a nonempty string`);
  return value;
}

function strings(value, label) {
  if (!Array.isArray(value)) fail(`${label} must be an array of strings`);
  return value.map((entry) => text(entry, label));
}

function integer(value, label, maximum = Number.MAX_SAFE_INTEGER) {
  if (!Number.isSafeInteger(value) || value < 1 || value > maximum) fail(`${label} must be an integer in 1..${maximum}`);
  return value;
}

function contained(root, source) {
  const relative = path.relative(root, source);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) fail('source escapes authorized root');
}

// Read at most the remaining budget plus one byte, including when a file grows.
async function readBounded(file, maximum) {
  const info = await stat(file);
  if (!info.isFile()) fail('source must be a regular file');
  if (info.size > maximum) fail('input byte limit exceeded');
  const handle = await open(file, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const opened = await handle.stat();
    if (!opened.isFile() || opened.size > maximum) fail('source is not a regular file within input byte limit');
    const chunks = [];
    let length = 0;
    while (length <= maximum) {
      const buffer = Buffer.alloc(Math.min(65_536, maximum + 1 - length));
      const { bytesRead } = await handle.read(buffer);
      if (!bytesRead) return Buffer.concat(chunks, length);
      chunks.push(buffer.subarray(0, bytesRead));
      length += bytesRead;
    }
    fail('input byte limit exceeded');
  } finally {
    await handle.close();
  }
}

export async function packContext(rootArgument, manifest) {
  object(manifest, 'manifest', ['schemaVersion', 'task', 'limits', 'selections', 'gaps', 'conflicts', 'exclusions', 'followUps']);
  if (manifest.schemaVersion !== 1) fail('schemaVersion must be 1');
  const task = text(manifest.task, 'task');
  object(manifest.limits ?? {}, 'limits', Object.keys(defaults));
  const limits = Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [
    key, integer(manifest.limits?.[key] ?? fallback, key, ceilings[key]),
  ]));
  if (!Array.isArray(manifest.selections)) fail('selections must be an array');
  if (manifest.selections.length > limits.maxSelections) fail('selection limit exceeded');
  const annotations = Object.fromEntries(['gaps', 'conflicts', 'exclusions', 'followUps'].map((key) => [key, strings(manifest[key], key)]));
  if (!manifest.selections.length && !annotations.gaps.length) fail('empty selections require an evidence gap');
  const root = await realpath(rootArgument);
  if (!(await stat(root)).isDirectory()) fail('authorized root must be a directory');
  const sources = new Map();
  const passages = new Map();
  let inputBytes = 0;
  for (const selection of manifest.selections) {
    object(selection, 'selection', ['path', 'startLine', 'endLine', 'reason', 'kind', 'sourceType', 'authority', 'freshness', 'expectedSha256']);
    const locator = text(selection.path, 'path');
    // Use one portable spelling; reject Windows absolute paths even on POSIX hosts.
    if (path.posix.isAbsolute(locator) || path.win32.isAbsolute(locator) || locator.includes('\\') || locator.split('/').some((part) => !part || part === '.' || part === '..') || locator.includes('\0')) fail('path must be a portable relative path without traversal');
    const startLine = integer(selection.startLine, 'startLine');
    const endLine = integer(selection.endLine, 'endLine');
    if (endLine < startLine) fail('endLine precedes startLine');
    const reason = text(selection.reason, 'reason');
    if (!['evidence', 'instruction'].includes(selection.kind)) fail('kind must be evidence or instruction');
    if (!['primary', 'secondary', 'generated'].includes(selection.sourceType)) fail('sourceType must be primary, secondary or generated');
    const authority = text(selection.authority, 'authority');
    const freshness = text(selection.freshness, 'freshness');
    if (selection.expectedSha256 !== undefined && !/^[a-f0-9]{64}$/.test(selection.expectedSha256)) fail('expectedSha256 must be a lowercase SHA-256 hex digest');
    const canonical = await realpath(path.resolve(root, locator));
    contained(root, canonical);
    if (!sources.has(canonical)) {
      const bytes = await readBounded(canonical, limits.maxInputBytes - inputBytes);
      inputBytes += bytes.length;
      let content;
      try { content = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes); }
      catch { fail('source must be valid UTF-8 text'); }
      if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]|\r(?!\n)/.test(content)) fail('binary/control-character input is unsupported');
      sources.set(canonical, { content, sha256: hash(bytes) });
    }
    const source = sources.get(canonical);
    if (selection.expectedSha256 !== undefined && selection.expectedSha256 !== source.sha256) fail('source fingerprint mismatch');
    // Retain original line terminators and do not invent a line after a final LF.
    const lines = source.content.match(/[^\n]*\n|[^\n]+$/g) ?? [];
    if (endLine > lines.length) fail('line range exceeds source');
    const excerpt = lines.slice(startLine - 1, endLine).join('');
    const provenance = { path: locator, startLine, endLine, reason, kind: selection.kind, sourceType: selection.sourceType, authority, freshness, sourceSha256: source.sha256 };
    // Exact excerpt equality deduplicates content without discarding source claims.
    if (passages.has(excerpt)) passages.get(excerpt).provenance.push(provenance);
    else passages.set(excerpt, { id: `e${passages.size + 1}`, text: excerpt, excerptSha256: hash(Buffer.from(excerpt)), provenance: [provenance] });
  }
  const packet = { schemaVersion: 1, task, trust: 'untrusted-source-data', limits, inputBytes, evidence: [...passages.values()], ...annotations };
  const output = `${JSON.stringify(packet, null, 2)}\n`;
  if (Buffer.byteLength(output) > limits.maxOutputBytes) fail('output byte limit exceeded; narrow selections or raise the explicit budget');
  return output;
}

async function main() {
  if (process.argv.length !== 4) fail('Usage: node pack-context.mjs <authorized-root> <manifest.json>');
  const manifestBytes = await readBounded(await realpath(process.argv[3]), 1_048_576);
  let manifest;
  try { manifest = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(manifestBytes)); }
  catch { fail('manifest must be valid UTF-8 JSON'); }
  process.stdout.write(await packContext(process.argv[2], manifest));
}

if (process.argv[1] && import.meta.url === pathToFileURL(await realpath(process.argv[1])).href) {
  main().catch((error) => {
    process.stderr.write(`context-engineer: ${error.code ?? error.message}\n`);
    process.exitCode = 1;
  });
}
