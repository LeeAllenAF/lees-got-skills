---
schema_version: '1.0'
id: HARNESS-FOUNDATIONS-02-ORCHESTRATION-PATTERNS
title: Common orchestration patterns
summary: 'Common orchestration patterns. Focus: deterministic control, multi agent, orchestration.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- engineering-foundations
tags:
- deterministic-control
- multi-agent
- orchestration
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-14'
  technical_review_interval: null
  owner: null
provenance:
  source_archive: agentic-harness-foundations.zip
  original_path: agentic-harness-foundations/foundations/02-orchestration-patterns.md
  original_sha256: cf88cc6c8f3798727490eda3976fa6edbf5e3087873cfb48aa404f6327885512
  original_metadata_record: harness/foundations/02-orchestration-patterns.md
  authority: reference-only
---
# Common orchestration patterns

[← Index](../INDEX.md) · [Harness concepts](01-harness-concepts.md) · [Design architecture](../architecture/02-reference-design.md)

| Pattern | Shape | Appropriate for | Trade-off |
|---|---|---|---|
| Single-agent loop | Decide → tool → observe → repeat | Interactive tasks, prototyping | Harder to bound if too open-ended |
| Sequential pipeline | Discover → classify → verify → publish | ETL, document analysis | Rigid stage ordering |
| Supervisor-worker | Controller delegates distinct tasks | Complex heterogeneous research | Coordination cost |
| Fan-out/fan-in | Partition work, parallel workers, reconcile | Independent documents/repos | Deduplication and rate control |
| Generator-critic | Produce → validate → revise | Reports, code, evidence assessment | Critic may share generator's errors |
| Event-driven | Event → scoped workflow | Syncs, changes, alerts | Need idempotency and queue management |
| Human approval | Pause → review → resume | Sensitive writes and ambiguity | May increase latency |

## Reasoning techniques
- **ReAct:** alternate reasoning and observations from tools.
- **Plan-and-execute:** outline steps then execute with possible replanning.
- **Reflection:** critique and bounded revision; use objective validators when possible.
- **Task decomposition:** explicitly scoped independently verifiable work units.
- **Model routing:** choose model/effort based on task class, eligibility and quality evidence.
- **Bounded autonomy:** cap turns, tool calls, wall time, retry attempts and spending.

## Suggested selection heuristic
Start with a single agent and deterministic tools. Introduce extra agents when measurable specialization, parallelism, or context isolation justifies their cost. Keep work ownership, exit criteria and budgets explicit.

## Example
To analyze 30,000 documents: deterministic discovery and hashing → parallel extraction → classify only unclear items → evidence-based resolution → publish indexed relationships. Avoid a supervisor model deciding each pagination call.

See [Context and state](03-context-and-state.md) and [Reliability](04-reliability-and-evals.md).

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-foundations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-004 — Delegation, Subagents, and Parallelism](../../handbook/agents/AEP-AGENT-004-delegation-subagents-and-parallelism.md)
- [AEP-AGENT-005 — Managers, Handoffs, and Ownership](../../handbook/agents/AEP-AGENT-005-managers-handoffs-and-ownership.md)
- [AEP-AGENT-006 — Planning, Decomposition, and Execution](../../handbook/agents/AEP-AGENT-006-planning-decomposition-and-execution.md)
- [AEP-AGENT-009 — Termination, Progress, and Recovery](../../handbook/agents/AEP-AGENT-009-termination-progress-and-recovery.md)
