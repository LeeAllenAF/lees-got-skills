---
schema_version: '1.0'
id: AEP-INNOV-007
title: Novelty vs Reliability
summary: 'Novelty vs Reliability. Focus: experimentation, reliability.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- research-innovation
tags:
- experimentation
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
  original_path: agentic-engineering-platform/handbook/innovation/aep-innov-007-novelty-vs-reliability.md
  original_sha256: ecb96bf88316e4d32cc2f760527b66e7b3e4e217eb35e802ee77489a126d97c4
  original_metadata_record: handbook/innovation/aep-innov-007-novelty-vs-reliability.md
  authority: inherited-source-context
---

# Novelty vs Reliability

## Purpose

Novel techniques may improve capability while reducing predictability. The platform should separate research exploration from production reliability requirements.

## Guidance

- Use experimental status labels.
- Constrain novel methods to appropriate blast radius.
- Do not trade away deterministic controls casually.
- Measure tail failures.
- Prefer reversible adoption.

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
