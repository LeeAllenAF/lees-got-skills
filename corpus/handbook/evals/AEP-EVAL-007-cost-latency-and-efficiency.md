---
schema_version: '1.0'
id: AEP-EVAL-007
title: Cost, Latency, and Efficiency Evaluation
summary: 'Cost, Latency, and Efficiency Evaluation. Focus: cost optimization, evaluation, latency.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- cost-optimization
- evaluation
- latency
scope:
- enterprise-global
related:
- AEP-MODEL-005
- AEP-TOOL-009
- AEP-EVAL-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-007-cost-latency-and-efficiency.md
  original_sha256: 0261e55d88ee0ff2c08d91afd0e1cad547dfac340be283a9bf680a89fa28b62d
  original_metadata_record: handbook/evals/AEP-EVAL-007-cost-latency-and-efficiency.md
  authority: inherited-source-context
---

# AEP-EVAL-007 — Cost, Latency, and Efficiency Evaluation

## 1. Purpose
Correctness is not the only operational objective. Agent systems consume model tokens, tool calls, compute, network time, and human attention.

## 2. Metrics
Track where practical:
- input/output/reasoning tokens;
- cached vs uncached tokens;
- model spend;
- tool/API spend;
- wall-clock latency;
- model latency vs tool latency;
- calls and retries;
- human review time;
- cost per successful task;
- cost per escaped defect or failed task where estimable.

## 3. Normalize by success
Cheap failures are not efficient. Prefer metrics such as:

```text
cost per successful task
latency at target success rate
human minutes per accepted result
```

rather than raw average token cost alone.

## 4. Pareto analysis
When systems trade quality against cost/latency, report a frontier rather than one universal winner. Different workload classes can rationally choose different operating points.

## 5. Tail behavior
Track p90/p95 latency and high-cost outliers. Agent loops can have acceptable averages while occasionally entering expensive pathological trajectories.

## 6. Recommendation
Every experiment that proposes an optimization should report quality and cost/latency together unless one is provably irrelevant.

## References
- OpenAI, Agent evals — https://developers.openai.com/api/docs/guides/agent-evals
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-MODEL-005 — Model Routing Architecture](../models/AEP-MODEL-005-routing-architecture.md)
- [AEP-TOOL-009 — Tool Observability and Evaluation](../tools/AEP-TOOL-009-tool-observability-and-evaluation.md)
- [AEP-EVAL-001 — Evaluation Fundamentals](AEP-EVAL-001-evaluation-fundamentals.md)
