---
schema_version: '1.0'
id: AEP-CODE-010
title: Database and Schema Migrations
summary: 'Database and Schema Migrations. Focus: data protection, database migrations.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- data-protection
- database-migrations
scope:
- enterprise-global
related:
- AEP-CODE-008
- AEP-TOOL-006
- AEP-AGENT-008
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-010-database-and-schema-migrations.md
  original_sha256: efca5b981fa1dce8bf337e084a41e6e98abf1ca5253a7cd22e123d55fbde3382
  original_metadata_record: handbook/coding/AEP-CODE-010-database-and-schema-migrations.md
  authority: inherited-source-context
---

# AEP-CODE-010 — Database and Schema Migrations

## 1. Principle
Schema changes combine software correctness with data durability and operational risk. Treat them as higher-authority work than ordinary code edits.

## 2. Considerations
Evaluate backward/forward compatibility, deployment ordering, nullable/default transitions, index creation cost, locking, data backfill, rollback feasibility, replica/online migration behavior, and application-version skew.

## 3. Prefer expand/migrate/contract where needed
For changes crossing deployments, introduce compatible schema first, migrate application/data, then remove obsolete structures after verification.

## 4. Destructive operations
Dropping data, columns, tables, or irreversible transforms should require explicit authorization appropriate to the environment.

## 5. Verification
Validate generated migration artifacts, schema state, representative data behavior, and application compatibility—not just ORM/client generation.

## References
- OpenAI, Prompt engineering / coding guidance — https://developers.openai.com/api/docs/guides/prompt-engineering
- OpenAI, Agent evals — https://developers.openai.com/api/docs/guides/agent-evals
- OpenAI, Rethinking skills and prompts for GPT-6 Astra — https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra
- Anthropic, Building effective agents — https://www.anthropic.com/engineering/building-effective-agents
- Anthropic, Harness design for long-running application development — https://www.anthropic.com/engineering/harness-design-long-running-apps
- Anthropic, Demystifying evals for AI agents — https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-coding.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CODE-008 — Testing and Verification](AEP-CODE-008-testing-and-verification.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-AGENT-008 — Human-in-the-Loop and Authority Boundaries](../agents/AEP-AGENT-008-human-in-the-loop-and-authority-boundaries.md)
