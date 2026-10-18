---
schema_version: '1.0'
id: AEP-CODE-004
title: Technology Selection and Architectural Fit
summary: 'Technology Selection and Architectural Fit. Focus: architecture, technology selection.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- software-engineering
tags:
- architecture
- technology-selection
scope:
- enterprise-global
related:
- AEP-P-016
- AEP-P-019
- AEP-MODEL-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/coding/AEP-CODE-004-technology-selection-and-architectural-fit.md
  original_sha256: 1fee558544480b535d8cc502693a30c19e023832164ebda6824035d9bd5deed6
  original_metadata_record: handbook/coding/AEP-CODE-004-technology-selection-and-architectural-fit.md
  authority: inherited-source-context
---

# AEP-CODE-004 — Technology Selection and Architectural Fit

## 1. Purpose
Technology selection should optimize for the project/enterprise environment, not organizational familiarity or model familiarity.

> **Prefer environmental fit over organizational familiarity.**

## 2. Decision inputs
Evaluate:
- business requirements and delivery horizon;
- existing ecosystem and integration constraints;
- team expertise and hiring/support realities;
- deployment environment;
- security, regulatory, and data constraints;
- expected scale and performance needs;
- reliability and operational burden;
- maintainability and ecosystem maturity;
- licensing/vendor risk;
- total cost of ownership;
- migration/reversibility cost.

## 3. Greenfield choices
For material decisions, produce a short ADR-style comparison of viable candidates and explicitly identify assumptions. Avoid false precision and avoid ranking options on irrelevant criteria.

## 4. Brownfield choices
The burden of proof is higher for replacing existing technology than for using it competently. Prefer incremental compatibility unless a concrete problem justifies migration.

## 5. Agent guardrail
A coding agent may recommend introducing infrastructure only when it can name the problem being solved, alternatives considered, operational cost, migration cost, and verification path.

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
- [AEP-MODEL-009 — Model Evaluation and Selection Benchmarks](../models/AEP-MODEL-009-model-evaluation-and-selection-benchmarks.md)
