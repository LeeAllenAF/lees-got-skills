---
schema_version: '1.0'
id: AEP-EVAL-002
title: Success Criteria and Outcome Verification
summary: 'Success Criteria and Outcome Verification. Focus: success criteria, verification.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- success-criteria
- verification
scope:
- enterprise-global
related:
- AEP-EVAL-001
- AEP-CODE-008
- AEP-AGENT-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-002-success-criteria-and-outcome-verification.md
  original_sha256: 579fd1e27d325e2e8d81f3577cf40d1c2a73b82a70c7bd0b1d04e5f7dc0ec13a
  original_metadata_record: handbook/evals/AEP-EVAL-002-success-criteria-and-outcome-verification.md
  authority: inherited-source-context
---

# AEP-EVAL-002 — Success Criteria and Outcome Verification

## 1. Purpose
A useful eval begins with an observable definition of success. The desired end state should be specified independently from whatever explanation the model gives about its own performance.

## 2. Outcome hierarchy
Prefer the strongest available evidence:

```text
real environment state
    ↓
executable tests / invariants
    ↓
structured assertions
    ↓
reference comparison
    ↓
model judgment
    ↓
human subjective review
```

This is not a value judgment about humans; it reflects reproducibility and automation. Subjective product quality may legitimately require human review.

## 3. Multi-dimensional success
A task may have multiple independent assertions. Example for a code change:
- requested behavior works;
- prior behavior remains intact;
- tests pass;
- no prohibited files changed;
- security policy remains satisfied;
- migration is reversible or explicitly approved;
- output is within cost/latency budget.

Passing one assertion must not mask failing another.

## 4. Partial credit
Use partial scores only where gradations are meaningful. Safety-critical requirements, destructive-operation constraints, and mandatory policy checks are often better represented as hard gates.

## 5. Outcome loopholes
Agents can discover unexpected paths that satisfy a brittle grader while violating intent. Graders should therefore encode the real requirement rather than proxies whenever practical, and suspiciously high scores should be inspected for reward hacking.

## 6. Recommendation
Every production-relevant eval task should declare:
- task intent;
- expected observable outcome;
- hard constraints;
- optional quality criteria;
- failure conditions;
- allowed tools/authority;
- environment assumptions.

## References
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- OpenAI, Evaluation best practices — https://developers.openai.com/api/docs/guides/evaluation-best-practices

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-001 — Evaluation Fundamentals](AEP-EVAL-001-evaluation-fundamentals.md)
- [AEP-CODE-008 — Testing and Verification](../coding/AEP-CODE-008-testing-and-verification.md)
- [AEP-AGENT-009 — Termination, Progress, and Recovery](../agents/AEP-AGENT-009-termination-progress-and-recovery.md)
