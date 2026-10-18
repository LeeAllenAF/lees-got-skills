---
schema_version: '1.0'
id: AEP-AUDIT-006
title: Permission Evaluation Records
summary: 'Permission Evaluation Records. Focus: audit records, authorization.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- auditability
tags:
- audit-records
- authorization
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
  original_path: agentic-engineering-platform/handbook/audit/aep-audit-006-permission-evaluation-records.md
  original_sha256: 5871c1aa83dac52e6ec52e8c2574b63944fe98ab01a72254abbfc4fbfac6c748
  original_metadata_record: handbook/audit/aep-audit-006-permission-evaluation-records.md
  authority: inherited-source-context
---

# Permission Evaluation Records

## Purpose

High-value permission decisions should be auditable, especially restricted knowledge access and service-to-service retrieval.

## Guidance

- Record policy version and decision reason.
- Minimize sensitive payload logging.
- Correlate with query/request IDs.
- Retain denials useful for threat detection.
- Protect audit data from the subjects it audits where appropriate.

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
