---
schema_version: '1.0'
id: HARNESS-ARCHITECTURE-02-REFERENCE-DESIGN
title: Portable reference architecture
summary: 'Portable reference architecture. Focus: architecture, harness design, state management.'
type: guidance
status: informational
version: 1.0.0
collection: harness
domains:
- harness-architecture
tags:
- architecture
- harness-design
- state-management
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
  original_path: agentic-harness-foundations/architecture/02-reference-design.md
  original_sha256: ba8c715843963b6114d016ec243c18b4f4a9d770cbce0e7248b78cd5db106541
  original_metadata_record: harness/architecture/02-reference-design.md
  authority: reference-only
---
# Portable reference architecture

[← Index](../INDEX.md) · [Boundaries](01-integration-boundaries.md) · [Decisions](03-decisions-and-questions.md)

## Objective
Provide a reusable conceptual blueprint for research, discovery and architecture analysis where large quantities of source material must be indexed and interpreted without requiring the OpenAI Platform API.

```text
source connectors (Git, knowledge base, cloud, directories)
           |
           v
deterministic ingestion -> raw snapshots / hashes / provenance
           |
           v
queue + scheduler -> structured work units / leases / budgets
           |                    |
           v                    v
Codex SDK reasoning workers   deterministic parsers / validators
           |                    |
           +----------+---------+
                      v
              evidence reconciliation
                      |
                      v
              knowledge store / graph
                      |
                      v
          research / discussion plugin
         (skills + MCP tools + references)
```

## Main interfaces [DESIGN]
- `SourceAdapter`: enumerate, fetch, incremental changes, auth.
- `WorkQueue`: claim/lease/retry/complete with idempotency.
- `ReasoningExecutor`: submit bounded task, collect typed result and usage metadata.
- `EvidenceStore`: save source excerpts with immutable/versioned locators.
- `GraphWriter`: validated entity and relationship updates.
- `PolicyEngine`: authorize actions independent of model output.
- `Telemetry`: event correlation across task and Codex threads.

## Suggested repository skeleton
```text
packages/
  contracts/
  knowledge-core/
  orchestration/
  telemetry/
apps/
  worker/
  mcp-server/
plugin/
  plugin.json
  mcp.json
  skills/
    research/SKILL.md
    verify/SKILL.md
```
This is **illustrative**, not a requirement to use a monorepo, Nx, or any specific cloud service.

## Workflow sample
1. Enumerate source metadata deterministically.
2. Detect changed pages/files via versions and content hashes.
3. Extract basic structure without inference.
4. Route ambiguous classifications to SDK threads with explicit schemas.
5. Cross-check entity relationships against evidence.
6. Write accepted entities/edges with provenance.
7. Surface unresolved contradictions for review.
8. Expose query/investigate operations through plugin MCP tools.

## Design properties
Recoverability, least privilege, throughput control, cost accounting, source provenance, replaceable inference adapters, and testable contracts.

See [reliability](../foundations/04-reliability-and-evals.md) and [SDK controller](../codex-sdk/03-orchestration-pattern.md).

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/harness-architecture.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-KNOW-001 — Knowledge Service Fundamentals](../../handbook/knowledge/AEP-KNOW-001-knowledge-service-fundamentals.md)
- [AEP-PERM-004 — Authorization Before Retrieval](../../handbook/permissions/aep-perm-004-authorization-before-retrieval.md)
- [AEP-AUDIT-005 — Evidence Lineage](../../handbook/audit/aep-audit-005-evidence-lineage.md)
