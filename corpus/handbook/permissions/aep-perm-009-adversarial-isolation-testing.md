---
schema_version: '1.0'
id: AEP-PERM-009
title: Adversarial Isolation Testing
summary: 'Adversarial Isolation Testing. Focus: adversarial testing, data isolation.'
type: evaluation
status: recommended
version: 0.1.0
collection: handbook
domains:
- access-control
tags:
- adversarial-testing
- data-isolation
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
  original_path: agentic-engineering-platform/handbook/permissions/aep-perm-009-adversarial-isolation-testing.md
  original_sha256: e5195d7dd5acce29ca6b03165d232f358f23dc79243a3dc19de01f5536f25e0d
  original_metadata_record: handbook/permissions/aep-perm-009-adversarial-isolation-testing.md
  authority: inherited-source-context
---

# Adversarial Isolation Testing

## Purpose

Permission boundaries require adversarial tests that attempt cross-scope retrieval through search, caches, embeddings, related-document traversal, summaries, and error messages.

## Guidance

- Test direct and indirect references.
- Test stale permission changes.
- Test cache contamination.
- Test malicious query phrasing.
- Verify that authorization is enforced outside the model.

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

[Topic index](../../indexes/handbook-permissions.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
