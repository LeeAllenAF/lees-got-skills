---
schema_version: '1.0'
id: AEP-AGENT-006
title: Planning, Decomposition, and Execution
summary: 'Planning, Decomposition, and Execution. Focus: orchestration, planning.'
type: guidance
status: provisional
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- orchestration
- planning
scope:
- enterprise-global
related:
- AEP-AGENT-003
- AEP-AGENT-004
- AEP-MODEL-004
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-006-planning-decomposition-and-execution.md
  original_sha256: 6de0e42d2c881a799948b5edc9616e4068cf9cb90c8a599eb98ca398e0448588
  original_metadata_record: handbook/agents/AEP-AGENT-006-planning-decomposition-and-execution.md
  authority: inherited-source-context
---
# AEP-AGENT-006 — Planning, Decomposition, and Execution

## Purpose
Use explicit planning only when it improves execution quality or coordination.

## Planning modes
- implicit planning inside one agent;
- explicit short plan before action;
- planner/executor separation;
- hierarchical task decomposition;
- rolling plans revised from observations.

## Guidance
Prefer the lightest planning representation that supports the task. Detailed plans become stale when environments are dynamic. For software work, plans should identify goals, constraints, verification, and dependencies without prematurely specifying every implementation step.

Separate planner/executor agents only when independence, context isolation, model specialization, or coordination benefits are measurable.

## Risks
- plan worship after evidence changes;
- excessive decomposition overhead;
- planning without action/verification;
- lost context between planner and executor;
- recursive decomposition with no progress.

## References
- Google Cloud, Agentic AI design patterns — https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-003 — Single-Agent Patterns](AEP-AGENT-003-single-agent-patterns.md)
- [AEP-AGENT-004 — Delegation, Subagents, and Parallelism](AEP-AGENT-004-delegation-subagents-and-parallelism.md)
- [AEP-MODEL-004 — Reasoning Effort and Test-Time Compute](../models/AEP-MODEL-004-reasoning-effort-and-test-time-compute.md)
- [HARNESS-FOUNDATIONS-02-ORCHESTRATION-PATTERNS — Common orchestration patterns](../../harness/foundations/02-orchestration-patterns.md)
- [HARNESS-CODEX-SDK-03-ORCHESTRATION-PATTERN — Application-managed orchestration using the Codex SDK](../../harness/codex-sdk/03-orchestration-pattern.md)
