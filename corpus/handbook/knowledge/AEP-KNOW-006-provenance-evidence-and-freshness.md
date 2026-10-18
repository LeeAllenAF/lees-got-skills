---
schema_version: '1.0'
id: AEP-KNOW-006
title: Provenance, Evidence, and Freshness
summary: 'Provenance, Evidence, and Freshness. Focus: evidence lineage, freshness, provenance.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- evidence-lineage
- freshness
- provenance
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
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-006-provenance-evidence-and-freshness.md
  original_sha256: 6690a916253b5357352c7ef86958a29e498be504ad21a49e448b0f193833a690
  original_metadata_record: handbook/knowledge/AEP-KNOW-006-provenance-evidence-and-freshness.md
  authority: inherited-source-context
---

# Provenance, Evidence, and Freshness

## Principle

Every machine-delivered recommendation should be traceable to the material that justified it.

## Provenance record

A returned guidance item should expose enough information to answer:

- What source document did this come from?
- Which version?
- Which section?
- What scope?
- What maturity/status?
- What evidence supports it?
- When was it last reviewed?
- Is it stale or due for review?

## Freshness states

Possible derived states:

```text
current
review_due
stale
superseded
unknown
```

A stale document may still be historically useful but should not silently drive current recommendations.

## Evidence graph

Knowledge may point to:

```text
guidance
  ↓ supported_by
experiment
reference
production observation
decision
incident
```

Experiments may in turn supersede or weaken prior recommendations.

## Revalidation triggers

Freshness should support both scheduled and event-driven revalidation.

Events include:

- provider/model changes;
- MCP specification revisions;
- framework/tool releases;
- pricing changes;
- security advisories;
- repeated production failures;
- experiment results;
- scoped policy changes.

## Derived summaries

Summaries and embeddings inherit the freshness of their source material and must be invalidated when the source is superseded.

## Current recommendation

Freshness is part of query semantics. The service should be able to answer "show me current approved guidance" without relying on the model to inspect dates manually.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-REFERENCE-SOURCES — Source inventory and verification checklist](../../harness/reference/SOURCES.md)
