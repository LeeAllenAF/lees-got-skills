---
schema_version: '1.0'
id: AEP-SRC-001
title: Source Intelligence Fundamentals
summary: 'Source Intelligence Fundamentals. Focus: knowledge management, source intelligence.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- knowledge-management
- source-intelligence
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-001-source-intelligence-fundamentals.md
  original_sha256: 5dcd0e23b09acbf6a8bfe3e8d10858d0a6232f2356b9e827b8e8e65df4c89178
  original_metadata_record: handbook/sources/aep-src-001-source-intelligence-fundamentals.md
  authority: inherited-source-context
---

# Source Intelligence Fundamentals

## Purpose

Source intelligence governs how the platform discovers and uses evidence. A source is not trusted merely because retrieval found it. Source authority, freshness, scope, reproducibility, and corroboration remain explicit metadata.

The source subsystem should support curated sources first, then progressively add discovery automation after quality can be measured.

## Guidance

- Separate source identity from source snapshots.
- Preserve the exact snapshot that supported a claim.
- Treat vendor guidance as evidence, not universal truth.
- Do not let discovered content become instruction authority automatically.
- Permission filtering applies before source retrieval.

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

- [HARNESS-REFERENCE-SOURCES — Source inventory and verification checklist](../../harness/reference/SOURCES.md)
