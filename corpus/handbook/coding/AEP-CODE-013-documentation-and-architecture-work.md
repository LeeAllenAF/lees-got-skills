---
schema_version: '1.0'
id: AEP-CODE-013
title: Documentation and Architecture Work
summary: 'Documentation and Architecture Work. Focus: architecture, documentation.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- architecture
- documentation
scope:
- enterprise-global
related:
- AEP-CODE-004
- AEP-CTX-002
- AEP-HBK-000
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-013-documentation-and-architecture-work.md
  original_sha256: 4f1148c8d750bbe7eb869de715a6830be2a5dbae95f23e48dc3d7c296a442550
  original_metadata_record: handbook/coding/AEP-CODE-013-documentation-and-architecture-work.md
  authority: inherited-source-context
---

# AEP-CODE-013 — Documentation and Architecture Work

## 1. Principle
Documentation should represent the system that actually exists, clearly separating current state, proposed state, assumptions, and unresolved decisions.

## 2. Sources
Use code, configuration, deployment manifests, schemas, CI, repository history, existing ADRs, and authoritative owner input. Do not infer architecture solely from folder names.

## 3. Architecture proposals
A proposal should state problem, constraints, alternatives, decision, tradeoffs, migration path, operational implications, security implications, and validation plan.

## 4. Diagrams
Prefer diagrams whose entities and boundaries can be traced to real components or clearly labeled proposals.

## 5. Living documentation
Where documentation describes mutable system facts, attach owners, sources, or automated checks so drift can be detected.

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

- [AEP-CODE-004 — Technology Selection and Architectural Fit](AEP-CODE-004-technology-selection-and-architectural-fit.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](../context/AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
