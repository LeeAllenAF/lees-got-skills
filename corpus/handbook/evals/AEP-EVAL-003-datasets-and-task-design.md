---
schema_version: '1.0'
id: AEP-EVAL-003
title: Evaluation Datasets and Task Design
summary: 'Evaluation Datasets and Task Design. Focus: evaluation datasets, task design.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- evaluation-datasets
- task-design
scope:
- enterprise-global
related:
- AEP-EVAL-001
- AEP-CODE-014
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-003-datasets-and-task-design.md
  original_sha256: 60d3906721b5c46bd0c3072c9277859ce816e92ab39a48649650fbfd25e403fd
  original_metadata_record: handbook/evals/AEP-EVAL-003-datasets-and-task-design.md
  authority: inherited-source-context
---

# AEP-EVAL-003 — Evaluation Datasets and Task Design

## 1. Purpose
An eval suite is only as representative as its tasks. Dataset design should reflect the real distribution of work while deliberately including important edge, failure, and adversarial cases.

## 2. Dataset sources
Useful task sources include:
- anonymized production failures;
- historical bugs and incidents;
- representative enterprise workflows;
- domain-expert authored cases;
- synthetic variations validated by humans;
- public benchmarks used as external references.

## 3. Split the corpus
Maintain separate sets for:
- development/debugging;
- regression gating;
- capability exploration;
- hidden or holdout evaluation when gaming/overfitting is a concern.

Do not continuously tune against the same visible set and then treat that score as unbiased evidence.

## 4. Diversity requirements
For company-wide software guidance, include variation in:
- language/framework;
- repository size and age;
- architecture style;
- dependency management;
- task ambiguity;
- risk/blast radius;
- tool availability;
- documentation quality;
- greenfield vs legacy work.

## 5. Difficulty distribution
A useful suite contains easy, normal, hard, and pathological cases. If every task is currently solved near 100%, the suite provides little signal for capability improvement; if almost nothing succeeds, it provides weak regression signal.

## 6. Production representativeness
Track the difference between benchmark distribution and actual work. Public coding benchmarks are valuable comparators but must not substitute for the platform/scope-specific workloads.

## 7. Task versioning
Tasks are versioned artifacts. Changes to instructions, fixtures, tests, dependencies, or environments can invalidate historical comparisons and must be recorded.

## References
- OpenAI, Evaluation best practices — https://developers.openai.com/api/docs/guides/evaluation-best-practices
- OpenAI, Datasets — https://developers.openai.com/api/docs/guides/evaluation-getting-started
- SWE-bench Verified — https://www.swebench.com/verified.html

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-001 — Evaluation Fundamentals](AEP-EVAL-001-evaluation-fundamentals.md)
- [AEP-CODE-014 — Coding-Agent Lifecycle, Evaluation, and Freshness](../coding/AEP-CODE-014-coding-agent-lifecycle-evaluation-and-freshness.md)
