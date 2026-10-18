---
schema_version: '1.0'
id: AEP-AUDIT-005
title: Evidence Lineage
summary: 'Evidence Lineage. Focus: evidence lineage, provenance.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- auditability
tags:
- evidence-lineage
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
  original_path: agentic-engineering-platform/handbook/audit/aep-audit-005-evidence-lineage.md
  original_sha256: a1f2820d979a205b2e5b8b1abe020a52164229b4a148e502bb628f43b34908a7
  original_metadata_record: handbook/audit/aep-audit-005-evidence-lineage.md
  authority: inherited-source-context
---

# Evidence Lineage

## Purpose

Lineage connects source snapshots to evidence, guidance, skills, evals, and decisions.

## Guidance

- Use stable identifiers.
- Preserve exact snapshot/version references.
- Allow reverse traversal from guidance to evidence.
- Invalidate downstream claims when critical evidence is superseded.
- Avoid lineage that depends on free-text names alone.

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

- [HARNESS-ARCHITECTURE-02-REFERENCE-DESIGN — Portable reference architecture](../../harness/architecture/02-reference-design.md)
