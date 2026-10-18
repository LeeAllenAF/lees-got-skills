---
schema_version: '1.0'
id: AEP-INNOV-002
title: Hypothesis Generation
summary: 'Hypothesis Generation. Focus: experimentation, hypotheses.'
type: pattern
status: provisional
version: 0.1.0
collection: handbook
domains:
- research-innovation
tags:
- experimentation
- hypotheses
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
  original_path: agentic-engineering-platform/handbook/innovation/aep-innov-002-hypothesis-generation.md
  original_sha256: b1d685aec035f69797cd31b7c31dcb0dfba809fa8a4a2899ffcaf0cd0e4be3b3
  original_metadata_record: handbook/innovation/aep-innov-002-hypothesis-generation.md
  authority: inherited-source-context
---

# Hypothesis Generation

## Purpose

Hypotheses may originate from production failures, trace analysis, source changes, human proposals, cross-domain analogies, or model-generated ideas.

## Guidance

- State the expected mechanism, not only the desired outcome.
- Tie each hypothesis to a measurable decision.
- Avoid generating experiments with no plausible promotion path.
- Capture assumptions and confounders.
- Allow humans to propose and refine hypotheses.

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
