---
schema_version: '1.0'
id: AEP-PERM-003
title: Scope and Overlay Resolution
summary: 'Scope and Overlay Resolution. Focus: conflict resolution, policy resolution.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- access-control
tags:
- conflict-resolution
- policy-resolution
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
  original_path: agentic-engineering-platform/handbook/permissions/aep-perm-003-scope-and-overlay-resolution.md
  original_sha256: 79d7f833ad88822aa341ebe8059cd0d6bddb8e8c910b8528f6c44343853ee84b
  original_metadata_record: handbook/permissions/aep-perm-003-scope-and-overlay-resolution.md
  authority: inherited-source-context
---

# Scope and Overlay Resolution

## Purpose

Guidance can exist at enterprise, business-unit, team, project, repository, environment, restricted, or subject-specific scopes. Specificity and authority are independent.

## Guidance

- More specific does not automatically mean more authoritative.
- Explicit exceptions must identify their parent rule.
- Return unresolved conflicts instead of silently merging.
- Preserve provenance for every effective rule.
- Scope resolution should be deterministic where possible.

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
