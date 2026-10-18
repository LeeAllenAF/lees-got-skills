---
schema_version: '1.0'
id: AEP-SRC-008
title: Source Security and Poisoning
summary: 'Source Security and Poisoning. Focus: data poisoning, prompt injection.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- source-intelligence
tags:
- data-poisoning
- prompt-injection
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
  original_path: agentic-engineering-platform/handbook/sources/aep-src-008-source-security-and-poisoning.md
  original_sha256: c8eba0060cc5dd120b5967b33dfa20dc2a46705aed7aa4c4d720d444ffdbb11c
  original_metadata_record: handbook/sources/aep-src-008-source-security-and-poisoning.md
  authority: inherited-source-context
---

# Source Security and Poisoning

## Purpose

Retrieved source content is untrusted data. Malicious or compromised sources may contain prompt injection, false operational instructions, poisoned examples, or misleading links.

## Guidance

- Do not execute source instructions solely because they were retrieved.
- Sanitize and structure untrusted content.
- Constrain network/file/tool access independently.
- Track source provenance through context construction.
- Adversarially test poisoned-source scenarios.

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
