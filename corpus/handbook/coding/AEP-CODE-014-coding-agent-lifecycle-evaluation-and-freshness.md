---
schema_version: '1.0'
id: AEP-CODE-014
title: Coding-Agent Lifecycle, Evaluation, and Freshness
summary: 'Coding-Agent Lifecycle, Evaluation, and Freshness. Focus: evaluation, lifecycle, software engineering.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- evaluation
- lifecycle
- software-engineering
scope:
- enterprise-global
related:
- AEP-P-017
- AEP-MODEL-010
- AEP-TOOL-010
- AEP-AGENT-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-014-coding-agent-lifecycle-evaluation-and-freshness.md
  original_sha256: 452a1747ef33b1b74a39daac601659ad395a14d20b0426ef64c2159047a4b896
  original_metadata_record: handbook/coding/AEP-CODE-014-coding-agent-lifecycle-evaluation-and-freshness.md
  authority: inherited-source-context
---

# AEP-CODE-014 — Coding-Agent Lifecycle, Evaluation, and Freshness

## 1. Purpose
Coding-agent guidance decays as models, frameworks, repositories, developer tools, and security constraints change. The section must therefore be tested and revalidated continuously.

## 2. Evaluation layers
Evaluate:
- task outcome correctness;
- patch/diff quality;
- verification behavior;
- unnecessary edits;
- repository convention adherence;
- authority violations;
- cost, latency, retries, and human intervention;
- repeated-run reliability.

## 3. Evaluation corpus
Maintain representative tasks across discovery, implementation, debugging, refactoring, review, upgrades, migrations, and CI. Include multiple languages/frameworks and small as well as large repositories to prevent accidental optimization for the platform's preferred stack.

## 4. Revalidation triggers
Re-evaluate when:
- a default model or reasoning policy changes;
- language/framework major versions change;
- repository tooling changes;
- a new failure mode appears;
- security guidance changes;
- a skill/harness rule is added or removed;
- performance/cost shifts materially.

## 5. Promotion and removal
Guidance should be promoted, revised, deprecated, or rejected from evidence. Model-specific workarounds and language-specific conventions must have removal criteria.

## 6. Anti-overfitting requirement
A coding-agent benchmark that succeeds only on one monorepo style, language, framework, or build system is insufficient evidence for company-wide guidance.

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
- [AEP-MODEL-010 — Model Lifecycle, Versioning, and Freshness](../models/AEP-MODEL-010-model-lifecycle-versioning-and-freshness.md)
- [AEP-TOOL-010 — Tool Lifecycle, Versioning, and Freshness](../tools/AEP-TOOL-010-tool-lifecycle-versioning-and-freshness.md)
- [AEP-AGENT-010 — Multi-Agent Evaluation, Lifecycle, and Freshness](../agents/AEP-AGENT-010-multi-agent-lifecycle-evaluation-and-freshness.md)
