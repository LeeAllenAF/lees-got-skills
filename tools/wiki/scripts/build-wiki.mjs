#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const corpusRoot = path.join(repositoryRoot, 'corpus');
const outputRoot = path.join(repositoryRoot, 'apps/website/public/wiki-data');
const command = process.argv[2];

if (!['build', 'check'].includes(command)) {
  throw new Error('Usage: node tools/wiki/scripts/build-wiki.mjs <build|check>');
}

const catalog = JSON.parse(await readFile(path.join(corpusRoot, 'catalog.json'), 'utf8'));
const sourceDocuments = catalog.documents.filter((document) =>
  ['handbook', 'harness'].includes(document.collection)
  && !/(^|\/)(AGENTS|INDEX|README)\.md$/.test(document.path),
);
const pathToId = new Map(sourceDocuments.map((document) => [document.path, document.id]));
const knownIds = new Set(sourceDocuments.map((document) => document.id));

function stripRepositoryMaterial(markdown) {
  const withoutFrontmatter = markdown.startsWith('---\n')
    ? markdown.slice(markdown.indexOf('\n---\n', 4) + 5)
    : markdown;

  return withoutFrontmatter
    .split('<!-- generated-context-navigation -->', 1)[0]
    .trim();
}

function rewriteInternalLinks(markdown, sourcePath) {
  return markdown.replace(/\[([^\]]+)]\(([^)]+)\)/g, (match, label, target) => {
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) return match;

    const [targetPath, fragment] = target.split('#', 2);
    if (!targetPath.endsWith('.md')) return match;

    const resolvedPath = path.posix.normalize(
      path.posix.join(path.posix.dirname(sourcePath), targetPath),
    );
    const targetId = pathToId.get(resolvedPath);
    if (!targetId) {
      return path.posix.basename(targetPath) === 'INDEX.md' ? `[${label}](/wiki)` : match;
    }

    const suffix = fragment ? `#${fragment}` : '';
    return `[${label}](/wiki/${targetId.toLowerCase()}${suffix})`;
  });
}

function relatedDocumentIds(document) {
  const declared = document.metadata.related ?? [];
  const linked = (document.context_links ?? [])
    .map((target) => path.posix.normalize(path.posix.join(path.posix.dirname(document.path), target)))
    .map((target) => pathToId.get(target))
    .filter(Boolean);

  return [...new Set([...declared, ...linked])].filter((id) => knownIds.has(id));
}

function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

const documents = [];
for (const sourceDocument of sourceDocuments) {
  const source = await readFile(path.join(corpusRoot, sourceDocument.path), 'utf8');
  const body = rewriteInternalLinks(stripRepositoryMaterial(source), sourceDocument.path);
  documents.push({
    id: sourceDocument.id,
    title: sourceDocument.title,
    summary: sourceDocument.metadata.summary,
    collection: sourceDocument.collection,
    topic: sourceDocument.topic,
    type: sourceDocument.metadata.type,
    status: sourceDocument.metadata.status,
    tags: sourceDocument.metadata.tags,
    domains: sourceDocument.metadata.domains,
    scope: sourceDocument.metadata.scope,
    sourceReviewDate: sourceDocument.metadata.review.technical_last_reviewed,
    sourcePath: `corpus/${sourceDocument.path}`,
    relatedDocumentIds: relatedDocumentIds(sourceDocument),
    body,
  });
}

documents.sort((left, right) => left.id.localeCompare(right.id, 'en'));
const indexDocuments = documents.map(({ body: _body, ...document }) => document);
const topics = [...new Set(indexDocuments.map((document) => document.topic))]
  .sort((left, right) => left.localeCompare(right, 'en'))
  .map((topic) => ({
    topic,
    count: indexDocuments.filter((document) => document.topic === topic).length,
  }));
const contentFingerprint = createHash('sha256')
  .update(documents.map((document) => `${document.id}\0${document.body}`).join('\0'))
  .digest('hex');

const generatedFiles = new Map([
  ['index.json', serialize({
    schemaVersion: 1,
    generatedFrom: 'corpus/catalog.json',
    contentFingerprint,
    documentCount: indexDocuments.length,
    topics,
    documents: indexDocuments,
  })],
  ...documents.map((document) => [`${document.id.toLowerCase()}.json`, serialize(document)]),
]);

if (command === 'build') {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  await Promise.all([...generatedFiles].map(([fileName, contents]) =>
    writeFile(path.join(outputRoot, fileName), contents),
  ));
  console.log(`Generated ${documents.length} wiki documents in ${path.relative(repositoryRoot, outputRoot)}`);
} else {
  const actualFiles = (await readdir(outputRoot)).sort();
  const expectedFiles = [...generatedFiles.keys()].sort();
  if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) {
    throw new Error('Generated wiki file set is stale. Run the build command.');
  }

  for (const [fileName, expected] of generatedFiles) {
    const actual = await readFile(path.join(outputRoot, fileName), 'utf8');
    if (actual !== expected) {
      throw new Error(`Generated wiki data is stale: ${fileName}`);
    }
  }

  console.log(`Wiki data matches ${documents.length} corpus documents (${contentFingerprint})`);
}
