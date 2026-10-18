---
schema_version: '1.0'
id: AEP-AGENT-009
title: Termination, Progress, and Recovery
summary: 'Termination, Progress, and Recovery. Focus: budgets, recovery, termination.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- budgets
- recovery
- termination
scope:
- enterprise-global
related:
- AEP-TOOL-005
- AEP-CTX-008
- AEP-MODEL-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-009-termination-progress-and-recovery.md
  original_sha256: 5229faa1349e5bf67064a037c5e486bb67a5aadcfd81470a76a9d3ab8273c634
  original_metadata_record: handbook/agents/AEP-AGENT-009-termination-progress-and-recovery.md
  authority: inherited-source-context
---
# AEP-AGENT-009 — Termination, Progress, and Recovery

## Purpose
Ensure agent loops stop for principled reasons and recover safely from failure.

## Stop conditions
Examples:
- objective verified;
- required structured output produced;
- user/human approval required;
- budget exhausted;
- repeated non-progress;
- unrecoverable tool failure;
- authority boundary reached;
- cancellation.

## Progress
Progress should be measured externally where possible: tests newly passing, errors reduced, required artifacts produced, evidence gaps closed, or task graph nodes completed.

Model statements such as 'I am making progress' are not sufficient telemetry.

## Non-progress detection
Track repeated actions, repeated failures, unchanged outputs, oscillation, and retries without new evidence. When detected, change strategy, escalate, or terminate.

## Recovery
Persist enough structured state to resume without reconstructing the entire reasoning history. Long-running architectures should support checkpoints, idempotent replay, cancellation, and known-unknown outcomes.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-005 — Errors, Retries, and Idempotency](../tools/AEP-TOOL-005-errors-retries-and-idempotency.md)
- [AEP-CTX-008 — Context Compression and Compaction](../context/AEP-CTX-008-context-compression-and-compaction.md)
- [AEP-MODEL-006 — Cascades, Escalation, and Rescue](../models/AEP-MODEL-006-cascades-escalation-and-rescue.md)
- [HARNESS-FOUNDATIONS-02-ORCHESTRATION-PATTERNS — Common orchestration patterns](../../harness/foundations/02-orchestration-patterns.md)
- [HARNESS-CODEX-SDK-03-ORCHESTRATION-PATTERN — Application-managed orchestration using the Codex SDK](../../harness/codex-sdk/03-orchestration-pattern.md)
- [HARNESS-APP-SERVER-02-LIFECYCLE-AND-INTEGRATION — App Server lifecycle and integration decisions](../../harness/app-server/02-lifecycle-and-integration.md)
