---
schema_version: '1.0'
id: HARNESS-CODEX-PLUGIN-03-MCP-AND-HOOKS
title: MCP tooling and lifecycle hooks
summary: 'MCP tooling and lifecycle hooks. Focus: authorization, lifecycle hooks, mcp.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- authorization
- lifecycle-hooks
- mcp
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
  original_path: agentic-harness-foundations/codex-plugin/03-mcp-and-hooks.md
  original_sha256: 5ae48515273ff5b3a4bee6e4da52871d52db31cc072434747e848f6a98ba4e3c
  original_metadata_record: harness/codex-plugin/03-mcp-and-hooks.md
  authority: reference-only
---
# MCP tooling and lifecycle hooks

[← Index](../INDEX.md) · [Plugins](01-plugin-foundations.md) · [Security](../foundations/04-reliability-and-evals.md)

## MCP
**[DOCUMENTED]** Model Context Protocol provides a standardized way for clients to discover/use tools and other exposed resources. MCP is not itself an agent orchestrator. In a Codex plugin, MCP exposes reliable application capabilities while skills describe how to use them.

### Tool design [DESIGN]
Prefer domain-oriented, typed operations over thousands of tiny endpoint wrappers. Examples:
- `claim_work_unit` / `submit_classification`
- `search_sources` / `read_evidence`
- `verify_relationship` / `complete_work_unit`
- `get_run_status` / `list_pending_decisions`

Tool outputs should carry stable IDs, bounded text, error categories, provenance and explicit retry guidance. Server-side code must enforce authorization and policy.

### Portable MCP configuration
Use the portable root `mcp.json` schema and explicit transport; for example (remote endpoint only):
```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "research": {
      "type": "streamable-http",
      "url": "https://example.invalid/mcp"
    }
  }
}
```
`.invalid` is intentionally nonfunctional. Local vs remote transport and authentication must be established in implementation.

## Hooks
**[DOCUMENTED]** Codex supports defined lifecycle hook events; event shape and supported surfaces are version-dependent. Plugin hook scripts need to exist locally and must be trusted before execution. Do not assert that arbitrary `beforeModelCall`/`afterToolCall` are real API names without checking the current [hooks reference](https://developers.openai.com/codex/hooks).

### Control boundary
An MCP result can suggest the next task to Codex but **cannot force the host** to perform the next model invocation. The SDK or App Server is required for direct client-managed model turn orchestration.

Sources: https://developers.openai.com/plugins/build/plugins ; https://developers.openai.com/codex/hooks ; https://modelcontextprotocol.io/specification

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-codex-plugin.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-007 — MCP Architecture](../../handbook/tools/AEP-TOOL-007-mcp-architecture.md)
- [AEP-SKILL-005 — Skills, Tools, and MCP](../../handbook/skills/AEP-SKILL-005-skills-tools-and-mcp.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../../handbook/tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
