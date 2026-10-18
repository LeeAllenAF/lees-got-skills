---
schema_version: '1.0'
id: AEP-SRC-009
title: Source Evaluation
summary: 'Source Evaluation. Focus: evaluation, source intelligence.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- evaluation
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-009-source-evaluation.md
  original_sha256: cb42c0651f4755fa6c0b7d4493f72df4bf8b24f8d7b2fdccc2e6a734fd6e21c0
  original_metadata_record: handbook/sources/aep-src-009-source-evaluation.md
  authority: inherited-source-context
---

# Source Evaluation

## Purpose

Source-intelligence quality should be measured. Evaluate discovery precision, classification correctness, stale-source selection, corroboration behavior, and downstream task impact.

## Guidance

- Use held-out queries and known authoritative sources.
- Measure downstream agent outcomes, not only retrieval metrics.
- Test source conflicts and stale content.
- Include permission-boundary cases.
- Promote automation only when it improves useful outcomes.

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
