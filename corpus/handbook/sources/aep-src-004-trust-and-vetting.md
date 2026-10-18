---
schema_version: '1.0'
id: AEP-SRC-004
title: Trust and Vetting
summary: 'Trust and Vetting. Focus: source authority, source vetting.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- source-authority
- source-vetting
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-004-trust-and-vetting.md
  original_sha256: 9751f262d419cfcf100f84a2a8504d924455e9ada5c741019cb03bcd47c1fd13
  original_metadata_record: handbook/sources/aep-src-004-trust-and-vetting.md
  authority: inherited-source-context
---

# Trust and Vetting

## Purpose

Vetting evaluates whether a source is suitable for a particular purpose. Trust is multidimensional; a source can be authoritative but stale, current but anecdotal, or reproducible but out of scope.

## Guidance

- Evaluate authority, recency, reproducibility, independence, historical reliability, scope applicability, and security posture.
- Avoid one opaque universal trust score.
- Use explicit rejection or degraded states.
- Require stronger evidence for security-sensitive guidance.
- Revalidate trust after material source changes.

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

[Topic index](../../indexes/handbook-sources.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
