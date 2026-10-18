---
schema_version: '1.0'
id: AEP-AUDIT-004
title: Experiment Decision Records
summary: 'Experiment Decision Records. Focus: decision records, experimentation.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- auditability
tags:
- decision-records
- experimentation
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
  original_path: agentic-engineering-platform/handbook/audit/aep-audit-004-experiment-decision-records.md
  original_sha256: a4bb17abd054390eb31c74a12db94ee5e2454295ab2d4bd9a00c2c133720ea04
  original_metadata_record: handbook/audit/aep-audit-004-experiment-decision-records.md
  authority: inherited-source-context
---

# Experiment Decision Records

## Purpose

Experiment results do not change guidance automatically. An explicit decision record connects measured evidence to promotion, rejection, or no-change outcomes.

## Guidance

- Record hypothesis and baseline.
- Record material metrics and uncertainty.
- Explain why evidence was sufficient or insufficient.
- Link affected guidance.
- Record follow-up conditions.

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

[Topic index](../../indexes/handbook-audit.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
