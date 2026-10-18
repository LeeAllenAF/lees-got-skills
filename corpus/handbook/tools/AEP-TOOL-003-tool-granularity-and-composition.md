---
schema_version: '1.0'
id: AEP-TOOL-003
title: Tool Granularity and Composition
summary: 'Tool Granularity and Composition. Focus: orchestration, tool design.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- orchestration
- tool-design
scope:
- enterprise-global
related:
- AEP-TOOL-001
- AEP-TOOL-002
- AEP-CTX-007
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-003-tool-granularity-and-composition.md
  original_sha256: fe369ba63a1ee4af9c64d5b3cde79a683b879f1a1d1a94b1a56c3a4a71438a6b
  original_metadata_record: handbook/tools/AEP-TOOL-003-tool-granularity-and-composition.md
  authority: inherited-source-context
---

# AEP-TOOL-003 — Tool Granularity and Composition

## 1. Purpose

Tool granularity determines how much decision-making lives in the agent versus the tool implementation.

Too fine-grained and the model must orchestrate dozens of low-level calls. Too coarse-grained and tools become ambiguous, overpowered, difficult to authorize, and difficult to compose.

> **Choose the smallest coherent capability, not the smallest possible operation.**

## 2. Three useful levels

### Primitive tools

Expose low-level operations such as reading a file, querying a record, or running a command.

Best when flexibility and composition matter.

### Domain tools

Represent stable domain operations such as `create_invoice`, `run_project_tests`, or `lookup_customer`.

Often the best default for business systems.

### Workflow tools

Perform multi-step deterministic processes such as collecting test results from multiple packages and returning an aggregate.

Use when the steps are predictable and the model does not need to reason between them.

## 3. When to move orchestration into code

If the model repeatedly performs the same sequence:

```text
call A
parse
call B
filter
call C
aggregate
```

consider implementing a deterministic workflow tool.

Current OpenAI Programmatic Tool Calling guidance explicitly recommends code-driven orchestration when results can be predictably filtered, joined, ranked, deduplicated, aggregated, or validated.

## 4. When not to hide steps

Keep steps agent-visible when intermediate results require judgment or when hiding them would obscure important evidence.

For example, a code-review workflow may need the model to inspect test failures before deciding which source file to read next.

## 5. Cohesion test

A tool is likely too broad if its description contains many unrelated verbs or if authorization requirements differ substantially across its modes.

A tool is likely too narrow if meaningful user intent requires many deterministic calls with no reasoning between them.

## 6. Authorization pressure is an architectural signal

If one tool needs permissions ranging from read-only to destructive administration, split it.

Authorization boundaries are often better granularity boundaries than conceptual object models.

## 7. Composition

Tools should compose through stable identifiers and structured outputs.

Prefer:

```text
search_repository -> file_id/path -> read_file -> test_target
```

rather than hidden natural-language coupling between tools.

## 8. Experimentation

There is no universal ideal tool size. `EXP-TOOL-001` should compare narrow, domain-coherent, and multifunction variants using selection accuracy, call count, latency, task success, and security/approval complexity.

## 9. Guidance

Start domain-coherent. Split when authority or semantics diverge. Combine when repeated deterministic orchestration is measurable waste. Do not refactor tool boundaries solely because a particular model currently struggles; verify that the change improves the system across representative workloads.

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
- [AEP-TOOL-002 — Tool Contracts and Schemas](AEP-TOOL-002-tool-contracts-and-schemas.md)
- [AEP-CTX-007 — Progressive Disclosure](../context/AEP-CTX-007-progressive-disclosure.md)
