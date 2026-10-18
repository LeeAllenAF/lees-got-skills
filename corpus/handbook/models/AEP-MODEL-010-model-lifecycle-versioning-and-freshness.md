---
schema_version: '1.0'
id: AEP-MODEL-010
title: Model Lifecycle, Versioning, and Freshness
summary: 'Model Lifecycle, Versioning, and Freshness. Focus: lifecycle, model selection, versioning.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- lifecycle
- model-selection
- versioning
scope:
- enterprise-global
related:
- AEP-P-017
- AEP-MODEL-009
- AEP-TOOL-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 30d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-010-model-lifecycle-versioning-and-freshness.md
  original_sha256: 5bff138c71cc804a2a6d5f712f9fbb8f9f68e7c7f7db84ceacf5b8a3da69f6c7
  original_metadata_record: handbook/models/AEP-MODEL-010-model-lifecycle-versioning-and-freshness.md
  authority: inherited-source-context
---

# AEP-MODEL-010 — Model Lifecycle, Versioning, and Freshness

## 1. Purpose

Model guidance decays quickly. New generations can invalidate prompt workarounds, routing thresholds, cost assumptions, reasoning defaults, and even architectural patterns.

> **Model guidance must be treated as versioned, dated, testable operational knowledge.**

## 2. Record resolved runtime identity

Where possible record:

```text
provider
model identifier
resolved version/snapshot
reasoning configuration
API/runtime surface
important feature flags
```

Aliases are convenient but weak experimental identifiers.

## 3. Revalidation triggers

Re-run relevant evals when:

- a model version changes;
- a provider changes default reasoning effort;
- pricing changes materially;
- context/tool capabilities change;
- the harness changes;
- tool schemas change;
- safety/permission behavior changes;
- production traces show regression;
- a new candidate model becomes economically interesting.

## 4. Scheduled review

Starting defaults:

```text
model-specific recommendations       30-45 days
routing thresholds                   30-45 days
provider capability assumptions      45-60 days
architectural principles             180 days
```

Event-driven review overrides schedules.

## 5. Delete obsolete scaffolding

Harness logic built around old model limitations should be challenged whenever models improve. Anthropic's managed-agent work documents exactly this phenomenon: context-reset behavior useful for one generation became unnecessary overhead for another.

## 6. Promotion and rollback

A new model/configuration should progress through:

```text
candidate
  ↓
offline eval
  ↓
shadow/canary where appropriate
  ↓
approved workload profile
  ↓
production
```

Maintain rollback paths for production-critical agents.

## 7. Living knowledge linkage

Each model-specific recommendation should link to:

- supporting evals;
- date/model version;
- affected workloads;
- owner;
- review trigger;
- replacement/deprecation information.

Historical results stay searchable because they explain why architecture changed.

## References

- Anthropic, Scaling Managed Agents — https://www.anthropic.com/engineering/managed-agents
- Anthropic, April 2026 Claude Code quality postmortem — https://www.anthropic.com/engineering/april-23-postmortem
- OpenAI, Models and providers — https://developers.openai.com/api/docs/guides/agents/models

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-MODEL-009 — Model Evaluation and Selection Benchmarks](AEP-MODEL-009-model-evaluation-and-selection-benchmarks.md)
- [AEP-TOOL-010 — Tool Lifecycle, Versioning, and Freshness](../tools/AEP-TOOL-010-tool-lifecycle-versioning-and-freshness.md)
