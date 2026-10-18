---
schema_version: '1.0'
id: AEP-AUDIT-003
title: Knowledge Mutation Records
summary: 'Knowledge Mutation Records. Focus: change history, knowledge management.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- auditability
tags:
- change-history
- knowledge-management
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
  original_path: agentic-engineering-platform/handbook/audit/aep-audit-003-knowledge-mutation-records.md
  original_sha256: ff74bd5d73b82b3e9c63f3d83652d8cb382782d0341f7897e2d3e4020703016c
  original_metadata_record: handbook/audit/aep-audit-003-knowledge-mutation-records.md
  authority: inherited-source-context
---

# Knowledge Mutation Records

## Purpose

Knowledge mutation records cover status changes, guidance promotion/deprecation, source trust changes, skill publication, and permission-scope changes.

## Guidance

- Capture before and after versions.
- Record reason and evidence.
- Link validation/eval results.
- Preserve rollback or supersession information.
- Do not require natural-language logs to reconstruct state.

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
