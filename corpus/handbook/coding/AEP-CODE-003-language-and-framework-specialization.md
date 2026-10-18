---
schema_version: '1.0'
id: AEP-CODE-003
title: Language and Framework Specialization
summary: 'Language and Framework Specialization. Focus: language specialization, skills.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- language-specialization
- skills
scope:
- enterprise-global
related:
- AEP-P-016
- AEP-P-019
- AEP-CTX-007
- AEP-MODEL-003
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-003-language-and-framework-specialization.md
  original_sha256: cd7c1171318074f2826b21f6064bda7f339d9ddbdaf316c1fbb5a85cef4df070
  original_metadata_record: handbook/coding/AEP-CODE-003-language-and-framework-specialization.md
  authority: inherited-source-context
---

# AEP-CODE-003 — Language and Framework Specialization

## 1. Purpose
A general coding agent should adapt its behavior to the language and framework in front of it without turning the platform preferences into repository requirements.

> **Specialize behavior to the environment; do not force the environment to match the agent.**

## 2. Sources of specialization
Prefer, in order:
1. repository-local conventions and executable tooling;
2. project standards;
3. current framework/language guidance;
4. the platform reusable skills;
5. generic defaults.

## 3. Skill examples
A TypeScript skill might teach strict typing, module semantics, compiler-driven verification, package-manager conventions, and framework idioms. A Python skill may cover packaging metadata, environments, typing, pytest, and linting. Equivalent skills may exist for Go, Rust, Java/Kotlin, .NET, Ruby, mobile platforms, and others.

## 4. Do not confuse knowledge specialization with model specialization
A stronger language skill plus repository context may outperform adding a separate specialized model. Model specialization should be introduced only after workload evaluation demonstrates benefit.

## 5. Living knowledge
Language/framework skills should be versioned against major ecosystem changes and tested against representative repositories. Remove obsolete instructions as compilers, frameworks, and models evolve.

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
- [AEP-CTX-007 — Progressive Disclosure](../context/AEP-CTX-007-progressive-disclosure.md)
- [AEP-MODEL-003 — Small and Specialized Models](../models/AEP-MODEL-003-small-and-specialized-models.md)
