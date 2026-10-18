---
schema_version: '1.0'
id: AEP-PERM-008
title: Service-to-Service Access
summary: 'Service-to-Service Access. Focus: credentials, service identity.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- access-control
tags:
- credentials
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
  original_path: agentic-engineering-platform/handbook/permissions/aep-perm-008-service-to-service-access.md
  original_sha256: a90cd4466adf947fde4c068d36f0810cda7925fde5266c7203d2aefbc0342e39
  original_metadata_record: handbook/permissions/aep-perm-008-service-to-service-access.md
  authority: inherited-source-context
---

# Service-to-Service Access

## Purpose

Automation often needs knowledge without a human directly present. Service identities require scoped permissions, explicit purpose, and predictable revocation.

## Guidance

- Do not reuse human credentials for services.
- Prefer workload identity and short-lived credentials.
- Bind service access to expected scopes.
- Rate-limit and monitor high-volume retrieval.
- Design revocation and rotation from the beginning.

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
