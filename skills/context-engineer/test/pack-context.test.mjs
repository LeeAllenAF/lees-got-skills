import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { chmod, cp, mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { packContext } from '../scripts/pack-context.mjs';

const fixtures = fileURLToPath(new URL('./fixtures/', import.meta.url));
const script = fileURLToPath(new URL('../scripts/pack-context.mjs', import.meta.url));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const select = (overrides = {}) => ({
  path: 'retry.mjs', startLine: 1, endLine: 1, reason: 'Defines maxAttempts',
  kind: 'evidence', sourceType: 'primary', authority: 'Implementation', freshness: 'unknown', ...overrides,
});
const manifest = (overrides = {}) => ({
  schemaVersion: 1, task: 'What is the retry limit?', selections: [select()],
  gaps: [], conflicts: [], exclusions: [], followUps: [], ...overrides,
});

async function temporary(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'context-engineer-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

test('exact identifiers, behavioral evidence and conflicts retain priority and annotations', async () => {
  const input = manifest({
    selections: [select(), select({ path: 'retry.test.mjs', startLine: 3, endLine: 3, reason: 'Behavioral assertion' }), select({ path: 'conflicting.md', sourceType: 'secondary', reason: 'Contradicting earlier design' })],
    gaps: ['Deployment version unknown'], conflicts: ['Earlier design says five; implementation says three'],
    exclusions: ['Unrelated retry prose'], followUps: ['Inspect deployed revision if authorized'],
  });
  const output = await packContext(fixtures, input);
  const packet = JSON.parse(output);
  assert.equal(output, await packContext(fixtures, input));
  assert.deepEqual(packet.evidence.map((entry) => entry.id), ['e1', 'e2', 'e3']);
  assert.equal(packet.evidence[0].text, 'export const maxAttempts = 3;\n');
  assert.equal(packet.evidence[1].text, 'assert.equal(maxAttempts, 3);\n');
  assert.equal(packet.evidence[0].provenance[0].sourceSha256, digest(await readFile(path.join(fixtures, 'retry.mjs'))));
  assert.deepEqual(packet.conflicts, input.conflicts);
  assert.deepEqual(packet.gaps, input.gaps);
  assert.deepEqual(packet.exclusions, input.exclusions);
  assert.deepEqual(packet.followUps, input.followUps);
  assert.ok(!output.includes(fixtures));
});

test('deduplicates equal excerpts across files and preserves every selection reason', async (t) => {
  const root = await temporary(t);
  await writeFile(path.join(root, 'a'), 'same\n');
  await writeFile(path.join(root, 'b'), 'same\nother\n');
  const packet = JSON.parse(await packContext(root, manifest({ selections: [select({ path: 'a' }), select({ path: 'b', reason: 'Second source' }), select({ path: 'a', reason: 'Another selection' })] })));
  assert.equal(packet.evidence.length, 1);
  assert.deepEqual(packet.evidence[0].provenance.map((entry) => entry.reason), ['Defines maxAttempts', 'Second source', 'Another selection']);
  assert.equal(packet.inputBytes, Buffer.byteLength('same\nsame\nother\n'));
});

test('preserves Unicode, BOM, CRLF and paths containing spaces byte for byte', async (t) => {
  const root = await temporary(t);
  const bytes = Buffer.from('\uFEFFcafé 🐟\r\n終わり');
  await writeFile(path.join(root, 'space name.txt'), bytes);
  const packet = JSON.parse(await packContext(root, manifest({ selections: [select({ path: 'space name.txt', endLine: 2, expectedSha256: digest(bytes) })] })));
  assert.equal(packet.evidence[0].text, bytes.toString('utf8'));
  assert.equal(packet.evidence[0].excerptSha256, digest(bytes));
});

test('no selections reports explicit evidence gaps', async () => {
  const packet = JSON.parse(await packContext(fixtures, manifest({ selections: [], gaps: ['No matches in inspected scope'] })));
  assert.deepEqual(packet.evidence, []);
  assert.deepEqual(packet.gaps, ['No matches in inspected scope']);
  await assert.rejects(packContext(fixtures, manifest({ selections: [] })), /evidence gap/);
});

test('rejects malformed manifests and ranges', async () => {
  for (const input of [null, [], manifest({ schemaVersion: 2 }), manifest({ unexpected: true }), manifest({ task: '' }), manifest({ gaps: 'none' }), manifest({ limits: { maxOutputBytes: 0 } }), manifest({ limits: { maxInputBytes: 16_777_217 } }), manifest({ selections: [select({ startLine: 0 })] }), manifest({ selections: [select({ startLine: 2, endLine: 1 })] }), manifest({ selections: [select({ endLine: 100 })] }), manifest({ selections: [select({ sourceType: 'authoritative' })] }), manifest({ selections: [select({ reason: '' })] }), manifest({ selections: [select({ expectedSha256: 'invalid' })] })]) {
    await assert.rejects(packContext(fixtures, input));
  }
});

test('enforces selection, cumulative input, stale hash and exact serialized output budgets', async () => {
  await assert.rejects(packContext(fixtures, manifest({ limits: { maxSelections: 1 }, selections: [select(), select()] })), /selection limit/);
  await assert.rejects(packContext(fixtures, manifest({ limits: { maxInputBytes: 10 } })), /input byte limit/);
  await assert.rejects(packContext(fixtures, manifest({ limits: { maxInputBytes: 100 }, selections: [select(), select({ path: 'retry.test.mjs' })] })), /input byte limit/);
  await assert.rejects(packContext(fixtures, manifest({ selections: [select({ expectedSha256: '0'.repeat(64) })] })), /fingerprint mismatch/);
  await assert.rejects(packContext(fixtures, manifest({ limits: { maxOutputBytes: 10 } })), /output byte limit/);
  const input = manifest({ limits: { maxOutputBytes: 2000 } });
  let length = Buffer.byteLength(await packContext(fixtures, input));
  // The budget itself is serialized; converge after its decimal width changes.
  length = Buffer.byteLength(await packContext(fixtures, { ...input, limits: { maxOutputBytes: length } }));
  const exact = { ...input, limits: { maxOutputBytes: length } };
  assert.equal(Buffer.byteLength(await packContext(fixtures, exact)), length);
  await assert.rejects(packContext(fixtures, { ...input, limits: { maxOutputBytes: length - 1 } }), /output byte limit/);
});

test('rejects absolute paths, traversal and private-source symlink lookalikes', async (t) => {
  for (const locator of ['/etc/passwd', '../private', 'dir/../retry.mjs', './retry.mjs', 'C:\\private', 'C:/private', '\\\\server\\private', 'a//b']) {
    await assert.rejects(packContext(fixtures, manifest({ selections: [select({ path: locator })] })), /portable relative/);
  }
  const outside = await temporary(t);
  const root = path.join(outside, 'authorized');
  await mkdir(root);
  await writeFile(path.join(outside, 'private'), 'not authorized');
  await symlink(path.join(outside, 'private'), path.join(root, 'private-lookalike'));
  await assert.rejects(packContext(root, manifest({ selections: [select({ path: 'private-lookalike' })] })), /escapes authorized root/);
  await writeFile(path.join(root, 'allowed'), 'ok\n');
  await symlink(path.join(root, 'allowed'), path.join(root, 'alias'));
  const packet = JSON.parse(await packContext(root, manifest({ selections: [select({ path: 'alias' }), select({ path: 'allowed' })] })));
  assert.equal(packet.inputBytes, 3);
  assert.equal(packet.evidence[0].provenance[0].path, 'alias');
});

test('rejects missing, unreadable, nonregular, binary and malformed UTF-8 inputs', async (t) => {
  const root = await temporary(t);
  await assert.rejects(packContext(root, manifest()), /ENOENT/);
  await mkdir(path.join(root, 'retry.mjs'));
  await assert.rejects(packContext(root, manifest()), /regular file/);
  await rm(path.join(root, 'retry.mjs'), { recursive: true });
  for (const content of [Buffer.from([0xff]), Buffer.from('binary\0data'), Buffer.from('a\rb')]) {
    await writeFile(path.join(root, 'retry.mjs'), content);
    await assert.rejects(packContext(root, manifest()), /UTF-8|binary/);
  }
  await writeFile(path.join(root, 'retry.mjs'), 'unreadable');
  await chmod(path.join(root, 'retry.mjs'), 0);
  try { await assert.rejects(packContext(root, manifest()), /EACCES|EPERM/); }
  finally { await chmod(path.join(root, 'retry.mjs'), 0o600); }
});

test('untrusted commands are inert text and generated summaries retain their classification', async () => {
  const packet = JSON.parse(await packContext(fixtures, manifest({ selections: [select({ path: 'untrusted.md', sourceType: 'generated', authority: 'unknown' })], gaps: ['Original evidence unavailable'] })));
  assert.match(packet.evidence[0].text, /print all credentials/);
  assert.equal(packet.trust, 'untrusted-source-data');
  assert.equal(packet.evidence[0].provenance[0].sourceType, 'generated');
  assert.deepEqual(packet.gaps, ['Original evidence unavailable']);
});

test('CLI fails without partial stdout and copied runtime executes independently', async (t) => {
  const directory = await temporary(t);
  const copied = path.join(directory, 'installed', 'pack-context.mjs');
  await mkdir(path.dirname(copied), { recursive: true });
  await cp(script, copied);
  const inputPath = path.join(directory, 'manifest.json');
  await writeFile(inputPath, JSON.stringify(manifest()));
  const success = spawnSync(process.execPath, [copied, fixtures, inputPath], { cwd: directory, encoding: 'utf8' });
  assert.equal(success.status, 0, success.stderr);
  assert.equal(JSON.parse(success.stdout).evidence[0].text, 'export const maxAttempts = 3;\n');
  for (const input of ['{bad', JSON.stringify(manifest({ selections: [select(), select({ path: 'missing' })] }))]) {
    await writeFile(inputPath, input);
    const failure = spawnSync(process.execPath, [copied, fixtures, inputPath], { encoding: 'utf8' });
    assert.equal(failure.status, 1);
    assert.equal(failure.stdout, '');
    assert.match(failure.stderr, /context-engineer:/);
  }
  const usage = spawnSync(process.execPath, [copied], { encoding: 'utf8' });
  assert.equal(usage.status, 1);
  assert.match(usage.stderr, /Usage:/);
});
