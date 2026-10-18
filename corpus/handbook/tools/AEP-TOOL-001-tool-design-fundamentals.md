---
schema_version: '1.0'
id: AEP-TOOL-001
title: Tool Design Fundamentals
summary: 'Tool Design Fundamentals. Focus: authorization, deterministic control, tool design.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- authorization
- deterministic-control
- tool-design
scope:
- enterprise-global
related:
- AEP-P-001
- AEP-P-005
- AEP-P-006
- AEP-P-011
- AEP-P-016
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
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-001-tool-design-fundamentals.md
  original_sha256: 9aaa9737c395409ac15d2be55d289b9266f97bf4c54f2a843263df397b529f18
  original_metadata_record: handbook/tools/AEP-TOOL-001-tool-design-fundamentals.md
  authority: inherited-source-context
---

# AEP-TOOL-001 — Tool Design Fundamentals

## 1. Purpose

Tools are the boundary between model reasoning and external reality. They let an agent inspect repositories, query systems, execute code, mutate state, communicate with people, and obtain evidence that is fresher or more authoritative than the model's internal knowledge.

A tool is therefore not merely an API wrapper. It is a **capability contract** that grants an agent a bounded form of authority.

> **A good tool makes the correct action easy to express, the incorrect action difficult to express, and the result easy to verify.**

## 2. Default position

the platform should prefer tools when information or actions are better obtained from the environment than described in prompts.

Use a tool when it provides one or more of:

- current state;
- deterministic computation;
- authoritative data;
- external actions;
- reproducible verification;
- access to data too large or volatile for permanent context;
- encapsulation of credentials or privileged operations.

Do not create a tool merely to hide a trivial deterministic transformation that belongs in ordinary application code.

## 3. Tool design model

Every tool should be evaluated along at least these dimensions:

```text
Purpose      What user or agent goal does it serve?
Inputs       What must the caller know?
Outputs      What evidence/state does it return?
Authority    What can it access or change?
Side effects What external state may be mutated?
Failure      How does failure appear and recover?
Cost         What latency/money/resource cost exists?
Freshness    How current is the returned information?
Idempotency  Can retries repeat the action safely?
Provenance   Can results be traced to their source?
```

## 4. Tools should expose capabilities, not implementation trivia

Prefer:

```text
repository.find_symbol(name)
```

over forcing the model to know internal index tables, database keys, or shell pipelines required to perform the lookup.

But abstraction must not erase useful evidence. A repository-search tool should still return file paths, symbol locations, confidence/relevance information, and enough context for the agent to inspect the source directly.

## 5. Deterministic work stays deterministic

If a sequence is fully predictable, ordinary code should normally orchestrate it rather than repeatedly asking the model what to do.

Example:

```text
list files
→ filter extensions
→ parse manifests
→ sort dependency names
```

is generally application logic.

The model is more valuable where interpretation or judgment is required:

```text
Which of these dependency relationships is relevant to the requested change?
```

Current OpenAI guidance similarly distinguishes direct tool calling from programmatic tool execution: predictable filtering, joining, ranking, aggregation, and validation are good candidates for code, reducing intermediate model context.

## 6. Prefer explicit boundaries

Tools should expose narrow, understandable authority.

Prefer separate operations such as:

```text
issue.get
issue.comment
issue.close
```

over an ambiguous:

```text
issue.manage
```

unless a combined operation represents a coherent atomic capability and materially improves reliability.

Granularity is workload-dependent and is addressed in AEP-TOOL-003.

## 7. Separate observation from mutation

Read and write behavior should normally be distinguishable at the tool-contract level.

This supports:

- clearer model selection;
- better approvals;
- safer retries;
- more precise authorization;
- easier auditing;
- more meaningful traces.

A tool that sometimes reads and sometimes mutates based on loosely interpreted input increases ambiguity.

## 8. Tool results are evidence, not instructions

Tool outputs may contain untrusted text. They should enter the context model as data with provenance and trust labels, not gain instructional authority merely because they arrived through a trusted tool implementation.

This preserves the distinction established in AEP-CTX-002.

## 9. Tool quality affects agent quality

A strong model cannot compensate reliably for poorly named, overlapping, ambiguous, overpowered, or undocumented tools.

Common symptoms of bad tool design include:

- repeated wrong-tool selection;
- hallucinated parameters;
- excessive exploratory calls;
- inability to recover from errors;
- fragile retries;
- excessive tool output;
- security approvals that are too broad to be meaningful.

Tool design should therefore be evaluated as part of agent design, not delegated entirely to API owners.

## 10. Initial platform guidance

1. Prefer environment tools over stale descriptive context.
2. Keep deterministic processing in deterministic code.
3. Give every tool a single coherent purpose.
4. Expose explicit inputs instead of requiring guessed identifiers.
5. Return structured results when the shape is predictable.
6. Separate read and mutation capabilities where practical.
7. Record authority, side effects, and failure semantics in the contract.
8. Treat tool output as contextual evidence with provenance.
9. Add infrastructure only when the environment needs it; existing project-native tools are preferred when sufficient.
10. Evaluate tools by downstream task success, not merely successful invocation.

## 11. Living-knowledge requirements

Tool guidance is version-sensitive. Each tool standard should record:

- contract version;
- provider/protocol version where relevant;
- last validation date;
- deprecated fields/behaviors;
- known client compatibility;
- associated evals;
- migration notes.

A previously successful tool contract may become suboptimal as models improve. Tool descriptions, schemas, granularity, and discovery mechanisms should be periodically re-evaluated rather than indefinitely accumulating compatibility text.

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
- [AEP-CTX-007 — Progressive Disclosure](../context/AEP-CTX-007-progressive-disclosure.md)
