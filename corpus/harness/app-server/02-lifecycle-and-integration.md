---
schema_version: '1.0'
id: HARNESS-APP-SERVER-02-LIFECYCLE-AND-INTEGRATION
title: App Server lifecycle and integration decisions
summary: 'App Server lifecycle and integration decisions. Focus: codex app server, human approval, state management.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- codex-app-server
- human-approval
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
  original_path: agentic-harness-foundations/app-server/02-lifecycle-and-integration.md
  original_sha256: f4a41a80cabbe8af67192e780c643baf64130d4109d25f0ff5a274b7c67df317
  original_metadata_record: harness/app-server/02-lifecycle-and-integration.md
  authority: reference-only
---
# App Server lifecycle and integration decisions

[← Index](../INDEX.md) · [App Server basics](01-app-server-foundations.md) · [Architecture boundaries](../architecture/01-integration-boundaries.md)

## Core lifecycle [DOCUMENTED]
```text
start app-server process / connect
  -> initialize (clientInfo)
  -> initialized
  -> thread/start OR thread/resume
  -> turn/start (input, per-turn settings)
  -> consume notifications and any server requests
  -> turn completed / failed / interrupted
  -> persist external application state
```

## Example wire messages (schematic)
```json
{"method":"initialize","id":0,"params":{"clientInfo":{"name":"research_client","title":"Research Client","version":"0.1.0"}}}
```
```json
{"method":"initialized","params":{}}
```
```json
{"method":"thread/start","id":1,"params":{"cwd":"/workspace/research"}}
```
```json
{"method":"turn/start","id":2,"params":{"threadId":"THREAD_ID","input":[{"type":"text","text":"Analyze evidence bundle 42"}]}}
```
Real integrations must read responses and substitute returned IDs; these are not a complete working client.

## Documented features worth investigating
- Threads: start, resume, fork, list/read/history functions subject to documented surface.
- Turns: start, steer, and streaming notifications for items/progress.
- Fine-grained options for cwd, model, approvals and sandbox policy.
- Client-side approval / user interaction workflow where supported.
- Tool-result input paths and skill input items where documented.
- Experimental endpoints/fields require opt-in and explicit testing.

## Architectural advice [DESIGN]
For a queue-driven backend, use the SDK first: smaller integration and maintenance surface. Move to App Server if there is a **specific** requirement for protocol-level session management, bidirectional interaction, steering, or advanced event semantics that SDK does not cover. Avoid implementing two execution interfaces simultaneously without a clear adapter boundary.

## Security notes
App Server connections can control code-executing sessions. Bind transports locally, authenticate any exposed transport per docs, and do not publish unsecured network endpoints. Keep user approvals distinct from backend business-policy approvals.

Official reference: https://developers.openai.com/codex/app-server

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-app-server.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-009 — Termination, Progress, and Recovery](../../handbook/agents/AEP-AGENT-009-termination-progress-and-recovery.md)
- [AEP-SEC-007 — Human Approvals and Consequential Actions](../../handbook/security/AEP-SEC-007-human-approvals-and-consequential-actions.md)
- [AEP-OPS-002 — Observability and Traceability](../../handbook/operations/aep-ops-002-observability-and-traceability.md)
