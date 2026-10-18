---
schema_version: '1.0'
id: HARNESS-README
title: Agentic Harness and Codex Integration Foundations
summary: 'Agentic Harness and Codex Integration Foundations. Focus: harness design, index navigation.'
type: reference
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
  original_path: agentic-harness-foundations/README.md
  original_sha256: 4149ee5ba4838b796100911de0f8f00de9b33eb30fd58775d5cbb7c62bd824ea
  original_metadata_record: harness/README.md
  authority: reference-only
---
# Agentic Harness and Codex Integration Foundations

> Portable, source-linked discussion corpus | Version 0.1.0 | Reviewed 2026-10-14

## Purpose
This package captures an architectural discovery discussion about **agentic harness design**, **portable Codex plugins**, **Codex TypeScript SDK**, and **Codex App Server**. It is intended for a standard Codex agent to read as context during design discussions—not to be installed as a functioning plugin, or interpreted as an approved production architecture.

## Start here
- Agent instructions: [AGENTS.md](AGENTS.md)
- Navigable topic list: [INDEX.md](INDEX.md)
- Foundational concepts: [foundations/01-harness-concepts.md](foundations/01-harness-concepts.md)
- Architecture decision guide: [architecture/01-integration-boundaries.md](architecture/01-integration-boundaries.md)
- Source inventory: [reference/SOURCES.md](reference/SOURCES.md)

## Constraints assumed
- Codex CLI and Codex SDK can be used under an approved existing Codex login.
- Direct OpenAI Platform API access / Agents SDK or Agents API cannot be assumed.
- Strong preference for deterministic code, durable state, auditability and modular reasoning workers.
- Do **not** assume any specific deployment platform, infrastructure, organization, or model entitlement.

## Provenance convention
- **[DOCUMENTED]** directly supported by linked official documentation or current SDK source.
- **[DESIGN]** recommended architecture, not an OpenAI product promise.
- **[VERIFY]** version-, organization- or environment-dependent; confirm before implementation.

## Reading strategies
- **10 minute orientation:** README → INDEX → harness concepts → integration boundaries.
- **Designing a plugin:** plugin foundations → skills → MCP/hooks → security.
- **Designing a controller:** SDK foundations → SDK capability matrix → App Server foundations → lifecycle design.
- **Technical feasibility review:** constraints → capability matrix → decision records → sources.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../indexes/harness-overview.md) · [All topics](../INDEX.md) · [Reading paths](../READING-PATHS.md)

Use the topic index for adjacent documents.
