---
schema_version: '1.0'
id: AEP-SRC-007
title: Conflicts and Corroboration
summary: 'Conflicts and Corroboration. Focus: conflict resolution, corroboration.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- conflict-resolution
- corroboration
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-007-conflicts-and-corroboration.md
  original_sha256: e7e0b3be7028d779c6434ae84b086ed894705bd2507c35b852858c735ff8e082
  original_metadata_record: handbook/sources/aep-src-007-conflicts-and-corroboration.md
  authority: inherited-source-context
---

# Conflicts and Corroboration

## Purpose

Conflicting evidence must remain visible. The platform should represent disagreement, scope differences, and supersession rather than synthesizing an artificial consensus.

## Guidance

- Prefer primary evidence where applicable.
- Corroboration improves confidence but does not erase scope differences.
- Record unresolved conflicts explicitly.
- Separate factual disagreement from different operating assumptions.
- Allow later experiments to resolve uncertain claims.

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

[Topic index](../../indexes/handbook-sources.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
