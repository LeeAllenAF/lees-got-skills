---
schema_version: '1.0'
id: AEP-CODE-005
title: Feature Implementation
summary: 'Feature Implementation. Focus: feature implementation, verification.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- feature-implementation
- verification
scope:
- enterprise-global
related:
- AEP-CODE-001
- AEP-CODE-002
- AEP-CODE-008
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-005-feature-implementation.md
  original_sha256: 8e01c39c646d4628dc998a024bc4b4280ba16074b3ed8b916b9d274f33f207a7
  original_metadata_record: handbook/coding/AEP-CODE-005-feature-implementation.md
  authority: inherited-source-context
---

# AEP-CODE-005 — Feature Implementation

## 1. Goal
Implement requested behavior with the smallest coherent change that fits the repository's architecture and conventions.

## 2. Workflow
1. Clarify the acceptance boundary from existing context.
2. Inspect nearby implementation, tests, types/contracts, and call sites.
3. Identify affected surfaces and risk.
4. Implement in small coherent increments.
5. Verify locally with the narrowest meaningful checks first.
6. Expand verification according to blast radius.
7. Review the diff for accidental changes.
8. Report what changed and evidence of correctness.

## 3. Tests
Tests should verify meaningful behavior, not merely mirror implementation. Avoid gratuitous test creation for trivial reversible changes while never skipping repository-required checks.

## 4. Scope discipline
Do not opportunistically redesign unrelated code unless the requested change cannot be made safely without it. Record adjacent issues separately.

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

- [AEP-CODE-001 — Software Engineering Agent Fundamentals](AEP-CODE-001-software-engineering-agent-fundamentals.md)
- [AEP-CODE-002 — Repository Discovery and Environment Understanding](AEP-CODE-002-repository-discovery-and-environment-understanding.md)
- [AEP-CODE-008 — Testing and Verification](AEP-CODE-008-testing-and-verification.md)
