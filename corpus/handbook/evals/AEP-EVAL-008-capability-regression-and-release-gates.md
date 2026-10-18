---
schema_version: '1.0'
id: AEP-EVAL-008
title: Capability, Regression, and Release Gates
summary: 'Capability, Regression, and Release Gates. Focus: regression testing, release gates.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- regression-testing
- release-gates
scope:
- enterprise-global
related:
- AEP-P-017
- AEP-EVAL-003
- AEP-EVAL-012
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-008-capability-regression-and-release-gates.md
  original_sha256: 2124bd8b87a9c62ace49621003bf108c32a714426fc4407386b649f59a21f1a2
  original_metadata_record: handbook/evals/AEP-EVAL-008-capability-regression-and-release-gates.md
  authority: inherited-source-context
---

# AEP-EVAL-008 — Capability, Regression, and Release Gates

## 1. Purpose
Capability tests and regression tests serve different purposes.

- **Capability evals** ask what the system can do and may intentionally begin with low pass rates.
- **Regression evals** protect behavior that is expected to remain stable.

## 2. Promotion path
A useful lifecycle is:

```text
new behavior
   ↓
capability eval
   ↓
reliable enough for product use
   ↓
selected cases promoted to regression suite
```

## 3. Release gates
Not all metrics should block releases. Define:
- hard blockers (security, authority, critical correctness);
- bounded regression tolerances;
- advisory metrics;
- cost/latency budgets;
- explicit exception process.

## 4. Change-specific suites
Model upgrade, prompt change, skill change, retrieval change, and tool schema change may need different targeted suites. Running everything on every commit may be wasteful; use layered CI where appropriate.

## 5. Canary and production monitoring
Offline evals cannot fully represent production. For consequential changes, combine pre-release evals with controlled rollout, trace monitoring, user feedback, and rollback criteria.

## 6. Recommendation
Every recurring production defect should be considered for conversion into a regression case if it can be reproduced safely and without retaining sensitive scoped data.

## References
- OpenAI, Evaluation best practices — https://developers.openai.com/api/docs/guides/evaluation-best-practices
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-EVAL-003 — Evaluation Datasets and Task Design](AEP-EVAL-003-datasets-and-task-design.md)
- [AEP-EVAL-012 — Evaluation Lifecycle, Benchmark Hygiene, and Freshness](AEP-EVAL-012-evaluation-lifecycle-benchmark-hygiene-and-freshness.md)
