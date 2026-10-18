---
schema_version: '1.0'
id: AEP-MODEL-006
title: Cascades, Escalation, and Rescue
summary: 'Cascades, Escalation, and Rescue. Focus: fallbacks, model cascades.'
type: guidance
status: provisional
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- fallbacks
- model-cascades
scope:
- enterprise-global
related:
- AEP-P-010
- AEP-MODEL-005
- AEP-MODEL-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 45d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-006-cascades-escalation-and-rescue.md
  original_sha256: cb2fb648d17cbfa66f8db020174ce7d55c4816039c424088ea6a9b5ad76b7489
  original_metadata_record: handbook/models/AEP-MODEL-006-cascades-escalation-and-rescue.md
  authority: inherited-source-context
---

# AEP-MODEL-006 — Cascades, Escalation, and Rescue

## 1. Purpose

A cascade begins with a cheaper/faster configuration and escalates selected requests. The goal is not merely to reduce cost; it is to preserve required quality while avoiding unnecessary expensive inference.

## 2. Common cascade patterns

### Pre-execution routing
Choose the model before attempting the task.

### Failure-triggered escalation
Escalate after deterministic validation fails or a bounded attempt budget is exhausted.

### Uncertainty-triggered escalation
Escalate when a calibrated signal predicts unacceptable error risk.

### Rescue routing
Escalate when the stronger model is predicted to improve the current result, not merely because the first model appears uncertain.

## 3. Prefer external evidence over self-confidence

Useful escalation signals include:

- compilation/test failure;
- invalid schema;
- unresolved tool errors;
- missing required evidence;
- objective grader failure;
- repeated non-progress;
- calibrated router score.

Model-generated confidence alone is generally too weak to be the sole escalation signal unless calibrated for the workload.

## 4. Bounded escalation

Define limits:

```text
attempt budget
model ladder
reasoning-effort ceiling
wall-clock ceiling
cost ceiling
human escalation condition
```

Do not create open-ended "keep trying stronger things" loops.

## 5. Preserve state across escalation

Escalation should transfer:

- goal;
- constraints;
- verified discoveries;
- failed attempts;
- test/tool evidence;
- current workspace state.

Do not transfer every speculative conclusion as fact.

## 6. Evaluate expected rescue value

A good escalation policy answers:

> Of the requests we escalated, how often did escalation actually fix or materially improve the result?

Track both **missed rescues** and **wasted escalations**.

## References

- OpenAI, A practical guide to building AI agents — https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- Kotte, UCCI: Calibrated Uncertainty for Cost-Optimal LLM Cascade Routing — https://arxiv.org/abs/2605.18796
- Wang et al., Signed Rescue Routing — https://arxiv.org/abs/2609.07786

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-MODEL-005 — Model Routing Architecture](AEP-MODEL-005-routing-architecture.md)
- [AEP-MODEL-009 — Model Evaluation and Selection Benchmarks](AEP-MODEL-009-model-evaluation-and-selection-benchmarks.md)
