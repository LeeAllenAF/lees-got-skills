---
schema_version: '1.0'
id: HARNESS-CODEX-PLUGIN-01-PLUGIN-FOUNDATIONS
title: Codex plugin development foundations
summary: 'Codex plugin development foundations. Focus: codex plugins, packaging.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- codex-plugins
- packaging
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-14'
  technical_review_interval: null
  owner: null
provenance:
  source_archive: agentic-harness-foundations.zip
  original_path: agentic-harness-foundations/codex-plugin/01-plugin-foundations.md
  original_sha256: 087ff6c8ff78028796bb84a13c17315b79064a8dde4b4fb2ef763d2d82fcbf24
  original_metadata_record: harness/codex-plugin/01-plugin-foundations.md
  authority: reference-only
---
# Codex plugin development foundations

[← Index](../INDEX.md) · [Skills](02-skills.md) · [MCP and hooks](03-mcp-and-hooks.md)

## Scope
**[DOCUMENTED]** A plugin is a distributable package combining skills and/or MCP server configuration; optional UI and Codex lifecycle hooks depend on the host surface. See [official plugin architecture](https://developers.openai.com/plugins/concepts/plugins) and [packaging](https://developers.openai.com/plugins/build/plugins).

## Portable layout (conceptual)
```text
my-plugin/
  plugin.json          # portable Agent Plugins manifest
  mcp.json             # optional, portable MCP server registry
  skills/
    research/SKILL.md
    verify/SKILL.md
  hooks/               # optional, host-specific and trusted locally
  assets/              # optional
```

**[DOCUMENTED]** Current portable packaging uses root `plugin.json`, `skills/` and root `mcp.json`; OpenAI-specific settings go under `extensions.com.openai`. Older `.codex-plugin/plugin.json` compatibility overlay remains supported; `.mcp.json` belongs to the older scaffold and has different schema rules. Do **not** blindly rename it.

Minimal portable manifest illustration (verify schema before publishing):
```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "architecture-research",
  "version": "0.1.0",
  "description": "Research and verification workflows"
}
```

## Plugin versus controller
A plugin distributes guidance and capabilities into a host environment. It does not inherently own the model inference lifecycle, schedule arbitrary new turns, or guarantee background autonomy. Use [the SDK](../codex-sdk/01-sdk-foundations.md) or [App Server](../app-server/01-app-server-foundations.md) for application-driven Codex work.

## Distribution caveats
**[DOCUMENTED]** Bundled hooks require local executable scripts and review/trust; hook-bearing plugins are not eligible for the public plugin directory (as documented on review date). Public, local, and team marketplace support may differ by surface and policy.

## Sources
- https://developers.openai.com/plugins/build/plugins
- https://developers.openai.com/plugins/concepts/plugins
- https://developers.openai.com/plugins/build/skills

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-codex-plugin.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-SKILL-001 — Skill Fundamentals](../../handbook/skills/AEP-SKILL-001-skill-fundamentals.md)
- [AEP-SKILL-006 — Skill Portability and Provider Adapters](../../handbook/skills/AEP-SKILL-006-portability-and-provider-adapters.md)
