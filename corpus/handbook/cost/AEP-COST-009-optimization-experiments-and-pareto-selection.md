---
schema_version: '1.0'
id: AEP-COST-009
title: Optimization Experiments and Pareto Selection
summary: 'Optimization Experiments and Pareto Selection. Focus: experimentation, pareto optimization.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- cost-performance
tags:
- experimentation
- pareto-optimization
scope:
- enterprise-global
related:
- AEP-EVAL-006
- AEP-EVAL-007
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
  original_path: agentic-engineering-platform/handbook/cost/AEP-COST-009-optimization-experiments-and-pareto-selection.md
  original_sha256: bd5c5e55c2231e31440c97b2cc17522ae62b9493ca5ddcc0ae2a002dbcc604f6
  original_metadata_record: handbook/cost/AEP-COST-009-optimization-experiments-and-pareto-selection.md
  authority: inherited-source-context
---

# AEP-COST-009 — Optimization Experiments and Pareto Selection

## 1. Purpose
Optimization claims must be evaluated against representative tasks and repeated runs.

## 2. Multi-objective comparison
Report at least:

- success/quality;
- cost per attempt;
- cost per success;
- median and p95 latency;
- human intervention;
- reliability/variance.

## 3. Pareto frontier
A configuration is dominated if another configuration is no worse on all relevant objectives and better on at least one.

Prefer presenting the non-dominated frontier rather than declaring one universal winner.

## 4. Experiment isolation
Change one architectural variable at a time where possible:

```text
model
reasoning effort
retrieval depth
reranking
context strategy
parallelism
cache policy
tool design
```

Otherwise causal interpretation becomes weak.

## 5. Real workload weighting
Aggregate scores should reflect expected workload distribution. Avoid optimizing heavily for rare benchmark tasks at the expense of routine engineering work.

## 6. Optimization regression
A cost reduction is unacceptable when it causes meaningful degradation in safety, correctness, or maintainability outside the experiment's headline metric.

## 7. Recommendation
Promote an optimization into handbook guidance only after it improves the relevant quality/cost/latency frontier for representative workloads.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-cost.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-006 — Variance, Statistics, and Confidence](../evals/AEP-EVAL-006-variance-statistics-and-confidence.md)
- [AEP-EVAL-007 — Cost, Latency, and Efficiency Evaluation](../evals/AEP-EVAL-007-cost-latency-and-efficiency.md)
- [AEP-COST-001 — Cost and Performance Engineering Fundamentals](AEP-COST-001-cost-and-performance-fundamentals.md)
