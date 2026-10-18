---
schema_version: '1.0'
id: AEP-MODEL-007
title: Provider Portability, Fallbacks, and Resilience
summary: 'Provider Portability, Fallbacks, and Resilience. Focus: fallbacks, provider portability.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- fallbacks
- provider-portability
scope:
- enterprise-global
related:
- AEP-P-015
- AEP-MODEL-001
- AEP-TOOL-002
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-007-provider-portability-fallbacks-and-resilience.md
  original_sha256: 1ff5539820c3880ae3122f80072f0d91943d0479fa9acf14bddfcd5d3cc04d88
  original_metadata_record: handbook/models/AEP-MODEL-007-provider-portability-fallbacks-and-resilience.md
  authority: inherited-source-context
---

# AEP-MODEL-007 — Provider Portability, Fallbacks, and Resilience

## 1. Purpose

Portability is valuable, but fake portability is expensive. the platform should preserve portable domain knowledge and contracts while allowing provider-specific optimizations where they provide measurable benefit.

## 2. Separate capability from provider adapter

```text
workflow intent
   ↓
model capability contract
   ↓
provider/model adapter
```

Do not reduce every provider to a lowest-common-denominator API if that sacrifices important capabilities.

## 3. Fallback categories

- availability fallback;
- rate-limit/capacity fallback;
- regional/compliance fallback;
- capability fallback;
- cost/budget fallback.

Fallbacks should not silently change the semantic contract of the workflow.

## 4. Validate fallback equivalence

A fallback model should be evaluated on the tasks it may actually receive. "Supports text and tools" is insufficient evidence of behavioral equivalence.

## 5. Cross-provider differences matter

Potential differences include:

- tool-call semantics;
- reasoning controls;
- context behavior;
- structured-output behavior;
- caching;
- safety behavior;
- rate limits;
- observability;
- data-retention controls.

Adapters should surface meaningful differences rather than hide them.

## 6. Failure policy

For high-risk operations, fail closed when no approved model configuration is available. For low-risk read-only tasks, degraded fallback may be acceptable if visible in traces and user experience.

## 7. Initial platform guidance

Design for replaceability, not forced interchangeability. Keep organizational knowledge and workflow intent portable while testing each provider/model configuration as a distinct runtime dependency.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-MODEL-001 — Model Selection Fundamentals](AEP-MODEL-001-model-selection-fundamentals.md)
- [AEP-TOOL-002 — Tool Contracts and Schemas](../tools/AEP-TOOL-002-tool-contracts-and-schemas.md)
