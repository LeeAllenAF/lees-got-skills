---
schema_version: '1.0'
id: PACK-READING-PATHS
title: Task-oriented reading paths
summary: 'Task-oriented reading paths. Focus: harness design, index navigation.'
type: index
status: informational
version: 1.0.0
collection: assembly
domains:
- package-navigation
tags:
- harness-design
- index-navigation
scope:
- portable-reference
related: []
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: null
  technical_review_interval: null
  owner: null
provenance:
  source_archive: null
  original_path: null
  original_sha256: null
  original_metadata_record: READING-PATHS.md
  authority: reference-only
---
# Task-oriented reading paths

[All topics](INDEX.md). Read each path in order, stopping when you have sufficient evidence. These are navigation suggestions, not mandatory workflows.

## Design a harness

1. [Harness foundations: mental model and components](harness/foundations/01-harness-concepts.md) — `HARNESS-FOUNDATIONS-01-HARNESS-CONCEPTS`
2. [Deterministic Workflows vs Agent Loops](handbook/agents/AEP-AGENT-002-workflows-vs-agent-loops.md) — `AEP-AGENT-002`
3. [Planning, Decomposition, and Execution](handbook/agents/AEP-AGENT-006-planning-decomposition-and-execution.md) — `AEP-AGENT-006`
4. [Termination, Progress, and Recovery](handbook/agents/AEP-AGENT-009-termination-progress-and-recovery.md) — `AEP-AGENT-009`

## Build a context engine or knowledge index

1. [Context engineering, retrieval, memory, and durable state](harness/foundations/03-context-and-state.md) — `HARNESS-FOUNDATIONS-03-CONTEXT-AND-STATE`
2. [Retrieval Architecture](handbook/context/AEP-CTX-003-retrieval-architecture.md) — `AEP-CTX-003`
3. [Lexical and Hybrid Retrieval](handbook/context/AEP-CTX-005-lexical-and-hybrid-retrieval.md) — `AEP-CTX-005`
4. [Knowledge Schema, Identifiers, and Metadata](handbook/knowledge/AEP-KNOW-002-knowledge-schema-and-identifiers.md) — `AEP-KNOW-002`
5. [Ingestion, Indexing, and Derived Artifacts](handbook/knowledge/AEP-KNOW-003-ingestion-indexing-and-derived-artifacts.md) — `AEP-KNOW-003`
6. [Retrieval, Ranking, and Context Packages](handbook/knowledge/AEP-KNOW-004-retrieval-ranking-and-context-packages.md) — `AEP-KNOW-004`
7. [Authorization Before Retrieval](handbook/permissions/aep-perm-004-authorization-before-retrieval.md) — `AEP-PERM-004`

## Choose SDK, App Server, or plugin integration

1. [Integration boundaries and capability comparison](harness/architecture/01-integration-boundaries.md) — `HARNESS-ARCHITECTURE-01-INTEGRATION-BOUNDARIES`
2. [MCP Architecture](handbook/tools/AEP-TOOL-007-mcp-architecture.md) — `AEP-TOOL-007`
3. [Skills, Tools, and MCP](handbook/skills/AEP-SKILL-005-skills-tools-and-mcp.md) — `AEP-SKILL-005`

## Author skills and tools

1. [Skill design and agent guidance](harness/codex-plugin/02-skills.md) — `HARNESS-CODEX-PLUGIN-02-SKILLS`
2. [Skill Content and Package Design](handbook/skills/AEP-SKILL-003-skill-content-and-package-design.md) — `AEP-SKILL-003`
3. [Tool Contracts and Schemas](handbook/tools/AEP-TOOL-002-tool-contracts-and-schemas.md) — `AEP-TOOL-002`
4. [Errors, Retries, and Idempotency](handbook/tools/AEP-TOOL-005-errors-retries-and-idempotency.md) — `AEP-TOOL-005`
5. [Authority, Permissions, and Side Effects](handbook/tools/AEP-TOOL-006-authority-permissions-and-side-effects.md) — `AEP-TOOL-006`

## Make work durable and recoverable

1. [Application-managed orchestration using the Codex SDK](harness/codex-sdk/03-orchestration-pattern.md) — `HARNESS-CODEX-SDK-03-ORCHESTRATION-PATTERN`
2. [Termination, Progress, and Recovery](handbook/agents/AEP-AGENT-009-termination-progress-and-recovery.md) — `AEP-AGENT-009`
3. [Backup, Recovery, and Rebuildability](handbook/operations/aep-ops-004-backup-recovery-and-rebuildability.md) — `AEP-OPS-004`
4. [Evidence Lineage](handbook/audit/aep-audit-005-evidence-lineage.md) — `AEP-AUDIT-005`

## Establish evaluation and release gates

1. [Guardrails, evaluation, telemetry, and failure handling](harness/foundations/04-reliability-and-evals.md) — `HARNESS-FOUNDATIONS-04-RELIABILITY-AND-EVALS`
2. [Success Criteria and Outcome Verification](handbook/evals/AEP-EVAL-002-success-criteria-and-outcome-verification.md) — `AEP-EVAL-002`
3. [Graders and Scoring](handbook/evals/AEP-EVAL-004-graders-and-scoring.md) — `AEP-EVAL-004`
4. [Capability, Regression, and Release Gates](handbook/evals/AEP-EVAL-008-capability-regression-and-release-gates.md) — `AEP-EVAL-008`
5. [Evaluation Harness and Reproducibility](handbook/evals/AEP-EVAL-011-evaluation-harness-and-reproducibility.md) — `AEP-EVAL-011`

## Review permissions and security

1. [Portable reference architecture](harness/architecture/02-reference-design.md) — `HARNESS-ARCHITECTURE-02-REFERENCE-DESIGN`
2. [Threat Models and Trust Boundaries](handbook/security/AEP-SEC-002-threat-models-and-trust-boundaries.md) — `AEP-SEC-002`
3. [Prompt Injection and Untrusted Content](handbook/security/AEP-SEC-003-prompt-injection-and-untrusted-content.md) — `AEP-SEC-003`
4. [Authorization Before Retrieval](handbook/permissions/aep-perm-004-authorization-before-retrieval.md) — `AEP-PERM-004`
5. [Security Assurance Fundamentals](handbook/assurance/aep-assure-001-security-assurance-fundamentals.md) — `AEP-ASSURE-001`

## Optimize model, context, and inference cost

1. [SDK capability map: models, threads, and outputs](harness/codex-sdk/02-configuration-and-capabilities.md) — `HARNESS-CODEX-SDK-02-CONFIGURATION-AND-CAPABILITIES`
2. [Model Routing Architecture](handbook/models/AEP-MODEL-005-routing-architecture.md) — `AEP-MODEL-005`
3. [Cascades, Escalation, and Rescue](handbook/models/AEP-MODEL-006-cascades-escalation-and-rescue.md) — `AEP-MODEL-006`
4. [Token and Context Efficiency](handbook/cost/AEP-COST-003-token-and-context-efficiency.md) — `AEP-COST-003`
5. [Optimization Experiments and Pareto Selection](handbook/cost/AEP-COST-009-optimization-experiments-and-pareto-selection.md) — `AEP-COST-009`

## Apply guidance to software delivery

1. [Portable reference architecture](harness/architecture/02-reference-design.md) — `HARNESS-ARCHITECTURE-02-REFERENCE-DESIGN`
2. [Repository Discovery and Environment Understanding](handbook/coding/AEP-CODE-002-repository-discovery-and-environment-understanding.md) — `AEP-CODE-002`
3. [Feature Implementation](handbook/coding/AEP-CODE-005-feature-implementation.md) — `AEP-CODE-005`
4. [Testing and Verification](handbook/coding/AEP-CODE-008-testing-and-verification.md) — `AEP-CODE-008`
5. [Pull Request Review](handbook/coding/AEP-CODE-011-pull-request-review.md) — `AEP-CODE-011`
