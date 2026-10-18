---
schema_version: '1.0'
id: HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE
title: Context engineering, retrieval, memory, and durable state
summary: 'Context engineering, retrieval, memory, and durable state. Focus: context engineering, memory, retrieval,
  state management.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- engineering-foundations
tags:
- context-engineering
- memory
- retrieval
- state-management
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-14'
  technical_review_interval: null
  owner: null
provenance:
  source_archive: agentic-harness-foundations.zip
  original_path: agentic-harness-foundations/foundations/03-context-and-state.md
  original_sha256: aa0084cc58234d8e1fd9f21dbc964707442730812800cbe3a26f15acb40f6222
  original_metadata_record: harness/foundations/03-context-and-state.md
  authority: reference-only
---
# Context engineering, retrieval, memory, and durable state

[← Index](../INDEX.md) · [Harness](01-harness-concepts.md) · [Evaluation](04-reliability-and-evals.md)

## Distinct concepts
- **State:** current and pending work plus execution status.
- **Memory:** retained events, facts, or procedures across steps/sessions.
- **Context:** the subset actually included in a particular model invocation.
- **Artifact:** persisted output (report, evidence bundle, graph update) typically referenced by identifier.

## Context engineering
Selective retrieval, progressive disclosure, context isolation, summarization/compaction, evidence anchoring, and returning artifact references in place of huge tool results. Restrict authority: retrieved pages are untrusted **data**, not new system instructions.

## Retrieval strategy
Keyword search finds exact names and symbols; semantic search finds conceptual neighbors; hybrid search combines them; rerankers improve candidate ordering; entity resolution merges aliases; graph traversal follows explicit relationships. Keep provenance and timestamps with each claim.

## Suggested work state (illustrative, not SDK API)
```ts
interface WorkUnit {
  id: string;
  kind: string;
  status: 'queued' | 'leased' | 'blocked' | 'complete' | 'failed';
  attempts: number;
  inputRefs: string[];
  outputRefs: string[];
  evidenceRefs: string[];
  leaseUntil?: string;
  version: number;
}
```

## Reliability constraints
- Checkpoint after validated transitions, not before a side effect you cannot recover.
- Side-effecting tools need idempotency keys or reconciliation.
- A resumed workflow need not have the exact prior inference context.
- Track source versions/hashes to support incremental processing.
- Long-running background workers should remain useful even when inference is unavailable.

Continue with [SDK orchestration](../codex-sdk/03-orchestration-pattern.md) and [reference design](../architecture/02-reference-design.md).

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-foundations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-001 — Context Engineering Fundamentals](../../handbook/context/AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-CTX-003 — Retrieval Architecture](../../handbook/context/AEP-CTX-003-retrieval-architecture.md)
- [AEP-CTX-007 — Progressive Disclosure](../../handbook/context/AEP-CTX-007-progressive-disclosure.md)
- [AEP-CTX-009 — Working Memory and Persistent Memory](../../handbook/context/AEP-CTX-009-working-memory-and-persistent-memory.md)
- [AEP-KNOW-004 — Retrieval, Ranking, and Context Packages](../../handbook/knowledge/AEP-KNOW-004-retrieval-ranking-and-context-packages.md)
