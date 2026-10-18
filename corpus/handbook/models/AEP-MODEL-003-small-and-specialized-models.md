---
schema_version: '1.0'
id: AEP-MODEL-003
title: Small and Specialized Models
summary: 'Small and Specialized Models. Focus: model selection, small models.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- model-engineering
tags:
- model-selection
- small-models
scope:
- enterprise-global
related:
- AEP-CTX-004
- AEP-CTX-006
- AEP-MODEL-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/models/AEP-MODEL-003-small-and-specialized-models.md
  original_sha256: 1c715b1e56b6e369c1e172a734c738ee117c74aa0956886a89ce05198a965fa1
  original_metadata_record: handbook/models/AEP-MODEL-003-small-and-specialized-models.md
  authority: inherited-source-context
---

# AEP-MODEL-003 — Small and Specialized Models

## 1. Purpose

Small and specialized models remain first-class components in modern agent systems. Their value has shifted from compensating for weak general-purpose models toward performing bounded operations more cheaply, quickly, privately, or predictably.

## 2. Strong candidate workloads

Small models frequently deserve evaluation for:

- intent/task classification;
- query routing;
- extraction into strict schemas;
- metadata generation;
- ranking and reranking;
- summarization/compaction;
- duplicate detection;
- simple code edits;
- lightweight subagent work;
- relevance screening.

Specialized non-generative models remain especially attractive for embeddings, reranking, classification, and anomaly detection.

## 3. Do not create model zoos without evidence

Every additional model introduces lifecycle costs:

- provider integration;
- eval coverage;
- versioning;
- fallback behavior;
- observability;
- security review;
- capacity/rate limits;
- routing complexity.

A specialized model should earn its place through measurable improvement.

## 4. Local/self-hosted small models

Small models can be attractive for privacy, offline operation, deterministic capacity planning, or high-volume repetitive work. They still require evaluation against hosted alternatives and introduce infrastructure cost and maintenance.

## 5. Specialized model outputs are evidence, not truth

A reranker score, classifier label, or routing score should be treated as a signal with known calibration/accuracy—not as ground truth.

## 6. Initial platform guidance

Prefer specialized machinery when the problem itself is specialized and measurable. Prefer a general model when the task requires broad reasoning, adaptation, or complex tool use and specialization does not show a clear advantage.

## References

- OpenAI, Introducing GPT-5.4 mini and nano — https://openai.com/index/introducing-gpt-5-4-mini-and-nano/
- OpenAI, A practical guide to building AI agents — https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- Anthropic, Building effective agents — https://www.anthropic.com/engineering/building-effective-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-models.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-004 — Embeddings and Semantic Retrieval](../context/AEP-CTX-004-embeddings-and-semantic-retrieval.md)
- [AEP-CTX-006 — Reranking](../context/AEP-CTX-006-reranking.md)
- [AEP-MODEL-001 — Model Selection Fundamentals](AEP-MODEL-001-model-selection-fundamentals.md)
