---
schema_version: '1.0'
id: AEP-TOOL-004
title: Tool Discovery and Capability Loading
summary: 'Tool Discovery and Capability Loading. Focus: progressive disclosure, tool design.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- progressive-disclosure
- tool-design
scope:
- enterprise-global
related:
- AEP-CTX-007
- AEP-CTX-011
- AEP-TOOL-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-004-tool-discovery-and-capability-loading.md
  original_sha256: f539a356956d4e0edaf24454cbd516e14fd420da68d4d6d2a080705ffc6a2910
  original_metadata_record: handbook/tools/AEP-TOOL-004-tool-discovery-and-capability-loading.md
  authority: inherited-source-context
---

# AEP-TOOL-004 — Tool Discovery and Capability Loading

## 1. Purpose

Large tool catalogs consume context and can reduce selection quality. Tool discovery allows agents to know that capabilities exist without loading every complete schema and description up front.

## 2. Capability layers

Recommended conceptual layers:

```text
Always-known capabilities
        ↓
Compact capability metadata
        ↓
Task-scoped tool discovery
        ↓
Full contract/schema loading
        ↓
Invocation
```

This mirrors progressive disclosure in the broader context architecture.

## 3. What remains always visible

Keep tools permanently visible when they are:

- frequently required;
- foundational for discovery;
- cheap in schema/context size;
- low ambiguity;
- necessary for safety or user interaction.

Examples might include repository search, reading known files, or requesting user approval in a coding harness.

## 4. Deferred capability loading

Less common or domain-specific tools should be discoverable on demand.

Current OpenAI tool calling supports deferred tool loading through tool search for sufficiently recent models, and the 2026 MCP specification adds cacheable, deterministic list responses that make capability discovery more practical at scale.

## 5. Discovery metadata

Compact metadata should include:

- name;
- short purpose;
- capability domain;
- read/write classification;
- required scope;
- risk class;
- version;
- optional keywords/examples.

Do not place full operating manuals in discovery metadata.

## 6. Dynamic scoping

The capability catalog may be narrowed based on:

- current repository;
- client;
- user role;
- task type;
- environment;
- connected systems;
- authorization grants.

Dynamic scoping is both a context optimization and a security-supporting measure, but hidden capabilities are not an authorization boundary.

## 7. Cacheability

Tool catalogs should be deterministic and versioned where possible. This supports provider prompt caching and MCP list-response caching.

Changing tool order or descriptions unnecessarily can destroy cache reuse and make evaluation less reproducible.

## 8. Failure modes

Watch for:

- a needed tool becoming undiscoverable;
- excessive discovery calls;
- stale capability metadata;
- tool aliases causing ambiguity;
- discovery exposing capabilities the caller cannot actually use;
- dynamic scoping hiding a legitimate recovery path.

## 9. Guidance

Expose a small stable core, discover specialized capabilities progressively, and evaluate whether dynamic catalogs improve actual task success—not just token count.

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

- [AEP-CTX-007 — Progressive Disclosure](../context/AEP-CTX-007-progressive-disclosure.md)
- [AEP-CTX-011 — Context Caching](../context/AEP-CTX-011-context-caching.md)
- [AEP-TOOL-001 — Tool Design Fundamentals](AEP-TOOL-001-tool-design-fundamentals.md)
