---
schema_version: '1.0'
id: AEP-EVAL-012
title: Evaluation Lifecycle, Benchmark Hygiene, and Freshness
summary: 'Evaluation Lifecycle, Benchmark Hygiene, and Freshness. Focus: benchmark hygiene, lifecycle.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- benchmark-hygiene
- lifecycle
scope:
- enterprise-global
related:
- AEP-P-017
- AEP-EVAL-003
- AEP-EVAL-008
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-012-evaluation-lifecycle-benchmark-hygiene-and-freshness.md
  original_sha256: c435a55c0f0ecc750248b343adb8c375f65361434a1bc52a340176b23f8f88c5
  original_metadata_record: handbook/evals/AEP-EVAL-012-evaluation-lifecycle-benchmark-hygiene-and-freshness.md
  authority: inherited-source-context
---

# AEP-EVAL-012 — Evaluation Lifecycle, Benchmark Hygiene, and Freshness

## 1. Purpose
Eval suites themselves become stale. Models improve, production distributions shift, tools change, tasks leak into training data, and formerly discriminating tests saturate.

## 2. Living-eval lifecycle
Each suite should track:
- owner;
- purpose;
- source population;
- last review;
- expected review interval;
- task/version history;
- saturation indicators;
- known contamination risk;
- replacement/deprecation criteria.

## 3. Revalidation triggers
Review a suite when:
- scores approach ceiling/floor;
- a major model generation changes;
- agent architecture changes;
- production traffic shifts;
- a benchmark becomes widely optimized against;
- dependencies/environment materially change;
- grader-human agreement degrades;
- new security failure classes emerge.

## 4. Benchmark hygiene
Public benchmarks are useful external anchors but should not become the sole basis for internal decisions. Record benchmark version, harness, environment, and whether the tested system could have been explicitly optimized for the benchmark.

## 5. Preventing test overfitting
Maintain holdouts where useful, rotate tasks, derive fresh cases from production, and distinguish exploratory tuning sets from final comparison sets.

## 6. Knowledge promotion
Experiment results should update handbook status only when:
- methodology is documented;
- evidence is relevant to the stated scope;
- uncertainty/limitations are preserved;
- conflicting evidence is recorded;
- revalidation conditions are defined.

## 7. Vendor-tool freshness
Vendor eval products are implementation choices, not handbook foundations. For example, OpenAI's legacy Evals platform is scheduled for shutdown on November 30, 2026; the platform guidance should therefore describe evaluation concepts and portable artifacts rather than couple organizational knowledge to one product surface.

## References
- OpenAI, Deprecations — https://developers.openai.com/api/docs/deprecations
- OpenAI, Evaluation best practices — https://developers.openai.com/api/docs/guides/evaluation-best-practices
- Anthropic, Designing AI-resistant technical evaluations — https://www.anthropic.com/engineering/AI-resistant-technical-evaluations
- SWE-bench Verified — https://www.swebench.com/verified.html

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-EVAL-003 — Evaluation Datasets and Task Design](AEP-EVAL-003-datasets-and-task-design.md)
- [AEP-EVAL-008 — Capability, Regression, and Release Gates](AEP-EVAL-008-capability-regression-and-release-gates.md)
