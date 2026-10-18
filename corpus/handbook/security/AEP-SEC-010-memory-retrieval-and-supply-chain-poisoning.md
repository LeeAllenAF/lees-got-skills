---
schema_version: '1.0'
id: AEP-SEC-010
title: Memory, Retrieval, and Supply-Chain Poisoning
summary: 'Memory, Retrieval, and Supply-Chain Poisoning. Focus: data poisoning, supply chain.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- data-poisoning
- supply-chain
scope:
- enterprise-global
related:
- AEP-CTX-009
- AEP-CTX-012
- AEP-SEC-003
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-010-memory-retrieval-and-supply-chain-poisoning.md
  original_sha256: 7b97343e1666b041c8585429f3eee9ce0ec4107dbcc4ce5e9dbcfd20543be67d
  original_metadata_record: handbook/security/AEP-SEC-010-memory-retrieval-and-supply-chain-poisoning.md
  authority: inherited-source-context
---

# AEP-SEC-010 — Memory, Retrieval, and Supply-Chain Poisoning

## 1. Purpose
Persistent state can transform a one-time malicious input into a recurring compromise. Software repositories and dependencies add another persistent attack surface.

## 2. Memory promotion boundary
Agents may observe untrusted information, but durable semantic/procedural memory should require provenance, scope, validation, and where warranted human approval.

## 3. Retrieval poisoning
Indexing does not make content trustworthy. Preserve source identity, timestamp, permission scope, and trust classification so retrieval can filter or down-rank suspicious content.

## 4. Repository content
Treat cloned codebases as potentially hostile. Risks include agent-directed comments, malicious scripts, dependency hooks, poisoned configuration, generated artifacts, and hidden instructions.

## 5. Dependency execution
Installing dependencies or running repository scripts can cross from reading untrusted data into executing attacker-controlled code. Prefer sandboxing, lockfile verification, scoped network access, and explicit policies before package execution.

## 6. Persistent compromise indicators
Watch for memories or knowledge entries that:
- lack provenance;
- unexpectedly expand scope;
- instruct future agents rather than describe facts;
- originate in low-trust external sources;
- survive beyond their intended task/scope lifetime.

## 7. Revalidation
Memory and retrieval indexes require deletion, invalidation, and re-indexing mechanisms after source changes or security incidents.

## References
- OWASP, Memory Is a Feature. It Is Also an Attack Surface — https://genai.owasp.org/2026/05/13/memory-is-a-feature-it-is-also-an-attack-surface/

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-009 — Working Memory and Persistent Memory](../context/AEP-CTX-009-working-memory-and-persistent-memory.md)
- [AEP-CTX-012 — Context Failure Modes](../context/AEP-CTX-012-context-failure-modes.md)
- [AEP-SEC-003 — Prompt Injection and Untrusted Content](AEP-SEC-003-prompt-injection-and-untrusted-content.md)
