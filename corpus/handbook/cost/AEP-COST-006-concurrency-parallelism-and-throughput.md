---
schema_version: '1.0'
id: AEP-COST-006
title: Concurrency, Parallelism, and Throughput
summary: 'Concurrency, Parallelism, and Throughput. Focus: concurrency, throughput.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- cost-performance
tags:
- concurrency
- throughput
scope:
- enterprise-global
related:
- AEP-AGENT-004
- AEP-TOOL-008
- AEP-COST-005
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/cost/AEP-COST-006-concurrency-parallelism-and-throughput.md
  original_sha256: 8df4a10bae027976ffa90143e02a03a374b0deec9b4d0106783442e89ea1bfa9
  original_metadata_record: handbook/cost/AEP-COST-006-concurrency-parallelism-and-throughput.md
  authority: inherited-source-context
---

# AEP-COST-006 — Concurrency, Parallelism, and Throughput

## 1. Purpose
Parallelism is useful when work is independent and resources permit it. It is harmful when it duplicates work, increases contention, or creates coordination debt.

## 2. Parallelization test
Parallelize when:

- tasks are materially independent;
- dependencies are known;
- shared-state conflicts are controlled;
- result synthesis is bounded;
- provider/tool concurrency limits permit it;
- wall-time savings exceed coordination overhead.

## 3. Throughput vs latency
High throughput and low single-task latency are different goals. Batch/offline work may maximize throughput while intentionally increasing individual completion time.

## 4. Resource limits
Model APIs, databases, browsers, sandboxes, package registries, and client systems all have independent quotas. Concurrency policy should protect downstream services rather than merely maximize model utilization.

## 5. Backpressure
Use queues, concurrency caps, admission control, and cancellation. Do not allow a spike of agent fan-out to create an uncontrolled cost or service cascade.

## 6. Duplicate work
Before spawning parallel agents, define ownership and shared findings. Detect overlapping exploration when practical.

## 7. Recommendation
Use bounded parallelism and measure end-to-end wall time, total cost, duplicate effort, and failure rate together.

## References
- OpenAI, Latency optimization — https://developers.openai.com/api/docs/guides/latency-optimization
- Anthropic, Building a C compiler with a team of parallel Claudes — https://www.anthropic.com/engineering/building-c-compiler

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-cost.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-004 — Delegation, Subagents, and Parallelism](../agents/AEP-AGENT-004-delegation-subagents-and-parallelism.md)
- [AEP-TOOL-008 — Long-Running Tools and Tasks](../tools/AEP-TOOL-008-long-running-tools-and-tasks.md)
- [AEP-COST-005 — Latency and User-Perceived Performance](AEP-COST-005-latency-and-user-perceived-performance.md)
