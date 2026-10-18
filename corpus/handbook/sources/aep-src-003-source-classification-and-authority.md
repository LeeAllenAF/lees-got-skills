---
schema_version: '1.0'
id: AEP-SRC-003
title: Source Classification and Authority
summary: 'Source Classification and Authority. Focus: source authority, source classification.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- source-authority
- source-classification
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-003-source-classification-and-authority.md
  original_sha256: ea4ce9feeea6dab624bd5f31f598a423beb1615c3c3176bd1da07d890f233ed6
  original_metadata_record: handbook/sources/aep-src-003-source-classification-and-authority.md
  authority: inherited-source-context
---

# Source Classification and Authority

## Purpose

Classification identifies what kind of source is being used and what authority it can reasonably carry. Official specifications, vendor documentation, research, internal incidents, and community discussions answer different questions and must not be flattened into one trust tier.

## Guidance

- Model authority by domain and claim type.
- Distinguish normative specifications from implementation commentary.
- Internal production evidence may outrank external advice for local behavior.
- Do not infer authority from popularity.
- Record scope limitations explicitly.

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
