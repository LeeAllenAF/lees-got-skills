---
schema_version: '1.0'
id: AEP-AUDIT-002
title: Decision Records
summary: 'Decision Records. Focus: decision records, provenance.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- auditability
tags:
- decision-records
- provenance
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
  original_path: agentic-engineering-platform/handbook/audit/aep-audit-002-decision-records.md
  original_sha256: 5e2797e1b75ee77ca560230376adb5f5fb483a15dfd1dcd4bf95305e3133fd82
  original_metadata_record: handbook/audit/aep-audit-002-decision-records.md
  authority: inherited-source-context
---

# Decision Records

## Purpose

Decision records capture architecture and governance choices, alternatives, evidence, scope, and review triggers.

## Guidance

- Record the question and alternatives considered.
- Link supporting evidence.
- Identify authority/owner.
- Include revisit triggers.
- Supersede rather than silently overwrite.

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

- [HARNESS-ARCHITECTURE-03-DECISIONS-AND-QUESTIONS — Design discussion: decisions and open questions](../../harness/architecture/03-decisions-and-questions.md)
