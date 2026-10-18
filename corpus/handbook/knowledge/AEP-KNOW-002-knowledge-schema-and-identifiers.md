---
schema_version: '1.0'
id: AEP-KNOW-002
title: Knowledge Schema, Identifiers, and Metadata
summary: 'Knowledge Schema, Identifiers, and Metadata. Focus: identifiers, metadata, schemas.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- identifiers
- metadata
- schemas
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-002-knowledge-schema-and-identifiers.md
  original_sha256: f51ead01649b49d14cf952b48f4288ae2081bbba20da32eeeeb1a66fabdb7873
  original_metadata_record: handbook/knowledge/AEP-KNOW-002-knowledge-schema-and-identifiers.md
  authority: inherited-source-context
---

# Knowledge Schema, Identifiers, and Metadata

## Principle

Machine consumption requires stable identity independent of filenames and folder layout.

Stable document IDs such as `AEP-CTX-003` are authoritative. Paths are implementation details.

## Required metadata

Canonical knowledge artifacts should support:

```yaml
id: AEP-CTX-003
title: Retrieval Architecture
type: standard
status: recommended
version: 1.0.0

scope:
  - enterprise-global
domains:
  - agent-engineering
  - retrieval

applies_to:
  - coding-agents

technologies:
  - generic

tags:
  - retrieval
  - hybrid-search

related:
  - AEP-CTX-004
  - AEP-CTX-005

supersedes: null

evidence:
  experiments: []
  references: []

review:
  owner: agent-engineering
  last_reviewed: 2026-10-01
  review_interval: 180d
```

Not every field is mandatory for every type, but the schema should make absence explicit.

## Knowledge types

The service should understand at least:

- principle;
- standard;
- pattern;
- anti-pattern;
- technique;
- skill;
- experiment;
- evaluation;
- decision;
- reference;
- playbook.

## Status and maturity

Status is semantically meaningful:

```text
approved
recommended
provisional
experimental
informational
deprecated
rejected
```

Retrieval may return deprecated/rejected material when requested for historical analysis, but ordinary guidance resolution should not treat it as active advice.

## Immutable identity, versioned content

An artifact's stable ID should survive revisions. Content versions should remain traceable.

If the meaning changes enough to invalidate historical references, create a new artifact and use `supersedes` / `superseded_by`.

## Schema validation

Metadata should be validated in CI using a formal schema.

Validation should include:

- unique IDs;
- valid statuses/types;
- valid relationships;
- review metadata;
- unresolved references;
- dependency cycles where prohibited;
- malformed overlay scopes.

## Current recommendation

Prefer boring, inspectable metadata over opaque embeddings-only knowledge stores. Semantic indexes are derivatives; metadata is part of the canonical contract.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
