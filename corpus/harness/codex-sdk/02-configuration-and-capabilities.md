---
schema_version: '1.0'
id: HARNESS-CODEX-SDK-02-CONFIGURATION-AND-CAPABILITIES
title: 'SDK capability map: models, threads, and outputs'
summary: 'SDK capability map: models, threads, and outputs. Focus: codex sdk, reasoning effort, structured output.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- codex-sdk
- reasoning-effort
- structured-output
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
  original_path: agentic-harness-foundations/codex-sdk/02-configuration-and-capabilities.md
  original_sha256: f6b5e321d5e18ad555995a545551e75c1be8e1205fed7d02148650a4f743b8ce
  original_metadata_record: harness/codex-sdk/02-configuration-and-capabilities.md
  authority: reference-only
---
# SDK capability map: models, threads, and outputs

[← Index](../INDEX.md) · [SDK basics](01-sdk-foundations.md) · [SDK controller](03-orchestration-pattern.md)

## Thread options [DOCUMENTED, source snapshot 2026-10-14]
From [threadOptions.ts](https://github.com/openai/codex/blob/main/sdk/typescript/src/threadOptions.ts):

| Option | Purpose |
|---|---|
| `model` | Requested model identifier |
| `modelReasoningEffort` | Requested reasoning intensity |
| `workingDirectory` | Execution working directory |
| `sandboxMode` | Filesystem/process sandbox selection |
| `approvalPolicy` | Approval behavior |
| `networkAccessEnabled` | Network allowance in supported sandbox |
| `webSearchMode` | Disabled / cached / live search |
| `additionalDirectories` | Additional accessible paths |
| `skipGitRepoCheck` | Override repo check |
| `threadSource` | Thread source classification |

The source additionally has `webSearchEnabled` (legacy/alternate configuration). **[VERIFY]** Exact accepted combinations and enabled settings depend on CLI/model/account/runtime policies.

### Model reasoning effort
The TypeScript source declares `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra`, and `persistent` as possible strings. **Do not assume any particular model accepts them all.** Model identifiers shown in documentation are examples rather than entitlement guarantees.

## Execution and results [DOCUMENTED]
- `run(prompt)` returns a final response, items and usage when available.
- `runStreamed(prompt)` returns structured events, enabling progress reporting and observability.
- `resumeThread(id)` creates a thread handle for earlier local sessions.
- `TurnOptions.outputSchema` allows a JSON Schema output contract for a turn.
- User inputs can include text and local-image references.
- Streaming event types cover thread/turn and item transitions; tool and file-change items can be observed.

## Example model-specific thread
```ts
const thread = codex.startThread({
  model: process.env.CODEX_RESEARCH_MODEL,
  modelReasoningEffort: 'high',
  sandboxMode: 'read-only',
  approvalPolicy: 'on-request',
});
```
This configuration requests settings; it does not guarantee host acceptance.

## Operational checks
1. Check `node_modules/@openai/codex-sdk` declarations and pinned version.
2. Verify enabled models and effort levels under approved account.
3. Test auth session expiry, concurrency limits, and background execution.
4. Capture run/stream item and usage shapes in integration tests.
5. Confirm sandbox behavior on the target operating system.

Sources: https://github.com/openai/codex/blob/main/sdk/typescript/src/threadOptions.ts ; https://github.com/openai/codex/blob/main/sdk/typescript/src/thread.ts ; https://github.com/openai/codex/blob/main/sdk/typescript/src/events.ts ; https://developers.openai.com/codex/config-reference

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-codex-sdk.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-MODEL-004 — Reasoning Effort and Test-Time Compute](../../handbook/models/AEP-MODEL-004-reasoning-effort-and-test-time-compute.md)
- [AEP-TOOL-002 — Tool Contracts and Schemas](../../handbook/tools/AEP-TOOL-002-tool-contracts-and-schemas.md)
- [AEP-SEC-006 — Sandboxing, Filesystem, and Network Isolation](../../handbook/security/AEP-SEC-006-sandboxing-filesystem-and-network-isolation.md)
