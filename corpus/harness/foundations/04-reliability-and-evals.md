---
schema_version: '1.0'
id: HARNESS-FOUNDATIONS-04-RELIABILITY-AND-EVALS
title: Guardrails, evaluation, telemetry, and failure handling
summary: 'Guardrails, evaluation, telemetry, and failure handling. Focus: evaluation, observability, reliability,
  security controls.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- engineering-foundations
tags:
- evaluation
- observability
- reliability
- security-controls
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
  original_path: agentic-harness-foundations/foundations/04-reliability-and-evals.md
  original_sha256: b19d7bea66539ac314f91e0ce066b1f0cd809c3c93c74cae6f5dc6451538527b
  original_metadata_record: harness/foundations/04-reliability-and-evals.md
  authority: reference-only
---
# Guardrails, evaluation, telemetry, and failure handling

[← Index](../INDEX.md) · [State](03-context-and-state.md) · [MCP/hooks](../codex-plugin/03-mcp-and-hooks.md)

## Hard vs soft controls
**[DESIGN]** Skills and prompts establish *behavioral expectations*. Tool code enforces *permissions, schemas, budgets, approvals and transaction safety*. A prompt is not an authorization barrier.

## Threats
Prompt injection from docs/repo content; leakage of credentials; excessive tool permissions; runaway loops; stale indexed facts; invented relationships; ambiguous entity resolution; duplicate side effects on retries; unavailable backend services.

## Controls
Least-privilege credentials, read-only-by-default tools, allowlisted domains/workspaces, structured input validation, approval for sensitive writes, execution budgets, controlled network access, bounded output size, and provenance tagging.

## Evaluation categories
| Metric | Why |
|---|---|
| Completion rate | Did requested work finish? |
| Precision / recall | Accuracy and coverage of extracted relationships |
| Evidence validity | Are claims tied to real source content? |
| Retries and recovery | How often can work resume safely? |
| Token/cost per accepted result | Operational efficiency |
| Time to result | End-to-end throughput |
| Unauthorized action attempts | Policy effectiveness |
| Human escalation rate | Operational autonomy |

Use fixture-based tests for deterministic parts, replay of captured inputs where permitted, and holdout evaluation datasets for model-generated classifications. A model critiquing itself is not a substitute for external evidence.

## Observability
Log run_id, work_unit_id, thread_id, model (when provided), tool name, latency, outcome, artifact/evidence references, and usage counters. Avoid logging sensitive raw prompts or responses by default.

Related: [App Server events](../app-server/02-lifecycle-and-integration.md); [architecture](../architecture/02-reference-design.md).

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-foundations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-001 — Evaluation Fundamentals](../../handbook/evals/AEP-EVAL-001-evaluation-fundamentals.md)
- [AEP-EVAL-011 — Evaluation Harness and Reproducibility](../../handbook/evals/AEP-EVAL-011-evaluation-harness-and-reproducibility.md)
- [AEP-SEC-001 — Security and Authority Fundamentals](../../handbook/security/AEP-SEC-001-security-and-authority-fundamentals.md)
- [AEP-TOOL-005 — Errors, Retries, and Idempotency](../../handbook/tools/AEP-TOOL-005-errors-retries-and-idempotency.md)
