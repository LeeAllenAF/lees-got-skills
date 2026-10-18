---
schema_version: '1.0'
id: AEP-ASSURE-005
title: Adversarial Workflow Testing
summary: 'Adversarial Workflow Testing. Focus: adversarial testing, orchestration.'
type: evaluation
status: recommended
version: 0.1.0
collection: handbook
domains:
- security-assurance
tags:
- adversarial-testing
- orchestration
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
  original_path: agentic-engineering-platform/handbook/assurance/aep-assure-005-adversarial-workflow-testing.md
  original_sha256: 5c65a3f0708fb0dfec95bbe0598fc5da36b24e158a4dedb51690980244c93ce7
  original_metadata_record: handbook/assurance/aep-assure-005-adversarial-workflow-testing.md
  authority: inherited-source-context
---

# Adversarial Workflow Testing

## Purpose

Agent workflows should be challenged with misleading tool outputs, partial failures, conflicting instructions, retry storms, poisoned context, and attempts to bypass checkpoints.

## Guidance

- Check termination behavior.
- Check idempotency and replay.
- Check audit completeness.
- Check budget enforcement.
- Check postcondition verification.

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

[Topic index](../../indexes/handbook-assurance.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
