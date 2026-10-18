---
schema_version: '1.0'
id: AEP-MODEL-005
title: Model Routing Architecture
summary: 'Model Routing Architecture. Focus: model routing, model selection.'
type: guidance
status: provisional
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- model-routing
- model-selection
scope:
- enterprise-global
related:
- AEP-MODEL-001
- AEP-MODEL-002
- AEP-MODEL-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 45d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-005-routing-architecture.md
  original_sha256: ce661e72873cf9d982e2590745927f68731f0c095b352f954ddd7ce19ddaca4d
  original_metadata_record: handbook/models/AEP-MODEL-005-routing-architecture.md
  authority: inherited-source-context
---

# AEP-MODEL-005 — Model Routing Architecture

## 1. Purpose

Routing selects a model/configuration for a request or subtask. It is justified when workloads vary enough that a single configuration is materially inefficient or inadequate.

## 2. Routing signals

Potential signals include:

- deterministic task type;
- requested modality;
- context volume;
- tool requirements;
- risk class;
- latency SLO;
- budget;
- prior failures;
- small-model uncertainty;
- learned predicted quality;
- expected incremental gain from escalation.

## 3. Router types

```text
static policy
rules / heuristics
classifier
small LLM router
learned quality predictor
uncertainty router
cascade / rescue router
hybrid policy
```

Start with the simplest router whose behavior can be understood and evaluated.

## 4. Route on expected utility, not prestige

A useful conceptual objective:

```text
utility = expected quality gain
          - inference cost
          - latency cost
          - operational/risk penalty
```

For safety-critical work, constraints may dominate the utility function; some tasks may require a minimum model class or human approval regardless of cost.

## 5. Difficulty is an imperfect proxy

"Hard query" routing is useful but incomplete. The critical question is whether another model is expected to improve the outcome. Recent research on rescue routing explicitly distinguishes small-model failure from incremental benefit of escalation.

## 6. Routing must be observable

Trace:

- router inputs/features;
- chosen model/configuration;
- alternatives considered where available;
- escalation reason;
- outcome;
- cost and latency.

Otherwise routing regressions are difficult to diagnose.

## 7. Initial platform guidance

Use deterministic routing first where task classes are obvious. Introduce learned/uncertainty routing only when workload volume and measurable savings justify it.

## References

- Anthropic, Building effective agents — https://www.anthropic.com/engineering/building-effective-agents
- Google Cloud, Choose your agentic AI architecture components — https://docs.cloud.google.com/architecture/choose-agentic-ai-architecture-components
- Moslem & Kelleher, Dynamic Model Routing and Cascading for Efficient LLM Inference — https://arxiv.org/abs/2603.04445
- Wang et al., Signed Rescue Routing — https://arxiv.org/abs/2609.07786

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-MODEL-001 — Model Selection Fundamentals](AEP-MODEL-001-model-selection-fundamentals.md)
- [AEP-MODEL-002 — Capability Profiles and Task Classes](AEP-MODEL-002-capability-profiles-and-task-classes.md)
- [AEP-MODEL-006 — Cascades, Escalation, and Rescue](AEP-MODEL-006-cascades-escalation-and-rescue.md)
