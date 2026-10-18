---
schema_version: '1.0'
id: AEP-SRC-010
title: Source Lifecycle and Freshness
summary: 'Source Lifecycle and Freshness. Focus: freshness, lifecycle, source intelligence.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- freshness
- lifecycle
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-010-source-lifecycle-and-freshness.md
  original_sha256: 1d27379eb2a39c89bfd08285dfb9188de476226423f715d088c09ce9e4799e48
  original_metadata_record: handbook/sources/aep-src-010-source-lifecycle-and-freshness.md
  authority: inherited-source-context
---

# Source Lifecycle and Freshness

## Purpose

Sources move through explicit lifecycle states and are periodically revalidated. A source may be useful historically even after it is no longer current guidance.

## Guidance

- Use states such as discovered, classified, vetted, approved, review_due, degraded, deprecated, rejected.
- Event-driven review overrides calendars.
- Do not silently delete historical evidence.
- Invalidate derived artifacts when source snapshots are superseded.
- Keep ownership and review cadence explicit.

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
