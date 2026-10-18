---
schema_version: '1.0'
id: AEP-MODEL-004
title: Reasoning Effort and Test-Time Compute
summary: 'Reasoning Effort and Test-Time Compute. Focus: cost optimization, reasoning effort.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- cost-optimization
- reasoning-effort
scope:
- enterprise-global
related:
- AEP-MODEL-001
- AEP-MODEL-005
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 45d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-004-reasoning-effort-and-test-time-compute.md
  original_sha256: dbe8ccf019459ae282194b5fd558a970c1ca641b879b69d5716b556c488c2dd3
  original_metadata_record: handbook/models/AEP-MODEL-004-reasoning-effort-and-test-time-compute.md
  authority: inherited-source-context
---

# AEP-MODEL-004 — Reasoning Effort and Test-Time Compute

## 1. Purpose

Modern model selection increasingly includes a second axis: how much inference-time reasoning to spend. A single model can occupy several points on the quality/cost/latency frontier.

## 2. Treat effort as routable capacity

Reasoning effort can be selected independently of model family when supported.

A useful conceptual ladder:

```text
low effort
  ↓ when evidence indicates difficulty
medium
  ↓
high / extended
  ↓
human or alternate strategy
```

The exact labels are provider-specific; the architectural concept is not.

## 3. Use more reasoning where it changes outcomes

Likely candidates:

- ambiguous debugging;
- architecture decisions;
- complex multi-step planning;
- security/code review;
- tasks with conflicting evidence;
- recovery after repeated failed attempts.

Likely poor candidates:

- deterministic extraction;
- simple classification;
- formatting;
- straightforward transformation;
- operations already validated by code.

## 4. More thinking is not monotonic value

Higher effort can increase cost and tail latency, and on some workloads may provide little or no quality improvement. Defaults have also changed across product releases, demonstrating that harness assumptions around reasoning effort can become stale.

## 5. Evaluate effort jointly with model choice

Do not assume:

```text
small model + high effort < large model + low effort
```

Measure actual combinations. A newer smaller model at higher effort may outperform an older/larger configuration at lower cost, and vice versa.

## 6. Initial platform guidance

Reasoning effort should be explicit for high-value production workflows when the provider exposes it. Record it in traces. Benchmark at least adjacent effort levels before standardizing a default.

## References

- OpenAI, Reasoning models — https://developers.openai.com/api/docs/guides/reasoning
- OpenAI, Model selection — https://developers.openai.com/api/docs/guides/model-selection
- Anthropic, April 2026 Claude Code quality postmortem — https://www.anthropic.com/engineering/april-23-postmortem

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-MODEL-001 — Model Selection Fundamentals](AEP-MODEL-001-model-selection-fundamentals.md)
- [AEP-MODEL-005 — Model Routing Architecture](AEP-MODEL-005-routing-architecture.md)
- [HARNESS-CODEX-SDK-02-CONFIGURATION-AND-CAPABILITIES — SDK capability map: models, threads, and outputs](../../harness/codex-sdk/02-configuration-and-capabilities.md)
