---
schema_version: '1.0'
id: AEP-EVAL-004
title: Graders and Scoring
summary: 'Graders and Scoring. Focus: graders, scoring.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- graders
- scoring
scope:
- enterprise-global
related:
- AEP-EVAL-002
- AEP-EVAL-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-004-graders-and-scoring.md
  original_sha256: c47af3630ec90d623ae339d4d83a2a64aa39ffaa835135d7de365883fd3cc57c
  original_metadata_record: handbook/evals/AEP-EVAL-004-graders-and-scoring.md
  authority: inherited-source-context
---

# AEP-EVAL-004 — Graders and Scoring

## 1. Purpose
Graders translate success criteria into repeatable measurements. the platform should use the simplest grader that faithfully measures the requirement.

## 2. Grader hierarchy
Prefer:
1. deterministic code and state checks;
2. static analysis or domain validators;
3. structured reference comparison;
4. model-based graders for semantic/subjective properties;
5. human review for ambiguous, high-value, or calibration work.

## 3. LLM-as-judge
Model graders are useful for open-ended qualities that deterministic code cannot easily assess, but they must be calibrated against human labels. Known risks include position bias, verbosity bias, rubric ambiguity, correlated failure with the system being graded, and instability across model upgrades.

Where practical:
- prefer narrow criteria over vague holistic scores;
- use pairwise or categorical judgments when they are more reliable;
- randomize response order in pairwise comparisons;
- normalize for irrelevant length differences;
- retain examples for score levels;
- measure judge-human agreement.

## 4. Multi-grader design
A task can combine hard gates and soft quality metrics. Example:

```text
unit tests                 hard gate
security policy            hard gate
unnecessary diff size      metric
architecture quality       calibrated judge
cost                       metric
latency                    metric
```

## 5. Reward hacking
A grader is part of the system and can be gamed. Inspect unexpectedly high-scoring outputs, keep hidden cases where justified, and avoid proxy metrics that are easier to satisfy than the actual requirement.

## 6. Scoring policy
Do not collapse all dimensions into one score unless the weighting reflects an actual decision. Preserve component metrics so a system cannot hide a critical regression behind gains elsewhere.

## References
- OpenAI, Evaluation best practices — https://developers.openai.com/api/docs/guides/evaluation-best-practices
- OpenAI, Graders — https://developers.openai.com/api/docs/guides/graders
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-002 — Success Criteria and Outcome Verification](AEP-EVAL-002-success-criteria-and-outcome-verification.md)
- [AEP-EVAL-009 — Human Evaluation and Judge Calibration](AEP-EVAL-009-human-evaluation-and-judge-calibration.md)
