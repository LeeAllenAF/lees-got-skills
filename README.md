# lees-got-skills

Minimal integrated Nx monorepo for AlienFish. No applications or framework plugins are installed.

## GitHub Codespaces (including iPad)

[Create a Codespace](https://github.com/codespaces/new?repo=LeeAllenAF/lees-got-skills)
from `main`, then open it in the browser. The dev container uses the maintained
Microsoft Node.js image, installs Node.js **24.22.0** (the latest LTS at initialization),
enables Corepack **0.36.0**, activates **pnpm 12.14.0** from `package.json`,
and runs `pnpm install --frozen-lockfile` before setup completes.
Git, GitHub CLI, Bash, Nx Console, ESLint, Prettier, and GitHub Pull Requests
are available. No services, forwarded ports, or local Docker installation are required.
The ESLint and Prettier extensions are included for future projects; no lint or format targets exist yet.

## Local development

With nvm and Corepack available:

```bash
nvm install
nvm use
corepack enable
corepack install
pnpm install --frozen-lockfile
pnpm nx --version
pnpm nx show projects
```

The workspace pins Nx **23.3.0** and TypeScript **7.0.2**.
`tsconfig.base.json` provides strict shared compiler settings; future projects
should extend it. This empty foundation intentionally has no build or test targets.
An empty result from `pnpm nx show projects` is expected until projects are added.
Nx Cloud is disabled.

## Layout

- `apps/`: future deployable applications.
- `packages/`: future shared libraries and packages.
- `tools/`: future development tooling.

Use the workspace-local Nx CLI through `pnpm nx`. Keep tool versions pinned;
update `.nvmrc`, the Node engine constraint, and the dev container Node feature
together when upgrading Node. Regenerate and commit `pnpm-lock.yaml` when changing dependencies.
