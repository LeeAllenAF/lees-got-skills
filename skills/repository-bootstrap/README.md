# repository-bootstrap

Independently versioned portable Agent Skill, currently 1.0.0.

```bash
pnpm exec nx run repository-bootstrap:validate
pnpm exec nx run repository-bootstrap:build
pnpm exec nx run repository-bootstrap:test
```

Build output: `dist/skills/repository-bootstrap/repository-bootstrap-1.0.0.zip`.
The packager reads the version from this project's `package.json`; Nx release
uses independent project versions. Building never publishes or creates releases.

Extract the ZIP outside the destination repository, then run:

```bash
node repository-bootstrap/scripts/install.mjs --target /path/to/repo
node repository-bootstrap/scripts/install.mjs --target /path/to/repo --apply
```

The destination needs only Node.js 24+ and an existing `package.json` (which may
contain `{}`). No Nx, pnpm, Codex, network, or source checkout is needed to install
or validate the scaffold. Run `node tools/agent/validate-scaffolding.mjs --all`
from the destination afterward. The installer verifies its manifest, preserves
unrelated files, and refuses unowned collisions or locally modified managed files.
Upgrades replace only unchanged managed files; obsolete managed files are retained.
The committed `.agent/scaffold.lock.json` records installed file hashes.

Canonical sources are `.agent/`, `tools/agent/`, and the generated root adapters.
Do not edit `dist/` or the generated adapters directly. To update the adapters,
run `node tools/agent/generate-adapters.mjs`.

Ordinary context discovery and integrity checks use direct Node scripts and do
not require Nx. Local indexes under `.agent/.generated/` are Git-ignored.
