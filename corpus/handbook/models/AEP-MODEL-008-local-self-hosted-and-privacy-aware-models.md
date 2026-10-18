---
schema_version: '1.0'
id: AEP-MODEL-008
title: Local, Self-Hosted, and Privacy-Aware Models
summary: 'Local, Self-Hosted, and Privacy-Aware Models. Focus: privacy, self hosted models.'
type: guidance
status: provisional
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- privacy
- self-hosted-models
scope:
- enterprise-global
related:
- AEP-MODEL-003
- AEP-MODEL-007
- AEP-TOOL-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-008-local-self-hosted-and-privacy-aware-models.md
  original_sha256: 35f134b521ee9fd93c0b55a6d5447cc9ee59d3d49934ba40b3ebafdd3f45091f
  original_metadata_record: handbook/models/AEP-MODEL-008-local-self-hosted-and-privacy-aware-models.md
  authority: inherited-source-context
---

# AEP-MODEL-008 — Local, Self-Hosted, and Privacy-Aware Models

## 1. Purpose

Local/self-hosted inference can be justified by privacy, data residency, offline operation, predictable capacity, customization, or economics at sufficient scale. It should not be recommended merely because it is technically possible.

## 2. Decision dimensions

Evaluate:

- quality on representative tasks;
- hardware/capacity requirements;
- concurrency;
- latency distribution;
- model loading/cold start;
- quantization impact;
- operational staffing;
- patching/security;
- data residency;
- licensing;
- total cost of ownership.

## 3. Good candidate roles

Self-hosted models may be attractive for:

- embeddings;
- reranking;
- classification;
- sensitive local retrieval;
- high-volume bounded transformations;
- offline development environments.

General-purpose autonomous coding is a higher bar and should be benchmarked directly.

## 4. Privacy is architectural

A local model does not automatically make a system private. Tool calls, telemetry, vector databases, logs, traces, backups, and external services may still move sensitive data.

## 5. Hybrid deployment

A useful pattern may be:

```text
local deterministic/small-model preprocessing
        ↓
policy / redaction / retrieval
        ↓
hosted frontier reasoning only when allowed/needed
```

This should be driven by scoped requirements and measured workload needs.

## 6. Initial platform guidance

Do not steer teams toward self-hosting without a clear requirement or economic case. Treat local inference as one deployment option within the same evaluation framework used for hosted models.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-MODEL-003 — Small and Specialized Models](AEP-MODEL-003-small-and-specialized-models.md)
- [AEP-MODEL-007 — Provider Portability, Fallbacks, and Resilience](AEP-MODEL-007-provider-portability-fallbacks-and-resilience.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
