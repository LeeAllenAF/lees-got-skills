---
schema_version: '1.0'
id: AEP-COST-003
title: Token and Context Efficiency
summary: 'Token and Context Efficiency. Focus: context compaction, context efficiency.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- cost-performance
tags:
- context-compaction
- context-efficiency
scope:
- enterprise-global
related:
- AEP-CTX-001
- AEP-CTX-007
- AEP-CTX-008
- AEP-CTX-011
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/cost/AEP-COST-003-token-and-context-efficiency.md
  original_sha256: 71716d0e8425f14f9a9478f47994fce2e3eaea077aeabea34581e1cd679c06dd
  original_metadata_record: handbook/cost/AEP-COST-003-token-and-context-efficiency.md
  authority: inherited-source-context
---

# AEP-COST-003 — Token and Context Efficiency

## 1. Purpose
Token reduction is valuable only when it removes low-value work without reducing task success.

## 2. High-signal context first
Use the smallest sufficient active context. Prefer:

- progressive disclosure;
- retrieval and reranking;
- concise tool outputs;
- structured working state;
- context compaction;
- stable reusable prefixes where caching is beneficial.

## 3. Input vs output economics
Input and output have different cost and latency characteristics. Long generated reasoning or verbose intermediate text can dominate cost even when input is efficient. Measure both.

## 4. Context retention decisions
For every large context item ask:

```text
Is it relevant now?
Must it be active, or can it remain retrievable?
Is it reusable across turns?
Is the source authoritative and fresh?
Does removing it increase retries or errors?
```

## 5. Tool-result reduction
Prefer structured summaries and pointers for large tool results, while keeping raw evidence recoverable. Do not destroy information needed for debugging, security, or later verification merely to save tokens.

## 6. Avoid token micro-optimization too early
Current provider guidance notes that input-token trimming may have limited impact unless contexts are very large; reducing requests, outputs, or using appropriate models can dominate. Optimize measured bottlenecks first.

## 7. Recommendation
Evaluate context-efficiency changes against downstream success, retry rate, and cost per success—not token count in isolation.

## References
- Anthropic, Effective context engineering for AI agents — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- OpenAI, Latency optimization — https://developers.openai.com/api/docs/guides/latency-optimization

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-cost.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](../context/AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-007 — Progressive Disclosure](../context/AEP-CTX-007-progressive-disclosure.md)
- [AEP-CTX-008 — Context Compression and Compaction](../context/AEP-CTX-008-context-compression-and-compaction.md)
- [AEP-CTX-011 — Context Caching](../context/AEP-CTX-011-context-caching.md)
