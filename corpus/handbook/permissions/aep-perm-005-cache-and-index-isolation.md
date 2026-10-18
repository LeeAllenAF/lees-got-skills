---
schema_version: '1.0'
id: AEP-PERM-005
title: Cache and Index Isolation
summary: 'Cache and Index Isolation. Focus: caching, data isolation, indexing.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- access-control
tags:
- caching
- data-isolation
- indexing
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
  original_path: agentic-engineering-platform/handbook/permissions/aep-perm-005-cache-and-index-isolation.md
  original_sha256: 8531e9031ab8387ef4f6bfb0d22bd808f439c98031f1326d2bcca26767d0c1ae
  original_metadata_record: handbook/permissions/aep-perm-005-cache-and-index-isolation.md
  authority: inherited-source-context
---

# Cache and Index Isolation

## Purpose

Indexes and caches are part of the security boundary. Permission mistakes in a cache key can leak knowledge even if the final response layer is correct.

## Guidance

- Partition or securely filter indexes before candidate exposure.
- Include authorization-relevant scope in cache keys.
- Invalidate caches after permission changes.
- Test side-channel and stale-cache cases.
- Keep restricted traces isolated.

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

Use the topic index for adjacent documents.
