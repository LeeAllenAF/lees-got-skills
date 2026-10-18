---
schema_version: '1.0'
id: AEP-SEC-011
title: Security Observability, Incident Response, and Red Teaming
summary: 'Security Observability, Incident Response, and Red Teaming. Focus: adversarial testing, incident response,
  observability.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- adversarial-testing
- incident-response
- observability
scope:
- enterprise-global
related:
- AEP-EVAL-010
- AEP-TOOL-009
- AEP-SEC-001
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-011-security-observability-incident-response-and-red-teaming.md
  original_sha256: c85b1eb86812579f0bcd4d1471aedfa131b80bbfb59ea7ac6d181d8a21cc91bd
  original_metadata_record: handbook/security/AEP-SEC-011-security-observability-incident-response-and-red-teaming.md
  authority: inherited-source-context
---

# AEP-SEC-011 — Security Observability, Incident Response, and Red Teaming

## 1. Purpose
Security controls that cannot be observed or tested eventually become assumptions. Agent systems need telemetry sufficient to reconstruct consequential decisions without exposing sensitive chain-of-thought.

## 2. Security trace events
Record where appropriate:
- principal/workload identity;
- trust/source classification of important inputs;
- tool requested and arguments;
- authorization decision;
- approval decision;
- credential/capability used (identifier, not secret);
- side-effect result;
- denied attempts;
- network destination/resource target;
- memory writes;
- policy/version identifiers.

## 3. Detection
Monitor for unusual authority requests, repeated denied actions, cross-tenant access attempts, unexpected destinations, mass retrieval/exfiltration patterns, repeated approval requests, and memory writes from untrusted sources.

## 4. Incident response
Maintain mechanisms to revoke credentials, disable tools, cancel running tasks, quarantine memory/index content, preserve audit evidence, and roll back changes.

## 5. Red teaming
Security evaluation should include adversarial prompt injection, tool misuse, privilege escalation, confused deputy, data exfiltration, cross-scope isolation, memory poisoning, and destructive-action scenarios.

## 6. Convert incidents into living knowledge
Every meaningful incident or near miss should be evaluated for promotion into:
- a regression case;
- a new threat pattern;
- a policy change;
- a tool-contract change;
- a handbook update.

## References
- OWASP, Agentic Red Teaming Q2 2026 — https://genai.owasp.org/resource/ai-security-solutions-landscape-for-ai-and-agentic-red-teaming-q2-2026/

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-EVAL-010 — Safety, Security, and Adversarial Evaluation](../evals/AEP-EVAL-010-safety-security-and-adversarial-evaluation.md)
- [AEP-TOOL-009 — Tool Observability and Evaluation](../tools/AEP-TOOL-009-tool-observability-and-evaluation.md)
- [AEP-SEC-001 — Security and Authority Fundamentals](AEP-SEC-001-security-and-authority-fundamentals.md)
