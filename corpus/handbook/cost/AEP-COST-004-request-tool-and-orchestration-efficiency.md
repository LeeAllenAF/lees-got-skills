---
schema_version: '1.0'
id: AEP-COST-004
title: Request, Tool, and Orchestration Efficiency
summary: 'Request, Tool, and Orchestration Efficiency. Focus: cost optimization, orchestration, tool use.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- cost-performance
tags:
- cost-optimization
- orchestration
- tool-use
scope:
- enterprise-global
related:
- AEP-TOOL-003
- AEP-TOOL-009
- AEP-AGENT-004
- AEP-COST-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/cost/AEP-COST-004-request-tool-and-orchestration-efficiency.md
  original_sha256: 65205c530ee1bd2b9ce1ece362db2e681e72f208bb6d1c9772ccece0b2d4afee
  original_metadata_record: handbook/cost/AEP-COST-004-request-tool-and-orchestration-efficiency.md
  authority: inherited-source-context
---

# AEP-COST-004 — Request, Tool, and Orchestration Efficiency

## 1. Purpose
Every model call, tool call, handoff, and coordination boundary adds latency, cost, and potential failure.

## 2. Reduce unnecessary round trips
Where semantics are predictable, combine deterministic work rather than asking the model to orchestrate every micro-step.

Examples:

```text
filter + sort + aggregate in code
instead of
model -> tool -> model -> tool -> model
```

## 3. Tool call economics
Measure:

- calls per successful task;
- repeated or redundant calls;
- bytes/tokens returned;
- latency distribution;
- external API charges;
- error/retry rate;
- cacheability.

A tool is inefficient if it routinely returns far more context than the model uses.

## 4. Multi-agent overhead
Subagents can reduce wall time for independent work, but they also duplicate model context and synthesis cost. Account for all child-agent usage when comparing architectures.

## 5. Fuse deterministic operations
When a workflow always performs the same sequence, implement it as deterministic application code or a domain-coherent tool unless there is value in model-directed branching.

## 6. Prefer one high-information call over many low-information calls
Do not mechanically minimize calls if doing so creates overloaded prompts or brittle tools. The target is useful work per round trip.

## 7. Recommendation
Instrument request and tool graphs. Optimize repeated communication and redundant orchestration before tuning token-level details.

## References
- OpenAI, Latency optimization — https://developers.openai.com/api/docs/guides/latency-optimization
- Anthropic, Advanced tool use — https://www.anthropic.com/engineering/advanced-tool-use

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-cost.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-003 — Tool Granularity and Composition](../tools/AEP-TOOL-003-tool-granularity-and-composition.md)
- [AEP-TOOL-009 — Tool Observability and Evaluation](../tools/AEP-TOOL-009-tool-observability-and-evaluation.md)
- [AEP-AGENT-004 — Delegation, Subagents, and Parallelism](../agents/AEP-AGENT-004-delegation-subagents-and-parallelism.md)
- [AEP-COST-001 — Cost and Performance Engineering Fundamentals](AEP-COST-001-cost-and-performance-fundamentals.md)
