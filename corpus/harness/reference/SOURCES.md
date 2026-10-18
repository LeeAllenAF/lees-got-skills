---
schema_version: '1.0'
id: HARNESS-REFERENCE-SOURCES
title: Source inventory and verification checklist
summary: 'Source inventory and verification checklist. Focus: provenance, source authority.'
type: reference
status: informational
version: 1.0.0
collection: harness
domains:
- reference
tags:
- provenance
- source-authority
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
  original_path: agentic-harness-foundations/reference/SOURCES.md
  original_sha256: 8efb9ce5e552368865c6b3d430ced3ff6743e413e092eb39c99c7f7566c4d98d
  original_metadata_record: harness/reference/SOURCES.md
  authority: reference-only
---
# Source inventory and verification checklist

[← Index](../INDEX.md) · [Decisions](../architecture/03-decisions-and-questions.md)

**Reviewed:** 2026-10-14. External source URLs are official documentation or source code; package prose is an authored synthesis. `main`-branch source may change after this date.

## Codex plugin
- [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins): what packages can contain.
- [Package your plugin](https://developers.openai.com/plugins/build/plugins): portable root manifest, MCP config, hooks and distribution boundaries.
- [Build skills](https://developers.openai.com/plugins/build/skills): skill composition and testing.
- [Skills concepts](https://developers.openai.com/plugins/concepts/skills): role of SKILL.md and supporting resources.
- [Codex hooks](https://developers.openai.com/codex/hooks): real event names, inputs and trust boundaries.
- [MCP specification](https://modelcontextprotocol.io/specification): standardized client/server capability semantics.

## Codex SDK
- [Official Codex SDK guide](https://developers.openai.com/codex/sdk).
- [TypeScript README](https://github.com/openai/codex/blob/main/sdk/typescript/README.md).
- [Codex class](https://github.com/openai/codex/blob/main/sdk/typescript/src/codex.ts): startThread and resumeThread.
- [ThreadOptions](https://github.com/openai/codex/blob/main/sdk/typescript/src/threadOptions.ts): model, reasoning, sandbox and approval configurations.
- [Thread implementation](https://github.com/openai/codex/blob/main/sdk/typescript/src/thread.ts): turn execution, streaming, inputs.
- [TurnOptions](https://github.com/openai/codex/blob/main/sdk/typescript/src/turnOptions.ts): structured output and cancellation options.
- [Events](https://github.com/openai/codex/blob/main/sdk/typescript/src/events.ts) and [items](https://github.com/openai/codex/blob/main/sdk/typescript/src/items.ts): observation types.
- [Codex config reference](https://developers.openai.com/codex/config-reference): CLI/runtime configuration.

## Codex App Server
- [App Server documentation](https://developers.openai.com/codex/app-server): protocol handshake, transports, thread methods, turns, steering and event stream.

## Agent harness context
- [LangGraph durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution): checkpoint-oriented agent workflows.
- [Temporal](https://docs.temporal.io/): durable workflow execution patterns.
- [OpenTelemetry](https://opentelemetry.io/docs/): telemetry standard.

## Verification before implementation
1. Pin Codex and `@openai/codex-sdk` versions and check installed `.d.ts` files.
2. Confirm current manifest and MCP schema before producing distributable plugins.
3. Probe model IDs and supported effort levels with an approved login.
4. Test SDK run, streaming, structured outputs, cancellation and resume.
5. If using App Server, generate/inspect the current protocol schema and handle version drift.
6. Obtain enterprise approval for automation, permissions, source access, caching and data retention.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-reference.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-SRC-001 — Source Intelligence Fundamentals](../../handbook/sources/aep-src-001-source-intelligence-fundamentals.md)
- [AEP-KNOW-006 — Provenance, Evidence, and Freshness](../../handbook/knowledge/AEP-KNOW-006-provenance-evidence-and-freshness.md)
