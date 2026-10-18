---
schema_version: '1.0'
id: AEP-SRC-002
title: Source Discovery
summary: 'Source Discovery. Focus: source discovery, source intelligence.'
type: pattern
status: provisional
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- source-discovery
- source-intelligence
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-002-source-discovery.md
  original_sha256: 7119d3e15722f1e09f7fd6c35d933d579c4d634f9e5c6f10f27b4edfa0569d70
  original_metadata_record: handbook/sources/aep-src-002-source-discovery.md
  authority: inherited-source-context
---

# Source Discovery

## Purpose

Discovery expands the source catalog beyond a fixed list of known documents. It may follow citations, repository links, standards references, advisories, issue links, or other relationships, but discovered material remains untrusted until classified.

## Guidance

- Start from curated seed sources.
- Record how and why each source was discovered.
- Deduplicate canonical origins before evaluation.
- Prefer primary sources when they exist.
- Measure discovery precision before broad automation.

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
