---
schema_version: '1.0'
id: AEP-AGENT-005
title: Managers, Handoffs, and Ownership
summary: 'Managers, Handoffs, and Ownership. Focus: handoffs, multi agent.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- handoffs
- multi-agent
scope:
- enterprise-global
related:
- AEP-AGENT-004
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
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-005-managers-handoffs-and-ownership.md
  original_sha256: 718af0955770afe3bc77570da15e9000478192cb8a4b0a20c68224ea9f413e83
  original_metadata_record: handbook/agents/AEP-AGENT-005-managers-handoffs-and-ownership.md
  authority: inherited-source-context
---
# AEP-AGENT-005 — Managers, Handoffs, and Ownership

## Purpose
Choose whether a specialist assists a controlling agent or takes ownership of the workflow branch.

## Manager / agents-as-tools
Use when one outer agent should retain responsibility for synthesis and user-facing output. Specialists behave like bounded capabilities.

## Handoff
Use when the specialist should own the next interaction or branch. Control transfers rather than merely returning a result.

OpenAI's current orchestration guidance makes this distinction explicit.

## Supervisor pattern
A supervisor may route, decompose, budget, and synthesize. It should not become an unnecessary reasoning tax. Deterministic routing should remain preferred where routing rules are stable.

## Ownership rule
At every point, one component should have explicit responsibility for:
- the next action;
- current authority;
- final synthesis;
- user communication;
- unresolved errors.

Avoid ambiguous shared ownership.

## References
- OpenAI, Orchestration and handoffs — https://developers.openai.com/api/docs/guides/agents/orchestration

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-004 — Delegation, Subagents, and Parallelism](AEP-AGENT-004-delegation-subagents-and-parallelism.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [HARNESS-FOUNDATIONS-02-ORCHESTRATION-PATTERNS — Common orchestration patterns](../../harness/foundations/02-orchestration-patterns.md)
