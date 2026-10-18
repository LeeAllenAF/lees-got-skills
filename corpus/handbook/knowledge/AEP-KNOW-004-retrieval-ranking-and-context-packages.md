---
schema_version: '1.0'
id: AEP-KNOW-004
title: Retrieval, Ranking, and Context Packages
summary: 'Retrieval, Ranking, and Context Packages. Focus: context packages, retrieval.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- context-packages
- retrieval
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
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-004-retrieval-ranking-and-context-packages.md
  original_sha256: b745cbb913425dda1ebdb41f657e0c4ef2d39be864d554b44ba420f12a7f7b06
  original_metadata_record: handbook/knowledge/AEP-KNOW-004-retrieval-ranking-and-context-packages.md
  authority: inherited-source-context
---

# Retrieval, Ranking, and Context Packages

## Principle

The knowledge service should return the **smallest sufficient evidence package**, not a dump of the handbook.

## Retrieval portfolio

Use the retrieval architecture already defined in the Context Engineering section:

```text
exact lookup
metadata filtering
lexical search
semantic search
structural relationships
reranking
```

The service may route among these methods based on query characteristics.

## Search vs guidance resolution

These are different operations.

`search` answers:

> What knowledge is relevant to this query?

`resolve` answers:

> Given this task, scope, scope, repository, and policy hierarchy, what guidance is effective?

Search may return multiple competing documents.

Resolution must preserve conflicts and explain precedence.

## Context packages

A task-specific package may include:

```yaml
effective_guidance:
  - id: AEP-P-016
    status: approved
    provenance: enterprise

recommended_patterns:
  - AEP-CTX-007

required_checks:
  - repository-defined test command

relevant_skills:
  - react-component

open_conflicts: []

references:
  - document: AEP-CODE-003
    sections:
      - Language specialization
```

## Bounded output

The caller should be able to specify or negotiate:

- maximum documents;
- maximum tokens/bytes;
- depth;
- include/exclude evidence;
- include historical material;
- minimum status.

## Reranking

Reranking may be useful when a broad candidate set exists, but should not be mandatory for exact-ID or highly structured lookups.

## Generated synthesis

If the service generates a summary, the summary is not the source of truth.

It must preserve citations/provenance to canonical material.

## Current recommendation

Expose both raw evidence and resolved/context-package operations. Do not hide all retrieval behind one opaque "ask the handbook" endpoint.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE — Context engineering, retrieval, memory, and durable state](../../harness/foundations/03-context-and-state.md)
