---
schema_version: '1.0'
id: AEP-ASSURE-003
title: Prompt-Injection Testing
summary: 'Prompt-Injection Testing. Focus: adversarial testing, prompt injection.'
type: evaluation
status: recommended
version: 0.1.0
collection: handbook
domains:
- security-assurance
tags:
- adversarial-testing
- prompt-injection
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
  original_path: agentic-engineering-platform/handbook/assurance/aep-assure-003-prompt-injection-testing.md
  original_sha256: 4d4c6b862f28f1afbc2c050b83ae19ea2a00797469d0d33b4a66e5cf2c995583
  original_metadata_record: handbook/assurance/aep-assure-003-prompt-injection-testing.md
  authority: inherited-source-context
---

# Prompt-Injection Testing

## Purpose

Prompt-injection tests should include direct, indirect, encoded, contextual, and socially engineered instructions embedded in documents, repositories, tickets, tool output, and source snapshots.

## Guidance

- Assume detection may fail.
- Measure whether authority boundaries still hold.
- Test exfiltration attempts.
- Test instruction-priority confusion.
- Keep malicious fixtures isolated.

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
