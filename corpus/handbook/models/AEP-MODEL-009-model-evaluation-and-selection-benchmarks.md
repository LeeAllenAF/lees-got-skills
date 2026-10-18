---
schema_version: '1.0'
id: AEP-MODEL-009
title: Model Evaluation and Selection Benchmarks
summary: 'Model Evaluation and Selection Benchmarks. Focus: evaluation, model selection.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- evaluation
- model-selection
scope:
- enterprise-global
related:
- AEP-TOOL-009
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
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-009-model-evaluation-and-selection-benchmarks.md
  original_sha256: 07bd9f45b67745479e25ffca76043e372b855edb312668db02cc6d4aa209d380
  original_metadata_record: handbook/models/AEP-MODEL-009-model-evaluation-and-selection-benchmarks.md
  authority: inherited-source-context
---

# AEP-MODEL-009 — Model Evaluation and Selection Benchmarks

## 1. Purpose

Public benchmarks are useful signals, but production model selection should be driven by representative workload evaluation under the actual harness and infrastructure.

## 2. Why generic benchmarks are insufficient

Agentic performance depends on more than base-model capability:

```text
model
+ reasoning settings
+ prompts/instructions
+ tools
+ context
+ sandbox/resources
+ retry policy
+ evaluator
```

Infrastructure differences alone can materially change coding-agent benchmark results.

## 3. Evaluation layers

### Component evals
Classification, extraction, tool selection, retrieval, schema adherence.

### Task evals
Representative end-to-end engineering tasks.

### Regression suites
Previously observed failures and critical behaviors.

### Production shadowing
Where permitted, compare alternate configurations without allowing them to execute consequential side effects.

## 4. Metrics

Track a vector, not a single score:

- task success;
- correctness/tests;
- human intervention;
- unsafe/unauthorized actions;
- retries;
- tool calls;
- input/output/reasoning tokens;
- cost;
- time to first useful output;
- end-to-end latency;
- tail latency;
- variance.

## 5. Repeated runs

Nondeterministic systems need repeated measurements. One impressive run is not evidence of reliability.

## 6. Control the environment

Record:

- exact model/version or resolved alias;
- reasoning effort;
- harness commit;
- tool versions;
- environment resources;
- dataset version;
- evaluator version.

## 7. Choose Pareto-efficient configurations

Do not ask for a universal winner. Identify configurations that are not dominated across quality, cost, latency, and risk, then select according to workload constraints.

## References

- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- Anthropic, Quantifying infrastructure noise in agentic coding evals — https://www.anthropic.com/engineering/infrastructure-noise
- OpenAI, Model selection — https://developers.openai.com/api/docs/guides/model-selection

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-009 — Tool Observability and Evaluation](../tools/AEP-TOOL-009-tool-observability-and-evaluation.md)
- [AEP-MODEL-001 — Model Selection Fundamentals](AEP-MODEL-001-model-selection-fundamentals.md)
- [AEP-MODEL-005 — Model Routing Architecture](AEP-MODEL-005-routing-architecture.md)
