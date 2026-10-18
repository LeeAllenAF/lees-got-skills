---
schema_version: '1.0'
id: AEP-SEC-008
title: Data Protection, Permission Isolation, and Privacy
summary: 'Data Protection, Permission Isolation, and Privacy. Focus: data isolation, data protection, privacy.'
type: standard
status: recommended
version: 0.1.0
collection: handbook
domains:
- security
tags:
- data-isolation
- data-protection
- privacy
scope:
- enterprise-global
related:
- AEP-CTX-009
- AEP-SEC-004
- AEP-SEC-005
review:
  metadata_reviewed_on: '2026-10-16'
  method: assistant-content-classification
  technical_review_performed: false
  technical_last_reviewed: '2026-10-01'
  technical_review_interval: 60d
  owner: agent-engineering
provenance:
  source_archive: agentic-engineering-platform-handoff.zip
  original_path: agentic-engineering-platform/handbook/security/AEP-SEC-008-data-protection-permission-isolation-and-privacy.md
  original_sha256: 04ccc36c5ce7d008e2728e53461fb406334ce0cb168e41ecb99a7bb80a6ccdfe
  original_metadata_record: handbook/security/AEP-SEC-008-data-protection-permission-isolation-and-privacy.md
  authority: inherited-source-context
---

# AEP-SEC-008 — Data Protection, Permission Isolation, and Privacy

## 1. Purpose
A enterprise engineering knowledge system may eventually operate across many permission scopes. Isolation must therefore be enforced at storage, retrieval, tool, credential, and evaluation layers.

## 2. Tenant isolation
Project A content must not become retrievable memory, context, examples, traces, or eval fixtures for Project B unless explicit policy and contractual rights permit it.

## 3. Scope before relevance
Retrieval should filter by authorization/permission scope before ranking for semantic relevance. Highly relevant unauthorized content must remain invisible.

## 4. Data minimization
Send models only the sensitive information necessary for the task. Prefer redaction, structured extraction, pseudonymization, or local processing where they preserve utility.

## 5. Retention
Define retention and deletion independently for prompts, traces, tool logs, embeddings, caches, memories, datasets, and generated artifacts.

## 6. Derived data
Embeddings, summaries, and learned memories can still encode sensitive information. Treat derived representations according to the sensitivity of their source unless evidence supports a lower classification.

## 7. Evaluation data
Production traces should not be copied into broad eval datasets without authorization, minimization, and retention review.

## 8. Portability
Provider selection and API configuration should account for contractual data handling, geographic, training, and retention requirements without hard-coding one vendor as universally appropriate.

<!-- generated-context-navigation -->

## Package context links

[Topic index](../../indexes/handbook-security.md) · [All topics](../../INDEX.md) · [Reading paths](../../READING-PATHS.md)

- [AEP-CTX-009 — Working Memory and Persistent Memory](../context/AEP-CTX-009-working-memory-and-persistent-memory.md)
- [AEP-SEC-004 — Identity, Credentials, and Secrets](AEP-SEC-004-identity-credentials-and-secrets.md)
- [AEP-SEC-005 — Least Privilege and Capability Authorization](AEP-SEC-005-least-privilege-and-capability-authorization.md)
