---
schema_version: '1.0'
id: HARNESS-ARCHITECTURE-03-DECISIONS-AND-QUESTIONS
title: 'Design discussion: decisions and open questions'
summary: 'Design discussion: decisions and open questions. Focus: architecture, decision records.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- harness-architecture
tags:
- architecture
- decision-records
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
  original_path: agentic-harness-foundations/architecture/03-decisions-and-questions.md
  original_sha256: fb1e7ac718c4b0f91e015c1ea37598ce38372924cf245225ce33b1996ede9d26
  original_metadata_record: harness/architecture/03-decisions-and-questions.md
  authority: reference-only
---
# Design discussion: decisions and open questions

[← Index](../INDEX.md) · [Reference design](02-reference-design.md) · [Sources](../reference/SOURCES.md)

## Captured assumptions (not organizational commitments)
- [DECISION CANDIDATE] Use Codex TypeScript SDK for programmatic reasoning with an approved existing Codex session.
- [DECISION CANDIDATE] Keep MCP + skills as reusable plugin assets, independent of worker orchestration.
- [DECISION CANDIDATE] Store work queue, evidence, and checkpoints outside Codex sessions.
- [DECISION CANDIDATE] Prefer deterministic extraction, routing and validation where possible.
- [DECISION CANDIDATE] Use App Server only when SDK lacks a required client lifecycle feature.

## Unknowns requiring validation
1. Which models and reasoning effort values are entitled in the target environment?
2. Is noninteractive Codex SDK execution permitted by enterprise licensing and policy?
3. What concurrency and usage limits apply to multiple SDK threads?
4. Does the installed SDK expose the expected outputSchema and streaming types?
5. Which plugin packaging form and hook surfaces are enabled on deployment hosts?
6. How is authentication for remote MCP and private sources established without broad credentials?
7. How long are Codex sessions retained and what recovery mechanisms are available?
8. Is there a specific App Server-only requirement (steering, approvals, protocol events)?
9. How will source permissions and retention be preserved in cached documents and graph edges?
10. What evaluation fixtures define acceptable precision, recall, and evidence validity?

## Discussion prompts
- What is the smallest deterministic unit of work?
- Which tasks genuinely require LLM inference?
- Which consequences require user approval or stronger enforcement?
- What evidence would prove the system is both useful and safe?
- What could be migrated to other model providers later?

## Change control
Log resolved decisions with date, owner, rationale, alternatives, and the source/documentation version. Never silently promote these candidates to final decisions.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-architecture.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-QUESTIONS-001 — Open Questions](../../handbook/foundations/AEP-QUESTIONS-001-open-questions.md)
- [AEP-AUDIT-002 — Decision Records](../../handbook/audit/aep-audit-002-decision-records.md)
