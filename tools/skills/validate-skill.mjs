import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const requiredFiles = [
  'AGENTS.md',
  'README.md',
  'SKILL.md',
  'agents/openai.yaml',
  'package.json',
  'project.json',
];

const skillDirectoryArgument = process.argv[2];
if (!skillDirectoryArgument) {
  throw new Error('Usage: node tools/skills/validate-skill.mjs <skill-directory>');
}

const workspaceRoot = process.cwd();
const skillDirectory = path.resolve(workspaceRoot, skillDirectoryArgument);
const skillName = path.basename(skillDirectory);

async function assertFileExists(relativePath) {
  try {
    await access(path.join(skillDirectory, relativePath));
  } catch {
    throw new Error(`${skillName}: missing required file ${relativePath}`);
  }
}

await Promise.all(requiredFiles.map(assertFileExists));

const [skillMarkdown, agentsMarkdown, packageJsonText, projectJsonText] = await Promise.all([
  readFile(path.join(skillDirectory, 'SKILL.md'), 'utf8'),
  readFile(path.join(skillDirectory, 'AGENTS.md'), 'utf8'),
  readFile(path.join(skillDirectory, 'package.json'), 'utf8'),
  readFile(path.join(skillDirectory, 'project.json'), 'utf8'),
]);

const packageJson = JSON.parse(packageJsonText);
const projectJson = JSON.parse(projectJsonText);
const frontmatterName = skillMarkdown.match(/^---\s*[\s\S]*?^name:\s*([^\n]+)$/m)?.[1]?.trim();

if (frontmatterName !== skillName) {
  throw new Error(`${skillName}: SKILL.md frontmatter name must be "${skillName}"`);
}

if (!/^---\s*[\s\S]*?^description:\s*\S+/m.test(skillMarkdown)) {
  throw new Error(`${skillName}: SKILL.md frontmatter must include a description`);
}

if (!/^---\s*[\s\S]*?dependencies:\s*[\s\S]*?required:\s*\[\]/m.test(agentsMarkdown)) {
  throw new Error(`${skillName}: AGENTS.md must declare an empty required dependency list`);
}

if (packageJson.name !== skillName || projectJson.name !== skillName) {
  throw new Error(`${skillName}: directory, package, and Nx project names must match`);
}

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(packageJson.version ?? '')) {
  throw new Error(`${skillName}: package.json version must be valid semantic version text`);
}

if (!projectJson.tags?.includes('type:skill')) {
  throw new Error(`${skillName}: project.json must include the "type:skill" tag`);
}

console.log(`${skillName}: metadata and required files are valid`);
