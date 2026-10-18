---
schema_version: '1.0'
id: AEP-AGENT-004
title: Delegation, Subagents, and Parallelism
summary: 'Delegation, Subagents, and Parallelism. Focus: concurrency, delegation, multi agent.'
type: guidance
status: provisional
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- concurrency
- delegation
- multi-agent
scope:
- enterprise-global
related:
- AEP-AGENT-001
- AEP-CTX-001
- AEP-MODEL-005
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-004-delegation-subagents-and-parallelism.md
  original_sha256: 9417f2daec4e3b4e6414491c962ae5d07d00993135aadca2e6e4ee6bf602ac46
  original_metadata_record: handbook/agents/AEP-AGENT-004-delegation-subagents-and-parallelism.md
  authority: inherited-source-context
---
# AEP-AGENT-004 — Delegation, Subagents, and Parallelism

## Purpose
Use subagents when independent work benefits from isolated context or concurrent execution.

## Good delegation candidates
- researching independent hypotheses;
- reviewing independent documents/modules;
- running separate diagnostic branches;
- parallelizing independent test/debug investigations;
- isolating specialist context that would pollute the parent.

OpenAI's current Agents API recommends subagents for independent tasks and keeping short or tightly dependent steps with the main agent.

## Delegation contract
Each delegated task should define:
- bounded objective;
- supplied context;
- allowed tools and authority;
- expected output schema;
- completion criteria;
- budget;
- whether results are evidence or decisions.

## Parallelism
Parallel work improves wall time only when tasks are sufficiently independent. Shared-file edits, shared mutable state, ordering dependencies, or scarce resources may make parallelism harmful.

## Guidance
Prefer **fan out → bounded work → structured synthesis** over unrestricted agent-to-agent conversation.

## References
- OpenAI, Multi-agent Agents API — https://developers.openai.com/api/docs/guides/agents-api/multi-agent
- Google Cloud, Agentic AI design patterns — https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-001 — Agent Architecture Fundamentals](AEP-AGENT-001-agent-architecture-fundamentals.md)
- [AEP-CTX-001 — Context Engineering Fundamentals](../context/AEP-CTX-001-context-engineering-fundamentals.md)
- [AEP-MODEL-005 — Model Routing Architecture](../models/AEP-MODEL-005-routing-architecture.md)
- [HARNESS-FOUNDATIONS-02-ORCHESTRATION-PATTERNS — Common orchestration patterns](../../harness/foundations/02-orchestration-patterns.md)
