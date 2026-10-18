---
schema_version: '1.0'
id: AEP-KNOW-010
title: Knowledge Service Lifecycle, Versioning, and Revalidation
summary: 'Knowledge Service Lifecycle, Versioning, and Revalidation. Focus: knowledge management, lifecycle, versioning.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- knowledge-management
- lifecycle
- versioning
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
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-010-lifecycle-versioning-and-revalidation.md
  original_sha256: dc4dd56d1f4103ba046becb4eb96fcc312ea5fc0d93ebeb18cca51ff98ac214e
  original_metadata_record: handbook/knowledge/AEP-KNOW-010-lifecycle-versioning-and-revalidation.md
  authority: inherited-source-context
---

# Knowledge Service Lifecycle, Versioning, and Revalidation

## Principle

The knowledge service is living infrastructure built on living knowledge.

It must be able to change without losing historical traceability.

## Independently version

Track versions for:

```text
knowledge schema
canonical corpus
resolver rules
chunker
embedding configuration
reranker
index snapshot
MCP/API contract
provider adapters
```

Do not collapse these into one application version.

## Compatibility

A trace or experiment should be reproducible against the versions that produced it.

For important runs, record:

```text
source commit
index snapshot
schema version
resolver version
retrieval config
model/harness config
```

## Revalidation triggers

Revalidate when:

- the MCP spec changes;
- SDK behavior changes;
- retrieval models change;
- embedding/reranker versions change;
- schema changes;
- new scopes/consumers are added;
- security requirements change;
- important handbook guidance is superseded;
- production traces show repeated retrieval/resolution failures.

## Protocol evolution

Current MCP guidance includes a formal deprecation policy and independently versioned extensions. Provider adapters should therefore be treated as volatile edges with shorter review intervals than domain logic.

## Migration

Index/schema changes should support:

```text
build new snapshot
run eval suite
compare results
promote atomically
retain rollback snapshot
```

Avoid in-place opaque mutations when reproducibility matters.

## Simplification review

Periodically ask:

- Can a retrieval stage be removed?
- Is reranking still earning its cost?
- Are old provider workarounds obsolete?
- Can metadata replace model-based classification?
- Are unused MCP operations still necessary?

## Current recommendation

The domain model should evolve conservatively; indexes, models, and adapters may evolve rapidly behind evaluated contracts.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
