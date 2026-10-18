---
schema_version: '1.0'
id: AEP-SKILL-005
title: Skills, Tools, and MCP
summary: 'Skills, Tools, and MCP. Focus: mcp, skills, tool design.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- skill-engineering
tags:
- mcp
- skills
- tool-design
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/skills/AEP-SKILL-005-skills-tools-and-mcp.md
  original_sha256: 6a52f62b6fe3d87526d93fcf54e3686fe9bd5b05f04fefa4170795aa5a714aad
  original_metadata_record: handbook/skills/AEP-SKILL-005-skills-tools-and-mcp.md
  authority: inherited-source-context
---

# Skills, Tools, and MCP

## Boundary

Skills and MCP/tools are complementary.

```text
Skill:
  how to accomplish a recurring goal

Tool / MCP server:
  live data, controlled actions, authorization boundary
```

OpenAI's current plugin architecture explicitly separates these roles: MCP servers provide live information, authentication, authorization, and controlled actions, while skills provide repeatable workflow guidance.

## Example

A pull-request review skill might define:

```text
1. establish repository conventions
2. inspect changed files
3. inspect relevant tests
4. identify risk categories
5. run deterministic checks
6. produce findings in required format
```

Its tools might provide:

```text
repository.diff()
repository.read()
ci.status()
tests.run()
github.comment()
```

The skill does not own GitHub credentials or decide that it is authorized to publish a comment.

## Avoid tool choreography bloat

Do not encode brittle sequences like:

```text
always call tool A
then B
then C
```

unless ordering is actually required.

Prefer goals, constraints, decision points, and required postconditions.

## MCP portability

A skill should depend on capability semantics when possible rather than a specific MCP server implementation.

For example:

```text
requires capability:
  repository.read
```

is conceptually more portable than:

```text
requires:
  vendor_xyz_repo_server.read_file_v3
```

Adapters may map the portable capability to concrete provider tools.

## Security

A skill can request a tool action but may not elevate permissions. Tool authorization and approval remain external controls.

## Sources

- OpenAI, *Skills – Plugins*: https://developers.openai.com/plugins/concepts/skills
- OpenAI, *Build skills*: https://developers.openai.com/plugins/build/skills

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-skills.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-CODEX-PLUGIN-03-MCP-AND-HOOKS — MCP tooling and lifecycle hooks](../../harness/codex-plugin/03-mcp-and-hooks.md)
- [HARNESS-ARCHITECTURE-01-INTEGRATION-BOUNDARIES — Integration boundaries and capability comparison](../../harness/architecture/01-integration-boundaries.md)
