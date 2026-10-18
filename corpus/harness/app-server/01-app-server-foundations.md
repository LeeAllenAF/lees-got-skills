---
schema_version: '1.0'
id: HARNESS-APP-SERVER-01-APP-SERVER-FOUNDATIONS
title: Codex App Server foundations
summary: 'Codex App Server foundations. Focus: architecture, codex app server.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- architecture
- codex-app-server
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
  original_path: agentic-harness-foundations/app-server/01-app-server-foundations.md
  original_sha256: a3e79e94d7477abb53fff528a912e29e2016a6e59c6cca0153f5406e6b2746f9
  original_metadata_record: harness/app-server/01-app-server-foundations.md
  authority: reference-only
---
# Codex App Server foundations

[← Index](../INDEX.md) · [Lifecycle](02-lifecycle-and-integration.md) · [SDK comparison](../architecture/01-integration-boundaries.md)

## Purpose
**[DOCUMENTED]** `codex app-server` exposes a bidirectional protocol intended for richer Codex client integrations. It uses JSON-RPC-style messages (the `jsonrpc: "2.0"` member is omitted on the wire). Unlike MCP, which exposes *tools to agents*, App Server exposes *Codex session/turn control to an application client*.

## Transport [DOCUMENTED]
- `stdio` (default): JSONL messages.
- Unix socket: available as documented.
- WebSocket listener: documented as experimental/unsupported; do not make it a production requirement without confirming current support.

## Core protocol concepts
- Client sends `initialize` request, then `initialized` notification; this handshake is required.
- `thread/start`: create conversation.
- `thread/resume`: reopen previous thread.
- `thread/fork`: branch thread history.
- `turn/start`: start an agent turn with input and options.
- `turn/steer`: append steering input to an active turn.
- Turn/item notifications stream progress and results.

## Why consider it?
App Server can enable an interactive application to manage approvals, watch event streams, steer in-flight work, and build more advanced session UX or custom lifecycle controls than the lightweight SDK surface offers.

## Boundaries
A richer protocol carries more client responsibilities: handshake, event processing, cancellation, error handling, reconnection, version compatibility and security. Not every field is stable; experimental capabilities require explicit opt-in. App Server is **not** the OpenAI Platform Agents API.

## Official source
https://developers.openai.com/codex/app-server

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-app-server.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-008 — Long-Running Tools and Tasks](../../handbook/tools/AEP-TOOL-008-long-running-tools-and-tasks.md)
- [AEP-AGENT-008 — Human-in-the-Loop and Authority Boundaries](../../handbook/agents/AEP-AGENT-008-human-in-the-loop-and-authority-boundaries.md)
