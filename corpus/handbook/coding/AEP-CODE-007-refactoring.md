---
schema_version: '1.0'
id: AEP-CODE-007
title: Refactoring
summary: 'Refactoring. Focus: refactoring, verification.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- refactoring
- verification
scope:
- enterprise-global
related:
- AEP-CODE-008
- AEP-P-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-007-refactoring.md
  original_sha256: ae7e983562071df6873ee41f2e2b3e652c1cbfcf108a98c94cc5969fe974e2fc
  original_metadata_record: handbook/coding/AEP-CODE-007-refactoring.md
  authority: inherited-source-context
---

# AEP-CODE-007 — Refactoring

## 1. Principle
Refactoring changes structure while preserving intended external behavior unless a behavior change is explicitly part of the task.

## 2. Preconditions
Establish a verification baseline before broad structural changes. Where coverage is weak, add characterization tests only where they materially reduce risk.

## 3. Strategy
Prefer a sequence of mechanically understandable changes over a large simultaneous rewrite. Keep semantic changes separate where possible.

## 4. Agent-specific risk
Agents are prone to opportunistic cleanup and style normalization. Refactoring tasks require especially strict diff review to prevent unrelated behavioral or formatting churn.

## 5. Completion
Compare behavior and verification before and after. If equivalence cannot be established, report the uncertainty explicitly.

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
- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
