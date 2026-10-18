---
schema_version: '1.0'
id: AEP-CODE-002
title: Repository Discovery and Environment Understanding
summary: 'Repository Discovery and Environment Understanding. Focus: repository discovery, software engineering.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- repository-discovery
- software-engineering
scope:
- enterprise-global
related:
- AEP-P-016
- AEP-CTX-010
- AEP-TOOL-004
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-002-repository-discovery-and-environment-understanding.md
  original_sha256: 9dc195732a21b2aa382497c9d9f16d2e66133952718d155bd9cabb0c70db1c2d
  original_metadata_record: handbook/coding/AEP-CODE-002-repository-discovery-and-environment-understanding.md
  authority: inherited-source-context
---

# AEP-CODE-002 — Repository Discovery and Environment Understanding

## 1. Purpose
Before making changes, a coding agent should determine what kind of repository it is operating in and which local conventions are authoritative.

## 2. Discovery dimensions
Inspect only what is useful to the task, including:
- repository and package layout;
- package manager and lockfile;
- language/runtime versions;
- build, test, lint, typecheck, formatting, and CI commands;
- framework and library conventions;
- generated-code boundaries;
- dependency/project graph where available;
- repository instruction files;
- ownership and high-risk areas;
- nearby tests and examples;
- current git state and changed files.

## 3. Framework-neutral rule
Use repository-native metadata if present. An Nx graph, Bazel graph, Turborepo task graph, pnpm workspace, Maven project model, Cargo workspace, or plain package.json/filesystem are all possible evidence sources. None is a default requirement.

## 4. Minimal discovery contract
The agent should be able to answer:
1. What am I changing?
2. What depends on it?
3. How is it built and verified?
4. Which conventions apply?
5. What must I avoid modifying?

## 5. Anti-pattern
Do not install a monorepo manager, test framework, formatter, dependency injection framework, or other infrastructure merely to make the agent more comfortable.

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
- [AEP-TOOL-004 — Tool Discovery and Capability Loading](../tools/AEP-TOOL-004-tool-discovery-and-capability-loading.md)
