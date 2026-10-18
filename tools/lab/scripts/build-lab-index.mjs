#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const repositoryRoot = resolve(import.meta.dirname, '../../..');
const sourcePath = resolve(
  repositoryRoot,
  'skills/teach-agentic-development/references/search-index.json',
);
const outputPath = resolve(
  repositoryRoot,
  'apps/website/src/lab/generated/search-index.json',
);

function checkTeachingIndex() {
  const result = spawnSync(
    process.execPath,
    ['scripts/cli.mjs', 'check'],
    {
      cwd: resolve(repositoryRoot, 'skills/teach-agentic-development'),
      encoding: 'utf8',
    },
  );

  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout);
    throw new Error('The teaching index is stale or invalid. Rebuild it before the lab index.');
  }
}

function sourceIndex() {
  checkTeachingIndex();
  return JSON.parse(readFileSync(sourcePath, 'utf8'));
}

function compile() {
  const source = sourceIndex();
  const documentIndexes = new Map(source.documents.map((document, index) => [document.id, index]));
  const postings = {};
  const sections = source.sections.map(({ counts, ...section }, sectionIndex) => {
    for (const [term, frequencies] of Object.entries(counts)) {
      const documentFrequency = source.df[term];
      const inverseFrequency = Math.log(
        1 + (source.sections.length - documentFrequency + 0.5) / (documentFrequency + 0.5),
      );
      const bodyFrequency = frequencies[3] ?? 0;
      const normalization = 1.2 * (0.25 + 0.75 * section.length / source.averageLength);
      const score = inverseFrequency * (
        (frequencies[0] ?? 0) * 3
        + (frequencies[1] ?? 0) * 2
        + (frequencies[2] ?? 0) * 2.5
        + (bodyFrequency ? bodyFrequency * 2.2 / (bodyFrequency + normalization) : 0)
      );
      (postings[term] ??= []).push(sectionIndex, Math.round(score * 1_000));
    }
    const documentIndex = documentIndexes.get(section.documentId);
    if (documentIndex === undefined) throw new Error(`Unknown section document: ${section.documentId}`);
    return [
      section.id,
      documentIndex,
      section.heading,
      section.text,
      section.lineStart,
      section.lineEnd,
      section.length,
    ];
  });
  return Buffer.from(`${JSON.stringify({
    v: 2,
    f: source.fingerprint,
    a: source.aliases,
    d: source.documents.map((document) => [
      document.id,
      document.path,
      document.title,
      document.sourceReviewDate,
      document.sourceStatus,
      document.scope,
      document.related,
    ]),
    s: sections,
    p: postings,
  })}\n`);
}

function build() {
  const bytes = compile();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, bytes);
  return { status: 'built', bytes: bytes.byteLength, outputPath };
}

function check() {
  const expected = compile();
  if (!existsSync(outputPath)) throw new Error('The compiled lab index is missing. Run lab:build.');
  const actual = readFileSync(outputPath);
  if (!actual.equals(expected)) throw new Error('The compiled lab index is stale. Run lab:build.');
  return { status: 'valid', bytes: actual.byteLength, outputPath };
}

try {
  const command = process.argv[2];
  if (!['build', 'check'].includes(command)) {
    throw new Error('Usage: node tools/lab/scripts/build-lab-index.mjs build|check');
  }
  process.stdout.write(`${JSON.stringify(command === 'build' ? build() : check())}\n`);
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
