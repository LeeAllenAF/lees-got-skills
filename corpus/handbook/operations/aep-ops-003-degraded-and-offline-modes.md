---
schema_version: '1.0'
id: AEP-OPS-003
title: Degraded and Offline Modes
summary: 'Degraded and Offline Modes. Focus: offline operation, reliability.'
type: standard
status: provisional
version: 0.1.0
collection: handbook
domains:
- operations
tags:
- offline-operation
- reliability
scope:
- enterprise-global
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: platform-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/operations/aep-ops-003-degraded-and-offline-modes.md
  original_sha256: 44c48ce77421a90594443194a18bcbfdc1ef00b7a3410bd67ff44b2eb08f3c3c
  original_metadata_record: handbook/operations/aep-ops-003-degraded-and-offline-modes.md
  authority: inherited-source-context
---

# Degraded and Offline Modes

## Purpose

Local/offline use may inspect and validate available knowledge, but unavailable authoritative services must not be silently treated as current.

## Guidance

- Mark degraded state explicitly.
- Do not bypass permissions because a dependency is unavailable.
- Allow proposals rather than authoritative mutations when necessary.
- Revalidate freshness after reconnection.
- Preserve locally generated evidence for reconciliation.

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

[Topic index](../../indexes/handbook-operations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
