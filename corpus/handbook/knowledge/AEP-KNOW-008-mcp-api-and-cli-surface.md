---
schema_version: '1.0'
id: AEP-KNOW-008
title: MCP, API, and CLI Surface
summary: 'MCP, API, and CLI Surface. Focus: api design, cli, mcp.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- api-design
- cli
- mcp
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
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-008-mcp-api-and-cli-surface.md
  original_sha256: 07451ef235b5c901401899d90962bbd07fa6f66e591799f72bdb1c32c18a0afa
  original_metadata_record: handbook/knowledge/AEP-KNOW-008-mcp-api-and-cli-surface.md
  authority: inherited-source-context
---

# MCP, API, and CLI Surface

## Principle

MCP is an interface to the knowledge service, not the architecture of the knowledge service.

The same domain operations should be usable through MCP, API, CLI, IDE, and CI adapters where useful.

## Initial domain operations

Recommended first capabilities:

```text
knowledge.get
knowledge.search
guidance.resolve
context.build
skills.search
skills.get
experiments.get
experiments.search
decisions.get
freshness.check
```

Avoid exposing dozens of internal storage primitives.

## MCP mapping

The 2026-07-28 MCP specification supports tools, resources, prompts, cacheable list/read results, optional discovery, extensions, and stateless request handling.

Possible mapping:

### Resources

Use for directly addressable read-only canonical content:

```text
enterprise://handbook/AEP-CTX-003
enterprise://skill/react-component/SKILL.md
```

### Tools

Use for computed/query operations:

```text
search_knowledge
resolve_guidance
build_context
check_freshness
```

### Skills extension

If useful, publish approved skills through the MCP Skills extension while retaining the repository as canonical source.

### Tasks extension

Use only for genuinely long-running operations such as large reindexing or comprehensive cross-corpus analysis. Ordinary retrieval should remain synchronous.

## API/CLI

The CLI should expose the same domain concepts:

```text
af knowledge get AEP-CTX-003
af knowledge search "reranking repository retrieval"
aep guidance resolve --scope X --repo Y --task "..."
af freshness check
```

## Tool descriptions

Tool names/descriptions should emphasize user goals, not storage implementation.

## Current recommendation

Begin with a small read-only MCP tool/resource surface. Expand only when traces show missing use cases.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-ARCHITECTURE-01-INTEGRATION-BOUNDARIES — Integration boundaries and capability comparison](../../harness/architecture/01-integration-boundaries.md)
