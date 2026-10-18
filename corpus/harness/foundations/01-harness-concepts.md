---
schema_version: '1.0'
id: HARNESS-FOUNDATIONS-01-HARNESS-CONCEPTS
title: 'Harness foundations: mental model and components'
summary: 'Harness foundations: mental model and components. Focus: harness design, orchestration.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- engineering-foundations
tags:
- harness-design
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
  original_path: agentic-harness-foundations/foundations/01-harness-concepts.md
  original_sha256: 89af074c02ee2d77150eded5adca9cb20f271b255d887b59e9763c728aaf55c3
  original_metadata_record: harness/foundations/01-harness-concepts.md
  authority: reference-only
---
# Harness foundations: mental model and components

[← Index](../INDEX.md) · [Patterns →](02-orchestration-patterns.md) · [Glossary](../reference/GLOSSARY.md)

## Definition
An **agentic harness** is the runtime and application infrastructure around a model that makes goal-directed reasoning executable, observable, bounded, and recoverable. The **model** infers decisions, the **agent** applies model capabilities to a goal, the **harness** provides tools, state and policies, and a **workflow** describes progression.

## Canonical loop
1. Observe current work state and relevant evidence.
2. Assemble a bounded context.
3. Invoke a model only where judgment is needed.
4. Validate requested actions and execute tools under policy.
5. Persist observations, artifacts, cost, and checkpoint.
6. Verify completion; continue, retry, escalate, or finish.

A single model prompt or fixed linear chain is not necessarily autonomous. Autonomy is a degree of decision authority, not a binary label.

## Component responsibilities
| Component | Responsibility | Usually deterministic? |
|---|---|---|
| Controller/orchestrator | State transitions, scheduling, routing, budget | Yes |
| Model gateway | Select configured model and inference invocation | Mostly |
| Agent | Interpret evidence; plan or synthesize | No |
| Tool registry/executor | Typed interface, authz, sandbox, timeout | Yes |
| Context assembler | Retrieve, trim, order, and reference evidence | Mostly |
| Work store | Queues, leases, checkpoints, artifacts | Yes |
| Knowledge index | Search and relationship lookup | Mostly |
| Evaluator | Tests, evidence checks, quality metrics | Hybrid |
| Telemetry | Traces, logs, counters, cost | Yes |

## Key design principle
**[DESIGN]** Prefer deterministic mechanisms for pagination, parsing, retry policies, permissions, hashing, deduplication, and state. Reserve LLM calls for ambiguity, classification, planning, and interpretation. This reduces cost and gives objective test surfaces.

## Further reading
- [Orchestration patterns](02-orchestration-patterns.md)
- [Memory/state/context](03-context-and-state.md)
- [SDK orchestration](../codex-sdk/03-orchestration-pattern.md)

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-foundations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-001 — Agent Architecture Fundamentals](../../handbook/agents/AEP-AGENT-001-agent-architecture-fundamentals.md)
- [AEP-AGENT-002 — Deterministic Workflows vs Agent Loops](../../handbook/agents/AEP-AGENT-002-workflows-vs-agent-loops.md)
- [AEP-HBK-000 — Agentic Engineering Platform Charter](../../handbook/foundations/AEP-HBK-000-charter.md)
