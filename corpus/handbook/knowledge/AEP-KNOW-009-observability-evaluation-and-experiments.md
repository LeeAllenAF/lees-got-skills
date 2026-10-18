---
schema_version: '1.0'
id: AEP-KNOW-009
title: Knowledge Service Observability, Evaluation, and Experiments
summary: 'Knowledge Service Observability, Evaluation, and Experiments. Focus: evaluation, observability.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- knowledge-systems
tags:
- evaluation
- observability
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: null
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/knowledge/AEP-KNOW-009-observability-evaluation-and-experiments.md
  original_sha256: 75e5a77b5285628af1ff08f3b8fa9320c1407a813851400fb22a135bc46ed888
  original_metadata_record: handbook/knowledge/AEP-KNOW-009-observability-evaluation-and-experiments.md
  authority: inherited-source-context
---

# Knowledge Service Observability, Evaluation, and Experiments

## Principle

The knowledge service itself is an agent-support system and must be evaluated, not merely assumed useful.

## Retrieval metrics

Measure:

- recall@k;
- precision@k;
- MRR/NDCG where meaningful;
- exact lookup success;
- reranking gain;
- latency;
- index freshness.

## Downstream metrics

Retrieval metrics are proxies.

Also measure:

- agent task success;
- instruction adherence;
- context tokens supplied;
- hallucination/unsupported-claim rate;
- conflict-resolution accuracy;
- human correction rate;
- cost per successful task.

## Resolution evals

Create fixtures containing:

```text
the platform guidance
scoped override
repository exception
task constraints
```

with expected effective guidance and expected conflict states.

## Security evals

Test:

- cross-scope retrieval attempts;
- scope confusion;
- cache leakage;
- stale/deprecated policy selection;
- malicious content in documents;
- prompt injection embedded in retrieved material.

## Trace fields

Record:

```text
query
retrieval route
filters
candidate counts
reranker use
selected document IDs
resolver decisions
context size
latency
index version
```

subject to privacy constraints.

## Experiments

The service should become the execution environment for many existing context experiments:

- hybrid vs semantic retrieval;
- reranking;
- progressive disclosure;
- context-pack composition;
- freshness labels;
- provenance;
- skill routing.

## Current recommendation

Do not optimize retrieval metrics in isolation. Promote changes only when they improve downstream useful outcomes or materially improve cost/latency without harming them.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-knowledge.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

Use the topic index for adjacent documents.
