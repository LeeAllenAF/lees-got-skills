---
schema_version: '1.0'
id: HARNESS-INDEX
title: Indexed knowledge map
summary: 'Indexed knowledge map. Focus: harness design, index navigation.'
type: index
status: informational
version: 1.0.0
collection: harness
domains:
- harness-architecture
tags:
- harness-design
- index-navigation
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
  original_path: agentic-harness-foundations/INDEX.md
  original_sha256: 70e82bff252deb78af7208166dbd328180ddadcc7ca3b157f1795c9adc64f3d8
  original_metadata_record: harness/INDEX.md
  authority: reference-only
---
# Indexed knowledge map

## A. Harness foundations
1. [Mental model, vocabulary, and components](foundations/01-harness-concepts.md)
2. [Orchestration and implementation patterns](foundations/02-orchestration-patterns.md)
3. [Context, retrieval, memory, and state](foundations/03-context-and-state.md)
4. [Validation, security, and evaluation](foundations/04-reliability-and-evals.md)

## B. Codex plugin development
5. [Plugin packaging and surfaces](codex-plugin/01-plugin-foundations.md)
6. [Skills and agent guidance](codex-plugin/02-skills.md)
7. [MCP tools and lifecycle hooks](codex-plugin/03-mcp-and-hooks.md)

## C. Codex SDK
8. [SDK execution fundamentals and authentication](codex-sdk/01-sdk-foundations.md)
9. [Thread configuration, model selection, and typed outputs](codex-sdk/02-configuration-and-capabilities.md)
10. [Orchestration with the SDK](codex-sdk/03-orchestration-pattern.md)

## D. Codex App Server
11. [App Server protocol and use cases](app-server/01-app-server-foundations.md)
12. [Lifecycle, events, and trade-offs](app-server/02-lifecycle-and-integration.md)

## E. Design discussion aids
13. [Architecture boundaries and capability comparison](architecture/01-integration-boundaries.md)
14. [Reference architecture](architecture/02-reference-design.md)
15. [Open questions and decision log](architecture/03-decisions-and-questions.md)
16. [Source catalog and verification checklist](reference/SOURCES.md)
17. [Terminology reference](reference/GLOSSARY.md)

## Cross-link map
Harness → [execution patterns](foundations/02-orchestration-patterns.md) → [SDK controller](codex-sdk/03-orchestration-pattern.md) → [durability](foundations/03-context-and-state.md).

Skills → [plugin packaging](codex-plugin/01-plugin-foundations.md) → [MCP/hooks](codex-plugin/03-mcp-and-hooks.md) → [policy enforcement](foundations/04-reliability-and-evals.md).

SDK → [App Server](app-server/01-app-server-foundations.md) → [integration boundary decisions](architecture/01-integration-boundaries.md).

<!-- generated-context-navigation -->

## Package context links

[Topic index](../indexes/harness-overview.md) · [All topics](../INDEX.md) · [Reading paths](../READING-PATHS.md)

Use the topic index for adjacent documents.
