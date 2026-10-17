---
name: repository-bootstrap
description: Install and validate a portable vendor-neutral agent engineering foundation in a repository, preserving existing files.
---

# Repository bootstrap

Use when explicitly asked to bootstrap a repository. This skill carries its own deterministic installer and versioned file payload; no Codex, Nx, network, or source repository is required at installation time. Run `node scripts/install.mjs --target /path/to/repo` first (dry run); review collisions; repeat with `--apply` only when authorized. Check the installed scaffolding integrity and report results. Do not commit, push, or publish unless independently authorized.
