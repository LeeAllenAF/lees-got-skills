---
schema_version: '1.0'
id: AEP-COST-002
title: Cost Accounting and Unit Economics
summary: 'Cost Accounting and Unit Economics. Focus: cost accounting, observability.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- cost-performance
tags:
- cost-accounting
- observability
scope:
- enterprise-global
related:
- AEP-COST-001
- AEP-EVAL-007
- AEP-TOOL-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/cost/AEP-COST-002-cost-accounting-and-unit-economics.md
  original_sha256: f261279be08aadb28f63705ad5f3ecf168989f503d5fc7a6ac39f9ac09387158
  original_metadata_record: handbook/cost/AEP-COST-002-cost-accounting-and-unit-economics.md
  authority: inherited-source-context
---

# AEP-COST-002 — Cost Accounting and Unit Economics

## 1. Purpose
Agent systems have more cost centers than model tokens. Cost accounting should make the whole task economically visible.

## 2. Cost taxonomy
Track where material:

### Model cost
- uncached input;
- cache writes;
- cached input reads;
- output and reasoning tokens;
- subagent calls;
- retries and failed trajectories.

### Tool and infrastructure cost
- search, browser, database, SaaS, and MCP calls;
- sandbox/runtime compute;
- storage and indexing;
- embedding/reranking jobs;
- network or egress charges;
- queues, orchestration, and background workers.

### Human cost
- approval time;
- review and repair;
- incident response;
- evaluation and maintenance effort.

## 3. Required attribution
Costs should be attributable to useful dimensions such as:

```text
client
workspace/repository
workflow
task class
model/configuration
agent/subagent
tool
experiment/version
```

Avoid cross-scope accounting ambiguity.

## 4. Unit economics
Useful normalized metrics include:

```text
cost / successful task
cost / merged change
cost / resolved incident
cost / accepted review finding
human minutes / accepted output
retry cost / task
wasted spend / abandoned trajectory
```

## 5. Marginal cost
When evaluating an added component, measure incremental value and incremental cost. A reranker, critic, subagent, or larger model must justify its marginal cost rather than merely improve a local metric.

## 6. Cost attribution for shared infrastructure
Shared indexes, cached prompts, and persistent services should be accounted separately from marginal request cost. For enterprise engineering work, distinguish:

```text
fixed platform cost
+ shared operating cost
+ scope-specific marginal cost
```

## 7. Recommendation
Build cost accounting from traces and provider usage fields rather than estimates alone. Estimated prices are useful for planning, but production decisions should rely on realized cost per outcome.

## References
- OpenAI, Observability and usage — https://developers.openai.com/api/docs/guides/agents-api/observability
- OpenAI, Cost optimization — https://developers.openai.com/api/docs/guides/cost-optimization

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-cost.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-COST-001 — Cost and Performance Engineering Fundamentals](AEP-COST-001-cost-and-performance-fundamentals.md)
- [AEP-EVAL-007 — Cost, Latency, and Efficiency Evaluation](../evals/AEP-EVAL-007-cost-latency-and-efficiency.md)
- [AEP-TOOL-009 — Tool Observability and Evaluation](../tools/AEP-TOOL-009-tool-observability-and-evaluation.md)
