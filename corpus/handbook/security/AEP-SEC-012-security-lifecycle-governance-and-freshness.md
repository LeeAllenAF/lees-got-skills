---
schema_version: '1.0'
id: AEP-SEC-012
title: Security Lifecycle, Governance, and Freshness
summary: 'Security Lifecycle, Governance, and Freshness. Focus: lifecycle, security controls.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- lifecycle
- security-controls
scope:
- enterprise-global
related:
- AEP-P-017
- AEP-EVAL-012
- AEP-TOOL-010
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-012-security-lifecycle-governance-and-freshness.md
  original_sha256: 2b14a481ecaef77f6560085f73d90c73013f2b3e85a3f783484cc56331e166bb
  original_metadata_record: handbook/security/AEP-SEC-012-security-lifecycle-governance-and-freshness.md
  authority: inherited-source-context
---

# AEP-SEC-012 — Security Lifecycle, Governance, and Freshness

## 1. Purpose
Agent security guidance decays as models, tool protocols, providers, attack techniques, and deployment environments change. Security is therefore a living knowledge system.

## 2. Security artifact lifecycle
Maintain traceable links among:

```text
threat model
   ↓
security requirement
   ↓
control
   ↓
eval / test
   ↓
production telemetry
   ↓
incident / finding
   ↓
revalidation
```

## 3. Review cadence
Initial default review intervals:
- durable least-privilege principles: ~180d;
- tool/auth architecture: ~90d;
- provider/MCP security assumptions: ~60d;
- model-specific prompt-injection mitigations: ~30–60d;
- active incident controls: event-driven.

These are defaults, not guarantees.

## 4. Event-driven revalidation
Trigger review after significant model releases, MCP/protocol changes, provider auth changes, new security advisories, incidents, permission-scope changes, new production permissions, new memory capabilities, or major tool additions.

## 5. Security control expiry
Controls introduced as workarounds for a particular model/provider weakness should have owners, rationale, tests, and removal criteria. Old controls can become unnecessary friction or create new vulnerabilities.

## 6. Security promotion rules
High-impact standards should require stronger evidence than low-risk recommendations. Vendor claims are inputs, not proof. Favor independent security research, adversarial tests, and observed production behavior.

## 7. Governance objective
The security program should be able to answer:
> Which authority can this agent exercise today, why is it allowed, which controls enforce it, when were they last tested, and what happens if one fails?

## References
- OpenAI, Safety in building agents — https://developers.openai.com/api/docs/guides/agent-builder-safety
- Anthropic, Trustworthy agents in practice — https://www.anthropic.com/research/trustworthy-agents
- OWASP, AI Agent Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-HBK-000 — Agentic Engineering Platform Charter](../foundations/AEP-HBK-000-charter.md)
- [AEP-EVAL-012 — Evaluation Lifecycle, Benchmark Hygiene, and Freshness](../evals/AEP-EVAL-012-evaluation-lifecycle-benchmark-hygiene-and-freshness.md)
- [AEP-TOOL-010 — Tool Lifecycle, Versioning, and Freshness](../tools/AEP-TOOL-010-tool-lifecycle-versioning-and-freshness.md)
