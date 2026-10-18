---
schema_version: '1.0'
id: AEP-ASSURE-002
title: Agent Threat Modeling
summary: 'Agent Threat Modeling. Focus: threat modeling, trust boundaries.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security-assurance
tags:
- threat-modeling
- trust-boundaries
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
  original_path: agentic-engineering-platform/handbook/assurance/aep-assure-002-agent-threat-modeling.md
  original_sha256: d14ea41a0d1a0c2ecafc2cded2f64bdcf100e538e2bab7d51b61727eccd936a7
  original_metadata_record: handbook/assurance/aep-assure-002-agent-threat-modeling.md
  authority: inherited-source-context
---

# Agent Threat Modeling

## Purpose

Threat modeling includes users, retrieved content, repositories, tools, skills, memory, external services, and the model itself as a fallible decision component.

## Guidance

- Map trust boundaries and authority transitions.
- Identify confused-deputy paths.
- Include malicious-but-authorized content sources.
- Consider stale credentials and revoked permissions.
- Model blast radius.

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

[Topic index](../../indexes/handbook-assurance.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
