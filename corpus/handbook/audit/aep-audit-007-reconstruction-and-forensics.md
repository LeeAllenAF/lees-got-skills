---
schema_version: '1.0'
id: AEP-AUDIT-007
title: Reconstruction and Forensics
summary: 'Reconstruction and Forensics. Focus: change history, forensics.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- auditability
tags:
- change-history
- forensics
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
  original_path: agentic-engineering-platform/handbook/audit/aep-audit-007-reconstruction-and-forensics.md
  original_sha256: 91626a4337e4558553582949e842e485894e522f9ea4482865ee1738a1bbdcb5
  original_metadata_record: handbook/audit/aep-audit-007-reconstruction-and-forensics.md
  authority: inherited-source-context
---

# Reconstruction and Forensics

## Purpose

A reviewer should be able to reconstruct why a piece of guidance, source trust state, or skill version was active at a given time.

## Guidance

- Version canonical artifacts.
- Keep append-oriented decision history.
- Record relevant configuration versions.
- Support time-bounded queries.
- Test reconstruction with fixtures.

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
