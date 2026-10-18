---
schema_version: '1.0'
id: AEP-AGENT-002
title: Deterministic Workflows vs Agent Loops
summary: 'Deterministic Workflows vs Agent Loops. Focus: deterministic control, orchestration.'
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
- AEP-AGENT-001
- AEP-P-006
- AEP-TOOL-003
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 120d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-002-workflows-vs-agent-loops.md
  original_sha256: dbb54a556a93bd2488e9e867d4b56fdb8f1aadd706080ed90268cb820c020a5f
  original_metadata_record: handbook/agents/AEP-AGENT-002-workflows-vs-agent-loops.md
  authority: inherited-source-context
---
# AEP-AGENT-002 — Deterministic Workflows vs Agent Loops

## Purpose
Choose the minimum amount of model-controlled orchestration necessary.

## Decision model
Use deterministic workflow steps for known operations such as validation, transformation, ranking, file movement, CI invocation, policy checks, and fixed approval gates. Use an agent loop when the next action depends on interpreting uncertain evidence or adapting to open-ended results.

A useful hybrid is:
```text
deterministic shell
  ├─ prepare inputs
  ├─ enforce policy
  ├─ invoke agent for uncertain step
  ├─ verify output
  └─ continue deterministically
```

## Failure modes
- agentifying fixed control flow;
- hiding business logic inside prompts;
- letting a model choose whether mandatory checks run;
- using agents for deterministic joins/filtering/aggregation;
- using rigid workflows for genuinely open-ended exploration.

## Guidance
Treat orchestration ownership as a deliberate boundary. Keep compliance, permissions, irreversible transitions, and deterministic validation outside discretionary model control unless there is a measured reason otherwise.

## References
- OpenAI, A practical guide to building AI agents — https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- OpenAI, Programmatic Tool Calling — https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-001 — Agent Architecture Fundamentals](AEP-AGENT-001-agent-architecture-fundamentals.md)
- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-TOOL-003 — Tool Granularity and Composition](../tools/AEP-TOOL-003-tool-granularity-and-composition.md)
- [HARNESS-FOUNDATIONS-01-HARNESS-CONCEPTS — Harness foundations: mental model and components](../../harness/foundations/01-harness-concepts.md)
