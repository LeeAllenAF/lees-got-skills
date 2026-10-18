---
schema_version: '1.0'
id: AEP-SRC-006
title: Source Prioritization and Monitoring
summary: 'Source Prioritization and Monitoring. Focus: freshness, source monitoring.'
type: pattern
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- freshness
- source-monitoring
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-006-source-prioritization-and-monitoring.md
  original_sha256: 67370cee1bcca949e4aecd04a7664b692d0db5d291a9687c23a167a95b9ee92e
  original_metadata_record: handbook/sources/aep-src-006-source-prioritization-and-monitoring.md
  authority: inherited-source-context
---

# Source Prioritization and Monitoring

## Purpose

Not every source deserves the same monitoring frequency. Prioritize revalidation by authority, volatility, impact, usage, security relevance, and recent change signals.

## Guidance

- Monitor volatile provider docs more frequently than durable principles.
- Security advisories trigger event-driven review.
- Frequently retrieved sources deserve stronger freshness guarantees.
- Do not spend equal monitoring budget everywhere.
- Record why a source has a given review cadence.

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
