---
schema_version: '1.0'
id: HARNESS-ARCHITECTURE-01-INTEGRATION-BOUNDARIES
title: Integration boundaries and capability comparison
summary: 'Integration boundaries and capability comparison. Focus: architecture, codex app server, codex plugins,
  codex sdk.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- harness-architecture
tags:
- architecture
- codex-app-server
- codex-plugins
- codex-sdk
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
  original_path: agentic-harness-foundations/architecture/01-integration-boundaries.md
  original_sha256: c997615d70c88a68b251b55cf343ad6a91ec5b97499136b59179692b025a5494
  original_metadata_record: harness/architecture/01-integration-boundaries.md
  authority: reference-only
---
# Integration boundaries and capability comparison

[← Index](../INDEX.md) · [Plugin](../codex-plugin/01-plugin-foundations.md) · [SDK](../codex-sdk/01-sdk-foundations.md) · [App Server](../app-server/01-app-server-foundations.md)

## Four separate abstractions
| Surface | It owns | Does not automatically own |
|---|---|---|
| Plugin package | Distribution of skills, MCP config, assets, optional hooks | Inference lifecycle |
| MCP server | Typed capabilities, data access, side effects and policy | New Codex model invocations |
| Codex TypeScript SDK | Programmatic thread creation/resumption and turn execution | Every internal Codex decision or durable business workflow |
| Codex App Server | Bidirectional Codex session and turn protocol | Your business database, task scheduler or security policy |

## Access assumption
Existing approved Codex authentication can be reused by the SDK; a Platform API key is not inherently mandatory for this path. **[VERIFY]** Enterprise permission for unattended processes, approved models, concurrency and quota. Do not infer Platform Agents API / Agents SDK access from Codex SDK access.

## Capability overview
| Capability | Plugin+MCP | + SDK | App Server client |
|---|---|---|---|
| Package multiple skills | Yes | Yes | Host/config-dependent integration |
| Expose structured tools | Yes | Yes | Supported through Codex configuration |
| Trigger new Codex turn from own scheduler | No, not by MCP alone | Yes | Yes |
| Select requested model/effort | Host-dependent | Thread configuration | Protocol configuration |
| Stream execution progress | Tool-scoped only | Yes | Yes, richer protocol |
| Resume business work | Build it yourself | Build it yourself | Build it yourself |
| Resume Codex session | Host-managed | SDK thread resume | Protocol thread resume |
| Interactive steering / client responses | Host-dependent | Limited by SDK API | Richer protocol where supported |
| Enforce enterprise tool policy | In MCP implementation | In controller/tools | In client/tools |

## Key guidance [DESIGN]
Build a durable, deterministic application core with a replaceable `ReasoningExecutor` interface. Implement it first via the SDK. Keep skills and MCP independently reusable. Consider App Server only when concrete interaction requirements justify it.

Next: [reference architecture](02-reference-design.md), [open decisions](03-decisions-and-questions.md).

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-architecture.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-SKILL-005 — Skills, Tools, and MCP](../../handbook/skills/AEP-SKILL-005-skills-tools-and-mcp.md)
- [AEP-TOOL-007 — MCP Architecture](../../handbook/tools/AEP-TOOL-007-mcp-architecture.md)
- [AEP-KNOW-008 — MCP, API, and CLI Surface](../../handbook/knowledge/AEP-KNOW-008-mcp-api-and-cli-surface.md)
