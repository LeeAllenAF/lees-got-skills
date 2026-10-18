---
schema_version: '1.0'
id: AEP-TOOL-005
title: Errors, Retries, and Idempotency
summary: 'Errors, Retries, and Idempotency. Focus: error handling, idempotency, retries.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- error-handling
- idempotency
- retries
scope:
- enterprise-global
related:
- AEP-TOOL-002
- AEP-TOOL-003
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-005-errors-retries-and-idempotency.md
  original_sha256: 99a664df8cb7c695598070679d46fd00f9e5f42080bb57d87b1fe1ec1d134697
  original_metadata_record: handbook/tools/AEP-TOOL-005-errors-retries-and-idempotency.md
  authority: inherited-source-context
---

# AEP-TOOL-005 — Errors, Retries, and Idempotency

## 1. Purpose

Tool failures are normal operating conditions. Agent systems must distinguish errors that should be corrected, retried, escalated, or surfaced to a human.

## 2. Error taxonomy

At minimum distinguish:

```text
VALIDATION_ERROR     caller arguments invalid
NOT_FOUND            requested resource absent
CONFLICT             state changed / optimistic lock failed
PERMISSION_DENIED    caller lacks authority
AUTH_REQUIRED        authentication/consent needed
RATE_LIMITED         retry after provider limit
TRANSIENT_FAILURE    retry may succeed
PERMANENT_FAILURE    retry without change will not help
DEPENDENCY_FAILURE   upstream system failed
PARTIAL_SUCCESS      some effects completed
UNKNOWN              state cannot safely be inferred
```

## 3. Structured retry semantics

Tools should report whether retry is safe and, when useful, an earliest retry time.

Do not make the model derive retry policy from an exception string.

## 4. Idempotency

Write operations should be idempotent where practical.

Possible strategies:

- idempotency keys;
- optimistic concurrency/version checks;
- deduplication tokens;
- compare-and-set operations;
- explicit current-state checks.

Current OpenAI programmatic tool guidance specifically recommends idempotent function calls because replay/retry should not duplicate unsafe side effects.

## 5. Unknown outcome is special

Network failure after a request was sent can leave the caller uncertain whether the side effect occurred.

Do not blindly retry an irreversible operation in this state.

Prefer:

```text
request with operation_id
      ↓ timeout
lookup operation_id
      ↓
confirmed success / confirmed absence / escalate
```

## 6. Retry budgets

Retries must be bounded by:

- attempt count;
- elapsed time;
- monetary cost;
- side-effect risk;
- user-visible latency.

Repeated model reasoning around the same provider error should not become an unbounded loop.

## 7. Compensating actions

For workflows that span multiple systems, document whether rollback or compensation exists. Compensation is not the same as transactional rollback and may itself require approval.

## 8. Guidance

Errors are part of the tool contract. Tool quality includes how safely and cheaply an agent can recover when the happy path fails.

## References

Primary sources used for this sequence include:

- OpenAI, **Function calling** — https://developers.openai.com/api/docs/guides/function-calling
- OpenAI, **Programmatic Tool Calling** — https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling
- OpenAI, **Define tools – Plugins** — https://developers.openai.com/plugins/plan/tools
- Model Context Protocol, **2026-07-28 Specification** — https://blog.modelcontextprotocol.io/posts/2026-07-28/
- Model Context Protocol, **Tasks Extension** — https://tasks.extensions.modelcontextprotocol.io/specification/draft/tasks

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-tools.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-002 — Tool Contracts and Schemas](AEP-TOOL-002-tool-contracts-and-schemas.md)
- [AEP-TOOL-003 — Tool Granularity and Composition](AEP-TOOL-003-tool-granularity-and-composition.md)
- [HARNESS-FOUNDATIONS-04-RELIABILITY-AND-EVALS — Guardrails, evaluation, telemetry, and failure handling](../../harness/foundations/04-reliability-and-evals.md)
- [HARNESS-CODEX-SDK-03-ORCHESTRATION-PATTERN — Application-managed orchestration using the Codex SDK](../../harness/codex-sdk/03-orchestration-pattern.md)
