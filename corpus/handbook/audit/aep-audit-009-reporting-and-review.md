---
schema_version: '1.0'
id: AEP-AUDIT-009
title: Reporting and Review
summary: 'Reporting and Review. Focus: audit records, reporting.'
type: pattern
status: recommended
version: 0.1.0
collection: handbook
domains:
- auditability
tags:
- audit-records
- reporting
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
  original_path: agentic-engineering-platform/handbook/audit/aep-audit-009-reporting-and-review.md
  original_sha256: 2c2ac92f652c8b850ef71d738407e99a019efb0909a3bb02b4992192ee73a341
  original_metadata_record: handbook/audit/aep-audit-009-reporting-and-review.md
  authority: inherited-source-context
---

# Reporting and Review

## Purpose

Audit records should support periodic review of stale decisions, repeated overrides, permission anomalies, and knowledge churn.

## Guidance

- Report meaningful trends, not raw event volume.
- Surface decisions past review triggers.
- Detect repeated manual exceptions.
- Tie reports back to canonical records.
- Protect restricted report content.

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
