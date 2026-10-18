---
schema_version: '1.0'
id: AEP-SEC-002
title: Threat Models and Trust Boundaries
summary: 'Threat Models and Trust Boundaries. Focus: threat modeling, trust boundaries.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- threat-modeling
- trust-boundaries
scope:
- enterprise-global
related:
- AEP-CTX-002
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
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-002-threat-models-and-trust-boundaries.md
  original_sha256: 37388009d5a266c36e593ebf09a1c4b473cc68e369e0beab132d19638b8c51d4
  original_metadata_record: handbook/security/AEP-SEC-002-threat-models-and-trust-boundaries.md
  authority: inherited-source-context
---

# AEP-SEC-002 — Threat Models and Trust Boundaries

## 1. Purpose
Agent systems combine natural-language control, external data, credentials, tools, and persistent state. Threat modeling must identify where these different trust domains meet.

## 2. Identify assets
Examples include source code, customer data, credentials, production infrastructure, financial authority, user communications, memory stores, model instructions, and proprietary knowledge.

## 3. Identify actors and trust zones
Common zones include:
- user or calling service;
- trusted application policy;
- model runtime;
- retrieved documents and web content;
- tools/MCP servers;
- sandbox;
- internal systems;
- third-party services;
- persistent memory;
- production systems.

## 4. Treat transitions as security boundaries
Whenever information or authority crosses a boundary, define:
- authentication;
- authorization;
- validation;
- provenance;
- confidentiality expectations;
- logging;
- failure behavior.

## 5. Threat classes
At minimum consider prompt injection, excessive agency, confused deputy behavior, privilege escalation, data exfiltration, credential exposure, memory poisoning, dependency/supply-chain compromise, cross-scope leakage, unsafe tool composition, destructive actions, and denial-of-service/cost amplification.

## 6. Model the confused deputy problem
An authorized agent can still be tricked into using its authority on behalf of an unauthorized instruction embedded in data. Authorization must therefore account for the requesting principal and the intended operation, not merely whether the agent possesses a credential.

## 7. Deliverable
High-risk agent systems should maintain a lightweight threat model that is versioned with architecture changes and connected to security evals.

## References
- OWASP, AI Agent Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html
- OWASP, Excessive Agency — https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-002 — Context Sources and Instruction Hierarchy](../context/AEP-CTX-002-context-sources-and-instruction-hierarchy.md)
- [AEP-SEC-001 — Security and Authority Fundamentals](AEP-SEC-001-security-and-authority-fundamentals.md)
