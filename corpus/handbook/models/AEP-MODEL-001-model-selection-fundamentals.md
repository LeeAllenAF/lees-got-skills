---
schema_version: '1.0'
id: AEP-MODEL-001
title: Model Selection Fundamentals
summary: 'Model Selection Fundamentals. Focus: cost optimization, model selection.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- cost-optimization
- model-selection
scope:
- enterprise-global
related:
- AEP-P-001
- AEP-P-009
- AEP-P-010
- AEP-BASE-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 45d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-001-model-selection-fundamentals.md
  original_sha256: baa97364987733cc002b21af795341a24e6945495989a36f5260e244f0fdf98b
  original_metadata_record: handbook/models/AEP-MODEL-001-model-selection-fundamentals.md
  authority: inherited-source-context
---

# AEP-MODEL-001 — Model Selection Fundamentals

## 1. Purpose

Model choice is an engineering decision across quality, cost, latency, capability, privacy, availability, and operational risk. the platform does not treat the largest or newest model as the automatic production default.

> **Select the least expensive model configuration that reliably satisfies the workload's quality and risk requirements.**

The word *configuration* is intentional: model family, reasoning effort, tool access, context strategy, and output constraints can all materially change performance.

## 2. Establish capability before optimizing

For a new workflow, first establish a quality ceiling using a highly capable configuration and representative tasks. Then test cheaper/faster configurations against that baseline.

This avoids two opposite errors:

- prematurely constraining a system around an inadequate model;
- paying frontier-model prices for work a smaller model performs equally well.

## 3. Selection dimensions

Evaluate at least:

- task success and correctness;
- reliability across repeated runs;
- tool-use competence;
- instruction following;
- context handling;
- latency, including tail latency;
- input/output/reasoning cost;
- availability and rate limits;
- modality requirements;
- privacy/data-residency requirements;
- provider/tool compatibility;
- operational stability.

## 4. Model size is not the architecture

Avoid reasoning such as:

```text
small model = cheap task
large model = hard task
```

A better formulation is:

```text
workload requirements
      +
observed model behavior
      +
risk / cost / latency constraints
      ↓
model configuration
```

Some small models are excellent at classification, extraction, ranking, or focused code edits. Some larger models may offer little incremental value for those workloads.

## 5. Separate model choice from orchestration

A workflow may use one model for every step, or multiple models where specialization is measured to help. Do not create multiple model roles merely because the workflow has multiple conceptual roles.

## 6. Prefer explicit production configuration

Production agents should pin or explicitly resolve their intended model/configuration rather than silently inheriting SDK defaults. Record model identifiers, relevant effort settings, and compatibility assumptions in traces and evaluations.

## 7. Initial platform guidance

1. Establish a high-quality baseline first.
2. Evaluate lighter configurations on the same representative tasks.
3. Keep the cheapest configuration that meets the defined quality/risk bar.
4. Re-evaluate after meaningful model or harness changes.
5. Never infer superiority from model size, price, or benchmark reputation alone.

## 8. Failure modes

- frontier-by-default spending;
- benchmark-driven selection without workload evals;
- changing model and harness simultaneously;
- relying on provider aliases without recording resolved versions;
- evaluating only mean latency and ignoring tail latency;
- routing by cost while omitting failure cost.

## References

- OpenAI, Model selection — https://developers.openai.com/api/docs/guides/model-selection
- OpenAI, A practical guide to building AI agents — https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- Google Cloud, Choose your agentic AI architecture components — https://docs.cloud.google.com/architecture/choose-agentic-ai-architecture-components
- Anthropic, Building effective agents — https://www.anthropic.com/engineering/building-effective-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-BASE-001 — Baseline Knowledge Inventory](../foundations/AEP-BASE-001-baseline-knowledge-inventory.md)
- [HARNESS-CODEX-SDK-01-SDK-FOUNDATIONS — Codex TypeScript SDK foundations](../../harness/codex-sdk/01-sdk-foundations.md)
