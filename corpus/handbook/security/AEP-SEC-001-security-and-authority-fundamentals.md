---
schema_version: '1.0'
id: AEP-SEC-001
title: Security and Authority Fundamentals
summary: 'Security and Authority Fundamentals. Focus: authorization, least privilege, security controls.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- authorization
- least-privilege
- security-controls
scope:
- enterprise-global
related:
- AEP-P-011
- AEP-P-012
- AEP-P-021
- AEP-TOOL-006
- AEP-EVAL-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-001-security-and-authority-fundamentals.md
  original_sha256: eb71361b1b4d805d21a4fc464669c8fb127da894c61834719694e35ef2a8e055
  original_metadata_record: handbook/security/AEP-SEC-001-security-and-authority-fundamentals.md
  authority: inherited-source-context
---

# AEP-SEC-001 — Security and Authority Fundamentals

## 1. Purpose
Agent security must assume that models can misunderstand intent, be manipulated by untrusted content, and produce incorrect tool calls. The security architecture must remain safe even when the model is wrong.

## 2. Core security model
the platform should separate four concepts:

```text
intent       what the user wants
reasoning    what the model proposes
authority    what the principal is allowed to do
enforcement  what the system actually permits
```

The model may interpret intent and propose actions. Authority and enforcement belong to external controls.

## 3. Defense in depth
No single defense is sufficient. Prefer overlapping controls:
- trustworthy instruction hierarchy;
- explicit trust labels for external content;
- least-privilege tools and credentials;
- filesystem/network isolation;
- structured validation at tool boundaries;
- human or policy approval for consequential actions;
- deterministic authorization checks;
- traceability and security evals;
- rollback and recovery mechanisms.

## 4. Security invariant
A successful prompt injection, hallucination, or reasoning error should not automatically imply a successful privilege escalation or destructive action.

## 5. Risk follows capability
Security posture should scale with what the system can access or change. A read-only documentation agent and a production deployment agent should not share the same authority model.

## 6. Recommended default
Begin with the minimum data, tools, credentials, network reachability, and write capability required for the task. Increase authority only where a demonstrated workflow requires it.

## 7. Living knowledge
Security assumptions must be revalidated when models, tools, protocols, permissions, providers, or deployment environments change. Security incidents and near misses should become regression cases.

## References
- OpenAI, Designing AI agents to resist prompt injection — https://openai.com/index/designing-agents-to-resist-prompt-injection/
- Anthropic, Trustworthy agents in practice — https://www.anthropic.com/research/trustworthy-agents
- OWASP, AI Agent Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-TOOL-006 — Authority, Permissions, and Side Effects](../tools/AEP-TOOL-006-authority-permissions-and-side-effects.md)
- [AEP-EVAL-010 — Safety, Security, and Adversarial Evaluation](../evals/AEP-EVAL-010-safety-security-and-adversarial-evaluation.md)
- [HARNESS-FOUNDATIONS-04-RELIABILITY-AND-EVALS — Guardrails, evaluation, telemetry, and failure handling](../../harness/foundations/04-reliability-and-evals.md)
