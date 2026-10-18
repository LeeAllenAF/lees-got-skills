---
schema_version: '1.0'
id: HARNESS-CODEX-SDK-01-SDK-FOUNDATIONS
title: Codex TypeScript SDK foundations
summary: 'Codex TypeScript SDK foundations. Focus: authentication, codex sdk.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- codex-integration
tags:
- authentication
- codex-sdk
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
  original_path: agentic-harness-foundations/codex-sdk/01-sdk-foundations.md
  original_sha256: 038e9ee9934689e1cc64c3fe62d632456f48951e4840376afc7dc8931308ad4e
  original_metadata_record: harness/codex-sdk/01-sdk-foundations.md
  authority: reference-only
---
# Codex TypeScript SDK foundations

[← Index](../INDEX.md) · [Capabilities](02-configuration-and-capabilities.md) · [Orchestration](03-orchestration-pattern.md)

## What it is
**[DOCUMENTED]** The TypeScript package `@openai/codex-sdk` wraps the Codex CLI, spawning it and exchanging JSONL events over stdin/stdout. It is distinct from the OpenAI Agents SDK and OpenAI Platform Agents API. The SDK can use an existing approved Codex authentication session; no separate Platform API key is inherently required for that use path. Verify enterprise terms and configured authentication before unattended use.

Install:
```sh
pnpm add @openai/codex-sdk
```
**[VERIFY]** SDK/CLI binary packaging is version-dependent; install additional CLI dependencies only if current package docs say so. See [TypeScript README](https://github.com/openai/codex/blob/main/sdk/typescript/README.md).

## Basic workflow
```ts
import { Codex } from '@openai/codex-sdk';
const client = new Codex();
const thread = client.startThread();
const turn = await thread.run('Summarize this repository architecture');
console.log(turn.finalResponse);
const next = await thread.run('Identify architectural risks');
```

**[DOCUMENTED]** `startThread()` creates a thread; `resumeThread(id, options)` reconnects to a persisted conversation, subject to local session availability. `run()` returns completed turn data; `runStreamed()` yields structured events.

## Constraints
The SDK gives application-driven Codex invocation, but is not equivalent to direct control of each internal model token/tool-selection decision. The installed SDK types are authoritative over source `main` when versions differ.

Sources: https://github.com/openai/codex/blob/main/sdk/typescript/README.md ; https://github.com/openai/codex/blob/main/sdk/typescript/src/codex.ts

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-codex-sdk.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-AGENT-003 — Single-Agent Patterns](../../handbook/agents/AEP-AGENT-003-single-agent-patterns.md)
- [AEP-MODEL-001 — Model Selection Fundamentals](../../handbook/models/AEP-MODEL-001-model-selection-fundamentals.md)
- [AEP-SEC-004 — Identity, Credentials, and Secrets](../../handbook/security/AEP-SEC-004-identity-credentials-and-secrets.md)
