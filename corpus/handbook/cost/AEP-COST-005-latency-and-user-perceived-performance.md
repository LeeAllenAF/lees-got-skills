---
schema_version: '1.0'
id: AEP-COST-005
title: Latency and User-Perceived Performance
summary: 'Latency and User-Perceived Performance. Focus: latency, streaming.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- cost-performance
tags:
- latency
- streaming
scope:
- enterprise-global
related:
- AEP-COST-001
- AEP-MODEL-004
- AEP-AGENT-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/cost/AEP-COST-005-latency-and-user-perceived-performance.md
  original_sha256: 26885f157e58899705e490068b317ab605a3f6b709f7ed131a74ae014f90f154
  original_metadata_record: handbook/cost/AEP-COST-005-latency-and-user-perceived-performance.md
  authority: inherited-source-context
---

# AEP-COST-005 — Latency and User-Perceived Performance

## 1. Purpose
Users experience end-to-end delay, not token throughput. Optimize the critical path and perceived responsiveness rather than model latency alone.

## 2. Decompose latency
Track:

```text
queue time
model time-to-first-token
model generation time
tool latency
network latency
sandbox startup
handoff/synthesis time
human approval time
```

## 3. Tail latency
p95/p99 behavior matters for agent systems because retries, slow tools, and long reasoning tails can create severe outliers. Report both median and tail latency.

## 4. Interactive vs asynchronous classes
Classify workloads before optimizing:

### Interactive
Prioritize responsiveness and progressive feedback.

### Background
Prioritize throughput and economics; batching/flex processing may be preferable.

### Long-running agent task
Expose durable progress and resumability rather than blocking a synchronous request.

## 5. Make users wait less
Useful techniques include:

- streaming meaningful progress;
- parallelizing independent slow operations;
- prefetching predictable context;
- caching stable inputs;
- avoiding unnecessary model round trips;
- moving non-critical enrichment off the critical path.

Progress messages must reflect real state, not fabricated activity.

## 6. Recommendation
Define latency SLOs by task class and quality target. Never trade correctness or safety for speed without making that trade explicit.

## References
- OpenAI, Latency optimization — https://developers.openai.com/api/docs/guides/latency-optimization
- OpenAI, Cost optimization — https://developers.openai.com/api/docs/guides/cost-optimization

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-cost.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-COST-001 — Cost and Performance Engineering Fundamentals](AEP-COST-001-cost-and-performance-fundamentals.md)
- [AEP-MODEL-004 — Reasoning Effort and Test-Time Compute](../models/AEP-MODEL-004-reasoning-effort-and-test-time-compute.md)
- [AEP-AGENT-009 — Termination, Progress, and Recovery](../agents/AEP-AGENT-009-termination-progress-and-recovery.md)
