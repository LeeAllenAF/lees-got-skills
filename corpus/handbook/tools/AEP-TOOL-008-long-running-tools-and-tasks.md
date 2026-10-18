---
schema_version: '1.0'
id: AEP-TOOL-008
title: Long-Running Tools and Tasks
summary: 'Long-Running Tools and Tasks. Focus: recovery, state management, termination.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- recovery
- state-management
- termination
scope:
- enterprise-global
related:
- AEP-TOOL-005
- AEP-TOOL-007
- AEP-CTX-008
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-008-long-running-tools-and-tasks.md
  original_sha256: e69b870c003aa9c5fb7cbaea8f81e8e5b41130d637075114ce080c45372c4f84
  original_metadata_record: handbook/tools/AEP-TOOL-008-long-running-tools-and-tasks.md
  authority: inherited-source-context
---

# AEP-TOOL-008 — Long-Running Tools and Tasks

## 1. Purpose

Some operations exceed the useful lifetime of a synchronous tool call: deployments, builds, large analyses, data exports, migrations, remote workflows, and human-in-the-loop processes.

These require durable task semantics rather than pretending every operation completes immediately.

## 2. Task model

A long-running task should expose at least:

```text
stable task/operation ID
status
created/updated timestamps
progress where meaningful
current phase
recoverable result reference
structured error
cancellation semantics
```

## 3. Do not occupy model context while waiting

The agent should not repeatedly reason about an operation that is simply still running.

Prefer:

```text
start operation
→ receive handle
→ persist task state
→ resume/check when appropriate
→ inspect final result
```

## 4. MCP Tasks

The MCP 2026-07-28 Tasks extension allows a server to return a task handle from a tool call, with client operations for getting, updating, and cancelling the task. Task creation is server-directed and the task is modeled as durable execution state.

Because Tasks are an extension and have already evolved across MCP versions, the platform implementations must pin protocol compatibility and include migration tests.

## 5. Cancellation

Cancellation must define whether it is:

- guaranteed;
- best-effort;
- unsupported after a phase boundary;
- compensating rather than truly cancelling.

Do not tell a model that a task was cancelled merely because a cancel request was accepted.

## 6. Progress

Progress should represent useful state, not fabricated percentages.

Prefer semantic phases:

```text
queued → building → validating → deploying → verifying
```

unless a true percentage is available.

## 7. Human interaction

If a running task requires approval or input, persist the pending request explicitly. Long-running state must survive model-context compaction and process restarts.

## 8. Retry and duplicate execution

Task creation should use stable operation IDs or idempotency semantics where duplicate starts would be harmful.

## 9. Guidance

Long-running work belongs in durable execution state. The agent should reason around phase transitions and exceptions, not act as the scheduler or state store.

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

- [AEP-TOOL-005 — Errors, Retries, and Idempotency](AEP-TOOL-005-errors-retries-and-idempotency.md)
- [AEP-TOOL-007 — MCP Architecture](AEP-TOOL-007-mcp-architecture.md)
- [AEP-CTX-008 — Context Compression and Compaction](../context/AEP-CTX-008-context-compression-and-compaction.md)
- [HARNESS-APP-SERVER-01-APP-SERVER-FOUNDATIONS — Codex App Server foundations](../../harness/app-server/01-app-server-foundations.md)
