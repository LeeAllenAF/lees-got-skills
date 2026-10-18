---
schema_version: '1.0'
id: AEP-AGENT-007
title: Critique, Refinement, and Verification
summary: 'Critique, Refinement, and Verification. Focus: critique, verification.'
type: guidance
status: recommended
version: 0.1.0
collection: handbook
domains:
- agent-architecture
tags:
- critique
- verification
scope:
- enterprise-global
related:
- AEP-P-006
- AEP-P-007
- AEP-AGENT-006
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/agents/AEP-AGENT-007-critique-refinement-and-verification.md
  original_sha256: add943d35d79392c6ce9d4051579874dc822cdfa2216b65a43e878c291cd62be
  original_metadata_record: handbook/agents/AEP-AGENT-007-critique-refinement-and-verification.md
  authority: inherited-source-context
---
# AEP-AGENT-007 — Critique, Refinement, and Verification

## Purpose
Define when iterative review helps and when deterministic validation is stronger.

## Order of preference
1. deterministic verifier;
2. domain-specific executable check;
3. independent evidence retrieval;
4. model-based critique where judgment is genuinely required.

A second model/agent should not be used merely to restate whether output 'looks correct' when tests, compilers, schemas, security checks, or policy engines can provide stronger evidence.

## Critic patterns
Useful for subjective quality, incomplete specifications, architectural tradeoffs, adversarial review, and tasks without deterministic graders.

## Independence
A critic is more useful when it receives the artifact and rubric rather than the generator's full reasoning narrative. Shared assumptions can create correlated failures.

## Iteration
Refinement loops require bounded attempts and explicit improvement criteria.

## References
- Google Cloud, iterative refinement agent pattern — https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-agents.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-AGENT-006 — Planning, Decomposition, and Execution](AEP-AGENT-006-planning-decomposition-and-execution.md)
