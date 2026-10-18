---
schema_version: '1.0'
id: AEP-MODEL-002
title: Capability Profiles and Task Classes
summary: 'Capability Profiles and Task Classes. Focus: model capabilities, task design.'
type: guidance
status: provisional
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- model-capabilities
- task-design
scope:
- enterprise-global
related:
- AEP-MODEL-001
- AEP-TOOL-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 45d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-002-capability-profiles-and-task-classes.md
  original_sha256: d17120a52d967f6f35e1b1829b18ac662b8808140054d9c51562417b1cb03aad
  original_metadata_record: handbook/models/AEP-MODEL-002-capability-profiles-and-task-classes.md
  authority: inherited-source-context
---

# AEP-MODEL-002 — Capability Profiles and Task Classes

## 1. Purpose

A router needs a useful description of both the task and the candidate models. the platform should maintain workload-specific capability profiles rather than universal labels such as "smart", "fast", or "coding model".

## 2. Task classes

A starting software-engineering taxonomy:

```text
classification / routing
extraction / transformation
retrieval / ranking
small deterministic edit
localized code generation
repository exploration
debugging
multi-file feature work
architecture / design
review / verification
security-sensitive analysis
long-horizon autonomous execution
```

Task classes may include modifiers:

```text
ambiguity
context volume
tool dependence
number of steps
reversibility
risk
latency sensitivity
required modality
verification strength
```

## 3. Capability profiles

For each candidate model/configuration, track observed performance in dimensions that matter to the workload:

- planning;
- coding/edit quality;
- tool selection;
- recovery after failures;
- schema adherence;
- long-context behavior;
- visual reasoning;
- latency;
- cost;
- variance;
- security/authority adherence.

Profiles are empirical and versioned.

## 4. Avoid static stereotypes

Do not encode permanent assumptions such as:

> Small models cannot use tools.

or:

> Reasoning models are always better at coding.

Model generations can invalidate these assumptions quickly. Capability profiles must be linked to dated eval results.

## 5. Model configuration as a point, not a name

Treat these as potentially different candidates:

```text
Model A / low effort
Model A / medium effort
Model A / high effort
Model B / medium effort
```

Reasoning effort can move a model along a cost/latency/quality frontier without changing families.

## 6. Task classification should be observable

Where possible, classify using measurable features rather than subjective labels:

- requested action type;
- number of files/projects implicated;
- presence of failing tests;
- amount of retrieved context;
- tool requirements;
- whether requirements conflict;
- whether the operation has side effects;
- prior attempt failures.

## 7. Initial platform guidance

Maintain a small task taxonomy only if it changes an actual decision. Do not create an elaborate ontology before routing/evaluation demonstrates a need.

Capability profiles should be regenerated when:

- a model version changes;
- reasoning defaults change;
- the harness changes materially;
- tool contracts change;
- representative workloads shift.

## References

- OpenAI, Model selection — https://developers.openai.com/api/docs/guides/model-selection
- OpenAI, Reasoning models — https://developers.openai.com/api/docs/guides/reasoning
- Anthropic, Quantifying infrastructure noise in agentic coding evals — https://www.anthropic.com/engineering/infrastructure-noise

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-MODEL-001 — Model Selection Fundamentals](AEP-MODEL-001-model-selection-fundamentals.md)
- [AEP-TOOL-009 — Tool Observability and Evaluation](../tools/AEP-TOOL-009-tool-observability-and-evaluation.md)
