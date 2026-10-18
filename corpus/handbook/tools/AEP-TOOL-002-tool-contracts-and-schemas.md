---
schema_version: '1.0'
id: AEP-TOOL-002
title: Tool Contracts and Schemas
summary: 'Tool Contracts and Schemas. Focus: api design, schemas, structured output.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- api-design
- schemas
- structured-output
scope:
- enterprise-global
related:
- AEP-TOOL-001
- AEP-CTX-002
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-002-tool-contracts-and-schemas.md
  original_sha256: 90a3d8a2a816f022f6a8f86d16a8703a209b902a3cf85241171000351ae224ae
  original_metadata_record: handbook/tools/AEP-TOOL-002-tool-contracts-and-schemas.md
  authority: inherited-source-context
---

# AEP-TOOL-002 — Tool Contracts and Schemas

## 1. Purpose

A tool contract defines the exact interface between an agent and a capability. The contract should make intent, inputs, outputs, permissions, side effects, and failures explicit enough that both models and deterministic callers can use the tool safely.

## 2. Contract fields

the platform tool definitions should record, at minimum:

```text
stable name
title / human label
purpose and invocation conditions
input schema
output schema when predictable
authorization requirements
side-effect classification
idempotency semantics
cost / latency notes when material
failure model
provenance fields
version / deprecation state
```

This aligns with current OpenAI plugin/tool guidance, which explicitly calls for stable identifiers, clear descriptions, structured inputs/outputs, authorization, side-effect, and failure behavior.

## 3. Names and descriptions are part of runtime behavior

Descriptions are not documentation only. They influence tool selection.

A good description should answer:

- what goal this tool serves;
- when to use it;
- when not to use it;
- important side effects;
- prerequisites the caller must already have.

Avoid descriptions that overlap heavily with sibling tools.

## 4. Prefer strict schemas

Where the platform supports it, schema-constrained tool arguments should be preferred to free-form parsing.

Current OpenAI function calling recommends strict mode and JSON Schema constraints because they reduce malformed argument generation.

the platform should treat schema validation as necessary but insufficient. The application must still validate semantic correctness and authorization.

```text
Schema valid ≠ authorized
Schema valid ≠ resource exists
Schema valid ≠ action is safe
```

## 5. Inputs should express intent directly

Bad:

```json
{"query":"close issue 123 as fixed"}
```

Better:

```json
{"issue_id":"123","resolution":"fixed","comment":null}
```

The latter lets application code validate each decision independently.

Do not force the model to guess opaque account IDs, project IDs, branch names, or resource scopes when they can be discovered deterministically.

## 6. Output schemas

Structured output is especially valuable when results will be:

- filtered;
- joined;
- ranked;
- cached;
- validated;
- passed to another tool;
- consumed by deterministic orchestration.

Example:

```json
{
  "status": "ok",
  "commit": "abc123",
  "changed_files": ["src/a.ts"],
  "warnings": []
}
```

Prefer compact structured results plus references to large artifacts rather than dumping large logs into model context.

## 7. Stable identifiers

Outputs should return stable identifiers required for follow-up operations.

If `search_issues` returns human titles but not issue IDs, every follow-up action becomes fragile.

Stable IDs also improve traceability and reduce repeated retrieval.

## 8. Error schema

Errors should be machine-actionable.

Recommended conceptual shape:

```json
{
  "status": "error",
  "code": "PERMISSION_DENIED",
  "retryable": false,
  "message": "Readable explanation",
  "details": {},
  "correlation_id": "..."
}
```

Do not require an agent to infer retryability from prose.

## 9. Avoid schema overfitting

Excessively deep schemas can be as harmful as under-specified ones.

A schema should reflect meaningful decisions, not internal database representation.

Large enums and deeply nested polymorphism may increase model error rates and context cost. Split or discover detail progressively when appropriate.

## 10. Contract testing

Every production tool should have tests for:

- valid inputs;
- invalid schemas;
- semantic invalidity;
- permission denial;
- missing resources;
- transient failures;
- unexpected provider responses;
- output schema stability;
- side-effect behavior;
- idempotent retries where promised.

## 11. Guidance

Tool contracts are versioned APIs. Treat breaking schema changes exactly as breaking software-interface changes, regardless of whether the primary caller is an LLM.

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

- [AEP-TOOL-001 — Tool Design Fundamentals](AEP-TOOL-001-tool-design-fundamentals.md)
- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](../context/AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [HARNESS-CODEX-SDK-02-CONFIGURATION-AND-CAPABILITIES — SDK capability map: models, threads, and outputs](../../harness/codex-sdk/02-configuration-and-capabilities.md)
