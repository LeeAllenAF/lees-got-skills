---
schema_version: '1.0'
id: AEP-AGENT-001
title: Agent Architecture Fundamentals
summary: 'Agent Architecture Fundamentals. Focus: deterministic control, orchestration.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- deterministic-control
- orchestration
scope:
- enterprise-global
related:
- AEP-P-002
- AEP-P-006
- AEP-P-007
- AEP-TOOL-001
- AEP-MODEL-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-001-agent-architecture-fundamentals.md
  original_sha256: d830354d6b6fd86814943126c1d661cfe7766b4dce9729ae574d4c70ea4e0efe
  original_metadata_record: handbook/agents/AEP-AGENT-001-agent-architecture-fundamentals.md
  authority: inherited-source-context
---

# AEP-AGENT-001 — Agent Architecture Fundamentals

## 1. Purpose
Agent architecture decides where control is deterministic and where a model is allowed to choose the next action.

> **Use deterministic workflow logic where the sequence is known; use agentic control where useful decisions cannot be fully specified in advance.**

An agent is not simply an LLM call. A production agent is a runtime loop combining model reasoning, context, tools, state, authority, verification, and stopping conditions.

## 2. Workflow vs agent
A deterministic workflow is appropriate when steps, branches, and recovery behavior can be expressed reliably in code. An agent loop is appropriate when the system must inspect evidence and dynamically decide what to do next.

Do not convert a known workflow into an autonomous loop merely for architectural novelty.

## 3. Start with one agent
Current OpenAI and Google guidance both recommend beginning with a single agent and adding specialists only where separate tools, policies, contexts, ownership, or parallelism materially improve outcomes.

## 4. Core agent loop
```text
prepare context
   ↓
model decides
   ↓
act / call tool / produce result
   ↓
observe
   ↓
verify progress
   ↓
continue or stop
```

Every loop needs explicit stop conditions, budgets, and non-progress handling.

## 5. Reasons to split
A second agent may be justified by:
- materially different tool surfaces;
- different authority or approval policy;
- context isolation;
- independent parallel work;
- different model requirements;
- a distinct output contract;
- traceability or ownership requirements.

Conceptual job titles alone are insufficient justification.

## 6. Initial platform guidance
1. Prefer deterministic orchestration where control flow is known.
2. Prefer a single capable agent before multi-agent composition.
3. Add agents only when an explicit architectural boundary earns the complexity.
4. Use external verification and progress signals, not model claims alone.
5. Record why a multi-agent boundary exists and revalidate it as models improve.

## References
- OpenAI, Agents SDK and orchestration — https://developers.openai.com/api/docs/guides/agents/sdk
- OpenAI, Orchestration and handoffs — https://developers.openai.com/api/docs/guides/agents/orchestration
- Google Cloud, Choose a design pattern for your agentic AI system — https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-TOOL-001 — Tool Design Fundamentals](../tools/AEP-TOOL-001-tool-design-fundamentals.md)
- [AEP-MODEL-001 — Model Selection Fundamentals](../models/AEP-MODEL-001-model-selection-fundamentals.md)
- [HARNESS-FOUNDATIONS-01-HARNESS-CONCEPTS — Harness foundations: mental model and components](../../harness/foundations/01-harness-concepts.md)
