---
schema_version: '1.0'
id: AEP-INNOV-006
title: Promotion and Rejection
summary: 'Promotion and Rejection. Focus: decision records, knowledge promotion.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- research-innovation
tags:
- decision-records
- knowledge-promotion
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
  original_path: agentic-engineering-platform/handbook/innovation/aep-innov-006-promotion-and-rejection.md
  original_sha256: 3518851e634835c509a8de584775a51ba27528644060cf7784a343af6f9d47d7
  original_metadata_record: handbook/innovation/aep-innov-006-promotion-and-rejection.md
  authority: inherited-source-context
---

# Promotion and Rejection

## Purpose

Experiment results can promote, weaken, reject, or leave guidance inconclusive. Promotion is a governed knowledge mutation.

## Guidance

- Require explicit decision records.
- Update regression suites after promotion.
- Preserve rejected approaches and reasons.
- Do not promote from a single flattering run.
- Revalidate promoted techniques across future model generations.

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

[Topic index](../../indexes/handbook-innovation.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
