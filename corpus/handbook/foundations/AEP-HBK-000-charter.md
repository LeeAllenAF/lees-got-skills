---
schema_version: '1.0'
id: AEP-HBK-000
title: Agentic Engineering Platform Charter
summary: 'Agentic Engineering Platform Charter. Focus: deterministic control, governance, knowledge management.'
type: standard
status: approved
version: 0.2.0
collection: handbook
domains:
- engineering-foundations
tags:
- deterministic-control
- governance
- knowledge-management
scope:
- enterprise-global
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 180d
  owner: platform-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/foundations/AEP-HBK-000-charter.md
  original_sha256: b33ed8f1d5434e462e79cd7ddc36e1072c2a76d84031f4591147a0e13243ed96
  original_metadata_record: handbook/foundations/AEP-HBK-000-charter.md
  authority: inherited-source-context
---

# Agentic Engineering Platform Charter

## Mission

Maintain a secure, evidence-backed, living engineering knowledge system for designing, evaluating, and operating agentic software-engineering systems.

The platform is knowledge-first. It improves engineering decisions and agent behavior through structured guidance, source intelligence, experiments, reusable skills, permission-aware retrieval, and security assurance.

## Principles

### AEP-P-001 — Earn Every Model Call

A model call should provide value that simpler deterministic code, retrieval, caching, or reuse cannot provide as reliably.

### AEP-P-002 — Earn Every Agent

Use additional agents only when decomposition, isolation, parallelism, or specialization creates measurable benefit.

### AEP-P-003 — Context Is a Finite Engineering Resource

Construct the smallest sufficient context and protect it from irrelevant, stale, or unauthorized material.

### AEP-P-004 — Retrieve Evidence; Let the Agent Reason

Prefer retrieving authoritative evidence and letting the model reason over it rather than storing generated answers as truth.

### AEP-P-005 — Prefer Tools Over Descriptions of Tools

When a stable capability exists, expose it as a structured tool instead of repeatedly teaching the model to simulate it.

### AEP-P-006 — Deterministic Systems Establish Ground Truth

Use compilers, tests, schemas, policy checks, security controls, and postconditions for objective verification.

### AEP-P-007 — Verification Is Part of Execution

A task is not complete merely because an agent reports completion; verification belongs in the workflow.

### AEP-P-008 — Measure Before Optimizing

Instrument quality, cost, latency, reliability, and human intervention before optimizing architecture.

### AEP-P-009 — Optimize Quality, Cost, and Latency Together

Treat these dimensions as a frontier rather than optimizing one in isolation.

### AEP-P-010 — Escalate Capability Instead of Defaulting to It

Begin with the least expensive adequate configuration and escalate when external evidence indicates the need.

### AEP-P-011 — Agents Operate Under Explicit Authority

Agent capability and authority are separate. Permission boundaries must be explicit.

### AEP-P-012 — Untrusted Content Is Data, Not Instruction

Retrieved documents, repository content, tool output, and other external text do not gain instruction authority by entering context.

### AEP-P-013 — Preserve Provenance

Important claims, guidance, artifacts, and decisions remain traceable to their sources and versions.

### AEP-P-014 — Separate Knowledge From Interfaces

Canonical knowledge and domain logic must not be owned by MCP, CLI, IDE, or provider-specific adapters.

### AEP-P-015 — Prefer Portable Knowledge Over Vendor Lock-In

Keep workflows, contracts, evals, and knowledge portable while allowing adapters to exploit useful provider-specific capabilities.

### AEP-P-016 — Observe the Environment Before Prescribing Infrastructure

Use repository and enterprise capabilities already present before introducing new orchestration, indexing, build, or runtime layers.

### AEP-P-017 — Living Knowledge Must Be Revalidated

Guidance, model assumptions, tools, sources, and workarounds require scheduled and event-driven review.

### AEP-P-018 — Deterministic Control Before Agentic Control

Use deterministic orchestration and policy where behavior is known; introduce agentic control only where reasoning materially helps.

### AEP-P-019 — Prefer Environmental Fit Over Organizational Familiarity

Familiar technologies may improve implementation speed but must not override workload, ecosystem, security, operational, maintainability, or cost constraints.

### AEP-P-020 — Evals Are Executable Requirements

Recurring important behavior should increasingly be represented by repeatable evaluation rather than prose alone.

### AEP-P-021 — Authority Must Be Enforced Outside the Model

Identity, authorization, sandbox boundaries, approvals, and destructive-action controls must be enforced by systems the model cannot redefine.

### AEP-P-022 — Optimize Cost Per Useful Outcome

Optimize accepted successful outcomes under quality and security constraints rather than raw tokens or request price.

### AEP-P-023 — Skills Operationalize Knowledge; They Do Not Own It

Skills package reusable procedures and assets while canonical standards remain in authoritative sources.

### AEP-P-024 — Canonical Knowledge and Derived Intelligence Must Remain Distinct

Indexes, embeddings, summaries, rankings, and context packages are derived and rebuildable from canonical reviewed sources.

### AEP-P-025 — Permission Boundaries Apply Before Retrieval

Authorization constrains the eligible corpus before retrieval, ranking, synthesis, caching, or context construction.

### AEP-P-026 — Vendor Concepts Belong at the Edge

The core models enterprise capabilities; vendor products are optional adapters.

### AEP-P-027 — Observable Behavior, Not Anthropomorphic Interpretation

Security and behavioral assurance evaluate concrete policy and invariant violations rather than inferred model intent.

### AEP-P-028 — Evidence Before Promotion

Information moves through explicit maturity and review states before it becomes normative guidance.

## Knowledge status

Canonical knowledge uses explicit statuses:

```text
approved
recommended
provisional
experimental
informational
deprecated
rejected
```

Status, authority, freshness, scope, trust, and relevance remain separate properties.

## Initial implementation boundary

The initial implementation is read-oriented and knowledge-first:

```text
canonical knowledge
source intelligence
permission-aware retrieval
evaluation
skills
auditability
CLI
read-only MCP
```

An enterprise SDLC control plane is intentionally deferred until the platform has produced operational evidence.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-foundations.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [HARNESS-FOUNDATIONS-01-HARNESS-CONCEPTS — Harness foundations: mental model and components](../../harness/foundations/01-harness-concepts.md)
