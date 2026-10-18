---
schema_version: '1.0'
id: HARNESS-CODEX-SDK-03-ORCHESTRATION-PATTERN
title: Application-managed orchestration using the Codex SDK
summary: 'Application-managed orchestration using the Codex SDK. Focus: codex sdk, orchestration, state management.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- codex-sdk
- orchestration
- state-management
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
  original_path: agentic-harness-foundations/codex-sdk/03-orchestration-pattern.md
  original_sha256: 2104a4bf34bfe793d4b3c1d8d9be8d7dc800e99144c6caec7844df834711c122
  original_metadata_record: harness/codex-sdk/03-orchestration-pattern.md
  authority: reference-only
---
# Application-managed orchestration using the Codex SDK

[← Index](../INDEX.md) · [SDK options](02-configuration-and-capabilities.md) · [Reference design](../architecture/02-reference-design.md)

## Controller architecture [DESIGN]
```text
scheduler -> work queue -> controller -> Codex SDK thread
                                  |         |
                             policy gate   | run / runStreamed
                                  |         v
                            output validator
                                  |
                            checkpoint store
```

Treat the SDK as an **inference worker interface**, not the source of truth for task state. Controller decisions are deterministic where possible. Threads are attached to work units by stable identifiers; outputs must pass schemas and evidence validation before publication.

## Worker routing
Select a model and effort by class of task (e.g., simple classification vs. contradictory-source analysis). Validate entitlement, throughput and quality empirically. Multiple thread instances may serve distinct workers; concurrency must obey organization policy and usage limits.

## Pseudocode (illustrative)
```ts
async function processWorkUnit(work: WorkUnit) {
  const lease = await store.claim(work.id);
  const thread = codex.startThread({
    model: routing.choose(work.kind),
    sandboxMode: 'read-only',
  });
  const turn = await thread.run(buildTaskPrompt(lease), {
    outputSchema: schemas.forKind(work.kind),
  });
  const parsed = validateAgainstSchema(turn.finalResponse);
  await verifyEvidence(parsed);
  await store.commitResult(lease, parsed);
}
```
These helper names are **application-defined**, not SDK methods. Error handling, timeouts, renewals, cancellation and retries are omitted.

## Failure handling
- Failed inference → retry according to a bounded policy, possibly requeue.
- Invalid structured output → targeted repair or escalation.
- SDK process crash → persist work status independently; reclaim lease.
- Side effect succeeds but response fails → reconcile with idempotency identifier.
- Session context unavailable → reconstruct task from work + evidence refs instead of relying on hidden reasoning history.

See [state](../foundations/03-context-and-state.md), [evals](../foundations/04-reliability-and-evals.md), and [App Server](../app-server/01-app-server-foundations.md).

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-codex-sdk.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-006 — Planning, Decomposition, and Execution](../../handbook/agents/AEP-AGENT-006-planning-decomposition-and-execution.md)
- [AEP-AGENT-009 — Termination, Progress, and Recovery](../../handbook/agents/AEP-AGENT-009-termination-progress-and-recovery.md)
- [AEP-TOOL-005 — Errors, Retries, and Idempotency](../../handbook/tools/AEP-TOOL-005-errors-retries-and-idempotency.md)
