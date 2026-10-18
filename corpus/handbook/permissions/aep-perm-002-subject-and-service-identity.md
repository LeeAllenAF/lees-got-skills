---
schema_version: '1.0'
id: AEP-PERM-002
title: Subject and Service Identity
summary: 'Subject and Service Identity. Focus: identity, service identity.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- access-control
tags:
- identity
- service-identity
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
  original_path: agentic-engineering-platform/handbook/permissions/aep-perm-002-subject-and-service-identity.md
  original_sha256: adb52ddc2d92442831bae5847cabd94be3ebe5b771f56ccf55fd07f017cc7482
  original_metadata_record: handbook/permissions/aep-perm-002-subject-and-service-identity.md
  authority: inherited-source-context
---

# Subject and Service Identity

## Purpose

Knowledge access may originate from people, developer agents, CI services, security services, or other automation. Authorization requires an explicit subject context rather than assumptions embedded in prompts.

## Guidance

- Use stable subject/service identities.
- Include roles/groups and relevant organizational scopes.
- Short-lived delegated identity is preferable to shared credentials.
- Do not infer identity from natural-language claims.
- Trace important service-to-service access.

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
