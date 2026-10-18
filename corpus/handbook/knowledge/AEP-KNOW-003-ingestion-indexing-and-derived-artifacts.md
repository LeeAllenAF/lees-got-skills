---
schema_version: '1.0'
id: AEP-KNOW-003
title: Ingestion, Indexing, and Derived Artifacts
summary: 'Ingestion, Indexing, and Derived Artifacts. Focus: indexing, ingestion.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- indexing
- ingestion
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
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-003-ingestion-indexing-and-derived-artifacts.md
  original_sha256: 6004a318e71949c45852d5ed076f9d1509c83a0afb9e0b2cdaeb7ebe3914a7ca
  original_metadata_record: handbook/knowledge/AEP-KNOW-003-ingestion-indexing-and-derived-artifacts.md
  authority: inherited-source-context
---

# Ingestion, Indexing, and Derived Artifacts

## Purpose

Define how canonical documents become searchable machine artifacts.

## Pipeline

```text
source repository
   ↓
schema validation
   ↓
parse sections / metadata
   ↓
normalize relationships
   ↓
generate lexical index
   ↓
generate semantic index
   ↓
optional reranking metadata
   ↓
publish versioned index snapshot
```

## Derived artifacts are rebuildable

Indexes, embeddings, summaries, entity maps, and search caches are **derived**.

They must be reproducible from canonical source plus recorded configuration.

Never require manual edits to an embedding store to correct policy.

## Chunking

Chunking should preserve semantic structure:

- heading hierarchy;
- document ID;
- section path;
- status;
- scope;
- technologies;
- effective dates;
- source version.

Avoid anonymous fragments that cannot be traced back to a precise source section.

## Multiple indexes

A single vector index should not be assumed sufficient.

Potential indexes include:

```text
exact ID index
metadata/filter index
lexical/BM25 index
semantic embedding index
relationship graph
skill catalog
experiment/evidence index
```

## Incremental rebuilds

Incremental indexing is desirable, but correctness outranks rebuild speed.

The system must invalidate derived material when:

- source content changes;
- metadata changes;
- embedding configuration changes;
- chunking logic changes;
- access scope changes;
- status changes.

## Index version

Every published index snapshot should record:

```text
source commit/version
schema version
chunker version
embedding configuration
index build timestamp
```

## Current recommendation

Start with Markdown + validated metadata + lexical search. Add semantic retrieval and reranking only when experiments show value.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
