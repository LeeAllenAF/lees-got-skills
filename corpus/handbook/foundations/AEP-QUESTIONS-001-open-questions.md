---
schema_version: '1.0'
id: AEP-QUESTIONS-001
title: Open Questions
summary: 'Open Questions. Focus: experimentation, knowledge management.'
type: reference
status: informational
version: 0.1.0
collection: handbook
domains:
- engineering-foundations
tags:
- experimentation
- knowledge-management
scope:
- enterprise-global
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 30d
  owner: platform-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/foundations/AEP-QUESTIONS-001-open-questions.md
  original_sha256: e4e67556d84a3903d5b11a35f4be09d8652f0eadbee25999ce366a54d2aeadf7
  original_metadata_record: handbook/foundations/AEP-QUESTIONS-001-open-questions.md
  authority: inherited-source-context
---

# Open Questions

This document tracks unresolved questions that can materially change platform guidance.

## Knowledge and retrieval

- What metadata fields materially improve downstream task success?
- When do embeddings and reranking improve results beyond lexical/structural retrieval?
- What context-package size maximizes useful outcome per cost?
- Which freshness labels measurably change agent behavior?

## Permission boundaries

- What scope model is expressive enough for people and service identities without making retrieval brittle?
- How should caches and indexes isolate restricted scopes?
- Which authorization decisions require durable audit records?

## Source intelligence

- How should authority, recency, corroboration, and reproducibility combine without becoming an opaque trust score?
- Which source-discovery techniques achieve acceptable precision?

## Skills

- When does a skill outperform repository guidance?
- How should skill catalogs scale without activation noise?

## Security assurance

- Which adversarial suites best predict real agent-system failures?
- How should fintech-grade automated penetration testing remain isolated and governable?

## Future architecture

- Which production policy engine best fits the eventual enterprise authorization model?
- What lessons from platform operation should drive a future SDLC control-plane redesign?

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-foundations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-ARCHITECTURE-03-DECISIONS-AND-QUESTIONS — Design discussion: decisions and open questions](../../harness/architecture/03-decisions-and-questions.md)
