---
schema_version: '1.0'
id: AEP-PERM-006
title: Restricted Knowledge
summary: 'Restricted Knowledge. Focus: data classification, data protection.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- access-control
tags:
- data-classification
- data-protection
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
  original_path: agentic-engineering-platform/handbook/permissions/aep-perm-006-restricted-knowledge.md
  original_sha256: 8d238d899f1a64a02218d24d139b134e1d6c7747570e4aa94c2a47d439ac7b62
  original_metadata_record: handbook/permissions/aep-perm-006-restricted-knowledge.md
  authority: inherited-source-context
---

# Restricted Knowledge

## Purpose

Some engineering material requires stronger controls, such as security findings, credentials-adjacent material, incident details, proprietary architecture, or regulated data handling guidance.

## Guidance

- Classify restricted knowledge explicitly.
- Minimize semantic indexing of highly sensitive content unless required.
- Use stronger audit and retention rules.
- Do not include secrets in the knowledge corpus.
- Require least-privilege access.

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

[Topic index](../../indexes/handbook-permissions.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
