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

const archiveResult = spawnSync(
  'tar',
  ['-czf', archivePath, '-C', outputRoot, skillName],
  { encoding: 'utf8' },
);

if (archiveResult.status !== 0) {
  throw new Error(archiveResult.stderr || `Unable to package ${skillName}`);
}

console.log(path.relative(workspaceRoot, archivePath));
