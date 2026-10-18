import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const packagedEntries = [
  'AGENTS.md',
  'README.md',
  'SKILL.md',
  'agents',
  'assets',
  'references',
  'scripts',
];

const skillDirectoryArgument = process.argv[2];
if (!skillDirectoryArgument) {
  throw new Error('Usage: node tools/skills/package-skill.mjs <skill-directory>');
}

const workspaceRoot = process.cwd();
const skillDirectory = path.resolve(workspaceRoot, skillDirectoryArgument);
const skillName = path.basename(skillDirectory);
const packageJson = JSON.parse(
  await readFile(path.join(skillDirectory, 'package.json'), 'utf8'),
);
const outputRoot = path.join(workspaceRoot, 'dist', 'skills', skillName);
const outputDirectory = path.join(outputRoot, skillName);
const archivePath = path.join(outputRoot, `${skillName}-${packageJson.version}.tar.gz`);

function resolveContained(root, entry, label) {
  const resolved = path.resolve(root, entry);
  const relative = path.relative(root, resolved);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`${skillName}: ${label} escapes its allowed root: ${entry}`);
  }

  return resolved;
}

await rm(outputRoot, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

for (const entry of packagedEntries) {
  const source = path.join(skillDirectory, entry);
  const destination = path.join(outputDirectory, entry);

  try {
    await cp(source, destination, { recursive: true });
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

for (const include of packageJson.skillPackage?.include ?? []) {
  if (typeof include?.source !== 'string' || typeof include?.destination !== 'string') {
    throw new Error(`${skillName}: skillPackage.include entries require source and destination strings`);
  }

  const source = resolveContained(workspaceRoot, include.source, 'package source');
  const destination = resolveContained(outputDirectory, include.destination, 'package destination');
  await cp(source, destination, { recursive: true });
}

const archiveResult = spawnSync(
  'tar',
  ['-czf', archivePath, '-C', outputRoot, skillName],
  { encoding: 'utf8' },
);

if (archiveResult.status !== 0) {
  throw new Error(archiveResult.stderr || `Unable to package ${skillName}`);
}

console.log(path.relative(workspaceRoot, archivePath));
