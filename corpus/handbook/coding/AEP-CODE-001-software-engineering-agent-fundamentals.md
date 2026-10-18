---
schema_version: '1.0'
id: AEP-CODE-001
title: Software Engineering Agent Fundamentals
summary: 'Software Engineering Agent Fundamentals. Focus: software engineering, verification.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- software-engineering
- verification
scope:
- enterprise-global
related:
- AEP-P-006
- AEP-P-007
- AEP-P-016
- AEP-P-018
- AEP-P-019
- AEP-CTX-010
- AEP-AGENT-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-001-software-engineering-agent-fundamentals.md
  original_sha256: 3c002fcd6e0296c496680adefb88970658c1774398cf79564ad0673dca703a01
  original_metadata_record: handbook/coding/AEP-CODE-001-software-engineering-agent-fundamentals.md
  authority: inherited-source-context
---

# AEP-CODE-001 — Software Engineering Agent Fundamentals

## 1. Purpose
Software-engineering agents operate in unusually favorable conditions for agentic work because much of the output is executable and independently verifiable. That advantage should shape the architecture.

> **A coding agent should behave like an engineer operating inside an existing system, not like a code generator operating in isolation.**

## 2. Core loop
```text
understand intent
  ↓
inspect repository/environment
  ↓
form bounded plan
  ↓
make the smallest coherent change
  ↓
run appropriate verification
  ↓
inspect failures / regressions
  ↓
repair or escalate
  ↓
report evidence and remaining uncertainty
```

## 3. Initial platform guidance
1. Discover repository conventions before editing.
2. Prefer existing project structure and tooling over introducing new infrastructure.
3. Use executable evidence wherever possible.
4. Keep changes scoped to the requested outcome.
5. Treat tests, types, linters, schemas, build systems, and runtime behavior as evidence rather than ceremony.
6. Preserve human judgment for ambiguous product intent, irreversible decisions, and architecture tradeoffs.
7. Record assumptions and unresolved risks rather than silently inventing requirements.

## 4. Completion standard
A task is not complete because code was produced. Completion requires the requested outcome plus appropriate verification and a truthful statement of anything that could not be verified.

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

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-CTX-010 — Repository Context and Code Intelligence](../context/AEP-CTX-010-repository-context-and-code-intelligence.md)
- [AEP-AGENT-001 — Agent Architecture Fundamentals](../agents/AEP-AGENT-001-agent-architecture-fundamentals.md)
