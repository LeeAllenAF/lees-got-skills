---
schema_version: '1.0'
id: AEP-EVAL-009
title: Human Evaluation and Judge Calibration
summary: 'Human Evaluation and Judge Calibration. Focus: human evaluation, judge calibration.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- human-evaluation
- judge-calibration
scope:
- enterprise-global
related:
- AEP-EVAL-004
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-009-human-evaluation-and-judge-calibration.md
  original_sha256: 160cb958e2cd858de19297ad3a7083ba426d1bd153f62ea5f8d5bf734117068a
  original_metadata_record: handbook/evals/AEP-EVAL-009-human-evaluation-and-judge-calibration.md
  authority: inherited-source-context
---

# AEP-EVAL-009 — Human Evaluation and Judge Calibration

## 1. Purpose
Human evaluation supplies domain intent and calibrates automated graders. It is especially important when quality is subjective, consequences are high, or the grader itself is being changed.

## 2. Rubric design
Rubrics should:
- define criteria separately;
- show examples at important score levels;
- identify hard-fail conditions;
- avoid vague labels like “good” without observable meaning;
- allow “insufficient evidence” when appropriate.

## 3. Agreement
Measure reviewer agreement on a calibration subset. Disagreement can indicate ambiguous requirements rather than reviewer error.

Use adjudication for consequential cases and update the rubric when disagreement reveals unclear criteria.

## 4. Calibrating model judges
Before scaling an LLM grader:
1. build a human-labeled reference set;
2. measure agreement and failure patterns;
3. test order/verbosity sensitivity;
4. re-check calibration when the judge model changes;
5. retain periodic human audit samples.

## 5. Blind comparison
Where possible, hide model/provider identity from human judges and randomize candidate order to reduce expectation bias.

## 6. Recommendation
Automated judges may replace large volumes of repetitive human scoring only after agreement is demonstrated for the exact rubric/workload. Human review remains the authority for redefining what the rubric should mean.

## References
- OpenAI, Evaluation best practices — https://developers.openai.com/api/docs/guides/evaluation-best-practices
- OpenAI, Datasets — https://developers.openai.com/api/docs/guides/evaluation-getting-started

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-004 — Graders and Scoring](AEP-EVAL-004-graders-and-scoring.md)
