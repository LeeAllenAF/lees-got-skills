---
schema_version: '1.0'
id: AEP-TOOL-010
title: Tool Lifecycle, Versioning, and Freshness
summary: 'Tool Lifecycle, Versioning, and Freshness. Focus: lifecycle, versioning.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- tool-engineering
tags:
- lifecycle
- versioning
scope:
- enterprise-global
related:
- AEP-P-013
- AEP-TOOL-002
- AEP-TOOL-007
- AEP-TOOL-009
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/tools/AEP-TOOL-010-tool-lifecycle-versioning-and-freshness.md
  original_sha256: 0a3ee8820b1932564603fa6d934847d22026aca7c4f0ac5d60d26a17c2d3706a
  original_metadata_record: handbook/tools/AEP-TOOL-010-tool-lifecycle-versioning-and-freshness.md
  authority: inherited-source-context
---

# AEP-TOOL-010 — Tool Lifecycle, Versioning, and Freshness

## 1. Purpose

Tool systems change continuously. APIs evolve, model tool-use behavior improves, MCP specifications change, security guidance is revised, consumer capabilities differ, and previously necessary scaffolding becomes obsolete.

the platform therefore treats tool guidance as living knowledge.

> **A tool contract is never "done" merely because it works today.**

## 2. Version three things separately

Do not collapse these into one version number:

```text
Domain capability version
Tool contract/schema version
Protocol/adapter version
```

For MCP, also record the targeted MCP specification and extension versions.

## 3. Compatibility metadata

Maintain machine-readable compatibility where useful:

```yaml
contract_version: 2.1.0
protocol:
  mcp: 2026-07-28
clients_tested:
  - codex:<range>
  - claude:<range>
last_verified: 2026-09-30
status: supported
```

Exact schema will be standardized later.

## 4. Review triggers

Revalidation should be event-driven as well as scheduled.

Trigger review when:

- the underlying API changes;
- a provider changes tool-calling behavior;
- MCP publishes a new stable specification;
- security advisories affect the capability;
- production traces reveal repeated misuse;
- task success regresses;
- new models make workaround instructions obsolete;
- latency/cost changes materially.

## 5. Scheduled freshness

Suggested starting review intervals:

```text
Tool-design principles           180 days
Production tool contracts         90 days
MCP/provider-specific guidance    60 days
Security-sensitive guidance       30-60 days
Known unstable/experimental APIs  30 days or release-triggered
```

These are defaults, not universal policy.

## 6. Automated drift detection

Where possible, CI should verify:

- schemas still validate;
- examples compile/run;
- referenced endpoints/spec versions still exist;
- permission assumptions still hold;
- capability discovery snapshots are expected;
- contract fixtures still pass.

Future tooling may also flag handbook documents whose `last_reviewed` exceeds `review_interval`.

## 7. Experiment linkage

Every recommendation that depends on uncertain model behavior should reference relevant experiments/evals.

A new result may:

```text
confirm guidance
narrow applicability
lower confidence
deprecate guidance
replace guidance
```

Historical versions and rejected practices remain searchable.

## 8. Deprecation

Deprecation should include:

- reason;
- replacement;
- compatibility window;
- migration instructions;
- removal date if applicable.

The MCP project itself now has a formal deprecation policy with a minimum compatibility window, reinforcing the need to design integrations for change rather than assuming protocol permanence.

## 9. Avoid permanent model workarounds

Instructions added because a particular model misunderstood a tool should not silently become permanent architecture.

Tag workaround guidance with:

- model/provider scope;
- date introduced;
- associated failure/eval;
- review trigger.

Delete it when it stops earning its complexity.

## 10. Knowledge lifecycle

```text
Observation
   ↓
Question
   ↓
Guidance / hypothesis
   ↓
Tool implementation
   ↓
Trace + evaluation
   ↓
Experiment when needed
   ↓
Promotion / revision / rejection
   ↓
Scheduled + event-driven revalidation
```

This is the same living-knowledge model used by the broader handbook, applied specifically to executable capabilities.

## 11. Initial the platform standard

Every production-grade tool capability should be traceable to:

- an owner;
- a contract version;
- a documented authority model;
- executable contract tests;
- representative agent-tool evals;
- a review date or review trigger;
- deprecation/migration semantics.

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
- [AEP-TOOL-002 — Tool Contracts and Schemas](AEP-TOOL-002-tool-contracts-and-schemas.md)
- [AEP-TOOL-007 — MCP Architecture](AEP-TOOL-007-mcp-architecture.md)
- [AEP-TOOL-009 — Tool Observability and Evaluation](AEP-TOOL-009-tool-observability-and-evaluation.md)
