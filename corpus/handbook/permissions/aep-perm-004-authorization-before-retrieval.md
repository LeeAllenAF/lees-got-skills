---
schema_version: '1.0'
id: AEP-PERM-004
title: Authorization Before Retrieval
summary: 'Authorization Before Retrieval. Focus: authorization, data isolation, retrieval.'
type: standard
status: approved
version: 0.1.0
collection: handbook
domains:
- access-control
tags:
- authorization
- data-isolation
- retrieval
scope:
- enterprise-global
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: platform-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/permissions/aep-perm-004-authorization-before-retrieval.md
  original_sha256: 75fb228051cfecd790467d4949b058eee7617eaebbedb6dca49851ba1079fa8f
  original_metadata_record: handbook/permissions/aep-perm-004-authorization-before-retrieval.md
  authority: inherited-source-context
---

# Authorization Before Retrieval

## Purpose

The platform must decide which corpus partitions are eligible before lexical search, semantic search, reranking, synthesis, or context packaging occurs.

## Guidance

- Never search all restricted content and filter afterward.
- Apply the same rule to candidate generation and reranking.
- Authorization failures should fail closed.
- Test mixed-scope queries.
- Do not expose existence metadata for unauthorized content unless policy allows it.

## Implementation implications

- Keep canonical state structured and versioned.
- Prefer deterministic enforcement where the requirement is objective.
- Preserve provenance through derived artifacts and agent context.
- Define failure behavior before broad automation.
- Add representative fixtures and regression tests as the capability becomes relied upon.

## Evaluation

At minimum, evaluate correctness, security boundary behavior, stale-state handling, downstream task impact, and operational cost where relevant.

## Lifecycle

This guidance is living knowledge. Revalidate it after relevant model, provider, security, source, identity, or architecture changes.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-permissions.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-ARCHITECTURE-02-REFERENCE-DESIGN — Portable reference architecture](../../harness/architecture/02-reference-design.md)
