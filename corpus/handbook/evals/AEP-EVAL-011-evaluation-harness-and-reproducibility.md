---
schema_version: '1.0'
id: AEP-EVAL-011
title: Evaluation Harness and Reproducibility
summary: 'Evaluation Harness and Reproducibility. Focus: evaluation, repeatability.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- evaluation
- repeatability
scope:
- enterprise-global
related:
- AEP-EVAL-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-011-evaluation-harness-and-reproducibility.md
  original_sha256: 7f67e6d33daf8cc2d9125033dc875c0cdbdeecba86af1e1f86834829274b6fa4
  original_metadata_record: handbook/evals/AEP-EVAL-011-evaluation-harness-and-reproducibility.md
  authority: inherited-source-context
---

# AEP-EVAL-011 — Evaluation Harness and Reproducibility

## 1. Purpose
Evaluation infrastructure must make comparisons reproducible enough to support engineering decisions without pretending stochastic systems are perfectly deterministic.

## 2. Required run metadata
Record at minimum:
- task/dataset version;
- agent/harness version;
- model/provider/version or immutable identifier where available;
- reasoning/configuration parameters;
- tool and skill versions;
- prompt/instruction versions;
- retrieval/index version;
- sandbox image/environment;
- CPU/memory/resource limits;
- network policy;
- timestamps;
- random seeds where meaningful;
- grader versions.

## 3. Isolation
Each trial should start from a known state. Coding evals should use reproducible repositories/containers and reset mutated state between trials.

## 4. Provider-neutral core
the platform should own canonical task specifications, expected outcomes, run metadata, and result schema. Provider-specific eval products can be adapters rather than the source of truth.

This is especially important because vendor eval surfaces can change or be deprecated.

## 5. Artifact retention
Retain enough evidence to reproduce or audit important results:
- configuration;
- task fixture hash/version;
- grader outputs;
- outcome artifacts;
- traces where policy permits;
- aggregated metrics.

## 6. Minimal initial harness
Do not overbuild. Start with:

```text
task loader
runner
trace recorder
grader interface
result schema
comparison report
```

Add distributed execution, dashboards, and advanced scheduling only when workload requires them.

## References
- Anthropic, Quantifying infrastructure noise in agentic coding evals — https://www.anthropic.com/engineering/infrastructure-noise
- OpenAI, Evaluate agent workflows — https://developers.openai.com/api/docs/guides/agent-evals

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-006 — Variance, Statistics, and Confidence](AEP-EVAL-006-variance-statistics-and-confidence.md)
- [HARNESS-FOUNDATIONS-04-RELIABILITY-AND-EVALS — Guardrails, evaluation, telemetry, and failure handling](../../harness/foundations/04-reliability-and-evals.md)
