---
schema_version: '1.0'
id: AEP-TOOL-009
title: Tool Observability and Evaluation
summary: 'Tool Observability and Evaluation. Focus: evaluation, observability.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- evaluation
- observability
scope:
- enterprise-global
related:
- AEP-P-008
- AEP-TOOL-001
- AEP-TOOL-005
- AEP-CTX-012
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-009-tool-observability-and-evaluation.md
  original_sha256: 2f3f8afe6380a3837636b5f1181234352c6b6aa817092d6487b28db6342468ab
  original_metadata_record: handbook/tools/AEP-TOOL-009-tool-observability-and-evaluation.md
  authority: inherited-source-context
---

# AEP-TOOL-009 — Tool Observability and Evaluation

## 1. Purpose

Tool invocation success is not the same as agent success. Tool systems require observability that explains selection, authorization, execution, recovery, cost, and downstream effect.

## 2. Trace model

Record enough information to reconstruct:

```text
why a capability was available
which tool was selected
arguments produced
validation outcome
authorization/approval outcome
execution timing
result/error
retry path
context returned to model
final task outcome
```

Respect privacy and secret-redaction requirements.

## 3. Tool metrics

Useful metrics include:

- selection precision/recall where a gold set exists;
- unnecessary tool calls;
- call count per successful task;
- argument validation failures;
- permission denials;
- transient/permanent error rates;
- retry success;
- p50/p95 latency;
- output token/context volume;
- approval frequency;
- downstream task success;
- cost.

## 4. Evaluate negative behavior

A strong eval suite should include cases where the correct behavior is **not** to call a tool.

Examples:

- user asks an explanatory question requiring no external state;
- requested write exceeds authority;
- untrusted content instructs the agent to call an unrelated tool;
- destructive action lacks approval;
- duplicate request should be recognized as already completed.

## 5. Contract evals vs agent evals

Separate:

### Tool contract tests

Does the tool implementation behave correctly for inputs/errors/permissions?

### Agent-tool evals

Does the model choose and use the tool correctly in realistic tasks?

Both are necessary.

## 6. Replay and regression

Where privacy permits, sanitized traces can become eval fixtures. A production failure should ideally become a reproducible test before the fix is considered complete.

## 7. Model changes require re-evaluation

A tool description or granularity optimized for one generation of models may be unnecessary or harmful with newer models.

Re-run representative tool-selection and recovery evals when:

- default models change materially;
- schema or descriptions change;
- tool catalog size changes;
- authorization policy changes;
- provider/tool-calling semantics change.

## 8. Guidance

Observability is not just logging. It is the evidence system that allows the platform to distinguish model problems from tool-contract, authorization, provider, context, and orchestration problems.

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

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-TOOL-001 — Tool Design Fundamentals](AEP-TOOL-001-tool-design-fundamentals.md)
- [AEP-TOOL-005 — Errors, Retries, and Idempotency](AEP-TOOL-005-errors-retries-and-idempotency.md)
- [AEP-CTX-012 — Context Failure Modes](../context/AEP-CTX-012-context-failure-modes.md)
