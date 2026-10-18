---
schema_version: '1.0'
id: AEP-CODE-009
title: Dependencies and Upgrades
summary: 'Dependencies and Upgrades. Focus: dependencies, supply chain.'
type: playbook
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- dependencies
- supply-chain
scope:
- enterprise-global
related:
- AEP-CODE-002
- AEP-CODE-008
- AEP-TOOL-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-009-dependencies-and-upgrades.md
  original_sha256: bc0e303022f49b67d0ce1c01ada4e3092fad1992e592c8a977d4a19d1697eb81
  original_metadata_record: handbook/coding/AEP-CODE-009-dependencies-and-upgrades.md
  authority: inherited-source-context
---

# AEP-CODE-009 — Dependencies and Upgrades

## 1. Principle
Dependency changes alter both code and supply-chain state and should be treated as explicit engineering changes.

## 2. Workflow
Determine current version and constraints; review authoritative release/migration guidance; understand transitive impact; make the smallest necessary version change; preserve lockfile consistency; run affected verification; inspect generated diffs.

## 3. Avoid speculative upgrades
Do not modernize unrelated dependencies during a targeted change unless explicitly requested or required to resolve compatibility/security issues.

## 4. Major upgrades
Major framework/runtime upgrades should usually be decomposed into migration stages with explicit checkpoints and rollback paths.

## 5. Freshness
Version-specific recommendations require current documentation and short review horizons.

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

- [AEP-CODE-002 — Repository Discovery and Environment Understanding](AEP-CODE-002-repository-discovery-and-environment-understanding.md)
- [AEP-CODE-008 — Testing and Verification](AEP-CODE-008-testing-and-verification.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
