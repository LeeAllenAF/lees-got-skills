---
schema_version: '1.0'
id: AEP-EVAL-001
title: Evaluation Fundamentals
summary: 'Evaluation Fundamentals. Focus: evaluation, verification.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- evaluation
- verification
scope:
- enterprise-global
related:
- AEP-P-017
- AEP-CODE-014
- AEP-AGENT-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-001-evaluation-fundamentals.md
  original_sha256: 7dc229f361d187f325e427376971a52af01e1bcf89d50d926be43075de5b18a4
  original_metadata_record: handbook/evals/AEP-EVAL-001-evaluation-fundamentals.md
  authority: inherited-source-context
---

# AEP-EVAL-001 — Evaluation Fundamentals

## 1. Purpose
Evaluation converts agent engineering from intuition into evidence. An eval is not merely a benchmark score; it is a repeatable mechanism for deciding whether a system satisfies a defined requirement under a defined environment.

## 2. Core principle
**Evaluate the system that will actually be used.** For an agent, the evaluated unit is usually the model plus instructions, tools, retrieval, harness, environment, permissions, retries, and verification policy.

A model-only score is useful evidence, but it is not automatically evidence about the deployed agent.

## 3. Outcome first, trace second
the platform should separate two questions:

1. **Outcome:** Did the task actually succeed in the environment?
2. **Process:** Did the agent reach that outcome safely, efficiently, and according to policy?

For coding agents, executable end-state checks are usually stronger than textual self-reports. Trace grading is then used to diagnose tool choice, handoffs, retries, policy violations, and wasted work.

## 4. Evaluation dimensions
At minimum, consider:
- correctness and task completion;
- safety and authority compliance;
- regression risk;
- robustness across repeated trials;
- token and monetary cost;
- wall-clock latency;
- tool and model-call counts;
- human intervention;
- unnecessary changes or side effects.

## 5. Eval-driven development
New capabilities should increasingly be specified by examples and success criteria before they are considered mature. Early manual testing is acceptable, but recurring behavior should move toward repeatable evaluation as soon as it influences architecture or production commitments.

## 6. Living knowledge
Eval failures are candidate knowledge. A recurring production failure should be eligible to become:

```text
production observation
      ↓
reproducible eval task
      ↓
fix / experiment
      ↓
regression protection
      ↓
handbook guidance
```

## 7. Anti-patterns
- vibe-based acceptance;
- one successful demo treated as proof;
- measuring only final text when environment state matters;
- comparing models under different harnesses without documenting the difference;
- using one aggregate score to hide severe failure classes;
- allowing the eval suite to remain static while production behavior changes.

## References
- OpenAI, Evaluate agent workflows — https://developers.openai.com/api/docs/guides/agent-evals
- OpenAI, Evaluation best practices — https://developers.openai.com/api/docs/guides/evaluation-best-practices
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-CODE-014 — Coding-Agent Lifecycle, Evaluation, and Freshness](../coding/AEP-CODE-014-coding-agent-lifecycle-evaluation-and-freshness.md)
- [AEP-AGENT-010 — Multi-Agent Evaluation, Lifecycle, and Freshness](../agents/AEP-AGENT-010-multi-agent-lifecycle-evaluation-and-freshness.md)
- [HARNESS-FOUNDATIONS-04-RELIABILITY-AND-EVALS — Guardrails, evaluation, telemetry, and failure handling](../../harness/foundations/04-reliability-and-evals.md)
