---
schema_version: '1.0'
id: AEP-SRC-005
title: Source Snapshots and Evidence
summary: 'Source Snapshots and Evidence. Focus: provenance, source snapshots.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- provenance
- source-snapshots
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-005-source-snapshots-and-evidence.md
  original_sha256: a11f5996c696013cd164e2a9629e78f42815f176ae18b221b4499b4b58a37f0b
  original_metadata_record: handbook/sources/aep-src-005-source-snapshots-and-evidence.md
  authority: inherited-source-context
---

# Source Snapshots and Evidence

## Purpose

A SourceSnapshot freezes the evidence actually used at a point in time. Evidence objects connect specific claims to those snapshots so later reviewers can reconstruct what supported a recommendation.

## Guidance

- Snapshots are immutable or content-addressed.
- Evidence records cite exact snapshots, not moving URLs alone.
- Derived summaries inherit source freshness.
- Snapshot parsers are versioned.
- Sensitive snapshots retain permission scope.

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
