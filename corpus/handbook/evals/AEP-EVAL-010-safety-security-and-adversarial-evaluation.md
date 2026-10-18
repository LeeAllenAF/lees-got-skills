---
schema_version: '1.0'
id: AEP-EVAL-010
title: Safety, Security, and Adversarial Evaluation
summary: 'Safety, Security, and Adversarial Evaluation. Focus: adversarial testing, security controls.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- evaluation
tags:
- adversarial-testing
- security-controls
scope:
- enterprise-global
related:
- AEP-TOOL-006
- AEP-CTX-012
- AEP-AGENT-008
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 90d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/evals/AEP-EVAL-010-safety-security-and-adversarial-evaluation.md
  original_sha256: cdf4205c13c551372990a8350f33d9e56f4b1ca6f67263305d0760110a52f47b
  original_metadata_record: handbook/evals/AEP-EVAL-010-safety-security-and-adversarial-evaluation.md
  authority: inherited-source-context
---

# AEP-EVAL-010 — Safety, Security, and Adversarial Evaluation

## 1. Purpose
A system that succeeds on benign tasks but fails under adversarial or malformed inputs is not production-ready for consequential use.

## 2. Security eval classes
Include cases for:
- indirect prompt injection;
- conflicting instructions;
- malicious repository/document content;
- privilege escalation attempts;
- unauthorized tool use;
- approval bypass;
- secret/data exfiltration attempts;
- unsafe retry/replay;
- scope/permission isolation;
- destructive-action confirmation;
- compromised or misleading tool output.

## 3. Environment containment
Evaluate both model behavior and enforcement boundaries. The question is not only “does the agent refuse?” but also “can the environment prevent the action if the agent fails to refuse?”

## 4. Negative capability
Evals should verify that the system can correctly decline, escalate, request approval, or stop when required. Success is sometimes **not acting**.

## 5. Adversarial maintenance
Adversarial sets decay as attacks and model defenses evolve. Add real incident patterns, vendor advisories, and red-team findings to the living corpus.

## 6. Recommendation
Security-critical release gates should prefer objective state/permission checks over solely model-based safety judgments.

## References
- OpenAI, Safety in building agents — https://developers.openai.com/api/docs/guides/agent-builder-safety
- OpenAI, A shared playbook for trustworthy third-party evaluations — https://openai.com/index/trustworthy-third-party-evaluations-foundations/

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-evals.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-CTX-012 — Context Failure Modes](../context/AEP-CTX-012-context-failure-modes.md)
- [AEP-AGENT-008 — Human-in-the-Loop and Authority Boundaries](../agents/AEP-AGENT-008-human-in-the-loop-and-authority-boundaries.md)
