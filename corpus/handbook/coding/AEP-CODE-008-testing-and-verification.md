---
schema_version: '1.0'
id: AEP-CODE-008
title: Testing and Verification
summary: 'Testing and Verification. Focus: software testing, verification.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- software-testing
- verification
scope:
- enterprise-global
related:
- AEP-P-006
- AEP-P-007
- AEP-AGENT-007
- AEP-CODE-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-008-testing-and-verification.md
  original_sha256: 6e1a1ab48ee9ff8ed57157554d71a3f1ac775cd81bc927a0df6926363a9e0c5e
  original_metadata_record: handbook/coding/AEP-CODE-008-testing-and-verification.md
  authority: inherited-source-context
---

# AEP-CODE-008 — Testing and Verification

## 1. Principle
Verification depth should be proportional to change risk and blast radius, not to agent enthusiasm.

## 2. Evidence ladder
Possible checks include:
- syntax/format validation;
- type checking/compilation;
- focused unit/component tests;
- integration/contract tests;
- schema validation;
- static/security analysis;
- build/package verification;
- end-to-end/runtime checks;
- repository-required CI checks.

## 3. Narrow then broaden
Run the fastest discriminating checks first. Broaden after changes stabilize or when dependencies/risk justify it. Avoid repeated broad test runs without new information.

## 4. Test quality
Generated tests must fail for the defect or missing behavior they claim to cover. Passing tests that merely restate the implementation are weak evidence.

## 5. Honesty requirement
Never claim a check passed unless it was actually executed or its result was obtained from a trustworthy system.

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
- [AEP-AGENT-007 — Critique, Refinement, and Verification](../agents/AEP-AGENT-007-critique-refinement-and-verification.md)
- [AEP-CODE-001 — Software Engineering Agent Fundamentals](AEP-CODE-001-software-engineering-agent-fundamentals.md)
