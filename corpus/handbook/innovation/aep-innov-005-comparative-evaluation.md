---
schema_version: '1.0'
id: AEP-INNOV-005
title: Comparative Evaluation
summary: 'Comparative Evaluation. Focus: comparative evaluation, experimentation.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- research-innovation
tags:
- comparative-evaluation
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
  original_path: agentic-engineering-platform/handbook/innovation/aep-innov-005-comparative-evaluation.md
  original_sha256: 371185e54efc338199e57627051f4f7a0cf2f2e160e57bc5bc5f991af5caf22f
  original_metadata_record: handbook/innovation/aep-innov-005-comparative-evaluation.md
  authority: inherited-source-context
---

# Comparative Evaluation

## Purpose

Innovation requires comparison against a meaningful baseline. Improvement in one metric does not justify regression in safety, quality, or cost without an explicit tradeoff decision.

## Guidance

- Use paired environments when possible.
- Measure cost per useful outcome.
- Include variance and repeated trials for stochastic systems.
- Preserve baseline configurations.
- Report Pareto tradeoffs.

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
