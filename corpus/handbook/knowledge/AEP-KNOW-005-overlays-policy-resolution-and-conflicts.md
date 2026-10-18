---
schema_version: '1.0'
id: AEP-KNOW-005
title: Overlays, Policy Resolution, and Conflicts
summary: 'Overlays, Policy Resolution, and Conflicts. Focus: conflict resolution, policy resolution.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- conflict-resolution
- policy-resolution
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-005-overlays-policy-resolution-and-conflicts.md
  original_sha256: 48e64119bd29748232e1afbcdcd9182ef76ec5fea3d1d1b8e43c0c9144531408
  original_metadata_record: handbook/knowledge/AEP-KNOW-005-overlays-policy-resolution-and-conflicts.md
  authority: inherited-source-context
---

# Overlays, Policy Resolution, and Conflicts

## Purpose

Resolve effective guidance across organizational, scope, repository, and task scopes without confusing specificity, trust, authority, or relevance.

## Layer model

```text
general engineering knowledge
        ↓
the platform principles
        ↓
the platform standards
        ↓
technology/domain guidance
        ↓
scoped requirements
        ↓
repository requirements
        ↓
task-specific constraints
```

This is a resolution model, not a simplistic "later text wins" prompt order.

## Independent dimensions

Every candidate guidance item may carry:

- authority;
- trust;
- scope;
- specificity;
- status;
- freshness;
- applicability;
- provenance.

A highly relevant item does not automatically have authority to override policy.

## Conflict states

The resolver should distinguish:

```text
compatible
more-specific override
explicit exception
unresolved conflict
deprecated conflict
not applicable
```

Unresolved conflicts should be returned explicitly to the caller.

## Example

the platform guidance:

> Prefer TypeScript strict mode.

Project policy:

> All production TypeScript projects require strict mode.

Repository:

> This legacy package temporarily disables `noUncheckedIndexedAccess`.

The effective result should preserve all three facts and identify the repository exception rather than flattening them into one sentence.

## Permission isolation

Project overlays must be authorization-scoped before retrieval and resolution.

Never retrieve across permission scopes and filter after ranking.

## Explainability

Resolution output should include:

```text
effective rule
source
scope
reason it applied
overridden candidates
unresolved conflicts
```

## Current recommendation

Implement resolution deterministically wherever rules can be expressed structurally. Use LLM synthesis only for explanation, not for deciding policy precedence.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
