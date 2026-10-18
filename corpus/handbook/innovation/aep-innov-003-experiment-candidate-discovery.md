---
schema_version: '1.0'
id: AEP-INNOV-003
title: Experiment Candidate Discovery
summary: 'Experiment Candidate Discovery. Focus: experiment discovery, experimentation.'
type: pattern
status: provisional
version: 0.1.0
collection: handbook
domains:
- research-innovation
tags:
- experiment-discovery
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
  original_path: agentic-engineering-platform/handbook/innovation/aep-innov-003-experiment-candidate-discovery.md
  original_sha256: 2ba0f1d21eb0514c4bb0f910f38e765a4beecb9d4f73faf5d32eb8f5b7dfa2f9
  original_metadata_record: handbook/innovation/aep-innov-003-experiment-candidate-discovery.md
  authority: inherited-source-context
---

# Experiment Candidate Discovery

## Purpose

The system may surface experiment candidates from repeated manual intervention, high-cost trajectories, contradictory guidance, benchmark gaps, and source-intelligence deltas.

## Guidance

- Cluster recurring failures before proposing fixes.
- Prioritize foundational questions.
- Avoid auto-creating noise from every anomaly.
- Record provenance for generated candidates.
- Require an acceptance gate before experiments consume material resources.

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
