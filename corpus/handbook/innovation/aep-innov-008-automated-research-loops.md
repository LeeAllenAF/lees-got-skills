---
schema_version: '1.0'
id: AEP-INNOV-008
title: Automated Research Loops
summary: 'Automated Research Loops. Focus: human approval, research automation.'
type: pattern
status: experimental
version: 0.1.0
collection: handbook
domains:
- research-innovation
tags:
- human-approval
- research-automation
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
  original_path: agentic-engineering-platform/handbook/innovation/aep-innov-008-automated-research-loops.md
  original_sha256: e28281d39aa528689845c3c0fab6b476b556490ba35738809f0e4443a439a9b3
  original_metadata_record: handbook/innovation/aep-innov-008-automated-research-loops.md
  authority: inherited-source-context
---

# Automated Research Loops

## Purpose

Future research loops may discover sources, generate hypotheses, design bounded experiments, and summarize results. They must not self-approve normative guidance.

## Guidance

- Separate proposal generation from approval.
- Budget autonomous loops.
- Require immutable experiment outputs.
- Prevent source prompt injection from controlling research goals.
- Stop on non-progress or policy conflict.

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
