---
schema_version: '1.0'
id: AEP-EVAL-006
title: Variance, Statistics, and Confidence
summary: 'Variance, Statistics, and Confidence. Focus: repeatability, statistics.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- repeatability
- statistics
scope:
- enterprise-global
related:
- AEP-MODEL-009
- AEP-EVAL-011
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-006-variance-statistics-and-confidence.md
  original_sha256: 962adc4c7b2376aef8d1d904c4764b3ec29d23b40d0503a936fdee02d4845c4a
  original_metadata_record: handbook/evals/AEP-EVAL-006-variance-statistics-and-confidence.md
  authority: inherited-source-context
---

# AEP-EVAL-006 — Variance, Statistics, and Confidence

## 1. Purpose
Agent results are stochastic. A single trial is evidence about one run, not a reliable estimate of a system's expected behavior.

## 2. Repeated trials
For decisions where small differences matter, run repeated trials. Report:
- number of tasks;
- trials per task;
- success rate;
- dispersion/variance where applicable;
- confidence intervals or equivalent uncertainty;
- failure distribution, not just the mean.

## 3. Paired comparison
When comparing two configurations, use the same task set and environment. Paired analysis is generally more informative than comparing unrelated aggregate runs.

## 4. Infrastructure noise
Agentic coding results depend on CPU, memory, network, dependency availability, timeouts, sandbox behavior, and harness implementation. Environment differences can exceed the apparent performance difference between models.

Therefore, record and control infrastructure whenever the experiment claims comparative performance.

## 5. Practical significance
Statistical significance does not imply operational value. A 0.5% gain may not justify doubled cost; a small average gain may be extremely valuable if concentrated in high-risk tasks.

## 6. Recommendation
For major architecture/model changes, require both:
- evidence that the difference is unlikely to be noise; and
- evidence that the difference matters to the decision being made.

## References
- Anthropic, Quantifying infrastructure noise in agentic coding evals — https://www.anthropic.com/engineering/infrastructure-noise
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-MODEL-009 — Model Evaluation and Selection Benchmarks](../models/AEP-MODEL-009-model-evaluation-and-selection-benchmarks.md)
- [AEP-EVAL-011 — Evaluation Harness and Reproducibility](AEP-EVAL-011-evaluation-harness-and-reproducibility.md)
